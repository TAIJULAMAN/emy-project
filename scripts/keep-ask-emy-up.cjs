'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const LOG_FILE = process.env.ASK_EMY_KEEPALIVE_LOG || path.join(ROOT_DIR, 'tmp-ask-emy-keepalive.log');
const HOST = process.env.ASK_EMY_HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || process.env.ASK_EMY_PORT || 8767);
const STATUS_PATH = process.env.ASK_EMY_STATUS_PATH || '/api/ask-emy/status';
const HEALTH_INTERVAL_MS = Number(process.env.ASK_EMY_HEALTH_INTERVAL_MS || 15000);
const HEALTH_TIMEOUT_MS = Number(process.env.ASK_EMY_HEALTH_TIMEOUT_MS || 4000);
const RESTART_DELAY_MS = Number(process.env.ASK_EMY_RESTART_DELAY_MS || 2000);
const MAX_FAILED_CHECKS = Number(process.env.ASK_EMY_MAX_FAILED_CHECKS || 3);

let serverProcess = null;
let healthTimer = null;
let restartTimer = null;
let failedChecks = 0;
let stopping = false;

function now() {
  return new Date().toISOString();
}

function statusUrl() {
  return `http://${HOST}:${PORT}${STATUS_PATH}`;
}

function log(message) {
  const line = `[${now()}] ${message}`;
  console.log(line);
  try {
    fs.appendFileSync(LOG_FILE, `${line}\n`, 'utf8');
  } catch (error) {}
}

function checkHealth() {
  return new Promise((resolve, reject) => {
    const req = http.get(
      {
        host: HOST,
        port: PORT,
        path: STATUS_PATH,
        timeout: HEALTH_TIMEOUT_MS,
      },
      (res) => {
        let body = '';

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
          if (body.length > 8192) {
            req.destroy(new Error('health response too large'));
          }
        });
        res.on('end', () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`health status ${res.statusCode}`));
            return;
          }

          try {
            resolve(JSON.parse(body || '{}'));
          } catch (error) {
            reject(new Error(`health JSON parse failed: ${error.message}`));
          }
        });
      },
    );

    req.on('timeout', () => {
      req.destroy(new Error('health check timed out'));
    });
    req.on('error', reject);
  });
}

function clearRestartTimer() {
  if (restartTimer) {
    clearTimeout(restartTimer);
    restartTimer = null;
  }
}

function startServer() {
  if (stopping || serverProcess) {
    return;
  }

  clearRestartTimer();
  failedChecks = 0;
  log(`starting Ask EMY server on ${statusUrl()}`);

  serverProcess = spawn(process.execPath, ['serve-linked-pages.cjs'], {
    cwd: ROOT_DIR,
    env: {
      ...process.env,
      PORT: String(PORT),
    },
    stdio: ['ignore', 'inherit', 'inherit'],
    windowsHide: true,
  });

  serverProcess.on('exit', (code, signal) => {
    const exitReason = signal ? `signal ${signal}` : `code ${code}`;
    serverProcess = null;

    if (!stopping) {
      scheduleRestart(`Ask EMY server exited with ${exitReason}`);
    }
  });

  serverProcess.on('error', (error) => {
    log(`server process error: ${error.message}`);
  });
}

function scheduleRestart(reason) {
  if (stopping || restartTimer) {
    return;
  }

  log(`${reason}; restarting in ${RESTART_DELAY_MS}ms`);
  restartTimer = setTimeout(() => {
    restartTimer = null;
    startServer();
  }, RESTART_DELAY_MS);
}

function restartOwnedServer(reason) {
  if (serverProcess) {
    log(`${reason}; stopping owned server process`);
    serverProcess.kill();
    return;
  }

  scheduleRestart(reason);
}

async function performHealthCheck() {
  if (stopping) {
    return;
  }

  try {
    const status = await checkHealth();
    failedChecks = 0;
    const aiProvider = status && status.ai ? status.ai.provider || 'unknown provider' : 'unknown provider';
    log(`healthy (${aiProvider})`);
  } catch (error) {
    failedChecks += 1;
    log(`health check failed ${failedChecks}/${MAX_FAILED_CHECKS}: ${error.message}`);

    if (failedChecks >= MAX_FAILED_CHECKS) {
      failedChecks = 0;
      restartOwnedServer('Ask EMY stopped answering health checks');
    }
  }
}

function stop() {
  if (stopping) {
    return;
  }

  stopping = true;
  clearRestartTimer();

  if (healthTimer) {
    clearInterval(healthTimer);
    healthTimer = null;
  }

  if (serverProcess) {
    log('stopping Ask EMY server');
    serverProcess.kill();
  }
}

async function main() {
  if (process.argv.includes('--once')) {
    const status = await checkHealth();
    console.log(JSON.stringify(status, null, 2));
    return;
  }

  log(`Ask EMY keepalive monitoring ${statusUrl()}`);

  try {
    await checkHealth();
    log('existing Ask EMY server is already healthy; monitoring it');
  } catch (error) {
    log(`no healthy server detected yet: ${error.message}`);
    startServer();
  }

  healthTimer = setInterval(performHealthCheck, HEALTH_INTERVAL_MS);
  setTimeout(performHealthCheck, Math.min(5000, HEALTH_INTERVAL_MS));
}

process.on('SIGINT', () => {
  stop();
  process.exit(0);
});
process.on('SIGTERM', () => {
  stop();
  process.exit(0);
});

main().catch((error) => {
  console.error(`[${now()}] Ask EMY keepalive failed: ${error.message}`);
  process.exit(1);
});
