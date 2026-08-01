'use strict';

process.env.EMY_USE_LOCKED_HOME = '1';
require('../src/generator/run.cjs').runGenerator();
