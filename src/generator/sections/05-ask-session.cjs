/* EMY generator section: 05-ask-session.cjs (source lines 2138-2570) */
const askSessionHelpers = String.raw`
const EMY_ASK_USER_KEY = "emyAskCurrentUser";
const EMY_ASK_CHATS_KEY = "emyAskSavedChatsAiOnlyV1";
const EMY_ASK_ACTIVE_CHAT_KEY = "emyAskActiveChatIdAiOnlyV1";
const EMY_ASK_LOCATION_KEY = "emyAskLocation";
const EMY_ASK_SIDEBAR_KEY = "emyAskSidebarOpen";
const EMY_ASK_SIDEBAR_PINNED_KEY = "emyAskSidebarPinned";
function normaliseAskRole(role) {
  const clean = String(role || "").toLowerCase();
  return clean === "business" ? "business" : "customer";
}
function activeAskAccountRole() {
  return normaliseAskRole(activeEmyRole());
}
function scopedAskStorageKey(key, role = activeAskAccountRole()) {
  return key + ":" + normaliseAskRole(role);
}
function defaultAskUser() {
  const name = "EMY Account";
  return {
    name,
    email: "EMY account",
    image: "",
    imageRef: "",
    role: activeAskAccountRole(),
  };
}
function askFallbackAvatar(name) {
  return "";
}
function normaliseAskUser(user) {
  const name = typeof user?.name === "string" && user.name.trim() ? user.name.trim() : "EMY Account";
  const email = typeof user?.email === "string" && user.email.trim() ? user.email.trim() : "EMY account";
  const imageRef = typeof user?.imageRef === "string" && user.imageRef.trim() ? user.imageRef.trim() : "";
  const image = typeof user?.image === "string" && user.image.trim() ? user.image.trim() : "";
  const role = normaliseAskRole(user?.role || activeEmyRole());
  const businessName = typeof user?.businessName === "string" && user.businessName.trim()
    ? user.businessName.trim()
    : "";
  const businessKey = typeof user?.businessKey === "string" && user.businessKey.trim()
    ? user.businessKey.trim()
    : typeof user?.profileKey === "string" && user.profileKey.trim()
      ? user.profileKey.trim()
      : businessName ? askUserAliasKey(businessName) : "";
  return { name, email, image, imageRef, role, businessName, businessKey };
}
function readAskJson(key, fallback = {}) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "");
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
}
function nameFromEmail(email, fallback = "EMY Account") {
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  return cleanEmail ? cleanEmail.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) : fallback;
}
function askUserAliasKey(value) {
  return String(value || "").trim().toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 140);
}
function activeEmyRole() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const mode = String(params.get("mode") || "").toLowerCase();
  const view = String(params.get("view") || "").toLowerCase();
  const pathName = String(typeof window !== "undefined" ? window.location.pathname : "").toLowerCase();
  if (mode === "business") return "business";
  if (mode === "customer") return "customer";
  if (/emy-customer-/i.test(pathName)) return "customer";
  if (/emy-business-profile\.html/i.test(pathName)) {
    if (String(params.get("setup") || "") === "1" || view === "business" || ["business", "statistics", "services", "chat", "customers", "upload", "profile", "edit"].includes(mode)) return "business";
    if (params.has("business") || view === "customer") return "customer";
    if (
      localStorage.getItem("emyBusinessProfileDraft") ||
      localStorage.getItem("emyBusinessProfilePhoto") ||
      localStorage.getItem("emyBusinessProfilePhotoSrc") ||
      localStorage.getItem("emyBusinessProfilePhotoRef") ||
      localStorage.getItem("emyBusinessDisplayName") ||
      localStorage.getItem("emyBusinessName")
    ) return "business";
  }
  const signedRole = String(localStorage.getItem("emyMainSignedInRole") || "").toLowerCase();
  const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
  const signedOut = localStorage.getItem("emyMainSignedOut") === "1";
  if (signedRole === "customer" || signedRole === "business") return signedRole;
  if (signedOut) return "";
  if (pendingRole === "customer" || pendingRole === "business") return pendingRole;
  return "";
}
function readEmyCustomerAccountUser(requireActiveRole = false) {
  try {
    const role = activeEmyRole();
    if (requireActiveRole && role && role !== "customer") return null;
    const signedEmail = localStorage.getItem("emyMainSignedInEmail") || "";
    const pendingEmail = localStorage.getItem("emyMainPendingSignupEmail") || "";
    const email = signedEmail || pendingEmail;
    const firstName = localStorage.getItem("emyMainPendingSignupFirstName") || "";
    const lastName = localStorage.getItem("emyMainPendingSignupLastName") || "";
    const displayName = localStorage.getItem("emyCustomerDisplayName") || [firstName, lastName].map((part) => part.trim()).filter(Boolean).join(" ");
    const pendingRoleForPhoto = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
    const photo = localStorage.getItem("emyCustomerProfilePhoto") ||
      localStorage.getItem("emyCustomerProfilePhotoSrc") ||
      (pendingRoleForPhoto === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") : "") ||
      (pendingRoleForPhoto === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoSrc") : "") ||
      "";
    const photoRef = localStorage.getItem("emyCustomerProfilePhotoRef") ||
      (pendingRoleForPhoto === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "") ||
      "";
    const hasCustomerSession = role === "customer" && Boolean(email || displayName || photo || photoRef);
    const hasCustomerProfile = Boolean(displayName || email || photo || photoRef);
    if (!hasCustomerSession && !hasCustomerProfile) return null;
    const name = displayName || nameFromEmail(email, "EMY Customer");
    return normaliseAskUser({ name, email: email || "Customer account", image: photo, imageRef: photoRef, role: "customer" });
  } catch (error) {
    return null;
  }
}
function readEmyBusinessAccountUser(requireActiveRole = false) {
  try {
    const role = activeEmyRole();
    if (requireActiveRole && role && role !== "business") return null;
    const profile = readAskJson("emyBusinessProfileDraft", {});
    const signedEmail = localStorage.getItem("emyMainSignedInEmail") || "";
    const pendingEmail = localStorage.getItem("emyMainPendingSignupEmail") || "";
    const email = String(profile.businessEmail || signedEmail || pendingEmail || "").trim();
    const businessName = String(profile.businessName || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || "").trim();
    const firstName = localStorage.getItem("emyMainPendingSignupFirstName") || "";
    const lastName = localStorage.getItem("emyMainPendingSignupLastName") || "";
    const fallbackName = [firstName, lastName].map((part) => part.trim()).filter(Boolean).join(" ");
    const customerMediaValues = new Set([
      localStorage.getItem("emyCustomerProfilePhoto"),
      localStorage.getItem("emyCustomerProfilePhotoSrc"),
      localStorage.getItem("emyCustomerProfilePhotoRef"),
      localStorage.getItem("emyCustomerProfileImage"),
      localStorage.getItem("emyCustomerProfileImageRef"),
      localStorage.getItem("emyCustomerAvatar"),
      localStorage.getItem("emyCustomerAvatarRef"),
      localStorage.getItem("emyCustomerPhoto"),
      localStorage.getItem("emyCustomerPhotoRef"),
      localStorage.getItem("emyMainPendingSignupPhoto"),
      localStorage.getItem("emyMainPendingSignupPhotoSrc"),
      localStorage.getItem("emyMainPendingSignupPhotoRef")
    ].map((value) => String(value || "").trim()).filter(Boolean));
    const firstBusinessMedia = (values) => values
      .map((value) => String(value || "").trim())
      .find((value) => value && !customerMediaValues.has(value)) || "";
    const photo = firstBusinessMedia([
      localStorage.getItem("emyBusinessProfilePhoto"),
      localStorage.getItem("emyBusinessProfilePhotoSrc"),
      localStorage.getItem("emyMainPendingSignupBusinessPhoto"),
      profile.profilePhoto,
      profile.profilePhotoSrc,
      profile.photo,
      profile.photoSrc
    ]);
    const photoRef = firstBusinessMedia([
      localStorage.getItem("emyBusinessProfilePhotoRef"),
      localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"),
      profile.profilePhotoRef,
      profile.photoRef
    ]);
    const hasBusinessSession = role === "business" && Boolean(email || businessName || photo || photoRef || fallbackName);
    const hasBusinessProfile = Boolean(businessName || email || photo || photoRef);
    if (!hasBusinessSession && !hasBusinessProfile) return null;
    return normaliseAskUser({
      name: businessName || fallbackName || nameFromEmail(email, "EMY Business"),
      email: email || "Business account",
      image: photo,
      imageRef: photoRef,
      role: "business",
      businessName,
      businessKey: String(profile.businessKey || profile.profileKey || localStorage.getItem("emyBusinessKey") || localStorage.getItem("emyBusinessProfileKey") || "").trim(),
    });
  } catch (error) {
    return null;
  }
}
function readEmyAccountUserForRole(role) {
  return normaliseAskRole(role) === "business" ? readEmyBusinessAccountUser(false) : readEmyCustomerAccountUser(false);
}
function readEmyActiveAccountUser() {
  const role = activeEmyRole();
  if (!role && localStorage.getItem("emyMainSignedOut") === "1") return null;
  if (role === "business") return readEmyBusinessAccountUser(true);
  if (role === "customer") return readEmyCustomerAccountUser(true);
  return readEmyCustomerAccountUser(false) || readEmyBusinessAccountUser(false);
}
function readEmyAskAccountOptions() {
  return ["customer", "business"].map((role) => {
    const user = readEmyAccountUserForRole(role);
    return user ? { ...user, role } : null;
  }).filter(Boolean);
}
function switchEmyAskAccount(role) {
  const nextRole = normaliseAskRole(role);
  try {
    localStorage.setItem("emyMainSignedInRole", nextRole);
    localStorage.removeItem("emyMainSignedOut");
    const nextUser = readEmyAccountUserForRole(nextRole) || normaliseAskUser({ name: nextRole === "business" ? "EMY Business" : "EMY Customer", email: nextRole === "business" ? "Business account" : "Customer account", role: nextRole });
    if (nextUser.email && !/ account$/i.test(nextUser.email)) localStorage.setItem("emyMainSignedInEmail", nextUser.email);
    localStorage.setItem(EMY_ASK_USER_KEY, JSON.stringify(nextUser));
    window.dispatchEvent(new CustomEvent("emy:account-changed", { detail: { role: nextRole, user: nextUser } }));
    return nextUser;
  } catch (error) {
    return readEmyActiveAccountUser();
  }
}
function readStoredAskUser() {
  const accountUser = readEmyActiveAccountUser();
  if (accountUser) {
    try { localStorage.setItem(EMY_ASK_USER_KEY, JSON.stringify(accountUser)); } catch (error) {}
    return accountUser;
  }
  try {
    const stored = localStorage.getItem(EMY_ASK_USER_KEY);
    if (!stored) return null;
    const parsed = normaliseAskUser(JSON.parse(stored));
    const isOldPreviewUser = (parsed.email.split("@")[0] || "").toLowerCase() === "isaac" && parsed.email.toLowerCase().endsWith("@emy.com") || parsed.image.includes("images.unsplash.com");
    return isOldPreviewUser ? null : parsed;
  } catch (error) {
    return null;
  }
}
function saveStoredAskUser(user) {
  try {
    const normalised = normaliseAskUser(user);
    localStorage.setItem(EMY_ASK_USER_KEY, JSON.stringify(normalised));
    const email = String(normalised.email || "").trim();
    if (email && !/ account$/i.test(email)) {
      if (!activeEmyRole()) localStorage.setItem("emyMainSignedInRole", "customer");
      localStorage.setItem("emyMainSignedInEmail", email);
      localStorage.removeItem("emyMainSignedOut");
    }
  } catch (error) {}
}
function makeAskUserFromLogin(email) {
  const accountUser = readEmyActiveAccountUser();
  if (accountUser) return accountUser;
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  return normaliseAskUser({
    name: nameFromEmail(cleanEmail, "EMY Account"),
    email: cleanEmail || "EMY account",
    image: "",
  });
}
function clearStoredAskUser() {
  try {
    localStorage.removeItem(EMY_ASK_USER_KEY);
  } catch (error) {}
}
function clearEmyAccountSession() {
  clearStoredAskUser();
  try {
    localStorage.removeItem("emyMainSignedInRole");
    localStorage.removeItem("emyMainSignedInEmail");
    localStorage.setItem("emyMainSignedOut", "1");
  } catch (error) {}
}
function emyLoginUrl() {
  return "index.html?emyAuth=signin";
}
function emyProfileUrl() {
  const role = activeEmyRole();
  if (role === "business") return "emy-business-profile.html?mode=business";
  return "emy-customer-profile.html";
}
function goToEmyLogin() {
  clearEmyAccountSession();
  window.location.href = emyLoginUrl();
}
function goToEmyProfile() {
  window.location.href = emyProfileUrl();
}
function createAskChatId() {
  return "chat-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
}
const STALE_ASK_EMY_READY_TEXT = ["Hi Isaac", "Ask EMY is " + "ready."].join(", ");
const REPAIRED_ASK_EMY_READY_TEXT = "I'm here.";
const GENERIC_ASK_EMY_GREETING_TEXT = "Hi. I'm here.";
const STALE_ASK_EMY_LOADING_TEXT = ["Ask EMY is checking the business data", "and preparing an answer..."].join(" ");
function storedAskFirstName() {
  try {
    const user = typeof readStoredAskUser === "function" ? readStoredAskUser() : {};
    const clean = (value) => String(value || "").trim().replace(/\s+/g, " ");
    const direct = clean(user && (user.firstName || user.customerFirstName || user.givenName)) || clean(localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName"));
    const display = clean(user && (user.displayName || user.name || user.profileName)) || clean(localStorage.getItem("emyCustomerDisplayName") || localStorage.getItem("emyMainSignedInEmail"));
    const businessName = clean(user && (user.businessName || user.business));
    const candidate = direct || (display && display.toLowerCase() !== businessName.toLowerCase() ? display.split(" ")[0] : "");
    if (!candidate || /^(emy|customer|business|account|test|user)$/i.test(candidate)) return "";
    return candidate.slice(0, 32);
  } catch (error) {
    return "";
  }
}
function personalisedAskGreetingText() {
  const firstName = storedAskFirstName();
  return firstName ? "Hi " + firstName + ". Good to see you again." : "Hi. Good to see you.";
}
function storedAskTextLooksPlaceholder(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return true;
  const compact = text.replace(/[^a-z0-9]+/g, "");
  if (!compact) return true;
  if (/^(test|testing|demo|dummy|sample|placeholder|lorem|ipsum|asdf|qwer|qwerty|foo|bar|blah|none|null|undefined|product|post|clip|item|ddaas)$/i.test(compact)) return true;
  if (/^([a-z0-9])\1{1,}$/i.test(compact)) return true;
  if (/^[a-z]{1,2}$/i.test(compact)) return true;
  if (/\b(gjh|qwd|hjkl|asdf|qwerty|pjnh|iuo|lnih|hbbid|ddaas)\b/i.test(text)) return true;
  return text.split(/[^a-z0-9]+/).filter(Boolean).some((word) => word.length >= 7 && /[a-z]/i.test(word) && /[bcdfghjklmnpqrstvwxyz]{5,}/i.test(word));
}
function storedAskDirectionsDestinationFromQuery(query) {
  const text = String(query || "").trim();
  if (!text) return "";
  const match = text.match(/\b(?:to|for)\s+(.+?)\s*$/i);
  if (!match) return "";
  const destination = String(match[1] || "")
    .replace(/\b(?:please|pls|plz|direction|directions|route|map|maps|show|open|take me|navigate)\b/gi, " ")
    .replace(/\?+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!destination || /^(there|it|that|them|they|those|here)$/i.test(destination)) return "";
  return destination.slice(0, 180);
}
function storedAskTypedDirectionsDestination(message, previousUserMessage = null) {
  return storedAskDirectionsDestinationFromQuery(message && message.query)
    || storedAskDirectionsDestinationFromQuery(previousUserMessage && previousUserMessage.text)
    || "";
}
function storedAskMapResultMatchesTypedBusiness(result, typedDestination) {
  const destinationAlias = askUserAliasKey(typedDestination);
  if (!destinationAlias) return false;
  return [
    result && result.business,
    result && result.businessName,
    result && result.businessKey,
    result && result.profileKey,
    result && result.ownerKey,
    result && result.sellerKey,
  ].some((value) => {
    const alias = askUserAliasKey(value);
    return alias && (alias === destinationAlias || alias.includes(destinationAlias) || destinationAlias.includes(alias));
  });
}
function storedAskMapResultLooksInvented(result, typedDestination) {
  const type = String(result && result.type || "").trim().toLowerCase();
  if (type !== "map" && type !== "directions") return false;
  const destinationText = String(result && (result.destination || result.place || result.address || result.location) || "").trim();
  const destinationAlias = askUserAliasKey(typedDestination);
  if (!destinationAlias) return false;
  if (storedAskMapResultMatchesTypedBusiness(result, typedDestination)) return false;
  const fields = [
    destinationText,
    result && result.name,
    result && result.desc,
    result && result.description,
    result && result.mapUrl,
    result && result.directionsUrl,
    result && result.url,
  ].map((value) => String(value || "").trim()).filter(Boolean);
  return fields.some((value) => {
    const alias = askUserAliasKey(value);
    return alias === destinationAlias
      || alias.endsWith("-to-" + destinationAlias)
      || alias.includes("directions-to-" + destinationAlias)
      || alias.includes("route-from-") && alias.includes("-to-" + destinationAlias);
  });
}
function repairStoredAskResults(message, previousUserMessage = null) {
  const results = Array.isArray(message && message.results) ? message.results : [];
  if (!results.length) return results;
  const text = String(message.text || "").toLowerCase();
  const typedDestination = storedAskTypedDirectionsDestination(message, previousUserMessage);
  if (/saved ask emy search location|exact gps|exact physical address|gps coordinates|i can see your saved ask emy search location/.test(text)) return [];
  return results.filter((result) => {
    const name = String(result && result.name || "").trim().toLowerCase();
    const desc = String(result && (result.desc || result.description || result.summary) || "").trim().toLowerCase();
    const business = String(result && (result.business || result.businessName) || "").trim().toLowerCase();
    const type = String(result && result.type || "").trim().toLowerCase();
    const destination = String(result && (result.destination || result.place || result.address || result.location) || "").trim().toLowerCase();
    const latitude = Number(result && (result.latitude || result.lat));
    const longitude = Number(result && (result.longitude || result.lng || result.lon));
    const image = String(result && (result.image || result.imageUrl) || "").trim();
    const place = String(result && (result.place || result.location) || "").trim();
    const category = String(result && result.category || "").trim();
    if (name === "emy test customer") return false;
    if (business === "isaac stephane mbongue nkam") return false;
    if (/^(your post was published|clip upload completed|post upload completed|upload completed|new clip|new post)$/i.test(desc)) return false;
    if ((type === "map" || type === "directions") && (/^0\s*,\s*0$/.test(destination) || Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) < 0.0001 && Math.abs(longitude) < 0.0001)) return false;
    if (typedDestination && storedAskMapResultLooksInvented(result, typedDestination)) return false;
    if (["product", "job", "event", "service"].includes(type) && storedAskTextLooksPlaceholder(name)) return false;
    if (type === "business" && name === "emy" && !desc && !image && !place && !category) return false;
    return true;
  });
}
function storedAskMessageLooksBrokenMap(message, previousUserMessage = null) {
  if (!message || message.pending) return false;
  const text = String(message.text || "").toLowerCase();
  const query = String(message.query || "").toLowerCase();
  const previousText = String(previousUserMessage && previousUserMessage.text || "").toLowerCase();
  const results = Array.isArray(message.results) ? message.results : [];
  if (!/\b(map|route|directions?|destination|pin)\b/.test(text + " " + query + " " + previousText)) return false;
  if (/destination:\s*0\s*,\s*0\b/.test(text) || /\b0\s*,\s*0\b/.test(text) && /\bmap pin\b/.test(text)) return true;
  const typedDestination = storedAskTypedDirectionsDestination(message, previousUserMessage);
  return results.some((result) => {
    const type = String(result && result.type || "").toLowerCase();
    if (type !== "map" && type !== "directions") return false;
    const destination = String(result && (result.destination || result.place || result.address || result.location) || "").trim().toLowerCase();
    const latitude = Number(result && (result.latitude || result.lat));
    const longitude = Number(result && (result.longitude || result.lng || result.lon));
    return /^0\s*,\s*0$/.test(destination)
      || Number.isFinite(latitude) && Number.isFinite(longitude) && Math.abs(latitude) < 0.0001 && Math.abs(longitude) < 0.0001
      || typedDestination && storedAskMapResultLooksInvented(result, typedDestination);
  });
}
function storedAskMessageMentionsMissingCards(message) {
  if (!message || message.pending || message.autoRecoveredCards || Array.isArray(message.results) && message.results.length) return false;
  const text = String(message.text || "").toLowerCase();
  if (!text) return false;
  const mentionsRecord = /\b(job|jobs|job opening|hiring|role|product|products|service|services|business|businesses|clip|clips|video|videos|post|posts|event|events|map|maps|route|routes|direction|directions)\b/.test(text);
  const claimsResult = /\b(here is|here's|here are|i found|found|available|opening|showing|listed|below|card|cards|result|results)\b/.test(text);
  return mentionsRecord && claimsResult;
}
function storedAskMessageLooksTextOnlyProductRanking(message) {
  if (!message || message.pending || Array.isArray(message.results) && message.results.length) return false;
  const text = String(message.text || "").toLowerCase();
  if (!text) return false;
  const productRankText = /\b(most sold product|top products|popular products|other popular products|ranked by views|ranked by engagement|views and engagement|best[-\s]?selling|top[-\s]?selling|people buy the most)\b/.test(text);
  const productFields = /\b(category|price|views|likes|saved|business):\b/.test(text);
  return productRankText && productFields;
}
function storedAskMessageHasRawMediaLinkLines(message) {
  if (!message || message.pending) return false;
  return /(^|\n)\s*-\s*(Image|Link):\s*(https?:\/\/|emy-[^\s]+\.html|\/)/i.test(String(message.text || ""));
}
function removeStoredAskRawMediaLinkLines(value) {
  return String(value || "")
    .split(/\n/)
    .filter((line) => !/^\s*-\s*(Image|Link):\s*(https?:\/\/|emy-[^\s]+\.html|\/)/i.test(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
function storedAskTextLooksProductRankingQuestion(value) {
  const text = String(value || "").toLowerCase().replace(/\bviewd\b/g, "viewed").replace(/\s+/g, " ").trim();
  if (!text || !/\b(products?|items?|stock|listings?)\b/.test(text)) return false;
  const rankedMetric = /\b(most|top|best|highest|popular|rank|ranking|ranked)\b[\s\S]{0,70}\b(views?|viewed|visits?|liked|saved|engagement|performance|interest|popular)\b/.test(text);
  const metricRanked = /\b(views?|viewed|visits?|liked|saved|engagement|performance|interest|popular)\b[\s\S]{0,70}\b(most|top|best|highest|popular|rank|ranking|ranked)\b/.test(text);
  return rankedMetric || metricRanked;
}
function storedAskMessageLooksProductRankingSearchFallback(message, previousUserMessage = null) {
  if (!message || message.pending || message.autoRecoveredCards || Array.isArray(message.results) && message.results.length) return false;
  const text = String(message.text || "").toLowerCase();
  const previousText = String(previousUserMessage && previousUserMessage.text || "").toLowerCase();
  const badNoResult = /\b(product listed on emy for .*most|shop selling .*most|try widening the radius|searching for a broader product category|search area)\b/.test(text)
    && /\b(most\s+view|most\s+viewed|most\s+popular|top\s+view|top\s+viewed|rank|ranking)\b/.test((text + " " + previousText).replace(/\bviewd\b/g, "viewed"));
  return badNoResult && storedAskTextLooksProductRankingQuestion(previousText);
}
function storedAskMessageLooksBusinessProductFollowUpNoResult(message, previousUserMessage = null) {
  if (!message || message.pending || message.autoRecoveredCards || Array.isArray(message.results) && message.results.length) return false;
  const text = String(message.text || "").toLowerCase();
  const previousText = String(previousUserMessage && previousUserMessage.text || "").toLowerCase();
  if (!/\b(no matching result|don't see a matching result|do not see a matching result|try widening the radius|changing the location)\b/.test(text)) return false;
  return /\b(product|products)\b/.test(previousText)
    && /\b(my business|my shop|my store|your business|this business|that business|the business|it|its|they|their|them|that|this)\b/.test(previousText);
}
function storedAskMessageLooksProductDetailWall(message) {
  if (!message || message.pending || message.autoRecoveredCards) return false;
  const text = String(message.text || "");
  const results = Array.isArray(message.results) ? message.results : [];
  const productResults = results.filter((result) => String(result && result.type || "").toLowerCase() === "product");
  if (productResults.length < 3) return false;
  const productBlock = /\n\s*products\s*\n/i.test(text) || /\bproduct options\b/i.test(text);
  const rawMediaLines = /\n\s*-\s*(image|link):\s*/i.test(text);
  const repeatedDetailRows = (text.match(/\n\s*-\s*(business|ownership|relationship|price|availability|category):/gi) || []).length;
  return productBlock && (rawMediaLines || repeatedDetailRows >= 8);
}
function storedAskMessageLooksMixedOwnedContentDump(message, previousUserMessage = null) {
  if (!message || message.pending || message.autoRecoveredCards) return false;
  const text = String(message.text || "").toLowerCase();
  const previousText = String(previousUserMessage && previousUserMessage.text || "").toLowerCase();
  if (!/\b(ones?|items?|records?|cards?|results?|content)\b[\s\S]{0,50}\b(i|we|my|mine|own|owned)\b/.test(previousText)) return false;
  const mixedCounts = /\bproducts:\s*\d+[\s\S]{0,160}\b(clips?|posts?|articles?|jobs?):\s*\d+/.test(text);
  const ownedDump = /\byou own content under\b/.test(text) || /\btop owned products by engagement\b/.test(text);
  const mixedResults = Array.isArray(message.results) && new Set(message.results.map((result) => String(result && result.type || "").toLowerCase()).filter(Boolean)).size > 1;
  return ownedDump || mixedCounts || mixedResults && /\bwhat i can see\b/.test(text);
}
function storedAskTextLooksProfileIntent(value) {
  const text = String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text || /\bprofile views?\b/.test(text)) return false;
  const imageIntent = /\b(image|photo|picture|avatar)\b/.test(text)
    && /\b(my|mine|me|account|profile|customer|client|business|shop|store|company)\b/.test(text);
  const openIntent = /\b(profile|account)\b/.test(text)
    && /\b(show|open|view|go to|take me|bring|pull up|display)\b/.test(text)
    && /\b(my|mine|customer|client|business|shop|store|company|profile|account)\b/.test(text);
  return imageIntent || openIntent;
}
function storedAskTextLooksViewerProfileQuestion(value) {
  const text = String(value || "").toLowerCase().replace(/\bi\s+m\b/g, "i am").replace(/\bim\b/g, "am").replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (storedAskTextLooksViewerLocationQuestion(text)) return false;
  return /\b(do you know me|know me|know who i am|do you know who i am|who am i|who i am|who am i\?|what do you know about me|tell me about me|tell me about my account|what do you know about my account|my account details|my account information)\b/.test(text);
}
function repairedStoredAskViewerProfileText(message) {
  const text = String(message && message.text || "");
  const nameMatch = text.match(/\b(?:you're|you are)\s+([^\n.]+?)(?:\.|\n|$)/i)
    || text.match(/\baccount name:\s*([^\n]+)/i);
  const storedName = (() => {
    try {
      const user = typeof readStoredAskUser === "function" ? readStoredAskUser() : {};
      return String(user && (user.displayName || user.name || user.profileName || user.customerName) || "").trim();
    } catch (error) {
      return "";
    }
  })();
  const name = String(nameMatch && nameMatch[1] || storedName || "").replace(/\s+/g, " ").trim();
  return name ? "You're " + name + "." : "I can see you're signed in to EMY.";
}
function storedAskMessageLooksProfileIntentRelationshipDump(message, previousUserMessage = null) {
  if (!message || message.pending || message.autoRecoveredCards) return false;
  const text = String(message.text || "").toLowerCase();
  const previousText = String(previousUserMessage && previousUserMessage.text || "");
  if (!storedAskTextLooksProfileIntent(previousText)) return false;
  return /\bcustomer relationships? visible\b/.test(text)
    || /\bcustomer privacy\b/.test(text) && /\b(customer relationship|only customer|visible customer)\b/.test(text)
    || /\bhas \d+ customer relationships? on emy\b/.test(text);
}
function storedAskMessageLooksOwnershipWordingBug(message) {
  if (!message || message.pending) return false;
  const text = String(message.text || "").toLowerCase();
  return /it looks like ["']?zcsdcaasx["']? is an article from your business/.test(text)
    || /you see ['"]your business['"] because these items belong to the business/.test(text);
}
function storedAskTextLooksProductCreationQuestion(value) {
  const text = String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (!/\b(products?|items?|stock|listings?)\b/.test(text)) return false;
  if (/^(show|find|search|browse|more)\b/.test(text)) return false;
  return /\b(create|add|upload|publish|post|list|make|draft|prepare|set up|setup)\b[\s\S]{0,90}\b(?:products?|items?|stock|listings?)\b/.test(text)
    || /\b(?:products?|items?|stock|listings?)\b[\s\S]{0,90}\b(create|add|upload|publish|post|list|make|draft|prepare|set up|setup)\b/.test(text)
    || /\b(how|hoe|hwo|howe)\s+(?:do|can|should)\s+(?:i|you|we)\b[\s\S]{0,100}\b(?:products?|items?|stock|listings?)\b/.test(text);
}
function storedAskMessageLooksProductCreationSearchFallback(message, previousUserMessage = null) {
  if (!message || message.pending) return false;
  const text = String(message.text || "").toLowerCase();
  const previousText = String(previousUserMessage && previousUserMessage.text || "").toLowerCase();
  const badNoResult = /\b(product listed on emy for .*create|shop selling .*create|try widening the radius|searching for a broader product category|search area)\b/.test(text);
  return badNoResult && (storedAskTextLooksProductCreationQuestion(previousText) || /\b(create|add|publish|upload)\b[\s\S]{0,60}\bproducts?\b/.test(text));
}
function storedAskTextLooksVagueProductNeedQuestion(value) {
  const text = String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text || !/\b(products?|items?|stock|listings?)\b/.test(text)) return false;
  if (/^(show|find|search|browse|more|list)\b/.test(text)) return false;
  if (storedAskTextLooksProductCreationQuestion(text)) return false;
  return /\b(i|we|you)?\s*(?:need|want|require|looking for|look for|get|buy)\s+(?:a\s+|an\s+|some\s+|any\s+|new\s+|the\s+|my\s+)?(?:products?|items?|something)\b/.test(text)
    || /\b(?:products?|items?)\s+(?:needed|required|wanted)\b/.test(text);
}
function storedAskMessageLooksVagueProductNeedSearchFallback(message, previousUserMessage = null) {
  if (!message || message.pending) return false;
  const text = String(message.text || "").toLowerCase();
  const previousText = String(previousUserMessage && previousUserMessage.text || "").toLowerCase();
  const badNoResult = /\b(product listed on emy for need|product listed on emy for want|product listed on emy for require|try widening the radius|searching for a broader product category|search area)\b/.test(text);
  return badNoResult && storedAskTextLooksVagueProductNeedQuestion(previousText);
}
function storedAskNormaliseIntentWord(word) {
  const text = String(word || "").toLowerCase();
  const canonical = ["product", "products", "item", "items", "stock", "listing", "listings"];
  if (!text || text.length < 4 || canonical.includes(text)) return text;
  const sorted = text.split("").sort().join("");
  const match = canonical.find((candidate) => candidate.length === text.length && candidate[0] === text[0] && candidate.split("").sort().join("") === sorted);
  return match || text;
}
function storedAskNormaliseIntentText(value) {
  return String(value || "").toLowerCase().replace(/\s+/g, " ").trim().replace(/\b[a-z][a-z0-9]*\b/g, (word) => storedAskNormaliseIntentWord(word));
}
function storedAskTextLooksOwnedProductsRequest(value) {
  const text = storedAskNormaliseIntentText(value);
  if (!text || !/\b(products?|items?|stock|listings?)\b/.test(text)) return false;
  if (/^(find|search|browse)\b/.test(text) && !/\b(my|mine|own|owned|your)\b/.test(text)) return false;
  return /\b(show|list|open|see|display|get|bring)\b[\s\S]{0,70}\b(my|mine|own|owned|your)\b[\s\S]{0,40}\b(products?|items?|stock|listings?)\b/.test(text)
    || /\b(my|mine|own|owned|your)\b[\s\S]{0,40}\b(products?|items?|stock|listings?)\b/.test(text) && /\b(yes|yeah|yep|yup|ok|okay|show|list|open|see|display|get|bring)\b/.test(text);
}
function storedAskMessageLooksOwnedProductSearchFallback(message, previousUserMessage = null) {
  if (!message || message.pending) return false;
  const text = String(message.text || "").toLowerCase();
  const previousText = String(previousUserMessage && previousUserMessage.text || "").toLowerCase();
  const badNoResult = /\b(product listed on emy for yes|product listed on emy for my|product listed on emy for own|try widening the radius|searching for a broader product category|search area)\b/.test(text);
  return badNoResult && storedAskTextLooksOwnedProductsRequest(previousText);
}
function storedAskTextLooksBusinessSetupQuestion(value) {
  const text = String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (/^(show|find|search|browse|more|list)\b/.test(text)) return false;
  const setupVerb = /\b(start|setup|set up|create|launch|build|open|register|make)\b/.test(text);
  const businessTarget = /\b(business|shop|company|store|business profile|profile|emy)\b/.test(text);
  return setupVerb && businessTarget
    || /\b(i want to|i need to|help me|can you help|could you help)\b[\s\S]{0,80}\b(set up|setup|start|create|launch|open)\b[\s\S]{0,80}\b(business|shop|company|store|profile)\b/.test(text);
}
function storedAskMessageLooksBusinessSetupGuidanceWithCards(message, previousUserMessage = null) {
  if (!message || message.pending || !Array.isArray(message.results) || !message.results.length) return false;
  const text = String(message.text || "").toLowerCase();
  const previousText = String(previousUserMessage && previousUserMessage.text || "").toLowerCase();
  const answerLooksLikeSetup = /\b(to set up a business|business profile first|create or open a business profile|what to prepare|business name|opening hours|profile image|cover image)\b/.test(text);
  const answerLooksLikeSearch = /\b(i found|showing them|search area|matches|result cards|product cards|clip cards)\b/.test(text);
  return !answerLooksLikeSearch && (storedAskTextLooksBusinessSetupQuestion(previousText) || answerLooksLikeSetup);
}
function storedAskMessageLooksOldRepeatedGreeting(message) {
  if (!message || message.pending) return false;
  const text = String(message.text || "").toLowerCase();
  return /still here[\s,]*[^.]*\.?\s*you do not need a perfect question/.test(text)
    || /you do not need a perfect question\.?\s*say the goal in your own words/.test(text);
}
function storedAskMessageLooksOldCannedGreeting(message) {
  if (!message || message.pending) return false;
  const text = String(message.text || "").toLowerCase();
  return /\bhi\s+[^,\n.]+,\s*i['’]?m here\.?\s*tell me what you want to move forward\b/.test(text)
    || /\btell me what you want to move forward:\s*set up or improve a business\b/.test(text)
    || /\bset up or improve a business,\s*find customers or suppliers,\s*understand your data\b/.test(text);
}
function storedAskMessageLooksViewerLocationDefensiveDump(message) {
  if (!message || message.pending) return false;
  const text = String(message.text || "").toLowerCase();
  return /\bwhat i will not use\b/.test(text) && /\bi will not use honey shop's customer list\b/.test(text)
    || /\byou mean your own customer\/user location, not honey shop\b/.test(text);
}
function storedAskTextLooksViewerLocationQuestion() {
  return false;
}
function repairStoredAskMessage(message, previousUserMessage = null) {
  return message;
}
function repairStoredAskChat(chat, role) {
  return { ...chat, accountRole: chat.accountRole || role };
}
function readStoredAskChats() {
  try {
    const role = activeAskAccountRole();
    const scopedKey = scopedAskStorageKey(EMY_ASK_CHATS_KEY, role);
    const stored = localStorage.getItem(scopedKey) || (role === "customer" ? localStorage.getItem(EMY_ASK_CHATS_KEY) : "");
    const parsed = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return [];
    const repairedChats = parsed.filter((chat) => chat && chat.id && chat.title && Array.isArray(chat.messages)).map((chat) => repairStoredAskChat(chat, role));
    if (stored && JSON.stringify(parsed) !== JSON.stringify(repairedChats)) {
      localStorage.setItem(scopedKey, JSON.stringify(repairedChats.slice(0, 50)));
    }
    return repairedChats;
  } catch (error) {
    return [];
  }
}
function saveStoredAskChats(chats) {
  try {
    const role = activeAskAccountRole();
    const cleanChats = Array.isArray(chats) ? chats.filter((chat) => chat && chat.id && chat.title).map((chat) => repairStoredAskChat(chat, role)).slice(0, 50) : [];
    localStorage.setItem(scopedAskStorageKey(EMY_ASK_CHATS_KEY, role), JSON.stringify(cleanChats));
  } catch (error) {}
}
function readStoredAskActiveChatId() {
  try {
    const role = activeAskAccountRole();
    return String(localStorage.getItem(scopedAskStorageKey(EMY_ASK_ACTIVE_CHAT_KEY, role)) || localStorage.getItem(EMY_ASK_ACTIVE_CHAT_KEY) || "").trim();
  } catch (error) {
    return "";
  }
}
function saveStoredAskActiveChatId(chatId) {
  try {
    const cleanId = String(chatId || "").trim();
    if (!cleanId) return;
    const role = activeAskAccountRole();
    localStorage.setItem(scopedAskStorageKey(EMY_ASK_ACTIVE_CHAT_KEY, role), cleanId);
    if (role === "customer") localStorage.setItem(EMY_ASK_ACTIVE_CHAT_KEY, cleanId);
  } catch (error) {}
}
function normaliseAskLocation(value = {}) {
  const rawLocation = typeof value.location === "string" ? value.location.trim() : "";
  const cleanRawLocation = rawLocation && (rawLocation === "Near me" || (rawLocation.length >= 3 && /[A-Za-z0-9]/.test(rawLocation))) ? rawLocation : "";
  const numericRadius = Number(value.radius);
  const cleanRadius = Number.isFinite(numericRadius) ? Math.min(10, Math.max(1, Math.round(numericRadius))) : 5;
  const latitude = Number(value.latitude);
  const longitude = Number(value.longitude);
  const cleanSavedLocations = Array.isArray(value.savedLocations)
    ? value.savedLocations.map((item) => String(item || "").trim()).filter((item) => item.length >= 3 && /[A-Za-z0-9]/.test(item)).filter((item, index, list) => list.findIndex((saved) => saved.toLowerCase() === item.toLowerCase()) === index).slice(0, 5)
    : [];
  return {
    location: cleanRawLocation || "Near me",
    radius: cleanRadius,
    savedLocations: cleanSavedLocations,
    latitude: Number.isFinite(latitude) ? latitude : null,
    longitude: Number.isFinite(longitude) ? longitude : null,
    locationLabel: typeof value.locationLabel === "string" ? value.locationLabel.trim() : "",
    locationSource: value.locationSource === "current" || value.locationSource === "saved" ? value.locationSource : "",
  };
}
function readAskCustomerAccountLocation() {
  try {
    const stored = localStorage.getItem("emyCustomerSavedPlaces");
    const parsed = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return normaliseAskLocation();
    const places = parsed
      .filter((place) => place && typeof place.address === "string" && place.address.trim())
      .map((place) => ({
        address: place.address.trim(),
        radius: Number(place.radius),
        latitude: Number(place.latitude),
        longitude: Number(place.longitude),
      }));
    if (!places.length) return normaliseAskLocation();
    const selected = places[0];
    return normaliseAskLocation({
      location: selected.address,
      radius: selected.radius,
      savedLocations: places.map((place) => place.address),
      latitude: selected.latitude,
      longitude: selected.longitude,
      locationLabel: selected.address,
      locationSource: "saved",
    });
  } catch (error) {
    return normaliseAskLocation();
  }
}
function readStoredAskLocation(params) {
  const role = activeAskAccountRole();
  let current = role === "customer" ? readAskCustomerAccountLocation() : normaliseAskLocation();
  try {
    const keys = [
      scopedAskStorageKey(EMY_ASK_LOCATION_KEY, role),
      role === "business" ? "emyBusinessAskLocation" : "emyCustomerAskLocation",
      role === "customer" ? EMY_ASK_LOCATION_KEY : "",
    ].filter(Boolean);
    for (const key of keys) {
      const stored = localStorage.getItem(key);
      if (!stored) continue;
      const parsed = normaliseAskLocation(JSON.parse(stored));
      const hasStoredLocation = parsed.location !== "Near me" || parsed.savedLocations.length > 0 || parsed.latitude !== null || parsed.longitude !== null || parsed.locationSource;
      if (hasStoredLocation) {
        current = parsed;
        break;
      }
    }
  } catch (error) {}
  if (params && typeof params.get === "function") {
    const location = params.get("location");
    const radius = params.get("radius");
    current = normaliseAskLocation({
      ...current,
      location: location || current.location,
      radius: radius || current.radius,
    });
  }
  return current;
}
function saveStoredAskLocation(value) {
  try {
    const role = activeAskAccountRole();
    let previous = normaliseAskLocation();
    try {
      const stored = localStorage.getItem(scopedAskStorageKey(EMY_ASK_LOCATION_KEY, role)) || localStorage.getItem(role === "business" ? "emyBusinessAskLocation" : "emyCustomerAskLocation") || (role === "customer" ? localStorage.getItem(EMY_ASK_LOCATION_KEY) : "");
      if (stored) previous = normaliseAskLocation(JSON.parse(stored));
    } catch (error) {}
    const next = normaliseAskLocation({ ...previous, ...value });
    const hasLatitude = Object.prototype.hasOwnProperty.call(value || {}, "latitude");
    const hasLongitude = Object.prototype.hasOwnProperty.call(value || {}, "longitude");
    if ((!hasLatitude || !hasLongitude) && previous.location !== next.location) {
      next.latitude = null;
      next.longitude = null;
    }
    localStorage.setItem(scopedAskStorageKey(EMY_ASK_LOCATION_KEY, role), JSON.stringify(next));
    localStorage.setItem(role === "business" ? "emyBusinessAskLocation" : "emyCustomerAskLocation", JSON.stringify(next));
    if (role === "customer") localStorage.setItem(EMY_ASK_LOCATION_KEY, JSON.stringify(next));
  } catch (error) {}
}
function readStoredAskSidebarOpen(params) {
  let isOpen = false;
  try {
    isOpen = localStorage.getItem(EMY_ASK_SIDEBAR_KEY) === "open";
  } catch (error) {}
  if (params && typeof params.get === "function") {
    const value = params.get("sidebar");
    if (value === "open") isOpen = true;
    if (value === "closed") isOpen = false;
  }
  return readStoredAskSidebarPinned() || isOpen;
}
function saveStoredAskSidebarOpen(isOpen) {
  try {
    localStorage.setItem(EMY_ASK_SIDEBAR_KEY, isOpen ? "open" : "closed");
  } catch (error) {}
}
function readStoredAskSidebarPinned() {
  try {
    return localStorage.getItem(EMY_ASK_SIDEBAR_PINNED_KEY) === "pinned";
  } catch (error) {
    return false;
  }
}
function saveStoredAskSidebarPinned(isPinned) {
  try {
    localStorage.setItem(EMY_ASK_SIDEBAR_PINNED_KEY, isPinned ? "pinned" : "unpinned");
  } catch (error) {}
}
function askResultsUrl(query, chatId, location, radius, sidebarOpen) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (chatId) params.set("chat", chatId);
  params.set("location", location || "Near me");
  params.set("radius", String(radius || 5));
  if (typeof sidebarOpen === "boolean") params.set("sidebar", sidebarOpen ? "open" : "closed");
  return "ask-emy-results.html?" + params.toString();
}
function askHomeUrl(location, radius, sidebarOpen) {
  const params = new URLSearchParams();
  params.set("location", location || "Near me");
  params.set("radius", String(radius || 5));
  if (typeof sidebarOpen === "boolean") params.set("sidebar", sidebarOpen ? "open" : "closed");
  return "ask-emy.html?" + params.toString();
}
function getAskGreetingPlaceholder() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "good morning" : hour < 18 ? "good afternoon" : "good evening";
  return "Hello, " + greeting + "! How can I help you? \u{1F60A}";
}
`;
