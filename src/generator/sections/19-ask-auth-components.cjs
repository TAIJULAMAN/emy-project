/* EMY generator section: 19-ask-auth-components.cjs (source lines 28443-28862) */
const askResultsAuthComponents = String.raw`function EyeIcon({ hidden = false, className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      {hidden && <path d="M4 4l16 16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />}
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.3C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-7.8L6.2 33.2C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.3-4.1 5.5l6.2 5.3C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-12 w-12" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="#1877F2" />
      <path fill="#fff" d="M29.6 25.4l.8-5.1h-4.9V17c0-1.4.7-2.8 2.9-2.8h2.2V9.9s-2-.3-3.9-.3c-4 0-6.6 2.4-6.6 6.8v3.9h-4.4v5.1h4.4V38h5.4V25.4h4.1z" />
    </svg>
  );
}

function startSocialAuth(provider, mode) {
  const config = window.EMY_AUTH_CONFIG || {};
  const fallbackRedirect = window.location.origin && window.location.origin !== "null" ? window.location.origin + "/auth/callback" : window.location.href.split("#")[0];
  const redirectUri = config.redirectUri || fallbackRedirect;
  const action = mode === "sign up" ? "sign-up" : "sign-in";

  if (provider === "google") {
    if (!config.googleClientId) {
      alert("Google " + action + " is ready to connect, but it needs your Google OAuth Client ID and backend callback.");
      return;
    }
    const params = new URLSearchParams();
    params.set("client_id", config.googleClientId);
    params.set("redirect_uri", redirectUri);
    params.set("response_type", "code");
    params.set("scope", "openid email profile");
    params.set("prompt", "select_account");
    params.set("state", action + ":google");
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?" + params.toString();
    return;
  }

  if (!config.facebookAppId) {
    alert("Facebook " + action + " is ready to connect, but it needs your Facebook App ID and backend callback.");
    return;
  }
  const params = new URLSearchParams();
  params.set("client_id", config.facebookAppId);
  params.set("redirect_uri", redirectUri);
  params.set("response_type", "code");
  params.set("scope", "public_profile,email");
  params.set("state", action + ":facebook");
  window.location.href = "https://www.facebook.com/v20.0/dialog/oauth?" + params.toString();
}

function SocialAuthButtons({ mode = "sign in" }) {
  const isSignUp = mode === "sign up";
  return (
    <div className="mt-7 text-center">
      <p className="text-sm font-semibold text-[#001B47]">{isSignUp ? "Or Sign Up With" : "Or Login With"}</p>
      <div className="mt-5 flex items-center justify-center gap-5">
        <button type="button" onClick={() => startSocialAuth("google", mode)} className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg shadow-[#001B47]/10 ring-1 ring-[#001B47]/10 transition hover:-translate-y-0.5 hover:ring-orange-200" aria-label={isSignUp ? "Sign up with Google" : "Sign in with Google"}><GoogleIcon /></button>
        <button type="button" onClick={() => startSocialAuth("facebook", mode)} className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg shadow-[#001B47]/10 ring-1 ring-[#001B47]/10 transition hover:-translate-y-0.5 hover:ring-orange-200" aria-label={isSignUp ? "Sign up with Facebook" : "Sign in with Facebook"}><FacebookIcon /></button>
      </div>
    </div>
  );
}

function AuthRequiredPrompt({ onClose, onSignIn, onSignUp }) {
  return (
    <div className="emy-fullscreen-cover fixed inset-0 z-[120] flex items-center justify-center bg-[#001B47]/55 px-5 text-[#001B47] backdrop-blur-md" style={{ fontFamily: "'Public Sans', sans-serif" }}>
      <div className="relative w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-50 text-xl font-black text-[#001B47] hover:bg-orange-100" aria-label="Close">x</button>
        <img src={emyLogo} alt="EMY" className="mx-auto h-12 w-auto object-contain" />
        <h2 className="mt-6 text-3xl font-black tracking-[-0.03em] text-[#001B47]">Sign In to search</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[#001B47]/60">You need to Sign In or Sign Up before searching with Ask EMY.</p>
        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button type="button" onClick={onSignIn} className="cursor-pointer rounded-2xl bg-orange-500 px-5 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600">Sign In</button>
          <button type="button" onClick={onSignUp} className="cursor-pointer rounded-2xl border border-[#001B47]/10 bg-white px-5 py-4 text-sm font-black text-[#001B47] hover:bg-orange-50 hover:text-orange-600">Sign Up</button>
        </div>
      </div>
    </div>
  );
}

function RoleCard({ label, onClick }) {
  return (
    <button type="button" onClick={onClick} className="flex h-[138px] w-[138px] cursor-pointer flex-col items-center justify-center rounded-xl border border-[#001B47]/10 bg-white text-[#001B47] shadow-[0_6px_16px_rgba(0,27,71,0.14)] transition hover:-translate-y-1 hover:border-orange-200 hover:text-orange-600">
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-current text-2xl font-black">{label[0]}</div>
      <span className="text-base font-black text-[#2d1d52]">{label}</span>
    </button>
  );
}

function SignUpIntro({ onClose, onSwitch, onCreate }) {
  const openEmySignup = () => {
    window.location.href = "index.html?emyAuth=signup";
  };

  return (
    <div className="emy-fullscreen-cover fixed inset-0 z-[100] flex items-center justify-center bg-[#001B47]/60 px-5 text-[#001B47] backdrop-blur-md" style={{ fontFamily: "'Public Sans', sans-serif" }}>
      <style>{fontImport}</style>
      <div className="relative w-full max-w-lg rounded-[2rem] bg-white p-8 text-center shadow-2xl">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-orange-50 text-xl font-black text-[#001B47] hover:bg-orange-100" aria-label="Close">x</button>
        <img src={emyLogo} alt="EMY" className="mx-auto h-14 w-auto object-contain" />
        <p className="mx-auto mt-6 inline-flex rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-600">Ask EMY</p>
        <h1 className="mt-5 text-3xl font-black tracking-[-0.03em] text-[#001B47]">{copy.signUpTitle}</h1>
        <p className="mx-auto mt-4 max-w-md text-base font-semibold leading-7 text-[#001B47]/60">{copy.signUpMessage}</p>
        <button type="button" onClick={openEmySignup} className="mt-7 w-full cursor-pointer rounded-2xl bg-orange-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600">{copy.createAccountOnEmy}</button>
        <p className="mt-6 text-sm font-semibold text-[#001B47]/55">
          {copy.alreadyAccount} <button type="button" onClick={() => onSwitch("signin")} className="cursor-pointer font-black text-[#001B47] underline decoration-orange-400 decoration-2 underline-offset-4 hover:text-orange-600">{copy.switchToLogin}</button>
        </p>
      </div>
    </div>
  );
}

function RoleSelection({ onBack, onClose, onSelectRole }) {
  return (
    <div className="emy-fullscreen-cover fixed inset-0 z-[100] overflow-y-auto bg-[#fff8ef] text-[#171435]" style={{ fontFamily: "'Public Sans', sans-serif" }}>
      <style>{fontImport}</style>
      <button type="button" onClick={onBack} className="absolute left-4 top-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-3xl font-black text-[#001B47] hover:bg-orange-50" aria-label="Back">&lt;</button>
      <button type="button" onClick={onClose} className="absolute right-4 top-5 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-xl font-black text-[#001B47] shadow-lg hover:bg-orange-50" aria-label="Close">x</button>
      <main className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col items-center px-6 pb-10 pt-12">
        <h1 className="text-center text-[22px] font-black leading-tight text-[#171435]">{copy.selectRole}</h1>
        <div className="mt-[58px] flex w-full flex-col items-center gap-[50px]">
          <RoleCard label={copy.customer} onClick={() => onSelectRole("customer")} />
          <RoleCard label={copy.business} onClick={() => onSelectRole("business")} />
        </div>
      </main>
    </div>
  );
}

function RegistrationForm({ privacy, setPrivacy, onBack, onClose, onSwitch }) {
  const inputClass = "mt-2 h-[42px] w-full rounded-md border border-[#d7d0cd] bg-white px-3 text-sm font-semibold text-[#171435] outline-none placeholder:text-[#9c96a0] focus:border-orange-500";
  const selectedPrivacy = privacy === "public" ? "public" : "private";
  const privacyButtonBase = "h-full flex-1 cursor-pointer text-sm font-semibold transition-colors duration-150";
  const privacyButtonClass = (value) => privacyButtonBase + (value === "public" ? " border-l border-[#d9d2ce]" : "") + (selectedPrivacy === value ? " bg-orange-500 text-white" : " bg-white text-[#6f6978]");
  const privacyButtonStyle = (value) => {
    const active = selectedPrivacy === value;
    return {
      backgroundColor: active ? "#f97316" : "#ffffff",
      color: active ? "#ffffff" : "#6f6978"
    };
  };
  const selectPrivacy = (value) => {
    const nextPrivacy = value === "public" ? "public" : "private";
    setPrivacy(nextPrivacy);
    try {
      window.localStorage.setItem("emyMainPendingSignupPrivacy", nextPrivacy);
      window.localStorage.setItem("emyCustomerProfileVisibility", nextPrivacy);
    } catch (error) {}
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Registration submitted. Connect this form to the EMY registration backend when ready.");
  };

  return (
    <div className="emy-fullscreen-cover fixed inset-0 z-[100] overflow-y-auto bg-[#fff8ef] text-[#171435]" style={{ fontFamily: "'Public Sans', sans-serif" }}>
      <style>{fontImport}</style>
      <button type="button" onClick={onBack} className="fixed left-4 top-5 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-3xl font-black text-[#001B47] hover:bg-orange-50" aria-label="Back">&lt;</button>
      <button type="button" onClick={onClose} className="fixed right-4 top-5 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-xl font-black text-[#001B47] shadow-lg hover:bg-orange-50" aria-label="Close">x</button>
      <main className="relative mx-auto min-h-screen w-full max-w-[430px] px-4 pb-10 pt-12">
        <div className="text-center">
          <img src={emyLogo} alt="EMY" className="mx-auto h-[54px] w-auto object-contain" />
          <h1 className="mt-4 text-[34px] font-black leading-tight tracking-[-0.04em] text-[#001B47]">{copy.signUp}</h1>
          <p className="mt-2 text-[13px] font-semibold text-[#8a8594]">{copy.enjoyLife}</p>
        </div>
        <div className="mx-auto mt-6 flex h-[46px] w-[190px] overflow-hidden rounded-lg border border-[#d9d2ce] bg-white">
          <button type="button" aria-pressed={selectedPrivacy === "private"} onClick={() => selectPrivacy("private")} className={privacyButtonClass("private")} style={privacyButtonStyle("private")}>Private</button>
          <button type="button" aria-pressed={selectedPrivacy === "public"} onClick={() => selectPrivacy("public")} className={privacyButtonClass("public")} style={privacyButtonStyle("public")}>Public</button>
        </div>
        <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-left text-[13px] font-black text-[#2d1d52]">{copy.firstName}<span className="text-orange-500">*</span><input className={inputClass} placeholder={copy.firstName} /></label>
            <label className="block text-left text-[13px] font-black text-[#2d1d52]">{copy.lastName}<span className="text-orange-500">*</span><input className={inputClass} placeholder={copy.lastName} /></label>
          </div>
          <label className="block text-left text-[13px] font-black text-[#2d1d52]">{copy.mobileNumber}<span className="text-orange-500">*</span><input className={inputClass} placeholder={copy.mobileNumber} /></label>
          <label className="block text-left text-[13px] font-black text-[#2d1d52]">{copy.email}<span className="text-orange-500">*</span><input type="email" className={inputClass} placeholder={copy.email} /></label>
          <label className="block text-left text-[13px] font-black text-[#2d1d52]">{copy.password}<span className="text-orange-500">*</span><input type="password" className={inputClass} placeholder="New Password" /></label>
          <label className="block text-left text-[13px] font-black text-[#2d1d52]">{copy.confirmPassword}<span className="text-orange-500">*</span><input type="password" className={inputClass} placeholder={copy.confirmPassword} /></label>
          <label className="flex cursor-pointer items-center gap-2 pt-1 text-left text-[12px] font-semibold text-[#5f5967]"><input type="checkbox" className="h-4 w-4 accent-orange-500" />{copy.agreeTerms}</label>
          <button type="submit" className="mt-5 h-[52px] w-full cursor-pointer rounded-xl bg-orange-500 text-base font-black text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600">{copy.signUp}</button>
        </form>
        <p className="mt-5 text-center text-sm font-semibold text-[#8a8594]">already have an account ? <button type="button" onClick={() => onSwitch("signin")} className="cursor-pointer font-black text-orange-600">{copy.switchToLogin}</button></p>
      </main>
    </div>
  );
}

function CinematicPanel() {
  return (
    <section className="relative hidden overflow-hidden bg-[#001B47] lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,138,48,0.58),transparent_23%),radial-gradient(circle_at_18%_76%,rgba(255,122,0,0.22),transparent_28%),radial-gradient(circle_at_68%_72%,rgba(255,255,255,0.24),transparent_32%)]" />
      <div className="absolute bottom-12 left-12 right-12 rounded-[2rem] border border-white/14 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
        <img src={emyLogo} alt="EMY" className="h-14 w-auto rounded-xl bg-white/95 p-2 object-contain" />
        <h2 className="mt-8 text-4xl font-black tracking-[-0.04em]">Ask EMY</h2>
        <p className="mt-4 inline-flex rounded-full bg-orange-400/20 px-5 py-3 text-base font-black leading-7 text-orange-100 ring-1 ring-orange-200/30 shadow-lg shadow-orange-500/20">We did it for you</p>
      </div>
    </section>
  );
}

function LoginPage({ onClose, onSwitch, onLogin }) {
  const [showDetails, setShowDetails] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const emailHasError = loginAttempted && !loginEmail.trim();
  const passwordHasError = loginAttempted && !loginPassword.trim();

  const submitLoginDetails = (event) => {
    event.preventDefault();
    setLoginAttempted(true);
    if (!loginEmail.trim() || !loginPassword.trim()) return;
    onLogin(loginEmail.trim());
  };
  const openForgotPassword = () => {
    const target = new URL("emy-forgot-password.html", window.location.href);
    target.searchParams.set("role", "customer");
    if (loginEmail.trim()) target.searchParams.set("email", loginEmail.trim());
    window.location.href = target.toString();
  };

  return (
    <div className="emy-fullscreen-cover fixed inset-0 z-[100] overflow-hidden bg-[#fff8ef] text-[#001B47]" style={{ fontFamily: "'Public Sans', sans-serif" }}>
      <style>{fontImport}</style>
      <button type="button" onClick={onClose} className="absolute right-6 top-6 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-xl font-black text-[#001B47] shadow-lg hover:bg-orange-50" aria-label="Close">x</button>
      <div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-2">
        <section className="relative flex h-full min-h-0 flex-col overflow-y-auto bg-white px-6 py-6 lg:px-16">
          <div className="flex items-center justify-between">
            <img src={emyLogo} alt="EMY" className="h-12 w-auto object-contain" />
            <div className="hidden items-center gap-2 rounded-full border border-[#001B47]/10 bg-white px-5 py-3 text-sm font-bold text-[#001B47] shadow-sm sm:flex"><span>You are signing in to</span><img src={emyLogo} alt="EMY" className="h-5 w-auto object-contain" /></div>
          </div>
          <div className="mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col justify-center py-8">
            {!showDetails ? (
              <>
                <h1 className="text-center text-4xl font-semibold tracking-[-0.03em] text-[#001B47] md:text-5xl">{copy.logIntoAccount}</h1>
                <p className="mx-auto mt-4 max-w-md text-center text-sm font-semibold leading-6 text-[#001B47]/55">{copy.signInMessage}</p>
                <div className="mt-12"><button type="button" onClick={() => setShowDetails(true)} className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#001B47] px-6 text-base font-black text-white shadow-lg hover:bg-orange-600"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1 shadow-sm"><img src={emyLogo} alt="EMY" className="h-full w-full object-contain" /></span>{copy.loginWithEmy}</button></div>
                <p className="mt-8 text-center text-sm font-semibold text-[#001B47]/55">{copy.noAccount} <button type="button" onClick={() => onSwitch("signup")} className="cursor-pointer font-black text-[#001B47] underline decoration-orange-400 decoration-2 underline-offset-4 hover:text-orange-600">{copy.switchToSignUp}</button></p>
              </>
            ) : (
              <>
                <button type="button" onClick={() => setShowDetails(false)} className="mb-5 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-black text-[#001B47] hover:bg-orange-50">&lt; Back</button>
                <div className="text-center"><img src={emyLogo} alt="EMY" className="mx-auto h-[54px] w-auto object-contain" /><h1 className="mt-5 text-[34px] font-black tracking-[-0.04em] text-[#001B47]">{copy.logIn}</h1><p className="mt-2 text-[13px] font-semibold text-[#8a8594]">{copy.welcomeBack}</p></div>
                <form className="mt-8 space-y-4" onSubmit={submitLoginDetails}>
                  <label className="block text-left text-[13px] font-black text-[#2d1d52]">{copy.email}<span className="text-orange-500">*</span><input type="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} className={"mt-2 h-[46px] w-full rounded-md border bg-white px-3 text-sm font-semibold text-[#171435] outline-none focus:border-orange-500 " + (emailHasError ? "border-rose-400" : "border-[#d7d0cd]")} placeholder={copy.email} />{emailHasError && <span className="mt-1 block text-[11px] font-semibold text-rose-500">Please enter Email Address.</span>}</label>
                  <label className="block text-left text-[13px] font-black text-[#2d1d52]">{copy.password}<span className="text-orange-500">*</span><div className="relative mt-2"><input type={showPassword ? "text" : "password"} value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} className={"h-[46px] w-full rounded-md border bg-white px-3 pr-12 text-sm font-semibold text-[#171435] outline-none focus:border-orange-500 " + (passwordHasError ? "border-rose-400" : "border-[#d7d0cd]")} placeholder={copy.password} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-orange-600 hover:bg-orange-50" aria-label={showPassword ? "Hide password" : "Show password"}><EyeIcon hidden={showPassword} /></button></div>{passwordHasError && <span className="mt-1 block text-[11px] font-semibold text-rose-500">Please enter Password.</span>}</label>
                  <div className="flex items-center justify-between pt-1 text-sm font-semibold text-[#5f5967]"><label className="flex cursor-pointer items-center gap-2"><input type="checkbox" defaultChecked className="h-4 w-4 accent-orange-500" />{copy.rememberMe}</label><button type="button" onClick={openForgotPassword} className="cursor-pointer font-semibold text-[#001B47] hover:text-orange-600">{copy.forgotPassword}</button></div>
                  <button type="submit" className="mt-6 h-[54px] w-full cursor-pointer rounded-xl bg-orange-500 text-base font-black text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600">{copy.logIn}</button>
                </form>
                <SocialAuthButtons mode="sign in" />
                <p className="mt-7 text-center text-sm font-semibold text-[#8a8594]">{copy.noAccount} <button type="button" onClick={() => onSwitch("signup")} className="cursor-pointer font-black text-orange-600">{copy.switchToSignUp}</button></p>
              </>
            )}
          </div>
          <p className="mx-auto max-w-lg text-center text-xs font-semibold leading-5 text-[#001B47]/45">{copy.footerStart} <a href="terms.html" className="font-black text-[#001B47] underline decoration-orange-300 decoration-2 underline-offset-4 hover:text-orange-600">{copy.terms}</a> {copy.and} <a href="privacy.html" className="font-black text-[#001B47] underline decoration-orange-300 decoration-2 underline-offset-4 hover:text-orange-600">{copy.privacy}</a>.</p>
        </section>
        <CinematicPanel />
      </div>
    </div>
  );
}

function AuthModal({ type, onClose, onSwitch, onLogin }) {
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [privacy, setPrivacy] = useState("private");
  if (type === "signup" && !showRegistration) return <SignUpIntro onClose={onClose} onSwitch={onSwitch} onCreate={() => setShowRegistration(true)} />;
  if (type === "signup" && showRegistration && !selectedRole) return <RoleSelection onBack={() => setShowRegistration(false)} onClose={onClose} onSelectRole={setSelectedRole} />;
  if (type === "signup" && showRegistration && selectedRole) return <RegistrationForm privacy={privacy} setPrivacy={setPrivacy} onBack={() => setSelectedRole(null)} onClose={onClose} onSwitch={onSwitch} />;
  return <LoginPage onClose={onClose} onSwitch={onSwitch} onLogin={onLogin} />;
}`;

