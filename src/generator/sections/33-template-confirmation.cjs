/* EMY generator section: 33-template-confirmation.cjs (source lines 95122-95548) */
function emyConfirmationPageTemplate() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | Confirmation Code</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      :root {
        --emy-navy: #001b47;
        --emy-orange: #ff6a00;
        --emy-cream: #fff8ef;
        --emy-muted: #706b7b;
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: var(--emy-cream); color: var(--emy-navy); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      body { min-height: 100vh; overflow-x: hidden; }
      button, input { font: inherit; }
      .page { position: relative; min-height: 100dvh; overflow: hidden; background: radial-gradient(circle at 80% 6%, rgba(255,106,0,.11), transparent 16rem), linear-gradient(180deg, #fff8ef 0%, #fffdf8 58%, #fff8ef 100%); }
      .marks { pointer-events: none; position: absolute; inset: 0; color: rgba(255,106,0,.18); }
      .mark-top { position: absolute; right: clamp(10px, 14vw, 280px); top: -18px; width: 150px; height: 150px; }
      .mark-bottom { position: absolute; left: -42px; bottom: -20px; width: 260px; height: 170px; }
      .back { position: fixed; left: 18px; top: 17px; z-index: 5; height: 38px; width: 38px; border: 0; border-radius: 999px; background: transparent; color: var(--emy-navy); cursor: pointer; display: grid; place-items: center; }
      .back svg { height: 22px; width: 22px; stroke-width: 2.4; }
      .back:hover { background: rgba(255,106,0,.08); color: var(--emy-orange); }
      .wrap { position: relative; z-index: 2; width: min(100%, 420px); min-height: 100dvh; margin: 0 auto; padding: clamp(54px, 9vh, 86px) 22px 28px; text-align: center; display: flex; flex-direction: column; align-items: center; }
      .brand img { height: 48px; width: auto; display: block; }
      h1 { margin: 28px 0 0; font-size: clamp(26px, 7vw, 32px); line-height: 1.05; letter-spacing: 0; font-weight: 760; color: #171435; }
      .method-row { margin-top: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: min(100%, 292px); }
      .method-row button { min-height: 38px; border: 1px solid #e3ded8; border-radius: 999px; background: rgba(255,255,255,.74); color: #61708c; cursor: pointer; font-size: 12px; font-weight: 800; }
      .method-row button.is-active { border-color: rgba(255,106,0,.36); background: #fff3e7; color: #d95400; box-shadow: 0 10px 20px rgba(255,106,0,.10); }
      .code-row { margin-top: 24px; display: flex; justify-content: center; gap: 10px; }
      .code-input { width: 42px; height: 42px; border: 1px solid #d8d1cc; border-radius: 6px; background: rgba(255,255,255,.76); color: var(--emy-navy); text-align: center; font-size: 20px; font-weight: 650; outline: none; box-shadow: 0 8px 18px rgba(0,27,71,.04); }
      .code-input:focus { border-color: var(--emy-orange); background: white; box-shadow: 0 0 0 3px rgba(255,106,0,.10); }
      .message { margin: 24px auto 0; max-width: 280px; color: #4f5b73; font-size: 13px; line-height: 1.32; font-weight: 500; }
      .message strong { display: block; color: var(--emy-navy); font-weight: 650; word-break: break-word; }
      .resend { margin-top: 18px; color: #4f5b73; font-size: 12px; line-height: 1.35; font-weight: 500; }
      .resend button { margin-top: 2px; border: 0; background: transparent; color: var(--emy-orange); cursor: pointer; font-size: 12px; font-weight: 720; padding: 0; }
      .resend button:disabled { cursor: default; color: #d96d28; opacity: .78; }
      .fallback-note { margin: 9px auto 0; max-width: 290px; color: #6a7894; font-size: 11px; line-height: 1.4; font-weight: 620; }
      .status { min-height: 18px; margin: 14px 0 0; color: #0f7a45; font-size: 12.5px; line-height: 1.4; font-weight: 600; }
      .registration-leave-modal { position: fixed; inset: 0; z-index: 180; display: none; align-items: center; justify-content: center; padding: 18px; background: rgba(0,27,71,.54); backdrop-filter: blur(8px); }
      .registration-leave-modal.is-open { display: flex; }
      .registration-leave-card { width: min(100%, 430px); border: 1px solid rgba(255,255,255,.68); border-radius: 14px; background: linear-gradient(145deg, #fffefa, #fff7ed); color: var(--emy-navy); padding: 20px; box-shadow: 0 26px 70px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.86); text-align: left; }
      .registration-leave-mark { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 12px; background: #fff4e8; color: var(--emy-orange); font-size: 24px; font-weight: 900; }
      .registration-leave-card h2 { margin: 14px 0 0; color: var(--emy-navy); font-size: 22px; line-height: 1.16; font-weight: 800; letter-spacing: 0; }
      .registration-leave-card p { margin: 9px 0 0; color: #61708c; font-size: 13px; line-height: 1.45; font-weight: 560; }
      .registration-leave-actions { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 18px; }
      .registration-leave-actions button { min-height: 44px; border-radius: 999px; cursor: pointer; padding: 0 16px; font: inherit; font-size: 13px; font-weight: 780; }
      .registration-leave-continue { border: 0; background: var(--emy-orange); color: white; box-shadow: 0 12px 24px rgba(255,106,0,.18); }
      .registration-leave-delete { border: 1px solid rgba(180,35,24,.18); background: #fff; color: #b42318; }
      @media (max-height: 620px) {
        .wrap { padding-top: 42px; }
        h1 { margin-top: 18px; }
        .code-row { margin-top: 18px; }
        .message { margin-top: 18px; }
        .mark-bottom { opacity: .45; }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <div class="marks" aria-hidden="true">
        <svg class="mark-top" viewBox="0 0 180 180" fill="none"><path d="M20 10l65 135L160 5" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <svg class="mark-bottom" viewBox="0 0 360 240" fill="none"><path d="M0 210L70 55l66 155 45-88 60 88 42-58 56 58" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <button class="back" type="button" data-back aria-label="Back to Sign Up">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <section class="wrap" aria-label="Confirmation code">
        <div class="brand"><img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" /></div>
        <h1>Confirmation Code</h1>
        <div class="method-row" aria-label="Choose confirmation method">
          <button type="button" data-channel-email>Email code</button>
          <button type="button" data-channel-phone>Phone code</button>
        </div>
        <div class="code-row" data-code-row>
          <input class="code-input" data-code-digit inputmode="numeric" autocomplete="one-time-code" maxlength="1" aria-label="Code digit 1" />
          <input class="code-input" data-code-digit inputmode="numeric" maxlength="1" aria-label="Code digit 2" />
          <input class="code-input" data-code-digit inputmode="numeric" maxlength="1" aria-label="Code digit 3" />
          <input class="code-input" data-code-digit inputmode="numeric" maxlength="1" aria-label="Code digit 4" />
        </div>
        <p class="message" data-message>A confirmation code has been sent to your registered email address <strong data-email>your email address</strong></p>
        <p class="resend">Haven't received it yet?<br /><button type="button" data-resend disabled>Resend code (49 seconds)</button></p>
        <p class="fallback-note" data-fallback-note>Use phone code if your email inbox is not receiving the EMY code.</p>
        <p class="status" data-status></p>
      </section>
      <div class="registration-leave-modal" data-registration-leave-modal aria-hidden="true">
        <section class="registration-leave-card" role="dialog" aria-modal="true" aria-labelledby="registration-confirm-leave-title">
          <div class="registration-leave-mark" aria-hidden="true">!</div>
          <h2 id="registration-confirm-leave-title">Leave registration?</h2>
          <p>Any details you added in this registration will be deleted. If you leave now, you will need to start this registration again.</p>
          <div class="registration-leave-actions">
            <button class="registration-leave-continue" type="button" data-registration-continue>Continue registration</button>
            <button class="registration-leave-delete" type="button" data-registration-delete>Leave and delete details</button>
          </div>
        </section>
      </div>
    </main>
    <script>
      (function () {
        const params = new URLSearchParams(window.location.search || "");
        const role = String(params.get("role") || localStorage.getItem("emyMainPendingSignupRole") || "customer").toLowerCase() === "business" ? "business" : "customer";
        const email = localStorage.getItem("emyMainPendingSignupEmail") || "";
        const phone = localStorage.getItem("emyMainPendingSignupPhone") || "";
        const emailLabel = document.querySelector("[data-email]");
        const message = document.querySelector("[data-message]");
        const fallbackNote = document.querySelector("[data-fallback-note]");
        const emailChannelButton = document.querySelector("[data-channel-email]");
        const phoneChannelButton = document.querySelector("[data-channel-phone]");
        const status = document.querySelector("[data-status]");
        const resend = document.querySelector("[data-resend]");
        const inputs = Array.from(document.querySelectorAll("[data-code-digit]"));
        const registrationLeaveModal = document.querySelector("[data-registration-leave-modal]");
        const registrationContinue = document.querySelector("[data-registration-continue]");
        const registrationDelete = document.querySelector("[data-registration-delete]");
        let seconds = 49;
        let timer = null;
        let businessRedirectStarted = false;
        let customerRedirectStarted = false;
        let verificationCheckStarted = false;
        let registrationLeaveBypass = false;
        let confirmationCompleted = false;
        let pendingRegistrationLeaveAction = null;
        let activeChannel = String(localStorage.getItem("emyMainPendingVerificationChannel") || "email").toLowerCase() === "phone" ? "phone" : "email";

        emailLabel.textContent = email || "your email address";

        function maskTarget(value, channel) {
          const text = String(value || "").trim();
          if (!text) return channel === "phone" ? "your registered phone number" : "your email address";
          if (channel === "phone") {
            const digits = text.replace(/\D/g, "");
            return digits.length > 4 ? text.replace(digits.slice(0, -4), "••••••") : text;
          }
          const parts = text.split("@");
          if (parts.length !== 2) return text;
          return (parts[0].slice(0, 2) || parts[0]) + "•••@" + parts[1];
        }
        function escapeHtml(value) {
          return String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
        }
        function clearCodeInputs() {
          inputs.forEach((input) => { input.value = ""; });
          verificationCheckStarted = false;
        }
        function renderChannel() {
          const target = activeChannel === "phone" ? phone : email;
          if (emailChannelButton) emailChannelButton.classList.toggle("is-active", activeChannel === "email");
          if (phoneChannelButton) phoneChannelButton.classList.toggle("is-active", activeChannel === "phone");
          if (message) {
            message.innerHTML = activeChannel === "phone"
              ? 'A confirmation code will be sent by SMS to <strong data-email>' + escapeHtml(maskTarget(target, "phone")) + '</strong>'
              : 'A confirmation code has been sent to your registered email address <strong data-email>' + escapeHtml(maskTarget(target, "email")) + '</strong>';
          }
          if (fallbackNote) fallbackNote.textContent = activeChannel === "phone"
            ? "Phone code is a fallback when email is not receiving codes. It needs SMS sender setup in Firebase Functions."
            : "Use phone code if your email inbox is not receiving the EMY code.";
        }

        function confirmationHasProgress() {
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").trim();
          return !!email || !!pendingRole || inputs.some((input) => String(input.value || "").trim());
        }
        function confirmationShouldWarn() {
          return !registrationLeaveBypass && !confirmationCompleted && confirmationHasProgress();
        }
        function clearUnfinishedSignupRegistration() {
          [
            "emyMainPendingSignupRole",
            "emyMainPendingSignupFirstName",
            "emyMainPendingSignupLastName",
            "emyMainPendingSignupEmail",
            "emyMainPendingSignupPhone",
            "emyMainPendingSignupPrivacy",
            "emyMainPendingSignupPhoto",
            "emyMainPendingSignupPhotoCrop",
            "emyMainConfirmationCompleted"
          ].forEach((key) => {
            try { localStorage.removeItem(key); } catch (error) {}
          });
          if (role === "customer") {
            try { localStorage.removeItem("emyCustomerProfileVisibility"); } catch (error) {}
          }
          if (role === "business") {
            [
              "emyBusinessRegistrationFromCustomer",
              "emyBusinessRegistrationCustomerEmail",
              "emyBusinessOwnerCustomerEmail",
              "emyBusinessProfileDraft",
              "emyBusinessProfilePhoto",
              "emyBusinessProfilePhotoCrop",
              "emyBusinessHeroCoverMedia",
              "emyBusinessMediaLibrary",
              "emyBusinessCoverMedia",
              "emyBusinessWorkingDays",
              "emyBusinessWorkingDaysSchedule",
              "emyBusinessLocation",
              "emyBusinessLocationLabel",
              "emyBusinessAskLocation",
              "emyBusinessReviewStatus",
              "emyBusinessReviewSubmittedAt"
            ].forEach((key) => {
              try { localStorage.removeItem(key); } catch (error) {}
            });
          }
        }
        function setRegistrationLeaveModalOpen(isOpen) {
          if (!registrationLeaveModal) return;
          registrationLeaveModal.classList.toggle("is-open", isOpen);
          registrationLeaveModal.setAttribute("aria-hidden", isOpen ? "false" : "true");
          if (isOpen && registrationContinue) window.setTimeout(() => registrationContinue.focus(), 0);
        }
        function requestRegistrationLeave(action) {
          if (!confirmationShouldWarn()) {
            if (typeof action === "function") action();
            return;
          }
          pendingRegistrationLeaveAction = action;
          setRegistrationLeaveModalOpen(true);
        }
        if (registrationContinue) registrationContinue.addEventListener("click", () => {
          pendingRegistrationLeaveAction = null;
          setRegistrationLeaveModalOpen(false);
        });
        if (registrationDelete) registrationDelete.addEventListener("click", () => {
          const action = pendingRegistrationLeaveAction;
          pendingRegistrationLeaveAction = null;
          registrationLeaveBypass = true;
          clearUnfinishedSignupRegistration();
          setRegistrationLeaveModalOpen(false);
          if (typeof action === "function") action();
        });
        if (registrationLeaveModal) registrationLeaveModal.addEventListener("click", (event) => {
          if (event.target === registrationLeaveModal) {
            pendingRegistrationLeaveAction = null;
            setRegistrationLeaveModalOpen(false);
          }
        });
        window.addEventListener("beforeunload", (event) => {
          if (!confirmationShouldWarn()) return;
          event.preventDefault();
          event.returnValue = "";
        });
        try {
          history.replaceState(Object.assign({}, history.state || {}, { emyConfirmationRegistrationBase: true }), "", window.location.href);
          history.pushState({ emyConfirmationRegistrationGuard: true }, "", window.location.href);
          window.addEventListener("popstate", () => {
            if (registrationLeaveBypass) return;
            if (confirmationShouldWarn()) {
              pendingRegistrationLeaveAction = () => {
                registrationLeaveBypass = true;
                clearUnfinishedSignupRegistration();
                history.back();
              };
              setRegistrationLeaveModalOpen(true);
              try { history.pushState({ emyConfirmationRegistrationGuard: true }, "", window.location.href); } catch (error) {}
              return;
            }
            registrationLeaveBypass = true;
            history.back();
          });
        } catch (error) {}

        document.querySelector("[data-back]").addEventListener("click", () => {
          requestRegistrationLeave(() => { window.location.href = "emy-signup.html?role=" + encodeURIComponent(role); });
        });

        function codeValue() {
          return inputs.map((input) => input.value.trim()).join("");
        }
        async function updateStatus() {
          if (codeValue().length === inputs.length) {
            if (verificationCheckStarted) return;
            verificationCheckStarted = true;
            status.style.color = "#61708c";
            status.textContent = "Checking your EMY " + (activeChannel === "phone" ? "phone" : "email") + " code...";
            if (!window.emyRealAuth) {
              verificationCheckStarted = false;
              status.style.color = "#b42318";
              status.textContent = "Firebase account backend is still loading. Refresh and enter the code again.";
              return;
            }
            try {
              const result = await window.emyRealAuth.confirmVerificationCode(codeValue(), role, activeChannel);
              if (!result || !result.emailVerified) {
                verificationCheckStarted = false;
                status.style.color = "#b42318";
                status.textContent = "That EMY code could not verify this account. Check the code and try again.";
                return;
              }
            } catch (error) {
              verificationCheckStarted = false;
              status.style.color = "#b42318";
              status.textContent = window.emyRealAuth && window.emyRealAuth.publicError ? window.emyRealAuth.publicError(error) : (error.message || "Code verification failed.");
              return;
            }
            status.style.color = "#0f7a45";
            if (role === "business") {
              status.textContent = "Account verified. Opening your business profile...";
              if (!businessRedirectStarted) {
                businessRedirectStarted = true;
                confirmationCompleted = true;
                registrationLeaveBypass = true;
                try {
                  localStorage.setItem("emyMainSignedInRole", "business");
                  if (email) localStorage.setItem("emyMainSignedInEmail", email);
                  localStorage.setItem("emyMainConfirmationCompleted", "1");
                } catch (error) {}
                setTimeout(() => {
                  window.location.href = "emy-business-profile.html";
                }, 650);
              }
              return;
            }
            status.textContent = "Account verified. Opening your customer home...";
            if (!customerRedirectStarted) {
              customerRedirectStarted = true;
              confirmationCompleted = true;
              registrationLeaveBypass = true;
              try {
                localStorage.setItem("emyMainSignedInRole", "customer");
                if (email) localStorage.setItem("emyMainSignedInEmail", email);
                localStorage.setItem("emyMainConfirmationCompleted", "1");
              } catch (error) {}
              setTimeout(() => {
                window.location.href = "emy-customer-home.html";
              }, 650);
            }
          } else {
            status.textContent = "";
          }
        }
        inputs.forEach((input, index) => {
          input.addEventListener("input", () => {
            input.value = input.value.replace(/\\D/g, "").slice(0, 1);
            if (input.value && inputs[index + 1]) inputs[index + 1].focus();
            updateStatus();
          });
          input.addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && !input.value && inputs[index - 1]) {
              inputs[index - 1].focus();
            }
          });
          input.addEventListener("paste", (event) => {
            event.preventDefault();
            const pasted = (event.clipboardData || window.clipboardData).getData("text").replace(/\\D/g, "").slice(0, inputs.length);
            pasted.split("").forEach((digit, digitIndex) => {
              if (inputs[digitIndex]) inputs[digitIndex].value = digit;
            });
            const next = inputs[Math.min(pasted.length, inputs.length) - 1] || input;
            next.focus();
            updateStatus();
          });
        });

        function renderTimer() {
          if (seconds > 0) {
            resend.disabled = true;
            resend.textContent = "Resend code (" + seconds + " seconds)";
            return;
          }
          resend.disabled = false;
          resend.textContent = "Resend code";
          clearInterval(timer);
        }
        function startTimer() {
          clearInterval(timer);
          seconds = 49;
          renderTimer();
          timer = setInterval(() => {
            seconds -= 1;
            renderTimer();
          }, 1000);
        }
        async function sendCode(channel) {
          activeChannel = channel === "phone" ? "phone" : "email";
          localStorage.setItem("emyMainPendingVerificationChannel", activeChannel);
          renderChannel();
          clearCodeInputs();
          if (!window.emyRealAuth) {
            status.style.color = "#b42318";
            status.textContent = "Firebase account backend is still loading. Refresh and try again.";
            return;
          }
          status.style.color = "#61708c";
          status.textContent = "Sending your EMY " + (activeChannel === "phone" ? "phone" : "email") + " code...";
          try {
            const result = await window.emyRealAuth.resendVerification(activeChannel, { role: role, phone: phone });
            if (result && result.target) localStorage.setItem("emyMainPendingVerificationTarget", result.target);
            localStorage.removeItem("emyMainPendingVerificationDeliveryError");
            status.style.color = "#0f7a45";
            status.textContent = activeChannel === "phone" ? "Phone code has been sent." : "Email code has been sent.";
            startTimer();
            inputs[0].focus();
          } catch (error) {
            status.style.color = "#b42318";
            status.textContent = window.emyRealAuth && window.emyRealAuth.publicError ? window.emyRealAuth.publicError(error) : (error.message || "Code send failed.");
          }
        }
        if (emailChannelButton) emailChannelButton.addEventListener("click", () => {
          if (activeChannel === "email") return;
          sendCode("email");
        });
        if (phoneChannelButton) phoneChannelButton.addEventListener("click", () => {
          if (activeChannel === "phone") return;
          sendCode("phone");
        });
        resend.addEventListener("click", async () => {
          if (resend.disabled) return;
          sendCode(activeChannel);
        });
        renderChannel();
        const deliveryError = localStorage.getItem("emyMainPendingVerificationDeliveryError") || "";
        if (deliveryError) {
          status.style.color = "#b42318";
          status.textContent = deliveryError;
        }
        startTimer();
        inputs[0].focus();
      })();
    </script>
  </body>
</html>`;
}

