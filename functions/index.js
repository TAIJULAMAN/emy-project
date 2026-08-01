const crypto = require("crypto");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
let askEmyBrainPlanner = null;
let askEmyToolRegistry = null;
let askEmyConversationState = null;
try {
  askEmyBrainPlanner = require("../src/ask-emy/brain-planner.cjs");
} catch (error) {
  askEmyBrainPlanner = null;
}
try {
  askEmyToolRegistry = require("../src/ask-emy/tool-registry.cjs");
} catch (error) {
  askEmyToolRegistry = null;
}
try {
  askEmyConversationState = require("../src/ask-emy/conversation-state.cjs");
} catch (error) {
  askEmyConversationState = null;
}

admin.initializeApp();

const REGION = "europe-west2";
const CODE_DIGITS = 4;
const CODE_TTL_MS = 10 * 60 * 1000;
const RESEND_WAIT_MS = 45 * 1000;
const MAX_ATTEMPTS = 5;
const db = admin.firestore();

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function slugBusinessLikeId(value) {
  return clean(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function cleanEmail(value) {
  return clean(value).toLowerCase();
}

function roleValue(value) {
  return clean(value).toLowerCase() === "business" ? "business" : "customer";
}

function env(name, legacyPath) {
  if (process.env[name]) return process.env[name];
  try {
    const root = functions.config && functions.config().emy;
    if (!root || !legacyPath) return "";
    return legacyPath.split(".").reduce((next, key) => next && next[key], root) || "";
  } catch (error) {
    return "";
  }
}

function numberEnv(name, legacyPath, fallback) {
  const value = Number(env(name, legacyPath));
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function boolEnv(name, legacyPath, fallback) {
  const value = clean(env(name, legacyPath)).toLowerCase();
  if (["1", "true", "yes", "y"].includes(value)) return true;
  if (["0", "false", "no", "n"].includes(value)) return false;
  return fallback;
}

function makeCode() {
  const max = Math.pow(10, CODE_DIGITS);
  const min = Math.pow(10, CODE_DIGITS - 1);
  return String(crypto.randomInt(min, max));
}

function hashCode(uid, target, code, salt) {
  return crypto
    .createHash("sha256")
    .update([salt, uid, clean(target), clean(code)].join(":"))
    .digest("hex");
}

function codeDoc(uid, channel) {
  return db.collection("accountVerificationCodes").doc(uid + "_" + channel);
}

function assertAuthed(context) {
  if (!context.auth || !context.auth.uid) {
    throw new functions.https.HttpsError("unauthenticated", "Please sign in before requesting a verification code.");
  }
  return context.auth.uid;
}

function assertAdmin(context) {
  const uid = assertAuthed(context);
  const email = cleanEmail(context.auth.token && context.auth.token.email);
  if (email !== "i.stephane@my-emy.com") {
    throw new functions.https.HttpsError("permission-denied", "Only the EMY admin account can manage all backend records.");
  }
  return { uid, email };
}

function docPathSegments(pathValue) {
  return clean(pathValue).split("/").map(clean).filter(Boolean);
}

function safeAdminDocPath(pathValue) {
  const parts = docPathSegments(pathValue);
  if (!parts.length || parts.length % 2 !== 0) {
    throw new functions.https.HttpsError("invalid-argument", "Provide a valid Firestore document path.");
  }
  const path = parts.join("/");
  const allowed =
    /^users\/[^/]+$/.test(path) ||
    /^users\/[^/]+\/appStorage\/[^/]+$/.test(path) ||
    /^customerProfiles\/[^/]+$/.test(path) ||
    /^businessProfiles\/[^/]+$/.test(path) ||
    /^businessAccounts\/[^/]+$/.test(path) ||
    /^businessApprovals\/[^/]+$/.test(path) ||
    /^publicBusinessContent\/[^/]+$/.test(path) ||
    /^businessContent\/[^/]+\/items\/[^/]+$/.test(path) ||
    /^businessAnalytics\/[^/]+$/.test(path) ||
    /^businessAnalytics\/[^/]+\/events\/[^/]+$/.test(path) ||
    /^analyticsEvents\/[^/]+$/.test(path);
  if (!allowed) {
    throw new functions.https.HttpsError("invalid-argument", "That Firestore path is not an EMY admin-managed record.");
  }
  return path;
}

async function deleteCollection(collectionRef, batchSize) {
  const size = Math.max(1, Math.min(Number(batchSize) || 100, 300));
  let deleted = 0;
  while (true) {
    const snapshot = await collectionRef.limit(size).get();
    if (snapshot.empty) break;
    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();
    deleted += snapshot.size;
    if (snapshot.size < size) break;
  }
  return deleted;
}

async function markOwnerContentDeleted(ownerUserId, adminInfo) {
  const owner = clean(ownerUserId);
  if (!owner) return 0;
  const snapshots = await Promise.all([
    db.collection("publicBusinessContent").where("ownerUserId", "==", owner).limit(300).get().catch(() => null),
    db.collectionGroup("items").where("ownerUserId", "==", owner).limit(300).get().catch(() => null)
  ]);
  const batch = db.batch();
  let touched = 0;
  snapshots.forEach((snapshot) => {
    if (!snapshot) return;
    snapshot.forEach((doc) => {
      batch.set(doc.ref, {
        deleted: true,
        deletedAt: admin.firestore.FieldValue.serverTimestamp(),
        deletedAtIso: new Date().toISOString(),
        deletedBy: adminInfo.uid,
        deletedByEmail: adminInfo.email
      }, { merge: true });
      touched += 1;
    });
  });
  if (touched) await batch.commit();
  return touched;
}

async function authUserFirestoreState(uid) {
  const cleanUid = clean(uid);
  if (!cleanUid) return {};
  const snaps = await Promise.all([
    db.collection("users").doc(cleanUid).get().catch(() => null),
    db.collection("customerProfiles").doc(cleanUid).get().catch(() => null),
    db.collection("businessProfiles").doc(cleanUid).get().catch(() => null),
    db.collection("businessAccounts").doc(cleanUid).get().catch(() => null),
    db.collection("businessApprovals").doc(cleanUid).get().catch(() => null)
  ]);
  return {
    userDoc: !!(snaps[0] && snaps[0].exists),
    customerProfile: !!(snaps[1] && snaps[1].exists),
    businessProfile: !!(snaps[2] && snaps[2].exists),
    businessAccount: !!(snaps[3] && snaps[3].exists),
    businessApproval: !!(snaps[4] && snaps[4].exists)
  };
}

function authUserStatus(user, firestoreState) {
  if (user.disabled) return "disabled";
  const hasFirestoreRecord = firestoreState.userDoc || firestoreState.customerProfile || firestoreState.businessProfile || firestoreState.businessAccount || firestoreState.businessApproval;
  if (!hasFirestoreRecord) return "auth-only";
  return user.emailVerified ? "verified" : "unverified";
}

function authUserProvider(user) {
  const providers = Array.isArray(user.providerData) ? user.providerData.map((item) => clean(item.providerId)).filter(Boolean) : [];
  return providers.length ? providers.join(", ") : "password";
}

async function deleteAccountByUid(uid, adminInfo, deleteRelatedContent) {
  const cleanUid = clean(uid);
  if (!cleanUid) {
    throw new functions.https.HttpsError("invalid-argument", "Provide a Firebase Auth user id.");
  }
  const user = await admin.auth().getUser(cleanUid).catch(() => null);
  const email = cleanEmail(user && user.email);
  if (email === "i.stephane@my-emy.com") {
    throw new functions.https.HttpsError("permission-denied", "The EMY admin account cannot be deleted from this console.");
  }
  await Promise.all([
    db.collection("customerProfiles").doc(cleanUid).delete().catch(() => {}),
    db.collection("businessProfiles").doc(cleanUid).delete().catch(() => {}),
    db.collection("businessAccounts").doc(cleanUid).delete().catch(() => {}),
    db.collection("businessApprovals").doc(cleanUid).delete().catch(() => {}),
    deleteCollection(db.collection("users").doc(cleanUid).collection("appStorage"), 200).catch(() => 0),
    db.collection("users").doc(cleanUid).delete().catch(() => {})
  ]);
  const relatedDeleted = deleteRelatedContent ? await markOwnerContentDeleted(cleanUid, adminInfo) : 0;
  await admin.auth().deleteUser(cleanUid).catch(() => {});
  return { uid: cleanUid, email, relatedDeleted };
}

async function loadUser(uid) {
  const user = await admin.auth().getUser(uid);
  if (!user || !user.email) {
    throw new functions.https.HttpsError("failed-precondition", "This account does not have an email address.");
  }
  return user;
}

function smtpConfig() {
  const host = env("EMY_SMTP_HOST", "smtp.host");
  const user = env("EMY_SMTP_USER", "smtp.user");
  const pass = env("EMY_SMTP_PASS", "smtp.pass");
  const from = env("EMY_EMAIL_FROM", "email.from") || user;
  const port = numberEnv("EMY_SMTP_PORT", "smtp.port", 587);
  const secure = boolEnv("EMY_SMTP_SECURE", "smtp.secure", port === 465);
  if (!host || !user || !pass || !from) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Email code sender is not configured yet. Add SMTP settings for EMY, then deploy Firebase Functions again."
    );
  }
  return { host, port, secure, auth: { user, pass }, from };
}

async function sendEmail(to, displayName, code) {
  const config = smtpConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth
  });
  const safeName = clean(displayName) || "there";
  const text = [
    "Hello " + safeName + ",",
    "",
    "Your EMY confirmation code is " + code + ".",
    "This code expires in 10 minutes.",
    "",
    "If you did not create an EMY account, you can ignore this email.",
    "",
    "Thanks,",
    "The EMY team"
  ].join("\n");
  const html = [
    "<p>Hello " + escapeHtml(safeName) + ",</p>",
    "<p>Your EMY confirmation code is:</p>",
    "<p style=\"font-size:28px;font-weight:800;letter-spacing:6px;color:#001b47\">" + escapeHtml(code) + "</p>",
    "<p>This code expires in 10 minutes.</p>",
    "<p>If you did not create an EMY account, you can ignore this email.</p>",
    "<p>Thanks,<br>The EMY team</p>"
  ].join("");
  await transporter.sendMail({
    from: config.from,
    to,
    subject: "Your EMY confirmation code",
    text,
    html
  });
}

function escapeHtml(value) {
  return clean(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function assertCanSend(ref) {
  const snap = await ref.get();
  const data = snap.exists ? snap.data() || {} : {};
  const lastSentMs = data.lastSentAt && data.lastSentAt.toMillis ? data.lastSentAt.toMillis() : 0;
  if (lastSentMs && Date.now() - lastSentMs < RESEND_WAIT_MS) {
    throw new functions.https.HttpsError("resource-exhausted", "Please wait a moment before asking for another code.");
  }
  return data;
}

async function saveCode(uid, channel, target, code) {
  const salt = crypto.randomBytes(16).toString("hex");
  await codeDoc(uid, channel).set({
    uid,
    channel,
    target: clean(target),
    hash: hashCode(uid, target, code, salt),
    salt,
    attempts: 0,
    usedAt: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastSentAt: admin.firestore.FieldValue.serverTimestamp(),
    expiresAt: admin.firestore.Timestamp.fromMillis(Date.now() + CODE_TTL_MS)
  }, { merge: true });
}

async function markAccountVerified(uid, role, channel) {
  const user = await admin.auth().getUser(uid);
  await admin.auth().updateUser(uid, { emailVerified: true });
  const payload = {
    emailVerified: true,
    accountVerified: true,
    verificationChannel: channel,
    verifiedAt: admin.firestore.FieldValue.serverTimestamp(),
    activeRole: roleValue(role)
  };
  await Promise.all([
    db.collection("users").doc(uid).set(Object.assign({
      uid,
      email: user.email || ""
    }, payload), { merge: true }),
    roleValue(role) === "business"
      ? db.collection("businessAccounts").doc(uid).set(Object.assign({
          uid,
          ownerUserId: uid,
          ownerEmail: user.email || "",
          status: "profile-required",
          reviewStatus: "draft"
        }, payload), { merge: true })
      : db.collection("customerProfiles").doc(uid).set(Object.assign({
          uid,
          email: user.email || ""
        }, payload), { merge: true })
  ]);
}

exports.sendEmailVerificationCode = functions.region(REGION).https.onCall(async (data, context) => {
  const uid = assertAuthed(context);
  const user = await loadUser(uid);
  const email = cleanEmail(user.email);
  const ref = codeDoc(uid, "email");
  await assertCanSend(ref);
  const code = makeCode();
  await saveCode(uid, "email", email, code);
  await sendEmail(email, user.displayName || email, code);
  return {
    sent: true,
    channel: "email",
    target: email,
    expiresInSeconds: Math.floor(CODE_TTL_MS / 1000),
    resendAfterSeconds: Math.floor(RESEND_WAIT_MS / 1000)
  };
});

async function findSavedPhone(uid, fallback) {
  const docs = await Promise.all([
    db.collection("customerProfiles").doc(uid).get().catch(() => null),
    db.collection("businessAccounts").doc(uid).get().catch(() => null),
    db.collection("businessProfiles").doc(uid).get().catch(() => null)
  ]);
  for (const snap of docs) {
    const data = snap && snap.exists ? snap.data() || {} : {};
    const phone = clean(data.phone || data.businessPhone || data.mobile || data.mobileNumber);
    if (phone) return phone;
  }
  return clean(fallback);
}

function twilioConfig() {
  const sid = env("EMY_TWILIO_ACCOUNT_SID", "twilio.account_sid");
  const token = env("EMY_TWILIO_AUTH_TOKEN", "twilio.auth_token");
  const from = env("EMY_TWILIO_FROM", "twilio.from");
  if (!sid || !token || !from) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Phone code sender is not configured yet. Add Twilio settings for EMY, then deploy Firebase Functions again."
    );
  }
  return { sid, token, from };
}

async function sendSms(to, code) {
  const config = twilioConfig();
  const body = new URLSearchParams();
  body.set("To", to);
  body.set("From", config.from);
  body.set("Body", "Your EMY confirmation code is " + code + ". It expires in 10 minutes.");
  const response = await fetch("https://api.twilio.com/2010-04-01/Accounts/" + encodeURIComponent(config.sid) + "/Messages.json", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(config.sid + ":" + config.token).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new functions.https.HttpsError("internal", result.message || "Twilio could not send the phone code.");
  }
}

exports.sendPhoneVerificationCode = functions.region(REGION).https.onCall(async (data, context) => {
  const uid = assertAuthed(context);
  await loadUser(uid);
  const phone = await findSavedPhone(uid, data && data.phone);
  if (!phone || phone.replace(/\D/g, "").length < 8) {
    throw new functions.https.HttpsError("failed-precondition", "Add a real phone number before requesting a phone code.");
  }
  const ref = codeDoc(uid, "phone");
  await assertCanSend(ref);
  const code = makeCode();
  await saveCode(uid, "phone", phone, code);
  await sendSms(phone, code);
  return {
    sent: true,
    channel: "phone",
    target: phone,
    expiresInSeconds: Math.floor(CODE_TTL_MS / 1000),
    resendAfterSeconds: Math.floor(RESEND_WAIT_MS / 1000)
  };
});

async function confirmCode(data, context, channel) {
  const uid = assertAuthed(context);
  await loadUser(uid);
  const code = clean(data && data.code).replace(/\D/g, "");
  if (code.length !== CODE_DIGITS) {
    throw new functions.https.HttpsError("invalid-argument", "Enter the full " + CODE_DIGITS + "-digit EMY code.");
  }
  const ref = codeDoc(uid, channel);
  const snap = await ref.get();
  if (!snap.exists) {
    throw new functions.https.HttpsError("not-found", "No active EMY code was found. Please resend the code.");
  }
  const saved = snap.data() || {};
  const expiresAtMs = saved.expiresAt && saved.expiresAt.toMillis ? saved.expiresAt.toMillis() : 0;
  if (saved.usedAt || !expiresAtMs || Date.now() > expiresAtMs) {
    await ref.delete().catch(() => {});
    throw new functions.https.HttpsError("deadline-exceeded", "This EMY code expired. Please resend the code.");
  }
  if (Number(saved.attempts || 0) >= MAX_ATTEMPTS) {
    await ref.delete().catch(() => {});
    throw new functions.https.HttpsError("resource-exhausted", "Too many incorrect codes. Please resend the code.");
  }
  const expectedHash = hashCode(uid, saved.target, code, saved.salt);
  if (expectedHash !== saved.hash) {
    await ref.set({
      attempts: admin.firestore.FieldValue.increment(1),
      lastAttemptAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    throw new functions.https.HttpsError("permission-denied", "That EMY code is not correct.");
  }
  const role = roleValue(data && data.role);
  await markAccountVerified(uid, role, channel);
  await ref.set({
    usedAt: admin.firestore.FieldValue.serverTimestamp(),
    attempts: admin.firestore.FieldValue.increment(1)
  }, { merge: true });
  return { verified: true, channel, role };
}

exports.confirmEmailVerificationCode = functions.region(REGION).https.onCall((data, context) => {
  return confirmCode(data, context, "email");
});

exports.confirmPhoneVerificationCode = functions.region(REGION).https.onCall((data, context) => {
  return confirmCode(data, context, "phone");
});

exports.adminListAuthUsers = functions.region(REGION).https.onCall(async (data, context) => {
  assertAdmin(context);
  const input = data && typeof data === "object" ? data : {};
  const maxResults = Math.max(1, Math.min(Number(input.maxResults) || 1000, 1000));
  const result = await admin.auth().listUsers(maxResults, clean(input.pageToken) || undefined);
  const users = await Promise.all(result.users.map(async (user) => {
    const firestoreState = await authUserFirestoreState(user.uid);
    return {
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      phoneNumber: user.phoneNumber || "",
      disabled: !!user.disabled,
      emailVerified: !!user.emailVerified,
      provider: authUserProvider(user),
      status: authUserStatus(user, firestoreState),
      createdAt: user.metadata && user.metadata.creationTime || "",
      lastSignInAt: user.metadata && user.metadata.lastSignInTime || "",
      firestore: firestoreState
    };
  }));
  return {
    users,
    nextPageToken: result.pageToken || ""
  };
});

exports.adminDeleteAuthUser = functions.region(REGION).https.onCall(async (data, context) => {
  const adminInfo = assertAdmin(context);
  const input = data && typeof data === "object" ? data : {};
  const uid = clean(input.uid);
  const result = await deleteAccountByUid(uid, adminInfo, input.deleteRelatedContent === true);
  await db.collection("adminAuditLogs").add({
    action: "admin-delete-auth-user",
    kind: "auth-user",
    uid: result.uid,
    email: result.email,
    deleteRelatedContent: input.deleteRelatedContent === true,
    relatedDeleted: result.relatedDeleted,
    adminUid: adminInfo.uid,
    adminEmail: adminInfo.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    createdAtIso: new Date().toISOString()
  });
  return {
    deleted: true,
    uid: result.uid,
    email: result.email,
    relatedDeleted: result.relatedDeleted
  };
});

exports.adminDeleteRecord = functions.region(REGION).https.onCall(async (data, context) => {
  const adminInfo = assertAdmin(context);
  const input = data && typeof data === "object" ? data : {};
  const kind = clean(input.kind).toLowerCase();
  const path = safeAdminDocPath(input.path);
  const hardDelete = input.hardDelete === true;
  const deleteRelatedContent = input.deleteRelatedContent === true;
  const ref = db.doc(path);
  const snap = await ref.get();
  const before = snap.exists ? snap.data() || {} : {};
  let relatedDeleted = 0;

  if ((kind === "user" || path.startsWith("users/")) && input.deleteAuthUser === true) {
    const uid = clean(input.uid || before.uid || before.ownerUserId || path.split("/")[1]);
    const result = await deleteAccountByUid(uid, adminInfo, deleteRelatedContent);
    relatedDeleted = result.relatedDeleted;
  } else if (kind === "customer" || path.startsWith("customerProfiles/")) {
    const uid = clean(input.uid || before.uid || before.ownerUserId || path.split("/")[1]);
    if (input.deleteAuthUser === true) {
      const result = await deleteAccountByUid(uid, adminInfo, deleteRelatedContent);
      relatedDeleted = result.relatedDeleted;
    } else {
      await Promise.all([
        db.collection("customerProfiles").doc(uid).delete().catch(() => {}),
        deleteCollection(db.collection("users").doc(uid).collection("appStorage"), 200).catch(() => 0),
        db.collection("users").doc(uid).delete().catch(() => {})
      ]);
    }
  } else if (kind === "business" || path.startsWith("businessProfiles/") || path.startsWith("businessAccounts/")) {
    const uid = clean(input.uid || before.uid || before.ownerUserId || path.split("/")[1]);
    if (input.deleteAuthUser === true) {
      const result = await deleteAccountByUid(uid, adminInfo, deleteRelatedContent);
      relatedDeleted = result.relatedDeleted;
    } else {
      await Promise.all([
        db.collection("businessProfiles").doc(uid).delete().catch(() => {}),
        db.collection("businessAccounts").doc(uid).delete().catch(() => {}),
        db.collection("businessApprovals").doc(uid).delete().catch(() => {})
      ]);
      if (deleteRelatedContent) {
        relatedDeleted = await markOwnerContentDeleted(uid, adminInfo);
      }
    }
  } else if (kind === "storage" || path.indexOf("/appStorage/") >= 0) {
    await ref.delete();
  } else if (hardDelete) {
    await ref.delete();
  } else {
    await ref.set({
      deleted: true,
      hidden: true,
      deletedAt: admin.firestore.FieldValue.serverTimestamp(),
      deletedAtIso: new Date().toISOString(),
      deletedBy: adminInfo.uid,
      deletedByEmail: adminInfo.email
    }, { merge: true });
  }

  await db.collection("adminAuditLogs").add({
    action: "admin-delete",
    kind: kind || "record",
    path,
    title: clean(input.title || before.title || before.businessName || before.displayName || before.email || path),
    hardDelete,
    deleteRelatedContent,
    relatedDeleted,
    adminUid: adminInfo.uid,
    adminEmail: adminInfo.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    createdAtIso: new Date().toISOString()
  });

  return {
    deleted: true,
    path,
    kind: kind || "record",
    hardDelete,
    relatedDeleted
  };
});

const ASK_EMY_MAX_CONTEXT_RECORDS = 60;
const ASK_EMY_CUSTOMER_CARD_DISPLAY_LIMIT = 12;
const ASK_EMY_CUSTOMER_ANALYTICS_BAR_LIMIT = 10;
const ASK_EMY_ANALYTICS_INTENT = /\b(stat|stats|statistic|statistics|analytics|performance|increase sales|increase my sales|sales|sell more|grow sales|improve sales|improve my business|what to improve|conversion|orders|revenue|views?|viewed|profile views|engagement|customers|traffic|graphs?|charts?|visual|line chart|bar chart|compare chart)\b/;

function askEmySendJson(res, status, payload) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  if (status === 204) {
    res.status(204).send("");
    return;
  }
  res.status(status).json(payload);
}

function askEmyEnv(name, legacyPath) {
  return clean(env(name, legacyPath));
}

function askEmyProviderStatus() {
  const openAiKey = askEmyEnv("OPENAI_API_KEY", "openai.api_key");
  const openRouterKey = askEmyEnv("OPENROUTER_API_KEY", "openrouter.api_key");
  const deepSeekKey = askEmyEnv("DEEPSEEK_API_KEY", "deepseek.api_key");
  const preferredProvider = askEmyEnv("ASK_EMY_PROVIDER", "ask_emy.provider").toLowerCase();
  const provider = preferredProvider.includes("openai") && openAiKey
    ? "openai"
    : preferredProvider.includes("deepseek") && deepSeekKey
      ? "deepseek"
      : preferredProvider.includes("openrouter") && openRouterKey
        ? "openrouter"
        : openAiKey
          ? "openai"
          : openRouterKey
            ? "openrouter"
            : deepSeekKey
              ? "deepseek"
              : "local-fallback";
  return {
    ok: true,
    provider,
    preferredProvider,
    openAiConfigured: Boolean(openAiKey),
    openRouterConfigured: Boolean(openRouterKey),
    deepSeekConfigured: Boolean(deepSeekKey),
    openAiModel: askEmyEnv("OPENAI_MODEL", "openai.model") || askEmyEnv("ASK_EMY_MODEL", "ask_emy.model") || "gpt-5.4",
    openRouterModel: askEmyEnv("OPENROUTER_MODEL", "openrouter.model") || askEmyEnv("ASK_EMY_MODEL", "ask_emy.model") || "deepseek/deepseek-chat-v3-0324:free",
    deepSeekModel: askEmyEnv("DEEPSEEK_MODEL", "deepseek.model") || askEmyEnv("ASK_EMY_MODEL", "ask_emy.model") || "deepseek-chat"
  };
}

function askEmyText(value, max = 300) {
  return clean(value).slice(0, max);
}

function askEmyFirst(values) {
  for (const value of values) {
    const text = askEmyText(value);
    if (text) return text;
  }
  return "";
}

function askEmyRadiusLabel(value) {
  const text = askEmyText(value, 80);
  if (!text) return "nearby";
  return /^\d+(?:\.\d+)?$/.test(text) ? `${text} km` : text;
}

function askEmyIsSystemCardText(value) {
  return /^(your post was published|clip upload completed|post upload completed|upload completed|new clip|new post)[\s.!?]*$/i.test(clean(value));
}

function askEmyFirstUseful(values, max = 300) {
  for (const value of values) {
    const text = askEmyText(value, max);
    if (text && !askEmyIsSystemCardText(text)) return text;
  }
  return "";
}

function askEmyCountForLabel(values, labelPattern) {
  const sourcePattern = labelPattern instanceof RegExp ? labelPattern.source : String(labelPattern || "");
  const labelledPattern = new RegExp("(\\d[\\d,]*)\\s*(?:" + sourcePattern + ")", "i");
  for (const value of values || []) {
    if (value === undefined || value === null || value === "") continue;
    if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, value);
    const text = clean(value);
    if (!text) continue;
    const labelled = text.match(labelledPattern);
    if (labelled) return Math.max(0, Number(labelled[1].replace(/,/g, "")) || 0);
    if (/^\d[\d,]*$/.test(text)) return Math.max(0, Number(text.replace(/,/g, "")) || 0);
  }
  return 0;
}

function askEmyIsVideoSource(value, mediaType = "") {
  const source = clean(value);
  const type = clean(mediaType).toLowerCase();
  if (/\b(video|clip|reel)\b/.test(type)) return Boolean(source);
  return /\.(mp4|webm|mov|m4v)(?:[?#].*)?$/i.test(source) || /\/video\/upload\//i.test(source);
}

function askEmyLooksLikePlaceholderText(value) {
  const text = clean(value).toLowerCase();
  if (!text) return true;
  const compact = text.replace(/[^a-z0-9]+/g, "");
  if (!compact) return true;
  if (/^(test|testing|demo|dummy|sample|placeholder|lorem|ipsum|asdf|qwer|qwerty|foo|bar|blah|none|null|undefined|product|post|clip|item|ddaas)$/i.test(compact)) return true;
  if (/^([a-z0-9])\1{1,}$/i.test(compact)) return true;
  if (/^[a-z]{1,2}$/i.test(compact)) return true;
  if (/\b(gjh|qwd|hjkl|asdf|qwerty|pjnh|iuo|lnih|hbbid|ddaas)\b/i.test(text)) return true;
  const words = text.split(/[^a-z0-9]+/).filter(Boolean);
  const gibberishWords = words.filter((word) => (
    word.length >= 7 &&
    /[a-z]/i.test(word) &&
    /[bcdfghjklmnpqrstvwxyz]{5,}/i.test(word)
  ));
  return gibberishWords.length > 0;
}

function askEmyLooksLikeWeakDescription(value) {
  const text = clean(value);
  if (!text) return true;
  if (/^[£$€]?\s*[\d,.\s]+%?$/i.test(text)) return true;
  return askEmyLooksLikePlaceholderText(text);
}

function askEmyLooksLikeNonProductMediaName(value) {
  const text = clean(value).toLowerCase();
  return /\b(screenshot|screen shot|user attachment|clipboard|untitled|codex-clipboard)\b/.test(text);
}

function askEmyCardTitleFor(type, value, fallbackName, business) {
  const productTitle = askEmyFirstUseful([value.productName, value.productTitle, value.itemTitle, value.detailTitle, value.title, fallbackName], 140);
  const contentTitle = askEmyFirstUseful([value.clipTitle, value.itemTitle, value.detailTitle, value.title, fallbackName], 140);
  if (type === "product") return productTitle || (business ? `${business} product` : "");
  if (type === "clip") return contentTitle || (business ? `${business} clip` : "Clip");
  if (type === "post") return contentTitle || (business ? `${business} post` : "Post");
  if (type === "article") return contentTitle || (business ? `${business} article` : "Article");
  if (type === "job") return contentTitle || (business ? `${business} job` : "Job");
  if (type === "event") return contentTitle || (business ? `${business} event` : "Event");
  return fallbackName || business;
}

function askEmyIsAnalyticsIntent(query) {
  if (askEmyIsCustomerRelationshipQuery(query)) return false;
  if (askEmyIsBareActionNounQuery(query)) return false;
  return ASK_EMY_ANALYTICS_INTENT.test(clean(query).toLowerCase());
}

function askEmyIsProfileImageQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  if (/\bprofile views?\b/.test(text)) return false;
  return /\b(image|photo|picture|avatar)\b/.test(text)
    && /\b(my|mine|me|account|profile|customer|client|business|shop|store|company)\b/.test(text);
}

function askEmyIsProfileOpenQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text || askEmyIsProfileImageQuery(text)) return false;
  if (!/\b(profile|account)\b/.test(text)) return false;
  return /\b(show|open|view|go to|take me|bring|pull up|display)\b/.test(text)
    && /\b(my|mine|customer|client|business|shop|store|company|profile|account)\b/.test(text);
}

function askEmyIsProfileIntentQuery(query) {
  return askEmyIsProfileImageQuery(query) || askEmyIsProfileOpenQuery(query);
}

function askEmyProfileTargetRole(query, payload = {}) {
  const text = clean(query).toLowerCase();
  if (/\b(customers?|clients?|personal)\b/.test(text)) return "customer";
  if (/\b(business|shop|store|company|seller|owner)\b/.test(text)) return "business";
  const role = clean(payload && (payload.accountRole || payload.user && payload.user.role || payload.activeUser && payload.activeUser.role)).toLowerCase();
  return /\bbusiness\b/.test(role) ? "business" : "customer";
}

function askEmyProfileAccountCandidates(payload = {}) {
  const rows = [];
  const add = (account) => {
    if (!account || typeof account !== "object") return;
    rows.push(account);
  };
  add(payload && payload.user);
  add(payload && payload.activeUser);
  if (Array.isArray(payload && payload.accountOptions)) payload.accountOptions.forEach(add);
  if (Array.isArray(payload && payload.accounts)) payload.accounts.forEach(add);
  add(payload);
  return rows;
}

function askEmyProfileAccountMatchesRole(account = {}, role = "customer") {
  const accountRole = clean(account.role || account.accountRole || account.type).toLowerCase();
  const hasBusinessIdentity = Boolean(account.businessName || account.businessKey || account.business || account.profileKey);
  if (role === "business") return /\bbusiness\b/.test(accountRole) || hasBusinessIdentity;
  return /\bcustomer\b/.test(accountRole) || (!accountRole && !hasBusinessIdentity);
}

function askEmyProfileAccountForRole(payload = {}, role = "customer") {
  const rows = askEmyProfileAccountCandidates(payload || {});
  return rows.find((account) => askEmyProfileAccountMatchesRole(account, role)) || rows[0] || {};
}

function askEmyProfileMedia(account = {}) {
  const pick = (values) => values.map((value) => clean(value)).find(Boolean) || "";
  return {
    image: pick([
      account.image,
      account.imageUrl,
      account.imageSrc,
      account.photo,
      account.photoUrl,
      account.photoSrc,
      account.profilePhoto,
      account.profilePhotoUrl,
      account.profilePhotoSrc,
      account.profileImage,
      account.profileImageUrl,
      account.profileImageSrc,
      account.avatar,
      account.avatarUrl,
      account.avatarSrc
    ]),
    imageRef: pick([
      account.imageRef,
      account.photoRef,
      account.profilePhotoRef,
      account.profileImageRef,
      account.avatarRef,
      account.publicId
    ])
  };
}

function askEmyProfileInlineImage(value) {
  const text = clean(value);
  if (!text || text.length > 2000) return "";
  if (/^(https?:\/\/|\/|\.\/|\.\.\/|assets\/|blob:|data:image\/)/i.test(text)) return text;
  return "";
}

function askEmyProfileUrlForRole(role) {
  return role === "business" ? "emy-business-profile.html?mode=business" : "emy-customer-profile.html";
}

function askEmyProfileViewSpec({ role = "customer", name = "", label = "profile", media = {}, account = {}, wantsImage = false } = {}) {
  const title = wantsImage
    ? `${name || "Your"} ${label} image`
    : `${name || "Your"} ${label}`;
  const businessName = clean(account.businessName || account.business);
  const email = clean(account.email || account.accountEmail || account.businessEmail);
  const image = clean(media.image);
  const imageRef = clean(media.imageRef);
  const facts = [
    { label: "Profile", value: role === "business" ? "Business account" : "Customer account" },
    { label: "Name", value: name },
    { label: "Business", value: businessName },
    { label: "Email", value: email },
    { label: "Image", value: image || imageRef ? "Saved" : "Not saved here" }
  ].filter((item) => clean(item.value));
  return {
    kind: wantsImage ? "Profile image" : role === "business" ? "Business card" : "Customer card",
    variant: wantsImage ? "media" : role === "business" ? "business" : "identity",
    eyebrow: "Created by Ask EMY",
    title,
    subtitle: role === "business"
      ? "Business-side profile information from your EMY account context."
      : "Customer-side profile information from your EMY account context.",
    media: {
      source: "business_profile",
      isBusinessProfileMedia: true,
      type: image ? "image" : "",
      src: image,
      ref: imageRef,
      fit: wantsImage ? "contain" : "cover"
    },
    badges: [
      role === "business" ? "Business profile" : "Customer profile",
      image || imageRef ? "Image saved" : "No image visible"
    ],
    facts,
    sections: [{
      title: "What you can do next",
      items: wantsImage
        ? ["Open the profile if you want to change this image.", "Ask EMY to show the full profile card if you want the account details too."]
        : ["Ask EMY to show the profile image.", role === "business" ? "Ask EMY to show products, clips, posts, jobs, or statistics for this business." : "Ask EMY to show your customer posts, clips, or saved activity."]
    }]
  };
}

function askEmyRecordMediaDescriptor(record = {}) {
  const mediaItems = []
    .concat(Array.isArray(record.media) ? record.media : [])
    .concat(Array.isArray(record.mediaItems) ? record.mediaItems : [])
    .concat(Array.isArray(record.images) ? record.images : [])
    .filter((item) => item && typeof item === "object");
  const mediaType = askEmyFirst([
    record.mediaType,
    record.type === "clip" || record.type === "reel" ? "video" : "",
    ...mediaItems.map((item) => item.type || item.mediaType || item.kind)
  ]).toLowerCase();
  const image = askEmyFirst([
    record.image,
    record.imageUrl,
    record.imageSrc,
    record.photo,
    record.photoUrl,
    record.thumbnail,
    record.thumbnailUrl,
    record.poster,
    record.posterUrl,
    record.posterSrc,
    record.coverImage,
    record.coverImageUrl,
    record.profileImage,
    ...mediaItems.map((item) => item.image || item.imageUrl || item.thumbnail || item.poster || item.src)
  ]);
  const imageRef = askEmyFirst([
    record.imageRef,
    record.thumbnailRef,
    record.posterRef,
    record.coverImageRef,
    record.profileImageRef,
    record.mediaRef,
    ...mediaItems.map((item) => item.imageRef || item.thumbnailRef || item.posterRef || item.ref || item.publicId)
  ]);
  const video = askEmyFirst([
    record.video,
    record.videoUrl,
    record.videoSrc,
    record.clipUrl,
    record.clipSrc,
    record.reelUrl,
    record.reelSrc,
    record.mediaSrc,
    record.mediaUrl,
    ...mediaItems.map((item) => item.video || item.videoUrl || item.videoSrc || item.mediaSrc || item.url)
  ]);
  const videoRef = askEmyFirst([
    record.videoRef,
    record.clipRef,
    record.reelRef,
    record.mediaVideoRef,
    ...mediaItems.map((item) => item.videoRef || item.clipRef || item.ref || item.publicId)
  ]);
  const isVideo = Boolean(video || videoRef) && (askEmyIsVideoSource(video, mediaType) || /\b(video|clip|reel)\b/.test(mediaType) || /^(clip|reel)$/i.test(clean(record.type)));
  const type = isVideo ? "video" : (image || imageRef ? "image" : "");
  return {
    type,
    src: isVideo ? video : image,
    ref: isVideo ? videoRef : imageRef,
    image,
    imageRef,
    poster: image,
    fit: isVideo ? "contain" : "cover",
    hasMedia: Boolean((isVideo ? video || videoRef : image || imageRef))
  };
}

function askEmyContentItemViewSpec(record = {}, options = {}) {
  const type = clean(options.type || record.type || "content").toLowerCase();
  const media = askEmyRecordMediaDescriptor(record);
  const title = askEmyFirstUseful([record.name, record.title, record.productName, record.jobTitle], 160)
    || (type === "clip" || type === "reel" ? "EMY clip" : type === "post" ? "EMY post" : "EMY content");
  const business = clean(record.business || record.businessName || record.ownerName);
  const desc = askEmyFirstUseful([record.desc, record.description, record.caption, record.text, record.body, record.message, record.recentActivity], 260);
  const views = Math.max(0, Number(record.viewCount || record.views) || askEmyCountForLabel([record.views, record.viewCount, record.stats, record.detailMeta], /views?|viewed|visits?/));
  const likes = Math.max(0, Number(record.likeCount || record.likes) || askEmyCountForLabel([record.likes, record.likeCount, record.countedLikeCount, record.stats, record.detailMeta], /likes?|liked/));
  const comments = Math.max(0, Number(record.commentCount || record.comments) || askEmyCountForLabel([record.commentsCount, record.commentCount, record.commentsText, record.stats, Array.isArray(record.comments) ? record.comments.length : ""], /comments?|replies?/));
  const saves = Math.max(0, Number(record.saveCount || record.saved || record.saves) || askEmyCountForLabel([record.saved, record.saves, record.saveCount, record.savedCount, record.stats, record.detailMeta], /saved|saves?/));
  const date = clean(record.date || record.createdAt || record.updatedAt || record.postedAt);
  const category = clean(record.category || record.productCategory || record.businessCategory || record.contentCategory);
  const typeLabel = type === "reel" ? "Clip" : type.charAt(0).toUpperCase() + type.slice(1);
  const highlights = [
    views ? { label: "Views", value: `${views.toLocaleString()} view${views === 1 ? "" : "s"}` } : null,
    likes ? { label: "Likes", value: `${likes.toLocaleString()} like${likes === 1 ? "" : "s"}` } : null,
    comments ? { label: "Comments", value: comments.toLocaleString() } : null,
    saves ? { label: "Saves", value: saves.toLocaleString() } : null,
  ].filter(Boolean);
  const facts = [
    { label: "Type", value: typeLabel },
    { label: "Business", value: business },
    { label: "Category", value: category },
    { label: "Media", value: media.hasMedia ? (media.type === "video" ? "Video available" : "Image available") : "No media attached" },
    { label: "Views", value: views ? views.toLocaleString() : "" },
    { label: "Likes", value: likes ? likes.toLocaleString() : "" },
    { label: "Comments", value: comments ? comments.toLocaleString() : "" },
    { label: "Saves", value: saves ? saves.toLocaleString() : "" },
    { label: "Date", value: date },
  ].filter((item) => clean(item.value));
  return {
    kind: clean(options.kind) || (media.hasMedia ? `${typeLabel} media card` : `${typeLabel} card`),
    variant: media.hasMedia ? "media" : "compact",
    eyebrow: clean(options.eyebrow) || "Created by Ask EMY",
    title,
    subtitle: desc || (business ? `${typeLabel} from ${business}.` : `${typeLabel} from EMY.`),
    media: {
      source: "record_media",
      type: media.type,
      src: media.src,
      ref: media.ref,
      image: media.image,
      imageRef: media.imageRef,
      poster: media.poster,
      fit: media.fit
    },
    badges: [
      typeLabel,
      business,
      record.isOwnedByViewer || record.ownedByViewer ? "Your business" : "",
      record.isCustomerOfViewer || record.isCustomer ? "You're a customer" : "",
      record.isFollowedByViewer || record.following ? "Following" : ""
    ].filter(Boolean).slice(0, 5),
    highlights,
    facts,
    sections: desc ? [{ title: "Details", items: [desc] }] : []
  };
}

function askEmyAttachContentViewSpec(record = {}, options = {}) {
  if (!record || typeof record !== "object") return record;
  if (record.viewSpec && typeof record.viewSpec === "object") return record;
  return {
    ...record,
    viewSpec: askEmyContentItemViewSpec(record, options)
  };
}

function askEmyBusinessContentBucket(record = {}) {
  const text = [
    record.type,
    record.kind,
    record.category,
    record.contentType,
    record.postMode,
    record.uploadType,
    record.itemKind,
    record.detailKind,
    record.tag,
    record.createType,
    record.mediaKind,
    record.clipKind,
    record.reelKind,
    record.source,
    record.url,
    record.href
  ].map((item) => clean(item).toLowerCase()).join(" ");
  if (/\bclips?|reels?|videos?\b/.test(text) || askEmyFirst([record.clipId, record.reelId, record.videoSrc, record.videoUrl])) return "clips";
  if (/\bjobs?|hiring|roles?|work\b/.test(text) || askEmyFirst([record.jobTitle, record.jobId, record.employment, record.workplace])) return "jobs";
  if (/\barticles?|news|blog\b/.test(text) || askEmyFirst([record.articleId])) return "articles";
  if (/\bevents?|booking|workshop|class\b/.test(text) || askEmyFirst([record.eventId])) return "events";
  if (/\bposts?|feed|updates?\b/.test(text) || askEmyFirst([record.postId, record.feedId])) return "posts";
  if (/\bproducts?|stock|listing\b/.test(text) || askEmyFirst([record.productName, record.productTitle, record.productId, record.price, record.priceText])) return "products";
  return "";
}

function askEmyBusinessCardSummaryFromRecords(businessCard = {}, records = []) {
  const businessName = clean(businessCard.name || businessCard.business || businessCard.businessName);
  const businessKey = slugBusinessLikeId(businessCard.businessKey || businessName);
  const related = (Array.isArray(records) ? records : []).filter((record) => {
    if (!record || typeof record !== "object") return false;
    const recordKey = slugBusinessLikeId(record.businessKey || record.detailBusinessKey || record.ownerKey || record.sellerKey || record.key || "");
    const recordName = clean(record.business || record.businessName || record.ownerName || record.sellerName || record.name);
    return (businessKey && recordKey && recordKey === businessKey)
      || (businessName && recordName && recordName.toLowerCase() === businessName.toLowerCase())
      || Boolean(record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice);
  });
  const counts = { products: 0, clips: 0, posts: 0, jobs: 0, articles: 0, events: 0 };
  let businessLikeCount = Number(businessCard.businessLikeCount || businessCard.businessLikes || businessCard.likedBusinessCount) || 0;
  let profileViews = Number(businessCard.profileViews || businessCard.profileViewCount) || 0;
  let totalViews = Number(businessCard.totalViews || businessCard.views || businessCard.viewCount) || 0;
  let productViews = Number(businessCard.productViews || businessCard.productViewsTotal) || 0;
  let clipViews = Number(businessCard.clipViews || businessCard.clipViewsTotal) || 0;
  let postViews = Number(businessCard.postViews || businessCard.postViewsTotal) || 0;
  let contentLikes = 0;
  let comments = 0;
  let saves = 0;
  let followers = 0;
  let customers = 0;
  const textFields = {
    description: clean(businessCard.businessDescription || businessCard.profileDescription || businessCard.aboutBusiness || businessCard.about),
    category: clean(businessCard.category || businessCard.businessCategory),
    area: clean(businessCard.address || businessCard.place || businessCard.location),
    hours: clean(businessCard.openingHours || businessCard.businessHours || businessCard.hours || businessCard.workingHours || businessCard.workingDays || businessCard.openingTimes),
    status: clean(businessCard.openStatus || businessCard.statusText || businessCard.businessStatus || businessCard.status || businessCard.availability),
    phone: clean(businessCard.phone || businessCard.telephone),
    email: clean(businessCard.email || businessCard.businessEmail),
    website: clean(businessCard.website || businessCard.urlText),
    image: clean(businessCard.businessImage || businessCard.businessProfileImage || businessCard.logo || businessCard.logoUrl || businessCard.businessCoverImage || businessCard.profileImage)
  };
  for (const record of related) {
    const bucket = askEmyBusinessContentBucket(record);
    if (bucket && Object.prototype.hasOwnProperty.call(counts, bucket)) counts[bucket] += 1;
    const views = askEmyCountForLabel([record.views, record.viewCount, record.viewsText, record.visitCount, record.stats, record.detailMeta], /views?|viewed|visits?/);
    totalViews += views;
    if (bucket === "products") productViews += views;
    if (bucket === "clips") clipViews += views;
    if (bucket === "posts" || bucket === "articles") postViews += views;
    contentLikes += askEmyCountForLabel([record.likes, record.likeCount, record.countedLikeCount, record.stats, record.detailMeta], /likes?|liked/);
    comments += askEmyCountForLabel([record.commentsCount, record.commentCount, record.commentsText, record.stats, Array.isArray(record.comments) ? record.comments.length : ""], /comments?|replies?/);
    saves += askEmyCountForLabel([record.saved, record.saves, record.saveCount, record.savedCount, record.stats, record.detailMeta], /saved|saves?/);
    businessLikeCount = Math.max(businessLikeCount, Number(record.businessLikeCount || record.businessLikes || record.likedBusinessCount || record.cumulativeLikes) || 0);
    if (record.following || record.isFollowedByViewer || record.followedByViewer) followers = Math.max(followers, 1);
    if (record.isCustomer || record.isCustomerOfViewer || record.customerNotice) customers = Math.max(customers, 1);
    textFields.description = textFields.description || askEmyFirstUseful([record.businessDescription, record.profileDescription, record.aboutBusiness, record.about], 220);
    textFields.category = textFields.category || askEmyFirst([record.businessCategory, record.primarySector, record.category]);
    textFields.area = textFields.area || askEmyFirst([record.businessAddress, record.address, record.businessLocation, record.location, record.place, record.town, record.city, record.postcode]);
    textFields.hours = textFields.hours || askEmyFirst([record.openingHours, record.businessHours, record.hours, record.workingHours, record.workingDays, record.openingTimes]);
    textFields.status = textFields.status || askEmyFirst([record.openStatus, record.statusText, record.businessStatus, record.status, record.availability, record.liveStatus]);
    textFields.phone = textFields.phone || askEmyFirst([record.phone, record.phoneNumber, record.mobile, record.telephone, record.contactPhone]);
    textFields.email = textFields.email || askEmyFirst([record.email, record.contactEmail, record.businessEmail]);
    textFields.website = textFields.website || askEmyFirst([record.website, record.site, record.businessWebsite]);
    textFields.image = textFields.image || askEmyFirst([record.businessImage, record.businessProfileImage, record.logo, record.logoUrl, record.businessCoverImage]);
  }
  const contentTotal = Object.values(counts).reduce((total, value) => total + value, 0);
  return {
    ...businessCard,
    businessDescription: textFields.description || "",
    desc: textFields.description || "",
    category: textFields.category || businessCard.category || "",
    address: textFields.area || businessCard.address || "",
    place: textFields.area || businessCard.place || "",
    openingHours: textFields.hours || businessCard.openingHours || "",
    openStatus: textFields.status || businessCard.openStatus || "",
    phone: textFields.phone || businessCard.phone || "",
    email: textFields.email || businessCard.email || "",
    website: textFields.website || businessCard.website || "",
    image: textFields.image || "",
    profileImage: businessCard.profileImage || textFields.image || "",
    coverImage: businessCard.coverImage || "",
    businessLikeCount,
    profileViews,
    totalViews,
    productViews,
    clipViews,
    postViews,
    contentLikes,
    comments,
    saves,
    followerCount: followers,
    customerCount: customers,
    following: Boolean(businessCard.following || followers),
    isCustomer: Boolean(businessCard.isCustomer || customers),
    contentCounts: counts,
    contentTotal
  };
}

function askEmyBusinessCardViewSpec(businessCard = {}) {
  const name = clean(businessCard.name || businessCard.business || businessCard.businessName) || "Your business";
  const image = clean(businessCard.businessCoverImage || businessCard.businessImage || businessCard.businessProfileImage || businessCard.logo || businessCard.logoUrl || businessCard.profileImage);
  const imageRef = clean(businessCard.businessCoverImageRef || businessCard.businessImageRef || businessCard.businessProfileImageRef || businessCard.logoRef || businessCard.profileImageRef);
  const contentCounts = businessCard.contentCounts && typeof businessCard.contentCounts === "object" ? businessCard.contentCounts : {};
  const contentTotal = Number(businessCard.contentTotal) || Object.values(contentCounts).reduce((total, value) => total + (Number(value) || 0), 0);
  const businessLikeCount = Number(businessCard.businessLikeCount || businessCard.businessLikes || businessCard.likedBusinessCount) || 0;
  const profileViews = Number(businessCard.profileViews || businessCard.profileViewCount) || 0;
  const productViews = Number(businessCard.productViews || businessCard.productViewsTotal) || 0;
  const totalViews = Number(businessCard.totalViews || businessCard.views || businessCard.viewCount) || 0;
  const clipViews = Number(businessCard.clipViews || businessCard.clipViewsTotal) || 0;
  const postViews = Number(businessCard.postViews || businessCard.postViewsTotal) || 0;
  const contentLikes = Number(businessCard.contentLikes || businessCard.contentLikeCount) || 0;
  const comments = Number(businessCard.comments || businessCard.commentCount) || 0;
  const saves = Number(businessCard.saves || businessCard.saveCount) || 0;
  const followers = Number(businessCard.followerCount || businessCard.followers) || 0;
  const customers = Number(businessCard.customerCount || businessCard.customers) || 0;
  const status = clean(businessCard.openStatus || businessCard.statusText || businessCard.businessStatus || businessCard.status || businessCard.availability);
  const hours = clean(businessCard.openingHours || businessCard.businessHours || businessCard.hours || businessCard.workingHours || businessCard.workingDays || businessCard.openingTimes);
  const relationshipBadges = [
    businessCard.isOwnedByViewer || businessCard.ownedByViewer ? "Your business" : "",
    businessCard.isCustomerOfViewer || businessCard.isCustomer || businessCard.customerNotice ? "You're a customer" : "",
    businessCard.isFollowedByViewer || businessCard.following || businessCard.followedByViewer ? "Following" : "",
    status && /\b(open|online|available|live|active)\b/i.test(status) ? "Online" : ""
  ].filter(Boolean);
  const description = clean(businessCard.businessDescription || businessCard.profileDescription || businessCard.aboutBusiness || businessCard.about || "");
  const subtitle = description || (contentTotal ? `${contentTotal} saved EMY item${contentTotal === 1 ? "" : "s"} connected to this business.` : "Business profile information from EMY.");
  const highlights = [
    { label: "Business likes", value: `${businessLikeCount.toLocaleString()} like${businessLikeCount === 1 ? "" : "s"}` },
    { label: "Content", value: contentTotal ? `${contentTotal.toLocaleString()} item${contentTotal === 1 ? "" : "s"}` : "" },
    { label: "Views", value: totalViews ? `${totalViews.toLocaleString()} view${totalViews === 1 ? "" : "s"}` : profileViews ? `${profileViews.toLocaleString()} profile view${profileViews === 1 ? "" : "s"}` : productViews ? `${productViews.toLocaleString()} product view${productViews === 1 ? "" : "s"}` : "" },
    { label: "Status", value: status || (hours ? "Hours listed" : "") }
  ].filter((item) => clean(item.value));
  const facts = [
    { label: "Business", value: name },
    { label: "Category", value: clean(businessCard.category || businessCard.businessCategory) },
    { label: "Area", value: clean(businessCard.address || businessCard.place || businessCard.location) },
    { label: "Business likes", value: `${businessLikeCount.toLocaleString()} like${businessLikeCount === 1 ? "" : "s"}` },
    { label: "Total views", value: totalViews ? `${totalViews.toLocaleString()} view${totalViews === 1 ? "" : "s"}` : "" },
    { label: "Profile views", value: profileViews ? `${profileViews.toLocaleString()} view${profileViews === 1 ? "" : "s"}` : "" },
    { label: "Product views", value: productViews ? `${productViews.toLocaleString()} view${productViews === 1 ? "" : "s"}` : "" },
    { label: "Clip views", value: clipViews ? `${clipViews.toLocaleString()} view${clipViews === 1 ? "" : "s"}` : "" },
    { label: "Post views", value: postViews ? `${postViews.toLocaleString()} view${postViews === 1 ? "" : "s"}` : "" },
    { label: "Content likes", value: contentLikes ? `${contentLikes.toLocaleString()} like${contentLikes === 1 ? "" : "s"}` : "" },
    { label: "Comments", value: comments ? comments.toLocaleString() : "" },
    { label: "Saves", value: saves ? saves.toLocaleString() : "" },
    { label: "Followers", value: followers ? followers.toLocaleString() : "" },
    { label: "Customers", value: customers ? customers.toLocaleString() : "" },
    { label: "Products", value: contentCounts.products ? contentCounts.products.toLocaleString() : "" },
    { label: "Clips", value: contentCounts.clips ? contentCounts.clips.toLocaleString() : "" },
    { label: "Posts", value: contentCounts.posts ? contentCounts.posts.toLocaleString() : "" },
    { label: "Jobs", value: contentCounts.jobs ? contentCounts.jobs.toLocaleString() : "" },
    { label: "Articles", value: contentCounts.articles ? contentCounts.articles.toLocaleString() : "" },
    { label: "Opening hours", value: hours },
    { label: "Phone", value: clean(businessCard.phone || businessCard.telephone) },
    { label: "Email", value: clean(businessCard.email || businessCard.businessEmail) },
    { label: "Website", value: clean(businessCard.website || businessCard.urlText) }
  ].filter((item) => clean(item.value));
  const contentItems = [
    contentCounts.products ? `${contentCounts.products} product${contentCounts.products === 1 ? "" : "s"}` : "",
    contentCounts.clips ? `${contentCounts.clips} clip${contentCounts.clips === 1 ? "" : "s"}` : "",
    contentCounts.posts ? `${contentCounts.posts} post${contentCounts.posts === 1 ? "" : "s"}` : "",
    contentCounts.jobs ? `${contentCounts.jobs} job${contentCounts.jobs === 1 ? "" : "s"}` : "",
    contentCounts.articles ? `${contentCounts.articles} article${contentCounts.articles === 1 ? "" : "s"}` : ""
  ].filter(Boolean);
  return {
    kind: "Business profile card",
    variant: "business",
    eyebrow: "Business profile",
    title: name,
    subtitle,
    media: {
      source: "business_profile",
      isBusinessProfileMedia: true,
      type: image ? "image" : "",
      src: image,
      ref: imageRef,
      fit: "cover"
    },
    badges: ["Business profile", ...relationshipBadges].filter(Boolean),
    highlights,
    facts,
    sections: [
      contentItems.length ? {
        title: "Content on EMY",
        items: contentItems
      } : null,
      {
        title: "Useful next asks",
        items: [
          "Show products from this business.",
          "Show clips or posts from this business.",
          "Show statistics for this business."
        ]
      }
    ].filter(Boolean)
  };
}

function askEmyProfileAnswer(query, payload = {}, provider = "local-intent") {
  const role = askEmyProfileTargetRole(query, payload || {});
  const account = askEmyProfileAccountForRole(payload || {}, role);
  const media = askEmyProfileMedia(account);
  const hasImage = Boolean(media.image || media.imageRef);
  const label = role === "business" ? "business profile" : "customer profile";
  const name = clean(role === "business" ? account.businessName || account.name : account.name || account.displayName || account.customerName);
  const url = askEmyProfileUrlForRole(role);
  const wantsImage = askEmyIsProfileImageQuery(query);
  const inlineImage = askEmyProfileInlineImage(media.image);
  const result = {
    type: role === "business" ? "business-profile" : "customer-profile",
    name: `${name || "Your"} ${label}${wantsImage ? " image" : ""}`,
    desc: hasImage
      ? `This is the ${label} image Ask EMY can see from your account data.`
      : `I cannot see a saved image for this ${label} yet.`,
    image: media.image,
    imageRef: media.imageRef,
    mediaRef: media.imageRef,
    profileImage: media.image,
    profileImageRef: media.imageRef,
    profilePhoto: media.image,
    profilePhotoRef: media.imageRef,
    avatar: media.image,
    avatarRef: media.imageRef,
    email: clean(account.email || account.accountEmail || account.businessEmail),
    role,
    business: clean(account.business || account.businessName),
    businessName: clean(account.businessName || account.business),
    businessKey: clean(account.businessKey || account.profileKey),
    url,
    viewSpec: askEmyProfileViewSpec({ role, name, label, media, account, wantsImage }),
    tags: [role === "business" ? "Business profile" : "Customer profile", hasImage ? "Image saved" : "No image visible"].filter(Boolean)
  };
  if (!wantsImage) {
    return {
      answer: askEmyFormatReply([
        `Here is your ${label} card${name ? ` for ${name}` : ""}.`,
        hasImage ? askEmyFormatSection("Profile image", [
          inlineImage ? "I found the saved profile image and included it in the card." : "I found a saved profile image reference and included it in the card."
        ]) : "I do not see a saved profile image in this account payload."
      ]),
      results: [result],
      responseType: "small_result_list",
      selectedToolName: "openInlineView",
      provider
    };
  }
  if (hasImage) {
    return {
      answer: askEmyFormatReply([
        `Here is your ${label} image${name ? ` for ${name}` : ""}.`,
        inlineImage ? "I found the saved image and I am showing it here." : "I found the saved profile image reference and I am showing it here."
      ]),
      results: [result],
      responseType: "small_result_list",
      selectedToolName: "openInlineView",
      provider,
      action: {
        mode: "open",
        target: `${role}-profile-image`,
        label: `${role === "business" ? "Business" : "Customer"} profile image`,
        responseType: "small_result_list",
        usesExistingView: true,
        requiresConfirmation: false,
        toolName: "openInlineView"
      }
    };
  }
  return {
      answer: askEmyFormatReply([
        `I cannot see a saved ${label} image in the account data Ask EMY received.`,
      askEmyFormatSection("What to do", [
        role === "business" ? "Open the business profile and add or update the business profile photo." : "Open the customer profile and add or update the profile photo."
      ])
    ]),
    results: [],
    responseType: "chat_answer",
    selectedToolName: "openInlineView",
    provider
  };
}

function askEmyIsCustomerSelfContentQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  const selfCue = /\b(i|me|my|mine|myself|own|personal|customer[- ]side|customer account)\b/.test(text);
  const customerCue = /\b(customer|client|personal)\b/.test(text);
  const contentCue = /\b(content|posts?|clips?|videos?|profile|account|uploads?|feed|activity|page)\b/.test(text);
  if (selfCue && customerCue && contentCue) return true;
  if (/\b(?:i(?:\s+am|'m)?|im|me|myself)\s+as\s+(?:a\s+)?(?:customer|client)\b/.test(text)) return true;
  if (/\b(?:if\s+)?(?:i(?:\s+am|'m)?|im)\s+(?:the\s+)?(?:customer|client)\b[\s\S]{0,80}\b(content|posts?|clips?|videos?|profile|account|uploads?|feed|activity|page)\b/.test(text)) return true;
  if (/\b(?:show|open|view|search|find|list|bring|pull up)\s+(?:me|myself)\b[\s\S]{0,60}\b(?:customer|client)\b/.test(text)) return true;
  if (/\b(?:no no|not that|wrong|no,?\s*not)\b[\s\S]{0,80}\b(?:me|myself|my customer|customer content|customer profile|customer posts?|customer clips?)\b/.test(text)) return true;
  if (/\b(?:me|myself)\b[\s\S]{0,30}\bmy\s+(?:customer|client)\b/.test(text)) return true;
  return false;
}

function askEmyCustomerSelfCountType(query) {
  const text = clean(query).toLowerCase();
  if (!/\b(how many|count|number of|total)\b/.test(text)) return "";
  if (/\b(clip|clips|video|videos|reel|reels)\b/.test(text)) return "clip";
  if (/\b(event|events)\b/.test(text)) return "event";
  if (/\b(article|articles|blog|blogs)\b/.test(text)) return "article";
  if (/\b(post|posts|feed|feeds|updates?)\b/.test(text)) return "post";
  if (/\b(content|uploads?|activity)\b/.test(text)) return "content";
  return "";
}

function askEmyCustomerSelfCountNoun(type, count) {
  const singular = type === "clip" ? "clip"
    : type === "event" ? "event"
      : type === "article" ? "article"
        : type === "post" ? "post"
          : "content item";
  return count === 1 ? singular : `${singular}s`;
}

function askEmyCustomerSelfProfileResult(payload = {}) {
  const account = askEmyProfileAccountForRole(payload || {}, "customer");
  const media = askEmyProfileMedia(account);
  const name = clean(account.name || account.displayName || account.customerName);
  return {
    type: "customer-profile",
    name: `${name || "Your"} customer profile`,
    desc: media.image || media.imageRef
      ? "This is your customer-side EMY profile."
      : "This opens your customer-side EMY profile.",
    image: media.image,
    imageRef: media.imageRef,
    mediaRef: media.imageRef,
    profileImage: media.image,
    profileImageRef: media.imageRef,
    profilePhoto: media.image,
    profilePhotoRef: media.imageRef,
    avatar: media.image,
    avatarRef: media.imageRef,
    email: clean(account.email || account.accountEmail),
    role: "customer",
    url: askEmyProfileUrlForRole("customer"),
    viewSpec: askEmyProfileViewSpec({ role: "customer", name, label: "customer profile", media, account, wantsImage: false }),
    tags: ["Customer profile", media.image || media.imageRef ? "Image saved" : "Profile"]
  };
}

function askEmyFlattenCustomerSelfRows(value, key, rows = [], depth = 0) {
  if (rows.length >= 80 || depth > 4 || value === undefined || value === null) return rows;
  if (Array.isArray(value)) {
    value.forEach((entry) => askEmyFlattenCustomerSelfRows(entry, key, rows, depth + 1));
    return rows;
  }
  if (value && typeof value === "object") {
    if (Array.isArray(value.rows)) return askEmyFlattenCustomerSelfRows(value.rows, key, rows, depth + 1);
    if (Array.isArray(value.items)) return askEmyFlattenCustomerSelfRows(value.items, key, rows, depth + 1);
    if (value.data && typeof value.data === "object" && depth === 0) return askEmyFlattenCustomerSelfRows(value.data, key, rows, depth + 1);
    if (askEmyFirst([value.name, value.title, value.description, value.text, value.caption, value.customerName, value.customerKey])) {
      rows.push({ row: value, key, index: rows.length });
    }
  }
  return rows;
}

function askEmyCustomerSelfRawRows(payload = {}) {
  const rows = [];
  [
    "records",
    "customerRecords",
    "customerContent",
    "customerPosts",
    "customerClips",
    "customerUploads",
    "customerEvents"
  ].forEach((key) => {
    if (payload && payload[key] !== undefined) askEmyFlattenCustomerSelfRows(payload[key], key, rows);
  });
  return rows;
}

function askEmyCustomerSelfRowMatchesViewer(row = {}, payload = {}) {
  const identifiers = askEmyViewerCustomerIdentifiers(payload || {});
  if (!identifiers.size) return false;
  const rowValues = [
    row.customerKey,
    row.customerId,
    row.customerUid,
    row.customerEmail,
    row.customerName,
    row.userId,
    row.uid,
    row.id,
    row.email,
    row.ownerUid,
    row.ownerId,
    row.ownerEmail,
    row.ownerName,
    row.authorUid,
    row.authorId,
    row.authorEmail,
    row.authorName,
    row.createdBy,
    row.createdById,
    row.createdByEmail,
    row.createdByName,
    row.profileKey,
    row.profileName,
    row.displayName,
    row.name
  ].map(clean).map((value) => value.toLowerCase()).filter(Boolean);
  return rowValues.some((value) => identifiers.has(value));
}

function askEmyCustomerSelfRecordType(key, row = {}) {
  const text = [
    key,
    row.type,
    row.kind,
    row.contentType,
    row.postMode,
    row.uploadType,
    row.mediaType
  ].map((item) => clean(item).toLowerCase()).join(" ");
  if (/\b(clip|reel|video)\b/.test(text)) return "clip";
  if (/\b(event|booking|workshop|class)\b/.test(text)) return "event";
  if (/\b(article|news|blog)\b/.test(text)) return "article";
  return "post";
}

function askEmyCustomerSelfResultFromRow(row = {}, key = "customerContent", index = 0) {
  const type = askEmyCustomerSelfRecordType(key, row);
  const title = askEmyFirstUseful([
    row.title,
    row.name,
    row.itemTitle,
    row.detailTitle,
    row.caption,
    row.text
  ], 140) || (type === "clip" ? "Your customer clip" : type === "event" ? "Your customer event" : "Your customer post");
  const desc = askEmyFirstUseful([
    row.description,
    row.summary,
    row.caption,
    row.text,
    row.body,
    row.message
  ], 300);
  const image = askEmyFirst([
    row.image,
    row.imageUrl,
    row.imageSrc,
    row.photo,
    row.photoUrl,
    row.thumbnail,
    row.thumbnailUrl,
    row.coverImage,
    row.coverImageUrl,
    row.mediaSrc,
    row.mediaUrl,
    row.posterSrc
  ]);
  const video = askEmyFirst([
    row.video,
    row.videoUrl,
    row.videoSrc,
    row.clipUrl,
    row.clipSrc
  ]);
  const id = askEmyText(row.id || row.key || row.uid || row.postId || row.clipId || row.feedId || `${key}-${index}`, 120);
  return {
    id,
    type,
    name: title,
    desc,
    image,
    video,
    url: askEmyFirst([row.url, row.href, row.link, row.permalink, row.pageUrl, row.deepLink]) || askEmyProfileUrlForRole("customer"),
    date: askEmyFirst([row.date, row.createdAt, row.updatedAt, row.postedAt, row.time]),
    viewSpec: askEmyContentItemViewSpec({
      type,
      name: title,
      desc,
      image,
      video,
      business: askEmyFirst([row.business, row.businessName, row.ownerName]),
      date: askEmyFirst([row.date, row.createdAt, row.updatedAt, row.postedAt, row.time]),
      views: row.views || row.viewCount || row.viewsText,
      likes: row.likes || row.likeCount,
      comments: row.comments || row.commentCount || row.commentsCount,
      saved: row.saved || row.saves || row.saveCount,
      category: row.category || row.contentCategory
    }, { kind: type === "clip" ? "Customer clip card" : type === "post" ? "Customer post card" : "Customer content card", type }),
    tags: ["Customer content", type].filter(Boolean)
  };
}

function askEmyCustomerSelfContentResults(payload = {}) {
  const seen = new Set();
  return askEmyCustomerSelfRawRows(payload || {})
    .filter(({ row }) => row && typeof row === "object" && askEmyCustomerSelfRowMatchesViewer(row, payload || {}))
    .map(({ row, key, index }) => askEmyCustomerSelfResultFromRow(row, key, index))
    .filter((result) => {
      const id = askEmyVisibleRecordKey(result) || [result.type, result.id, result.name].join("|").toLowerCase();
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .slice(0, 8);
}

function askEmyCustomerSelfContentAnswer(query, payload = {}, recordsInput = [], provider = "local-intent") {
  const profile = askEmyCustomerSelfProfileResult(payload || {});
  const content = askEmyCustomerSelfContentResults(payload || {});
  const businessName = clean(payload && payload.user && (payload.user.businessName || payload.user.business));
  const contrast = businessName ? `${businessName}'s customer list` : "a business customer list";
  const countType = askEmyCustomerSelfCountType(query);
  if (countType) {
    const matching = countType === "content" ? content : content.filter((result) => clean(result.type).toLowerCase() === countType);
    const noun = askEmyCustomerSelfCountNoun(countType, matching.length);
    return {
      answer: askEmyFormatReply([
        matching.length
          ? `You have ${matching.length} customer-side ${noun} visible in EMY.`
          : `I do not see any customer-side ${noun} for your account in the Ask EMY records here yet.`,
        askEmyFormatSection("What I counted", [
          `I counted your own customer-side ${noun}, not ${contrast}.`,
          `All customer-side content visible here: ${content.length}`
        ])
      ]),
      results: [],
      provider
    };
  }
  const counts = content.reduce((map, result) => {
    const type = clean(result.type) || "content";
    map[type] = (map[type] || 0) + 1;
    return map;
  }, {});
  const countLines = Object.keys(counts).sort().map((type) => `${type.charAt(0).toUpperCase()}${type.slice(1)}s: ${counts[type]}`);
  return {
    answer: askEmyFormatReply([
      `I understand - you mean your own customer-side content/profile, not ${contrast}.`,
      content.length
        ? askEmyFormatSection("What I found", [
            `Customer-side content visible: ${content.length}`,
            ...countLines,
            "I am showing the matching customer-side cards below."
          ])
        : askEmyFormatSection("What I can see", [
            "I can show your customer profile below.",
            "I do not see saved customer posts or clips for your customer account in the Ask EMY records here yet."
          ]),
      askEmyFormatSection("Next", [
        "Ask for only your customer posts, clips, or profile and I will keep it separate from business-customer relationships."
      ])
    ]),
    results: content.length ? [...content, profile] : [profile],
    provider
  };
}

function askEmyMediaPreviewTypeFilter(query) {
  const text = askEmyNormalizeIntentText(query);
  if (/\b(products?|product images?)\b/.test(text)) return new Set(["product"]);
  if (/\b(clips?|videos?|reels?)\b/.test(text)) return new Set(["clip", "reel"]);
  if (/\b(posts?|updates?|feed|articles?)\b/.test(text)) return new Set(["post", "article"]);
  if (/\bjobs?\b/.test(text)) return new Set(["job"]);
  return null;
}

function askEmyMediaPreviewAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(Array.isArray(recordsInput) ? recordsInput : [], payload), payload);
  const typeFilter = askEmyMediaPreviewTypeFilter(query);
  const seen = new Set();
  const candidates = marked
    .filter((record) => record && typeof record === "object")
    .filter((record) => {
      const type = clean(record.type).toLowerCase();
      if (typeFilter && !typeFilter.has(type)) return false;
      const media = askEmyRecordMediaDescriptor(record);
      return media.hasMedia || /^(clip|reel|post|article|product|business|customer-profile|business-profile)$/.test(type);
    })
    .filter((record) => {
      const key = askEmyVisibleRecordKey(record) || [record.type, record.id, record.name, record.business, record.image, record.video].map(clean).join("|").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12)
    .map((record) => askEmyAttachContentViewSpec(record, { kind: "Media preview card" }));
  const noun = typeFilter && typeFilter.has("clip") ? "clip/video previews"
    : typeFilter && typeFilter.has("post") ? "post media previews"
      : typeFilter && typeFilter.has("product") ? "product image previews"
        : "media previews";
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      candidates.length
        ? `Here are the ${noun} I can create from the EMY records here.`
        : `I could not find usable ${noun} in the EMY records attached to this chat yet.`,
      candidates.length > 0 ? askEmyFormatSection("How to use them", [
        "Open a card to inspect the media here first.",
        "Ask for clips, posts, products, or a specific business if you want a narrower set."
      ]) : ""
    ].filter(Boolean)),
    provider,
    results: candidates,
    responseType: "small_result_list",
    selectedToolName: "getMediaPreview"
  };
}

function askEmyBusinessComparisonMetric(query) {
  const text = askEmyNormalizeIntentText(query);
  if (/\b(profile views?|profile)\b/.test(text)) return "profile_views";
  if (/\b(likes?|liked)\b/.test(text)) return "business_likes";
  if (/\b(customers?|clients?)\b/.test(text)) return "customers";
  if (/\b(content|products?|clips?|posts?|jobs?)\b/.test(text)) return "content";
  return "overall_score";
}

function askEmyBusinessComparisonMetricLabel(metric) {
  if (metric === "profile_views") return "profile views";
  if (metric === "business_likes") return "business likes";
  if (metric === "customers") return "customers";
  if (metric === "content") return "content items";
  return "score";
}

function askEmyBusinessComparisonValue(card = {}, metric = "overall_score") {
  if (metric === "profile_views") return Math.max(0, Number(card.profileViews || card.profileViewCount || card.views || card.totalViews) || 0);
  if (metric === "business_likes") return Math.max(0, Number(card.businessLikeCount || card.businessLikes || card.likedBusinessCount || card.contentLikes) || 0);
  if (metric === "customers") return Math.max(0, Number(card.customerCount || card.customers) || 0);
  if (metric === "content") return Math.max(0, Number(card.contentTotal) || 0);
  const totalViews = Math.max(0, Number(card.totalViews || card.views || card.profileViews || card.productViews || card.clipViews || card.postViews) || 0);
  const likes = Math.max(0, Number(card.businessLikeCount || card.contentLikes) || 0);
  const customers = Math.max(0, Number(card.customerCount || card.customers) || 0);
  const content = Math.max(0, Number(card.contentTotal) || 0);
  return totalViews + likes * 5 + customers * 8 + content * 3;
}

function askEmyBusinessComparisonCards(payload = {}, recordsInput = []) {
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(Array.isArray(recordsInput) ? recordsInput : [], payload), payload);
  const byKey = new Map();
  const addBusiness = (record = {}) => {
    const name = clean(record.name || record.business || record.businessName);
    const key = slugBusinessLikeId(record.businessKey || record.key || record.profileKey || name);
    if (!key || !name) return;
    if (!byKey.has(key)) byKey.set(key, { ...record, type: "business", name, business: name, businessName: name });
  };
  marked.forEach((record) => {
    if (!record || typeof record !== "object") return;
    const type = clean(record.type).toLowerCase();
    if (type === "business" && askEmyRecordLooksLikeBusinessProfile(askEmyVisibleRecordKey(record), record) && !askEmyRecordHasContentSignals(askEmyVisibleRecordKey(record), record)) {
      addBusiness(record);
      return;
    }
    const business = clean(record.business || record.businessName || record.ownerName || record.sellerName);
    if (business) addBusiness({
      type: "business",
      name: business,
      business,
      businessName: business,
      businessKey: record.businessKey || record.ownerKey || record.sellerKey,
      isOwnedByViewer: record.isOwnedByViewer,
      ownedByViewer: record.ownedByViewer,
      ownerNotice: record.ownerNotice
    });
  });
  const account = askEmyProfileAccountForRole(payload, "business");
  const accountName = clean(account.businessName || account.business || account.name);
  if (accountName) {
    const media = askEmyProfileMedia(account);
    addBusiness({
      type: "business",
      name: accountName,
      business: accountName,
      businessName: accountName,
      businessKey: clean(account.businessKey || account.profileKey || slugBusinessLikeId(accountName)),
      image: media.image,
      imageRef: media.imageRef,
      profileImage: media.image,
      profileImageRef: media.imageRef,
      category: clean(account.businessCategory || account.category),
      address: clean(account.address || account.place || account.location),
      isOwnedByViewer: true,
      ownedByViewer: true,
      isBusinessProfile: true,
      explicitBusinessProfile: true
    });
  }
  return Array.from(byKey.values()).map((card) => askEmyBusinessCardSummaryFromRecords(card, marked));
}

function askEmyMultiBusinessComparisonAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const metric = askEmyBusinessComparisonMetric(query);
  const metricLabel = askEmyBusinessComparisonMetricLabel(metric);
  const cards = askEmyBusinessComparisonCards(payload, recordsInput)
    .map((card) => ({ card, value: askEmyBusinessComparisonValue(card, metric) }))
    .sort((a, b) => b.value - a.value || clean(a.card.name || a.card.business).localeCompare(clean(b.card.name || b.card.business)))
    .slice(0, 25);
  if (!cards.length) {
    return {
      answer: askEmyFormatReply([
        "I cannot see business profiles I can compare yet.",
        askEmyFormatSection("Next step", [
          "Connect or sync the businesses you manage, then ask me to compare them again."
        ])
      ]),
      provider,
      results: [],
      responseType: "chat_answer",
      selectedToolName: "getMultiBusinessComparison"
    };
  }
  const top = cards[0];
  const bars = cards.map(({ card, value }, index) => {
    const name = clean(card.name || card.business || card.businessName) || `Business ${index + 1}`;
    return {
      label: name,
      value,
      details: {
        type: "business",
        business: name,
        name,
        views: value,
        profileViews: Number(card.profileViews || card.profileViewCount) || 0,
        totalViews: Number(card.totalViews || card.views) || 0,
        likes: Number(card.businessLikeCount || card.businessLikes || card.contentLikes) || 0,
        customers: Number(card.customerCount || card.customers) || 0,
        content: Number(card.contentTotal) || 0,
        image: clean(card.image || card.profileImage || card.coverImage),
        imageRef: clean(card.imageRef || card.profileImageRef || card.coverImageRef),
        category: clean(card.category || card.businessCategory),
        url: clean(card.url)
      }
    };
  });
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      `I compared ${cards.length} business${cards.length === 1 ? "" : "es"} by ${metricLabel}.`,
      askEmyFormatSection("Top result", [
        `${clean(top.card.name || top.card.business || top.card.businessName)} leads with ${top.value.toLocaleString()} ${metricLabel}.`
      ]),
      cards.length > 12 ? askEmyFormatSection("Display limit", [
        "I ranked the first 25 businesses in the data here. Ask for a filter or a smaller group to inspect cards one by one."
      ]) : ""
    ].filter(Boolean)),
    provider,
    results: [],
    responseType: "analytics_chart",
    selectedToolName: "getMultiBusinessComparison",
    analytics: {
      answer_type: "analytics_bar_chart",
      title: `Business comparison by ${metricLabel}`,
      metric,
      summary: `${clean(top.card.name || top.card.business || top.card.businessName)} leads with ${top.value.toLocaleString()} ${metricLabel}.`,
      bars,
      top_insight: cards.length > 1
        ? `${clean(top.card.name || top.card.business || top.card.businessName)} is ahead of ${clean(cards[1].card.name || cards[1].card.business || cards[1].card.businessName)} by ${(top.value - cards[1].value).toLocaleString()} ${metricLabel}.`
        : "Only one accessible business is visible here, so there is nothing else to compare yet.",
      next_action: "Use this to decide which business profile or content area to improve first.",
      data_quality: {
        source: "canonical_business_analytics",
        is_estimate: metric === "overall_score",
        has_time_series: false,
        warnings: metric === "overall_score" ? ["Overall score is a simple local ranking from visible EMY signals, not a sales figure."] : []
      }
    }
  };
}

function askEmyIsCustomerRelationshipQuery(query) {
  const text = clean(query).toLowerCase();
  if (askEmyIsViewerLocationQuery(text) || askEmyIsViewerProfileQuery(text) || askEmyIsBusinessCustomerGeoQuery(text)) return false;
  if (askEmyIsProfileIntentQuery(text)) return false;
  if (askEmyIsCustomerSelfContentQuery(text)) return false;
  if (!/\b(customers?|clients?)\b/.test(text)) return false;
  if (/\b(customer experience|customer behaviour|customer behavior|customer support|customer service)\b/.test(text)) return false;
  if (/\b(gain|get|attract|increase|grow|more|find|bring|win|improve|boost|reach)\s+(?:more\s+)?(?:customers?|clients?)\b/.test(text)) return false;
  return /\b(does|do|has|have|had|any|who|list|show|see|their|his|her|its|my|our|business|shop|store|customers?|clients?)\b/.test(text);
}

function askEmyIsDirectionsQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  if (/\b(?:can|could|do|does|will|would)\b[\s\S]{0,50}\b(?:show|make|create|open|display|support|use)\b[\s\S]{0,40}\bmaps?\b/.test(text) && !/\b(directions?|route|navigate|navigation|to|from|there)\b/.test(text)) return false;
  return /\b(map|maps|directions?|route|navigate|navigation|open maps?|show maps?|way there|way to|get there|go there|take me there|how do i get there|how can i get there|how do i get to|how can i get to|where is it|where are they|where is that|where are those)\b/.test(text);
}

function askEmyIsMapAreaQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  const wantsMap = /\b(map|maps|map view|open map|show map|show me on the map|see on the map|view on the map)\b/.test(text) || /\bon the map\b/.test(text);
  if (!wantsMap) return false;
  if (/\b(directions?|route|navigate|navigation|way to|get there|go there|take me(?:\s+to)?|how do i get|how can i get)\b/.test(text)) return false;
  return /\b(my location|where i am|current location|around me|near me|nearby|local|area|radius|business|businesses|shops?|stores?|places?)\b/.test(text)
    || /\b(business|businesses|shops?|stores?|places?)\b[\s\S]{0,40}\bon the map\b/.test(text)
    || /\bon the map\b[\s\S]{0,40}\b(business|businesses|shops?|stores?|places?)\b/.test(text);
}

function askEmyIsBusinessQualityQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  const asksQuality = /\b(good|great|reliable|trustworthy|trusted|legit|real|fake|safe|worth|recommend|recommended|rating|ratings|review|reviews|popular|active|quality|proper|okay|ok)\b/.test(text);
  if (!asksQuality) return false;
  return /\b(business|shop|store|seller|provider|they|them|their|he|his|she|her|it|its|that|this)\b/.test(text);
}

function askEmyIsUnclearQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return true;
  const words = text.split(/[^a-z0-9]+/).filter(Boolean);
  if (words.length === 1 && words[0].length <= 3 && !/^(hi|hey|job|map|tax|vat)$/i.test(words[0])) return true;
  if (words.length === 1 && words[0].length <= 5 && !/[aeiou0-9]/i.test(words[0])) return true;
  return false;
}

function askEmyIsLocationInfoQuery(query) {
  const text = clean(query).toLowerCase();
  if (/\b(find|show|search|list|give me|get|open|business|businesses|product|products|job|jobs|clip|clips|service|services|post|posts|event|events|price|prices|hiring|available)\b/.test(text)) return false;
  return /\b(do you know|what is|what's|where is|where's|where am|show me|tell me)\b.*\b(my location|location|address|gps|radius|near me)\b/.test(text)
    || /\b(my location|saved location|search location|current location|gps coordinates|exact location|radius)\b/.test(text) && !/\b(find|show|search|business|businesses|product|products|job|jobs|clip|clips|service|services|post|posts|event|events)\b/.test(text);
}

function askEmyIsIdentityIntroQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  if (/\b(who are my|who is my|show me|find|search|list|near|nearby|directions?|map|customers?|products?|businesses?|jobs?|clips?|posts?|services?|events?)\b/.test(text)) return false;
  return /\b(who are you|who r you|what are you|tell me who you are|tell me about yourself|who is ask emy|what is ask emy|what can you do|what do you do|how can you help|what are you able to do)\b/.test(text);
}

function askEmyRecordHasContentSignals(value = {}, fallback = "") {
  const text = [
    fallback,
    value && value.type,
    value && value.kind,
    value && value.category,
    value && value.contentType,
    value && value.postMode,
    value && value.uploadType,
    value && value.itemKind,
    value && value.detailKind,
    value && value.tag,
    value && value.createType,
    value && value.mediaKind,
    value && value.clipKind,
    value && value.reelKind,
    value && value.source,
    value && value.createdFrom
  ].map((item) => clean(item).toLowerCase()).join(" ");
  if (/\b(product|products|item|stock|price|job|jobs|hiring|role|work|event|booking|workshop|class|clip|clips|reel|reels|video|article|news|blog|post|feed)\b/.test(text)) return true;
  if (askEmyFirst([
    value && value.productName,
    value && value.productTitle,
    value && value.productId,
    value && value.productKey,
    value && value.price,
    value && value.priceText,
    value && value.jobTitle,
    value && value.jobId,
    value && value.employment,
    value && value.workplace,
    value && value.applicants,
    value && value.clipId,
    value && value.reelId,
    value && value.videoSrc,
    value && value.videoUrl,
    value && value.postId,
    value && value.feedId,
    value && value.articleId,
    value && value.eventId
  ], 180)) return true;
  const id = clean(value && (value.id || value.key || value.uid)).toLowerCase();
  if (/^(business-product-|product-|job-|event-|feed-create-|user-feed-|post-|article-|clip-|reel-)/.test(id)) return true;
  const href = clean(value && (value.href || value.url || value.profileHref || value.link)).toLowerCase();
  return /\b(open=product|open=job|open=event|open=clip|open=post|open=article|tab=products|tab=posts|tab=reels|mode=upload)\b/.test(href);
}

function askEmyRecordLooksLikeBusinessProfile(value = {}, fallback = "") {
  if (!value || typeof value !== "object") return false;
  if (askEmyRecordHasContentSignals(value, fallback) && !value.isBusinessProfile && !value.explicitBusinessProfile) return false;
  const sourceText = [
    fallback,
    value.source,
    value.createdFrom,
    value.origin,
    value.role,
    value.owner,
    value.createdAs,
    value.accountType,
    value.actorType,
    value.authorRole,
    value.viewerType,
    value.profileType,
    value.href,
    value.profileHref,
    value.url
  ].map((item) => clean(item).toLowerCase()).join(" ");
  if (value.isBusinessProfile === true || value.explicitBusinessProfile === true || value.businessProfile === true) return true;
  if (/\b(businessprofiles?|businessaccounts?|businessdirectory|nearbybusinesses|localbusinesses|businessprofiledraft)\b/.test(sourceText)) return true;
  if (/\b(business-profile|business account|business dashboard)\b/.test(sourceText) && !/\b(open=product|open=job|open=clip|open=post|open=article|mode=upload)\b/.test(sourceText)) return true;
  const profileFields = askEmyFirst([
    value.businessDescription,
    value.profileDescription,
    value.aboutBusiness,
    value.about,
    value.bio,
    value.businessOffer,
    value.businessOffers,
    value.whatTheyOffer,
    value.phone,
    value.phoneNumber,
    value.contactPhone,
    value.email,
    value.contactEmail,
    value.businessEmail,
    value.website,
    value.businessWebsite,
    value.businessAddress,
    value.address,
    value.openingHours,
    value.businessHours,
    value.hours,
    value.latitude,
    value.longitude,
    value.logo,
    value.logoUrl,
    value.profileImage,
    value.coverImage
  ], 220);
  return Boolean(profileFields && askEmyFirst([value.businessName, value.business, value.name, value.profileName], 160));
}

function askEmyRecordTypeFrom(value, fallback) {
  const text = [
    value && value.type,
    value && value.kind,
    value && value.category,
    value && value.service,
    value && value.serviceName,
    value && value.contentType,
    value && value.postMode,
    fallback
  ].map((item) => clean(item).toLowerCase()).join(" ");
  if (askEmyRecordLooksLikeBusinessProfile(value, fallback)) return "business";
  if (/\b(service|support|logistics|supplier|suppliers|legal|financial|finance|advice|insight|insights|customer experience|business access)\b/.test(text)) return "service";
  if (/\b(job|hiring|role|work)\b/.test(text)) return "job";
  if (/\b(event|booking|workshop|class)\b/.test(text)) return "event";
  if (/\b(product|item|stock|price)\b/.test(text)) return "product";
  if (/\b(clip|reel|video)\b/.test(text)) return "clip";
  if (/\b(article|news|blog)\b/.test(text)) return "article";
  if (/\b(post|feed)\b/.test(text)) return "post";
  return "";
}

function askEmyNormaliseRecord(value, fallbackType, id) {
  if (!value || typeof value !== "object") return null;
  const type = askEmyRecordTypeFrom(value, fallbackType);
  if (!type) return null;
  const roleText = [
    value.role,
    value.owner,
    value.createdAs,
    value.accountType,
    value.actorType,
    value.authorRole,
    value.viewerType,
    value.profileType
  ].map((item) => clean(item).toLowerCase()).join(" ");
  const hasBusinessIdentity = Boolean(askEmyFirst([
    value.businessName,
    value.business,
    value.businessKey,
    value.profileKey,
    value.sellerName,
    value.ownerName
  ], 120));
  const hasCustomerIdentity = Boolean(askEmyFirst([
    value.customerName,
    value.customerKey,
    value.customerId,
    value.customerUid,
    value.customerEmail
  ], 120));
  const isCustomerRole = /\bcustomer\b/.test(roleText);
  const isBusinessRole = /\bbusiness\b/.test(roleText) || /business-dashboard|business-create|business-profile/i.test([
    value.source,
    value.createdFrom,
    value.profileHref,
    value.href
  ].map(clean).join(" "));
  if (type === "business" && (isCustomerRole || hasCustomerIdentity) && !isBusinessRole) {
    return null;
  }
  if (["post", "clip", "article", "event", "job", "product"].includes(type) && isCustomerRole && !isBusinessRole) {
    return null;
  }
  const rawName = askEmyFirst([
    value.name,
    value.title,
    value.jobTitle,
    value.eventTitle,
    value.productName,
    value.productTitle,
    value.businessName,
    value.displayName,
    value.label
  ], 140);
  const business = askEmyFirst([value.businessName, value.business, value.ownerName, value.sellerName, value.profileName], 140);
  const businessKey = askEmyFirst([value.businessKey, value.detailBusinessKey, value.profileKey, value.ownerKey, value.sellerKey], 140);
  const name = askEmyCardTitleFor(type, value, rawName, business);
  const meaningfulTitle = askEmyFirstUseful([
    type === "product" ? value.productName : "",
    type === "product" ? value.productTitle : "",
    type === "job" ? value.jobTitle : "",
    type === "event" ? value.eventTitle : "",
    value.itemTitle,
    value.detailTitle,
    value.title,
    value.name
  ], 140);
  const place = askEmyFirst([
    value.place,
    value.location,
    value.jobLocation,
    value.workplace,
    value.businessLocation,
    value.businessAddress,
    value.address,
    value.town,
    value.city,
    value.postcode,
    value.distance
  ], 180);
  const rawBusinessDescription = type === "business" ? askEmyFirstUseful([
    value.businessDescription,
    value.profileDescription,
    value.aboutBusiness,
    value.about,
    value.bio,
    value.description,
    value.summary,
    value.desc
  ], 420) : "";
  const businessDescription = type === "business" && !askEmyLooksLikeWeakDescription(rawBusinessDescription) ? rawBusinessDescription : "";
  const rawBusinessOffer = type === "business" ? askEmyFirstUseful([
    value.businessOffer,
    value.businessOffers,
    value.whatTheyOffer,
    value.whatWeOffer,
    value.offer,
    value.offers,
    value.servicesOffered,
    value.businessServices,
    value.services,
    value.serviceDescription,
    value.emyService,
    value.service,
    value.serviceName,
    value.primarySector,
    value.businessCategory
  ], 360) : "";
  const businessOffer = type === "business" && rawBusinessOffer && !askEmyLooksLikeWeakDescription(rawBusinessOffer) && rawBusinessOffer.toLowerCase() !== businessDescription.toLowerCase()
    ? rawBusinessOffer
    : "";
  const rawDesc = type === "business" ? businessDescription : askEmyFirstUseful([
    value.desc,
    value.description,
    value.summary,
    value.productDescription,
    value.text,
    value.caption,
    value.body
  ], 360);
  const desc = askEmyLooksLikeWeakDescription(rawDesc) ? "" : rawDesc;
  const price = askEmyFirst([value.price, value.priceText, value.cost], 80);
  const mediaItems = Array.isArray(value.mediaItems) ? value.mediaItems : [];
  const mediaType = askEmyFirst([value.mediaType, value.resourceType, value.contentType, value.postMode, value.kind], 80);
  const mediaName = askEmyFirst([
    value.mediaName,
    value.fileName,
    value.imageName,
    value.photoName,
    value.thumbnailName,
    ...mediaItems.map((item) => item && item.name)
  ], 180);
  const profileImage = askEmyFirst([
    value.profileImage,
    value.profileImageUrl,
    value.avatar,
    value.avatarUrl,
    value.avatarSrc,
    value.logo,
    value.logoUrl,
    value.photo,
    value.photoUrl
  ], 500);
  const coverImage = askEmyFirst([
    value.coverImage,
    value.coverImageUrl,
    value.cover,
    value.coverUrl,
    value.coverSrc,
    value.bannerImage,
    value.bannerImageUrl,
    value.thumbnail,
    value.thumbnailUrl,
    value.videoThumbnail,
    value.posterSrc,
    value.thumbnailSrc
  ], 500);
  const imageRef = askEmyFirst([
    value.imageRef,
    value.mediaRef,
    value.photoRef,
    value.thumbnailRef,
    ...mediaItems.map((item) => item && (item.ref || item.imageRef || item.mediaRef || item.photoRef))
  ], 500);
  const posterRef = askEmyFirst([
    value.posterRef,
    value.videoPosterRef,
    ...mediaItems.map((item) => item && (item.posterRef || item.videoPosterRef))
  ], 500);
  const rawImage = askEmyFirst([
    value.image,
    value.imageUrl,
    value.imageSrc,
    value.photo,
    value.photoUrl,
    value.logo,
    value.logoUrl,
    value.coverImage,
    value.coverImageUrl,
    value.coverSrc,
    value.avatarSrc,
    value.profileImage,
    value.profileImageUrl,
    value.thumbnail,
    value.thumbnailUrl,
    value.mediaSrc,
    value.mediaUrl,
    value.detailMediaSrc,
    value.videoThumbnail,
    value.posterSrc,
    value.thumbnailSrc,
    ...mediaItems.map((item) => item && (item.src || item.image || item.imageUrl || item.mediaSrc || item.thumbnailSrc || item.posterSrc))
  ], 500);
  const explicitVideo = askEmyFirst([
    value.video,
    value.videoUrl,
    value.videoSrc,
    value.clipUrl,
    value.clipSrc,
    value.mediaSrc,
    value.mediaUrl,
    value.coverSrc,
    ...mediaItems.map((item) => item && (item.video || item.videoUrl || item.videoSrc || item.src || item.mediaSrc))
  ], 500);
  const video = askEmyIsVideoSource(explicitVideo, mediaType) ? explicitVideo : askEmyIsVideoSource(rawImage, mediaType) ? rawImage : "";
  const image = rawImage;
  const category = askEmyFirst([value.category, value.productCategory, value.businessCategory, value.primarySector, value.service, value.serviceName], 80);
  const availability = askEmyFirst([value.availability, value.stockStatus, value.statusText, value.liveStatus], 80);
  const date = askEmyFirst([value.date, value.eventDate, value.startDate, value.postedAt, value.createdAt, value.updatedAt, value.time], 120);
  const phone = type === "business" ? askEmyFirst([value.phone, value.phoneNumber, value.mobile, value.mobileNumber, value.telephone, value.contactPhone], 80) : "";
  const email = type === "business" ? askEmyFirst([value.email, value.contactEmail, value.businessEmail], 160) : "";
  const website = type === "business" ? askEmyFirst([value.website, value.site, value.businessWebsite], 220) : "";
  const address = type === "business" ? askEmyFirst([value.businessAddress, value.address, value.location, value.town, value.city, value.postcode], 220) : "";
  const openingHours = type === "business" ? askEmyFirst([value.openingHours, value.businessHours, value.hours, value.workingHours, value.workingDays, value.openingTimes], 180) : "";
  const openStatus = type === "business" ? askEmyFirst([value.openStatus, value.statusText, value.businessStatus, value.status, value.availability], 80) : "";
  const openStatusDetail = type === "business" ? askEmyFirst([value.openStatusDetail, value.statusDetail, value.nextOpeningTime, value.nextClosingTime], 180) : "";
  const latitude = type === "business" ? askEmyFirst([value.latitude, value.lat, value.businessLatitude, value.locationLat, value.mapLat, value.geoLat, value.coordinates && value.coordinates.lat, value.geo && value.geo.lat, value.map && value.map.lat], 80) : "";
  const longitude = type === "business" ? askEmyFirst([value.longitude, value.lng, value.lon, value.businessLongitude, value.locationLng, value.locationLon, value.mapLng, value.geoLng, value.coordinates && (value.coordinates.lng || value.coordinates.lon), value.geo && value.geo.lng, value.map && value.map.lng], 80) : "";
  const jobTitle = type === "job" ? askEmyFirstUseful([value.jobTitle, value.roleTitle, value.title, meaningfulTitle], 140) : "";
  const jobLocation = type === "job" ? askEmyFirst([value.jobLocation, value.location, value.place, value.businessLocation, value.businessAddress, value.address, value.town, value.city, value.postcode], 180) : "";
  const workplace = type === "job" ? askEmyFirst([value.workplace, value.workplaceType, value.workMode, value.remote], 80) : "";
  const employment = type === "job" ? askEmyFirst([value.employment, value.employmentType, value.contractType, value.jobType, value.hours], 80) : "";
  const experience = type === "job" ? askEmyFirst([value.experience, value.experienceLevel, value.requirements], 160) : "";
  const apply = type === "job" ? askEmyFirst([value.apply, value.applyMethod, value.application, value.applicationMethod, value.contactMethod], 180) : "";
  const notes = type === "job" ? askEmyFirstUseful([value.notes, value.requirements, value.feedIntro, value.shareText], 220) : "";
  const applicants = type === "job" ? askEmyFirst([value.stats, value.applicantText, typeof value.applicants === "number" ? `${value.applicants} applicants` : value.applicants], 80) : "";
  const likes = askEmyCountForLabel([value.likes, value.likeCount, value.countedLikeCount, value.stats, value.detailMeta], /likes?|liked/);
  const businessLikeCount = type === "business"
    ? Math.max(likes, Number(value.businessLikeCount || value.businessLikes || value.likedBusinessCount || value.cumulativeLikes) || 0)
    : 0;
  const saved = askEmyCountForLabel([value.saved, value.saves, value.saveCount, value.savedCount, value.stats, value.detailMeta], /saved|saves?/);
  const views = askEmyCountForLabel([value.views, value.viewCount, value.viewsText, value.visitCount, value.stats, value.detailMeta], /views?|viewed|visits?/);
  const comments = askEmyCountForLabel([value.commentsCount, value.commentCount, value.commentsText, value.stats, Array.isArray(value.comments) ? value.comments.length : ""], /comments?|replies?/);
  const orders = askEmyCountForLabel([value.orders, value.orderCount, value.ordersCount, value.purchaseCount, value.purchases, value.bookings, value.bookingCount, value.stats, value.detailMeta], /orders?|purchases?|bought|bookings?/);
  const sales = askEmyCountForLabel([value.sales, value.saleCount, value.salesCount, value.unitsSold, value.soldCount, value.sold, value.stats, value.detailMeta], /sales?|sold|units sold/);
  const tags = [
    type,
    category,
    availability
  ].map((item) => askEmyText(item, 40)).filter(Boolean)
    .filter((item, index, list) => list.findIndex((entry) => entry.toLowerCase() === item.toLowerCase()) === index)
    .slice(0, 5);
  let title = name || business || `${type} result`;
  if (type === "product" && askEmyLooksLikePlaceholderText(meaningfulTitle || title)) {
    const cleanCategory = category && !askEmyLooksLikePlaceholderText(category) && !/^other$/i.test(category) ? category : "Product";
    const priceSuffix = price ? ` - ${price}` : "";
    title = business ? `${cleanCategory} from ${business}${priceSuffix}` : `${cleanCategory}${priceSuffix}`;
  }
  if (type === "product" && business && title.toLowerCase() === business.toLowerCase() && !price && !desc && !image && /^product$/i.test(category || "")) {
    return null;
  }
  if (type === "job" && askEmyLooksLikePlaceholderText(meaningfulTitle || title)) {
    title = business ? `${business} job post` : "Job post";
  }
  if (!title && !desc) return null;
  const systemUploadText = [
    title,
    desc,
    value.body,
    value.message,
    value.itemTitle,
    value.detailTitle
  ].map((item) => clean(item).toLowerCase()).join(" ");
  if (type === "business" && !value.isBusinessProfile && !value.explicitBusinessProfile && /\b(new clip|clip upload completed|upload completed|your post was published|post was published)\b/.test(systemUploadText)) {
    return null;
  }
  if (type === "business" && /^emy$/i.test(title) && !place && !desc && !category && !image) {
    return null;
  }
  if (["event", "service"].includes(type) && askEmyLooksLikePlaceholderText(meaningfulTitle || title)) {
    return null;
  }
  if (type === "product" && /\b(your post was published|post was published)\b/.test(systemUploadText) && !price && !image && !askEmyFirstUseful([value.productName, value.productTitle], 140)) {
    return null;
  }
  const explicitUrl = askEmyFirst([value.url, value.href, value.link, value.permalink, value.pageUrl, value.deepLink], 500);
  const query = encodeURIComponent(title || "");
  const recordId = askEmyText(value.id || value.key || value.uid || id, 120);
  const businessTarget = (() => {
    const name = askEmyFirst([business, value.businessName, value.business, value.ownerName, value.sellerName, value.profileName], 180);
    const key = askEmyFirst([businessKey, value.businessKey, value.detailBusinessKey, value.profileKey, value.ownerKey, value.sellerKey], 180);
    const cleanKey = askEmyAliasKey(key);
    if (cleanKey && cleanKey !== "profile" && cleanKey !== "business-profile") return cleanKey;
    return askEmyAliasKey(name || key || "profile");
  })();
  const generatedUrl = query
    ? type === "service" ? "emy-business-profile.html?mode=business#services"
      : type === "business" ? `emy-business-profile.html?business=${encodeURIComponent(businessTarget)}`
      : type === "product" ? `emy-business-profile.html?business=${encodeURIComponent(businessTarget)}&tab=products&open=product&item=${encodeURIComponent(recordId || value.productId || value.itemId || title || "")}&title=${query}`
      : type === "job" ? `emy-business-profile.html?business=${encodeURIComponent(businessTarget)}&tab=posts&open=job&item=${encodeURIComponent(recordId || title || "")}&title=${query}`
        : type === "event" ? `emy-business-profile.html?business=${encodeURIComponent(businessTarget)}&tab=posts&open=event&item=${encodeURIComponent(recordId || value.eventId || value.feedId || value.itemId || title || "")}&title=${query}`
          : type === "clip" ? `emy-business-profile.html?business=${encodeURIComponent(businessTarget)}&tab=reels&open=clip&item=${encodeURIComponent(recordId || value.clipId || value.reelId || value.feedId || value.itemId || title || "")}&title=${query}`
            : (type === "post" || type === "article") ? `emy-business-profile.html?business=${encodeURIComponent(businessTarget)}&tab=posts&open=${type === "article" ? "article" : "post"}&item=${encodeURIComponent(recordId || value.postId || value.articleId || value.feedId || value.itemId || title || "")}&title=${query}`
            : `emy-customer-search.html?q=${query}`
    : "";
  const canonicalTypes = ["product", "job", "event", "clip", "post", "article"];
  const url = canonicalTypes.includes(type) ? generatedUrl || explicitUrl : explicitUrl || generatedUrl;
  return {
    id: recordId,
    productId: askEmyText(value.productId || value.detailProductId || value.itemId || recordId, 160),
    productKey: askEmyText(value.productKey || value.detailProductKey || value.itemKey || "", 160),
    productName: askEmyText(value.productName || value.productTitle || value.itemTitle || meaningfulTitle || rawName, 160),
    type,
    name: title,
    business,
    businessKey,
    place,
    desc,
    price,
    image,
    imageRef,
    mediaRef: imageRef,
    profileImage,
    coverImage,
    video,
    posterRef,
    url,
    category,
    availability,
    date,
    mediaType,
    businessDescription,
    businessOffer,
    phone,
    email,
    website,
    address,
    latitude,
    longitude,
    openingHours,
    openStatus,
    openStatusDetail,
    businessLikeCount,
    jobTitle,
    jobLocation,
    workplace,
    employment,
    experience,
    apply,
    notes,
    applicants,
    likes,
    likeCount: likes,
    saved,
    saveCount: saved,
    views,
    viewCount: views,
    comments,
    commentCount: comments,
    orders,
    orderCount: orders,
    sales,
    saleCount: sales,
    tags
  };
}

async function askEmyCollectionRecords(collectionName, type, limit) {
  try {
    const snap = await db.collection(collectionName).limit(limit).get();
    return snap.docs
      .map((doc) => askEmyNormaliseRecord(Object.assign({ id: doc.id }, doc.data() || {}), type, doc.id))
      .filter(Boolean);
  } catch (error) {
    return [];
  }
}

async function askEmyContentRecords() {
  try {
    const snap = await db.collectionGroup("items").limit(80).get();
    return snap.docs
      .map((doc) => askEmyNormaliseRecord(Object.assign({ id: doc.id }, doc.data() || {}), "post", doc.id))
      .filter(Boolean);
  } catch (error) {
    return [];
  }
}

function askEmyVisibleRecordKey(record) {
  const type = askEmyText(record && record.type, 140).toLowerCase();
  if (type === "clip" || type === "reel") {
    const stableId = askEmyText(record && (record.productId || record.clipId || record.reelId || record.feedId || record.itemId), 180).toLowerCase();
    const id = askEmyText(record && record.id, 180).toLowerCase();
    const canonicalId = stableId || (id && !/^(smoke|test|sample|demo)[-_]/.test(id) ? id : "");
    const media = askEmyText(record && (record.video || record.videoUrl || record.clipUrl || record.clipSrc || record.mediaUrl || record.image || record.coverImage || record.poster || record.posterImage), 500)
      .toLowerCase()
      .replace(/\/so_[^/]+\/?/i, "/")
      .replace(/\.(jpg|jpeg|png|webp|gif|mp4|webm|mov)([?#].*)?$/i, "");
    const date = askEmyText(record && (record.date || record.createdAt || record.at), 180).toLowerCase();
    if (canonicalId) return `clip|${canonicalId}`;
    return ["clip", media || id, date].filter(Boolean).join("|");
  }
  const id = askEmyText(record && record.id, 140).toLowerCase();
  if (id && ["job", "event", "clip", "article", "post"].includes(type)) {
    return `${type}|${id}`;
  }
  const name = askEmyText(record && record.name, 140).toLowerCase();
  const business = askEmyText(record && record.business, 140).toLowerCase();
  return [
    type,
    name,
    business && business !== name ? business : "",
    record && record.place,
    record && record.price,
    record && record.category
  ].map((item) => askEmyText(item, 140).toLowerCase()).join("|");
}

function askEmyDedupeVisibleRecords(records = []) {
  const rows = [];
  const indexByKey = new Map();
  (Array.isArray(records) ? records : []).forEach((record) => {
    const visibleRecord = askEmyCanonicalizeVisibleRecord(record);
    const key = askEmyVisibleRecordKey(visibleRecord);
    if (!key) {
      rows.push(visibleRecord);
      return;
    }
    if (!indexByKey.has(key)) {
      indexByKey.set(key, rows.length);
      rows.push(visibleRecord);
      return;
    }
    const existingIndex = indexByKey.get(key);
    if (askEmyVisibleRecordPriority(visibleRecord) > askEmyVisibleRecordPriority(rows[existingIndex])) {
      rows[existingIndex] = visibleRecord;
    }
  });
  return rows;
}

function askEmyCanonicalizeVisibleRecord(record) {
  const type = askEmyText(record && record.type, 140).toLowerCase();
  if ((type !== "clip" && type !== "reel") || !record || typeof record !== "object") return record;
  const id = askEmyText(record.id, 180);
  const stableId = askEmyText(record.productId || record.clipId || record.reelId || record.feedId || record.itemId, 180);
  const canonicalId = stableId || (id && !/^(smoke|test|sample|demo)[-_]/i.test(id) ? id : "");
  if (!canonicalId) return record;
  const next = { ...record, id: canonicalId, productId: record.productId || canonicalId };
  const url = askEmyText(record.url, 500);
  if (url) {
    const encoded = encodeURIComponent(canonicalId);
    next.url = /([?&]item=)[^&#]*/i.test(url)
      ? url.replace(/([?&]item=)[^&#]*/i, `$1${encoded}`)
      : `${url}${url.includes("?") ? "&" : "?"}item=${encoded}`;
  }
  return next;
}

function askEmyVisibleRecordPriority(record) {
  const type = askEmyText(record && record.type, 140).toLowerCase();
  if (type !== "clip" && type !== "reel") return 0;
  const id = askEmyText(record && record.id, 180).toLowerCase();
  const stableId = askEmyText(record && (record.productId || record.clipId || record.reelId || record.feedId || record.itemId), 180).toLowerCase();
  let score = 0;
  if (stableId && id && stableId === id) score += 20;
  if (id && !/^(smoke|test|sample|demo)[-_]/.test(id)) score += 5;
  if (askEmyText(record && record.url, 500).toLowerCase().includes(stableId)) score += 3;
  if (askEmyText(record && (record.video || record.videoUrl || record.clipUrl || record.clipSrc), 500)) score += 2;
  return score;
}

function askEmyBusinessRecordAlias(record) {
  if (!record) return "";
  const source = record.type === "business"
    ? [record.businessKey, record.name, record.business]
    : [record.businessKey, record.business, record.name];
  for (const value of source) {
    const alias = askEmyAliasKey(value);
    if (alias) return alias;
  }
  return "";
}

function askEmyEnrichBusinessRecords(records) {
  const relatedByBusiness = new Map();
  const mergeRelated = (alias, record) => {
    if (!alias || !record || record.type === "business") return;
    const current = relatedByBusiness.get(alias) || {};
    const recentActivity = record.desc && !askEmyIsSystemCardText(record.desc) ? record.desc : "";
    const related = {
      date: current.date || record.date || "",
      recentActivity: current.recentActivity || recentActivity
    };
    relatedByBusiness.set(alias, related);
  };
  records.forEach((record) => {
    mergeRelated(askEmyBusinessRecordAlias(record), record);
  });
  return records.map((record) => {
    if (!record || record.type !== "business") return record;
    const related = relatedByBusiness.get(askEmyBusinessRecordAlias(record)) || {};
    const profileMedia = record.video || record.image || record.coverImage || record.profileImage || "";
    const tags = [
      ...(Array.isArray(record.tags) ? record.tags : []),
    ].filter(Boolean).filter((item, index, list) => list.findIndex((entry) => entry.toLowerCase() === item.toLowerCase()) === index).slice(0, 5);
    return {
      ...record,
      image: record.image || record.coverImage || "",
      profileImage: record.profileImage || "",
      coverImage: record.coverImage || "",
      video: record.video || "",
      mediaType: profileMedia ? record.mediaType || "" : "",
      category: record.category || "",
      availability: record.availability || "",
      date: record.date || related.date || "",
      recentActivity: record.recentActivity || related.recentActivity || "",
      tags
    };
  });
}

function askEmyDedupeRecords(records) {
  const seen = new Set();
  const output = [];
  records.forEach((record) => {
    if (!record) return;
    const key = askEmyVisibleRecordKey(record) || clean([record.type, record.id].join("|")).toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    output.push(record);
  });
  return askEmyEnrichBusinessRecords(output).slice(0, ASK_EMY_MAX_CONTEXT_RECORDS);
}

async function askEmyLoadContextRecords() {
  const groups = await Promise.all([
    askEmyCollectionRecords("businessProfiles", "business", 35),
    askEmyCollectionRecords("businessAccounts", "business", 35),
    askEmyCollectionRecords("publicBusinessContent", "business", 50),
    askEmyContentRecords()
  ]);
  return askEmyDedupeRecords(groups.flat());
}

function askEmyNumberFrom(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const text = clean(value).replace(/,/g, "");
  if (!text) return null;
  const match = text.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function askEmyFirstNumber(values) {
  for (const value of values) {
    const number = askEmyNumberFrom(value);
    if (number !== null && Number.isFinite(number)) return number;
  }
  return null;
}

function askEmyAnalyticsKind(source, value) {
  const text = [
    source,
    value && value.type,
    value && value.kind,
    value && value.metric,
    value && value.action
  ].map((item) => clean(item).toLowerCase()).join(" ");
  if (/direction|route|map/.test(text)) return "directions";
  if (/profile/.test(text)) return "profile views";
  if (/clip|reel|video/.test(text)) return "clip views";
  if (/product/.test(text)) return "product engagement";
  if (/post|article|feed/.test(text)) return "post engagement";
  if (/like/.test(text)) return "likes";
  if (/save/.test(text)) return "saves";
  if (/share/.test(text)) return "shares";
  if (/order|booking|sale|revenue/.test(text)) return "sales";
  return "engagement";
}

function askEmyAnalyticsName(value, source, kind) {
  const name = askEmyFirst([
    value && value.name,
    value && value.title,
    value && value.productName,
    value && value.businessName,
    value && value.business,
    value && value.label,
    value && value.id
  ], 120);
  if (name) return name;
  const parts = String(source || "").split("/").filter(Boolean);
  let fallback = clean(parts.pop()).replace(/[-_]/g, " ");
  if (/^(total|count|value|views?|likes?|saves?|shares?|orders?|bookings?|sales?|revenue|events?)$/i.test(fallback)) {
    fallback = clean(parts.pop()).replace(/[-_]/g, " ") || fallback;
  }
  return fallback || kind;
}

function askEmyNormaliseAnalyticsRow(value, source) {
  if (!value || typeof value !== "object") return null;
  const eventCount = Array.isArray(value.events) ? value.events.length : 0;
  const total = askEmyFirstNumber([
    value.total,
    value.count,
    value.value,
    value.views,
    value.viewCount,
    value.profileViews,
    value.directions,
    value.directionCount,
    value.likes,
    value.likeCount,
    value.saves,
    value.saveCount,
    value.shares,
    value.shareCount,
    value.orders,
    value.bookings,
    value.sales,
    value.revenue
  ]);
  const bestTotal = Math.max(total || 0, eventCount);
  if (!bestTotal) return null;
  const kind = askEmyAnalyticsKind(source, value);
  return {
    kind,
    name: askEmyAnalyticsName(value, source, kind),
    total: bestTotal,
    lastAt: askEmyFirst([value.lastViewedAt, value.lastUpdatedAt, value.updatedAt, value.createdAt, value.at], 80),
    source: clean(source).slice(0, 120)
  };
}

async function askEmyAnalyticsCollectionRecords(collectionName, limit) {
  try {
    const snap = await db.collection(collectionName).limit(limit).get();
    return snap.docs
      .map((doc) => askEmyNormaliseAnalyticsRow(Object.assign({ id: doc.id }, doc.data() || {}), `${collectionName}/${doc.id}`))
      .filter(Boolean);
  } catch (error) {
    return [];
  }
}

async function askEmyAnalyticsEventRecords() {
  try {
    const snap = await db.collectionGroup("events").limit(80).get();
    return snap.docs
      .map((doc) => askEmyNormaliseAnalyticsRow(Object.assign({ id: doc.id }, doc.data() || {}), doc.ref.path))
      .filter(Boolean);
  } catch (error) {
    return [];
  }
}

function askEmyContentCounts(records) {
  const counts = { business: 0, service: 0, product: 0, job: 0, event: 0, clip: 0, post: 0, article: 0 };
  (Array.isArray(records) ? records : []).forEach((record) => {
    const type = clean(record && record.type).toLowerCase();
    if (Object.prototype.hasOwnProperty.call(counts, type)) counts[type] += 1;
  });
  return counts;
}

async function askEmyLoadAnalyticsSummary(payload, records) {
  const groups = await Promise.all([
    askEmyAnalyticsCollectionRecords("businessAnalytics", 50),
    askEmyAnalyticsCollectionRecords("analyticsEvents", 80),
    askEmyAnalyticsEventRecords()
  ]);
  const seenMetrics = new Set();
  const seenMetricValues = new Set();
  const metrics = groups.flat()
    .filter((row) => row && Number(row.total) > 0)
    .sort((a, b) => Number(b.total) - Number(a.total))
    .filter((row) => {
      const id = `${row.kind}|${row.name}|${row.total}`.toLowerCase();
      const valueId = `${row.kind}|${row.total}`.toLowerCase();
      if (seenMetrics.has(id)) return false;
      if (seenMetricValues.has(valueId)) return false;
      seenMetrics.add(id);
      seenMetricValues.add(valueId);
      return true;
    })
    .slice(0, 12);
  const contentCounts = askEmyContentCounts(records);
  return {
    location: askEmyText(payload && payload.location, 120) || "your saved location",
    radius: askEmyText(payload && payload.radius, 80) || "nearby",
    contentCounts,
    metrics,
    hasMetricStats: metrics.length > 0,
    hasContentRecords: Object.keys(contentCounts).some((key) => contentCounts[key] > 0)
  };
}

function askEmyAnalyticsMode(query) {
  const text = askEmyNormalizeIntentText(query);
  const simple = text.replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
  if (/^(graphs?|charts?|visuals?|bars?)$/.test(simple)) return "show";
  if (/\b(line charts?|line graphs?|trend charts?|trend graphs?|time series|timeseries|over time|daily|weekly|monthly)\b/.test(simple)) return "line";
  if (/^(what are|what is|explain|define)\b[\s\S]{0,40}\b(stats?|statistics|analytics|engagement|views?|insights?)\b/.test(simple) && !/\b(my|mine|for me|business|profile|product|these|those|numbers?)\b/.test(simple)) return "concept";
  if (/^(explain|what does|what do|break down|help me understand)\b[\s\S]{0,80}\b(my|mine|business|profile|product|these|those|numbers?|stats?|statistics|analytics|views?|signals?)\b/.test(simple)) return "insight";
  if (!simple || askEmyIsBareActionNounQuery(simple)) return "clarify";
  if (askEmyIsProductDemandQuestion(simple)) return "product";
  if (/\b(compare|comparison|versus|vs|against|difference|better|best|top)\b/.test(simple)) return "compare";
  if (/\b(sales|orders?|revenue|bookings?|enquiries|enquiry|income|money|customers? bought|buy most|bought most)\b/.test(simple)) return "sales";
  if (/\b(products?|items?|listings?|stock)\b/.test(simple) && /\b(stats?|statistics|analytics|engagement|views?|likes?|saves?|performance|perform|doing|interest)\b/.test(simple)) return "product";
  if (/\b(why|mean|means|good|bad|low|high|improve|next|should i|what to do|understand|analyse|analyze|review|insight|performance|performing|working)\b/.test(simple)) return "insight";
  if (/\b(graphs?|charts?|visual|show|pull up|bring|display|open|give me|what are my|my stats|my statistics|how many)\b/.test(simple)) return "show";
  return "clarify";
}

function askEmyAnalyticsRows(summary = {}, filterPattern = null) {
  const rows = (summary.metrics || []).filter((row) => row && Number(row.total) > 0);
  return filterPattern ? rows.filter((row) => filterPattern.test(`${row.kind || ""} ${row.name || ""} ${row.source || ""}`)) : rows;
}

function askEmyAnalyticsChartLines(summary = {}, filterPattern = null, limit = 6) {
  const rows = askEmyAnalyticsRows(summary, filterPattern);
  if (rows.length) return rows.slice(0, limit).map((row) => `${row.kind}: ${row.total}`);
  return Object.keys(summary.contentCounts || {})
    .filter((key) => !filterPattern || filterPattern.test(key))
    .sort((a, b) => summary.contentCounts[b] - summary.contentCounts[a])
    .slice(0, limit)
    .map((key) => `${key}: ${summary.contentCounts[key]}`);
}

function askEmyAnalyticsHasSalesMetrics(summary = {}) {
  return askEmyAnalyticsRows(summary, /enquiries?|inquiries?|messages?|contacts?|leads?|customer interest|directions?/i).length > 0;
}

function askEmyAnalyticsTable(rows = []) {
  if (!rows.length) return "";
  return [
    "| Signal | Value | What it suggests |",
    "| --- | ---: | --- |",
    ...rows.slice(0, 5).map((row, index) => {
      const suggestion = index === 0
        ? "Strongest visible attention signal"
        : /enquiries?|inquiries?|messages?|contacts?|leads?|customer interest|directions?/i.test(row.kind)
          ? "Customer action signal"
          : /product/i.test(row.kind)
            ? "Product interest to turn into enquiries"
            : "Secondary activity signal";
      return `| ${row.kind} | ${row.total} | ${suggestion} |`;
    })
  ].join("\n");
}

function askEmyGenericAnalyticsPlan(query, payload = {}) {
  const plan = askEmyPlanMessage(query, payload) || {};
  const entity = clean(plan.analyticsEntity || plan.entity || "business");
  const metric = clean(plan.analyticsMetric || plan.metric || (entity === "jobs" ? "applications" : entity === "posts" ? "engagement" : "views"));
  return {
    entity: entity && entity !== "unknown" ? entity : "business",
    metric: metric && metric !== "unknown" ? metric : "views",
    groupBy: clean(plan.analyticsGroupBy || ""),
    chartType: clean(plan.analyticsChartType || "horizontal_bar"),
    scope: clean(plan.analyticsScope || "active_business"),
    limit: Number(plan.limit) > 0 ? Math.min(Number(plan.limit), 12) : 6,
    requiresTimeSeries: Boolean(plan.requiresTimeSeries)
  };
}

function askEmyGenericMetricLabel(metric = "") {
  const key = clean(metric).toLowerCase();
  if (key === "profile_views") return "profile views";
  if (key === "product_views") return "product views";
  if (key === "overall_score") return "overall score";
  return key.replace(/_/g, " ") || "value";
}

function askEmyGenericMetricUnit(metric = "", value = 0) {
  const label = askEmyGenericMetricLabel(metric);
  if (Number(value) === 1 && label.endsWith("s")) return label.slice(0, -1);
  return label;
}

function askEmyGenericEntityLabel(entity = "") {
  const key = clean(entity).toLowerCase();
  if (key === "businesses") return "businesses";
  if (key === "business") return "business";
  if (key === "products" || key === "product") return "products";
  if (key === "jobs") return "jobs";
  if (key === "clips") return "clips";
  if (key === "posts") return "posts";
  if (key === "articles") return "articles";
  if (key === "customers") return "customers";
  return key || "analytics";
}

function askEmyGenericAnalyticsTitle(plan = {}) {
  const entityLabel = askEmyGenericEntityLabel(plan.entity);
  const metricLabel = askEmyGenericMetricLabel(plan.metric);
  if (plan.groupBy === "category") return `${entityLabel} by category`;
  if (plan.entity === "businesses") return `Business comparison by ${metricLabel}`;
  if (plan.entity === "business") return `Business statistics by ${metricLabel}`;
  return `${entityLabel} by ${metricLabel}`;
}

function askEmyGenericRecordTypeForEntity(entity = "") {
  const key = clean(entity).toLowerCase();
  if (key === "products" || key === "product") return "product";
  if (key === "jobs") return "job";
  if (key === "clips") return "clip";
  if (key === "posts") return "post";
  if (key === "articles") return "article";
  return "";
}

function askEmyGenericRecordLabel(record = {}, fallback = "Item") {
  return clean(record.name || record.title || record.jobTitle || record.caption || record.heading || record.business || record.businessName || fallback);
}

function askEmyGenericRecordMetricCount(record = {}, metric = "views") {
  const key = clean(metric).toLowerCase();
  const stats = record && typeof record.stats === "object" ? record.stats : {};
  const analytics = record && typeof record.analytics === "object" ? record.analytics : {};
  if (key === "count") return 1;
  if (key === "engagement" || key === "overall_score") {
    return askEmyProductActivityScore(record)
      + (askEmyFirstNumber([record.applicants, record.applicantCount, record.applications, stats.applications]) || 0)
      + (askEmyFirstNumber([record.messages, record.messageCount, stats.messages]) || 0);
  }
  const fieldMap = {
    profile_views: ["profileViews", "profile_views", "profileViewCount", "businessViews", "views", "viewCount"],
    product_views: ["productViews", "product_views", "productViewCount", "views", "viewCount"],
    views: ["views", "viewCount", "view_count", "visits", "traffic"],
    likes: ["likes", "likeCount", "likesCount"],
    comments: ["comments", "commentCount", "commentsCount", "replies"],
    saves: ["saves", "saveCount", "savesCount"],
    shares: ["shares", "shareCount", "sharesCount"],
    applications: ["applications", "applicationCount", "applicationsCount", "applicants", "applicantCount"],
    messages: ["messages", "messageCount", "messagesCount"],
    enquiries: ["enquiries", "enquiryCount", "enquiriesCount", "inquiries", "inquiryCount"]
  };
  const fields = fieldMap[key] || [key];
  const values = [];
  fields.forEach((field) => {
    values.push(record[field], stats[field], analytics[field]);
  });
  return askEmyFirstNumber(values) || 0;
}

function askEmyGenericAnalyticsGroupRows(records = [], plan = {}) {
  const groups = new Map();
  records.forEach((record) => {
    const label = plan.groupBy === "category"
      ? clean(record.category || record.type || "Uncategorised")
      : plan.groupBy === "business" || plan.entity === "businesses"
        ? clean(record.business || record.businessName || record.ownerName || "Unknown business")
        : plan.groupBy === "status"
          ? clean(record.status || record.availability || "Unknown status")
          : askEmyGenericRecordLabel(record, "Item");
    const value = askEmyGenericRecordMetricCount(record, plan.metric);
    const current = groups.get(label) || {
      label,
      value: 0,
      count: 0,
      details: {
        type: plan.entity,
        business: clean(record.business || record.businessName),
        category: clean(record.category)
      }
    };
    current.value += value;
    current.count += 1;
    groups.set(label, current);
  });
  return Array.from(groups.values()).map((row) => ({
    ...row,
    value: plan.metric === "count" && row.value === row.count ? row.count : row.value
  }));
}

function askEmyGenericAnalyticsRowsFromRecords(recordsInput = [], plan = {}) {
  const records = Array.isArray(recordsInput) ? recordsInput : [];
  const wantedType = askEmyGenericRecordTypeForEntity(plan.entity);
  let scoped = wantedType
    ? records.filter((record) => clean(record && record.type).toLowerCase() === wantedType)
    : records.filter((record) => clean(record && record.business || record && record.businessName));
  if (plan.entity === "businesses") scoped = records.filter((record) => clean(record && record.business || record && record.businessName));
  if (!scoped.length) return [];
  const rows = (plan.groupBy === "category" || plan.groupBy === "business" || plan.groupBy === "status" || plan.entity === "businesses")
    ? askEmyGenericAnalyticsGroupRows(scoped, plan)
    : scoped.map((record) => ({
        label: askEmyGenericRecordLabel(record, clean(record.type) || "Item"),
        value: askEmyGenericRecordMetricCount(record, plan.metric),
        details: {
          type: clean(record.type),
          business: clean(record.business || record.businessName),
          category: clean(record.category),
          date: clean(record.date || record.createdAt),
          image: clean(record.image || record.imageRef || record.mediaRef)
        }
      }));
  return rows
    .filter((row) => row && row.label)
    .sort((a, b) => Number(b.value) - Number(a.value) || clean(a.label).localeCompare(clean(b.label)))
    .slice(0, plan.limit || 6);
}

function askEmyGenericAnalyticsRowsFromSummary(summary = {}, plan = {}) {
  const metric = askEmyGenericMetricLabel(plan.metric);
  const rows = (summary.metrics || [])
    .filter((row) => row && Number(row.total) > 0)
    .filter((row) => {
      const text = `${row.kind || ""} ${row.name || ""} ${row.source || ""}`.toLowerCase();
      if (plan.metric === "profile_views") return /profile/.test(text);
      if (plan.metric === "product_views") return /product/.test(text);
      if (plan.metric === "views") return /views?|profile|product|clip|post/.test(text);
      if (plan.metric === "engagement") return /engagement|product|post|clip|like|save|comment/.test(text);
      return text.includes(metric);
    })
    .map((row) => ({
      label: clean(row.kind || row.name || metric),
      value: Number(row.total) || 0,
      details: {
        source: clean(row.source || "canonical_analytics")
      }
    }));
  if (rows.length) return rows.sort((a, b) => b.value - a.value).slice(0, plan.limit || 6);
  return Object.keys(summary.contentCounts || {})
    .filter((key) => Number(summary.contentCounts[key]) > 0)
    .sort((a, b) => Number(summary.contentCounts[b]) - Number(summary.contentCounts[a]))
    .slice(0, plan.limit || 6)
    .map((key) => ({
      label: key,
      value: Number(summary.contentCounts[key]) || 0,
      details: { source: "content_counts" }
    }));
}

function askEmyGenericBusinessLabel(payload = {}, recordsInput = []) {
  const direct = clean(
    payload.businessName
    || payload.activeBusinessName
    || payload.selectedBusinessName
    || payload.business && (payload.business.name || payload.business.businessName)
    || payload.activeBusiness && (payload.activeBusiness.name || payload.activeBusiness.businessName)
    || payload.selectedBusiness && (payload.selectedBusiness.name || payload.selectedBusiness.businessName)
  );
  if (direct) return direct;
  const firstRecord = (Array.isArray(recordsInput) ? recordsInput : []).find((record) => clean(record && (record.business || record.businessName)));
  return clean(firstRecord && (firstRecord.business || firstRecord.businessName)) || "Current business";
}

function askEmyGenericAnalyticsBars(rows = [], metric = "views") {
  const maxValue = Math.max(0, ...rows.map((row) => Number(row.value) || 0));
  return rows.map((row) => {
    const value = Number(row.value) || 0;
    const blocks = maxValue > 0 ? Math.max(1, Math.round((value / maxValue) * 10)) : 0;
    return {
      label: clean(row.label) || "Item",
      value,
      bar: "█".repeat(blocks).padEnd(10, "░"),
      details: row.details || {}
    };
  });
}

function askEmyGenericAnalyticsPayload(query, payload = {}, recordsInput = [], summary = null) {
  const plan = askEmyGenericAnalyticsPlan(query, payload);
  const effectiveSummary = summary || {
    contentCounts: askEmyContentCounts(recordsInput),
    metrics: []
  };
  const recordRows = askEmyGenericAnalyticsRowsFromRecords(recordsInput, plan);
  const summaryRows = askEmyGenericAnalyticsRowsFromSummary(effectiveSummary, plan);
  const summaryFirst = (plan.entity === "business" || plan.entity === "businesses")
    && /^(profile_views|product_views|views)$/.test(plan.metric);
  const businessLabel = askEmyGenericBusinessLabel(payload, recordsInput);
  const labelledSummaryRows = summaryRows.map((row) => ({
    ...row,
    label: plan.entity === "businesses" && /profile|business/i.test(row.label) ? businessLabel : row.label
  }));
  const rows = summaryFirst && labelledSummaryRows.length ? labelledSummaryRows : recordRows.length ? recordRows : labelledSummaryRows;
  const bars = askEmyGenericAnalyticsBars(rows, plan.metric);
  const top = bars[0] || null;
  const metricLabel = askEmyGenericMetricLabel(plan.metric);
  const lineWarning = plan.requiresTimeSeries
    ? "I cannot make a true line chart yet because historical time-series data is not available here, so I am showing the current snapshot instead."
    : "";
  return {
    answer_type: "analytics_bar_chart",
    title: askEmyGenericAnalyticsTitle(plan),
    metric: plan.metric,
    summary: lineWarning || (top ? `${top.label} leads with ${top.value} ${askEmyGenericMetricUnit(plan.metric, top.value)}.` : `I do not have ${metricLabel} data to chart yet.`),
    bars,
    top_insight: top ? `${top.label} is the strongest visible signal for ${metricLabel} right now.` : "No chartable analytics rows are available yet.",
    next_action: plan.requiresTimeSeries
      ? "Start saving daily or weekly snapshots to unlock real line charts."
      : "Use this chart to choose what to improve, open, compare, or publish next.",
    data_quality: {
      source: recordRows.length ? "canonical_records" : "canonical_analytics",
      is_estimate: false,
      has_time_series: false,
      warnings: lineWarning ? [lineWarning] : []
    }
  };
}

function askEmyAnalyticsAdvice(query, payload, records, analyticsSummary) {
  const summary = analyticsSummary || {
    location: askEmyText(payload && payload.location, 120) || "your saved location",
    radius: askEmyText(payload && payload.radius, 80) || "nearby",
    contentCounts: askEmyContentCounts(records),
    metrics: [],
    hasMetricStats: false
  };
  const mode = askEmyAnalyticsMode(query);
  if (mode === "clarify") {
    return askEmyFormatReply([
      "What do you want to do with the statistics?",
      askEmyFormatSection("I can help with", [
        "Show them here.",
        "Explain what the numbers mean.",
        "Compare the strongest signals.",
        "Check product interest.",
        "Work out what to improve next."
      ])
    ]);
  }
  if (mode === "concept") {
    return askEmyFormatReply([
      "Statistics in EMY are signals that show what people are doing around your business and content.",
      askEmyFormatSection("Useful examples", [
        "Profile views show attention on the business page.",
        "Product engagement shows interest in products.",
        "Likes, saves, clips, posts, directions, messages, and enquiries each answer a different business question."
      ]),
      askEmyFormatSection("The important part", [
        "Stats are not just numbers. They help decide what to improve, what to promote, and where customer interest is strongest."
      ])
    ]);
  }
  const countText = Object.keys(summary.contentCounts || {})
    .filter((key) => summary.contentCounts[key] > 0)
    .map((key) => `${summary.contentCounts[key]} ${key}${summary.contentCounts[key] === 1 ? "" : "s"}`)
    .join(", ");
  const productStatBars = askEmyProductAnalyticsBars((Array.isArray(records) ? records : [])
    .filter((record) => clean(record && record.type).toLowerCase() === "product")
    .slice()
    .sort((a, b) => askEmyProductMetricCount(b, "views") - askEmyProductMetricCount(a, "views") || askEmyProductActivityScore(b) - askEmyProductActivityScore(a))
    .slice(0, 8), "views");
  let productStatIndex = 0;
  const displayMetricRows = (summary.metrics || []).map((row) => {
    const kind = clean(row && row.kind);
    if (/product|item|listing|stock/i.test(kind) && productStatBars[productStatIndex]) {
      const productRow = productStatBars[productStatIndex++];
      return {
        ...row,
        kind: `${productRow.label} ${askEmyProductMetricUnit("views", 2)}`,
        total: productRow.value,
        line: `${productRow.label}: ${productRow.value} ${askEmyProductMetricUnit("views", productRow.value)}`
      };
    }
    return { ...row, line: `${kind}: ${row.total}` };
  });
  const seenMetricKinds = new Set();
  const metricText = displayMetricRows
    .filter((row) => {
      const kind = clean(row && row.kind).toLowerCase();
      if (!kind || seenMetricKinds.has(kind)) return false;
      seenMetricKinds.add(kind);
      return true;
    })
    .slice(0, 4)
    .map((row) => `${row.total} ${row.kind}`)
    .join("; ");
  const chartMetricRows = [];
  const seenChartMetricKinds = new Set();
  displayMetricRows.forEach((row) => {
    const kind = clean(row && row.kind).toLowerCase();
    if (!kind || seenChartMetricKinds.has(kind)) return;
    seenChartMetricKinds.add(kind);
    chartMetricRows.push(row);
  });
  const intro = summary.hasMetricStats
    ? `I checked the saved EMY statistics I can see. Strongest signals: ${metricText}.`
    : `I can see ${countText || "no saved EMY content records"} but I do not see saved statistics numbers from the statistics page yet.`;
  const ideas = [];
  if (!summary.contentCounts || !summary.contentCounts.product) {
    ideas.push("Add products with real photos, prices, and a clear contact or enquiry step.");
  } else {
    ideas.push("Put the most-viewed or most-engaged products first, with prices visible and a simple call to message or enquire.");
  }
  if (!summary.contentCounts || !summary.contentCounts.clip) {
    ideas.push("Post short clips because EMY can surface them in discovery and keep them in the clips section.");
  } else {
    ideas.push("Turn the clips with the strongest views into posts or product links so attention becomes enquiries.");
  }
  if (!summary.contentCounts || (!summary.contentCounts.post && !summary.contentCounts.article)) {
    ideas.push("Publish a simple offer, update, or customer proof post so the business does not look empty.");
  }
  ideas.push("Check the profile basics: location, opening times, services, phone/email, and the first image, because those affect trust before a customer messages.");
  if (!(summary.metrics || []).some((row) => /enquiries?|inquiries?|messages?|contacts?|leads?|customer interest|directions?/i.test(`${row.kind} ${row.source}`))) {
    ideas.push("I do not see enquiry, message, customer, or direction stats yet, so treat this as interest until stronger action signals are saved.");
  }
  const chartLines = chartMetricRows.length
    ? chartMetricRows.slice(0, 6).map((row) => row.line || `${row.kind}: ${row.total}`)
    : Object.keys(summary.contentCounts || {})
      .filter((key) => summary.contentCounts[key] > 0)
      .sort((a, b) => summary.contentCounts[b] - summary.contentCounts[a])
      .slice(0, 6)
      .map((key) => `${key}: ${summary.contentCounts[key]}`);
  if (mode === "line") {
    const comparisonRows = productStatBars.length
      ? askEmyProductTextBarLines(productStatBars.slice(0, 5), "views")
      : chartLines.slice(0, 5);
    return askEmyFormatReply([
      "I cannot make a true line chart yet because I only have current totals, not historical daily or weekly data.",
      askEmyFormatSection("Available chart now", comparisonRows.length ? comparisonRows : [
        "A bar chart or product comparison can be shown once current totals are available."
      ]),
      askEmyFormatSection("Why", [
        "A line chart needs saved values over time, such as daily or weekly views.",
        "I should not pretend snapshot totals are a real trend."
      ])
    ]);
  }
  if (mode === "sales") {
    const salesLines = askEmyAnalyticsChartLines(summary, /enquiries?|inquiries?|messages?|contacts?|leads?|customer interest|directions?/i, 5);
    if (!salesLines.length) {
      return askEmyFormatReply([
        "EMY products are listings inside the platform, so I should read this as interest and action data.",
        askEmyFormatSection("What I can use instead", chartLines.length ? chartLines.slice(0, 4) : ["Saved content counts and activity signals only."]),
        askEmyFormatSection("What this means", [
          "I can talk about attention, product interest, enquiries, messages, customers, directions, and profile activity when those signals are saved."
        ])
      ]);
    }
    return askEmyFormatReply([
      "Here are the customer action signals I can see.",
      askEmyFormatSection("Action chart", salesLines),
      askEmyFormatSection("What this means", [
        "Use these as the main performance signals, then compare them with profile views and product interest to see where attention becomes action."
      ])
    ]);
  }
  if (mode === "product") {
    const productMetricRows = askEmyAnalyticsRows(summary, /product|item|listing|stock/i).filter((row) => !/profile views?|directions?/i.test(row.kind || ""));
    const productLines = productStatBars.length
      ? askEmyProductChartLines(productStatBars.slice(0, 6), "views")
      : productMetricRows.length
      ? productMetricRows.slice(0, 6).map((row) => `${row.kind}: ${row.total}`)
      : summary.contentCounts && summary.contentCounts.product ? [`products: ${summary.contentCounts.product}`] : [];
    if (!productLines.length) {
      return askEmyFormatReply([
        "I do not see separate product performance numbers here yet.",
        askEmyFormatSection("What I can still check", [
          "Product count, product cards, prices, photos, descriptions, likes, saves, and any product view signals that are saved."
        ]),
        askEmyFormatSection("Better next question", [
          "Ask me to show your products, compare your products, or improve one product listing."
        ])
      ]);
    }
    return askEmyFormatReply([
      "Here is the product interest I can see.",
      askEmyFormatSection("Product statistics chart", productLines),
      productStatBars.length ? askEmyFormatSection("Top insight", [askEmyProductTopInsight(productStatBars, "views")]) : "",
      askEmyFormatSection("What to do next", [
        "Put the products with the strongest interest first, make the price and next action clear, and turn product attention into a message, enquiry, follow, direction request, or customer relationship."
      ])
    ]);
  }
  if (mode === "compare") {
    const rows = askEmyAnalyticsRows(summary, null).slice(0, 5);
    if (rows.length < 2) {
      return "Compare which statistics: profile views, product interest, clips/posts, customers, enquiries, messages, or directions? I need at least two signals to compare properly.";
    }
    return askEmyFormatReply([
      "Here is the clean comparison.",
      askEmyAnalyticsTable(rows),
      askEmyAnalyticsHasSalesMetrics(summary)
        ? "Read this as attention versus action: views show interest, enquiries, messages, and directions show stronger customer action."
        : "I do not see enquiry, message, customer, or direction stats yet, so this compares attention signals only."
    ]);
  }
  if (mode === "insight") {
    const strongest = (summary.metrics || [])[0];
    const gap = askEmyAnalyticsHasSalesMetrics(summary)
      ? "Now compare attention with enquiries, messages, customers, or directions so you can see what creates action."
      : "The missing piece is enquiry, message, customer, or direction data, so I should treat this as interest, not proof of action.";
    return askEmyFormatReply([
      strongest
        ? `The main thing I see is ${strongest.total} ${strongest.kind}. That is where attention is strongest right now.`
        : "I do not see enough saved statistic numbers here to diagnose performance properly.",
      askEmyFormatSection("What this means", chartLines.length ? chartLines.slice(0, 4) : ["There are not enough saved signals to rank yet."]),
      askEmyFormatSection("My read", [gap]),
      askEmyFormatSection("Next move", [
        "Improve the thing that gets attention first, then connect it to a clear action: message, enquire, follow, visit, or get directions."
      ])
    ]);
  }
  return askEmyFormatReply([
    askEmyFormatSection("What I can see", [intro]),
    chartLines.length ? askEmyFormatSection("Statistics chart", chartLines) : "",
    askEmyFormatSection("What to improve next", ideas.slice(0, 5).map((idea, index) => `${index + 1}. ${idea}`)),
  ]);
}

function askEmyLocationInfoAnswer(payload) {
  const location = askEmyText(payload && payload.location, 120) || "your saved location";
  const radius = askEmyRadiusLabel(payload && payload.radius);
  return `I can see your saved Ask EMY search location is "${location}" with radius "${radius}". I do not have exact GPS coordinates unless EMY saves them from the location picker, so I should only use this as a search area.`;
}

function askEmyPlatformInfoAnswer(payload) {
  const firstName = askEmyFirstNameFromPayload(payload || {});
  const user = payload && payload.user && typeof payload.user === "object" ? payload.user : {};
  const ownedBusiness = clean(user.businessName || payload && payload.businessName);
  const personalLine = ownedBusiness
    ? `For you, EMY is also where you can manage ${ownedBusiness}: products, posts, clips, jobs, profile details, customers, and business activity.`
    : "For you, EMY is the place to discover useful businesses nearby and keep everything connected in one account.";
  return askEmyFormatReply([
    `${firstName ? `${firstName}, ` : ""}EMY is a local business platform built to connect everyday customers with real businesses, products, jobs, services, posts, clips, and directions in one place.`,
    askEmyFormatSection("What EMY is", [
      "Local discovery: find nearby businesses, products, offers, services, jobs, events, clips, and posts.",
      "Business connection: follow businesses, like products, message businesses, and open their profiles from one place.",
      "Real platform data: Ask EMY should use what businesses have actually added on EMY instead of inventing fake listings.",
      "Built for action: open a card, message a business, view a product, apply for a job, or use EMY Maps for directions."
    ]),
    askEmyFormatSection("For customers", [
      "Find what is near you by location and radius.",
      "See products, prices, stock, clips, jobs, posts, services, and business profiles.",
      "Follow businesses you care about and return to their latest updates quickly.",
      "Ask EMY follow-up questions like cheapest option, more products, opening times, or directions."
    ]),
    askEmyFormatSection("For businesses", [
      "Create a public business profile with contact details, description, images, opening times, and location.",
      "Add products, services, jobs, posts, clips, events, and campaign content from the backend.",
      "Use business statistics to understand views, likes, product engagement, clips, and customer interest.",
      "Turn attention into action by helping customers message, enquire, apply, visit, or follow."
    ]),
    askEmyFormatSection("How Ask EMY fits in", [
      "Search assistant: Ask EMY can search across EMY content and show cards, links, products, jobs, clips, services, posts, and maps.",
      "Business helper: it can explain what to improve using business stats and profile signals.",
      "Privacy aware: business public details can be shown, but private customer details stay protected.",
      personalLine
    ])
  ]);
}

function askEmyIdentityIntroAnswer() {
  return askEmyFormatReply([
    "I'm EMY, the guide inside EMY. I help customers and businesses move through the platform, not just search saved items.",
    askEmyFormatSection("What I can help with", [
      "Discover businesses, products, services, jobs, posts, clips, places, and opportunities on EMY.",
      "Guide customers from a question to the right action: compare, message, follow, enquire, apply, visit, or get directions.",
      "Help businesses set up and improve their EMY presence: profile, products, services, posts, clips, jobs, events, customers, suppliers, and activity.",
      "Analyse EMY data and signals when they are connected, including views, likes, saves, customer interest, product activity, clips, and business performance.",
      "Support wider discovery when EMY has records for another place or the request asks beyond one local area."
    ]),
    askEmyFormatSection("How I answer", [
      "I use real EMY information when it is available, and I say clearly when something is missing instead of inventing it."
    ])
  ]);
}

function askEmyIsTestConversationQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  const asksForRecords = /\b(product|products|business|businesses|job|jobs|clip|clips|post|posts|article|articles|service|services|event|events|price|near|nearby|map|direction|directions|location|customer|customers|sales|views|likes)\b/.test(text);
  if (asksForRecords) return false;
  return /^(test|testing|try|trying|check|checking)(?:\s+(this|it|you|emy|ask emy|please|pls|now|again))*[.!?]*$/.test(text);
}

function askEmyIsSocialChatQuery(query) {
  const raw = String(query || "").trim();
  const text = clean(raw).toLowerCase();
  if (!text) return false;
  if (/\b(show|find|search|list|open|map|directions?|products?|businesses?|jobs?|clips?|posts?|services?|events?|customers?|statistics|stats|data)\b/.test(text)) return false;
  return /^(ha+|haha+|hehe+|lol|lmao|rofl)\b/.test(text)
    || /\b(joke|joking|funny|made me laugh|you are funny|that's funny|that is funny)\b/.test(text)
    || /[😂🤣😄😆😅😉😊🙂😍😘🥰😜😎👍❤️💕🔥✨]/.test(raw);
}

function askEmyIsOpenConversationPrompt(query) {
  const text = clean(query).toLowerCase();
  return /^(tell me|tell me then|go on|go ahead|say it|sure tell me|ok tell me|okay tell me|yes tell me|what then)[.!?]*$/.test(text);
}

function askEmyIsConversationalFragmentQuery(query) {
  const text = clean(query).toLowerCase().replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (/^(and you|in you|you|you then|what about you|how about you|ok|okay|yes|yeah|yep|no|nope|maybe|hmm|hm|huh|what|why|tell me|go on|go ahead)$/.test(text)) return true;
  const words = text.split(" ").filter(Boolean);
  if (!words.length || words.length > 3) return false;
  const fragmentWords = new Set(["i", "me", "my", "you", "your", "yours", "we", "us", "in", "on", "at", "to", "for", "with", "and", "or", "but", "then", "ok", "okay", "yes", "no", "what", "why"]);
  return words.every((word) => fragmentWords.has(word)) && words.some((word) => word === "you" || word === "me" || word === "i" || word === "what" || word === "why");
}

function askEmyIsUnsupportedCrossEntityAnalyticsQuery(query) {
  const text = clean(query).toLowerCase();
  const hasProductEntity = /\b(products?|items?|listings?|stock)\b/.test(text);
  const hasClipEntity = /\b(clips?|videos?|reels?)\b/.test(text);
  if (!hasProductEntity || !hasClipEntity) return false;
  const hasAnalyticsCue = /\b(analytics?|statistics?|stats?|analysis|analy[sz]e|graphs?|charts?|compar(?:e|ison)|rank|ranking|top|most|highest|views?|likes?|comments?|saves?|engagement|performance)\b/.test(text);
  const hasCrossMetricCue = /\b(from|using|based on|by|via|through|against|versus|vs)\b/.test(text)
    || /\bclip\s+(views?|likes?|comments?|saves?|engagement)\b/.test(text)
    || /\b(video|reel)\s+(views?|likes?|comments?|saves?|engagement)\b/.test(text);
  return hasAnalyticsCue && hasCrossMetricCue;
}

function askEmyUnsupportedCrossEntityAnalyticsAnswer() {
  return "I can compare product views, or I can compare clip views, but I should not rank products using clip views unless EMY has a saved link between each clip and the product it promotes.\n\nRight now, ask me one of these:\n- compare my products by views\n- compare my clips by views\n- show clips linked to products, if that link is saved";
}

function askEmyIsAnalyticsCapabilityQuestion(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  const asksCapability = /\b(do you|can you|could you|are you able to|would you|will you)\b/.test(text);
  const analyticsSubject = /\b(analytics?|statistics?|stats?|analysis|analy[sz]e|graphs?|charts?|compar(?:e|ison))\b/.test(text);
  if (!asksCapability || !analyticsSubject) return false;
  return !/\b(show|open|pull up|give me|list|rank|ranking|top|most|highest|which|what is|how many|over time|by|from|using|my products?|my business|profile views?|product views?|clip views?|post views?)\b/.test(text);
}

function askEmyAnalyticsCapabilityAnswer() {
  return "Yes - I can help with analytics and statistics work in EMY.\n\nWhat I can do\n- Compare views, likes, comments, saves, and engagement when those signals exist.\n- Analyse products, clips, posts, businesses, customers, jobs, and profile activity.\n- Explain what the numbers mean in plain English.\n- Build the right chart or card when you ask for specific data.\n- Tell you clearly when a metric is not connected yet.\n\nTell me what you want analysed and I will choose the right EMY tool.";
}

function askEmyIsExplicitRecordSearchQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  if (/^(get|bring|attract|win|reach)\s+(?:more\s+)?(?:customers?|clients?|sales|orders)\b/.test(text)) return false;
  if (/^(open|start|set up|setup|create|launch)\s+(?:a\s+|an\s+|my\s+|your\s+)?(?:business|shop|company|store|profile)\b/.test(text)) return false;
  if (/^(show me|show|find me|find|search|list|open|get|give me|display|browse|more)\b/.test(text)) return true;
  if (/^(map|directions?|route)\b/.test(text)) return true;
  if (/\b(near me|nearby|around me|directions?|map|route|within \d+\s*(?:km|kilometres?|kilometers?|miles?))\b/.test(text)) return true;
  return /^\b(products?|businesses?|jobs?|clips?|videos?|posts?|articles?|services?|events?)\b[\s\S]{0,80}\b(near|nearby|around|available|price|prices|cheap|cheapest|open|more)\b/.test(text);
}

function askEmyIsProductCreationGuidanceQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  const contentWord = /\b(products?|items?|stock|listings?)\b/.test(text);
  if (!contentWord) return false;
  if (/^(show|find|search|browse|more)\b/.test(text)) return false;
  if (/^list\s+(?:my\s+|the\s+|all\s+|available\s+)?products?\b/.test(text) && !/\b(new|create|add|publish|upload|for sale|listing)\b/.test(text)) return false;
  return /\b(create|add|upload|publish|post|list|make|draft|prepare|set up|setup)\b[\s\S]{0,90}\b(?:a\s+|an\s+|my\s+|new\s+|the\s+)?(?:products?|items?|stock|listings?)\b/.test(text)
    || /\b(?:products?|items?|stock|listings?)\b[\s\S]{0,90}\b(create|add|upload|publish|post|list|make|draft|prepare|set up|setup)\b/.test(text)
    || /\b(can you|could you|will you|would you|help me|i want to|i need to)\b[\s\S]{0,80}\b(?:products?|items?|stock|listings?)\b/.test(text) && /\b(create|add|upload|publish|post|list|make|draft|prepare|set up|setup)\b/.test(text);
}

function askEmyIsVagueProductNeedQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text || !/\b(products?|items?|stock|listings?)\b/.test(text)) return false;
  if (/^(show|find|search|browse|more|list)\b/.test(text)) return false;
  if (askEmyIsProductCreationGuidanceQuery(text)) return false;
  const asksForProduct = /\b(i|we|you)?\s*(?:need|want|require|looking for|look for|get|buy)\s+(?:a\s+|an\s+|some\s+|any\s+|new\s+|the\s+|my\s+)?(?:products?|items?|something)\b/.test(text)
    || /\b(?:products?|items?)\s+(?:needed|required|wanted)\b/.test(text);
  if (!asksForProduct) return false;
  return askEmySpecificQueryTerms(text).length === 0;
}

function askEmyIsBusinessSetupGuidanceQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  if (/^(show|find|search|browse|more|list)\b/.test(text)) return false;
  const setupVerb = /\b(start|setup|set up|create|launch|build|open|register|make)\b/.test(text);
  const businessTarget = /\b(business|shop|company|store|business profile|profile|emy)\b/.test(text);
  return setupVerb && businessTarget
    || /\b(i want to|i need to|help me|can you help|could you help)\b[\s\S]{0,80}\b(set up|setup|start|create|launch|open)\b[\s\S]{0,80}\b(business|shop|company|store|profile)\b/.test(text);
}

function askEmyActionTarget(query) {
  const text = clean(query).toLowerCase();
  if (/\b(products?|items?|stock|listings?)\b/.test(text)) return "product";
  if (/\b(services?|support offers?)\b/.test(text)) return "service";
  if (/\b(jobs?|roles?|hiring|vacanc(?:y|ies))\b/.test(text)) return "job";
  if (/\b(clips?|videos?|reels?)\b/.test(text)) return "clip";
  if (/\b(posts?|updates?|articles?|blogs?)\b/.test(text)) return "post";
  if (/\b(events?|bookings?|workshops?|classes?)\b/.test(text)) return "event";
  if (/\b(customers?|clients?)\b/.test(text)) return "customer";
  if (/\b(suppliers?|partners?)\b/.test(text)) return "supplier";
  if (/\b(stats?|statistics|analytics|data|performance|insights?|views|likes|saves|engagement)\b/.test(text)) return "data";
  if (/\b(profile|business profile|shop|business|company|store)\b/.test(text)) return "business";
  return "";
}

function askEmyActionUrl(target, action = "") {
  if (target === "product") return "emy-business-profile.html?mode=business&tab=products";
  if (target === "service") return "emy-business-profile.html?mode=business#services";
  if (target === "job") return "emy-business-profile.html?mode=business&tab=posts&open=job";
  if (target === "clip") return "emy-business-profile.html?mode=business&tab=reels";
  if (target === "post") return "emy-business-profile.html?mode=business&tab=posts";
  if (target === "event") return "emy-business-profile.html?mode=business&tab=posts&open=event";
  if (target === "customer") return "emy-business-profile.html?mode=business#customers";
  if (target === "supplier") return "emy-customer-search.html#business";
  if (target === "data") return "emy-business-profile.html?mode=statistics";
  if (target === "business") return action === "create" ? "emy-business-profile.html?setup=1" : "emy-business-profile.html?mode=business";
  return "";
}

function askEmyIsPlatformActionGuidanceQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  if (askEmyIsBareActionNounQuery(text)) return false;
  if (askEmyIsProductCreationGuidanceQuery(text)) return true;
  const target = askEmyActionTarget(text);
  if (/\b(what should i do next|next action|next step|before i ask|proactive)\b/.test(text)) return true;
  const hasActionVerb = /\b(create|add|upload|publish|post|list|make|draft|prepare|write|rewrite|improve|convert|turn|open|take me to|go to|bring|pull up|show me where|set up|setup|help me with|can you do|can you make|can you prepare|can you open)\b/.test(text);
  if (!hasActionVerb) return false;
  if (/^open\s+(?:businesses?|shops?|stores?|restaurants?|products?|jobs?)\b[\s\S]*\b(near|nearby|around|now|today)\b/.test(text) && !/\b(my|profile|page|form|tab|area|dashboard|backend)\b/.test(text)) return false;
  if (/^list\s+(?:my\s+|the\s+|all\s+|available\s+)?(?:products?|jobs?|services?|posts?|clips?|events?)\b/.test(text) && !/\b(new|create|add|publish|upload|for sale|listing|page|form|tab|area)\b/.test(text)) return false;
  if (/^(show|find|search|browse|more)\b/.test(text) && !/\b(where|how|page|form|tab|area|dashboard|backend|create|add|publish|prepare|draft|convert|turn)\b/.test(text)) return false;
  if (target) return true;
  return /\b(convert|turn|rewrite|draft|prepare|write|summari[sz]e|bring me|open the page|take me to|go to|what should i do next|next action|before i ask|proactive)\b/.test(text);
}

function askEmyIsAssistantGuidanceQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  if (askEmyIsBareActionNounQuery(text)) return false;
  if (askEmyIsIdentityIntroQuery(text) || askEmyIsSimpleGreetingQuery(text) || askEmyIsOwnershipFollowUpQuery(text)) return false;
  if (askEmyIsProductCreationGuidanceQuery(text)) return true;
  if (askEmyIsVagueProductNeedQuery(text)) return true;
  if (askEmyIsBusinessSetupGuidanceQuery(text)) return true;
  if (askEmyIsPlatformActionGuidanceQuery(text)) return true;
  if (askEmyIsExplicitRecordSearchQuery(text)) return false;
  if (/\b(how|hoe|hwo|howe)\s+(?:do|can|should)\s+(?:i|you|we)\b[\s\S]{0,120}\b(here|emy|this platform|the platform|this app)\b/.test(text)) return true;
  if (/^(help me|guide me|can you help|could you help|i need help|what should i do|what do i do|what next|next step|next steps|where do i start)\b/.test(text)) return true;
  if (/\b(how do i|how do you|how can i|how can you|how should i|how to|hoe do i|hoe do you|hwo do i|hwo do you|what is the best way to|can you show me how to)\b[\s\S]{0,100}\b(emy|business|shop|company|store|profile|products?|services?|customers?|clients?|suppliers?|sales|data|stats|statistics|grow|start|setup|set up|create|launch|improve|connect|discover|publish|upload|add)\b/.test(text)) return true;
  if (/\b(start|setup|set up|create|launch|build|open)\b[\s\S]{0,70}\b(business|shop|company|store|profile|emy)\b/.test(text)) return true;
  if (/\b(grow|increase|improve|boost|attract|bring|get more|reach|win)\b[\s\S]{0,70}\b(business|sales|customers?|clients?|orders|profile|views|products?)\b/.test(text)) return true;
  if (/\b(connect|discover|reach)\b[\s\S]{0,80}\b(customers?|clients?|suppliers?|partners?|markets?|places?|world|country|countries)\b/.test(text)) return true;
  if (/\b(analy[sz]e|understand|review)\b[\s\S]{0,70}\b(data|stats|statistics|performance|sales|views|engagement|customers?|products?)\b/.test(text)) return true;
  return false;
}

function askEmyIsBareNextStepQuestion(query) {
  const text = clean(query).toLowerCase().replace(/[.!?]+$/g, "");
  return /^(what should i do|what should i do next|what do i do|what next|next step|next steps|where do i start|what can i do|help me decide|guide me)$/.test(text);
}

function askEmyNextStepResultKind(record = {}) {
  const type = clean(record.type).toLowerCase();
  const viewKind = clean(record.viewSpec && record.viewSpec.kind).toLowerCase();
  const viewVariant = clean(record.viewSpec && record.viewSpec.variant).toLowerCase();
  if (record.isBusinessProfile || record.explicitBusinessProfile || viewKind.includes("business profile") || type === "business") return "business";
  if (type === "customer-profile" || viewKind.includes("customer profile") || viewVariant === "identity" || viewVariant === "media") return "customer";
  if (type === "product") return "product";
  if (type === "clip" || type === "video") return "clip";
  if (type === "post") return "post";
  if (type === "job") return "job";
  if (type === "article") return "article";
  if (type === "event") return "event";
  return "";
}

function askEmyNextStepContextFromHistory(payload = {}) {
  const history = askEmyHistoryRows(payload || {});
  const historyText = askEmyHistoryText(payload || {}).toLowerCase();
  let latestRecord = null;
  let latestKind = "";
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const item = history[index] || {};
    const results = Array.isArray(item.results) ? item.results : [];
    for (let resultIndex = 0; resultIndex < results.length; resultIndex += 1) {
      const record = results[resultIndex] || {};
      const kind = askEmyNextStepResultKind(record);
      if (kind) {
        latestRecord = record;
        latestKind = kind;
        break;
      }
    }
    if (latestKind) break;
  }
  if (!latestKind) {
    if (/\b(business card|business profile|your business|my business|honey shop)\b/.test(historyText)) latestKind = "business";
    else if (/\b(customer card|customer profile|my profile|profile image|customer-side)\b/.test(historyText)) latestKind = "customer";
    else if (/\b(analytics chart|statistics|stats|views?|likes?|saves?|performance|compare|comparison)\b/.test(historyText)) latestKind = "analytics";
    else if (/\b(products?|listings?|price|stock)\b/.test(historyText)) latestKind = "product";
    else if (/\b(clips?|videos?)\b/.test(historyText)) latestKind = "clip";
    else if (/\b(posts?|updates?)\b/.test(historyText)) latestKind = "post";
    else if (/\b(jobs?|hiring|applicants?)\b/.test(historyText)) latestKind = "job";
  }
  const accountBusiness = askEmyProfileAccountForRole(payload || {}, "business");
  const fallbackName = clean(accountBusiness.businessName || accountBusiness.business || accountBusiness.name);
  const name = clean(latestRecord && (latestRecord.name || latestRecord.businessName || latestRecord.business || latestRecord.title))
    || fallbackName
    || (latestKind === "customer" ? clean(payload.user && payload.user.name) : "");
  return { kind: latestKind, name, record: latestRecord };
}

function askEmyNextStepAnswer(query, payload = {}) {
  const greeting = askEmyGreetingPrefix(payload || {});
  const context = askEmyNextStepContextFromHistory(payload || {});
  const name = context.name || (context.kind === "business" ? "this business" : context.kind === "customer" ? "your profile" : "this item");
  if (context.kind === "business") {
    return [
      `${greeting} For ${name}, I would work on the business profile/card first.`,
      "Best next move\n1. Check the card basics: cover/profile image, description, location or service area, contact details, opening hours, and business likes.\n2. Then connect the card to what people can actually do next: view products, watch clips, read posts, see jobs, message you, or check stats.\n3. If you want growth, ask me to review the missing parts and I can create the next draft or card here.",
      "You can ask next\n- improve this business card\n- show products from this business\n- show clips or posts from this business\n- show statistics for this business"
    ].join("\n\n");
  }
  if (context.kind === "customer") {
    return [
      `${greeting} I would treat this as your customer-side profile, not a business customer list.`,
      "Best next move\n1. Check the profile image/name first.\n2. Then show your customer posts, clips, saved items, follows, or activity.\n3. If you want to publish something, I can help create the draft before opening the real EMY form.",
      "You can ask next\n- show my customer posts\n- show my customer clips\n- show my profile image\n- create a customer post"
    ].join("\n\n");
  }
  if (context.kind === "analytics") {
    return [
      `${greeting} I would stay with the analytics you were looking at and explain the decision it points to.`,
      "Best next move\n1. Identify the strongest signal.\n2. Compare it with the next closest item.\n3. Decide what to improve first: image, title, description, price clarity, post support, or clip support.",
      "You can ask next\n- explain this chart\n- compare products and clips by views\n- what should I improve first\n- show the top item only"
    ].join("\n\n");
  }
  if (context.kind === "product") {
    return [
      `${greeting} I would focus on the product you were viewing.`,
      "Best next move\n1. Make the product card clear: image, title, price, availability, description, and next action.\n2. Compare views, likes, comments, and saves before deciding what to improve.\n3. Use clips or posts to bring more attention to the product.",
      "You can ask next\n- show the product card\n- improve this product\n- compare my products by views\n- create a post for this product"
    ].join("\n\n");
  }
  if (context.kind === "clip" || context.kind === "post" || context.kind === "job") {
    const label = context.kind === "clip" ? "clip/video" : context.kind;
    return [
      `${greeting} I would work with the ${label} you were looking at.`,
      `Best next move\n1. Open or show the ${label} clearly here.\n2. Check its views, likes, comments, and saves if those signals exist.\n3. Decide whether it should support a business, product, job, or customer action.`,
      `You can ask next\n- show this ${label}\n- analyse this ${label}\n- compare it with my products\n- create a follow-up post`
    ].join("\n\n");
  }
  return [
    `${greeting} Good question. I need one real goal, then I can take the next step with you.`,
    "Pick a direction\n- Grow or fix your business profile.\n- Create or improve a product, post, clip, job, service, or offer.\n- Compare data, stats, views, likes, saves, or customer interest.\n- Find nearby businesses, jobs, services, suppliers, partners, or places.",
    "Say it in your own words. I will choose the right EMY tool only when it helps."
  ].join("\n\n");
}

const ASK_EMY_INTENT_CANONICAL_WORDS = [
  "product", "products", "item", "items", "stock", "listing", "listings", "tomato", "tomatoes",
  "business", "businesses", "customer", "customers", "service", "services",
  "job", "jobs", "clip", "clips", "video", "videos", "post", "posts",
  "article", "articles", "event", "events", "price", "prices",
  "view", "views", "viewed", "viewing", "liked", "saved", "engagement", "performance", "popular", "rank", "ranking",
  "stat", "stats", "statistic", "statistics", "analytics", "graph", "graphs", "chart", "charts", "compare", "comparison", "line", "bars"
];

const ASK_EMY_INTENT_WORD_ALIASES = {
  busniess: "business",
  businiess: "business",
  bunsiess: "business",
  buness: "business",
  busniesses: "businesses",
  businiesses: "businesses",
  bunsiesses: "businesses",
  bsuniess: "business",
  buisness: "business",
  cutomer: "customer",
  cutomers: "customers",
  custmer: "customer",
  custmers: "customers",
  costumer: "customer",
  costumers: "customers",
  producs: "products",
  porudcts: "products",
  tomoato: "tomato",
  tomoatoes: "tomatoes",
  tomoatos: "tomatoes",
  tomatos: "tomatoes",
  actircle: "article",
  actircles: "articles",
  articel: "article",
  articels: "articles",
  orpost: "or post",
  orposts: "or posts",
  orclip: "or clip",
  orclips: "or clips",
  orproduct: "or product",
  orproducts: "or products",
  graophts: "graphs",
  graphts: "graphs",
  graps: "graphs",
  chrt: "chart",
  chrts: "charts",
};

function askEmySortedLetters(value) {
  return String(value || "").split("").sort().join("");
}

function askEmyEditDistanceWithin(source, target, maxDistance = 2) {
  const left = String(source || "");
  const right = String(target || "");
  if (Math.abs(left.length - right.length) > maxDistance) return false;
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    const current = [i];
    let rowMin = current[0];
    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      rowMin = Math.min(rowMin, current[j]);
    }
    if (rowMin > maxDistance) return false;
    for (let j = 0; j < previous.length; j += 1) previous[j] = current[j];
  }
  return previous[right.length] <= maxDistance;
}

function askEmyNormalizeIntentWord(word) {
  const text = clean(word).toLowerCase();
  if (ASK_EMY_INTENT_WORD_ALIASES[text]) return ASK_EMY_INTENT_WORD_ALIASES[text];
  if (text === "llocation") return "location";
  if (text === "viewd") return "viewed";
  if (!text || text.length < 4) return text;
  if (ASK_EMY_INTENT_CANONICAL_WORDS.includes(text)) return text;
  const sorted = askEmySortedLetters(text);
  const match = ASK_EMY_INTENT_CANONICAL_WORDS.find((candidate) => {
    if (candidate.length < 4 || Math.abs(candidate.length - text.length) > 2) return false;
    if (candidate[0] !== text[0]) return false;
    return candidate.length === text.length && askEmySortedLetters(candidate) === sorted
      || askEmyEditDistanceWithin(text, candidate, candidate.length <= 4 ? 1 : 2);
  });
  return match || text;
}

function askEmyNormalizeIntentText(query) {
  return clean(query).toLowerCase().replace(/\b[a-z][a-z0-9]*\b/g, (word) => askEmyNormalizeIntentWord(word));
}

function askEmyIsBareActionNounQuery(query) {
  const text = String(query || "").toLowerCase().replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (/^(show|open|pull up|bring|display|compare|analyse|analyze|review|explain|check|find|search|list|create|add|help|how|what|why|where|can|could)\b/.test(text)) return false;
  const filler = new Set(["my", "your", "the", "a", "an", "please", "pls", "to", "test", "testing", "try", "trying", "just", "only", "now", "again", "for", "me", "us", "in", "on", "at", "emy", "here", "this", "that"]);
  const core = text.split(" ").filter(Boolean).filter((word) => !filler.has(word));
  if (!core.length || core.length > 2) return false;
  const metricWord = /^(stats?|statistics|analytics|data|performance|insights?)$/;
  const specificMetricWord = /^(sales|orders?|revenue|products?|items?|stock|customers?|clients?|views?|likes?|saves?|engagement|profile|clips?|videos?|posts?|services?|jobs?|events?)$/;
  if (core.length === 2 && core.some((word) => metricWord.test(word)) && core.some((word) => specificMetricWord.test(word))) return false;
  const platformNoun = /^(stats?|statistics|analytics|data|performance|insights?|views?|likes?|saves?|engagement|sales|orders?|revenue|products?|items?|stock|listings?|customers?|clients?|profile|profiles|account|business|businesses|shops?|stores?|jobs?|roles?|clips?|videos?|reels?|posts?|articles?|blogs?|services?|events?|suppliers?|partners?|map|directions?|messages?|chat|notifications?|reviews?|settings|dashboard|backend|admin|payments?|setup|support|offers?)$/;
  return core.every((word) => platformNoun.test(word));
}

function askEmyClassifyIntent(query) {
  const text = askEmyNormalizeIntentText(query);
  if (askEmyIsViewerLocationQuery(text)) return "viewer-location";
  if (askEmyIsViewerProfileQuery(text)) return "viewer-profile";
  if (askEmyIsMapCapabilityQuery(text)) return "map-capability";
  if (askEmyIsBusinessCustomerGeoQuery(text)) return "customer-geo";
  if (askEmyIsIdentityIntroQuery(text)) return "identity";
  if (askEmyIsTestConversationQuery(text)) return "conversation";
  if (askEmyIsOpenConversationPrompt(text)) return "conversation";
  if (askEmyIsConversationalFragmentQuery(text)) return "conversation";
  if (askEmyIsSocialChatQuery(query)) return "conversation";
  if (askEmyIsBareActionNounQuery(text)) return "conversation";
  if (askEmyIsUnclearQuery(text)) return "unclear";
  if (/^(hi|hello|hey|how are you|how're you|how is it going|how's it going|good morning|good afternoon|good evening|thanks|thank you)\b/.test(text)) return "conversation";
  if (/\b(how are you|how's your day|how is your day|what's up|whats up)\b/.test(text)) return "conversation";
  if (/\b(what is emy|what's emy|about emy|explain emy|tell me about emy|how does emy work|what does emy do)\b/.test(text)) return "platform-info";
  if (askEmyIsAssistantGuidanceQuery(text)) return "guidance";
  if (askEmyIsMapAreaQuery(text)) return "map-area";
  if (askEmyIsDirectionsQuery(text)) return "directions";
  if (askEmyIsLocationInfoQuery(text)) return "location-info";
  if (askEmyIsProfileIntentQuery(text)) return "profile";
  if (askEmyIsCustomerSelfContentQuery(text)) return "customer-self";
  if (askEmyIsCustomerRelationshipQuery(text)) return "customer";
  if (askEmyIsBusinessQualityQuery(text)) return "business-quality";
  if (askEmyIsProductDemandQuestion(text)) return "product";
  if (askEmyIsAnalyticsIntent(text)) return "analytics";
  if (/\b(service|services|support|logistics|supplier|suppliers|legal|financial|finance|advice|insight|insights|customer experience|business access)\b/.test(text)) return "service";
  if (/\b(job|jobs|hiring|hire|work|role|roles|cv|apply)\b/.test(text)) return "job";
  if (/\b(event|events|meetup|booking|class|workshop|when)\b/.test(text)) return "event";
  if (/\b(product|products|price|prices|buy|sell|sells|selling|available|cheapest|cost|bottle|stock|tomatoe?s?)\b/.test(text)) return "product";
  if (/\b(clip|clips|video|videos|reel|reels)\b/.test(text)) return "clip";
  if (/\b(article|articles|blog|news)\b/.test(text)) return "article";
  if (/\b(post|posts|feed|feeds|update|updates)\b/.test(text)) return "post";
  if (/\b(near|nearby|around me|local|business|businesses|shops?|stores?|places?|service|open)\b/.test(text)) return "business";
  return "general";
}

function askEmyRequestedTypes(query) {
  const text = askEmyNormalizeIntentText(query);
  const matches = [
    ["service", /\b(service|services|support|logistics|supplier|suppliers|legal|financial|finance|advice|insight|insights|customer experience|business access)\b/],
    ["job", /\b(job|jobs|hiring|hire|work|role|roles|cv|apply)\b/],
    ["event", /\b(event|events|meetup|booking|class|workshop)\b/],
    ["product", /\b(product|products|price|prices|buy|sell|sells|selling|available|cheapest|cost|stock|bottle|face wash|pizza slice|tomatoe?s?)\b/],
    ["clip", /\b(clip|clips|video|videos|reel|reels)\b/],
    ["article", /\b(article|articles|blog|news)\b/],
    ["post", /\b(post|posts|feed|feeds|update|updates)\b/],
    ["business", /\b(near|nearby|around me|local|business|businesses|shops?|stores?|places?|open)\b/]
  ];
  const types = matches.filter((entry) => entry[1].test(text)).map((entry) => entry[0]);
  if (types.includes("business") && types.some((type) => type !== "business") && (askEmyIsFollowedBusinessQuery(text) || !/\bbusiness(?:es)?\b/.test(text))) {
    return types.filter((type) => type !== "business");
  }
  return types;
}

function askEmyHistoryText(payload) {
  const history = Array.isArray(payload && payload.history) ? payload.history.slice(-8) : [];
  return history.map((item) => clean(item && item.text)).filter(Boolean).join(" ");
}

function askEmyIsFollowUpQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  if (askEmyIsExplicitMapOrLocationRequest(text)) return false;
  return /^(yes|yeah|yep|yea|ok|okay|sure|please|pls|plz|do it|do it then|show me|show them|show those|open them|open those|go on|continue|send them|where are they|where are those|where are the boxes|where are the cards)\b/i.test(text)
    || /\b(do it|show them|show those|open them|open those|where are they|where are those|where are the boxes|where are the cards|the boxes|the cards|where are products|where are the products|are there (?:any )?m(?:ore|roe)|any m(?:ore|roe)|m(?:ore|roe) (?:of them|results|matches|jobs|products|businesses|services|clips|posts|events)|other (?:ones|results|matches)|anything else|next results?)\b/i.test(text);
}

function askEmyIsAffirmativeFollowUpQuery(query) {
  const text = clean(query).toLowerCase().replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
  if (askEmyIsExplicitMapOrLocationRequest(text)) return false;
  return /^(yes|yeah|yep|yea|ok|okay|sure|please|pls|plz|do it|do it then|show me|show it|show them|go on|continue)(?: please)?$/.test(text);
}

function askEmyIsExplicitMapOrLocationRequest(query) {
  const text = clean(query).toLowerCase().replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return false;
  const hasMapOrLocation = /\b(my location|saved location|search location|current location|where i am|where am i|gps|radius|postcode|map|maps|directions?|route)\b/.test(text);
  const hasRequestCue = /\b(show|open|view|display|see|tell|where|what|find|search|map|maps|directions?|route)\b/.test(text);
  return hasMapOrLocation && hasRequestCue;
}

function askEmyHistoryHasStatsClarification(payload) {
  const history = askEmyHistoryText(payload || {}).toLowerCase();
  return /show your statistics here, explain what the stats mean|what do you want to do with the statistics|check one specific metric/.test(history);
}

function askEmyAnalyticsFollowUpQuery(query, payload) {
  const cleanQuery = clean(query);
  if (askEmyIsAffirmativeFollowUpQuery(cleanQuery) && askEmyHistoryHasStatsClarification(payload || {})) {
    return "show my business statistics";
  }
  return "";
}

function askEmyResolvedRequestedTypes(query, payload) {
  const direct = askEmyRequestedTypes(query);
  if (direct.length) return direct;
  if (!askEmyIsFollowUpQuery(query)) return [];
  return askEmyRequestedTypes(askEmyHistoryText(payload || {}));
}

function askEmyContextualQuery(query, payload) {
  const cleanQuery = clean(query);
  if (askEmyIsExplicitMapOrLocationRequest(cleanQuery)) return cleanQuery;
  const analyticsFollowUp = askEmyAnalyticsFollowUpQuery(cleanQuery, payload || {});
  if (analyticsFollowUp) return analyticsFollowUp;
  const types = askEmyResolvedRequestedTypes(cleanQuery, payload || {});
  if (!types.length || askEmyRequestedTypes(cleanQuery).length) return cleanQuery;
  const typeWords = types.map((type) => type === "article" ? "post" : `${type}s`).join(" ");
  const followContext = askEmyIsFollowedBusinessQuery(askEmyHistoryText(payload || {})) ? " businesses I follow" : "";
  return `${typeWords}${followContext} ${cleanQuery}`.trim();
}

function askEmyResolvedIntent(query, payload) {
  const direct = askEmyClassifyIntent(query);
  if (direct === "conversation" || direct === "guidance" || direct === "identity" || direct === "analytics" || direct === "map-area" || direct === "directions" || direct === "location-info" || direct === "platform-info" || direct === "profile" || direct === "customer-self" || direct === "customer" || direct === "business-quality" || direct === "viewer-profile" || direct === "viewer-location" || direct === "map-capability" || direct === "customer-geo") return direct;
  const contextual = askEmyContextualQuery(query, payload || {});
  return contextual && contextual !== clean(query) ? askEmyClassifyIntent(contextual) : direct;
}

const ASK_EMY_ASSISTANT_ONLY_INTENTS = new Set([
  "conversation",
  "guidance",
  "identity",
  "unclear",
  "location-info",
  "viewer-location",
  "viewer-profile",
  "map-capability",
  "customer-geo",
  "platform-info",
  "profile",
  "customer-self",
  "analytics"
]);

const ASK_EMY_RECORD_CARD_INTENTS = new Set([
  "business",
  "service",
  "product",
  "job",
  "event",
  "clip",
  "article",
  "post"
]);

const EMY_ASSISTANT_CONTRACT_VERSION = "v1";

function askEmyBrainResponseType(intent, recordCardsAllowed) {
  if (recordCardsAllowed) return "small_result_list";
  if (intent === "analytics") return "analytics_chart";
  if (intent === "guidance") return "guidance_steps";
  if (intent === "viewer-location" || intent === "viewer-profile" || intent === "identity" || intent === "conversation" || intent === "platform-info") return "chat_answer";
  if (intent === "unclear") return "confirmation_question";
  return "chat_answer";
}

function askEmyPlannerContext(payload = {}) {
  const history = askEmyHistoryText(payload || {}).toLowerCase();
  return {
    historyText: history,
    activeDomain: /\b(stats?|statistics|analytics|graphs?|charts?|performance)\b/.test(history) ? "analytics" : "",
    activeEntity: /\b(product statistics|product interest|product engagement|top products?|most viewed product|show me the product)\b/.test(history) ? "products" : "",
    activeMetric: /\bprofile views?\b/.test(history) ? "profile_views" : /\bapplications?|applicants?\b/.test(history) ? "applications" : /\blikes?\b/.test(history) ? "likes" : /\bcomments?\b/.test(history) ? "comments" : /\bsaves?\b/.test(history) ? "saves" : /\bviews?|viewed\b/.test(history) ? "views" : "",
    pendingQuestion: /show your statistics here, explain what the stats mean|what do you want to do with the statistics|check one specific metric/.test(history) ? { type: "stats_clarification" } : null,
    previousIntent: /\b(most viewed product|show me the product|product not products|the product not products)\b/.test(history) ? "PRODUCT_SINGLE_METRIC" : ""
  };
}

function askEmyPlanMessage(query, payload = {}) {
  if (!askEmyBrainPlanner || typeof askEmyBrainPlanner.planAskEmyMessage !== "function") return null;
  try {
    return askEmyBrainPlanner.planAskEmyMessage(query, askEmyPlannerContext(payload || {}));
  } catch (error) {
    return null;
  }
}

function askEmyRoutePlannedTool(plan) {
  if (!plan || !askEmyToolRegistry || typeof askEmyToolRegistry.routeAskEmyTool !== "function") return null;
  try {
    return askEmyToolRegistry.routeAskEmyTool(plan);
  } catch (error) {
    return null;
  }
}

function askEmyIntentFromPlanner(plan, fallbackIntent) {
  const plannerIntent = plan && plan.intent || "";
  if (!plannerIntent || plannerIntent === "UNKNOWN") return fallbackIntent;
  if (plannerIntent === "CHAT") return "conversation";
  if (plannerIntent === "IDENTITY" || plannerIntent === "ACCOUNT") return "viewer-profile";
  if (plannerIntent === "VIEWER_LOCATION") return "viewer-location";
  if (plannerIntent === "GUIDANCE" || plannerIntent === "CREATE_DRAFT") return "guidance";
  if (plannerIntent === "CUSTOMER_SELF_CONTENT") return "customer-self";
  if (plannerIntent === "BUSINESS_CUSTOMERS") return "customer";
  if (plannerIntent === "PRODUCT_SINGLE_METRIC" || plannerIntent === "PRODUCT_LIST" || plannerIntent === "PRODUCT_SEARCH") return "product";
  if (plannerIntent === "ARTICLE_LIST") return "article";
  if (plannerIntent === "PRODUCT_LIST_METRIC" || plannerIntent === "BUSINESS_ANALYTICS" || plannerIntent === "CROSS_ENTITY_ANALYTICS") return "analytics";
  if (plannerIntent === "SEARCH_NEARBY") return plan.locationSearchAllowed ? "business" : "general";
  if (plannerIntent === "OPEN_ITEM" || plannerIntent === "COMPARE") return fallbackIntent;
  return fallbackIntent;
}

function askEmyAssistantBrain(query, payload = {}) {
  const cleanQuery = clean(query) || "nearby businesses";
  const normalizedText = askEmyNormalizeIntentText(cleanQuery);
  const contextualQuery = askEmyContextualQuery(cleanQuery, payload || {});
  const planner = askEmyPlanMessage(cleanQuery, payload || {});
  const toolRoute = askEmyRoutePlannedTool(planner);
  const resolvedIntent = askEmyResolvedIntent(cleanQuery, payload || {});
  const intent = askEmyIntentFromPlanner(planner, resolvedIntent);
  const requestedTypes = askEmyResolvedRequestedTypes(cleanQuery, payload || {});
  const assistantOnly = ASK_EMY_ASSISTANT_ONLY_INTENTS.has(intent)
    || askEmyIsAssistantGuidanceQuery(cleanQuery)
    || askEmyIsIdentityIntroQuery(cleanQuery)
    || askEmyIsOpenConversationPrompt(cleanQuery)
    || askEmyIsSimpleGreetingQuery(cleanQuery)
    || Boolean(planner && planner.intent !== "UNKNOWN" && planner.recordCardsAllowed === false);
  const recordCardsAllowed = planner && planner.intent !== "UNKNOWN"
    ? Boolean(toolRoute ? toolRoute.recordCardsAllowed : planner.recordCardsAllowed)
    : !assistantOnly && ASK_EMY_RECORD_CARD_INTENTS.has(intent);
  return {
    clean: cleanQuery,
    normalizedText,
    contextualQuery,
    intent,
    requestedTypes,
    assistantOnly,
    recordCardsAllowed,
    responseType: toolRoute ? toolRoute.responseType : planner && planner.intent !== "UNKNOWN" ? planner.responseType : askEmyBrainResponseType(intent, recordCardsAllowed),
    cardsAllowedReason: recordCardsAllowed ? `intent:${intent}` : assistantOnly ? `assistant-only:${intent}` : `blocked:${intent}`,
    contractVersion: EMY_ASSISTANT_CONTRACT_VERSION,
    plannerIntent: planner && planner.intent || "",
    planningText: planner && planner.planningText || cleanQuery,
    resolvedFollowUp: Boolean(planner && planner.resolvedFollowUp),
    followUpResolution: planner && planner.followUpResolution || "",
    plannerEntity: planner && planner.entity || "",
    plannerMetric: planner && planner.metric || "",
    plannerQuantity: planner && planner.quantity || "",
    limit: Number(planner && planner.limit) > 0 ? Math.min(Number(planner.limit), 25) : null,
    plannerToolHint: planner && planner.toolHint || "",
    actionIntent: planner && planner.actionIntent || "",
    actionMode: planner && planner.actionMode || "",
    actionTarget: planner && planner.actionTarget || "",
    actionScope: planner && planner.actionScope || "",
    actionLabel: planner && planner.actionLabel || "",
    actionUrl: planner && planner.actionUrl || "",
    actionResponseType: planner && planner.actionResponseType || "",
    actionUsesExistingView: Boolean(planner && planner.actionUsesExistingView),
    actionRequiresConfirmation: Boolean(planner && planner.actionRequiresConfirmation),
    actionDraftFields: planner && Array.isArray(planner.actionDraftFields) ? planner.actionDraftFields : [],
    selectedToolName: toolRoute && toolRoute.toolName || planner && planner.toolHint || "",
    selectedToolPermission: toolRoute && toolRoute.permission || "",
    selectedToolDataSource: toolRoute && toolRoute.dataSource || "",
    selectedToolRequiresConfirmation: Boolean(toolRoute && toolRoute.requiresConfirmation),
    selectedToolUsesExistingView: Boolean(toolRoute && toolRoute.usesExistingView),
    locationSearchAllowed: Boolean(toolRoute ? toolRoute.locationSearchAllowed : planner && planner.locationSearchAllowed),
    mode: recordCardsAllowed ? "records" : "assistant"
  };
}

function askEmySearchEventHash(value) {
  const text = clean(value).toLowerCase();
  if (!text) return "";
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 24);
}

function askEmySearchEventFirst(values, max = 180) {
  for (const value of Array.isArray(values) ? values : [values]) {
    const text = clean(value).slice(0, max);
    if (text) return text;
  }
  return "";
}

function askEmySearchEventResultRefs(results = []) {
  return (Array.isArray(results) ? results : []).slice(0, 12).map((result) => {
    const type = askEmySearchEventFirst([result && result.type], 40).toLowerCase();
    if (!type || type === "customer") return null;
    return {
      type,
      id: askEmySearchEventFirst([
        result && result.id,
        result && result.key,
        result && result.productId,
        result && result.jobId,
        result && result.businessKey
      ], 140),
      name: askEmySearchEventFirst([result && result.name, result && result.title, result && result.productName], 180),
      business: askEmySearchEventFirst([result && result.business, result && result.businessName], 180),
      businessKey: askEmySearchEventFirst([result && result.businessKey, result && result.profileKey], 180)
    };
  }).filter(Boolean);
}

function askEmySearchEventResultTypes(results = []) {
  return (Array.isArray(results) ? results : []).reduce((counts, result) => {
    const type = askEmySearchEventFirst([result && result.type], 40).toLowerCase() || "unknown";
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});
}

function askEmyBuildSearchEvent(payload = {}, answer = {}, startedAt = Date.now()) {
  const user = payload && payload.user && typeof payload.user === "object" ? payload.user : {};
  const query = askEmySearchEventFirst([payload && payload.query], 900);
  const role = askEmySearchEventFirst([payload && payload.accountRole, payload && payload.role, user.role], 40).toLowerCase() || "customer";
  const results = Array.isArray(answer && answer.results) ? answer.results : [];
  let intent = "";
  let requestedTypes = [];
  let contextualQuery = query;
  try {
    intent = askEmyResolvedIntent(query, payload || {});
    requestedTypes = askEmyResolvedRequestedTypes(query, payload || {});
    contextualQuery = askEmyContextualQuery(query, payload || {});
  } catch (error) {
    intent = "";
  }
  const businessKey = role === "business" ? askEmySearchEventFirst([
    payload && payload.businessKey,
    payload && payload.activeBusinessKey,
    user.businessKey,
    user.activeBusinessKey,
    user.profileKey
  ], 180) : "";
  const businessName = role === "business" ? askEmySearchEventFirst([
    payload && payload.businessName,
    payload && payload.activeBusinessName,
    user.businessName,
    user.activeBusinessName,
    user.name
  ], 180) : "";
  return {
    createdAtIso: new Date().toISOString(),
    source: "ask-emy-api",
    chatId: askEmySearchEventFirst([payload && payload.chatId], 120),
    query,
    normalizedQuery: query.toLowerCase(),
    contextualQuery,
    intent,
    requestedTypes,
    location: askEmySearchEventFirst([payload && payload.location], 160),
    radius: askEmySearchEventFirst([payload && payload.radius], 80),
    accountRole: role,
    userHash: askEmySearchEventHash(askEmySearchEventFirst([
      user.uid,
      user.id,
      user.email,
      user.name,
      payload && payload.userId,
      payload && payload.customerId
    ], 300)),
    businessKey,
    businessName,
    provider: askEmySearchEventFirst([answer && answer.provider], 120),
    providerErrorStatus: askEmySearchEventFirst([answer && answer.providerError && answer.providerError.statusText], 80),
    resultCount: results.length,
    resultTypes: askEmySearchEventResultTypes(results),
    resultRefs: askEmySearchEventResultRefs(results),
    noResults: results.length === 0,
    latencyMs: Math.max(0, Date.now() - Number(startedAt || Date.now())),
    privacy: "query plus hashed viewer identity; no raw customer contact details"
  };
}

async function askEmySaveSearchEvent(payload = {}, answer = {}, startedAt = Date.now()) {
  try {
    const event = askEmyBuildSearchEvent(payload, answer, startedAt);
    await db.collection("askEmySearchEvents").add(Object.assign({}, event, {
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }));
  } catch (error) {
    console.warn("Ask EMY search event was not saved:", error && error.message || error);
  }
}

function askEmyIsMoreResultsQuestion(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  return /\b(are there (?:any )?m(?:ore|roe)|any m(?:ore|roe)|m(?:ore|roe) (?:of them|results|matches|jobs|products|businesses|services|clips|posts|events)|other (?:ones|results|matches)|anything else|next results?)\b/i.test(text);
}

function askEmyHistoryRows(payload) {
  return Array.isArray(payload && payload.history) ? payload.history.slice(-8) : [];
}

function askEmyHistoryHasResultContext(payload, intent) {
  const target = clean(intent).toLowerCase();
  const history = askEmyHistoryRows(payload || {});
  if (history.some((item) => Array.isArray(item && item.results) && item.results.some((record) => !target || clean(record && record.type).toLowerCase() === target))) return true;
  return Boolean(askEmyInferResultIntentFromText(askEmyHistoryText(payload || {})));
}

function askEmyPreviousShownCount(payload, intent) {
  const target = clean(intent).toLowerCase();
  const history = askEmyHistoryRows(payload || {});
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const item = history[index] || {};
    const results = Array.isArray(item.results) ? item.results : [];
    const typed = target ? results.filter((record) => clean(record && record.type).toLowerCase() === target) : results;
    if (typed.length) return typed.length;
  }
  const text = askEmyHistoryText(payload || {}).toLowerCase();
  const found = text.match(/\bi found\s+(\d+)\s+saved\b/);
  const first = text.match(/\bshowing the first\s+(\d+)\b/);
  if (first) return Number(first[1]) || 0;
  if (found && /\bshowing all of them here\b/.test(text)) return Number(found[1]) || 0;
  return 0;
}

function askEmyIsOwnershipFollowUpQuery(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  if (/^(show|find|search|list|open|get|give me)\b/.test(text)) return false;
  return /\b(are|is|were|was|do|does|did)\b[\s\S]{0,40}\b(they|these|those|them|it|this|that|products?|items?|cards?|results?)\b[\s\S]{0,80}\b(my|mine|your|owned|belong(?:s)? to me|from my|from your|my business|your business)\b/.test(text)
    || /\b(my|mine|your)\s+(products?|items?|cards?|results?)\b/.test(text) && /\b(are|is|they|these|those|them)\b/.test(text)
    || /\b(?:the\s+)?ones?\s+(?:i|we)\s+own\b/.test(text)
    || /\b(?:which|what)\s+(?:ones?|items?|records?|cards?|results?)\s+(?:are\s+)?(?:mine|my|ours?|owned|belong(?:s)? to me)\b/.test(text);
}

function askEmyLastHistoryResults(payload, type = "") {
  const target = clean(type).toLowerCase();
  const history = askEmyHistoryRows(payload || {});
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const item = history[index] || {};
    const results = Array.isArray(item.results) ? item.results : [];
    const typed = target ? results.filter((record) => clean(record && record.type).toLowerCase() === target) : results;
    if (typed.length) return typed;
  }
  return [];
}

function askEmyOwnershipTypeFromText(value) {
  const text = askEmyNormalizeIntentText(value);
  if (/\bproducts?|items?|stock|listings?\b/.test(text)) return "product";
  if (/\bjobs?|roles?|hiring|vacanc(?:y|ies)\b/.test(text)) return "job";
  if (/\bclips?|videos?|reels?\b/.test(text)) return "clip";
  if (/\bposts?|updates?\b/.test(text)) return "post";
  if (/\barticles?|blogs?|news\b/.test(text)) return "article";
  if (/\bevents?|bookings?|workshops?|classes?\b/.test(text)) return "event";
  if (/\bservices?\b/.test(text)) return "service";
  return "";
}

function askEmyOwnershipTypeLabel(type) {
  if (type === "product") return "products";
  if (type === "job") return "job posts";
  if (type === "clip") return "clips";
  if (type === "post") return "posts";
  if (type === "article") return "articles";
  if (type === "event") return "events";
  if (type === "service") return "services";
  return "items";
}

function askEmyOwnershipCountLabel(count, type) {
  if (Number(count) !== 1) return askEmyOwnershipTypeLabel(type);
  if (type === "product") return "product";
  if (type === "job") return "job post";
  if (type === "clip") return "clip";
  if (type === "post") return "post";
  if (type === "article") return "article";
  if (type === "event") return "event";
  if (type === "service") return "service";
  return "item";
}

function askEmyRecentOwnershipContextType(payload = {}) {
  const history = askEmyHistoryRows(payload || {});
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const item = history[index] || {};
    const textType = askEmyOwnershipTypeFromText(item.text);
    if (textType) return textType;
    const results = Array.isArray(item.results) ? item.results : [];
    const types = Array.from(new Set(results.map((record) => clean(record && record.type).toLowerCase()).filter(Boolean)));
    if (types.length === 1) return types[0];
  }
  return "";
}

function askEmyOwnershipFollowUpAnswer(query, payload = {}, provider = "local-intent") {
  const text = clean(query).toLowerCase();
  const explicitType = askEmyOwnershipTypeFromText(text);
  const type = explicitType || askEmyRecentOwnershipContextType(payload || {});
  if (!type) {
    return {
      answer: askEmyFormatReply([
        "Do you mean your products, jobs, clips, posts, articles, events, or services?",
        askEmyFormatSection("I will keep it separate", [
          "Tell me the type and I will show only that kind of owned content.",
          "For example: my products, my clips, or my job posts."
        ])
      ]),
      results: [],
      provider
    };
  }
  const results = askEmyLastHistoryResults(payload || {}, type);
  const owned = results.filter((record) => record && (record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice));
  const noun = askEmyOwnershipTypeLabel(type);
  const businessNames = Array.from(new Set(owned.concat(results).map((record) => clean(record && (record.business || record.businessName))).filter(Boolean))).slice(0, 2);
  const businessText = businessNames.length ? ` from ${businessNames.join(" and ")}` : "";
  const historyText = askEmyHistoryText(payload || {});
  const historyBusiness = clean((historyText.match(/\bfrom your business,\s*([^.\n]+)/i) || [])[1]);
  const inferredBusinessText = historyBusiness ? ` from ${historyBusiness}` : businessText;
  const contextLine = explicitType ? `I am looking only at your ${noun}.` : `I am treating that as your ${noun}, because that is the current thread context.`;
  if (owned.length) {
    const countedNoun = askEmyOwnershipCountLabel(owned.length, type);
    return {
      answer: askEmyFormatReply([
        `${contextLine} I found ${owned.length} ${countedNoun}${businessText}.`,
        askEmyFormatSection("What this means", [
          "These are content records under your business, not separate businesses themselves.",
          "I am not mixing in clips, posts, jobs, or articles unless you ask for them."
        ]),
        askEmyFormatSection("Next", [
          "Open one card, ask me to compare them, or ask me to improve one listing."
        ])
      ]),
      results: owned.slice(0, 6),
      provider
    };
  }
  if (results.length) {
    const countedNoun = askEmyOwnershipCountLabel(results.length, type);
    return {
      answer: askEmyFormatReply([
        `I found ${results.length} ${countedNoun}${businessText}, but none are marked as yours in this chat context.`,
        askEmyFormatSection("Better next step", [
          `Ask me to show your ${noun} from your business, and I will search the business records directly.`
        ])
      ]),
      results: [],
      provider
    };
  }
  if (!results.length && inferredBusinessText) {
    return {
      answer: askEmyFormatReply([
        `Yes, based on the last answer, those ${noun} were described as coming from your business${inferredBusinessText}.`,
        askEmyFormatSection("Note", [
          "I should answer that directly instead of running the product search again."
        ])
      ]),
      results: [],
      provider
    };
  }
  return {
    answer: askEmyFormatReply([
      "I cannot confirm that from the previous cards because I do not have their ownership marker in this follow-up context.",
      askEmyFormatSection("Better next step", [
        `Ask me to show your ${noun} only, and I will filter for records marked as your business.`,
        "When cards are marked Your business, I should answer ownership questions directly instead of repeating the search."
      ])
    ]),
    results: [],
    provider
  };
}

function askEmyIsJobApplyFollowUp(query, payload) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  const history = askEmyHistoryText(payload || {}).toLowerCase();
  const jobContext = /\b(job|jobs|hiring|hire|role|roles|work|vacancy|cv|resume|profile link)\b/.test(`${text} ${history}`);
  const applyAction = /\b(apply|application|cv|resume|cover letter|draft|write|message|send)\b/.test(text);
  const consentAction = /^(yes|yeah|yep|yea|sure|please|pls|plz|ok|okay|do it|do it then|help me|go on)\b/i.test(text)
    || /\b(yes\s+(?:please|pleas|pls|plz)|help me apply|help apply|i want to apply|apply for|draft|write (?:it|one|a message)|send (?:it|a message))\b/i.test(text);
  const previousOffer = /\b(job|jobs|hiring|role|roles|work|vacancy|job listing|view job)\b/.test(history)
    && /\b(apply|application|help you apply|help me apply|cv|resume|profile link)\b/.test(history);
  return jobContext && (applyAction || (consentAction && previousOffer));
}

function askEmyJobApplyRecords(records, query, payload, limit = 4) {
  const contextualQuery = askEmyContextualQuery(query, payload || {});
  const history = askEmyHistoryText(payload || {});
  const jobQuery = `job apply ${contextualQuery} ${history}`.trim();
  const available = askEmyFilterRecordsForQuery(Array.isArray(records) ? records : [], jobQuery, payload || {});
  return askEmySelectVisibleResults(available, jobQuery, "job", limit, ["job"]);
}

function askEmyDisplayDate(value) {
  const text = clean(value);
  if (!text) return "";
  const date = new Date(text);
  if (!Number.isNaN(date.getTime()) && /\d{4}-\d{2}-\d{2}/.test(text)) {
    return date.toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  }
  return text;
}

function askEmyDisplayPlace(value) {
  const text = clean(value);
  if (/^location to confirm$/i.test(text)) return "To confirm";
  return text;
}

function askEmyFormatSection(title, lines = []) {
  const cleanLines = lines.map((line) => clean(line)).filter(Boolean);
  if (!cleanLines.length) return "";
  return `${title}\n${cleanLines.join("\n")}`;
}

function askEmyFormatReply(sections = []) {
  return sections.map((section) => String(section == null ? "" : section).trim()).filter(Boolean).join("\n\n");
}

function askEmyJobApplicationAnswer(query, payload, records, provider) {
  const results = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(askEmyJobApplyRecords(records, query, payload || {}, 4), payload || {}), payload || {});
  const job = results[0] || {};
  if (!results.length) {
    return {
      answer: "Yes, I can help you apply, but I cannot see the job listing in the saved EMY records for this chat. Ask me to show the job again, then I can draft the message from that job card.",
      provider: provider || "local-intent",
      results: []
    };
  }
  const title = clean(job.name) || "this role";
  const business = clean(job.business) || clean(job.place) || "the business";
  const place = askEmyDisplayPlace(job.place);
  const desc = clean(job.desc);
  const date = askEmyDisplayDate(job.date);
  const placePhrase = place && !/^to confirm$/i.test(place) ? ` at ${place}` : "";
  const draft = `Hi ${business}, I am interested in the ${title} role${placePhrase}. I would like to apply and can share my CV or EMY profile. Please let me know the next step, the hours, pay, and any experience you need.`;
  return {
    answer: askEmyFormatReply([
      `Yes. I can help you apply for ${title} at ${business}.`,
      askEmyFormatSection("Draft message", [`"${draft}"`]),
      askEmyFormatSection("Job details", [
        `Business: ${business}`,
        `Role: ${title}`,
        place ? `Location: ${place}` : "",
        date ? `Posted: ${date}` : "",
        desc ? `About: ${desc}` : "",
      ]),
      askEmyFormatSection("Next step", [
        "Open the job card below, check the details, then send this message with your CV or EMY profile link.",
      ]),
    ]),
    provider: provider || "local-intent",
    results
  };
}

function askEmyIsFollowedBusinessQuery(query) {
  const text = clean(query).toLowerCase();
  return /\b(follow|following|followed|my businesses|my shops|my stores|saved businesses|businesses i follow|businesses i'm following|businesses i am following|shops i follow|stores i follow)\b/.test(text);
}

function askEmyAliasKey(value) {
  return clean(value).toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 140);
}

function askEmyAddBusinessAliases(set, value) {
  if (!set || !value) return;
  if (Array.isArray(value)) {
    value.forEach((entry) => askEmyAddBusinessAliases(set, entry));
    return;
  }
  if (typeof value === "object") {
    [
      value.key,
      value.businessKey,
      value.profileKey,
      value.slug,
      value.id,
      value.name,
      value.title,
      value.business,
      value.businessName,
      value.displayName,
      value.profileName,
      value.customerBusinessKey,
      value.detailBusinessKey,
      value.ownerName,
      value.sellerName,
      value.aliases
    ].forEach((entry) => askEmyAddBusinessAliases(set, entry));
    return;
  }
  const key = askEmyAliasKey(value);
  if (key) set.add(key);
}

function askEmyDropGenericBusinessAliases(aliases) {
  [
    "",
    "account",
    "business",
    "business-account",
    "emy",
    "emy-account",
    "emy-business",
    "emy-customer",
    "customer",
    "customer-account",
    "profile",
    "business-profile",
    "customer-profile"
  ].forEach((key) => aliases.delete(key));
  return aliases;
}

function askEmyAddSharedOwnedBusinessAliases(aliases) {
  if (!aliases || typeof aliases.add !== "function") return aliases;
  let data = {};
  try {
    const store = readSharedContentStore();
    data = store && store.data && typeof store.data === "object" ? store.data : {};
  } catch (error) {
    data = {};
  }
  [
    "emyBusinessName",
    "emyBusinessDisplayName",
    "emySelectedBusinessProfileName",
    "emyActiveBusinessName",
    "emyCurrentBusinessName",
    "emyBusinessKey",
    "emySelectedBusinessKey"
  ].forEach((key) => askEmyAddBusinessAliases(aliases, readSharedStoredValue(data[key])));
  [
    "emyBusinessProfile",
    "emyActiveBusiness",
    "emySelectedBusiness",
    "emyBusinessProfileDraft"
  ].forEach((key) => askEmyAddBusinessAliases(aliases, readSharedStoredValue(data[key])));
  return aliases;
}

function askEmyOwnedBusinessAliases(payload) {
  const aliases = new Set();
  const addAccount = (account) => {
    if (!account || typeof account !== "object") return;
    const role = clean(account.role || account.accountRole || account.type).toLowerCase();
    const hasBusinessIdentity = Boolean(account.businessKey || account.businessName || account.profileKey || account.business || account.profileName);
    const looksBusiness = role === "business" || /\bbusiness\b/.test(role) || hasBusinessIdentity;
    if (!hasBusinessIdentity && looksBusiness) return;
    if (!looksBusiness) return;
    [
      account.businessKey,
      account.profileKey,
      account.key,
      account.slug,
      account.businessName,
      account.business,
      account.name,
      account.displayName,
      account.profileName
    ].forEach((value) => askEmyAddBusinessAliases(aliases, value));
  };
  addAccount(payload && payload.user);
  addAccount(payload && payload.activeUser);
  addAccount(payload && payload.business);
  addAccount(payload && payload.activeBusiness);
  addAccount(payload && payload.selectedBusiness);
  if (Array.isArray(payload && payload.accountOptions)) payload.accountOptions.forEach(addAccount);
  if (Array.isArray(payload && payload.accounts)) payload.accounts.forEach(addAccount);
  if (Array.isArray(payload && payload.ownedBusinesses)) payload.ownedBusinesses.forEach(addAccount);
  if (Array.isArray(payload && payload.managedBusinesses)) payload.managedBusinesses.forEach(addAccount);
  if (clean(payload && payload.accountRole).toLowerCase() === "business" || payload && (payload.businessKey || payload.businessName)) {
    addAccount({
      role: "business",
      businessKey: payload && (payload.businessKey || payload.profileKey),
      businessName: payload && payload.businessName,
      name: payload && (payload.businessName || payload.name)
    });
  }
  askEmyAddSharedOwnedBusinessAliases(aliases);
  return askEmyDropGenericBusinessAliases(aliases);
}

function askEmyActiveOwnedBusinessAliases(payload) {
  const aliases = new Set();
  const activeRole = clean((payload && payload.accountRole) || (payload && payload.user && payload.user.role) || (payload && payload.activeUser && payload.activeUser.role)).toLowerCase();
  if (!/\bbusiness\b/.test(activeRole)) return aliases;
  const addAccount = (account) => {
    if (!account || typeof account !== "object") return;
    const role = clean(account.role || account.accountRole || account.type).toLowerCase();
    const hasBusinessIdentity = Boolean(account.businessKey || account.businessName || account.profileKey || account.business || account.profileName);
    const looksBusiness = role === "business" || /\bbusiness\b/.test(role) || hasBusinessIdentity;
    if (!hasBusinessIdentity || !looksBusiness) return;
    [
      account.businessKey,
      account.profileKey,
      account.key,
      account.slug,
      account.businessName,
      account.business,
      account.name,
      account.displayName,
      account.profileName
    ].forEach((value) => askEmyAddBusinessAliases(aliases, value));
  };
  addAccount(payload && payload.user);
  addAccount(payload && payload.activeUser);
  addAccount(payload && payload.business);
  addAccount(payload && payload.activeBusiness);
  addAccount(payload && payload.selectedBusiness);
  if (Array.isArray(payload && payload.ownedBusinesses)) payload.ownedBusinesses.forEach(addAccount);
  if (Array.isArray(payload && payload.managedBusinesses)) payload.managedBusinesses.forEach(addAccount);
  addAccount({
    role: "business",
    businessKey: payload && (payload.businessKey || payload.profileKey),
    businessName: payload && payload.businessName,
    name: payload && (payload.businessName || payload.name)
  });
  return askEmyDropGenericBusinessAliases(aliases);
}

function askEmyRecordBusinessAliases(record) {
  const aliases = new Set();
  if (!record || typeof record !== "object") return aliases;
  const type = clean(record.type).toLowerCase();
  [
    record.businessKey,
    record.profileKey,
    record.ownerKey,
    record.sellerKey,
    record.detailBusinessKey,
    type === "business" ? record.name : "",
    record.business,
    record.businessName,
    record.ownerName,
    record.sellerName,
    record.profileName
  ].forEach((value) => askEmyAddBusinessAliases(aliases, value));
  return askEmyDropGenericBusinessAliases(aliases);
}

function askEmyOwnerNoticeForRecord(record) {
  const type = clean(record && record.type).toLowerCase();
  if (type === "business") return "This is your business.";
  if (type === "product") return "This product is from your business.";
  if (type === "job") return "This job post is from your business.";
  if (type === "clip") return "This clip is from your business.";
  if (type === "post") return "This post was published by your business.";
  if (type === "article") return "This article was published by your business.";
  if (type === "event") return "This event is from your business.";
  if (type === "service") return "This service is from your business.";
  return "This is from your business.";
}

function askEmyIsOwnershipWordingQuestion(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  return /\bwhy\b[\s\S]{0,90}\b(say|said|called|call|mark|marked|show|showed)\b[\s\S]{0,90}\b(my|your)\s+bus\w{0,5}ess\b/.test(text)
    || /\bwhy\b[\s\S]{0,60}\bbus\w{0,5}ess\b/.test(text) && /\b(my|your)\b/.test(text);
}

function askEmyOwnershipWordingAnswer(query, payload = {}, provider = "local-intent") {
  const ownedRows = Array.isArray(payload && payload.ownedBusinesses) ? payload.ownedBusinesses : [];
  const ownedBusiness = clean(payload && (payload.activeBusinessName || payload.businessName) || payload && payload.user && payload.user.businessName || ownedRows[0] && (ownedRows[0].name || ownedRows[0].businessName || ownedRows[0].business)) || "the business";
  return {
    answer: askEmyFormatReply([
      "You're right to question that wording.",
      askEmyFormatSection("Correction", [
        "The article or post itself is not your business.",
        `It is content published by ${ownedBusiness}.`,
        `${ownedBusiness} is the business marked as yours or managed by you.`
      ]),
      askEmyFormatSection("How Ask EMY should say it", [
        `zcsdcaasx is an article published by ${ownedBusiness}.`,
        `${ownedBusiness} is marked as your business.`,
        "That keeps the content and the business separate."
      ])
    ]),
    results: [],
    provider
  };
}

function askEmyIsContentIdentityQuestion(query) {
  const text = clean(query).toLowerCase();
  if (!text) return false;
  return /\b(what|why|where|which)\b[\s\S]{0,40}\b(this|that|it)\b/.test(text)
    || /\bwhat\s+is\b/.test(text)
    || /\bwhy\s+is\b/.test(text);
}

function askEmyShouldIdentifyMentionedContent(query) {
  const intent = askEmyClassifyIntent(query);
  if (intent === "viewer-profile" || intent === "viewer-location" || intent === "map-capability" || intent === "customer-geo") return false;
  return intent === "general" || askEmyIsContentIdentityQuestion(query);
}

function askEmyRecordMentionedByTitle(records = [], query = "") {
  const queryText = clean(query).toLowerCase();
  if (!queryText) return null;
  const contentTypes = new Set(["article", "post", "clip", "product", "job", "event"]);
  const candidates = (Array.isArray(records) ? records : []).filter((record) => contentTypes.has(clean(record && record.type).toLowerCase()));
  const scored = candidates.map((record) => {
    const labels = [
      record && record.name,
      record && record.title,
      record && record.productName,
      record && record.productTitle,
      record && record.text,
      record && record.description
    ].map((value) => clean(value).toLowerCase()).filter((value) => value.length >= 4);
    const direct = labels.find((label) => queryText.includes(label));
    return direct ? { record, score: direct.length } : null;
  }).filter(Boolean).sort((a, b) => b.score - a.score);
  return scored[0] && scored[0].record || null;
}

function askEmyContentTypeLabel(type) {
  const cleanType = clean(type).toLowerCase();
  if (cleanType === "clip") return "clip";
  if (cleanType === "job") return "job post";
  if (cleanType === "event") return "event";
  if (cleanType === "product") return "product";
  if (cleanType === "article") return "article";
  if (cleanType === "post") return "post";
  return "content item";
}

function askEmyContentIdentityAnswer(query, payload = {}, records = [], provider = "local-intent") {
  const match = askEmyRecordMentionedByTitle(records, query);
  if (!match) return null;
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer([match], payload || {}), payload || {})[0] || match;
  const typeLabel = askEmyContentTypeLabel(marked.type);
  const articleWord = /^[aeiou]/i.test(typeLabel) ? "an" : "a";
  const title = clean(marked.name || marked.title || marked.text) || typeLabel;
  const business = clean(marked.business || marked.businessName || marked.actor || marked.author || marked.ownerName) || "the business";
  const description = clean(marked.desc || marked.description || marked.text || marked.articleBody);
  const published = askEmyDisplayDate(marked.postedAt || marked.createdAt || marked.updatedAt || marked.time);
  const ownership = marked.isOwnedByViewer
    ? `${business} is marked as your business, but this ${typeLabel} is content published by that business.`
    : "";
  return {
    answer: askEmyFormatReply([
      "Yes, I can see what that is.",
      askEmyFormatSection("What it is", [
        `${title} is ${articleWord} ${typeLabel}.`,
        `Published by: ${business}`,
        ownership,
        published ? `Posted: ${published}` : "",
        description ? `Description: ${description}` : "Description: not added yet."
      ]),
      askEmyFormatSection("Important", [
        `This is the ${typeLabel}, not the business profile itself.`,
        marked.isOwnedByViewer ? "The business behind it is marked as yours." : ""
      ])
    ]),
    results: [marked],
    provider
  };
}

function askEmyMarkOwnedByViewer(records = [], payload = {}) {
  const ownedAliases = askEmyOwnedBusinessAliases(payload || {});
  if (!ownedAliases.size) return Array.isArray(records) ? records : [];
  return (Array.isArray(records) ? records : []).map((record) => {
    const recordAliases = askEmyRecordBusinessAliases(record);
    const isOwned = Array.from(recordAliases).some((alias) => ownedAliases.has(alias));
    if (!isOwned) return record;
    const ownerNotice = askEmyOwnerNoticeForRecord(record);
    const tags = Array.isArray(record.tags) ? record.tags.slice(0, 5) : [];
    if (!tags.some((tag) => clean(tag).toLowerCase() === "your business")) tags.unshift("Your business");
    return Object.assign({}, record, {
      isOwnedByViewer: true,
      ownedByViewer: true,
      ownerNotice,
      tags: tags.slice(0, 5)
    });
  });
}

function askEmyViewerContext(payload = {}) {
  const user = payload && payload.user && typeof payload.user === "object" ? payload.user : {};
  return {
    accountRole: clean((payload && payload.accountRole) || user.role),
    currentAccountName: clean(user.name || user.businessName),
    ownedBusinessAliases: Array.from(askEmyOwnedBusinessAliases(payload || {})).slice(0, 12)
  };
}

function askEmyViewerDisplayName(payload = {}) {
  const user = payload && payload.user && typeof payload.user === "object" ? payload.user : {};
  return clean(user.name || user.displayName || user.customerName || payload.customerName || payload.viewerName || user.email || payload.email);
}

function askEmyViewerEmail(payload = {}) {
  const user = payload && payload.user && typeof payload.user === "object" ? payload.user : {};
  return clean(user.email || payload.email || payload.customerEmail || payload.viewerEmail);
}

function askEmyIsViewerSubjectCorrectionQuery(query) {
  const text = askEmyNormalizeIntentText(query);
  if (!text) return false;
  return /\b(?:no|no no|not|wrong|i mean|i said|i asked)\b[\s\S]{0,90}\b(?:honey shop|business|shop|store|company|clip|post|content|product)\b[\s\S]{0,90}\b(?:me|myself|my account|my profile|my customer profile|signed in user|signed in customer)\b/.test(text)
    || /\b(?:no|no no|not|wrong|i mean|i said|i asked)\b[\s\S]{0,90}\b(?:me|myself|my account|my profile|my customer profile|signed in user|signed in customer)\b/.test(text)
    || /\bnot\s+[a-z0-9 '&-]{2,80}\s+me\b/.test(text);
}

function askEmyIsViewerLocationQuery(query, payload = {}) {
  const text = askEmyNormalizeIntentText(query);
  if (!text) return false;
  if (askEmyIsLocationEvidenceQuestion(text)) return false;
  const history = askEmyHistoryText(payload || {}).toLowerCase();
  const asksBusinessCustomers = /\b(?:my|our)\s+customers?\b[\s\S]{0,80}\b(?:from|location|locations|area|areas|map|heatmap|live|based)\b/.test(text)
    || /\bwhere\b[\s\S]{0,80}\b(?:my|our)\s+customers?\b/.test(text);
  if (asksBusinessCustomers) return false;
  const selfCue = /\b(me|my|mine|myself|i|signed in user|signed in customer|customer account|customer profile|as a customer)\b/.test(text);
  const locationCue = /\b(location|address|postcode|where i am|where am i|current location|gps|search area|saved area)\b/.test(text);
  if (selfCue && locationCue) return true;
  return askEmyIsViewerSubjectCorrectionQuery(text) && /\b(location|address|postcode|where i am|where am i|current location|gps|search area|saved area)\b/.test(`${text} ${history}`);
}

function askEmyIsLocationEvidenceQuestion(query) {
  const text = askEmyNormalizeIntentText(query);
  if (!text) return false;
  const asksEvidence = /\b(how do you know|how can you know|why|what proof|what evidence|prove|proof|are they|are these|are those|do they)\b/.test(text);
  const thirdPartySubject = /\b(they|them|these|those|products?|businesses?|shops?|stores?|cards?|results?|listings?)\b/.test(text);
  const locationSubject = /\b(my location|near me|nearby|at my location|in my area|search area|saved area|postcode|radius|location)\b/.test(text);
  return asksEvidence && thirdPartySubject && locationSubject;
}

function askEmyLocationEvidenceAnswer(query, payload = {}, provider = "local-intent") {
  return {
    answer: askEmyFormatReply([
      "I should not claim that from your saved search location alone.",
      askEmyFormatSection("What I can prove", [
        "Your saved Ask EMY location is only the search area.",
        "A product or business is actually near you only if its own saved address, postcode, map pin, or distance data matches that area.",
        "If that location data is missing, I should say the location is missing instead of calling it nearby."
      ])
    ]),
    provider,
    results: []
  };
}

function askEmyIsViewerProfileQuery(query, payload = {}) {
  const text = askEmyNormalizeIntentText(query).replace(/\bi\s+m\b/g, "i am").replace(/\bim\b/g, "am");
  if (!text) return false;
  if (askEmyIsViewerLocationQuery(text, payload || {})) return false;
  if (askEmyIsViewerSubjectCorrectionQuery(text)) return true;
  return /\b(do you know me|know me|know who i am|do you know who i am|who am i|who i am|what do you know about me|tell me about me|tell me about my account|what do you know about my account|my account details|my account information)\b/.test(text)
    || /\b(?:my|me|myself)\b[\s\S]{0,40}\b(?:customer profile|customer account|customer card|signed in account)\b/.test(text);
}

function askEmyViewerProfileWantsDetails(query) {
  const text = askEmyNormalizeIntentText(query).replace(/\bi\s+m\b/g, "i am").replace(/\bim\b/g, "am");
  return /\b(what do you know about me|tell me about me|tell me about my account|what do you know about my account|details?|account info|account information|my account details|my account information|profile info|profile information|email|role|context)\b/.test(text);
}

function askEmyViewerProfileAnswer(query, payload = {}, provider = "local-intent") {
  const name = askEmyViewerDisplayName(payload || {});
  const email = askEmyViewerEmail(payload || {});
  const role = clean(payload.accountRole || payload.viewerRole || payload.user && payload.user.role) || "customer/user";
  const roleText = role && role !== "customer/user" ? role : "customer";
  const wantsDetails = askEmyViewerProfileWantsDetails(query);
  if (!wantsDetails) {
    return {
      answer: name ? `You're ${name}.` : "I can see you're signed in to EMY.",
      provider,
      results: []
    };
  }
  return {
    answer: askEmyFormatReply([
      `${askEmyIsViewerSubjectCorrectionQuery(query) ? "Got it" : "Yes"} - I understand you mean your own signed-in EMY account.`,
      askEmyFormatSection("Your EMY account", [
        name ? `Account name: ${name}` : "Account name: not provided to Ask EMY in this chat context.",
        `Role/context: ${roleText}`,
        /\bemail\b/.test(askEmyNormalizeIntentText(query)) && email ? `Email: ${email}` : ""
      ]),
      "I will not bring in your saved location, radius, or business data unless that is what you ask about."
    ]),
    provider,
    results: []
  };
}

function askEmyViewerLocationAnswer(query, payload = {}, provider = "local-intent") {
  const location = clean(payload.location);
  const radius = askEmyRadiusLabel(payload.radius);
  const locationText = location
    ? `Yes, I can see your saved Ask EMY/customer search location: ${location}${radius ? `, radius ${radius}` : ""}.`
    : "I cannot see a saved customer search location for this chat yet.";
  return {
    answer: askEmyFormatReply([
      locationText,
      "I cannot see your live GPS unless you allow location or save it from the location picker."
    ]),
    provider,
    results: []
  };
}

function askEmyIsMapCapabilityQuery(query) {
  const text = askEmyNormalizeIntentText(query);
  if (!text) return false;
  if (askEmyIsDirectionsQuery(text) || askEmyIsMapAreaQuery(text)) return false;
  return /\b(?:can|could|do|does|will|would)\b[\s\S]{0,50}\b(?:show|make|create|open|display|support|use)\b[\s\S]{0,40}\bmaps?\b/.test(text)
    || /\bwhat\s+maps?\b[\s\S]{0,40}\b(?:can|could|do|does|will|would)\b/.test(text)
    || /^maps?\?$/.test(text);
}

function askEmyMapCapabilityAnswer(payload = {}, provider = "local-intent") {
  return {
    answer: askEmyFormatReply([
      "Yes. Ask EMY can show map cards when EMY has saved location data.",
      askEmyFormatSection("Map types", [
        "Your saved customer/search location.",
        "A business location map when the business has an address or map pin.",
        "Directions to a business when both start and destination are available.",
        "A customer area map for your business when customer location data is connected.",
        "A grouped customer heatmap across your businesses when there is enough privacy-safe data."
      ]),
      askEmyFormatSection("Important", [
        "I should not open directions unless you ask for directions.",
        "Customer maps should be grouped by area, not exact individual home addresses."
      ])
    ]),
    provider,
    results: []
  };
}

function askEmyIsBusinessCustomerGeoQuery(query) {
  const text = askEmyNormalizeIntentText(query);
  if (!text) return false;
  if (askEmyIsViewerLocationQuery(text)) return false;
  return /\b(?:where|map|maps?|location|locations|area|areas|from|based|live|heatmap)\b[\s\S]{0,90}\b(?:my|our)\s+customers?\b/.test(text)
    || /\b(?:my|our)\s+customers?\b[\s\S]{0,90}\b(?:where|map|maps?|location|locations|area|areas|from|based|live|heatmap)\b/.test(text);
}

function askEmyCustomerRegionLabel(row = {}) {
  const city = clean(row.customerCity || row.city || row.town || row.customerTown || row.area || row.customerArea || row.region || row.customerRegion);
  if (city) return city;
  const postcodeSource = clean(row.customerPostcode || row.postcode || row.zip || row.customerZip || row.address || row.customerAddress || row.location || row.customerLocation).toUpperCase();
  const outward = postcodeSource.match(/\b[A-Z]{1,2}\d[A-Z\d]?\b/);
  if (outward) return outward[0];
  const addressBits = postcodeSource.split(",").map((part) => clean(part)).filter(Boolean);
  return addressBits.length > 1 ? addressBits[addressBits.length - 2] : "";
}

function askEmyCustomerGeoAnalyticsAnswer(query, payload = {}, recordsInput = [], provider = "local-intent") {
  const target = askEmyBusinessTargetFromQuery(query, payload || {}, recordsInput) || askEmyBusinessTargetFromOwnedContext(payload || {}, recordsInput);
  if (!target) {
    return {
      answer: askEmyFormatReply([
        "I can check where your customers are from, but I need to know which business to use.",
        askEmyFormatSection("Next step", [
          "Ask for a named business, the current business, or all your businesses."
        ])
      ]),
      provider,
      results: []
    };
  }
  const businessName = clean(target.name) || "your business";
  const rows = askEmyCollectBusinessCustomerRows(payload || {}, target);
  const groups = new Map();
  rows.forEach((row) => {
    const label = askEmyCustomerRegionLabel(row);
    if (!label) return;
    groups.set(label, (groups.get(label) || 0) + 1);
  });
  if (!rows.length) {
    return {
      answer: askEmyFormatReply([
        `I do not see customer relationships for ${businessName} yet.`,
        askEmyFormatSection("Privacy", [
          "When customer location analytics are available, I should show grouped areas only, not exact home addresses."
        ])
      ]),
      provider,
      results: []
    };
  }
  if (!groups.size) {
    return {
      answer: askEmyFormatReply([
        `I can see ${rows.length} customer relationship${rows.length === 1 ? "" : "s"} for ${businessName}, but I do not see saved customer location areas yet.`,
        askEmyFormatSection("Needed for maps", [
          "Customer postcode area, city, or another privacy-safe location field.",
          "Exact home addresses should be aggregated before Ask EMY shows them."
        ])
      ]),
      provider,
      results: []
    };
  }
  const grouped = [];
  let other = 0;
  Array.from(groups.entries()).forEach(([label, count]) => {
    if (count < 3) other += count;
    else grouped.push({ label, count });
  });
  if (other) grouped.push({ label: "Other / grouped for privacy", count: other });
  grouped.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  return {
    answer: askEmyFormatReply([
      `Here is where your customers are from for ${businessName}.`,
      askEmyFormatSection("Customer areas", grouped.map((row) => `${row.label}: ${row.count} customer${row.count === 1 ? "" : "s"}`)),
      askEmyFormatSection("Privacy", [
        "Customer locations are grouped by area.",
        "I should not show individual customer home addresses in Ask EMY."
      ])
    ]),
    provider,
    results: []
  };
}

function askEmyIsActiveRelationshipRow(row, trusted = false) {
  if (!row || typeof row !== "object") return trusted;
  const status = clean([row.status, row.customerStatus, row.relationshipStatus, row.relationship, row.relation].filter(Boolean).join(" ")).toLowerCase();
  if (row.removed === true || row.deleted === true || row.active === false || /\b(removed|deleted|blocked|rejected|declined|cancelled|inactive)\b/.test(status)) return false;
  return trusted || row.active === true || row.following === true || row.connected === true || row.accepted === true || row.approved === true || row.isCustomer === true || row.opened === true || /\b(active|accepted|approved|connected|following|customer|opened)\b/.test(status);
}

function askEmyRelationshipFlagsFromRow(row = {}, source = "") {
  const sourceText = clean(row.relationshipSource || row.source || source).toLowerCase();
  const status = clean([row.status, row.customerStatus, row.relationshipStatus, row.relationship, row.relation].filter(Boolean).join(" ")).toLowerCase();
  const isCustomer = row.isCustomer === true || row.viewerIsCustomer === true || row.customer === true || /\bcustomer\b/.test(sourceText) || /\bcustomer\b/.test(status);
  const follows = row.following === true || row.followed === true || row.viewerFollows === true || /\bfollow(?:ing|ed)?\b/.test(sourceText) || /\bfollow(?:ing|ed)?\b/.test(status);
  return { follows, isCustomer };
}

function askEmyMergeRelationshipFlags(existing = {}, next = {}) {
  return {
    follows: Boolean(existing.follows || next.follows),
    isCustomer: Boolean(existing.isCustomer || next.isCustomer)
  };
}

function askEmyAddBusinessRelationship(map, row, fallbackKey = "", source = "", trusted = false) {
  if (!map || !row) return;
  const value = row && typeof row === "object" ? row : { key: row, businessKey: row, relationshipSource: source };
  if (!askEmyIsActiveRelationshipRow(value, trusted)) return;
  const aliases = new Set();
  askEmyAddBusinessAliases(aliases, value);
  askEmyAddBusinessAliases(aliases, fallbackKey);
  const flags = askEmyRelationshipFlagsFromRow(value, source);
  if (trusted && source === "customer") flags.isCustomer = true;
  if (trusted && source === "following") flags.follows = true;
  if (!flags.follows && !flags.isCustomer) flags.follows = true;
  aliases.forEach((alias) => {
    map.set(alias, askEmyMergeRelationshipFlags(map.get(alias), flags));
  });
}

function askEmyAddBusinessRelationshipRows(map, rows, source = "", trusted = false) {
  if (Array.isArray(rows)) {
    rows.forEach((row, index) => askEmyAddBusinessRelationship(map, row, `${source}-${index}`, source, trusted));
    return;
  }
  if (rows && typeof rows === "object") {
    Object.keys(rows).forEach((key) => askEmyAddBusinessRelationship(map, rows[key], key, source, trusted));
    return;
  }
  if (rows) askEmyAddBusinessRelationship(map, rows, clean(rows), source, trusted);
}

function askEmyBusinessRelationshipMap(payload = {}) {
  const map = new Map();
  askEmyAddBusinessRelationshipRows(map, payload && payload.followedBusinesses, "", true);
  askEmyAddBusinessRelationshipRows(map, payload && payload.followingBusinesses, "following", true);
  askEmyAddBusinessRelationshipRows(map, payload && payload.customerBusinesses, "customer", true);
  askEmyAddBusinessRelationshipRows(map, payload && payload.followedBusinessKeys, "following", true);
  return map;
}

function askEmyRelationshipNotice(flags = {}) {
  if (flags.isCustomer && flags.follows) return "You are a customer of this business and you follow them.";
  if (flags.isCustomer) return "You are a customer of this business.";
  if (flags.follows) return "You follow this business.";
  return "";
}

function askEmyMarkViewerRelationships(records = [], payload = {}) {
  const relationships = askEmyBusinessRelationshipMap(payload || {});
  if (!relationships.size) return Array.isArray(records) ? records : [];
  return (Array.isArray(records) ? records : []).map((record) => {
    const aliases = askEmyRecordBusinessAliases(record);
    let flags = {};
    aliases.forEach((alias) => {
      if (relationships.has(alias)) flags = askEmyMergeRelationshipFlags(flags, relationships.get(alias));
    });
    const relationshipNotice = askEmyRelationshipNotice(flags);
    if (!relationshipNotice) return record;
    const tags = Array.isArray(record.tags) ? record.tags.slice(0, 5) : [];
    if (flags.isCustomer && !tags.some((tag) => clean(tag).toLowerCase() === "customer")) tags.unshift("Customer");
    if (flags.follows && !tags.some((tag) => clean(tag).toLowerCase() === "following")) tags.unshift("Following");
    return Object.assign({}, record, {
      isFollowedByViewer: Boolean(flags.follows),
      followedByViewer: Boolean(flags.follows),
      isCustomerOfViewer: Boolean(flags.isCustomer),
      customerOfViewer: Boolean(flags.isCustomer),
      relationshipNotice,
      tags: tags.slice(0, 5)
    });
  });
}

function askEmyFollowedBusinessAliases(payload) {
  const aliases = new Set();
  [
    payload && payload.followedBusinesses,
    payload && payload.followingBusinesses,
    payload && payload.customerBusinesses,
    payload && payload.followedBusinessKeys
  ].forEach((value) => askEmyAddBusinessAliases(aliases, value));
  return aliases;
}

function askEmyRecordMatchesFollowedBusiness(record, aliases) {
  if (!record || !aliases || !aliases.size) return false;
  const recordAliases = new Set();
  askEmyAddBusinessAliases(recordAliases, [
    record.businessKey,
    record.business,
    record.businessName,
    record.profileKey,
    record.key,
    record.ownerName,
    record.sellerName,
    record.type === "business" ? record.name : ""
  ]);
  for (const key of recordAliases) {
    if (aliases.has(key)) return true;
  }
  return false;
}

function askEmyFilterRecordsForQuery(records, query, payload) {
  const available = Array.isArray(records) ? records : [];
  if (!askEmyIsFollowedBusinessQuery(query)) return available;
  const aliases = askEmyFollowedBusinessAliases(payload || {});
  return available.filter((record) => askEmyRecordMatchesFollowedBusiness(record, aliases));
}

function askEmyStoredValue(value) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}

function askEmyBusinessTargetFromRecord(record) {
  if (!record || typeof record !== "object") return null;
  const type = clean(record.type).toLowerCase();
  const name = clean(type === "business" ? record.name : record.business || record.businessName || record.ownerName || record.sellerName || record.profileName);
  const key = clean(record.businessKey || record.profileKey || record.detailBusinessKey || record.ownerKey || record.sellerKey || (type === "business" ? record.id : ""));
  if (!name && !key) return null;
  const aliases = new Set();
  [
    key,
    name,
    record.business,
    record.businessName,
    record.profileName,
    record.ownerName,
    record.sellerName,
    record.type === "business" ? record.name : ""
  ].forEach((value) => askEmyAddBusinessAliases(aliases, value));
  askEmyDropGenericBusinessAliases(aliases);
  if (!aliases.size) return null;
  return {
    name: name || key || "that business",
    key,
    aliases,
    record
  };
}

function askEmyBusinessTargetMatchesQuery(target, query) {
  if (!target || !target.aliases || !target.aliases.size) return false;
  const text = clean(query).toLowerCase();
  const normalised = askEmyAliasKey(text);
  const names = [
    target.name,
    target.key,
    target.record && target.record.name,
    target.record && target.record.business,
    target.record && target.record.businessName
  ].map(clean).filter(Boolean);
  if (names.some((name) => text.includes(name.toLowerCase()))) return true;
  return Array.from(target.aliases).some((alias) => alias && normalised.includes(alias));
}

function askEmyBusinessTargetFromQuery(query, payload = {}, records = []) {
  const cleanQuery = clean(query);
  const candidates = [];
  const addRecord = (record) => {
    const target = askEmyBusinessTargetFromRecord(record);
    if (target) candidates.push(target);
  };
  (Array.isArray(records) ? records : []).forEach(addRecord);
  const explicit = candidates.find((target) => askEmyBusinessTargetMatchesQuery(target, cleanQuery));
  if (explicit) return explicit;
  const historyCandidates = [];
  askEmyHistoryRows(payload || {}).slice().reverse().forEach((item) => {
    const results = Array.isArray(item && item.results) ? item.results.slice().reverse() : [];
    results.forEach((record) => {
      const target = askEmyBusinessTargetFromRecord(record);
      if (target) historyCandidates.push(target);
    });
  });
  const explicitHistory = historyCandidates.find((target) => askEmyBusinessTargetMatchesQuery(target, cleanQuery));
  if (explicitHistory) return explicitHistory;
  const historyText = askEmyHistoryRows(payload || {}).slice().reverse().map((item) => clean(item && item.text)).filter(Boolean).join(" ");
  const historyTextTarget = historyText ? candidates.find((target) => askEmyBusinessTargetMatchesQuery(target, historyText)) || historyCandidates.find((target) => askEmyBusinessTargetMatchesQuery(target, historyText)) : null;
  if (historyTextTarget) return historyTextTarget;
  const pronoun = /\b(he|his|she|her|they|their|it|its|that|this|those|them|there)\b/.test(cleanQuery.toLowerCase());
  if (pronoun && historyCandidates.length) return historyCandidates[0];
  if (historyCandidates.length) return historyCandidates[0];
  return candidates.find((target) => target && target.record && clean(target.record.type).toLowerCase() === "business") || candidates[0] || null;
}

function askEmyBusinessTargetSharesAliases(target, aliases) {
  if (!target || !target.aliases || !target.aliases.size || !aliases || !aliases.size) return false;
  return Array.from(target.aliases).some((alias) => aliases.has(alias));
}

function askEmyBusinessTargetFromOwnedContext(payload = {}, recordsInput = []) {
  const activeAliases = askEmyActiveOwnedBusinessAliases(payload || {});
  const ownedAliases = activeAliases.size ? activeAliases : askEmyOwnedBusinessAliases(payload || {});
  if (!ownedAliases.size) return null;
  const candidates = [];
  (Array.isArray(recordsInput) ? recordsInput : []).forEach((record) => {
    const target = askEmyBusinessTargetFromRecord(record);
    if (target) candidates.push(target);
  });
  askEmyHistoryRows(payload || {}).slice().reverse().forEach((item) => {
    const results = Array.isArray(item && item.results) ? item.results.slice().reverse() : [];
    results.forEach((record) => {
      const target = askEmyBusinessTargetFromRecord(record);
      if (target) candidates.push(target);
    });
  });
  const matched = candidates.find((target) => askEmyBusinessTargetSharesAliases(target, ownedAliases));
  if (matched) return matched;
  const activeBusiness = (payload && (payload.activeBusiness || payload.selectedBusiness || payload.business || payload.user)) || {};
  const name = clean(
    payload && payload.businessName ||
    activeBusiness.businessName ||
    activeBusiness.business ||
    activeBusiness.name ||
    activeBusiness.displayName ||
    Array.from(ownedAliases)[0] ||
    "your business"
  );
  return { name, aliases: ownedAliases, record: null };
}

function askEmyQueryUsesBusinessContext(query) {
  const text = askEmyNormalizeIntentText(query);
  if (!text) return false;
  return /\b(my business|my shop|my store|my company|my page|my customers?|our customers?|my clients?|our clients?|my products?|my items?|my stock|my listings?|your business|your products?|this business|that business|the business|this shop|that shop|the shop|this store|that store|the store|it|its|they|them|their|those|that|this|he|his|she|her)\b/.test(text);
}

function askEmyBusinessTargetFromFollowUpContext(query, payload = {}, recordsInput = []) {
  const cleanQuery = clean(query);
  const normalizedQuery = askEmyNormalizeIntentText(cleanQuery);
  const records = Array.isArray(recordsInput) ? recordsInput : [];
  const candidates = [];
  records.forEach((record) => {
    const target = askEmyBusinessTargetFromRecord(record);
    if (target) candidates.push(target);
  });
  const explicit = candidates.find((target) => askEmyBusinessTargetMatchesQuery(target, cleanQuery));
  if (explicit) return explicit;
  const historyCandidates = [];
  askEmyHistoryRows(payload || {}).slice().reverse().forEach((item) => {
    const results = Array.isArray(item && item.results) ? item.results.slice().reverse() : [];
    results.forEach((record) => {
      const target = askEmyBusinessTargetFromRecord(record);
      if (target) historyCandidates.push(target);
    });
  });
  const explicitHistory = historyCandidates.find((target) => askEmyBusinessTargetMatchesQuery(target, cleanQuery));
  if (explicitHistory) return explicitHistory;
  const asksOwnedBusiness = /\b(my business|my shop|my store|my company|my page|my customers?|our customers?|my clients?|our clients?|my products?|my items?|my stock|my listings?|your business|your products?)\b/i.test(normalizedQuery);
  const ownedTarget = asksOwnedBusiness ? askEmyBusinessTargetFromOwnedContext(payload || {}, records) : null;
  if (ownedTarget) return ownedTarget;
  const historyText = askEmyHistoryRows(payload || {}).slice().reverse().map((item) => clean(item && item.text)).filter(Boolean).join(" ");
  const historyTextTarget = historyText ? candidates.find((target) => askEmyBusinessTargetMatchesQuery(target, historyText)) || historyCandidates.find((target) => askEmyBusinessTargetMatchesQuery(target, historyText)) : null;
  if (historyTextTarget && askEmyQueryUsesBusinessContext(cleanQuery)) return historyTextTarget;
  if (askEmyQueryUsesBusinessContext(cleanQuery) && historyCandidates.length) return historyCandidates[0];
  return null;
}

function askEmyLooksLikeBusinessCustomerRow(row) {
  if (!row || typeof row !== "object") return false;
  return Boolean(row.customerName || row.customerEmail || row.customerKey || row.customerId || row.customerUid || row.isCustomer || row.customerStatus || row.relationshipStatus || row.customerSince);
}

function askEmyIsActiveBusinessCustomerRow(row = {}) {
  const status = clean([row.status, row.customerStatus, row.relationshipStatus, row.relationship, row.relation].filter(Boolean).join(" ")).toLowerCase();
  if (row.removed === true || row.deleted === true || row.active === false || /\b(removed|deleted|blocked|rejected|declined|cancelled|inactive)\b/.test(status)) return false;
  return row.active !== false && (row.isCustomer !== false || row.connected === true || row.accepted === true || row.approved === true || /\b(active|accepted|approved|connected|customer)\b/.test(status) || !status);
}

function askEmyAddBusinessCustomerRows(rows, value, fallbackBusinessKey = "") {
  const parsed = askEmyStoredValue(value);
  if (!parsed) return;
  if (Array.isArray(parsed)) {
    parsed.forEach((entry) => askEmyAddBusinessCustomerRows(rows, entry, fallbackBusinessKey));
    return;
  }
  if (parsed && typeof parsed === "object") {
    if (askEmyLooksLikeBusinessCustomerRow(parsed)) {
      rows.push(Object.assign({}, parsed, { fallbackBusinessKey }));
      return;
    }
    Object.keys(parsed).forEach((key) => askEmyAddBusinessCustomerRows(rows, parsed[key], fallbackBusinessKey || key));
  }
}

function askEmyBusinessCustomerRowAliases(row = {}) {
  const aliases = new Set();
  [
    row.businessKey,
    row.detailBusinessKey,
    row.profileBusinessKey,
    row.profileKey,
    row.ownerKey,
    row.sellerKey,
    row.businessName,
    row.business,
    row.fallbackBusinessKey
  ].forEach((value) => askEmyAddBusinessAliases(aliases, value));
  return askEmyDropGenericBusinessAliases(aliases);
}

function askEmyBusinessCustomerMatchesTarget(row, target) {
  if (!row || !target || !target.aliases || !target.aliases.size) return false;
  const aliases = askEmyBusinessCustomerRowAliases(row);
  return Array.from(aliases).some((alias) => target.aliases.has(alias));
}

function askEmyCollectBusinessCustomerRows(payload = {}, target = {}) {
  const rows = [];
  askEmyAddBusinessCustomerRows(rows, payload && payload.businessCustomers, "");
  askEmyAddBusinessCustomerRows(rows, payload && payload.customerRelationships, "");
  const seen = new Set();
  return rows
    .filter((row) => askEmyIsActiveBusinessCustomerRow(row) && askEmyBusinessCustomerMatchesTarget(row, target))
    .filter((row) => {
      const customerId = clean(row.customerKey || row.customerId || row.customerUid || row.key || row.id || row.customerEmail || row.email || row.customerName || row.name).toLowerCase();
      const id = customerId;
      if (!customerId || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
}

function askEmyTargetIsOwnedByViewer(target, payload = {}) {
  if (!target || !target.aliases || !target.aliases.size) return false;
  const owned = askEmyOwnedBusinessAliases(payload || {});
  return Array.from(target.aliases).some((alias) => owned.has(alias));
}

function askEmyTargetIsActiveBusinessOwner(target, payload = {}) {
  if (!target || !target.aliases || !target.aliases.size) return false;
  const owned = askEmyActiveOwnedBusinessAliases(payload || {});
  return Array.from(target.aliases).some((alias) => owned.has(alias));
}

function askEmyCustomerStatusLabel(row = {}) {
  const status = clean(row.customerStatus || row.status || row.relationshipStatus);
  if (!status) return "Connected";
  return status.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function askEmyViewerCustomerIdentifiers(payload = {}) {
  const identifiers = new Set();
  const add = (value) => {
    const text = clean(value).toLowerCase();
    if (text) identifiers.add(text);
  };
  const addAccount = (account) => {
    if (!account || typeof account !== "object") return;
    const role = clean(account.role || account.accountRole || account.type).toLowerCase();
    const hasCustomerIdentity = Boolean(account.customerKey || account.customerId || account.key || account.id || account.email || account.customerEmail || account.name);
    if (role && !/\bcustomer\b/.test(role) && !hasCustomerIdentity) return;
    [
      account.customerKey,
      account.customerId,
      account.customerUid,
      account.key,
      account.id,
      account.uid,
      account.email,
      account.customerEmail,
      account.name,
      account.displayName,
      account.customerName
    ].forEach(add);
  };
  addAccount(payload && payload.user);
  addAccount(payload && payload.activeUser);
  if (Array.isArray(payload && payload.accountOptions)) payload.accountOptions.forEach(addAccount);
  if (Array.isArray(payload && payload.accounts)) payload.accounts.forEach(addAccount);
  [
    payload && payload.customerKey,
    payload && payload.customerId,
    payload && payload.customerUid,
    payload && payload.customerEmail,
    payload && payload.customerName,
    payload && payload.emyCustomerEmail,
    payload && payload.emyCustomerDisplayName,
    payload && payload.emySelectedCustomerProfileKey,
    payload && payload.emySelectedCustomerProfileName,
    payload && payload.emySelectedCustomerProfileEmail
  ].forEach(add);
  return identifiers;
}

function askEmyBusinessCustomerMatchesViewer(row = {}, payload = {}) {
  const identifiers = askEmyViewerCustomerIdentifiers(payload || {});
  if (!identifiers.size) return false;
  const rowValues = [
    row.customerKey,
    row.customerId,
    row.customerUid,
    row.key,
    row.id,
    row.uid,
    row.customerEmail,
    row.email,
    row.customerName,
    row.name
  ].map(clean).map((value) => value.toLowerCase()).filter(Boolean);
  return rowValues.some((value) => identifiers.has(value));
}

function askEmyBusinessCustomerMetrics(row = {}) {
  const views = askEmyCountForLabel([
    row.views,
    row.viewCount,
    row.profileViews,
    row.customerViews,
    row.activityViews,
    row.stats,
    row.detailMeta
  ], /views?|viewed|visits?/);
  const likes = askEmyCountForLabel([
    row.likes,
    row.likeCount,
    row.customerLikes,
    row.businessLikes,
    row.countedLikeCount,
    row.stats,
    row.detailMeta
  ], /likes?|liked/);
  const comments = askEmyCountForLabel([
    row.comments,
    row.commentsCount,
    row.commentCount,
    row.customerComments,
    Array.isArray(row.comments) ? row.comments.length : "",
    row.stats,
    row.detailMeta
  ], /comments?|replies?/);
  const saves = askEmyCountForLabel([
    row.saves,
    row.saveCount,
    row.saved,
    row.savedCount,
    row.customerSaves,
    row.stats,
    row.detailMeta
  ], /saved|saves?/);
  const activity = views + likes * 4 + comments * 3 + saves * 3;
  return { views, likes, comments, saves, activity };
}

function askEmyBusinessCustomerName(row = {}, index = 0) {
  const name = askEmyFirstUseful([
    row.customerName,
    row.name,
    row.displayName,
    row.profileName,
    row.customerDisplayName,
    row.userName
  ], 120);
  if (name) return name;
  const email = clean(row.customerEmail || row.email);
  if (email && email.includes("@")) return email.split("@")[0];
  return `Customer ${index + 1}`;
}

function askEmyBusinessCustomerImage(row = {}) {
  return askEmyFirst([
    row.customerImage,
    row.customerImageUrl,
    row.customerPhoto,
    row.customerPhotoUrl,
    row.profileImage,
    row.profileImageUrl,
    row.avatar,
    row.avatarSrc,
    row.photo,
    row.photoUrl,
    row.image,
    row.imageUrl
  ]);
}

function askEmyBusinessCustomerResult(row = {}, index = 0, businessName = "") {
  const name = askEmyBusinessCustomerName(row, index);
  const metrics = askEmyBusinessCustomerMetrics(row);
  const status = askEmyCustomerStatusLabel(row);
  const since = clean(row.customerSince || row.acceptedAt || row.createdAt);
  const image = askEmyBusinessCustomerImage(row);
  const id = clean(row.customerKey || row.customerId || row.customerUid || row.key || row.id || row.customerEmail || row.email || name).slice(0, 120);
  const highlights = [
    { label: "Views", value: `${metrics.views} view${metrics.views === 1 ? "" : "s"}` },
    { label: "Likes", value: `${metrics.likes} like${metrics.likes === 1 ? "" : "s"}` },
    { label: "Activity", value: `${metrics.activity} signal${metrics.activity === 1 ? "" : "s"}` }
  ];
  const facts = [
    { label: "Status", value: status },
    since ? { label: "Customer since", value: askEmyDisplayDate(since) } : null,
    { label: "Comments", value: `${metrics.comments}` },
    { label: "Saves", value: `${metrics.saves}` }
  ].filter(Boolean);
  return {
    id,
    type: "customer-profile",
    name,
    business: businessName,
    desc: businessName ? `Customer relationship for ${businessName}.` : "Business customer relationship.",
    image,
    profileImage: image,
    avatar: image,
    views: metrics.views,
    likes: metrics.likes,
    comments: metrics.comments,
    saves: metrics.saves,
    activity: metrics.activity,
    status,
    date: since,
    tags: ["Customer", status, businessName].filter(Boolean).slice(0, 5),
    viewSpec: {
      kind: "Customer card",
      variant: image ? "identity" : "compact",
      title: name,
      subtitle: businessName ? `Customer of ${businessName}` : "Business customer",
      eyebrow: "Created by Ask EMY",
      actionLabel: "Open",
      badges: ["Customer", status].filter(Boolean),
      highlights,
      facts,
      sections: [{
        title: "Signals",
        items: [
          "Views show attention.",
          "Likes show stronger interest.",
          "This is not checkout or sales data."
        ]
      }],
      media: image ? { src: image, fit: "cover" } : null
    }
  };
}

function askEmyBusinessCustomersAnalyticsPayload(rows = [], businessName = "") {
  const totalRows = Array.isArray(rows) ? rows.length : 0;
  const bars = rows
    .map((row, index) => {
      const metrics = askEmyBusinessCustomerMetrics(row);
      const label = askEmyBusinessCustomerName(row, index);
      const image = askEmyBusinessCustomerImage(row);
      return {
        id: clean(row.customerKey || row.customerId || row.customerUid || row.key || row.id || label),
        label,
        value: metrics.views,
        details: {
          type: "customer-profile",
          name: label,
          business: businessName,
          views: metrics.views,
          likes: metrics.likes,
          comments: metrics.comments,
          saves: metrics.saves,
          activity: metrics.activity,
          status: askEmyCustomerStatusLabel(row),
          image,
          profileImage: image
        }
      };
    })
    .sort((a, b) => (b.value - a.value) || ((b.details.likes || 0) - (a.details.likes || 0)) || a.label.localeCompare(b.label))
    .slice(0, ASK_EMY_CUSTOMER_ANALYTICS_BAR_LIMIT);
  const top = bars[0] || null;
  const topLikes = top && top.details ? Number(top.details.likes) || 0 : 0;
  return {
    answer_type: "analytics_bar_chart",
    title: businessName ? `${businessName} customers by views` : "Customers by views",
    metric: "views",
    summary: top
      ? `${top.label} has the strongest visible customer attention: ${top.value} view${top.value === 1 ? "" : "s"} and ${topLikes} like${topLikes === 1 ? "" : "s"}.`
      : "I do not have customer views to chart yet.",
    bars,
    top_insight: top
      ? `${top.label} is the leading visible customer signal right now. Likes and comments are included as supporting signals.`
      : "No customer activity bars are available yet.",
    next_action: "Use this to decide who to thank, follow up with, invite back, or learn from.",
    data_quality: {
      source: "business_customer_relationships",
      is_estimate: false,
      has_time_series: false,
      total_items: totalRows,
      displayed_items: bars.length,
      warnings: [
        "This compares visible EMY relationship and interaction signals only, not purchases or private contact behaviour.",
        totalRows > bars.length ? `Showing the first ${bars.length} customers in the chart out of ${totalRows}. Ask for the next batch to continue.` : ""
      ].filter(Boolean)
    }
  };
}

function askEmyBusinessCustomersAnswer(query, payload = {}, recordsInput = [], provider = "local-intent") {
  const target = askEmyBusinessTargetFromQuery(query, payload || {}, recordsInput);
  if (!target) {
    return {
      answer: askEmyFormatReply([
        "I can check that, but I need to know which business you mean.",
        askEmyFormatSection("Next step", [
          "Name the business, or open a business card first and ask again."
        ])
      ]),
      provider,
      results: []
    };
  }
  const businessName = clean(target.name) || "that business";
  const rows = askEmyCollectBusinessCustomerRows(payload || {}, target);
  const canViewCustomerDetails = askEmyTargetIsActiveBusinessOwner(target, payload || {});
  const wantsAnalysis = /\b(analy[sz]e|analysis|analytics?|stats?|statistics|views?|likes?|comments?|saves?|rank|compare|activity)\b/i.test(clean(query));
  const viewerRows = rows.filter((row) => askEmyBusinessCustomerMatchesViewer(row, payload || {}));
  const viewerIsCustomer = viewerRows.length > 0;
  const viewerFollows = viewerRows.some((row) => row.following === true || row.followed === true || /\bfollow/i.test(clean([row.status, row.relationshipStatus, row.relationshipSource].filter(Boolean).join(" "))));
  if (!rows.length) {
    return {
      answer: askEmyFormatReply([
        `I do not see customer relationships for ${businessName} yet.`,
        askEmyFormatSection("What I checked", [
          "Customer connections for that business",
          "Accepted business-customer relationships"
        ]),
        askEmyFormatSection("Next step", [
          canViewCustomerDetails
            ? "Open your Customers area or ask customers to connect from the business profile."
            : "The business owner may still have private customer information that is not visible here."
        ])
      ]),
      provider,
      results: []
    };
  }
  const rankedRows = rows
    .slice()
    .sort((a, b) => {
      const aMetrics = askEmyBusinessCustomerMetrics(a);
      const bMetrics = askEmyBusinessCustomerMetrics(b);
      return (bMetrics.views - aMetrics.views)
        || (bMetrics.likes - aMetrics.likes)
        || (bMetrics.comments - aMetrics.comments)
        || askEmyBusinessCustomerName(a).localeCompare(askEmyBusinessCustomerName(b));
    });
  const visibleCustomerRows = canViewCustomerDetails ? rankedRows.slice(0, ASK_EMY_CUSTOMER_CARD_DISPLAY_LIMIT) : [];
  const visibleCustomerLineRows = canViewCustomerDetails ? rankedRows.slice(0, Math.min(8, ASK_EMY_CUSTOMER_CARD_DISPLAY_LIMIT)) : [];
  const hasMoreCustomers = canViewCustomerDetails && rows.length > visibleCustomerRows.length;
  const customerLines = canViewCustomerDetails
    ? visibleCustomerLineRows.flatMap((row, index) => [
        `${index + 1}. ${askEmyBusinessCustomerName(row, index)}`,
        clean(row.customerSince || row.acceptedAt || row.createdAt) ? `- Customer since: ${askEmyDisplayDate(row.customerSince || row.acceptedAt || row.createdAt)}` : "",
        `- Status: ${askEmyCustomerStatusLabel(row)}`,
        `- Views: ${askEmyBusinessCustomerMetrics(row).views}`,
        `- Likes: ${askEmyBusinessCustomerMetrics(row).likes}`
      ].filter(Boolean)).concat(hasMoreCustomers ? [`Showing ${visibleCustomerRows.length} of ${rows.length} customers so the chat stays fast. Ask for more customers to continue.`] : [])
    : rows.length === 1 && viewerIsCustomer
      ? [
          "Customer relationships visible: 1",
          "That visible customer is you.",
          viewerFollows ? `You also follow ${businessName}.` : "",
          "Customer contact details stay private unless you view this from the business owner account."
        ]
    : viewerIsCustomer
      ? [
          `Customer relationships visible: ${rows.length}`,
          "You are one of the customers I can see for this business.",
          viewerFollows ? `You also follow ${businessName}.` : "",
          "Other customer names and contact details stay private to the business owner."
        ]
    : [
        `Customer relationships visible: ${rows.length}`,
        "Names and contact details stay private to the business owner."
      ];
  const results = canViewCustomerDetails ? visibleCustomerRows.map((row, index) => askEmyBusinessCustomerResult(row, index, businessName)) : [];
  const analytics = wantsAnalysis && canViewCustomerDetails ? askEmyBusinessCustomersAnalyticsPayload(rankedRows, businessName) : null;
  return {
    answer: askEmyFormatReply([
      `Yes, ${businessName} has ${rows.length} customer relationship${rows.length === 1 ? "" : "s"} on EMY.`,
      rows.length === 1 && viewerIsCustomer && !canViewCustomerDetails
        ? `You are the only customer I can see for ${businessName} right now.`
        : viewerIsCustomer && !canViewCustomerDetails
          ? "You are one of those customers."
          : canViewCustomerDetails
        ? "You are viewing as this business owner, so I can show the customer details I can see."
        : "I can confirm the relationship count, but private customer details are only visible to the business owner.",
      canViewCustomerDetails && wantsAnalysis
        ? askEmyFormatSection("Analysis", [
            rankedRows[0]
              ? `${askEmyBusinessCustomerName(rankedRows[0], 0)} has the strongest visible signal from views and likes.`
              : "No customer activity signals are saved yet.",
            "Views show attention; likes show stronger interest."
          ])
        : "",
      askEmyFormatSection(canViewCustomerDetails ? "Customers" : "Customer privacy", customerLines)
    ].filter(Boolean)),
    provider,
    results,
    analytics
  };
}

function askEmyBusinessTargetMatchesRecord(target, record) {
  if (!target || !target.aliases || !target.aliases.size || !record) return false;
  const aliases = askEmyRecordBusinessAliases(record);
  if (clean(record.type).toLowerCase() === "business") {
    askEmyAddBusinessAliases(aliases, record.name);
    askEmyAddBusinessAliases(aliases, record.id);
  }
  return Array.from(aliases).some((alias) => target.aliases.has(alias));
}

function askEmyRecordsForBusinessTarget(recordsInput = [], target = {}) {
  return (Array.isArray(recordsInput) ? recordsInput : []).filter((record) => askEmyBusinessTargetMatchesRecord(target, record));
}

function askEmyBusinessLikeCountForTarget(target = {}, payload = {}, recordsInput = []) {
  const aliases = target && target.aliases ? Array.from(target.aliases).map(askEmyAliasKey).filter(Boolean) : [];
  const aliasSet = new Set(aliases);
  const directCounts = (Array.isArray(recordsInput) ? recordsInput : [])
    .filter((record) => askEmyBusinessTargetMatchesRecord(target, record))
    .map((record) => Number(record.businessLikeCount || record.businessLikes || record.likedBusinessCount || record.likeCount || record.likes) || 0);
  let count = Math.max(0, ...directCounts, 0);
  const addPairs = (pairs) => {
    const rows = Array.isArray(pairs) ? pairs : [];
    let pairCount = 0;
    rows.forEach((row) => {
      const businessId = askEmyAliasKey(row && (row.businessId || row.businessKey || row.business || row.name));
      const userId = clean(row && (row.userId || row.uid || row.email || row.customerKey || row.customerEmail));
      if (businessId && userId && aliasSet.has(businessId)) pairCount += 1;
    });
    count = Math.max(count, pairCount);
  };
  const readState = (state) => {
    if (!state || typeof state !== "object") return;
    Object.keys(state).forEach((key) => {
      if (!aliasSet.has(askEmyAliasKey(key))) return;
      const entry = state[key] || {};
      const stateCount = Number(entry.count || entry.likeCount || entry.likes || (Array.isArray(entry.likedBy) ? entry.likedBy.length : 0)) || 0;
      count = Math.max(count, stateCount);
    });
  };
  addPairs(payload && (payload.businessLikePairs || payload.emyBusinessLikePairs));
  readState(payload && (payload.businessLikeState || payload.emyBusinessLikeState));
  return count;
}

function askEmyParseBusinessTime(value) {
  const text = clean(value).toLowerCase().replace(/\./g, "");
  const match = text.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const suffix = match[3] || "";
  if (suffix === "pm" && hour < 12) hour += 12;
  if (suffix === "am" && hour === 12) hour = 0;
  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

function askEmyBusinessHoursIncludesToday(text, now = new Date()) {
  const hours = clean(text).toLowerCase();
  if (!hours) return false;
  if (/\b(every day|daily|today|open today)\b/.test(hours)) return true;
  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const today = dayNames[now.getDay()];
  if (hours.includes(today)) return true;
  const ranges = hours.match(/\b(sun|mon|tue|wed|thu|fri|sat)(?:day)?\s*(?:-|to|until)\s*(sun|mon|tue|wed|thu|fri|sat)(?:day)?\b/g) || [];
  return ranges.some((range) => {
    const parts = range.match(/\b(sun|mon|tue|wed|thu|fri|sat)/g) || [];
    if (parts.length < 2) return false;
    const start = dayNames.indexOf(parts[0]);
    const end = dayNames.indexOf(parts[1]);
    const current = now.getDay();
    return start <= end ? current >= start && current <= end : current >= start || current <= end;
  });
}

function askEmyBusinessOpenStatus(record = {}) {
  const rawStatus = clean([record.openStatus, record.statusText, record.businessStatus, record.status, record.availability].filter(Boolean).join(" ")).toLowerCase();
  const hours = clean(record.openingHours || record.businessHours || record.hours || record.workingHours || record.workingDays || record.openingTimes);
  if (/\b(closed|offline|paused|pause|unavailable)\b/.test(rawStatus)) return { label: "Closed", detail: hours, hours };
  if (/\b(open now|opened|open|available|live|online)\b/.test(rawStatus)) return { label: "Open", detail: hours, hours };
  if (!hours) return { label: "Hours not set", detail: "", hours: "" };
  if (/\bclosed\b/i.test(hours) && !/\bopen\b/i.test(hours)) return { label: "Closed", detail: hours, hours };
  const now = new Date();
  const times = hours.match(/\b\d{1,2}(?::\d{2})?\s*(?:am|pm)?\b/gi) || [];
  if (times.length >= 2 && askEmyBusinessHoursIncludesToday(hours, now)) {
    const start = askEmyParseBusinessTime(times[0]);
    const end = askEmyParseBusinessTime(times[1]);
    if (start !== null && end !== null) {
      const current = now.getHours() * 60 + now.getMinutes();
      const isOpen = end > start ? current >= start && current <= end : current >= start || current <= end;
      return { label: isOpen ? "Open now" : "Closed now", detail: hours, hours };
    }
  }
  if (/\b(open now|open today)\b/i.test(hours)) return { label: "Open now", detail: hours, hours };
  return { label: "Hours listed", detail: hours, hours };
}

function askEmyMapCoordinate(record = {}, keys = []) {
  for (const key of keys) {
    const value = key.split(".").reduce((current, part) => current && current[part], record);
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  return null;
}

function askEmyDirectionsUrl(origin, destination, record = {}) {
  const cleanDestination = clean(destination);
  if (!cleanDestination) return "";
  const params = new URLSearchParams();
  params.set("map", "1");
  const business = clean(record.business || record.name || record.businessName);
  if (business) params.set("business", business);
  if (clean(origin)) params.set("origin", clean(origin));
  params.set("destination", cleanDestination);
  if (record.latitude !== null && record.latitude !== undefined && record.latitude !== "") params.set("lat", String(record.latitude));
  if (record.longitude !== null && record.longitude !== undefined && record.longitude !== "") params.set("lng", String(record.longitude));
  return `emy-customer-search.html?${params.toString()}#business`;
}

function askEmyMapAreaUrl(origin, radius, businesses = [], area = {}) {
  const params = new URLSearchParams();
  params.set("map", "1");
  const cleanOrigin = clean(origin);
  const cleanRadius = clean(radius);
  const businessNames = (Array.isArray(businesses) ? businesses : [])
    .map((record) => clean(record && (record.name || record.business || record.businessName)))
    .filter(Boolean)
    .slice(0, 8);
  params.set("q", cleanOrigin ? `businesses near ${cleanOrigin}` : "businesses near me");
  if (cleanOrigin) params.set("origin", cleanOrigin);
  if (cleanRadius) params.set("radius", cleanRadius);
  if (businessNames.length) params.set("businesses", businessNames.join("|"));
  if (area.latitude !== null && area.latitude !== undefined && area.latitude !== "") params.set("lat", String(area.latitude));
  if (area.longitude !== null && area.longitude !== undefined && area.longitude !== "") params.set("lng", String(area.longitude));
  return `emy-customer-search.html?${params.toString()}#business`;
}

function askEmyDirectionsDestinationFromQuery(query) {
  const text = clean(query);
  if (!text) return "";
  const match = text.match(/\b(?:to|for)\s+(.+?)\s*$/i);
  if (!match) return "";
  const destination = clean(match[1]
    .replace(/\b(?:please|pls|plz|direction|directions|route|map|maps|show|open|take me|navigate)\b/gi, " ")
    .replace(/\?+$/g, ""));
  if (!destination || /^(there|it|that|them|they|those|here)$/i.test(destination)) return "";
  return destination.slice(0, 180);
}

function askEmyBusinessDirectionsDestination(record = {}, target = {}) {
  const latitude = askEmyMapCoordinate(record, ["latitude", "lat", "businessLatitude", "locationLat", "mapLat", "geoLat", "coordinates.lat", "geo.lat", "map.lat"]);
  const longitude = askEmyMapCoordinate(record, ["longitude", "lng", "lon", "businessLongitude", "locationLng", "locationLon", "mapLng", "geoLng", "coordinates.lng", "coordinates.lon", "geo.lng", "map.lng"]);
  const hasCoordinates = latitude !== null && longitude !== null && (Math.abs(latitude) > 0.0001 || Math.abs(longitude) > 0.0001);
  const coordinateText = hasCoordinates ? `${latitude},${longitude}` : "";
  const address = clean(record.address || record.businessAddress || record.location || record.place || record.town || record.city || record.postcode);
  const display = address || coordinateText;
  return {
    query: coordinateText || address,
    display,
    latitude,
    longitude,
    hasExactPin: Boolean(coordinateText),
    businessName: clean(record.name || record.business || target.name) || "that business"
  };
}

function askEmyDirectionsTargetFromTypedDestination(destination, recordsInput = []) {
  const text = clean(destination).toLowerCase();
  if (!text) return null;
  const alias = askEmyAliasKey(text);
  const records = Array.isArray(recordsInput) ? recordsInput : [];
  const directTarget = askEmyBusinessTargetFromQuery(destination, { history: [] }, records);
  if (directTarget && askEmyBusinessTargetMatchesQuery(directTarget, destination)) return directTarget;
  const matchedRecord = records.find((record) => {
    if (!record || clean(record.type).toLowerCase() !== "business") return false;
    const identityFields = [
      record.name,
      record.business,
      record.businessName,
      record.businessKey,
      record.profileKey,
      record.slug,
    ].map(clean).filter(Boolean);
    const exactLocationFields = [
      record.address,
      record.businessAddress,
      record.place,
      record.location,
      record.town,
      record.city,
      record.postcode
    ].map(clean).filter(Boolean);
    const identityMatch = identityFields.some((field) => field.toLowerCase() === text || field.toLowerCase().includes(text) || alias && askEmyAliasKey(field).includes(alias));
    const exactLocationMatch = exactLocationFields.some((field) => field.toLowerCase() === text || alias && askEmyAliasKey(field) === alias);
    return identityMatch || exactLocationMatch;
  });
  return matchedRecord ? askEmyBusinessTargetFromRecord(matchedRecord) : null;
}

function askEmyBusinessMapAreaAnswer(query, payload = {}, recordsInput = [], provider = "local-intent") {
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const origin = clean((payload && payload.location)) || "your Ask EMY search area";
  const radius = clean((payload && payload.radius)) || "5";
  const radiusLabel = /\b(km|mi|mile|miles)\b/i.test(radius) ? radius : `${radius} km`;
  const originLatitude = askEmyMapCoordinate(payload || {}, ["latitude", "lat", "originLatitude", "locationLatitude", "mapLatitude", "gps.latitude", "location.latitude"]);
  const originLongitude = askEmyMapCoordinate(payload || {}, ["longitude", "lng", "lon", "originLongitude", "locationLongitude", "mapLongitude", "gps.longitude", "location.longitude"]);
  const seen = new Set();
  const rankedBusinesses = allRecords
    .filter((record) => clean(record && record.type).toLowerCase() === "business")
    .map((record) => ({ record, score: askEmyScoreRecord(record, `businesses near ${origin}`, "business") }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.record)
    .filter((record) => {
      const key = askEmyVisibleRecordKey(record);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const markedBusinesses = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(rankedBusinesses, payload || {}), payload || {});
  const businessesWithLocation = markedBusinesses.filter((record) => Boolean(askEmyBusinessDirectionsDestination(record).query));
  const missingLocationCount = Math.max(0, markedBusinesses.length - businessesWithLocation.length);
  const businessMarkers = businessesWithLocation.map((record) => {
    const destination = askEmyBusinessDirectionsDestination(record);
    return {
      name: clean(record.name || record.business || record.businessName),
      latitude: destination.latitude,
      longitude: destination.longitude,
      hasExactPin: destination.hasExactPin
    };
  }).filter((marker) => marker.name && marker.latitude !== null && marker.longitude !== null).slice(0, 8);
  const mapUrl = askEmyMapAreaUrl(origin, radius, businessesWithLocation.length ? businessesWithLocation : markedBusinesses, {
    latitude: originLatitude,
    longitude: originLongitude
  });
  const businessNames = markedBusinesses
    .map((record) => clean(record.name || record.business || record.businessName))
    .filter(Boolean)
    .slice(0, 6);
  const mapResult = {
    id: `map-area-${askEmyAliasKey(origin) || "nearby"}`,
    type: "map",
    mapMode: "area",
    name: `Map around ${origin}`,
    business: businessNames.length ? businessNames.join(", ") : "",
    desc: markedBusinesses.length
      ? `Map view for ${origin} with nearby businesses.`
      : `Map view for ${origin}. No nearby businesses are showing inside this radius yet.`,
    origin,
    radius,
    latitude: originLatitude,
    longitude: originLongitude,
    locationLabel: clean((payload && payload.locationLabel)) || origin,
    locationSource: clean(payload && payload.locationSource),
    businessCount: markedBusinesses.length,
    businessesWithLocations: businessesWithLocation.length,
    missingLocationCount,
    businesses: businessNames,
    businessMarkers,
    mapUrl,
    url: mapUrl,
    tags: ["map", "nearby businesses"]
  };
  const answerLines = markedBusinesses.length
    ? [
        `Businesses showing: ${markedBusinesses.length}`,
        `Businesses with a saved address or pin: ${businessesWithLocation.length}`,
        missingLocationCount ? `Need profile location: ${missingLocationCount}` : "All shown businesses have map information."
      ]
    : [
        "Businesses showing: none in this radius yet",
        "Try widening the radius or changing the search location."
      ];
  return {
    answer: askEmyFormatReply([
      markedBusinesses.length
        ? `Yes. I can show your ${origin} map view with nearby businesses.`
        : `Yes. I can show your ${origin} map view, but I do not see nearby businesses inside ${radiusLabel} yet.`,
      askEmyFormatSection("Map view", [
        `Location: ${origin}`,
        `Radius: ${radiusLabel}`,
        ...answerLines
      ]),
      askEmyFormatSection("How to use it", [
        "I am showing the map preview here in Ask EMY first.",
        "Use the full EMY map button only if you want GPS tools, expand map, or turn-by-turn directions.",
        "Then choose a business card or marker if you want directions to one place."
      ])
    ]),
    provider,
    results: [mapResult, ...markedBusinesses.slice(0, 4)]
  };
}

function askEmyBusinessDirectionsAnswer(query, payload = {}, recordsInput = [], provider = "local-intent") {
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const origin = clean(payload && payload.location) || "your Ask EMY search area";
  const typedDestination = askEmyDirectionsDestinationFromQuery(query);
  const typedTarget = typedDestination ? askEmyDirectionsTargetFromTypedDestination(typedDestination, allRecords) : null;
  if (typedDestination && !typedTarget) {
    return {
      answer: askEmyFormatReply([
        `I cannot create directions to ${typedDestination} from EMY Maps yet.`,
        askEmyFormatSection("Why", [
          `I do not see ${typedDestination} as a saved EMY business, customer saved place, or business map pin.`,
          "I should not invent a route just because a place name was typed."
        ]),
        askEmyFormatSection("Next step", [
          "Choose a business that has a saved address or map pin on EMY.",
          "If this destination should exist in EMY Maps, add it as a saved place or business location first."
        ]),
        ...askEmyNoResultSuggestionSections("directions", [], payload || {}, query, allRecords)
      ]),
      provider,
      results: []
    };
  }
  const target = typedTarget || askEmyBusinessTargetFromQuery(query, payload || {}, allRecords);
  if (!target) {
    return {
      answer: askEmyFormatReply([
        "I can show directions, but I need to know where you want to go.",
        askEmyFormatSection("Try this", [
          "Name the business, or open a business card first and ask: how do I get there?",
          "You can also ask: map directions to HONEY SHOP."
        ])
      ]),
      provider,
      results: []
    };
  }
  const related = askEmyRecordsForBusinessTarget(allRecords, target);
  const profile = related.find((record) => clean(record.type).toLowerCase() === "business") || target.record || {};
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer([profile], payload || {}), payload || {});
  const business = marked[0] || profile;
  const businessName = clean(business.name || target.name || business.business) || "that business";
  const destination = askEmyBusinessDirectionsDestination(business, target);
  const openStatus = askEmyBusinessOpenStatus(business);
  const businessLikeCount = askEmyBusinessLikeCountForTarget(target, payload || {}, [business, ...related]);
  if (!destination.query) {
    return {
      answer: askEmyFormatReply([
        `Yes, I know you mean ${businessName}.`,
        "I can show a map card, but I cannot give reliable directions yet because this business profile does not have a saved address or map pin.",
        askEmyFormatSection("What is missing", [
          "Destination: not added on the business profile yet",
          `Start: ${origin}`,
          `Business status: ${openStatus.label}${openStatus.detail ? ` - ${openStatus.detail}` : ""}`
        ]),
        askEmyFormatSection("Next step", [
          business.isOwnedByViewer
            ? "Add the business address or map pin on the business profile, then Ask EMY can open directions properly."
            : "Open the business profile or message the business to confirm the location before travelling."
        ])
      ]),
      provider,
      results: [Object.assign({}, business, {
        id: `directions-${askEmyAliasKey(businessName) || "business"}`,
        type: "map",
        name: `Directions to ${businessName}`,
        business: businessName,
        desc: "This business profile needs an address or map pin before directions can be opened.",
        origin,
        destination: "",
        openStatus: openStatus.label,
        openStatusDetail: openStatus.detail,
        openingHours: business.openingHours || openStatus.hours,
        businessLikeCount,
        mapUnavailable: true,
        url: "",
        tags: ["map", "location needed"]
      })]
    };
  }
  const mapUrl = askEmyDirectionsUrl(origin, destination.query, {
    name: businessName,
    business: businessName,
    latitude: destination.latitude,
    longitude: destination.longitude
  });
  return {
    answer: askEmyFormatReply([
      `Yes, I know you mean ${businessName}.`,
      `I can show directions from ${origin} to ${businessName}.`,
      askEmyFormatSection("Route summary", [
        `Start: ${origin}`,
        `Destination: ${destination.display}`,
        `Business status: ${openStatus.label}${openStatus.detail ? ` - ${openStatus.detail}` : ""}`,
        destination.hasExactPin ? "Map pin: exact saved pin available" : "Map pin: using the saved business address",
        "Live route options: open the EMY map card for walking, driving, public transport, or nearby search options."
      ]),
      askEmyFormatSection("Next step", [
        "Open the EMY map card below to choose your route.",
        "If you want walking, driving, or public transport specifically, tell me and I will frame the route that way."
      ])
    ]),
    provider,
    results: [Object.assign({}, business, {
      id: `directions-${askEmyAliasKey(businessName) || "business"}`,
      type: "map",
      name: `Directions to ${businessName}`,
      business: businessName,
      place: destination.display,
      address: destination.display,
      desc: `Route from ${origin} to ${businessName}.`,
      origin,
      destination: destination.display,
      latitude: destination.latitude,
      longitude: destination.longitude,
      mapUrl,
      directionsUrl: mapUrl,
      url: mapUrl,
      openStatus: openStatus.label,
      openStatusDetail: openStatus.detail,
      openingHours: business.openingHours || openStatus.hours,
      businessLikeCount,
      tags: ["map", "directions"]
    })]
  };
}

function askEmyBusinessQualityAnswer(query, payload = {}, recordsInput = [], provider = "local-intent") {
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const target = askEmyBusinessTargetFromQuery(query, payload || {}, allRecords);
  if (!target) {
    return {
      answer: askEmyFormatReply([
        "I can help you judge a business, but I need to know which one you mean.",
        askEmyFormatSection("Next step", [
          "Name the business, or open a business card first and ask again."
        ])
      ]),
      provider,
      results: []
    };
  }
  const related = askEmyRecordsForBusinessTarget(allRecords, target);
  const profile = related.find((record) => clean(record.type).toLowerCase() === "business") || target.record || {};
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer([profile], payload || {}), payload || {});
  const business = marked[0] || profile;
  const businessName = clean(business.name || target.name || business.business) || "that business";
  const description = clean(business.businessDescription || business.desc);
  const offer = clean(business.businessOffer);
  const products = related.filter((record) => clean(record.type).toLowerCase() === "product");
  const jobs = related.filter((record) => clean(record.type).toLowerCase() === "job");
  const posts = related.filter((record) => ["post", "article"].includes(clean(record.type).toLowerCase()));
  const clips = related.filter((record) => clean(record.type).toLowerCase() === "clip");
  const customerCount = askEmyCollectBusinessCustomerRows(payload || {}, target).length;
  const views = related.reduce((total, record) => total + (Number(record.viewCount || record.views) || 0), 0);
  const likes = related.reduce((total, record) => total + (Number(record.likeCount || record.likes) || 0), 0);
  const businessLikeCount = askEmyBusinessLikeCountForTarget(target, payload || {}, [business, ...related]);
  const openStatus = askEmyBusinessOpenStatus(business);
  const enrichedBusiness = Object.assign({}, business, {
    businessLikeCount,
    openStatus: openStatus.label,
    openStatusDetail: openStatus.detail,
    openingHours: business.openingHours || openStatus.hours
  });
  const signals = [
    description ? `Profile description: ${description}` : "Profile description: not added yet.",
    offer ? `What they offer: ${offer}` : "",
    `Open status: ${openStatus.label}${openStatus.detail ? ` - ${openStatus.detail}` : ""}.`,
    `Business profile likes: ${businessLikeCount}.`,
    `EMY activity: ${products.length} product${products.length === 1 ? "" : "s"}, ${jobs.length} job post${jobs.length === 1 ? "" : "s"}, ${posts.length} post${posts.length === 1 ? "" : "s"}, ${clips.length} clip${clips.length === 1 ? "" : "s"}.`,
    views || likes ? `Engagement I can see: ${views} view${views === 1 ? "" : "s"} and ${likes} like${likes === 1 ? "" : "s"}.` : "",
    customerCount ? `Customer relationships I can see: ${customerCount}.` : "Customer relationships I can see: none yet.",
    business.relationshipNotice ? `Your relationship: ${business.relationshipNotice}` : "",
    business.isOwnedByViewer ? `Ownership: ${business.ownerNotice || "This is your business."}` : ""
  ].filter(Boolean);
  const caution = /\b(fake|legit|real|safe|trustworthy|trusted)\b/i.test(query)
    ? "I cannot confirm authenticity or safety unless EMY has an explicit verification or review signal for that business."
    : "I cannot honestly say they are a good business from EMY alone unless there are reviews, ratings, or stronger trust signals.";
  return {
    answer: askEmyFormatReply([
      `Yes, I know you mean ${businessName}.`,
      caution,
      askEmyFormatSection("What I can see", signals),
      askEmyFormatSection("How I would judge it", [
        "Check their profile description and what they say they offer.",
        "Open their recent products, posts, and clips to see if the business looks active.",
        "Message them on EMY if you need confirmation before enquiring, applying, or visiting."
      ])
    ]),
    provider,
    results: clean(enrichedBusiness.type).toLowerCase() === "business" ? [enrichedBusiness] : []
  };
}

const ASK_EMY_SPECIFIC_QUERY_STOP_WORDS = new Set([
  "a", "all", "an", "and", "any", "are", "area", "around", "article", "articles", "available", "be", "business", "businesses", "buy", "can",
  "clip", "clips", "close", "compare", "compared", "comparing", "comparison", "cost", "do", "does", "event", "events", "find", "follow", "followed", "following", "for", "from", "get", "give", "has", "have", "here",
  "good", "in", "is", "list", "local", "me", "my", "mine", "near", "nearby", "new", "of", "ok", "okay", "only", "open", "own", "owned", "price", "prices", "please", "pls", "product",
  "products", "post", "posts", "job", "jobs", "hiring", "hire", "look", "looking", "need", "needed", "needing", "needs", "require", "required", "requires", "request", "role", "roles", "said", "saved", "search", "see", "service", "services", "selling", "sells", "sell", "shop", "shops", "show", "stock",
  "one", "store", "stores", "tell", "that", "the", "they", "them", "their", "there", "to", "two", "under", "over", "less", "more", "versus", "vs", "want", "what", "which", "who", "with",
  "within", "yeah", "yep", "yes", "you", "your", "yup"
]);

function askEmyExplicitProductNameTerms(query) {
  const text = clean(query).toLowerCase();
  const terms = [];
  const addPhrase = (value) => {
    const clipped = clean(value)
      .toLowerCase()
      .split(/\b(?:near|nearby|within|under|over|from|by|in|at|around|available|please|pls|now|today)\b/i)[0]
      .trim();
    clipped.split(/[^a-z0-9]+/).forEach((word) => {
      if (word.length > 1 && !["product", "products", "item", "items", "listing", "listings", "called", "named", "titled"].includes(word)) terms.push(word);
    });
  };
  text.replace(/["“”'‘’]([^"“”'‘’]{2,80})["“”'‘’]/g, (_, phrase) => {
    addPhrase(phrase);
    return "";
  });
  text.replace(/\b(?:product|item|listing)\s+(?:called|named|titled)\s+([a-z0-9][a-z0-9 '&-]{0,80})/g, (_, phrase) => {
    addPhrase(phrase);
    return "";
  });
  text.replace(/\b(?:show|find|search|open|get)\s+(?:me\s+)?(?:the\s+)?(?:product|item|listing)\s+([a-z0-9][a-z0-9-]{1,40})\s*$/g, (_, phrase) => {
    addPhrase(phrase);
    return "";
  });
  return terms.filter((term, index, list) => list.indexOf(term) === index);
}

function askEmySpecificQueryTerms(query) {
  const explicitTerms = askEmyExplicitProductNameTerms(query);
  const queryWithoutLocationTokens = clean(query)
    .replace(/\b[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}\b/gi, " ")
    .replace(/\b(?:near|nearby|around|within|close to)\s+(?:me|here|this area|my area|my location|saved area|saved location)\b/gi, " ");
  const genericTerms = askEmyNormalizeIntentText(queryWithoutLocationTokens)
    .replace(/[£$]\d+(?:\.\d+)?/g, " ")
    .split(/[^a-z0-9]+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2 && !ASK_EMY_SPECIFIC_QUERY_STOP_WORDS.has(word))
    .filter((word, index, list) => list.indexOf(word) === index);
  return explicitTerms.concat(genericTerms).filter((word, index, list) => list.indexOf(word) === index);
}

function askEmyTermVariants(term) {
  const variants = new Set([term]);
  if (term.endsWith("ies") && term.length > 4) variants.add(`${term.slice(0, -3)}y`);
  if (term.endsWith("oes") && term.length > 4) variants.add(term.slice(0, -2));
  if (term.endsWith("es") && term.length > 4) variants.add(term.slice(0, -2));
  if (term.endsWith("s") && term.length > 3) variants.add(term.slice(0, -1));
  return Array.from(variants);
}

function askEmyRecordSearchText(record) {
  return [
    record && record.name,
    record && record.business,
    record && record.place,
    record && record.desc,
    record && record.category,
    record && record.availability,
    record && record.jobTitle,
    record && record.jobLocation,
    record && record.notes,
    ...(record && Array.isArray(record.tags) ? record.tags : [])
  ].map(clean).join(" ").toLowerCase();
}

function askEmyRecordMatchesSpecificTerms(record, terms = []) {
  if (!terms.length) return true;
  const haystack = askEmyRecordSearchText(record);
  return terms.every((term) => askEmyTermVariants(term).some((variant) => haystack.includes(variant)));
}

function askEmyFilterSpecificQueryMatches(records, query) {
  const terms = askEmySpecificQueryTerms(query);
  if (!terms.length) return Array.isArray(records) ? records : [];
  return (Array.isArray(records) ? records : []).filter((record) => askEmyRecordMatchesSpecificTerms(record, terms));
}

function askEmyVisibleRecordMatchesType(record, type) {
  if (!record || record.type !== type) return false;
  if (type !== "business") return true;
  const key = askEmyVisibleRecordKey(record);
  if (!askEmyRecordHasContentSignals(record, key)) return true;
  return askEmyRecordLooksLikeBusinessProfile(record, key);
}

function askEmySelectVisibleResults(records, query, intent, limit = 4, requestedTypesOverride = null) {
  const scopedRecords = askEmyFilterSpecificQueryMatches(records, query);
  const ranked = askEmyDedupeVisibleRecords(scopedRecords
    .map((record) => ({ record, score: askEmyScoreRecord(record, query, intent) }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.record));
  const requestedTypes = Array.isArray(requestedTypesOverride) && requestedTypesOverride.length ? requestedTypesOverride : askEmyRequestedTypes(query);
  if (requestedTypes.length > 1) {
    const picked = [];
    const seen = new Set();
    const add = (record) => {
      if (!record || !requestedTypes.some((type) => askEmyVisibleRecordMatchesType(record, type))) return;
      const key = askEmyVisibleRecordKey(record);
      if (seen.has(key)) return;
      seen.add(key);
      picked.push(record);
    };
    requestedTypes.forEach((type) => add(ranked.find((record) => askEmyVisibleRecordMatchesType(record, type))));
    ranked.forEach(add);
    return picked.slice(0, limit);
  }
  const exact = ranked.filter((record) => askEmyVisibleRecordMatchesType(record, intent));
  const fuzzy = ranked.filter((record) => askEmyScoreRecord(record, query, intent) > 0);
  const specificIntent = ["service", "product", "job", "event", "business", "clip", "article", "post"].includes(intent);
  return (exact.length ? exact : specificIntent ? [] : fuzzy.length ? fuzzy : []).slice(0, limit);
}

function askEmyResultLimitForIntent(intent, requestedTypes = []) {
  if (Array.isArray(requestedTypes) && requestedTypes.length > 1) return 6;
  if (intent === "product") return 8;
  if (intent === "job") return 6;
  return 4;
}

function askEmyIsBroadProductQuery(query, intent, requestedTypes = []) {
  const wantsProducts = intent === "product" || (Array.isArray(requestedTypes) && requestedTypes.includes("product"));
  if (!wantsProducts) return false;
  const text = clean(query).toLowerCase();
  if (!text) return true;
  if (askEmySpecificQueryTerms(text).length) return false;
  if (/[£$]\s*\d|\b(?:under|over|less than|more than|below|above|between)\b.*\d|\b\d+\s*(?:gbp|pounds?|quid|dollars?)\b/.test(text)) return false;
  return true;
}

function askEmyIsProductComparisonQuery(query, intent, requestedTypes = []) {
  const wantsProducts = intent === "product" || (Array.isArray(requestedTypes) && requestedTypes.includes("product"));
  if (!wantsProducts) return false;
  return /\b(compare|compared|comparing|comparison|versus|vs|difference|different)\b/i.test(askEmyText(query, 500));
}

function askEmyResultNoun(intent, requestedTypes = [], count = 0) {
  if (Array.isArray(requestedTypes) && requestedTypes.length > 1) {
    const labels = requestedTypes.map((type) => type === "business" ? "business" : type === "product" ? "product" : type).join(" and ");
    return `${labels} result${count === 1 ? "" : "s"}`;
  }
  const labels = {
    business: "business",
    product: "product",
    job: "job post",
    event: "event",
    service: "service provider",
    clip: "clip",
    article: "article",
    post: "post"
  };
  const label = labels[intent] || "result";
  if (intent === "business") return count === 1 ? "business" : "businesses";
  return `${label}${count === 1 ? "" : "s"}`;
}

function askEmyIsProductDemandQuestion(query) {
  const text = askEmyNormalizeIntentText(query);
  if (!text) return false;
  const directDemandPhrase = /\b(best[-\s]?selling|top[-\s]?selling|most[-\s]?(?:bought|purchased|ordered|popular|liked|saved|views?|viewed|visits?)|highest[-\s]?(?:selling|sales|orders?|demand|views?|viewed))\b/.test(text);
  const asksWhatSells = /\bwhat\b[\s\S]{0,60}\b(sells|selling|sold|buy|buys|bought|purchase|purchased|order|ordered)\b/.test(text);
  const wantsProduct = /\b(product|products|item|items|goods|stock)\b/.test(text) || directDemandPhrase || asksWhatSells;
  const asksPeopleBuy = /\b(people|customers|customer|buyers|buyer|locals|users)\b[\s\S]{0,60}\b(buy|bought|buying|purchase|purchased|order|ordered|orders)\b/.test(text);
  const asksRankedDemand = /\b(most|top|best|highest|popular|rank|ranking|ranked)\b[\s\S]{0,60}\b(buy|bought|buying|purchase|purchased|ordered|orders|sales|selling|sold|liked|saved|views?|viewed|visits?|engagement|performance|interest|demand)\b/.test(text)
    || directDemandPhrase;
  const asksProductChart = /\b(compare|comparison|chart|graph|bars?|rank|ranking|top|best)\b[\s\S]{0,80}\b(products?|items?|listings?|stock)\b/.test(text)
    || /\b(products?|items?|listings?|stock)\b[\s\S]{0,80}\b(compare|comparison|chart|graph|bars?|rank|ranking|top|best)\b/.test(text);
  return wantsProduct && (asksPeopleBuy || asksRankedDemand || asksWhatSells || asksProductChart);
}

function askEmyMetricNumber(value) {
  if (value === undefined || value === null || value === "") return 0;
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, value);
  if (Array.isArray(value)) return value.length;
  if (typeof value === "object") {
    return Math.max(
      askEmyMetricNumber(value.count),
      askEmyMetricNumber(value.total),
      askEmyMetricNumber(value.value),
      askEmyMetricNumber(value.length)
    );
  }
  const text = clean(value);
  if (!text) return 0;
  const labelled = text.match(/(\d[\d,]*)\s*(?:orders?|purchases?|bought|sales?|sold|likes?|saved|saves?|views?|comments?|replies?)/i);
  if (labelled) return Math.max(0, Number(labelled[1].replace(/,/g, "")) || 0);
  if (/^\d[\d,]*$/.test(text)) return Math.max(0, Number(text.replace(/,/g, "")) || 0);
  return 0;
}

function askEmyMetricFromRecord(record = {}, keys = []) {
  return keys.reduce((best, key) => Math.max(best, askEmyMetricNumber(record && record[key])), 0);
}

function askEmyProductActionScore(record = {}) {
  return askEmyMetricFromRecord(record, [
    "enquiryCount",
    "enquiries",
    "inquiryCount",
    "inquiries",
    "messageCount",
    "messages",
    "contactCount",
    "contacts",
    "leadCount",
    "leads",
    "customerInterestCount",
    "customerInterests",
    "directionCount",
    "directions"
  ]);
}

function askEmyProductActivityScore(record = {}) {
  const likes = askEmyMetricFromRecord(record, ["likeCount", "likes", "likedCount"]);
  const saves = askEmyMetricFromRecord(record, ["saveCount", "saved", "saves", "savedCount"]);
  const views = askEmyMetricFromRecord(record, ["viewCount", "views", "productViews", "visitCount"]);
  const comments = askEmyMetricFromRecord(record, ["commentCount", "comments", "commentsCount", "replies"]);
  const stockBoost = /\b(in stock|available|live)\b/i.test(clean(record.availability)) ? 3 : 0;
  const mediaBoost = record.image || record.coverImage || record.video ? 2 : 0;
  return likes * 20 + saves * 16 + comments * 8 + views + stockBoost + mediaBoost;
}

function askEmyProductDemandSignalText(record = {}, hasActionData = false) {
  const actionScore = askEmyProductActionScore(record);
  if (hasActionData && actionScore > 0) return `${actionScore} enquiry/contact signal${actionScore === 1 ? "" : "s"}`;
  const likes = askEmyMetricFromRecord(record, ["likeCount", "likes", "likedCount"]);
  const saves = askEmyMetricFromRecord(record, ["saveCount", "saved", "saves", "savedCount"]);
  const views = askEmyMetricFromRecord(record, ["viewCount", "views", "productViews", "visitCount"]);
  const comments = askEmyMetricFromRecord(record, ["commentCount", "comments", "commentsCount", "replies"]);
  const parts = [
    likes ? `${likes} like${likes === 1 ? "" : "s"}` : "",
    saves ? `${saves} save${saves === 1 ? "" : "s"}` : "",
    views ? `${views} view${views === 1 ? "" : "s"}` : "",
    comments ? `${comments} comment${comments === 1 ? "" : "s"}` : ""
  ].filter(Boolean);
  return parts.length ? parts.join(", ") : "No saved demand signals yet";
}

function askEmyProductMetricFromQuestion(query) {
  const text = askEmyNormalizeIntentText(query);
  if (/\b(likes?|liked)\b/.test(text)) return "likes";
  if (/\b(saves?|saved)\b/.test(text)) return "saves";
  if (/\b(comments?|replies)\b/.test(text)) return "comments";
  if (/\b(engagement|interest|popular)\b/.test(text)) return "engagement";
  return "views";
}

function askEmyProductMetricLabel(metric) {
  if (metric === "likes") return "Likes";
  if (metric === "saves") return "Saves";
  if (metric === "comments") return "Comments";
  if (metric === "engagement") return "Engagement score";
  return "Views";
}

function askEmyProductMetricCount(record = {}, metric = "views") {
  if (metric === "likes") return askEmyMetricFromRecord(record, ["likeCount", "likes", "likedCount"]);
  if (metric === "saves") return askEmyMetricFromRecord(record, ["saveCount", "saved", "saves", "savedCount"]);
  if (metric === "comments") return askEmyMetricFromRecord(record, ["commentCount", "comments", "commentsCount", "replies"]);
  if (metric === "engagement") return askEmyProductActivityScore(record);
  return askEmyMetricFromRecord(record, ["viewCount", "views", "productViews", "visitCount"]);
}

function askEmyProductMetricUnit(metric = "views", value = 2) {
  if (metric === "likes") return Number(value) === 1 ? "like" : "likes";
  if (metric === "saves") return Number(value) === 1 ? "save" : "saves";
  if (metric === "comments") return Number(value) === 1 ? "comment" : "comments";
  if (metric === "engagement") return "engagement";
  return Number(value) === 1 ? "view" : "views";
}

function askEmyProductMetricTitle(metric = "views", plural = true) {
  const noun = plural ? "products" : "product";
  if (metric === "likes") return `Most liked ${noun}`;
  if (metric === "saves") return `Most saved ${noun}`;
  if (metric === "comments") return `Most commented ${noun}`;
  if (metric === "engagement") return plural ? "Strongest products by interest" : "Strongest product by interest";
  return `Most viewed ${noun}`;
}

function askEmyProductLimitFromQuery(query, fallback = 8) {
  const text = askEmyNormalizeIntentText(query);
  const match = text.match(/\b(?:top|first|show|list|rank)\s+(\d{1,2})\b/) || text.match(/\b(\d{1,2})\s+(?:products|items|listings)\b/);
  const value = match ? Number(match[1]) : fallback;
  if (!Number.isFinite(value)) return fallback;
  return Math.max(1, Math.min(10, Math.round(value)));
}

function askEmyShortChartLabel(value, max = 34) {
  const text = clean(value) || "Product";
  return text.length > max ? `${text.slice(0, max - 1).trim()}...` : text;
}

function buildTextBars(items, metric = "views", labelField = "name") {
  const rows = (Array.isArray(items) ? items : []).map((item) => {
    const value = Math.max(0, askEmyMetricNumber(item && (item.value ?? item[metric])));
    return {
      ...item,
      label: askEmyShortChartLabel(item && (item.label || item[labelField] || item.name || item.title)),
      value
    };
  });
  const max = rows.reduce((best, row) => Math.max(best, row.value), 0);
  return rows.map((row) => {
    const filled = max > 0 ? Math.max(row.value > 0 ? 1 : 0, Math.round((row.value / max) * 10)) : 0;
    return {
      ...row,
      metric,
      unit: askEmyProductMetricUnit(metric, row.value),
      bar: `${"█".repeat(filled)}${"░".repeat(Math.max(0, 10 - filled))}`
    };
  });
}

function askEmyProductAnalyticsItem(record = {}, metric = "views") {
  const value = askEmyProductMetricCount(record, metric);
  const productId = clean(record.id || record.key || record.productId || record.itemId);
  const productLabel = clean(record.productName || record.productTitle || record.name) || "Product";
  return {
    product_id: productId,
    id: productId,
    type: "product",
    name: productLabel,
    productName: productLabel,
    label: productLabel,
    value,
    price: clean(record.price),
    currency: clean(record.currency) || (clean(record.price).includes("£") ? "GBP" : ""),
    business: clean(record.business || record.businessName || record.ownerName),
    businessKey: clean(record.businessKey || record.profileKey || record.ownerKey),
    category: clean(record.category || record.productCategory),
    availability: clean(record.availability || record.stockStatus || record.statusText),
    image: clean(record.image || record.imageUrl || record.photo || record.photoUrl || record.thumbnail || record.thumbnailUrl),
    imageRef: clean(record.imageRef || record.mediaRef || record.photoRef || record.thumbnailRef),
    mediaRef: clean(record.mediaRef || record.imageRef || record.photoRef),
    video: clean(record.video || record.videoUrl || record.videoSrc || record.clipUrl || record.clipSrc),
    videoRef: clean(record.videoRef || record.clipRef || record.mediaRef),
    url: clean(record.url || record.link || record.href || record.productUrl || record.detailUrl),
    views: askEmyProductMetricCount(record, "views"),
    likes: askEmyProductMetricCount(record, "likes"),
    comments: askEmyProductMetricCount(record, "comments"),
    saves: askEmyProductMetricCount(record, "saves")
  };
}

function askEmyProductAnalyticsBars(records = [], metric = "views") {
  return buildTextBars((Array.isArray(records) ? records : []).map((record) => askEmyProductAnalyticsItem(record, metric)), metric, "label");
}

function askEmyProductChartLines(bars = [], metric = "views") {
  return (Array.isArray(bars) ? bars : []).map((row) => `${row.label}: ${row.value} ${askEmyProductMetricUnit(metric, row.value)}`);
}

function askEmyProductTextBarLines(bars = [], metric = "views") {
  return (Array.isArray(bars) ? bars : []).map((row) => `${row.label.padEnd(24, " ")} ${row.bar} ${row.value} ${askEmyProductMetricUnit(metric, row.value)}`);
}

function askEmyProductDetailsLines(item = {}) {
  return [
    item.price ? `Price: ${item.price}` : "",
    `Views: ${Number(item.views) || 0}`,
    `Likes: ${Number(item.likes) || 0}`,
    `Comments: ${Number(item.comments) || 0}`,
    `Saves: ${Number(item.saves) || 0}`
  ].filter(Boolean);
}

function askEmyProductTopInsight(bars = [], metric = "views") {
  const top = bars[0];
  const second = bars[1];
  if (!top) return "I do not have product analytics rows to compare yet.";
  const unit = askEmyProductMetricUnit(metric, top.value);
  if (!second) {
    if (top.value <= 0) return `${top.label} is the product I can see, but it has no saved ${askEmyProductMetricUnit(metric, 2)} yet.`;
    return `${top.label} is leading with ${top.value} ${unit}.`;
  }
  const gap = Math.max(0, top.value - second.value);
  if (top.value <= 0) return "The products are visible, but I do not see saved metric activity on them yet.";
  if (gap === 0) return `${top.label} is tied with ${second.label} at ${top.value} ${unit}.`;
  return `${top.label} is leading, and ${second.label} is ${gap} ${askEmyProductMetricUnit(metric, gap)} behind.`;
}

function askEmyProductNextAction(metric = "views") {
  if (metric === "likes" || metric === "saves") return "Use the products people react to most in posts, clips, and profile highlights so interest becomes enquiries.";
  if (metric === "comments") return "Open the product comments, answer the strongest questions, and turn repeated questions into clearer product details.";
  if (metric === "engagement") return "Put the strongest product first and make the next action clear: message, enquire, follow, or visit.";
  return "Improve the product photo, description, price clarity, and enquiry step so views can become customer action.";
}

function askEmyProductAnalyticsPayload(title, metric, bars = []) {
  const top = bars[0] || null;
  return {
    answer_type: "analytics_bar_chart",
    title,
    metric,
    summary: top ? `${top.label} is leading with ${top.value} ${askEmyProductMetricUnit(metric, top.value)}.` : "No product analytics rows are available yet.",
    bars: bars.map((row) => ({
      label: row.label,
      value: row.value,
      bar: row.bar,
      details: {
        price: row.price || "",
        views: Number(row.views) || 0,
        likes: Number(row.likes) || 0,
        comments: Number(row.comments) || 0,
        saves: Number(row.saves) || 0,
        id: row.id || row.product_id || "",
        product_id: row.product_id || row.id || "",
        type: row.type || "product",
        productName: row.productName || row.name || row.label || "",
        business: row.business || "",
        businessKey: row.businessKey || "",
        category: row.category || "",
        availability: row.availability || "",
        image: row.image || "",
        imageRef: row.imageRef || "",
        mediaRef: row.mediaRef || "",
        video: row.video || "",
        videoRef: row.videoRef || "",
        url: row.url || ""
      }
    })),
    top_insight: askEmyProductTopInsight(bars, metric),
    next_action: askEmyProductNextAction(metric)
  };
}

function askEmyClipMetricCount(record = {}, metric = "views") {
  if (metric === "likes") return askEmyMetricFromRecord(record, ["likeCount", "likes", "likedCount"]);
  if (metric === "saves") return askEmyMetricFromRecord(record, ["saveCount", "saved", "saves", "savedCount"]);
  if (metric === "comments") return askEmyMetricFromRecord(record, ["commentCount", "comments", "commentsCount", "replies"]);
  return askEmyMetricFromRecord(record, ["viewCount", "views", "clipViews", "videoViews", "visitCount", "stats", "viewsText"]);
}

function askEmyClipAnalyticsItem(record = {}, metric = "views") {
  const id = clean(record.id || record.clipId || record.reelId || record.feedId || record.itemId);
  const title = clean(record.clipTitle || record.itemTitle || record.detailTitle || record.title || record.name) || "Clip";
  const value = askEmyClipMetricCount(record, metric);
  return {
    id,
    type: "clip",
    name: title,
    label: title,
    value,
    business: clean(record.business || record.businessName || record.ownerName),
    businessKey: clean(record.businessKey || record.profileKey || record.ownerKey),
    image: clean(record.image || record.imageUrl || record.thumbnail || record.poster || record.posterUrl),
    imageRef: clean(record.imageRef || record.mediaRef || record.thumbnailRef || record.posterRef),
    mediaRef: clean(record.mediaRef || record.imageRef || record.videoRef || record.clipRef),
    video: clean(record.video || record.videoUrl || record.videoSrc || record.clipUrl || record.clipSrc || record.reelSrc || record.clipVideoSrc),
    videoRef: clean(record.videoRef || record.clipRef || record.mediaRef),
    url: clean(record.url || record.link || record.href || record.detailUrl),
    views: askEmyClipMetricCount(record, "views"),
    likes: askEmyClipMetricCount(record, "likes"),
    comments: askEmyClipMetricCount(record, "comments"),
    saves: askEmyClipMetricCount(record, "saves"),
    linkedProductId: clean(record.productId || record.productKey || record.linkedProductId || record.relatedProductId),
    linkedProductName: clean(record.productName || record.productTitle || record.linkedProductName || record.relatedProductName)
  };
}

function askEmyPostMetricCount(record = {}, metric = "views") {
  if (metric === "likes") return askEmyMetricFromRecord(record, ["likeCount", "likes", "likedCount"]);
  if (metric === "saves") return askEmyMetricFromRecord(record, ["saveCount", "saved", "saves", "savedCount"]);
  if (metric === "comments") return askEmyMetricFromRecord(record, ["commentCount", "comments", "commentsCount", "replies"]);
  if (metric === "engagement") {
    return askEmyMetricFromRecord(record, ["likeCount", "likes", "likedCount"])
      + askEmyMetricFromRecord(record, ["saveCount", "saved", "saves", "savedCount"])
      + askEmyMetricFromRecord(record, ["commentCount", "comments", "commentsCount", "replies"])
      + askEmyMetricFromRecord(record, ["shareCount", "shares", "sharedCount"]);
  }
  return askEmyMetricFromRecord(record, ["viewCount", "views", "postViews", "articleViews", "visitCount", "stats", "viewsText"]);
}

function askEmyPostAnalyticsItem(record = {}, metric = "views") {
  const id = clean(record.id || record.postId || record.articleId || record.feedId || record.itemId);
  const title = clean(record.postTitle || record.articleTitle || record.itemTitle || record.detailTitle || record.title || record.name) || "Post";
  const value = askEmyPostMetricCount(record, metric);
  return {
    id,
    type: clean(record.type).toLowerCase() === "article" ? "article" : "post",
    name: title,
    label: title,
    value,
    business: clean(record.business || record.businessName || record.ownerName),
    businessKey: clean(record.businessKey || record.profileKey || record.ownerKey),
    category: clean(record.category || record.postCategory || record.articleCategory),
    image: clean(record.image || record.imageUrl || record.photo || record.photoUrl || record.thumbnail || record.thumbnailUrl || record.coverImage || record.coverImageUrl),
    imageRef: clean(record.imageRef || record.mediaRef || record.photoRef || record.thumbnailRef || record.coverImageRef),
    mediaRef: clean(record.mediaRef || record.imageRef || record.photoRef || record.videoRef),
    video: clean(record.video || record.videoUrl || record.videoSrc),
    videoRef: clean(record.videoRef || record.mediaRef),
    url: clean(record.url || record.link || record.href || record.detailUrl),
    views: askEmyPostMetricCount(record, "views"),
    likes: askEmyPostMetricCount(record, "likes"),
    comments: askEmyPostMetricCount(record, "comments"),
    saves: askEmyPostMetricCount(record, "saves")
  };
}

function askEmyContentComparisonSpecs(query = "") {
  const text = askEmyNormalizeIntentText(query);
  const specs = [];
  if (/\b(products?|items?|listings?|stock)\b/.test(text)) {
    specs.push({
      key: "product",
      title: "Products",
      singular: "Product",
      recordTypes: ["product"],
      item: (record, metric) => askEmyProductAnalyticsItem(record, metric),
      metricCount: (record, metric) => askEmyProductMetricCount(record, metric),
      score: (record) => askEmyProductActivityScore(record)
    });
  }
  if (/\b(clips?|videos?|reels?)\b/.test(text)) {
    specs.push({
      key: "clip",
      title: "Clips",
      singular: "Clip",
      recordTypes: ["clip", "reel"],
      item: (record, metric) => askEmyClipAnalyticsItem(record, metric),
      metricCount: (record, metric) => askEmyClipMetricCount(record, metric),
      score: (record) => askEmyClipMetricCount(record, "likes") * 20 + askEmyClipMetricCount(record, "comments") * 8 + askEmyClipMetricCount(record, "views")
    });
  }
  if (/\b(posts?|updates?|feed|articles?)\b/.test(text)) {
    specs.push({
      key: "post",
      title: "Posts",
      singular: "Post",
      recordTypes: ["post", "article"],
      item: (record, metric) => askEmyPostAnalyticsItem(record, metric),
      metricCount: (record, metric) => askEmyPostMetricCount(record, metric),
      score: (record) => askEmyPostMetricCount(record, "likes") * 20 + askEmyPostMetricCount(record, "comments") * 8 + askEmyPostMetricCount(record, "views")
    });
  }
  return specs;
}

function askEmyContentComparisonTitle(groups = [], metric = "views") {
  const labels = groups.map((group) => group.title).filter(Boolean);
  if (!labels.length) return `Content by ${askEmyProductMetricUnit(metric, 2)}`;
  if (labels.length === 1) return `${labels[0]} by ${askEmyProductMetricUnit(metric, 2)}`;
  return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]} by ${askEmyProductMetricUnit(metric, 2)}`;
}

function askEmyContentComparisonAnalyticsPayload(groups = [], metric = "views", options = {}) {
  const warnings = Array.isArray(options.warnings) ? options.warnings : [];
  const combinedRows = groups.flatMap((group) => (Array.isArray(group.bars) ? group.bars : []).map((row) => ({
    ...row,
    label: `${group.singular}: ${row.label}`,
    value: Number(row.value) || 0,
    details: {
      price: row.price || "",
      views: Number(row.views) || 0,
      likes: Number(row.likes) || 0,
      comments: Number(row.comments) || 0,
      saves: Number(row.saves) || 0,
      id: row.id || row.product_id || "",
      product_id: row.product_id || "",
      type: group.key,
      productName: group.key === "product" ? row.productName || row.name || row.label || "" : "",
      name: row.name || row.productName || row.label || "",
      business: row.business || "",
      businessKey: row.businessKey || "",
      category: row.category || "",
      availability: row.availability || "",
      image: row.image || "",
      imageRef: row.imageRef || "",
      mediaRef: row.mediaRef || "",
      video: row.video || "",
      videoRef: row.videoRef || "",
      url: row.url || ""
    }
  })));
  const bars = buildTextBars(combinedRows, metric, "label").map((row) => ({
    label: row.label,
    value: row.value,
    bar: row.bar,
    details: row.details || {}
  }));
  const groupTotals = groups.map((group) => ({
    key: group.key,
    title: group.title,
    total: Number(group.total) || 0,
    count: Number(group.count) || 0
  }));
  const sortedGroups = [...groupTotals].sort((a, b) => b.total - a.total || b.count - a.count || a.title.localeCompare(b.title));
  const winner = sortedGroups[0] || null;
  const runnerUp = sortedGroups[1] || null;
  const unit = askEmyProductMetricUnit(metric, winner ? winner.total : 2);
  const allZero = !winner || winner.total <= 0;
  const title = askEmyContentComparisonTitle(groups, metric);
  const summary = allZero
    ? `I found ${groups.map((group) => group.title.toLowerCase()).join(" and ")}, but I do not see saved ${askEmyProductMetricUnit(metric, 2)} on them yet.`
    : `${winner.title} have the higher saved ${askEmyProductMetricUnit(metric, 2)} total with ${winner.total} ${unit}.`;
  let topInsight = summary;
  if (!allZero && runnerUp) {
    const gap = Math.max(0, winner.total - runnerUp.total);
    topInsight = gap === 0
      ? `${winner.title} and ${runnerUp.title} are tied at ${winner.total} ${unit}.`
      : `${winner.title} are ahead of ${runnerUp.title} by ${gap} ${askEmyProductMetricUnit(metric, gap)}.`;
  }
  return {
    answer_type: "analytics_bar_chart",
    presentation: "cross_entity_comparison",
    title,
    metric,
    summary,
    bars,
    top_insight: topInsight,
    next_action: "Use this comparison to decide which content type needs better media, clearer text, or a stronger customer action.",
    data_quality: {
      source: "canonical_records",
      is_estimate: false,
      has_time_series: false,
      group_totals: groupTotals,
      requested_types: groupTotals.map((group) => group.key),
      warnings
    }
  };
}

function askEmyContentComparisonAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const metric = askEmyProductMetricFromQuestion(query);
  const requestedSpecs = askEmyContentComparisonSpecs(query);
  const specs = requestedSpecs.length >= 2 ? requestedSpecs : askEmyContentComparisonSpecs("products clips posts").slice(0, 2);
  const text = askEmyNormalizeIntentText(query);
  const wantsOwnedOnly = /\b(my|mine|own|owned|my business|your business)\b/.test(text);
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(Array.isArray(recordsInput) ? recordsInput : [], payload), payload);
  const groups = specs.map((spec) => {
    const seen = new Set();
    const allRows = marked
      .filter((record) => spec.recordTypes.includes(clean(record && record.type).toLowerCase()))
      .filter((record) => {
        const key = askEmyVisibleRecordKey(record) || [record && record.type, record && record.id, record && record.name, record && record.title, record && record.business].map(clean).join("|").toLowerCase();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    const ownedRows = allRows.filter((record) => record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice);
    const rows = (wantsOwnedOnly && ownedRows.length ? ownedRows : allRows)
      .sort((a, b) => spec.metricCount(b, metric) - spec.metricCount(a, metric) || spec.score(b) - spec.score(a) || clean(a.name || a.title).localeCompare(clean(b.name || b.title)))
      .slice(0, 5);
    const bars = buildTextBars(rows.map((record) => spec.item(record, metric)), metric, "label");
    return {
      ...spec,
      rows,
      bars,
      count: allRows.length,
      shown: rows.length,
      total: bars.reduce((sum, row) => sum + (Number(row.value) || 0), 0)
    };
  });
  const warnings = groups.some((group) => group.count > group.shown)
    ? ["I am showing the strongest saved rows for each content type, not every saved item."]
    : [];
  const analytics = askEmyContentComparisonAnalyticsPayload(groups, metric, { warnings });
  const groupsWithRows = groups.filter((group) => group.rows.length);
  if (!groupsWithRows.length) {
    return {
      answer: `${prefix}I do not see saved ${specs.map((spec) => spec.title.toLowerCase()).join(" or ")} records to compare yet.`,
      provider,
      results: [],
      analytics
    };
  }
  const sortedGroups = [...groups].sort((a, b) => b.total - a.total || b.shown - a.shown || a.title.localeCompare(b.title));
  const winner = sortedGroups[0];
  const runnerUp = sortedGroups[1];
  const unit = askEmyProductMetricUnit(metric, winner ? winner.total : 2);
  const headline = winner && winner.total > 0
    ? `${winner.title} have more saved ${askEmyProductMetricUnit(metric, 2)} here: ${winner.total} ${unit}${runnerUp ? ` vs ${runnerUp.total} for ${runnerUp.title.toLowerCase()}` : ""}.`
    : `I found ${groupsWithRows.map((group) => group.title.toLowerCase()).join(" and ")}, but I do not see saved ${askEmyProductMetricUnit(metric, 2)} on them yet.`;
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      `Yes - ${headline}`,
      askEmyFormatSection("Comparison", groups.map((group) => `${group.title}: ${group.total} ${askEmyProductMetricUnit(metric, group.total)} across ${group.shown} shown ${group.shown === 1 ? group.singular.toLowerCase() : group.title.toLowerCase()}`)),
      askEmyFormatSection("How to read it", [
        `This compares saved ${askEmyProductMetricUnit(metric, 2)} by content type.`,
        "The chart below shows the strongest individual rows inside each type."
      ])
    ].filter(Boolean)),
    provider,
    results: [],
    analytics
  };
}

function askEmyVisibleUniqueRecords(records = [], type = "") {
  const seen = new Set();
  return (Array.isArray(records) ? records : [])
    .filter((record) => !type || clean(record && record.type).toLowerCase() === type)
    .filter((record) => {
      const key = askEmyVisibleRecordKey(record) || [
        record && record.type,
        record && (record.id || record.productId || record.clipId || record.reelId || record.feedId || record.itemId),
        record && (record.name || record.title),
        record && (record.video || record.videoUrl || record.videoSrc)
      ].map(clean).join("|").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function askEmyHasClipProductLink(row = {}) {
  const productId = clean(row.linkedProductId || row.product_id || row.productId);
  const productName = clean(row.linkedProductName || row.productName || row.productTitle);
  const businessName = clean(row.business || row.businessName);
  return Boolean(productId || (productName && productName.toLowerCase() !== businessName.toLowerCase()));
}

function askEmyProductClipComparisonAnalyticsPayload(productBars = [], clipBars = [], options = {}) {
  const warnings = Array.isArray(options.warnings) ? options.warnings : [];
  const combinedRows = [
    ...productBars.map((row) => ({
      ...row,
      label: `Product: ${row.label}`,
      value: Number(row.value) || 0,
      details: {
        price: row.price || "",
        views: Number(row.views) || 0,
        likes: Number(row.likes) || 0,
        comments: Number(row.comments) || 0,
        saves: Number(row.saves) || 0,
        id: row.id || row.product_id || "",
        product_id: row.product_id || row.id || "",
        type: "product",
        productName: row.productName || row.name || row.label || "",
        business: row.business || "",
        businessKey: row.businessKey || "",
        category: row.category || "",
        availability: row.availability || "",
        image: row.image || "",
        imageRef: row.imageRef || "",
        mediaRef: row.mediaRef || "",
        video: row.video || "",
        videoRef: row.videoRef || "",
        url: row.url || ""
      }
    })),
    ...clipBars.map((row) => ({
      ...row,
      label: `Clip: ${row.label}`,
      value: Number(row.value) || 0,
      details: {
        views: Number(row.views) || 0,
        likes: Number(row.likes) || 0,
        comments: Number(row.comments) || 0,
        saves: Number(row.saves) || 0,
        id: row.id || "",
        type: "clip",
        name: row.name || row.label || "Clip",
        business: row.business || "",
        businessKey: row.businessKey || "",
        image: row.image || "",
        imageRef: row.imageRef || "",
        mediaRef: row.mediaRef || "",
        video: row.video || "",
        videoRef: row.videoRef || "",
        url: row.url || ""
      }
    }))
  ];
  const bars = buildTextBars(combinedRows, "views", "label").map((row) => ({
    label: row.label,
    value: row.value,
    bar: row.bar,
    details: row.details || {}
  }));
  const top = bars[0] || null;
  return {
    answer_type: "analytics_bar_chart",
    presentation: "cross_entity_comparison",
    title: "Products and clips by views",
    metric: "views",
    summary: top ? `${top.label} has the strongest saved view signal with ${top.value} ${askEmyProductMetricUnit("views", top.value)}.` : "No product or clip view rows are available yet.",
    bars,
    top_insight: top ? `${top.label} is the strongest visible view signal in this comparison.` : "I do not have product or clip view signals to compare yet.",
    next_action: "Link clips to products if you want EMY to measure which clips drive attention to each product.",
    data_quality: {
      source: "canonical_records",
      is_estimate: false,
      has_time_series: false,
      has_product_clip_links: Boolean(options.hasProductClipLinks),
      warnings
    }
  };
}

function askEmyProductClipComparisonAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(Array.isArray(recordsInput) ? recordsInput : [], payload), payload);
  const allProducts = askEmyVisibleUniqueRecords(marked, "product")
    .sort((a, b) => askEmyProductMetricCount(b, "views") - askEmyProductMetricCount(a, "views") || askEmyProductActivityScore(b) - askEmyProductActivityScore(a));
  const allClips = askEmyVisibleUniqueRecords(marked.filter((record) => /^(clip|reel)$/.test(clean(record && record.type).toLowerCase())), "")
    .sort((a, b) => askEmyClipMetricCount(b, "views") - askEmyClipMetricCount(a, "views") || clean(a.title || a.name).localeCompare(clean(b.title || b.name)));
  const ownedProducts = allProducts.filter((record) => record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice);
  const ownedClips = allClips.filter((record) => record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice);
  const products = (ownedProducts.length ? ownedProducts : allProducts).slice(0, 5);
  const clips = (ownedClips.length ? ownedClips : allClips).slice(0, 5);
  const productBars = askEmyProductAnalyticsBars(products, "views");
  const clipBars = buildTextBars(clips.map((record) => askEmyClipAnalyticsItem(record, "views")), "views", "label");
  const productIds = new Set(productBars.map((row) => clean(row.id || row.product_id).toLowerCase()).filter(Boolean));
  const productNames = new Set(productBars.map((row) => clean(row.productName || row.name || row.label).toLowerCase()).filter(Boolean));
  const linkedClips = clipBars.filter((row) => {
    const linkedId = clean(row.linkedProductId || row.product_id || row.productId).toLowerCase();
    const linkedName = clean(row.linkedProductName || row.productName || row.productTitle).toLowerCase();
    return Boolean(linkedId && productIds.has(linkedId) || linkedName && productNames.has(linkedName));
  });
  const linkWarning = linkedClips.length ? "" : "No saved product-to-clip links are available, so this is comparison only, not attribution.";
  const analytics = askEmyProductClipComparisonAnalyticsPayload(productBars, clipBars, {
    hasProductClipLinks: Boolean(linkedClips.length),
    warnings: linkWarning ? [linkWarning] : []
  });
  if (!products.length && !clips.length) {
    return {
      answer: `${prefix}I do not see saved product or clip view records to compare yet.`,
      provider,
      results: [],
      analytics
    };
  }
  const productLines = productBars.length ? askEmyProductChartLines(productBars, "views") : ["No product view rows available."];
  const clipLines = clipBars.length ? askEmyProductChartLines(clipBars, "views") : ["No clip view rows available."];
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      "Yes - here is the product and clip view comparison I can make from EMY records.",
      askEmyFormatSection("Product views", productLines),
      askEmyFormatSection("Clip views", clipLines),
      askEmyFormatSection("How to read it", [
        "This compares products and clips side by side by saved views.",
        linkedClips.length
          ? `${linkedClips.length} clip${linkedClips.length === 1 ? "" : "s"} appear to have a saved product link, so those can be used for deeper attribution.`
          : "I do not see saved product-to-clip links yet, so this is not saying a clip caused a product view."
      ]),
      askEmyFormatSection("Next", [
        "If you want attribution, EMY needs each clip to save the product it promotes.",
        "You can also ask me to compare products, clips, posts, jobs, or businesses by views, likes, comments, saves, messages, or enquiries when those metrics exist."
      ])
    ]),
    provider,
    results: [],
    analytics
  };
}

function askEmyIsOwnedProductListQuery(query, payload = {}) {
  const text = askEmyNormalizeIntentText(query);
  const history = askEmyHistoryText(payload || {}).toLowerCase();
  const combined = `${text} ${history}`.trim();
  const asksProduct = /\b(products?|items?|stock|listings?)\b/.test(text);
  if (!asksProduct) return false;
  const ownershipWords = /\b(my|mine|own|owned|ours?|belong(?:s)? to me|from my|my business|my shop|my store|my company|your products?|your business)\b/.test(text)
    || /\b(i said|i asked|no|no no)\b[\s\S]{0,80}\bmy products?\b/.test(text);
  const listWords = /\b(show|list|all|open|display|bring|pull up|see|give|get|where are|what are)\b/.test(text)
    || /^my products?$/.test(text)
    || /\bmy products?\b/.test(text);
  const correctionFromOwnedProductContext = /\b(i said|i asked|no|no no)\b/.test(text) && /\bmy products?\b/.test(combined);
  return Boolean((ownershipWords && listWords) || correctionFromOwnedProductContext);
}

function askEmyOwnedProductListAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(allRecords, payload || {}), payload || {});
  const seen = new Set();
  const products = marked
    .filter((record) => clean(record && record.type).toLowerCase() === "product" && (record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice))
    .filter((record) => {
      const key = askEmyVisibleRecordKey(record) || [record.type, record.id, record.name, record.business].map(clean).join("|").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => askEmyProductMetricCount(b, "views") - askEmyProductMetricCount(a, "views") || askEmyProductActivityScore(b) - askEmyProductActivityScore(a) || clean(a.name).localeCompare(clean(b.name)));
  const businessNames = Array.from(new Set(products.map((record) => clean(record.business || record.businessName)).filter(Boolean))).slice(0, 3);
  if (!products.length) {
    return {
      answer: askEmyFormatReply([
        "I do not see products saved under your business yet.",
        askEmyFormatSection("What I understood", [
          "You asked for your own business products."
        ]),
        askEmyFormatSection("Next step", [
          "Create or publish products from the business product area, then Ask EMY can show them here."
        ])
      ]),
      provider,
      results: []
    };
  }
  const wantsAll = /\ball\b|\bshow\s+me\s+all\b|\ball\s+my\s+products?\b/i.test(askEmyNormalizeIntentText(query));
  const limit = wantsAll ? Math.min(products.length, 20) : Math.min(products.length, askEmyProductLimitFromQuery(query, 8));
  const results = products.slice(0, limit);
  const businessText = businessNames.length ? ` from ${businessNames.join(", ")}` : " from your business";
  const shownLine = products.length > results.length
    ? `I can see ${products.length} products${businessText}; I am showing the first ${results.length} here.`
    : `I am showing all ${products.length} product${products.length === 1 ? "" : "s"}${businessText} here.`;
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      `Yes. These are your products.\n${shownLine}`,
      askEmyFormatSection("What I understood", [
        "This is your business product list."
      ]),
      askEmyFormatSection("Next step", [
        "Open a product card to view the existing EMY product details, image, price, stock, views, likes, and comments."
      ])
    ].filter(Boolean)),
    provider,
    results
  };
}

function askEmyOwnedClipListAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(allRecords, payload || {}), payload || {});
  const seen = new Set();
  const clips = marked
    .filter((record) => /^(clip|reel)$/.test(clean(record && record.type).toLowerCase()) && (record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice))
    .filter((record) => {
      const key = askEmyVisibleRecordKey(record) || [record.type, record.id, record.name, record.business, record.video || record.clipUrl].map(clean).join("|").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => clean(b.date).localeCompare(clean(a.date)) || clean(a.name).localeCompare(clean(b.name)));
  const businessNames = Array.from(new Set(clips.map((record) => clean(record.business || record.businessName)).filter(Boolean))).slice(0, 3);
  if (!clips.length) {
    return {
      answer: askEmyFormatReply([
        "I do not see clips saved under your business yet.",
        askEmyFormatSection("What I understood", [
          "You asked for your own business clips."
        ]),
        askEmyFormatSection("Next step", [
          "Upload or publish clips from the business clips area, then Ask EMY can show them here."
        ])
      ]),
      provider,
      results: []
    };
  }
  const wantsAll = /\ball\b|\bshow\s+me\s+all\b|\ball\s+my\s+(clips?|videos?|reels?)\b/i.test(askEmyNormalizeIntentText(query));
  const limit = wantsAll ? Math.min(clips.length, 20) : Math.min(clips.length, askEmyProductLimitFromQuery(query, 8));
  const results = clips.slice(0, limit).map((record) => askEmyAttachContentViewSpec(record, { kind: "Clip video card", type: "clip" }));
  const businessText = businessNames.length ? ` from ${businessNames.join(", ")}` : " from your business";
  const shownLine = clips.length > results.length
    ? `I can see ${clips.length} clips${businessText}; I am showing the first ${results.length} here.`
    : `I am showing all ${clips.length} clip${clips.length === 1 ? "" : "s"}${businessText} here.`;
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      `Yes. Here are your clips.\n${shownLine}`,
      askEmyFormatSection("Next step", [
        "Open a clip card to watch it in the existing EMY clip view here."
      ])
    ].filter(Boolean)),
    provider,
    results
  };
}

function askEmyOwnedPostListAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(allRecords, payload || {}), payload || {});
  const seen = new Set();
  const posts = marked
    .filter((record) => clean(record && record.type).toLowerCase() === "post" && (record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice))
    .filter((record) => {
      const key = askEmyVisibleRecordKey(record) || [record.type, record.id, record.name, record.business, record.date].map(clean).join("|").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => clean(b.date).localeCompare(clean(a.date)) || clean(a.name).localeCompare(clean(b.name)));
  const businessNames = Array.from(new Set(posts.map((record) => clean(record.business || record.businessName)).filter(Boolean))).slice(0, 3);
  if (!posts.length) {
    return {
      answer: askEmyFormatReply([
        "I do not see posts saved under your business yet.",
        askEmyFormatSection("What I understood", [
          "You asked for your own business posts."
        ]),
        askEmyFormatSection("Next step", [
          "Publish posts from the business posts area, then Ask EMY can show them here."
        ])
      ]),
      provider,
      results: []
    };
  }
  const wantsAll = /\ball\b|\bshow\s+me\s+all\b|\ball\s+my\s+(posts?|updates?|feed)\b/i.test(askEmyNormalizeIntentText(query));
  const limit = wantsAll ? Math.min(posts.length, 20) : Math.min(posts.length, askEmyProductLimitFromQuery(query, 8));
  const results = posts.slice(0, limit).map((record) => askEmyAttachContentViewSpec(record, { kind: "Post card", type: "post" }));
  const businessText = businessNames.length ? ` from ${businessNames.join(", ")}` : " from your business";
  const shownLine = posts.length > results.length
    ? `I can see ${posts.length} posts${businessText}; I am showing the first ${results.length} here.`
    : `I am showing all ${posts.length} post${posts.length === 1 ? "" : "s"}${businessText} here.`;
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      `Yes. Here are your posts.\n${shownLine}`,
      askEmyFormatSection("Next step", [
        "Open a post card to view it in the existing EMY post view here."
      ])
    ].filter(Boolean)),
    provider,
    results
  };
}

function askEmyOwnedArticleListAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(allRecords, payload || {}), payload || {});
  const seen = new Set();
  const articles = marked
    .filter((record) => clean(record && record.type).toLowerCase() === "article" && (record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice))
    .filter((record) => {
      const key = askEmyVisibleRecordKey(record) || [record.type, record.id, record.name, record.business, record.date].map(clean).join("|").toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => clean(b.date).localeCompare(clean(a.date)) || clean(a.name).localeCompare(clean(b.name)));
  const businessNames = Array.from(new Set(articles.map((record) => clean(record.business || record.businessName)).filter(Boolean))).slice(0, 3);
  if (!articles.length) {
    return {
      answer: askEmyFormatReply([
        "I do not see articles saved under your business yet.",
        askEmyFormatSection("What I understood", [
          "You asked for your own business articles."
        ]),
        askEmyFormatSection("Next step", [
          "Publish or sync articles from the business posts/articles area, then Ask EMY can show them here."
        ])
      ]),
      provider,
      results: [],
      responseType: "small_result_list",
      selectedToolName: "getOwnedArticles"
    };
  }
  const wantsAll = /\ball\b|\bshow\s+me\s+all\b|\ball\s+my\s+(articles?|blogs?|news)\b/i.test(askEmyNormalizeIntentText(query));
  const limit = wantsAll ? Math.min(articles.length, 20) : Math.min(articles.length, askEmyProductLimitFromQuery(query, 8));
  const results = articles.slice(0, limit).map((record) => askEmyAttachContentViewSpec(record, { kind: "Article card", type: "article" }));
  const businessText = businessNames.length ? ` from ${businessNames.join(", ")}` : " from your business";
  const shownLine = articles.length > results.length
    ? `I can see ${articles.length} articles${businessText}; I am showing the first ${results.length} here.`
    : `I am showing all ${articles.length} article${articles.length === 1 ? "" : "s"}${businessText} here.`;
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      `Yes. Here are your business articles.\n${shownLine}`,
      askEmyFormatSection("Next step", [
        "Open an article card to view it in the existing EMY article/post view here."
      ])
    ].filter(Boolean)),
    provider,
    results,
    responseType: "small_result_list",
    selectedToolName: "getOwnedArticles"
  };
}

function askEmyOwnedBusinessCardAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(allRecords, payload || {}), payload || {});
  const ownedBusinessProfiles = marked
    .filter((record) => clean(record && record.type).toLowerCase() === "business"
      && (record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice || record.isBusinessProfile || record.explicitBusinessProfile)
      && askEmyRecordLooksLikeBusinessProfile(record, askEmyVisibleRecordKey(record))
      && !askEmyRecordHasContentSignals(record, askEmyVisibleRecordKey(record)));
  const ownedContent = marked.filter((record) => record && record.type !== "business" && (record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice));
  let businessCard = ownedBusinessProfiles[0] || null;
  if (!businessCard && ownedContent.length) {
    const source = ownedContent.find((record) => clean(record.business || record.businessName)) || ownedContent[0];
    const businessName = clean(source.business || source.businessName || source.place || "Your business");
    const businessKey = slugBusinessLikeId(source.businessKey || businessName);
    businessCard = {
      id: `business-${businessKey || "owned-business"}`,
      type: "business",
      name: businessName,
      business: businessName,
      businessName,
      businessKey,
      place: clean(source.place),
      desc: clean(source.businessDescription || source.description || source.desc),
      category: clean(source.businessCategory || source.category),
      image: clean(source.businessImage || source.businessProfileImage || source.logo || source.logoUrl || source.businessCoverImage),
      profileImage: clean(source.businessProfileImage || source.logo || source.logoUrl),
      coverImage: clean(source.businessCoverImage),
      url: businessKey ? `emy-business-profile.html?business=${encodeURIComponent(businessKey)}` : "",
      isOwnedByViewer: true,
      ownedByViewer: true,
      ownerNotice: "Your business",
      isBusinessProfile: true,
      explicitBusinessProfile: true
    };
  }
  if (!businessCard) {
    const account = askEmyProfileAccountForRole(payload || {}, "business");
    const media = askEmyProfileMedia(account);
    const businessName = clean(account.businessName || account.business || account.name);
    const businessKey = slugBusinessLikeId(account.businessKey || account.profileKey || businessName);
    if (businessName || media.image || media.imageRef || account.email || account.businessEmail) {
      businessCard = {
        id: `business-${businessKey || "account-business"}`,
        type: "business",
        name: businessName || "Your business",
        business: businessName || "Your business",
        businessName: businessName || "Your business",
        businessKey,
        desc: clean(account.businessDescription || account.description || account.desc),
        category: clean(account.businessCategory || account.category),
        place: clean(account.place || account.location || account.address),
        address: clean(account.address || account.place || account.location),
        phone: clean(account.phone || account.telephone || account.businessPhone),
        email: clean(account.businessEmail || account.email || account.accountEmail),
        website: clean(account.website || account.businessWebsite),
        image: media.image,
        imageRef: media.imageRef,
        profileImage: media.image,
        profileImageRef: media.imageRef,
        url: businessKey ? `emy-business-profile.html?business=${encodeURIComponent(businessKey)}` : askEmyProfileUrlForRole("business"),
        isOwnedByViewer: true,
        ownedByViewer: true,
        ownerNotice: "Your business",
        isBusinessProfile: true,
        explicitBusinessProfile: true
      };
    }
  }
  if (!businessCard) {
    return {
      answer: askEmyFormatReply([
        "I cannot see a saved business card for your account yet.",
        askEmyFormatSection("Next step", [
          "Create or sync your business profile first, then Ask EMY can open the business card here."
        ])
      ]),
      provider,
      results: []
    };
  }
  const name = clean(businessCard.name || businessCard.business || businessCard.businessName) || "your business";
  const businessTarget = {
    aliases: new Set([
      businessCard.businessKey,
      businessCard.key,
      businessCard.profileKey,
      businessCard.name,
      businessCard.business,
      businessCard.businessName,
      name
    ].filter(Boolean))
  };
  const businessLikeCount = askEmyBusinessLikeCountForTarget(businessTarget, payload, [businessCard, ...marked]);
  businessCard = askEmyBusinessCardSummaryFromRecords({ ...businessCard, businessLikeCount }, marked);
  businessCard.businessLikeCount = Math.max(Number(businessCard.businessLikeCount) || 0, businessLikeCount);
  businessCard = {
    ...businessCard,
    viewSpec: askEmyBusinessCardViewSpec(businessCard)
  };
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      `Yes. Here is your business card for ${name}.`,
      askEmyFormatSection("Next step", [
        "Open the card to view the existing EMY business profile here."
      ])
    ].filter(Boolean)),
    provider,
    results: [businessCard]
  };
}

function askEmyDailyUpdateParseTime(value) {
  const text = clean(value);
  if (!text) return 0;
  const direct = Date.parse(text);
  if (Number.isFinite(direct)) return direct;
  const year = new Date().getFullYear();
  const normalized = text.replace(/\bat\b/ig, " ").replace(/,/g, " ").replace(/\s+/g, " ").trim();
  const withYear = Date.parse(`${normalized} ${year}`);
  return Number.isFinite(withYear) ? withYear : 0;
}

function askEmyDailyUpdateDate(record = {}) {
  return clean(record.updatedAt || record.createdAt || record.publishedAt || record.postedAt || record.savedAt || record.date || record.time);
}

function askEmyDailyUpdateType(record = {}) {
  const bucket = askEmyBusinessContentBucket(record);
  if (bucket) return bucket;
  const type = clean(record.type || record.kind || record.contentType).toLowerCase();
  if (/^(product|products?)$/.test(type)) return "products";
  if (/^(clip|clips?|reel|reels?|video|videos?)$/.test(type)) return "clips";
  if (/^(post|posts?|feed|updates?)$/.test(type)) return "posts";
  if (/^(job|jobs?|role|roles?)$/.test(type)) return "jobs";
  if (/^(article|articles?|blog|blogs?)$/.test(type)) return "articles";
  if (/^(event|events?)$/.test(type)) return "events";
  if (/^(service|services?)$/.test(type)) return "services";
  if (/^(business|businesses?|shop|shops?|store|stores?)$/.test(type)) return "businesses";
  return "";
}

function askEmyDailyUpdateTypeLabel(type) {
  const labels = {
    businesses: "Business",
    products: "Product",
    clips: "Clip",
    posts: "Post",
    jobs: "Job",
    articles: "Article",
    events: "Event",
    services: "Service"
  };
  return labels[type] || "Item";
}

function askEmyDailyUpdateViewType(type) {
  return type === "businesses" ? "business"
    : type === "products" ? "product"
      : type === "clips" ? "clip"
        : type === "posts" ? "post"
          : type === "jobs" ? "job"
            : type === "articles" ? "article"
              : type === "events" ? "event"
                : type === "services" ? "service"
                  : "content";
}

function askEmyDailyUpdateTitle(record = {}) {
  return askEmyFirstUseful([
    record.name,
    record.title,
    record.productName,
    record.productTitle,
    record.jobTitle,
    record.businessName,
    record.business,
    record.place
  ], 120) || "Untitled EMY item";
}

function askEmyDailyUpdateAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(allRecords, payload || {}), payload || {});
  const seen = new Set();
  const items = marked
    .map((record, index) => {
      const type = askEmyDailyUpdateType(record);
      const key = askEmyVisibleRecordKey(record) || [type, record && record.type, record && record.id, record && record.name, record && record.title, record && record.business, record && record.date].map(clean).join("|").toLowerCase();
      return {
        record,
        index,
        key,
        type,
        title: askEmyDailyUpdateTitle(record),
        dateText: askEmyDailyUpdateDate(record),
        time: askEmyDailyUpdateParseTime(askEmyDailyUpdateDate(record))
      };
    })
    .filter((item) => item.record && item.type && item.key && !seen.has(item.key) && seen.add(item.key))
    .sort((a, b) => (b.time - a.time) || (b.index - a.index) || a.title.localeCompare(b.title));

  if (!items.length) {
    return {
      answer: askEmyFormatReply([
        prefix ? askEmyFormatSection("Note", [prefix]) : "",
        "I do not see recent EMY activity in this chat payload yet.",
        askEmyFormatSection("What I can check next", [
          "Ask for products, clips, posts, jobs, businesses, or your profile and I will use the matching EMY tool."
        ])
      ].filter(Boolean)),
      provider,
      results: []
    };
  }

  const counts = new Map();
  items.forEach((item) => counts.set(item.type, (counts.get(item.type) || 0) + 1));
  const countLines = ["businesses", "products", "clips", "posts", "jobs", "articles", "events", "services"]
    .filter((type) => counts.has(type))
    .map((type) => `${counts.get(type)} ${type.replace(/ies$/, "y").replace(/s$/, "")}${counts.get(type) === 1 ? "" : "s"}`);
  const latestLines = items.slice(0, 5).map((item) => {
    const date = askEmyDisplayDate(item.dateText);
    return `${askEmyDailyUpdateTypeLabel(item.type)}: ${item.title}${date ? ` (${date})` : ""}`;
  });
  const cardLimit = Math.min(items.length, 6);
  const results = items.slice(0, cardLimit).map((item) => askEmyAttachContentViewSpec(item.record, {
    kind: `${askEmyDailyUpdateTypeLabel(item.type)} update card`,
    type: askEmyDailyUpdateViewType(item.type),
    eyebrow: "New on EMY"
  }));
  const title = /\b(today|daily)\b/i.test(askEmyNormalizeIntentText(query)) ? "Today on EMY" : "What's new on EMY";
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      `${title}\nI found ${items.length} recent EMY item${items.length === 1 ? "" : "s"} in this chat data.`,
      askEmyFormatSection("Activity mix", countLines),
      askEmyFormatSection("Latest visible items", latestLines),
      askEmyFormatSection("Next", [
        "Ask me to narrow this to products, clips, posts, jobs, businesses, or analytics if you want a focused update."
      ])
    ].filter(Boolean)),
    provider,
    results
  };
}

function askEmyIsSingleTopProductMetricQuestion(query) {
  const text = askEmyNormalizeIntentText(query);
  if (!text || !/\b(products?|items?|listings?|stock)\b/.test(text)) return false;
  const pluralProduct = /\b(products|items|listings)\b/.test(text);
  const explicitOne = /\b(the product|one product|which product|what product|top product|most viewed product|most liked product|most saved product|most commented product)\b/.test(text);
  if (pluralProduct && !explicitOne) return false;
  const hasMetric = /\b(views?|viewed|visits?|liked|likes?|saved|saves?|comments?|replies|engagement|interest|popular)\b/.test(text);
  if (!hasMetric) return false;
  const productNearTop = /\bproduct\b[\s\S]{0,80}\b(most|top|highest|best|strongest)\b/.test(text)
    || /\b(most|top|highest|best|strongest)\b[\s\S]{0,80}\bproduct\b/.test(text);
  const asksOne = explicitOne || /\b(the|one|which|what)\s+product\b/.test(text) || productNearTop;
  return asksOne && (productNearTop || /\b(most|top|highest|best|strongest)\b/.test(text));
}

function askEmyIsSingleProductCorrection(query, payload = {}) {
  const text = askEmyNormalizeIntentText(query);
  if (!/\b(product\s+not\s+products|the product\s+not\s+products|asked\b[\s\S]{0,40}\bproduct\b[\s\S]{0,40}\bnot\b[\s\S]{0,20}\bproducts?)\b/.test(text)) return false;
  return /\b(most viewed product|top product|product statistics|product interest|product engagement|views?:|view count|show me the product)\b/i.test(askEmyHistoryText(payload || {}));
}

function askEmySingleProductMetricQuery(query, payload = {}) {
  if (!askEmyIsSingleProductCorrection(query, payload || {})) return query;
  const history = askEmyHistoryText(payload || {}).toLowerCase();
  if (/\b(views?|viewed|visits?|view count|most viewed product|show me the product)\b/.test(history)) return "most viewed product";
  if (/\b(likes?|liked)\b/.test(history)) return "most liked product";
  if (/\b(saves?|saved)\b/.test(history)) return "most saved product";
  if (/\b(comments?|replies)\b/.test(history)) return "most commented product";
  if (/\b(engagement|interest|popular)\b/.test(history)) return "top product by interest";
  return "most viewed product";
}

function askEmySingleProductMetricAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const effectiveQuery = askEmySingleProductMetricQuery(query, payload || {});
  const metric = askEmyProductMetricFromQuestion(effectiveQuery);
  const metricLabel = askEmyProductMetricLabel(metric);
  const available = Array.isArray(recordsInput) ? recordsInput : [];
  const businessTargetScope = askEmyBusinessTargetFromFollowUpContext(effectiveQuery, payload || {}, available);
  const scopedRecords = businessTargetScope ? askEmyRecordsForBusinessTarget(available, businessTargetScope) : available;
  const seen = new Set();
  const products = scopedRecords.filter((record) => clean(record && record.type).toLowerCase() === "product")
    .filter((record) => {
      const key = askEmyVisibleRecordKey(record);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const ranked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(products, payload || {}), payload || {})
    .map((record) => ({
      record,
      metricCount: askEmyProductMetricCount(record, metric),
      activityScore: askEmyProductActivityScore(record),
      dateScore: Date.parse(clean(record.date)) || 0
    }))
    .sort((a, b) => b.metricCount - a.metricCount || b.activityScore - a.activityScore || b.dateScore - a.dateScore || clean(a.record.name).localeCompare(clean(b.record.name)));
  const top = ranked[0];
  if (!top) {
    return {
      answer: `I could not find any product ${askEmyProductMetricUnit(metric, 2)} data for your business.`,
      provider,
      results: [],
      analytics: askEmyProductAnalyticsPayload(askEmyProductMetricTitle(metric, false), metric, [])
    };
  }
  const record = {
    ...top.record,
    demandRank: 1,
    demandBasis: `top-product-${metric}`,
    demandSignal: `${top.metricCount} ${metricLabel.toLowerCase()}`,
    demandScore: top.metricCount
  };
  const topLine = metric === "likes" ? "Your most liked product is"
    : metric === "saves" ? "Your most saved product is"
      : metric === "comments" ? "Your most commented product is"
        : metric === "engagement" ? "Your strongest product by interest is"
          : "Your most viewed product is";
  const meaningMetric = metric === "engagement" ? "strongest saved engagement score"
    : metric === "views" ? "highest saved view count"
      : `highest saved ${metricLabel.toLowerCase()} count`;
  const title = askEmyProductMetricTitle(metric, false);
  const bars = askEmyProductAnalyticsBars([record], metric);
  const analytics = askEmyProductAnalyticsPayload(title, metric, bars);
  const topItem = bars[0] || askEmyProductAnalyticsItem(record, metric);
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      `${title}\n${topLine} ${topItem.label || "this product"} with ${top.metricCount} ${askEmyProductMetricUnit(metric, top.metricCount)}.`,
      askEmyFormatSection("Product statistics chart", askEmyProductChartLines(bars, metric)),
      askEmyFormatSection("Text bar", askEmyProductTextBarLines(bars, metric)),
      askEmyFormatSection("Details", askEmyProductDetailsLines(topItem)),
      askEmyFormatSection("Insight", [
        `This is the one product with the ${meaningMetric} I can see in EMY.`,
        "It is an EMY interest signal from saved product activity."
      ]),
      askEmyFormatSection("Next action", [askEmyProductNextAction(metric)])
    ].filter(Boolean)),
    provider,
    results: [record],
    analytics
  };
}

function askEmyProductDemandBundle(recordsInput, query, payload = {}) {
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const contextualQuery = askEmyContextualQuery(query, payload || {});
  const metric = askEmyProductMetricFromQuestion(query);
  const metricLabel = askEmyProductMetricLabel(metric);
  const limit = askEmyProductLimitFromQuery(query, 8);
  const available = askEmyFilterRecordsForQuery(allRecords, contextualQuery, payload || {});
  const businessTargetScope = askEmyBusinessTargetFromFollowUpContext(query, payload || {}, available);
  const scopedRecords = businessTargetScope ? askEmyRecordsForBusinessTarget(available, businessTargetScope) : available;
  const seen = new Set();
  const products = scopedRecords.filter((record) => clean(record && record.type).toLowerCase() === "product")
    .filter((record) => {
      const key = askEmyVisibleRecordKey(record);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const marked = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(products, payload || {}), payload || {});
  const ranked = marked.map((record) => {
    const actionScore = askEmyProductActionScore(record);
    const activityScore = askEmyProductActivityScore(record);
    const metricCount = metric === "engagement" ? activityScore : askEmyProductMetricCount(record, metric);
    return { record, actionScore, activityScore, metricCount, dateScore: Date.parse(clean(record.date)) || 0 };
  });
  const hasActionData = ranked.some((entry) => entry.actionScore > 0);
  ranked.sort((a, b) => {
    const primary = metric === "engagement"
      ? (hasActionData ? b.actionScore - a.actionScore : b.activityScore - a.activityScore)
      : b.metricCount - a.metricCount;
    return primary || b.activityScore - a.activityScore || b.dateScore - a.dateScore || clean(a.record.name).localeCompare(clean(b.record.name));
  });
  const results = ranked.slice(0, limit).map((entry, index) => {
    const signal = metric === "engagement"
      ? askEmyProductDemandSignalText(entry.record, hasActionData)
      : `${entry.metricCount} ${askEmyProductMetricUnit(metric, entry.metricCount)}`;
    const tags = Array.isArray(entry.record.tags) ? entry.record.tags.slice(0, 5) : [];
    [`#${index + 1}`, metricLabel].reverse().forEach((tag) => {
      if (!tags.some((item) => clean(item).toLowerCase() === tag.toLowerCase())) tags.unshift(tag);
    });
    return {
      ...entry.record,
      demandRank: index + 1,
      demandBasis: `product-${metric}`,
      demandSignal: signal,
      demandScore: metric === "engagement" ? (hasActionData ? entry.actionScore : entry.activityScore) : entry.metricCount,
      demandMetric: metric,
      demandMetricLabel: metricLabel,
      demandMetricCount: entry.metricCount,
      tags: tags.slice(0, 5)
    };
  });
  return {
    intent: "product",
    requestedTypes: ["product"],
    results,
    allResults: ranked.map((entry, index) => ({ ...entry.record, demandRank: index + 1 })),
    totalMatches: ranked.length,
    contextualQuery,
    hasActionData,
    metric,
    metricLabel,
    limit,
    businessTargetScope: businessTargetScope ? {
      name: clean(businessTargetScope.name),
      key: clean(businessTargetScope.key),
      ownedByViewer: askEmyTargetIsOwnedByViewer(businessTargetScope, payload || {})
    } : null
  };
}

function askEmyProductDemandAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "") {
  const bundle = askEmyProductDemandBundle(recordsInput, query, payload || {});
  const results = Array.isArray(bundle.results) ? bundle.results : [];
  const metric = bundle.metric || askEmyProductMetricFromQuestion(query);
  const metricLabel = bundle.metricLabel || askEmyProductMetricLabel(metric);
  const title = askEmyProductMetricTitle(metric, true);
  if (!results.length) {
    return {
      answer: `I could not find any product ${askEmyProductMetricUnit(metric, 2)} data for your business.`,
      provider,
      results: [],
      analytics: askEmyProductAnalyticsPayload(title, metric, [])
    };
  }
  const total = Number(bundle.totalMatches) || results.length;
  const scopedBusiness = bundle.businessTargetScope && bundle.businessTargetScope.name ? bundle.businessTargetScope : null;
  const shownLine = total > results.length
    ? `I ranked ${total} products and I am showing the first ${results.length}.`
    : `I ranked ${total} product${total === 1 ? "" : "s"} here.`;
  const bars = askEmyProductAnalyticsBars(results.slice(0, 5), metric);
  const analytics = askEmyProductAnalyticsPayload(title, metric, bars);
  const topItem = bars[0] || null;
  const opening = topItem
    ? `${title}\n${topItem.label} is leading with ${topItem.value} ${askEmyProductMetricUnit(metric, topItem.value)}.`
    : `${title}\nI can rank the product signals I can see in EMY.`;
  const rankingBasis = bundle.hasActionData
    ? [
        metric === "engagement" ? "Ranking uses saved enquiry, contact, message, and customer-interest signals first." : `Ranking uses saved ${metricLabel.toLowerCase()} first.`,
        "Likes, saves, views, comments, stock, and media help break ties."
      ]
    : [
        `Ranking uses saved product ${metricLabel.toLowerCase()} from EMY records.`,
        "Product names are shown before the metric so the numbers are tied to the right product.",
        "EMY products are listings inside the platform, so I use interest and action signals only."
      ];
  return {
    answer: askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      [opening, shownLine].join("\n"),
      scopedBusiness ? askEmyFormatSection("Business context", [
        scopedBusiness.ownedByViewer ? `Your business: ${scopedBusiness.name}` : `Business: ${scopedBusiness.name}`
      ]) : "",
      askEmyFormatSection("Ranking basis", rankingBasis),
      askEmyFormatSection("Product statistics chart", askEmyProductChartLines(bars, metric)),
      askEmyFormatSection("Text bars", askEmyProductTextBarLines(bars, metric)),
      topItem ? askEmyFormatSection("Details", [
        `Top product: ${topItem.label}`,
        ...askEmyProductDetailsLines(topItem)
      ]) : "",
      askEmyFormatSection("Top insight", [askEmyProductTopInsight(bars, metric)]),
      askEmyFormatSection("Next step", [
        askEmyProductNextAction(metric),
        "Ask for one product if you want only the leader, or ask for top products if you want the ranked chart."
      ])
    ]),
    provider,
    results,
    analytics
  };
}

function askEmySimilarJobKey(record) {
  if (!record || String(record.type || "").toLowerCase() !== "job") return "";
  return [
    record.businessKey || record.business,
    record.jobTitle || record.name,
    record.jobLocation || record.place,
    record.employment,
    record.workplace,
    record.experience,
    record.apply
  ].map((value) => clean(value).toLowerCase()).join("|");
}

function askEmyMarkSimilarJobPosts(results = []) {
  const rows = Array.isArray(results) ? results : [];
  const groups = new Map();
  rows.forEach((record, index) => {
    const key = askEmySimilarJobKey(record);
    if (!key) return;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(index);
  });
  return rows.map((record, index) => {
    const key = askEmySimilarJobKey(record);
    const group = key ? groups.get(key) : null;
    if (!group || group.length < 2) return record;
    const position = group.indexOf(index) + 1;
    return {
      ...record,
      similarListingIndex: position,
      similarListingCount: group.length,
      similarListingLabel: `Similar post ${position} of ${group.length}`,
      similarListingNote: `${group.length} separate job posts share the same role details.`
    };
  });
}

function askEmySearchResultBundle(recordsInput, query, payload, plan = null) {
  if (askEmyIsJobApplyFollowUp(query, payload || {})) {
    const results = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(askEmyMarkSimilarJobPosts(askEmyJobApplyRecords(recordsInput, query, payload || {}, 4)), payload || {}), payload || {});
    return {
      intent: "job",
      requestedTypes: ["job"],
      results,
      totalMatches: results.length,
      contextualQuery: askEmyContextualQuery(query, payload || {})
    };
  }
  const contextualQuery = askEmyContextualQuery(query, payload || {});
  const available = askEmyFilterRecordsForQuery(Array.isArray(recordsInput) ? recordsInput : [], contextualQuery, payload || {});
  const brain = askEmyAssistantBrain(query, payload || {});
  const intent = brain.intent;
  if (intent === "conversation" || intent === "analytics" || intent === "unclear" || intent === "map-area" || intent === "location-info" || intent === "customer") {
    return { intent, requestedTypes: [], results: [], totalMatches: 0, contextualQuery };
  }
  const requestedTypes = askEmyResolvedRequestedTypes(query, payload || {});
  const canUseBusinessScope = ["service", "product", "job", "event", "clip", "article", "post"].includes(intent)
    || requestedTypes.some((type) => ["service", "product", "job", "event", "clip", "article", "post"].includes(type));
  const businessTargetScope = canUseBusinessScope ? askEmyBusinessTargetFromFollowUpContext(query, payload || {}, available) : null;
  const scopedRecords = businessTargetScope ? askEmyRecordsForBusinessTarget(available, businessTargetScope) : available;
  const allMatches = askEmySelectVisibleResults(scopedRecords, contextualQuery, intent, Math.max(scopedRecords.length, ASK_EMY_MAX_CONTEXT_RECORDS), requestedTypes);
  const markedMatches = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(askEmyMarkSimilarJobPosts(allMatches), payload || {}), payload || {});
  const plannedLimit = Number(plan && plan.limit) > 0 ? Math.min(Number(plan.limit), 25) : 0;
  const limit = plannedLimit || (askEmyIsBroadProductQuery(contextualQuery, intent, requestedTypes)
    ? 8
    : askEmyResultLimitForIntent(intent, requestedTypes));
  return {
    intent,
    requestedTypes,
    results: markedMatches.slice(0, limit),
    totalMatches: markedMatches.length,
    allResults: markedMatches,
    contextualQuery,
    suggestionRecords: (Array.isArray(recordsInput) ? recordsInput : available).slice(0, ASK_EMY_MAX_CONTEXT_RECORDS),
    businessTargetScope: businessTargetScope ? {
      name: clean(businessTargetScope.name),
      key: clean(businessTargetScope.key),
      ownedByViewer: askEmyTargetIsOwnedByViewer(businessTargetScope, payload || {})
    } : null
  };
}

function askEmyInferResultIntentFromText(value) {
  const text = clean(value).toLowerCase();
  if (/\b(job|jobs|job opening|hiring|hire|role|vacancy|apply|cv|resume)\b/.test(text)) return "job";
  if (/\b(product|products|price|prices|available|stock|buy|cheapest|cost|tomatoe?s?)\b/.test(text)) return "product";
  if (/\b(service|services|support|logistics|supplier|suppliers|legal|financial|finance|advice|insight|customer experience)\b/.test(text)) return "service";
  if (/\b(event|events|booking|workshop|class|meetup)\b/.test(text)) return "event";
  if (/\b(clip|clips|video|videos|reel|reels)\b/.test(text)) return "clip";
  if (/\b(article|articles|blog|news)\b/.test(text)) return "article";
  if (/\b(post|posts|feed|feeds|update|updates)\b/.test(text)) return "post";
  if (/\b(business|businesses|shop|shops|store|stores|nearby|near me)\b/.test(text)) return "business";
  return "";
}

function askEmyIntentQueryWord(intent) {
  if (intent === "business") return "businesses";
  if (intent === "article") return "articles";
  return `${intent}s`;
}

function askEmyRecoverResultBundleFromAnswer(recordsInput, query, payload, answer, currentBundle) {
  if (currentBundle && Array.isArray(currentBundle.results) && currentBundle.results.length) return currentBundle;
  const inferredIntent = askEmyInferResultIntentFromText(`${answer} ${askEmyHistoryText(payload || {})}`);
  if (!inferredIntent) return currentBundle;
  const recovered = askEmySearchResultBundle(recordsInput, `${askEmyIntentQueryWord(inferredIntent)} ${query || ""}`.trim(), payload || {});
  return recovered && recovered.results && recovered.results.length ? recovered : currentBundle;
}

function askEmyResultDetailTitle(intent, requestedTypes = []) {
  if (Array.isArray(requestedTypes) && requestedTypes.length > 1) return "Matches";
  const titles = {
    business: "Businesses",
    product: "Products",
    job: "Jobs",
    event: "Events",
    service: "Services",
    clip: "Clips",
    article: "Articles",
    post: "Posts"
  };
  return titles[intent] || "Details";
}

function askEmyRecordMediaSummary(record) {
  if (!record) return "";
  if (record.video) return "Video available";
  if (record.coverImage || record.profileImage || record.image) return "Image available";
  return "";
}

function askEmyResultDetailLines(intent, results = []) {
  const rows = Array.isArray(results) ? results.slice(0, 4) : [];
  const lines = [];
  rows.forEach((record, index) => {
    const type = askEmyText(record && record.type, 80).toLowerCase() || intent;
    const title = askEmyText(record && record.name, 160) || `${type} result`;
    lines.push(`${index + 1}. ${title}`);
    if (type !== "business" && record && record.business && record.business !== record.name) lines.push(`- Business: ${record.business}`);
    if (record && record.isOwnedByViewer) lines.push(`- Ownership: ${record.ownerNotice || askEmyOwnerNoticeForRecord(record)}`);
    if (record && record.relationshipNotice) lines.push(`- Relationship: ${record.relationshipNotice}`);
    if (type === "business") {
      const place = askEmyDisplayPlace(record.address || record.place);
      lines.push(`- Location: ${place || "Not saved yet"}`);
      const description = askEmyText(record.businessDescription || record.desc, 420);
      if (description) lines.push(`- Description: ${description}`);
      const offer = askEmyText(record.businessOffer, 360);
      if (offer) lines.push(`- What they offer: ${offer}`);
      if (record.category) lines.push(`- Category: ${record.category}`);
      if (record.phone) lines.push(`- Phone: ${record.phone}`);
      if (record.email) lines.push(`- Email: ${record.email}`);
      if (record.website) lines.push(`- Website: ${record.website}`);
      if (record.openingHours) lines.push(`- Opening hours: ${record.openingHours}`);
      const mediaSummary = askEmyRecordMediaSummary(record);
      if (mediaSummary) lines.push(`- Media: ${mediaSummary}`);
      if (record.recentActivity) lines.push(`- Recent update: ${record.recentActivity}`);
      return;
    }
    if (type === "product") {
      if (record.price) lines.push(`- Price: ${record.price}`);
      if (record.availability) lines.push(`- Availability: ${record.availability}`);
      if (record.category) lines.push(`- Category: ${record.category}`);
      if (record.place) lines.push(`- Area: ${record.place}`);
      return;
    }
    if (type === "job") {
      lines.push(`- Location: ${askEmyDisplayPlace(record.jobLocation || record.place) || "To confirm"}`);
      if (record.employment) lines.push(`- Employment: ${record.employment}`);
      if (record.workplace) lines.push(`- Workplace: ${record.workplace}`);
      if (record.similarListingLabel) lines.push(`- Similar listing: ${record.similarListingLabel}. ${record.similarListingNote || "Separate post with matching role details."}`);
      if (record.notes && record.notes !== record.desc) lines.push(`- Notes: ${record.notes}`);
      if (record.apply) lines.push(`- Apply: ${record.apply}`);
      return;
    }
    if (record.place) lines.push(`- Area: ${record.place}`);
    if (record.category) lines.push(`- Category: ${record.category}`);
    if (record.price) lines.push(`- Price: ${record.price}`);
    if (record.date) lines.push(`- Date: ${askEmyDisplayDate(record.date)}`);
    if (record.desc) lines.push(`- About: ${record.desc}`);
  });
  return lines;
}

function askEmyHumanResultOpening(intent, total, noun) {
  if (!total) return `I could not find ${noun} in this search area yet.`;
  if (total === 1) return `I found 1 ${noun} for you.`;
  if (intent === "job") return `There are ${total} ${noun} in this search area.`;
  if (intent === "business") return `I found ${total} ${noun} around this area.`;
  if (intent === "product") return `I found ${total} ${noun} that match this search.`;
  if (intent === "clip") return `I found ${total} ${noun} for you.`;
  return `I found ${total} ${noun} for you.`;
}

function askEmyNoResultsLines(intent, requestedTypes = [], payload, query = "") {
  const terms = askEmySpecificQueryTerms(query);
  const item = terms.length ? terms.join(" ") : intent === "product" || requestedTypes.includes("product") ? "that product" : "that";
  const wantsProduct = intent === "product" || requestedTypes.includes("product");
  const wantsBusiness = intent === "business" || requestedTypes.includes("business");
  const location = askEmyText(payload && payload.location, 120) || "this area";
  const radius = askEmyRadiusLabel(payload && payload.radius);
  if (wantsProduct) {
    if (!terms.length) {
      return [
        `I don't see any products near ${location} within ${radius} right now.`,
        "Try widening the radius, changing the location, or asking for a specific product name or category."
      ];
    }
    return [
      `I'm afraid I don't see a product listed on EMY for ${item} near ${location} within ${radius} right now.`,
      "Try widening the radius, changing the location, or searching for a broader product category."
    ];
  }
  if (wantsBusiness) {
    return [
      `I don't see any saved business profiles or shops near ${location} within ${radius} right now.`,
      "I will only count actual business profiles here, not clips, jobs, posts, or products from a business."
    ];
  }
  return [
    `I'm afraid I don't see a matching result near ${location} within ${radius} right now.`,
    "Try widening the radius, changing the location, or searching for something a little different."
  ];
}

function askEmyTopIdeaLabels(values = [], limit = 3) {
  const counts = new Map();
  (Array.isArray(values) ? values : []).forEach((value) => {
    const label = clean(value);
    if (!label || /^(near me|not saved yet|location to confirm|to confirm|0\s*,\s*0)$/i.test(label)) return;
    if (askEmyLooksLikePlaceholderText(label)) return;
    const key = label.toLowerCase();
    const current = counts.get(key) || { label, count: 0 };
    current.count += 1;
    counts.set(key, current);
  });
  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, limit)
    .map((item) => item.label);
}

function askEmyRecordPlaceIdea(record = {}) {
  return askEmyDisplayPlace(record.address || record.businessAddress || record.place || record.location || record.town || record.city || record.postcode);
}

function askEmyNoResultSuggestionSections(intent, requestedTypes = [], payload = {}, query = "", recordsInput = []) {
  const records = Array.isArray(recordsInput) ? recordsInput : [];
  const wantsProduct = intent === "product" || requestedTypes.includes("product");
  const wantsBusiness = intent === "business" || requestedTypes.includes("business");
  const wantsDirections = intent === "directions";
  const currentRadius = Number(payload && payload.radius);
  const nextRadius = Number.isFinite(currentRadius) && currentRadius < 10 ? Math.min(10, Math.max(currentRadius + 5, 10)) : 10;
  const tryNext = [];
  if (wantsDirections) {
    tryNext.push("Search for a saved EMY business or saved place that already has an address or map pin.");
    tryNext.push("Add the destination as a saved place or business location if it should appear in EMY Maps.");
  } else if (wantsProduct) {
    tryNext.push(Number.isFinite(currentRadius) && currentRadius < 10 ? `Open the radius from ${askEmyRadiusLabel(currentRadius)} to ${askEmyRadiusLabel(nextRadius)}.` : "Try another saved location if the radius is already wide.");
    tryNext.push("Search a broader product category first, then narrow it down again.");
  } else if (wantsBusiness) {
    tryNext.push(Number.isFinite(currentRadius) && currentRadius < 10 ? `Open the radius from ${askEmyRadiusLabel(currentRadius)} to ${askEmyRadiusLabel(nextRadius)}.` : "Try another saved location if the radius is already wide.");
    tryNext.push("Try a broader business category, then filter by products, services, or opening hours.");
  } else {
    tryNext.push(Number.isFinite(currentRadius) && currentRadius < 10 ? `Open the radius from ${askEmyRadiusLabel(currentRadius)} to ${askEmyRadiusLabel(nextRadius)}.` : "Try another saved location if the radius is already wide.");
    tryNext.push("Try a broader term, then ask me to narrow the results.");
  }

  const productCategories = askEmyTopIdeaLabels(records
    .filter((record) => clean(record && record.type).toLowerCase() === "product")
    .map((record) => record.category || record.productCategory || record.typeLabel), 3);
  if (wantsProduct && productCategories.length) {
    tryNext.push(`Active product categories on EMY include ${productCategories.join(", ")}.`);
  }

  const places = askEmyTopIdeaLabels(records
    .filter((record) => wantsDirections ? clean(record && record.type).toLowerCase() === "business" : true)
    .map(askEmyRecordPlaceIdea), 3);
  const sections = [
    askEmyFormatSection("Try next", tryNext)
  ];
  if (places.length) {
    sections.push(askEmyFormatSection("Places to try", places.map((place) => `Search around ${place}.`)));
  } else if (wantsProduct || wantsBusiness) {
    sections.push(askEmyFormatSection("Places to try", [
      "Use the location selector to try another saved place or postcode.",
      "Try areas where EMY businesses have proper addresses or map pins saved."
    ]));
  }
  if (wantsProduct || (!wantsBusiness && /\b(buy|buying|sell|selling|shop|shops|product|products)\b/i.test(query))) {
    sections.push(askEmyFormatSection("Product insight", [
      "I do not have enough EMY enquiry, message, view, save, like, or customer-interest data yet to say where interest is strongest.",
      "For now, I can use EMY activity signals: product count, likes, saves, views, recent posts, and active business profiles.",
      "When enquiry, message, and customer-interest stats are connected, I can rank stronger interest hotspots without guessing."
    ]));
  }
  return sections;
}

function askEmyMarkdownTableCell(value, fallback = "Not saved") {
  const text = clean(value).replace(/\|/g, "/").replace(/\s+/g, " ").trim();
  return text || fallback;
}

function askEmyProductSignalSummary(record) {
  const bits = [];
  const views = Number(record && (record.viewCount || record.views || record.productViews || record.visitCount)) || 0;
  const likes = Number(record && (record.likeCount || record.likes || record.likedCount)) || 0;
  const saves = Number(record && (record.saveCount || record.saves || record.savedCount)) || 0;
  if (views) bits.push(`${views} view${views === 1 ? "" : "s"}`);
  if (likes) bits.push(`${likes} like${likes === 1 ? "" : "s"}`);
  if (saves) bits.push(`${saves} save${saves === 1 ? "" : "s"}`);
  return bits.join(", ") || "No activity saved";
}

function askEmyProductComparisonTable(results = []) {
  const products = (Array.isArray(results) ? results : []).filter((record) => record && clean(record.name)).slice(0, 4);
  if (products.length < 2) return "";
  const rows = products.map((record) => [
    askEmyMarkdownTableCell(record.name),
    askEmyMarkdownTableCell(record.price),
    askEmyMarkdownTableCell(record.availability || record.stockStatus || record.statusText),
    askEmyMarkdownTableCell(record.business || record.place),
    askEmyMarkdownTableCell(askEmyProductSignalSummary(record))
  ]);
  return [
    "Quick comparison",
    "",
    "| Product | Price | Stock | Business | Signals |",
    "| --- | --- | --- | --- | --- |",
    ...rows.map((row) => `| ${row.join(" | ")} |`)
  ].join("\n");
}

function askEmyStructuredSearchAnswer(bundle, payload, prefix = "") {
  const intent = bundle && bundle.intent || "general";
  const requestedTypes = bundle && Array.isArray(bundle.requestedTypes) ? bundle.requestedTypes : [];
  const total = Number(bundle && bundle.totalMatches) || 0;
  const shown = Array.isArray(bundle && bundle.results) ? bundle.results.length : 0;
  const location = askEmyText(payload && payload.location, 120) || "your saved location";
  const radius = askEmyRadiusLabel(payload && payload.radius);
  const noun = askEmyResultNoun(intent, requestedTypes, total);
  const countLine = askEmyHumanResultOpening(intent, total, noun);
  const broadProductQuery = askEmyIsBroadProductQuery(bundle && bundle.contextualQuery || "", intent, requestedTypes);
  const productComparisonQuery = askEmyIsProductComparisonQuery(bundle && bundle.contextualQuery || "", intent, requestedTypes);
  const scopedBusiness = bundle && bundle.businessTargetScope && bundle.businessTargetScope.name ? bundle.businessTargetScope : null;
  const scopeLine = scopedBusiness
    ? scopedBusiness.ownedByViewer
      ? `I used your business, ${scopedBusiness.name}, as the context for this search.`
      : `I used ${scopedBusiness.name} as the business context from this chat.`
    : "";
  const ownedShown = (bundle && Array.isArray(bundle.results) ? bundle.results : []).filter((record) => record && record.isOwnedByViewer).length;
  const ownershipLine = ownedShown
    ? ownedShown === 1
      ? "I marked the result that belongs to your business."
      : `I marked ${ownedShown} results that belong to your business.`
    : "";
  const relationshipShown = (bundle && Array.isArray(bundle.results) ? bundle.results : []).filter((record) => record && record.relationshipNotice).length;
  const relationshipLine = relationshipShown
    ? relationshipShown === 1
      ? "I also marked the result that you follow or are already a customer of."
      : `I also marked ${relationshipShown} results that you follow or are already a customer of.`
    : "";
  if (!total) {
    const scopedNoResult = scopedBusiness
      ? intent === "product"
        ? `I don't see any products saved for ${scopedBusiness.name} yet.`
        : `I don't see matching ${askEmyResultNoun(intent, requestedTypes, 2)} saved for ${scopedBusiness.name} yet.`
      : "";
    return askEmyFormatReply([
      prefix ? askEmyFormatSection("Note", [prefix]) : "",
      scopedNoResult || askEmyNoResultsLines(intent, requestedTypes, payload || {}, bundle && bundle.contextualQuery || "").join("\n"),
      scopedBusiness ? askEmyFormatSection("Business context", [
        scopedBusiness.ownedByViewer ? `Your business: ${scopedBusiness.name}` : `Business: ${scopedBusiness.name}`,
        "Try asking for this business's posts, clips, jobs, services, or add products from the business backend."
      ]) : "",
      askEmyFormatSection("Search area", [
        `Location: ${location}`,
        `Radius: ${radius}`
      ]),
      ...askEmyNoResultSuggestionSections(intent, requestedTypes, payload || {}, bundle && bundle.contextualQuery || "", bundle && bundle.suggestionRecords || [])
    ]);
  }
  const shownLine = productComparisonQuery && shown
    ? total > shown
      ? `I used the first ${shown} product options for a quick comparison below.`
      : "I used the product options shown below for a quick comparison."
    : broadProductQuery && shown
    ? total > shown
      ? `I'm showing the first ${shown} examples so it stays easy to scan.`
      : "I'm showing them as product cards so you can compare them quickly."
    : total > shown
      ? `I'm showing the first ${shown} here so the page stays easy to read.`
      : shown > 1
        ? "I'm showing all of them here."
        : "";
  const productIntroLine = intent === "product" && total
    ? scopedBusiness
      ? productComparisonQuery
        ? `Yes. Here is a quick comparison of the products I can see from ${scopedBusiness.ownedByViewer ? `your business, ${scopedBusiness.name}` : scopedBusiness.name}. ${shownLine || ""}`
        : `I found ${total} ${noun} from ${scopedBusiness.ownedByViewer ? `your business, ${scopedBusiness.name}` : scopedBusiness.name}. ${shownLine || "I'm keeping the first matches here so it stays easy to scan."}`
      : productComparisonQuery
        ? [`Yes. Here is a quick comparison of the product options I can see.`, shownLine].filter(Boolean).join(" ")
        : [countLine, shownLine].filter(Boolean).join(" ")
    : "";
  const openingText = productIntroLine || [countLine, scopeLine, ownershipLine, relationshipLine, shownLine].filter(Boolean).join("\n");
  const intentLine = intent === "job"
    ? "Open a job card to view it on the business profile and apply or message the business from there."
    : intent === "product"
      ? "Open any product card below to view images, price, stock, likes, and the business profile."
      : intent === "service"
        ? "Open a service provider card to view the business profile."
        : "";
  const cheapest = intent === "product" ? (bundle.results || [])
    .filter((record) => record.price)
    .sort((a, b) => Number(String(a.price).replace(/[^0-9.]/g, "")) - Number(String(b.price).replace(/[^0-9.]/g, "")))[0] : null;
  const cheapestLine = cheapest ? `Cheapest here: ${cheapest.name} at ${cheapest.price}.` : "";
  const productComparisonTable = intent === "product" && productComparisonQuery && shown >= 2
    ? askEmyProductComparisonTable(bundle && bundle.results || [])
    : "";
  const productNarrowLines = intent === "product" ? [
    productComparisonQuery
      ? "Ask me to compare two by name if you want a tighter answer."
      : broadProductQuery
      ? "To narrow this down, tell me the product name, category, price range, or business you want."
      : "Tell me a product, category, price range, or business if you want me to narrow this down.",
    productComparisonQuery ? "I can compare price, stock, views, likes, saves, and business details using the records saved in EMY." : "",
    broadProductQuery ? "I can show a few strong matches first, then open up more if you want a bigger list." : "",
    "You can ask things like products under 10 GBP, food and drink, or products from HONEY SHOP.",
  ] : [];
  const detailLines = intent === "product" && shown ? [] : askEmyResultDetailLines(intent, bundle && bundle.results || []);
  return askEmyFormatReply([
    prefix ? askEmyFormatSection("Note", [prefix]) : "",
    openingText,
    productComparisonTable,
    detailLines.length ? askEmyFormatSection(askEmyResultDetailTitle(intent, requestedTypes), detailLines) : "",
    scopedBusiness && intent !== "product" ? askEmyFormatSection("Business context", [
      scopedBusiness.ownedByViewer ? `Your business: ${scopedBusiness.name}` : `Business: ${scopedBusiness.name}`
    ]) : "",
    askEmyFormatSection("Search area", [
      `Location: ${location}`,
      `Radius: ${radius}`,
    ]),
    intentLine ? askEmyFormatSection("Next step", [intentLine]) : "",
    productNarrowLines.length ? askEmyFormatSection("Narrow it down", productNarrowLines) : "",
    cheapestLine ? askEmyFormatSection("Price note", [cheapestLine]) : "",
  ]);
}

function askEmyMoreResultsResponse(bundle, payload, prefix = "") {
  const intent = bundle && bundle.intent || "general";
  const requestedTypes = bundle && Array.isArray(bundle.requestedTypes) ? bundle.requestedTypes : [];
  const total = Number(bundle && bundle.totalMatches) || 0;
  const previousShown = Math.min(total, askEmyPreviousShownCount(payload || {}, intent) || 0);
  const limit = askEmyResultLimitForIntent(intent, requestedTypes);
  const allResults = Array.isArray(bundle && bundle.allResults) ? bundle.allResults : Array.isArray(bundle && bundle.results) ? bundle.results : [];
  const nextResults = total > previousShown ? allResults.slice(previousShown, previousShown + limit) : [];
  const noun = askEmyResultNoun(intent, requestedTypes, total);
  const location = askEmyText(payload && payload.location, 120) || "your saved location";
  const radius = askEmyRadiusLabel(payload && payload.radius);
  const broadNoun = intent === "product" ? "products" : intent === "job" ? "jobs" : "results";
  const opening = total <= previousShown
    ? `No more saved ${noun} are available in this search area right now. I can see ${total} total, and ${previousShown || total} already shown above.`
    : `Yes. I can see ${total - previousShown} more saved ${noun} after the ${previousShown} already shown. Showing the next ${nextResults.length} here.`;
  return {
    answer: askEmyFormatReply([
      `${prefix}${opening}`,
      askEmyFormatSection("Search area", [
        `Location: ${location}`,
        `Radius: ${radius}`,
      ]),
      askEmyFormatSection(total <= previousShown ? "Options" : "Next step", [
        total <= previousShown
          ? `Open the radius filter and widen the search area; that may find more ${broadNoun} nearby.`
          : "Open one of the extra cards below, or ask me to widen the radius if you want more options.",
        total <= previousShown ? "Try a different location if you can travel a little further." : "",
        total <= previousShown && intent === "job" ? "Is there a specific type of job you are looking for?" : "",
        total <= previousShown && intent === "product" ? "Is there a specific product, category, price range, or business you are looking for?" : "",
        total <= previousShown && intent === "job" ? "Ask for jobs from businesses you follow." : "",
        total <= previousShown && intent === "product" ? "Ask for products from businesses you follow." : "",
        total > previousShown && intent === "product" ? "If these are too broad, tell me the product name, category, price range, or business and I will narrow it down." : "",
      ]),
    ]),
    results: nextResults
  };
}

function askEmyScoreRecord(record, query, intent) {
  const text = clean(query).toLowerCase();
  const haystack = [
    record.type,
    record.name,
    record.business,
    record.place,
    record.desc,
    record.price,
    ...(record.tags || [])
  ].join(" ").toLowerCase();
  const words = text.split(/[^a-z0-9.]+/).filter(Boolean);
  const wordScore = words.reduce((score, word) => score + (haystack.includes(word) ? 1 : 0), 0);
  const intentScore = intent !== "general" && record.type === intent ? 8 : 0;
  const nearbyScore = /\b(near|nearby|around|local)\b/.test(text) && /near|local|mi|km|street|road|london/i.test([record.place, record.desc].join(" ")) ? 2 : 0;
  return intentScore + nearbyScore + wordScore;
}

function askEmyFirstNameFromPayload(payload = {}) {
  const user = payload && payload.user && typeof payload.user === "object" ? payload.user : {};
  const cleanPart = (value) => clean(value).replace(/\s+/g, " ").trim();
  const direct = cleanPart(user.firstName || user.customerFirstName || user.givenName);
  const display = cleanPart(user.displayName || user.name || user.profileName);
  const businessName = cleanPart(user.businessName || user.business);
  const candidate = direct || (display && display.toLowerCase() !== businessName.toLowerCase() ? display.split(" ")[0] : "");
  if (!candidate || /^(emy|customer|business|account|test|user)$/i.test(candidate)) return "";
  return candidate.slice(0, 32);
}

function askEmyGreetingPrefix(payload = {}) {
  const firstName = askEmyFirstNameFromPayload(payload);
  return firstName ? `Hi ${firstName}.` : "Hi.";
}

function askEmyIsSimpleGreetingQuery(query) {
  return /^(hi|hello|hey|good morning|good afternoon|good evening)[.!?]*$/i.test(clean(query));
}

function askEmyHasRepeatedGreeting(query, payload = {}) {
  if (!askEmyIsSimpleGreetingQuery(query)) return false;
  const current = clean(query).toLowerCase();
  const history = Array.isArray(payload && payload.history) ? payload.history : [];
  const userGreetings = history
    .filter((message) => message && message.role === "user" && askEmyIsSimpleGreetingQuery(message.text))
    .map((message) => clean(message.text).toLowerCase());
  const includesCurrent = userGreetings.includes(current);
  return includesCurrent ? userGreetings.length > 1 : userGreetings.length > 0;
}

function askEmyGreetingHistoryCount(payload = {}) {
  const history = Array.isArray(payload && payload.history) ? payload.history : [];
  return history.filter((message) => message && message.role === "user" && askEmyIsSimpleGreetingQuery(message.text)).length;
}

function askEmySimpleGreetingLabel(query) {
  const text = clean(query).toLowerCase();
  if (/^good morning\b/.test(text)) return "Good morning";
  if (/^good afternoon\b/.test(text)) return "Good afternoon";
  if (/^good evening\b/.test(text)) return "Good evening";
  if (/^hello\b/.test(text)) return "Hello";
  if (/^hey\b/.test(text)) return "Hey";
  return "Hi";
}

function askEmySimpleGreetingAnswer(query, payload = {}) {
  const label = askEmySimpleGreetingLabel(query);
  const firstName = askEmyFirstNameFromPayload(payload);
  const greetingCount = askEmyGreetingHistoryCount(payload);
  const namePart = firstName && greetingCount === 0 ? `, ${firstName}` : "";
  return `${label}${namePart}. How are you?`;
}

function askEmyConversationalAnswer(query, payload = {}) {
  const text = clean(query).toLowerCase();
  const raw = String(query || "");
  const greeting = askEmyGreetingPrefix(payload);
  const firstName = askEmyFirstNameFromPayload(payload);
  const nameSuffix = firstName ? `, ${firstName}` : "";
  if (askEmyIsOpenConversationPrompt(query)) {
    return "Sure. What would you like me to tell you?";
  }
  if (askEmyIsConversationalFragmentQuery(query)) {
    return "I didn't catch that. Say it another way and I'll follow you.";
  }
  if (askEmyIsUnsupportedCrossEntityAnalyticsQuery(query)) {
    return askEmyUnsupportedCrossEntityAnalyticsAnswer();
  }
  if (askEmyIsAnalyticsCapabilityQuestion(query)) {
    return askEmyAnalyticsCapabilityAnswer();
  }
  if (askEmyIsSocialChatQuery(query)) {
    return askEmySocialChatAnswer(raw, firstName);
  }
  if (askEmyIsBareActionNounQuery(query)) {
    return askEmyBareActionNounAnswer(query, firstName);
  }
  if (askEmyIsSimpleGreetingQuery(query)) {
    return askEmySimpleGreetingAnswer(query, payload);
  }
  if (/\b(test|testing|try|checking|check)\b/.test(text)) {
    return `${greeting} You can ask naturally, like what should I do next, help me set up my business, find suppliers, compare products, or understand what is happening in EMY.`;
  }
  if (/\b(how are you|how's your day|how is your day|what's up|whats up|how is it going|how's it going)\b/.test(text)) {
    return `I'm doing well${nameSuffix}. Tell me what you are trying to do in EMY, and I will help you think it through or move to the right place.`;
  }
  if (/\b(thanks|thank you)\b/.test(text)) {
    return `You're welcome${nameSuffix}. I'm here whenever you want help with EMY.`;
  }
  return `${greeting} Tell me what you want to do, and I will help you find the next step in EMY.`;
}

function askEmyBareActionNounAnswer(query, firstName = "") {
  const text = clean(query).toLowerCase();
  const prefix = firstName ? `${firstName}, ` : "";
  if (/\b(stats?|statistics|analytics|data|performance|insights?|views?|likes?|saves?|engagement|sales|orders?|revenue)\b/.test(text)) {
    return `${prefix}do you want me to show your statistics here, explain what the stats mean, or check one specific metric?`;
  }
  if (/\b(products?|items?|stock|listings?)\b/.test(text)) {
    return `${prefix}do you mean show your products, find products to view, or help create or improve a product listing?`;
  }
  if (/\b(customers?|clients?)\b/.test(text)) {
    return `${prefix}do you want to see customer relationships, find customers, or open a customer profile?`;
  }
  if (/\b(jobs?|roles?)\b/.test(text)) {
    return `${prefix}do you want to find jobs, create a job post, or check applicants?`;
  }
  if (/\b(clips?|videos?|reels?)\b/.test(text)) {
    return `${prefix}do you want to watch clips, upload one, or improve a clip caption?`;
  }
  if (/\b(posts?|articles?|blogs?)\b/.test(text)) {
    return `${prefix}do you want to read posts, create one, or improve your content?`;
  }
  if (/\b(services?|events?|offers?)\b/.test(text)) {
    return `${prefix}do you want to find it, create it for your business, or improve an existing listing?`;
  }
  if (/\b(suppliers?|partners?)\b/.test(text)) {
    return `${prefix}do you want to find suppliers, compare partners, or prepare a message to contact them?`;
  }
  if (/\b(messages?|chat|notifications?|reviews?|settings|dashboard|backend|admin|payments?)\b/.test(text)) {
    return `${prefix}do you want me to open that area, explain it, or help you fix something there?`;
  }
  if (/\b(profile|business|businesses|shops?)\b/.test(text)) {
    return `${prefix}do you want to open the profile, improve it, or understand what is missing?`;
  }
  if (/\b(map|directions?)\b/.test(text)) {
    return `${prefix}do you want directions to a place, a map around your area, or nearby businesses?`;
  }
  return `${prefix}do you want me to show it, explain it, or help you do something with it?`;
}

function askEmySocialChatAnswer(query, firstName = "") {
  const raw = String(query || "");
  const text = clean(query).toLowerCase();
  const nameBit = firstName ? ` ${firstName}` : "";
  if (/[😂🤣😄😆😅]/.test(raw) || /^(ha+|haha+|hehe+|lol|lmao|rofl)\b/.test(text) || /\b(funny|joke|joking|laugh)\b/.test(text)) {
    return `Haha${nameBit}, I'm with you 😄 What are we doing next in EMY?`;
  }
  if (/[😘🥰😍❤️💕]/.test(raw)) {
    return `Aww${nameBit}, I hear you 😊 I'm here. What should we build, check, or improve next in EMY?`;
  }
  if (/[👍🔥✨😎]/.test(raw)) {
    return `Nice${nameBit} 😄 What do you want to move forward in EMY?`;
  }
  return `I'm here with you${nameBit} 😊 Say it however it comes, and I'll help you move it forward.`;
}

function askEmyActionLabel(target) {
  if (target === "product") return "product listing";
  if (target === "service") return "service listing";
  if (target === "job") return "job post";
  if (target === "clip") return "clip or video";
  if (target === "post") return "post or article";
  if (target === "event") return "event";
  if (target === "customer") return "customer view";
  if (target === "supplier") return "supplier or partner search";
  if (target === "data") return "business statistics view";
  if (target === "business") return "business profile";
  return "EMY action";
}

function askEmyPlatformActionAnswer(query, payload = {}) {
  const text = clean(query).toLowerCase();
  if (askEmyIsBareNextStepQuestion(text)) return askEmyNextStepAnswer(query, payload);
  const target = askEmyActionTarget(text);
  const label = askEmyActionLabel(target);
  const createAction = /\b(create|add|upload|publish|post|list|make|set up|setup)\b/.test(text);
  const openAction = /\b(open|take me to|go to|bring|pull up|show me where)\b/.test(text);
  const draftAction = /\b(draft|prepare|write|rewrite|convert|turn|summari[sz]e|improve)\b/.test(text);
  const proactiveAction = /\b(before i ask|proactive|what should i do next|next action|next step)\b/.test(text);
  if (target === "data") {
    return askEmyAnalyticsAdvice(query, payload || {}, askEmyContextRecords(payload || {}));
  }
  if (openAction && target) {
    return askEmyFormatReply([
      `I can open the existing ${label} view here when that item is available in this chat.`,
      askEmyFormatSection("What happens here", [
        "I use EMY's existing view for that item.",
        "I do not need to redirect you or show a raw link.",
        "If you want a specific item, tell me its name or show it first."
      ])
    ]);
  }
  if (draftAction) {
    return askEmyFormatReply([
      "Yes. I can turn rough notes into something ready to use on EMY.",
      askEmyFormatSection("What I can convert or prepare", [
        "A product listing",
        "A service description",
        "A job post",
        "A business profile description",
        "A customer message",
        "A post, clip caption, event, or offer"
      ]),
      askEmyFormatSection("Send me the raw material", [
        "Paste your rough notes, a photo description, a price, a few bullet points, or the old text. I will reshape it into the right EMY format."
      ])
    ]);
  }
  if (proactiveAction) {
    return askEmyFormatReply([
      "Yes. I can suggest the next useful move instead of waiting for perfect instructions.",
      askEmyFormatSection("How I will decide", [
        "If you are setting up: I check what profile, product, service, post, clip, or job content is missing.",
        "If you are offering products or services: I look for the clearest path to customers, suppliers, messages, directions, or product interest.",
        "If you are reviewing data: I explain what the numbers show and what to improve next."
      ]),
      askEmyFormatSection("Start point", [
        "Tell me what page or goal you are on now, or ask: what should I do next for my business?"
      ])
    ]);
  }
  if (createAction && target) {
    return askEmyFormatReply([
      `Yes. I can help you create a ${label} on EMY.`,
      askEmyFormatSection("What I need", [
        "Name or title",
        "Short description",
        "Category",
        "Price, date, stock, or availability if relevant",
        "Photo, video, or key details if you have them",
        "What you want the customer to do next"
      ]),
      askEmyFormatSection("Send rough details", [
        "You can give messy notes. I will clean them up, structure them, and tell you the next action."
      ])
    ].filter(Boolean));
  }
  return askEmyFormatReply([
    "I can handle that as an EMY action, not just a search.",
    askEmyFormatSection("Choose the action", [
      "Open a page or area",
      "Create or add content",
      "Draft or convert text",
      "Bring data or records",
      "Compare options",
      "Suggest the next step before you ask"
    ]),
    askEmyFormatSection("Tell me the target", [
      "Say product, service, job, post, clip, event, customer, supplier, business profile, or data, and I will guide the next move."
    ])
  ]);
}

function askEmyAssistantGuidanceAnswer(query, payload = {}) {
  const text = clean(query).toLowerCase();
  const greeting = askEmyGreetingPrefix(payload || {});
  const user = payload && payload.user && typeof payload.user === "object" ? payload.user : {};
  const businessName = clean(user.businessName || user.business || payload && payload.businessName);
  const businessText = businessName ? ` for ${businessName}` : "";
  if (askEmyIsBareNextStepQuestion(text)) return askEmyNextStepAnswer(query, payload);
  if (askEmyIsVagueProductNeedQuery(text)) {
    return askEmyFormatReply([
      `${greeting} What product do you need?`,
      askEmyFormatSection("Tell me one detail", [
        "The item name, like face wash, bottle, food, phone charger, uniform, or cleaning product.",
        "Or the category, budget, and whether you want it near you.",
        "If you mean you want to create a product for your business, say create product and send the rough details."
      ]),
      askEmyFormatSection("Then I can", [
        "Search EMY products properly.",
        "Compare options.",
        "Open a product card.",
        "Or help you create the product in your business Products section."
      ])
    ]);
  }
  if (askEmyIsProductCreationGuidanceQuery(text)) {
    return askEmyFormatReply([
      `${greeting} Yes. In EMY you create products from your business profile, not by searching for a product called create.`,
      askEmyFormatSection("Create it in EMY", [
        `Go to your business profile${businessText}.`,
        "Open the Products section.",
        "Press Add product.",
        "Choose the main product photo or video. You can also add a detail photo, an in-use photo, or a product video.",
        "Fill product name, price and currency, category, availability, and product description.",
        "Press Save product. The product then appears in your business Products area for customers."
      ]),
      askEmyFormatSection("What I can do next", [
        "Give me rough product details and I will draft the title, description, category, price wording, availability, and customer next action before you save it."
      ])
    ]);
  }
  if (askEmyIsBusinessSetupGuidanceQuery(text)) {
    return askEmyFormatReply([
      `${greeting} Yes. I can help you set up the business in EMY step by step.`,
      askEmyFormatSection("Start with", [
        "Create or open the business profile.",
        "Add the business name, category, location, phone, email, website, and opening hours.",
        "Write a clear description: what you offer, who it is for, and how customers should contact you.",
        "Add a profile image or cover image so the page does not look empty."
      ]),
      askEmyFormatSection("What to prepare", [
        "Business name and category.",
        "Short description.",
        "Address or service area.",
        "Phone, email, website, and opening hours.",
        "Logo, profile photo, or cover photo.",
        "The first products, services, posts, clips, jobs, or offers you want to publish."
      ]),
      askEmyFormatSection("What I can do next", [
        "Turn rough notes into the business profile description.",
        "Draft product or service listings.",
        "Check what is missing from the profile.",
        "Guide you to customers, suppliers, posts, clips, jobs, and data once the profile exists."
      ]),
      askEmyFormatSection("Best next question", [
        "Tell me the business name and what it offers, and I will draft the profile setup text."
      ])
    ]);
  }
  if (askEmyIsPlatformActionGuidanceQuery(text)) {
    return askEmyPlatformActionAnswer(query, payload || {});
  }
  if (/\b(start|setup|set up|create|launch|open)\b[\s\S]{0,80}\b(business|shop|company|store|profile|emy)\b/.test(text)) {
    return askEmyFormatReply([
      `${greeting} Yes. We can build this step by step${businessText}.`,
      askEmyFormatSection("Start with", [
        "Profile: name, category, location, contact details, opening times, and a clear description.",
        "Offer: add products, services, jobs, posts, clips, or events so people understand what you do.",
        "Trust: add real photos, useful details, and a simple next action like message, visit, apply, enquire, or follow.",
        "Growth: once the profile is clear, use EMY to discover customers, suppliers, local opportunities, and performance signals."
      ]),
      askEmyFormatSection("Best next question", [
        "Are you setting up the profile, adding products or services, trying to get customers, or checking your data first?"
      ])
    ]);
  }
  if (/\b(grow|increase|improve|boost|attract|bring|get more|reach|win)\b[\s\S]{0,80}\b(business|sales|customers?|clients?|orders|profile|views|products?)\b/.test(text)) {
    return askEmyFormatReply([
      `${greeting} Yes. We can work on growth${businessText} without turning the answer into random search cards.`,
      askEmyFormatSection("Good growth paths", [
        "Get seen: make the profile, products, services, and photos clear.",
        "Get interest: post useful updates, clips, offers, or product details that give people a reason to act.",
        "Get action: make it easy to message, follow, visit, enquire, apply, or ask for directions.",
        "Understand what works: check views, likes, saves, product interest, clips, and customer activity when the data is connected."
      ]),
      askEmyFormatSection("Choose one", [
        "Do you want more customers, a stronger profile, better products/content, supplier help, or a data review first?"
      ])
    ]);
  }
  if (/\b(connect|discover|reach)\b[\s\S]{0,90}\b(customers?|clients?|suppliers?|partners?|markets?|places?|world|country|countries)\b/.test(text) || /\bsuppliers?\b/.test(text)) {
    return askEmyFormatReply([
      `${greeting} I can help you connect the dots instead of just throwing listings at you.`,
      askEmyFormatSection("How we can approach it", [
        "Customers: define who you want to reach, where they are, and what action you want from them.",
        "Suppliers or partners: define what you need, the place or country to search, and whether you want local EMY records or wider discovery.",
        "Next action: once the target is clear, I can search EMY and show cards only when cards are useful."
      ]),
      askEmyFormatSection("Tell me this", [
        "Are you looking for customers, suppliers, or business partners, and in what place?"
      ])
    ]);
  }
  if (/\b(analy[sz]e|understand|review)\b[\s\S]{0,90}\b(data|stats|statistics|performance|sales|views|engagement|customers?|products?)\b/.test(text)) {
    return askEmyFormatReply([
      `${greeting} I can help you understand the data when EMY has the signals connected.`,
      askEmyFormatSection("What I can look at", [
        "Profile views, product activity, saves, likes, clips, posts, customer interest, jobs, events, and business performance.",
        "If a number is missing, I should say it is missing instead of inventing it."
      ]),
      askEmyFormatSection("Best next question", [
        "Do you want me to look at profile performance, product interest, clips/posts, customer activity, enquiries, messages, or directions first?"
      ])
    ]);
  }
  return askEmyFormatReply([
    `${greeting} I'll guide the next move first.`,
    "Decision map\n1. Improve the business.\n2. Add content.\n3. Find customers or suppliers.\n4. Check stats and charts.\n5. Search EMY records.",
    "What happens next\nCharts, product views, and useful panels appear when they answer the question. Saved record cards stay hidden unless you ask to find or open records."
  ]);
}

function askEmyApplyToolResultPolicy(result, brain) {
  if (!result || !brain) return result;
  const next = { ...result };
  if (!brain.recordCardsAllowed) next.results = [];
  if (!Array.isArray(next.results)) next.results = [];
  next.responseType = next.responseType || brain.responseType;
  next.selectedToolName = next.selectedToolName || brain.selectedToolName || brain.plannerToolHint || "";
  const selectedToolName = next.selectedToolName || "";
  if (selectedToolName === "answerDirectly") {
    next.results = [];
    next.analytics = null;
    next.action = null;
    next.responseType = "chat_answer";
  } else if (!askEmyResponseIsAnalyticsTool(selectedToolName)) {
    next.analytics = null;
  }
  if (!brain.recordCardsAllowed && !askEmyResponseAllowsActionTool(selectedToolName)) {
    next.action = null;
  }
  const resultLimit = Number(brain.limit) > 0 ? Math.min(Number(brain.limit), 25) : 0;
  if (resultLimit && Array.isArray(next.results) && next.results.length > resultLimit) {
    next.results = next.results.slice(0, resultLimit);
  }
  const actionToolName = brain.selectedToolName || brain.plannerToolHint || "";
  const shouldAttachAction = actionToolName === "createDraft" || actionToolName === "openInlineView";
  if (!next.action && shouldAttachAction && brain.actionIntent && brain.actionIntent !== "unknown") {
    next.action = {
      mode: brain.actionMode || "",
      target: brain.actionTarget || "",
      scope: brain.actionScope || "",
      label: brain.actionLabel || "",
      url: brain.actionUrl || "",
      responseType: brain.actionResponseType || brain.responseType || "",
      usesExistingView: Boolean(brain.actionUsesExistingView),
      requiresConfirmation: Boolean(brain.actionRequiresConfirmation),
      draftFields: Array.isArray(brain.actionDraftFields) ? brain.actionDraftFields : [],
      toolName: brain.selectedToolName || brain.plannerToolHint || ""
    };
  }
  if (askEmyConversationState && typeof askEmyConversationState.validateAskEmyResponse === "function") {
    const validation = askEmyConversationState.validateAskEmyResponse(brain, next);
    next.results = validation.response.results;
    next.validationFailures = validation.failures;
    next.validationPassed = validation.ok;
  }
  return next;
}

function askEmyResponseIsAnalyticsTool(toolName = "") {
  return [
    "getBusinessStatsOverview",
    "getMostViewedProduct",
    "getTopProductByMetric",
    "getTopProductsAnalytics",
    "getBusinessCustomersAnalytics",
    "getMultiBusinessComparison",
    "compareContentViews",
    "compareProductClipViews"
  ].includes(String(toolName || ""));
}

function askEmyResponseAllowsActionTool(toolName = "") {
  return [
    "createDraft",
    "openInlineView"
  ].includes(String(toolName || ""));
}

function askEmySecureFinalResponse(result, brain = {}) {
  if (!result || typeof result !== "object") return result;
  const next = askEmyApplyToolResultPolicy(result, brain || {}) || { ...result };
  const selectedToolName = next.selectedToolName || brain.selectedToolName || brain.plannerToolHint || "";
  if (selectedToolName === "answerDirectly") {
    next.results = [];
    next.analytics = null;
    next.action = null;
    next.responseType = "chat_answer";
  }
  if (!brain.recordCardsAllowed) next.results = [];
  if (!askEmyResponseIsAnalyticsTool(selectedToolName)) next.analytics = null;
  if (!brain.recordCardsAllowed && !askEmyResponseAllowsActionTool(selectedToolName)) next.action = null;
  if (!Array.isArray(next.results)) next.results = [];
  const resultLimit = Number(brain.limit) > 0 ? Math.min(Number(brain.limit), 25) : 0;
  if (resultLimit && next.results.length > resultLimit) next.results = next.results.slice(0, resultLimit);
  return next;
}

function askEmyFallbackPrefix(reason) {
  return reason ? "I could not reach the AI provider, so this is the local Ask EMY fallback. " : "";
}

function askEmyOpenInlineViewTypes(target = "") {
  const cleanTarget = clean(target).toLowerCase();
  if (cleanTarget === "post") return ["post", "article", "event"];
  if (cleanTarget === "article" || cleanTarget === "event") return [cleanTarget, "post"];
  if (cleanTarget === "service") return ["service", "product"];
  if (cleanTarget === "business") return ["business", "business-profile"];
  if (cleanTarget === "profile" || cleanTarget === "customer" || cleanTarget === "customer-profile") return ["customer-profile", "profile"];
  if (cleanTarget === "product" || cleanTarget === "job" || cleanTarget === "clip") return [cleanTarget];
  return [];
}

function askEmyOpenInlineRequestedName(query = "", target = "") {
  const cleanQuery = clean(query);
  const cleanTarget = clean(target).toLowerCase();
  if (!cleanQuery || !cleanTarget) return "";
  const escapedTarget = cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = cleanQuery.match(new RegExp(`\\bopen\\s+${escapedTarget}\\s+(.+)$`, "i"));
  if (!match || !match[1]) return "";
  return clean(match[1])
    .replace(/[.!?]+$/g, "")
    .replace(/\b(?:here|please|pls|for me|for you|now)$/i, "")
    .trim();
}

function askEmyRecordMatchesInlineName(record, requestedName = "") {
  const wanted = askEmyAliasKey(requestedName);
  if (!wanted) return false;
  const aliases = askEmyRecordBusinessAliases(record);
  [
    record && record.name,
    record && record.title,
    record && record.business,
    record && record.businessName,
    record && record.productName,
    record && record.jobTitle
  ].forEach((value) => askEmyAddBusinessAliases(aliases, value));
  return aliases.has(wanted);
}

function askEmyOpenInlineViewAnswer(query, payload = {}, recordsInput = [], provider = "local-intent", prefix = "", brain = {}) {
  const target = clean(brain.actionTarget || brain.plannerEntity || "");
  const label = clean(brain.actionLabel || target || "item");
  const wantedTypes = askEmyOpenInlineViewTypes(target);
  const records = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(Array.isArray(recordsInput) ? recordsInput : [], payload || {}), payload || {});
  const requestedName = askEmyOpenInlineRequestedName(query, target);
  let candidates = wantedTypes.length
    ? records.filter((record) => wantedTypes.includes(clean(record && record.type).toLowerCase()))
    : [];
  if (clean(target).toLowerCase() === "business") {
    const ownedBusinessResult = askEmyOwnedBusinessCardAnswer(query, payload || {}, records, provider, "");
    const ownedBusinessCards = Array.isArray(ownedBusinessResult && ownedBusinessResult.results) ? ownedBusinessResult.results : [];
    const ownedCandidates = candidates.filter((record) => (record && (record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice))
      && askEmyRecordLooksLikeBusinessProfile(record, askEmyVisibleRecordKey(record))
      && !askEmyRecordHasContentSignals(record, askEmyVisibleRecordKey(record)));
    candidates = [...ownedCandidates, ...ownedBusinessCards, ...candidates].filter((record, index, rows) => {
      const key = askEmyVisibleRecordKey(record) || [record && record.type, record && record.id, record && record.name, record && record.business].map(clean).join("|").toLowerCase();
      return key && rows.findIndex((row) => (askEmyVisibleRecordKey(row) || [row && row.type, row && row.id, row && row.name, row && row.business].map(clean).join("|").toLowerCase()) === key) === index;
    });
  }
  if ((clean(target).toLowerCase() === "profile" || clean(target).toLowerCase() === "customer" || clean(target).toLowerCase() === "customer-profile") && !candidates.length) {
    candidates = [askEmyCustomerSelfProfileResult(payload || {})];
  }
  const namedMatches = requestedName
    ? candidates.filter((record) => askEmyRecordMatchesInlineName(record, requestedName))
    : [];
  const results = (namedMatches.length ? namedMatches : candidates).slice(0, 1);
  const openedName = clean(results[0] && (results[0].name || results[0].title || results[0].businessName || results[0].business)) || label;
  const answer = results.length
    ? `${prefix}Opening ${openedName} here.`
    : `${prefix}I cannot open ${requestedName || label.toLowerCase()} here because this reply has no matching ${target || "item"} record attached.`;
  return {
    answer,
    provider,
    results,
    responseType: brain.responseType || "small_result_list",
    selectedToolName: "openInlineView",
    action: {
      mode: "open",
      target: clean(target || "item"),
      label: clean(label || openedName || "EMY item"),
      responseType: brain.responseType || "small_result_list",
      usesExistingView: true,
      requiresConfirmation: false,
      toolName: "openInlineView"
    }
  };
}

function askEmyExecuteSelectedTool(query, payload = {}, recordsInput = [], analyticsSummary = null, provider = "local-intent", reason = "") {
  const cleanQuery = clean(query) || "nearby businesses";
  const safePayload = payload || {};
  const brain = askEmyAssistantBrain(cleanQuery, safePayload);
  const effectiveQuery = brain.planningText || cleanQuery;
  const profileQuery = askEmyIsProfileImageQuery(cleanQuery) ? cleanQuery : effectiveQuery;
  const toolName = brain.selectedToolName || brain.plannerToolHint || "";
  const allRecords = Array.isArray(recordsInput) ? recordsInput : [];
  const prefix = askEmyFallbackPrefix(reason);
  let result = null;

  if (askEmyIsProfileImageQuery(profileQuery)) {
    result = askEmyProfileAnswer(profileQuery, safePayload, provider);
    const profileToolName = askEmyProfileTargetRole(profileQuery, safePayload) === "business" ? "getOwnedBusinessCard" : "getCustomerProfileCard";
    if (result) result.selectedToolName = profileToolName;
    return askEmyApplyToolResultPolicy(result, {
      ...brain,
      plannerIntent: profileToolName === "getOwnedBusinessCard" ? "BUSINESS_PROFILE" : "CUSTOMER_PROFILE",
      plannerToolHint: profileToolName,
      selectedToolName: profileToolName,
      responseType: result && result.responseType || "small_result_list",
      recordCardsAllowed: true
    });
  }

  if (toolName === "answerDirectly") {
    if (brain.plannerIntent === "CHAT" || brain.intent === "conversation") {
      result = { answer: askEmyConversationalAnswer(cleanQuery, safePayload), provider, results: [] };
    } else if (brain.plannerIntent === "UNKNOWN" || brain.intent === "unclear") {
      result = { answer: askEmyUnclearAnswer(), provider, results: [] };
    }
  } else if (toolName === "getViewerAccount") {
    result = askEmyViewerProfileAnswer(effectiveQuery, safePayload, provider);
  } else if (toolName === "getViewerLocation") {
    result = askEmyViewerLocationAnswer(effectiveQuery, safePayload, provider);
  } else if (toolName === "guideNextStep" || toolName === "createDraft") {
    result = { answer: askEmyAssistantGuidanceAnswer(effectiveQuery, safePayload), provider, results: [] };
  } else if (toolName === "getCustomerSelfContent") {
    result = askEmyCustomerSelfContentAnswer(effectiveQuery, safePayload, allRecords, provider);
  } else if (toolName === "getCustomerProfileCard") {
    result = askEmyProfileAnswer(profileQuery, safePayload, provider);
    if (result) result.selectedToolName = "getCustomerProfileCard";
  } else if (toolName === "getMediaPreview") {
    result = askEmyMediaPreviewAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "getDailyEmyUpdate") {
    result = askEmyDailyUpdateAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "getBusinessCustomersAnalytics") {
    result = askEmyBusinessCustomersAnswer(effectiveQuery, safePayload, allRecords, provider);
  } else if (toolName === "getMultiBusinessComparison") {
    result = askEmyMultiBusinessComparisonAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "getOwnedProducts") {
    result = askEmyOwnedProductListAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "getOwnedClips") {
    result = askEmyOwnedClipListAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "getOwnedPosts") {
    result = askEmyOwnedPostListAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "getOwnedArticles") {
    result = askEmyOwnedArticleListAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "getOwnedBusinessCard") {
    result = askEmyOwnedBusinessCardAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "getMostViewedProduct" || toolName === "getTopProductByMetric") {
    result = askEmySingleProductMetricAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "getTopProductsAnalytics") {
    result = askEmyProductDemandAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "compareContentViews" || toolName === "compareProductClipViews") {
    result = askEmyContentComparisonAnswer(effectiveQuery, safePayload, allRecords, provider, prefix);
  } else if (toolName === "getBusinessStatsOverview") {
    const summary = analyticsSummary || {
      contentCounts: askEmyContentCounts(allRecords),
      metrics: []
    };
    result = {
      answer: askEmyAnalyticsAdvice(effectiveQuery, safePayload, allRecords, analyticsSummary),
      provider,
      results: [],
      analytics: askEmyGenericAnalyticsPayload(effectiveQuery, safePayload, allRecords, summary)
    };
  } else if (toolName === "searchNearby" || toolName === "searchProducts") {
    const bundle = askEmySearchResultBundle(allRecords, effectiveQuery, safePayload, brain);
    result = {
      answer: askEmyStructuredSearchAnswer(bundle, safePayload, prefix),
      provider,
      results: bundle.results
    };
  } else if (toolName === "openInlineView") {
    if (askEmyIsProfileImageQuery(effectiveQuery)) {
      result = askEmyProfileAnswer(effectiveQuery, safePayload, provider);
    } else {
      result = askEmyOpenInlineViewAnswer(effectiveQuery, safePayload, allRecords, provider, prefix, brain);
    }
  }

  return result ? askEmyApplyToolResultPolicy(result, brain) : null;
}

function askEmyLocalAnswer(query, reason, payload, records, analyticsSummary) {
  const cleanQuery = clean(query) || "nearby businesses";
  const brain = askEmyAssistantBrain(cleanQuery, payload || {});
  const toolResult = askEmyExecuteSelectedTool(cleanQuery, payload || {}, records, analyticsSummary, reason ? "local-fallback" : "local-intent", reason);
  if (toolResult) return toolResult;
  const contextualQuery = brain.contextualQuery;
  const intent = brain.intent;
  if (askEmyIsOwnershipFollowUpQuery(cleanQuery)) {
    return askEmyOwnershipFollowUpAnswer(cleanQuery, payload || {}, reason ? "local-fallback" : "local-intent");
  }
  if (askEmyIsJobApplyFollowUp(cleanQuery, payload || {})) {
    return askEmyJobApplicationAnswer(cleanQuery, payload || {}, records, reason ? "local-fallback" : "local-intent");
  }
  if (askEmyIsViewerLocationQuery(cleanQuery, payload || {})) {
    return askEmyViewerLocationAnswer(cleanQuery, payload || {}, reason ? "local-fallback" : "local-intent");
  }
  if (askEmyIsViewerProfileQuery(cleanQuery, payload || {})) {
    return askEmyViewerProfileAnswer(cleanQuery, payload || {}, reason ? "local-fallback" : "local-intent");
  }
  if (askEmyIsMapCapabilityQuery(cleanQuery)) {
    return askEmyMapCapabilityAnswer(payload || {}, reason ? "local-fallback" : "local-intent");
  }
  if (intent === "conversation") {
    return {
      answer: askEmyConversationalAnswer(cleanQuery, payload || {}),
      provider: reason ? "local-fallback" : "local-intent",
      results: []
    };
  }
  if (intent === "guidance") {
    if (askEmyIsPlatformActionGuidanceQuery(cleanQuery) && askEmyActionTarget(cleanQuery) === "data") {
      return {
        answer: askEmyAnalyticsAdvice(cleanQuery, payload || {}, records, analyticsSummary),
        provider: reason ? "local-fallback" : "local-intent",
        results: []
      };
    }
    return {
      answer: askEmyAssistantGuidanceAnswer(cleanQuery, payload || {}),
      provider: reason ? "local-fallback" : "local-intent",
      results: []
    };
  }
  if (intent === "unclear") {
    return {
      answer: askEmyUnclearAnswer(),
      provider: reason ? "local-fallback" : "local-intent",
      results: []
    };
  }
  if (intent === "location-info") {
    return {
      answer: askEmyLocationInfoAnswer(payload || {}),
      provider: reason ? "local-fallback" : "local-intent",
      results: []
    };
  }
  if (intent === "platform-info") {
    return {
      answer: askEmyPlatformInfoAnswer(payload || {}),
      provider: reason ? "local-fallback" : "local-intent",
      results: []
    };
  }
  if (intent === "identity") {
    return {
      answer: askEmyIdentityIntroAnswer(),
      provider: reason ? "local-fallback" : "local-intent",
      results: []
    };
  }
  const allRecords = Array.isArray(records) ? records : [];
  if (askEmyIsBusinessCustomerGeoQuery(cleanQuery)) {
    return askEmyCustomerGeoAnalyticsAnswer(cleanQuery, payload || {}, allRecords, reason ? "local-fallback" : "local-intent");
  }
  if (askEmyIsOwnershipWordingQuestion(cleanQuery)) {
    return askEmyOwnershipWordingAnswer(cleanQuery, payload || {}, reason ? "local-fallback" : "local-intent");
  }
  if (askEmyShouldIdentifyMentionedContent(cleanQuery)) {
    const contentIdentity = askEmyContentIdentityAnswer(cleanQuery, payload || {}, allRecords, reason ? "local-fallback" : "local-intent");
    if (contentIdentity) return contentIdentity;
  }
  if (intent === "map-area") {
    return askEmyBusinessMapAreaAnswer(cleanQuery, payload || {}, allRecords, reason ? "local-fallback" : "local-intent");
  }
  if (intent === "directions") {
    return askEmyBusinessDirectionsAnswer(cleanQuery, payload || {}, allRecords, reason ? "local-fallback" : "local-intent");
  }
  if (intent === "profile") {
    return askEmyProfileAnswer(cleanQuery, payload || {}, reason ? "local-fallback" : "local-intent");
  }
  if (intent === "customer-self") {
    return askEmyCustomerSelfContentAnswer(cleanQuery, payload || {}, allRecords, reason ? "local-fallback" : "local-intent");
  }
  if (intent === "customer") {
    return askEmyBusinessCustomersAnswer(cleanQuery, payload || {}, allRecords, reason ? "local-fallback" : "local-intent");
  }
  if (intent === "business-quality") {
    return askEmyBusinessQualityAnswer(cleanQuery, payload || {}, allRecords, reason ? "local-fallback" : "local-intent");
  }
  const effectiveQuery = contextualQuery || cleanQuery;
  if (askEmyIsOwnedProductListQuery(effectiveQuery, payload || {})) {
    return askEmyOwnedProductListAnswer(effectiveQuery, payload || {}, allRecords, reason ? "local-fallback" : "local-intent");
  }
  if (askEmyIsSingleTopProductMetricQuestion(effectiveQuery) || askEmyIsSingleProductCorrection(cleanQuery, payload || {})) {
    const prefix = reason ? "I could not reach the AI provider, so this is the local Ask EMY fallback. " : "";
    return askEmySingleProductMetricAnswer(effectiveQuery, payload || {}, allRecords, reason ? "local-fallback" : "local-intent", prefix);
  }
  if (askEmyIsProductDemandQuestion(effectiveQuery)) {
    const prefix = reason ? "I could not reach the AI provider, so this is the local Ask EMY fallback. " : "";
    return askEmyProductDemandAnswer(effectiveQuery, payload || {}, allRecords, reason ? "local-fallback" : "local-intent", prefix);
  }
  const available = askEmyFilterRecordsForQuery(allRecords, contextualQuery, payload || {});
  if (intent === "analytics") {
    return {
      answer: askEmyAnalyticsAdvice(effectiveQuery, payload || {}, available, analyticsSummary),
      provider: reason ? "local-fallback" : "local-intent",
      results: []
    };
  }
  if (!available.length) {
    return {
      answer: "I could not find saved EMY records for that request yet. Add real businesses, service providers, products, posts, clips, videos, jobs, or events, then Ask EMY can answer from those platform records.",
      provider: reason ? "local-fallback" : "local-intent",
      results: []
    };
  }
  const bundle = askEmySearchResultBundle(available, cleanQuery, payload || {});
  const results = bundle.results;
  if (!results.length) {
    return {
      answer: askEmyNoValidatedRecordsAnswer(cleanQuery, payload || {}, allRecords),
      provider: reason ? "local-fallback" : "local-intent",
      results: []
    };
  }
  const prefix = reason ? "I could not reach the AI provider, so this is the local Ask EMY fallback. " : "";
  if (askEmyIsMoreResultsQuestion(cleanQuery) && askEmyHistoryHasResultContext(payload || {}, bundle.intent)) {
    const more = askEmyMoreResultsResponse(bundle, payload || {}, prefix);
    return {
      answer: more.answer,
      provider: reason ? "local-fallback" : "local-intent",
      results: more.results
    };
  }
  return {
    answer: askEmyStructuredSearchAnswer(bundle, payload || {}, prefix),
    provider: reason ? "local-fallback" : "local-intent",
    results
  };
}

function askEmyAiToolContext(query, payload = {}, recordsInput = [], analyticsSummary = null, brain = {}) {
  const toolName = brain.selectedToolName || brain.plannerToolHint || "";
  if (!toolName || toolName === "answerDirectly") return null;
  const toolResult = askEmyExecuteSelectedTool(query, payload || {}, recordsInput, analyticsSummary, "ai-tool-context");
  if (!toolResult) return null;
  const resultsPreview = Array.isArray(toolResult.results)
    ? toolResult.results.slice(0, 4).map((result) => ({
      name: askEmyText(result && result.name, 140),
      type: askEmyText(result && result.type, 80),
      place: askEmyText(result && result.place, 180),
      desc: askEmyText(result && result.desc, 180)
    }))
    : [];
  return {
    toolName,
    responseType: toolResult.responseType || brain.responseType || "",
    answer: askEmyText(toolResult.answer, 1400),
    analytics: toolResult.analytics || null,
    action: toolResult.action || null,
    resultCount: Array.isArray(toolResult.results) ? toolResult.results.length : 0,
    resultsPreview
  };
}

function askEmyBuildMessages(payload, records, analyticsSummary) {
  const query = askEmyText(payload && payload.query, 900);
  const location = askEmyText(payload && payload.location, 160) || "customer saved location";
  const radius = askEmyRadiusLabel(payload && payload.radius);
  const history = Array.isArray(payload && payload.history) ? payload.history.slice(-8) : [];
  const brain = askEmyAssistantBrain(query, payload || {});
  const interpretedQuery = brain.resolvedFollowUp && brain.planningText ? brain.planningText : query;
  const intent = brain.intent;
  const contextualQuery = brain.resolvedFollowUp
    ? askEmyContextualQuery(interpretedQuery, payload || {})
    : brain.contextualQuery && brain.contextualQuery !== query ? brain.contextualQuery : askEmyContextualQuery(interpretedQuery, payload || {});
  const requestedTypes = brain.requestedTypes && brain.requestedTypes.length ? brain.requestedTypes : askEmyResolvedRequestedTypes(interpretedQuery, payload || {});
  const queryFilteredRecords = askEmyFilterRecordsForQuery(records, contextualQuery, payload || {});
  const specificIntent = ["business", "service", "product", "job", "event", "clip", "article", "post"].includes(intent);
  const assistantFirstIntent = ["conversation", "guidance", "identity", "platform-info", "unclear", "location-info"].includes(intent);
  const minimalViewerIntent = ["conversation", "identity", "unclear"].includes(intent);
  const directAnswerOnly = brain.selectedToolName === "answerDirectly";
  const contextRecords = (assistantFirstIntent || directAnswerOnly) ? [] : requestedTypes.length > 1
    ? queryFilteredRecords.filter((record) => requestedTypes.includes(record.type))
    : specificIntent ? queryFilteredRecords.filter((record) => record.type === intent) : queryFilteredRecords;
  const ownedContextRecords = askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(contextRecords, payload || {}), payload || {});
  const emptyAnalyticsSummary = {
    location: "",
    radius: "",
    contentCounts: {},
    metrics: [],
    hasMetricStats: false
  };
  const capabilityOnly = directAnswerOnly;
  const viewerContext = askEmyViewerContext(payload || {});
  if (minimalViewerIntent || directAnswerOnly) viewerContext.ownedBusinessAliases = [];
  const context = {
    location: (minimalViewerIntent || directAnswerOnly) ? "" : location,
    radius: (minimalViewerIntent || directAnswerOnly) ? "" : radius,
    viewer: viewerContext,
    requestedIntent: intent,
    interpretedQuery,
    originalQuery: interpretedQuery === query ? "" : query,
    resolvedFollowUp: Boolean(brain.resolvedFollowUp),
    followUpResolution: brain.followUpResolution || "",
    selectedToolName: brain.selectedToolName || brain.plannerToolHint || "",
    responseType: brain.responseType || "",
    capabilityOnly,
    plannedTool: askEmyAiToolContext(interpretedQuery, payload || {}, records, analyticsSummary, brain),
    analyticsSummary: (minimalViewerIntent || directAnswerOnly) ? emptyAnalyticsSummary : analyticsSummary || {
      location,
      radius,
      contentCounts: askEmyContentCounts(records),
      metrics: [],
      hasMetricStats: false
    },
    businessDataAvailable: directAnswerOnly ? [] : ownedContextRecords.slice(0, ASK_EMY_MAX_CONTEXT_RECORDS),
    conversation: history.map((item) => ({
      role: item && item.role === "assistant" ? "assistant" : "user",
      text: askEmyText(item && item.text, 1000)
    }))
  };
  return [
    {
      role: "system",
      content: [
        "You are EMY, the live AI worker inside the EMY platform. When asked who or what you are, speak in first person as EMY, not as a separate assistant for EMY.",
        "For identity questions like who are you, what are you, or tell me about you, begin with: I'm EMY. Never say: I'm EMY's chat assistant.",
        "Only introduce yourself with I'm EMY for identity questions. For ordinary greetings such as hi, hello, good morning, good afternoon, or good evening, never say I'm EMY or Ask EMY; just greet back briefly and ask how the user is or how you can help.",
        "For viewer identity questions like who am I, do you know me, or do you know who I am, answer briefly with the viewer account name if available. Do not volunteer email, location, radius, business links, customer status, or saved content unless the user specifically asks for those details.",
        "For very short unclear fragments, do not infer a search. Ask the user to say it another way in one short conversational sentence.",
        "If context.resolvedFollowUp is true, answer context.interpretedQuery, not the raw short reply. Never ask the same open/show clarification again after the user already said yes, ok, sure, or do it.",
        "If you offered two actions and the user answers yes, ok, sure, or do it, choose the first offered action unless the user names the second action.",
        "Operate assistant-first, not search-first: understand whether the user needs normal conversation, guidance, a clarifying question, analysis, search, or an action.",
        "Private operating loop: read the conversation memory, interpret the user's real intent, decide whether a tool is needed, inspect any tool data returned, validate that the answer matches the exact question, then answer clearly.",
        "Reason privately before answering, but do not expose hidden reasoning or internal chain-of-thought. Show the useful conclusion, evidence, limits, and next action.",
        "Choose tools deliberately. If no EMY tool is needed, answer directly like a normal AI conversation with results empty and analytics null.",
        "If a tool is needed, use the selected tool data as evidence, then explain it in natural language instead of dumping the raw record or chart text.",
        "Never force every message into search, cards, charts, or saved records. Search and cards are UI tools, not the default answer.",
        "Treat the EMY search engine and saved records as tools you can use, not as your whole personality.",
        "Speak naturally and warmly, like a real EMY assistant in a chat, not like a generic search engine.",
        "When the user laughs, jokes, teases, or sends a friendly emoji, respond with a light human reaction and at most one fitting emoji before continuing the conversation. Do not force emoji into serious, safety, data, legal, or business-critical answers.",
        "Use saved user, business, location, product, clip, post, job, and customer context quietly. Do not dump context details unless the user asks for them or they directly help the answer.",
        "Only return result cards when the user clearly asks to show, find, list, open, map, browse, compare, or get saved EMY records.",
        "If the user asks how you know results, products, shops, or cards are at their location, do not answer by only repeating their saved search location. Explain the evidence: saved search location is just the search area; an item is actually nearby only when its own business/profile address, postcode, map pin, or distance data proves it.",
        "For action requests such as create, add, publish, upload, open a page, take me to, prepare, draft, convert, bring data, or what should I do next, treat EMY as an assistant workspace. Guide the action, ask for missing details, or provide the relevant EMY internal link; do not search for a record named after the action word.",
        "For greetings, identity, help, setup, growth, supplier/customer strategy, and what-should-I-do questions, answer conversationally and ask one useful next question. In those cases results must be an empty array.",
        "For capability questions such as do you do analytics, can you compare, or can you analyse statistics, answer what you can do and ask what the user wants analysed. Do not volunteer saved numbers, charts, cards, products, profile views, or business stats until the user asks to analyse or show a specific thing.",
        "If context.capabilityOnly is true, do not comment on whether stats are synced, missing, available, or unavailable. Only explain the capability and ask what the user wants to analyse.",
        "If context.plannedTool is present, use that tool data as the primary factual source. Explain what the tool data means, mention limits honestly, and do not replace it with an unrelated saved answer.",
        "If context.plannedTool.analytics.presentation is cross_entity_comparison, do not repeat the chart rows as a markdown table in the answer. Give a short analysis summary, the main finding, the limitation, and one next action; the chart component will display the rows.",
        "If context.plannedTool.analytics.data_quality.has_product_clip_links is false, say there are no saved product-to-clip attribution links yet. Do not say clips are available for deeper attribution.",
        "Do not treat an empty analyticsSummary on a capability-only or clarification turn as proof that the statistics page is not synced. Say data is missing only when the user asked to show or analyse real stats and the required data is actually unavailable.",
        "When returning records, give a short conversational answer first, then return structured EMY records as cards.",
        "Do not write answer text as one long paragraph. Keep all useful information, but organize it into short section headings and separate lines.",
        "Use a natural answer shape: direct answer first, then useful bullets or sections, then limitations or safety/accuracy notes when relevant, then one helpful next question or next action.",
        "When listing what a business sells, use a heading like What they sell or Examples, then put each category/product/price range on its own line. Never pack multiple product examples into one paragraph.",
        "For compare, difference, best option, pros and cons, or choose-between questions, use a compact markdown table when it makes the answer clearer. Keep table columns short and readable.",
        "For saved-record answers, start with the conversational answer as plain lines, then use helpful sections such as Search area, Next step, Narrow it down, Options, or Price note. Do not use a Summary heading in chat replies.",
        "Use only the supplied EMY context records and conversation.",
        "Do not invent outside businesses, prices, stock, jobs, events, or availability.",
        "Do not use stock images or made-up descriptions; if an image or description is missing, leave it missing.",
        "Do not say a business is verified, active, genuine, or approved unless the provided record has an explicit public verification field. Internal status tags are not authenticity proof.",
        "If a supplied result has isOwnedByViewer or ownerNotice, keep the Your business marker in the result, but separate the content from the business: for articles, posts, clips, jobs, products, events, and services say it was published by, posted by, or belongs under the user's business; do not say the content item itself is the user's business.",
        "If a supplied result has relationshipNotice, isFollowedByViewer, or isCustomerOfViewer, clearly tell the user whether they follow that business or are already a customer.",
        "Identity and subject rules: me, my account, my profile, and my location mean the signed-in viewer/customer. My business means the viewer's business. My customers means customers of the viewer's business. If the user says not a business, me, immediately switch the subject to the viewer.",
        "Active business, clip, post, product, or page context can help, but it must never override explicit user words such as me, my location, or not HONEY SHOP me.",
        "For customer location analytics, show grouped areas only and never expose exact individual customer home addresses.",
        "When the user asks whether a business has customers, answer from business-customer relationship records, not analytics or sales-growth advice. Do not reveal customer names or emails unless the viewer is currently using the business owner account for that business.",
        "Business profile details such as public phone, email, website, address, opening hours, description, and what the business says it offers can be shown because businesses want customers to contact them. Only use those fields from business profile records.",
        "When the user asks for EMY maps, directions, routes, or how to get there, use the business profile address or saved map pin. Do not invent distance, travel time, or live traffic; tell the user to open the EMY map result for live route options.",
        "Never use customer records, customer emails, customer names, or customer notes as business contact/profile details.",
        "If the user questions whether a business is fake, explain that you can only see saved EMY records and cannot confirm authenticity from missing verification data.",
        "Business account service questions include support, logistics, suppliers, legal support, financial advice, insights, and customer experience; return service records when available.",
        "When the user asks to improve business performance, check statistics, or review analytics, first decide the statistics conversation type: clarify, explain the concept, show numbers, compare signals, product interest, customer action, or diagnose what to improve. Do not dump the full statistics view unless the user clearly asks to show, pull up, graph, or display it.",
        "If the user asks for cross-entity analytics such as products from clip views, products based on video views, or product ranking using post/clip metrics, do not substitute ordinary product views. Use a real saved product-to-clip/post link if supplied; otherwise say that link is not connected yet and offer product views or clip views separately.",
        "Use analyticsSummary and content counts. Give practical next actions based only on those numbers and saved EMY content.",
        "If analyticsSummary has no metric stats, say that the statistics page is not synced or no stats are saved yet; do not invent views, enquiries, messages, customers, directions, checkout totals, payment totals, or revenue.",
        "For analytics and business-improvement questions, do not return result cards unless the user asks for specific records.",
        "Use the supplied location and radius to rank nearby records. If a record has no place/address, do not pretend it is nearby; say its location is missing.",
        "For service, product, job, event, clip, video, or post searches, return only records of the requested type unless the user explicitly asks for broader alternatives.",
        "When the user asks for the product with the most views, likes, saves, comments, or interest, answer with one product only. When the user asks for products plural or a ranking, rank product records by saved EMY interest and action signals such as views, likes, saves, comments, enquiries, messages, stock, and product media. EMY products are listings, so describe these as interest/action signals, not checkout results.",
        "When the user agrees to help applying for a job, draft a short application message and explain the next application action; do not only repeat the job listing.",
        "Do not place JSON, arrays, or card objects inside the answer text. Put cards only in the results array. Markdown tables are allowed only inside the answer for clear comparisons or structured explanations.",
        "If the records do not contain the answer, say what is missing and suggest the nearest useful EMY action.",
        "For greetings or thanks, answer naturally without pretending to search.",
        "Return strict JSON with answer and results. Results must be an array of up to four objects with name, place, desc, price, type, image, url, mapUrl, origin, destination, tags, isOwnedByViewer, ownerNotice, isFollowedByViewer, isCustomerOfViewer, and relationshipNotice."
      ].join(" ")
    },
    {
      role: "user",
      content: JSON.stringify({ query: interpretedQuery, originalQuery: interpretedQuery === query ? "" : query, context })
    }
  ];
}

async function askEmyRequestJson(url, headers, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: Object.assign({ "Content-Type": "application/json" }, headers || {}),
    body: JSON.stringify(body)
  });
  const text = await response.text();
  if (!response.ok) {
    const error = new Error(`AI provider returned ${response.status}`);
    error.statusCode = response.status;
    error.providerBody = text.slice(0, 700);
    throw error;
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("AI provider returned invalid JSON");
  }
}

function askEmySafeProviderFailure(error) {
  const rawBody = String(error && error.providerBody || "");
  let bodyMessage = "";
  if (rawBody) {
    try {
      const parsed = JSON.parse(rawBody);
      bodyMessage = clean(parsed && parsed.error && parsed.error.message || parsed && parsed.message || "");
    } catch (parseError) {
      bodyMessage = rawBody.replace(/\s+/g, " ").trim();
    }
  }
  const statusCode = error && error.statusCode ? Number(error.statusCode) : null;
  const statusText = statusCode ? `HTTP ${statusCode}` : "request failed";
  const message = (bodyMessage || String(error && error.message || "AI provider request failed"))
    .replace(/sk-[A-Za-z0-9_\-]+/g, "sk-***")
    .replace(/Bearer\s+[A-Za-z0-9_\-.]+/g, "Bearer ***")
    .slice(0, 240);
  return { statusCode, statusText, message };
}

function askEmyAiUnavailableAnswer(provider = "ai-unavailable", error = null) {
  return {
    answer: "EMY AI is not connected right now, so I cannot answer this from a local template. Connect the AI server/API, then ask again.",
    results: [],
    analytics: null,
    action: null,
    responseType: "chat_answer",
    selectedToolName: "answerDirectly",
    provider,
    ...(error ? { providerError: askEmySafeProviderFailure(error) } : {})
  };
}

function askEmyProviderFailureAnswer(payload, error, records, analyticsSummary) {
  const failure = askEmySafeProviderFailure(error);
  const configuredProvider = askEmyProviderStatus().provider;
  const label = configuredProvider === "openai" ? "OpenAI"
    : configuredProvider === "openrouter" ? "OpenRouter"
      : configuredProvider === "deepseek" ? "DeepSeek"
        : "The AI provider";
  return {
    answer: `${label} did not return a usable AI answer (${failure.statusText}). I will not fill this with local saved/template text. Please retry when the AI connection is working.`,
    results: [],
    analytics: null,
    action: null,
    responseType: "chat_answer",
    selectedToolName: "answerDirectly",
    provider: `ai-error:${configuredProvider}`,
    providerError: failure
  };
}

function askEmyParseAiContent(content) {
  const raw = clean(content);
  if (!raw) return null;
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (error) {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1));
      } catch (nestedError) {}
    }
  }
  return { answer: cleaned, results: [] };
}

function askEmyOpenAiText(json) {
  if (json && typeof json.output_text === "string") return json.output_text;
  const output = Array.isArray(json && json.output) ? json.output : [];
  for (const item of output) {
    const content = Array.isArray(item && item.content) ? item.content : [];
    for (const part of content) {
      if (typeof part.text === "string") return part.text;
      if (typeof part.output_text === "string") return part.output_text;
    }
  }
  return "";
}

function askEmyNormaliseAiResults(results, fallbackRecords) {
  const input = Array.isArray(results) ? results : [];
  const normalised = input
    .map((item, index) => askEmyNormaliseRecord(item, item && item.type || "business", `ai-${index}`))
    .filter(Boolean);
  return (normalised.length ? normalised : fallbackRecords.slice(0, 4)).slice(0, 4);
}

function askEmySelectRecordsForQuery(records, query, payload) {
  if (askEmyIsViewerLocationQuery(query, payload || {}) || askEmyIsViewerProfileQuery(query, payload || {}) || askEmyIsMapCapabilityQuery(query) || askEmyIsBusinessCustomerGeoQuery(query)) {
    return [];
  }
  if (askEmyIsJobApplyFollowUp(query, payload || {})) {
    return askEmyMarkViewerRelationships(askEmyMarkOwnedByViewer(askEmyJobApplyRecords(records, query, payload || {}, 4), payload || {}), payload || {});
  }
  if (askEmyIsOwnedProductListQuery(query, payload || {})) {
    return askEmyOwnedProductListAnswer(query, payload || {}, records, "local-intent").results;
  }
  if (askEmyIsSingleTopProductMetricQuestion(query) || askEmyIsSingleProductCorrection(query, payload || {})) {
    return askEmySingleProductMetricAnswer(query, payload || {}, records, "local-intent").results;
  }
  if (askEmyIsProductDemandQuestion(query)) {
    return askEmyProductDemandBundle(records, query, payload || {}).results;
  }
  return askEmySearchResultBundle(records, query, payload || {}).results;
}

function askEmyNoValidatedRecordsAnswer(query, payload, recordsInput = []) {
  const intent = askEmyClassifyIntent(query);
  const requestedTypes = askEmyResolvedRequestedTypes(query, payload || {});
  const location = askEmyText(payload && payload.location, 120) || "your saved location";
  const radius = askEmyRadiusLabel(payload && payload.radius);
  return askEmyFormatReply([
    askEmyNoResultsLines(intent, requestedTypes, payload || {}, query).join("\n"),
    askEmyFormatSection("Search area", [
      `Location: ${location}`,
      `Radius: ${radius}`
    ]),
    ...askEmyNoResultSuggestionSections(intent, requestedTypes, payload || {}, query, recordsInput)
  ]);
}

function askEmyUnclearAnswer() {
  return "I didn't catch that. Say it another way and I'll follow you.";
}

function askEmyCleanAnswerLayoutText(value) {
  return String(value == null ? "" : value)
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/^[-*_]{3,}$/.test(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function askEmyFormatAiAnswerLayout(value) {
  let text = askEmyCleanAnswerLayoutText(value);
  if (!text) return "";
  text = text.split(/\n/).map((line) => clean(line)).join("\n");
  text = text.replace(/^([A-Z0-9 &'-]+) sells a variety of ([^.]+?) with prices ranging from ([^.]+)\. (All products are in stock\.)$/i, (_match, business, items, range, stock) => {
    const rows = items.split(/,\s+and\s+|,\s*/).map((item) => item.trim()).filter(Boolean);
    return [
      `${business} sells a variety of products.`,
      "",
      "What they sell",
      ...rows.map((item) => `- ${item}`),
      `- Prices range from ${range}`,
      `- ${stock}`
    ].join("\n");
  });
  text = text.replace(/(The nearby business I found is [^.]+\.)(\s+)(They sell\b)/i, "$1\n\n$3");
  text = text.replace(/\bHere are some examples:\s*/i, "\n\nExamples\n");
  text = text.replace(/\s+(Food and Drink products?|Retail products?|Other products?|Service providers?|Jobs?|Events?|Clips?|Posts?)\b/g, "\n- $1");
  text = text.replace(/\s+(If you want\b)/i, "\n\nNext step\n$1");
  text = text.replace(/\n-\s*(?=\n-)/g, "");
  text = text.replace(/\n{3,}/g, "\n\n");
  return askEmyCleanAnswerLayoutText(text);
}

function askEmyCleanAiAnswerText(answer) {
  let text = String(answer == null ? "" : answer).replace(/\r/g, "").trim();
  if (!text) return "";
  text = text.replace(/```[\s\S]*?```/g, "").trim();
  const markers = [
    /\s+Here are some nearby business records[\s\S]*$/i,
    /\s+Here are some of the[\s\S]*$/i,
    /\s+Here are the[\s\S]*$/i,
    /\s+Here it is:\s*\{[\s\S]*$/i,
    /\s+Cards?:[\s\S]*$/i,
    /\s+\[\s*\{[\s\S]*$/i,
    /\s+\{\s*"answer"[\s\S]*$/i,
    /\s+\{\s*"results"[\s\S]*$/i
  ];
  markers.forEach((pattern) => {
    const match = text.match(pattern);
    if (match && match.index > 40) text = text.slice(0, match.index).trim();
  });
  return askEmyFormatAiAnswerLayout(text);
}

function askEmyUnwrapAnswerPayload(answer) {
  const text = clean(answer);
  if (!/^\{[\s\S]*\}$/.test(text)) return { answer: text };
  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") return { answer: text };
    return {
      answer: clean(parsed.answer || parsed.text || text)
    };
  } catch (error) {
    return { answer: text };
  }
}

function askEmyAiResult(answer, records, query, payload, provider, analyticsSummary) {
  const brain = askEmyAssistantBrain(query, payload || {});
  const unwrappedAnswer = askEmyUnwrapAnswerPayload(answer);
  const cleanAnswer = askEmyCleanAiAnswerText(unwrappedAnswer.answer);
  if (!cleanAnswer) return askEmyAiUnavailableAnswer(`ai-empty:${provider}`);
  const toolResult = askEmyExecuteSelectedTool(query, payload || {}, records, analyticsSummary, provider);
  if (toolResult) {
    const toolName = brain.selectedToolName || brain.plannerToolHint || "";
    return {
      ...toolResult,
      answer: cleanAnswer,
      results: brain.recordCardsAllowed ? (Array.isArray(toolResult.results) ? toolResult.results : []) : [],
      provider
    };
  }
  return {
    answer: cleanAnswer,
    results: [],
    analytics: null,
    action: null,
    responseType: brain.responseType || "chat_answer",
    selectedToolName: brain.selectedToolName || brain.plannerToolHint || "answerDirectly",
    provider
  };
}

function askEmyShouldReturnToolBeforeAi(brain = {}, aiWorkerAvailable = false) {
  const toolName = brain && (brain.selectedToolName || brain.plannerToolHint) || "";
  return Boolean(aiWorkerAvailable && brain.recordCardsAllowed && toolName === "searchProducts");
}

async function askEmyAnswer(payload) {
  const query = askEmyText(payload && payload.query, 900);
  const records = await askEmyLoadContextRecords();
  const analyticsSummary = await askEmyLoadAnalyticsSummary(payload || {}, records).catch(() => null);
  if (!query) return { answer: "Tell me what you want to do in EMY and I will help from there.", results: [], provider: "ai-worker" };
  const status = askEmyProviderStatus();
  const openAiKey = askEmyEnv("OPENAI_API_KEY", "openai.api_key");
  const openRouterKey = askEmyEnv("OPENROUTER_API_KEY", "openrouter.api_key");
  const deepSeekKey = askEmyEnv("DEEPSEEK_API_KEY", "deepseek.api_key");
  const requestedProvider = askEmyText(payload && (payload.providerOverride || payload.provider), 80).toLowerCase();
  const provider = requestedProvider.includes("openai") && openAiKey
    ? "openai"
    : requestedProvider.includes("deepseek") && deepSeekKey
      ? "deepseek"
      : requestedProvider.includes("openrouter") && openRouterKey
        ? "openrouter"
        : status.provider;
  const aiWorkerAvailable = provider === "openai" && Boolean(openAiKey)
    || provider === "deepseek" && Boolean(deepSeekKey)
    || provider === "openrouter" && Boolean(openRouterKey);
  const brain = askEmyAssistantBrain(query, payload || {});

  if (askEmyIsSimpleGreetingQuery(query)) {
    return {
      answer: askEmySimpleGreetingAnswer(query, payload || {}),
      results: [],
      analytics: null,
      action: null,
      responseType: "chat_answer",
      selectedToolName: "answerDirectly",
      provider: "local-greeting"
    };
  }

  if (askEmyIsIdentityIntroQuery(query)) {
    return {
      answer: askEmyIdentityIntroAnswer(),
      results: [],
      analytics: null,
      action: null,
      responseType: "chat_answer",
      selectedToolName: "answerDirectly",
      provider: "local-identity"
    };
  }

  if (askEmyShouldReturnToolBeforeAi(brain, aiWorkerAvailable)) {
    const toolResult = askEmyExecuteSelectedTool(query, payload || {}, records, analyticsSummary, "ai-planned-tool");
    if (toolResult) return toolResult;
  }

  if (!aiWorkerAvailable) {
    return askEmyAiUnavailableAnswer("ai-unavailable");
  }

  const messages = askEmyBuildMessages(payload || {}, records, analyticsSummary);

  if (provider === "openrouter" && openRouterKey) {
    const model = status.openRouterModel;
    const json = await askEmyRequestJson("https://openrouter.ai/api/v1/chat/completions", {
      Authorization: `Bearer ${openRouterKey}`,
      "HTTP-Referer": "https://my-emy.com",
      "X-Title": "EMY Ask EMY"
    }, {
      model,
      messages,
      response_format: { type: "json_object" },
      temperature: 0.25
    });
    const parsed = askEmyParseAiContent(json && json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content);
    return askEmyAiResult(parsed && (parsed.answer || parsed.text) || "", records, query, payload || {}, `openrouter:${model}`, analyticsSummary);
  }

  if (provider === "deepseek" && deepSeekKey) {
    const model = status.deepSeekModel;
    const json = await askEmyRequestJson("https://api.deepseek.com/chat/completions", {
      Authorization: `Bearer ${deepSeekKey}`
    }, {
      model,
      messages,
      response_format: { type: "json_object" },
      temperature: 0.25
    });
    const parsed = askEmyParseAiContent(json && json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content);
    return askEmyAiResult(parsed && (parsed.answer || parsed.text) || "", records, query, payload || {}, `deepseek:${model}`, analyticsSummary);
  }

  if (provider === "openai" && openAiKey) {
    const model = status.openAiModel;
    const json = await askEmyRequestJson("https://api.openai.com/v1/responses", {
      Authorization: `Bearer ${openAiKey}`
    }, {
      model,
      input: messages,
      temperature: 0.25,
      max_output_tokens: 900
    });
    const parsed = askEmyParseAiContent(askEmyOpenAiText(json));
    return askEmyAiResult(parsed && (parsed.answer || parsed.text) || "", records, query, payload || {}, `openai:${model}`, analyticsSummary);
  }

  return askEmyAiUnavailableAnswer("ai-unavailable");
}

exports.askEmy = functions.region(REGION).https.onCall(async (data) => {
  const payload = data && typeof data === "object" ? data : {};
  const query = askEmyText(payload && payload.query, 900);
  const brain = query ? askEmyAssistantBrain(query, payload || {}) : {};
  try {
    return askEmySecureFinalResponse(await askEmyAnswer(payload), brain);
  } catch (error) {
    const records = await askEmyLoadContextRecords().catch(() => []);
    const analyticsSummary = await askEmyLoadAnalyticsSummary(payload, records).catch(() => null);
    return askEmySecureFinalResponse(askEmyProviderFailureAnswer(payload, error, records, analyticsSummary), brain);
  }
});

exports.askEmyStatus = functions.region(REGION).https.onRequest((req, res) => {
  if (req.method === "OPTIONS") {
    askEmySendJson(res, 204, {});
    return;
  }
  askEmySendJson(res, 200, askEmyProviderStatus());
});

exports.askEmyHttp = functions.region(REGION).https.onRequest(async (req, res) => {
  const startedAt = Date.now();
  if (req.method === "OPTIONS") {
    askEmySendJson(res, 204, {});
    return;
  }
  if (req.method !== "POST") {
    askEmySendJson(res, 405, { ok: false, error: "Use POST" });
    return;
  }
  const payload = req.body && typeof req.body === "object" ? req.body : {};
  try {
    const query = askEmyText(payload && payload.query, 900);
    const brain = query ? askEmyAssistantBrain(query, payload || {}) : {};
    const answer = askEmySecureFinalResponse(await askEmyAnswer(payload), brain);
    await askEmySaveSearchEvent(payload, answer, startedAt);
    askEmySendJson(res, 200, answer);
  } catch (error) {
    const query = askEmyText(payload && payload.query, 900);
    const brain = query ? askEmyAssistantBrain(query, payload || {}) : {};
    const records = await askEmyLoadContextRecords().catch(() => []);
    const analyticsSummary = await askEmyLoadAnalyticsSummary(payload, records).catch(() => null);
    const fallback = askEmySecureFinalResponse(askEmyProviderFailureAnswer(payload, error, records, analyticsSummary), brain);
    await askEmySaveSearchEvent(payload, fallback, startedAt);
    askEmySendJson(res, 200, fallback);
  }
});