const askResultsResponseActions = String.raw`function CopyResponseIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="4" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ThumbResponseIcon({ down = false, className = "h-5 w-5" }) {
  return (
    <svg className={className + (down ? " rotate-180" : "")} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.5 10.5v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 19.5H5.8A2.8 2.8 0 0 1 3 16.7v-3.4a2.8 2.8 0 0 1 2.8-2.8h1.7l3.4-6.4A2.1 2.1 0 0 1 14.8 5v4.1h3.8a2.4 2.4 0 0 1 2.3 3l-1.3 5.2a3 3 0 0 1-2.9 2.2H7.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareResponseIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 15V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7.5 8.5 12 4l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 13.5V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatResponseForAction(entry) {
  const resultLines = entry.results && entry.results.length
    ? entry.results.map((result) => formatResultForAction(result)).join("\n\n")
    : "";
  return [entry.text, resultLines].filter(Boolean).join("\n\n");
}

function cleanActionCopyText(value) {
  return String(value == null ? "" : value).replace(/\s+/g, " ").trim();
}

function formatGeneratedViewSpecForAction(result) {
  const viewSpec = result && result.viewSpec && typeof result.viewSpec === "object" ? result.viewSpec : null;
  if (!viewSpec) return "";
  const lines = [];
  const addLine = (label, value) => {
    const cleanValue = cleanActionCopyText(value);
    if (!cleanValue) return;
    lines.push(label ? label + ": " + cleanValue : cleanValue);
  };
  addLine("Card", viewSpec.kind || result.type || "EMY card");
  addLine("Title", viewSpec.title || result.name);
  addLine("Description", viewSpec.subtitle || result.desc);
  const badges = Array.isArray(viewSpec.badges) ? viewSpec.badges.map(cleanActionCopyText).filter(Boolean) : [];
  if (badges.length) addLine("Tags", badges.join(", "));
  const media = viewSpec.media && typeof viewSpec.media === "object" ? viewSpec.media : {};
  addLine("Media", media.src || media.image || media.ref || media.imageRef || result.image || result.imageRef || result.mediaRef);
  const appendItems = (heading, items) => {
    const cleanItems = Array.isArray(items) ? items.filter(Boolean) : [];
    if (!cleanItems.length) return;
    lines.push(heading);
    cleanItems.forEach((item) => {
      if (item && typeof item === "object") {
        const label = cleanActionCopyText(item.label || item.title || item.name);
        const value = cleanActionCopyText(item.value || item.text || item.desc || item.description);
        if (label || value) lines.push("- " + (label && value ? label + ": " + value : label || value));
        return;
      }
      const text = cleanActionCopyText(item);
      if (text) lines.push("- " + text);
    });
  };
  appendItems("Highlights", viewSpec.highlights);
  appendItems("Details", viewSpec.facts);
  (Array.isArray(viewSpec.sections) ? viewSpec.sections : []).forEach((section) => {
    if (!section || typeof section !== "object") return;
    appendItems(cleanActionCopyText(section.title) || "More information", section.items);
  });
  return lines.filter(Boolean).join("\n");
}

function formatResultForAction(result) {
  const generatedCardText = formatGeneratedViewSpecForAction(result);
  if (generatedCardText) return generatedCardText;
  const type = String(result && result.type || "").toLowerCase();
  if (type === "map" || type === "directions") {
    return [
      result.name,
      result.business ? "Business: " + result.business : "",
      result.origin ? "Start: " + result.origin : "",
      result.destination || result.address || result.place ? "Destination: " + (result.destination || result.address || result.place) : "",
      result.openStatus ? "Status: " + result.openStatus : "",
      result.openingHours ? "Opening hours: " + result.openingHours : "",
      result.url || result.mapUrl || result.directionsUrl ? "EMY map: " + (result.url || result.mapUrl || result.directionsUrl) : "",
      result.desc
    ].filter(Boolean).join("\n");
  }
  if (type === "job") {
    return [
      result.name,
      result.business ? "Business: " + result.business : "",
      result.jobLocation || result.place ? "Location: " + (result.jobLocation || result.place) : "",
      result.employment ? "Employment: " + result.employment : "",
      result.workplace ? "Workplace: " + result.workplace : "",
      result.experience ? "Experience: " + result.experience : "",
      result.apply ? "Apply: " + result.apply : "",
      result.applicants ? "Applicants: " + result.applicants : "",
      result.date ? "Posted: " + result.date : "",
      result.desc
    ].filter(Boolean).join("\n");
  }
  if (type === "business") {
    return [
      result.name,
      result.place || result.address ? "Area: " + (result.address || result.place) : "",
      result.openStatus ? "Status: " + result.openStatus : "",
      result.businessLikeCount || result.businessLikes || result.likedBusinessCount ? "Business likes: " + (result.businessLikeCount || result.businessLikes || result.likedBusinessCount) : "",
      result.businessDescription || result.desc ? "Description: " + (result.businessDescription || result.desc) : "",
      result.businessOffer ? "What they offer: " + result.businessOffer : "",
      result.category ? "Category: " + result.category : "",
      result.video ? "Video: " + result.video : "",
      result.phone ? "Phone: " + result.phone : "",
      result.email ? "Email: " + result.email : "",
      result.website ? "Website: " + result.website : "",
      result.openingHours ? "Opening hours: " + result.openingHours : ""
    ].filter(Boolean).join("\n");
  }
  return [result.name, result.place, result.desc, result.tags && result.tags.length ? "Tags: " + result.tags.join(", ") : ""].filter(Boolean).join("\n");
}

async function copyResponseText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (error) {}
  }

  return new Promise((resolve, reject) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const ASK_EMY_FEEDBACK_STORAGE_KEY = "emyAskFeedback";

function normaliseAskFeedbackVote(value) {
  const text = String(value || "").trim().toLowerCase();
  if (text === "like" || text === "up" || text === "thumb-up" || text === "thumbs-up") return "like";
  if (text === "dislike" || text === "down" || text === "thumb-down" || text === "thumbs-down") return "dislike";
  return "";
}

function readStoredAskFeedback() {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(ASK_EMY_FEEDBACK_STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (error) {
    return {};
  }
}

function writeStoredAskFeedback(store) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(ASK_EMY_FEEDBACK_STORAGE_KEY, JSON.stringify(store && typeof store === "object" ? store : {}));
  } catch (error) {}
}

function askFeedbackHash(value) {
  const text = String(value || "").slice(0, 4000);
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash * 31) + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function askFeedbackResultSummary(result) {
  if (!result || typeof result !== "object") return {};
  return {
    id: cleanActionCopyText(result.id || result.slug || result.url || result.mapUrl || result.productId || result.businessId),
    type: cleanActionCopyText(result.type || ""),
    name: cleanActionCopyText(result.name || result.title || ""),
    business: cleanActionCopyText(result.business || result.businessName || ""),
    url: cleanActionCopyText(result.url || result.mapUrl || result.directionsUrl || ""),
    price: cleanActionCopyText(result.price || ""),
    category: cleanActionCopyText(result.category || ""),
  };
}

function askFeedbackPageContext() {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search || "");
    return {
      query: cleanActionCopyText(params.get("q") || ""),
      chatId: cleanActionCopyText(params.get("chat") || ""),
      location: cleanActionCopyText(params.get("location") || ""),
      radius: cleanActionCopyText(params.get("radius") || ""),
      path: cleanActionCopyText(window.location.pathname + window.location.search),
    };
  } catch (error) {
    return {};
  }
}

function askFeedbackIdForAction({ entry, result, actionText, title, label }) {
  const summary = askFeedbackResultSummary(result);
  const entryId = cleanActionCopyText(entry && entry.id);
  const targetId = summary.id || entryId || cleanActionCopyText(title || label || "");
  const targetType = result ? ("result:" + (summary.type || label || "item")) : "response";
  const raw = [targetType, targetId, askFeedbackHash(actionText || title || label || entryId)].filter(Boolean).join(":");
  return "ask-emy-feedback:" + raw.toLowerCase().replace(/\s+/g, "-").slice(0, 220);
}

function readStoredAskFeedbackVote(feedbackId) {
  const record = readStoredAskFeedback()[feedbackId];
  return normaliseAskFeedbackVote(record && record.vote);
}

function writeStoredAskFeedbackVote(feedbackId, vote, payload) {
  if (!feedbackId) return;
  const store = readStoredAskFeedback();
  const cleanVote = normaliseAskFeedbackVote(vote);
  if (!cleanVote) {
    delete store[feedbackId];
    writeStoredAskFeedback(store);
    return;
  }
  store[feedbackId] = {
    ...(store[feedbackId] && typeof store[feedbackId] === "object" ? store[feedbackId] : {}),
    ...(payload && typeof payload === "object" ? payload : {}),
    vote: cleanVote,
    updatedAt: new Date().toISOString(),
  };
  writeStoredAskFeedback(store);
}

function askFeedbackPayloadForAction({ feedbackId, vote, entry, result, actionText, title, label }) {
  const summary = askFeedbackResultSummary(result);
  const page = askFeedbackPageContext();
  return {
    feedbackId,
    vote: normaliseAskFeedbackVote(vote),
    targetType: result ? "result" : "response",
    targetId: summary.id || cleanActionCopyText(entry && entry.id),
    title: cleanActionCopyText(title || summary.name || "Ask EMY response"),
    label: cleanActionCopyText(label || ""),
    messageId: cleanActionCopyText(entry && entry.id),
    query: page.query || "",
    chatId: page.chatId || "",
    location: page.location || "",
    radius: page.radius || "",
    path: page.path || "",
    result: summary,
    answer: cleanActionCopyText(actionText).slice(0, 4000),
    clientAt: new Date().toISOString(),
  };
}

async function persistAskEmyFeedback(payload) {
  writeStoredAskFeedbackVote(payload.feedbackId, payload.vote, payload);
  if (typeof fetch !== "function") return { ok: false, localOnly: true };
  const response = await fetch("/api/ask-emy/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Feedback save failed");
  return response.json();
}

function UserMessageActions({ text, onEdit }) {
  const [status, setStatus] = useState("");

  const copyMessage = async () => {
    try {
      await copyResponseText(text);
      setStatus("Copied");
      window.setTimeout(() => setStatus(""), 1500);
    } catch (error) {
      setStatus("Copy failed");
      window.setTimeout(() => setStatus(""), 1500);
    }
  };

  const actionClass = "flex h-8 w-8 items-center justify-center rounded-full text-[#001B47]/55 transition hover:bg-white hover:text-orange-600";

  return (
    <div className="mt-2 flex items-center justify-end gap-1 pr-1">
      {status && <span className="mr-2 text-xs font-black text-orange-600">{status}</span>}
      <IconButton label="Copy message" onClick={copyMessage} tooltipPosition="top" className={actionClass}>
        <CopyResponseIcon className="h-4 w-4" />
      </IconButton>
      <IconButton label="Edit message" onClick={onEdit} tooltipPosition="top" className={actionClass}>
        <PencilIcon className="h-4 w-4" />
      </IconButton>
    </div>
  );
}

function ResponseActions({ entry, result = null, text, title = "Ask EMY response", label = "response", className = "mt-2 flex items-center gap-1 pl-1" }) {
  const [status, setStatus] = useState("");
  const actionText = text || formatResponseForAction(entry || {});
  const actionLabel = label || "response";
  const actionLabelSuffix = actionLabel === "result" ? "" : " " + actionLabel;
  const feedbackId = askFeedbackIdForAction({ entry, result, actionText, title, label });
  const [reaction, setReaction] = useState(() => readStoredAskFeedbackVote(feedbackId));

  useEffect(() => {
    setReaction(readStoredAskFeedbackVote(feedbackId));
  }, [feedbackId]);

  const flashStatus = (nextStatus) => {
    setStatus(nextStatus);
    window.setTimeout(() => setStatus(""), 1500);
  };

  const copyAnswer = async () => {
    try {
      await copyResponseText(actionText);
      flashStatus("Copied");
    } catch (error) {
      flashStatus("Copy failed");
    }
  };

  const shareAnswer = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text: actionText });
        return;
      }
      await copyResponseText(actionText);
      flashStatus("Copied to share");
    } catch (error) {
      if (error && error.name === "AbortError") return;
      flashStatus("Share failed");
    }
  };

  const saveReaction = async (nextReaction) => {
    const vote = reaction === nextReaction ? "" : nextReaction;
    setReaction(vote);
    const payload = askFeedbackPayloadForAction({ feedbackId, vote, entry, result, actionText, title, label });
    writeStoredAskFeedbackVote(feedbackId, vote, payload);
    try {
      await persistAskEmyFeedback(payload);
      flashStatus(vote ? "Saved" : "Removed");
    } catch (error) {
      flashStatus(vote ? "Saved locally" : "Removed locally");
    }
  };

  const actionClass = "flex h-8 w-8 items-center justify-center rounded-full text-[#001B47]/55 transition hover:bg-white hover:text-orange-600";
  const activeClass = "bg-orange-50 text-orange-600 ring-1 ring-orange-100";

  return (
    <div className={className}>
      <IconButton label={"Copy" + actionLabelSuffix} onClick={copyAnswer} tooltipPosition="none" className={actionClass}>
        <CopyResponseIcon />
      </IconButton>
      <IconButton label={"Like" + actionLabelSuffix} aria-pressed={reaction === "like"} onClick={() => saveReaction("like")} tooltipPosition="none" className={actionClass + " " + (reaction === "like" ? activeClass : "")}>
        <ThumbResponseIcon />
      </IconButton>
      <IconButton label={"Dislike" + actionLabelSuffix} aria-pressed={reaction === "dislike"} onClick={() => saveReaction("dislike")} tooltipPosition="none" className={actionClass + " " + (reaction === "dislike" ? activeClass : "")}>
        <ThumbResponseIcon down />
      </IconButton>
      <IconButton label={"Share" + actionLabelSuffix} onClick={shareAnswer} tooltipPosition="none" className={actionClass}>
        <ShareResponseIcon />
      </IconButton>
      {status && <span className="ml-2 text-xs font-black text-orange-600">{status}</span>}
    </div>
  );
}`;
