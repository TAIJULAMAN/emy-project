/* EMY generator section: 20-transform-react-page.cjs (source lines 28863-30278) */
function transformReactPage(source, page = {}) {
  let code = source.replace(/^import\s+React[^;]*;\s*/m, '');
  const match = code.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/);
  if (!match) throw new Error('Could not find default exported component');
  const componentName = match[1];
  code = code.replace(/export\s+default\s+function\s+/, 'function ');
  code = code
    .replaceAll('Beta preview • ', '')
    .replaceAll(' Currently available as a beta preview.', '')
    .replace(
      'const profileImage = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80";',
      'const profileImage = "";'
    )
    .replaceAll(
      'absolute left-8 top-28 z-10 hidden rounded-full border border-white/60 bg-white/55 px-5 py-3 text-xs font-black text-[#001B47]/70 shadow-xl shadow-[#001B47]/5 backdrop-blur md:block',
      'absolute left-[clamp(5rem,12vw,12rem)] top-28 z-10 block rounded-full border border-white/60 bg-white/55 px-5 py-3 text-xs font-black text-[#001B47]/70 shadow-xl shadow-[#001B47]/5 backdrop-blur'
    )
    .replaceAll('href="/terms"', 'href="terms.html"')
    .replaceAll('href="/privacy"', 'href="privacy.html"')
    .replaceAll('href="/about"', 'href="about.html"')
    .replaceAll('href="/business"', 'href="business.html"')
    .replaceAll('href="/contact"', 'href="contact.html"')
    .replaceAll('href="/faqs"', 'href="faqs.html"')
    .replaceAll('href="/sign-in"', 'href="#login"')
    .replaceAll('href="/sign-up"', 'href="#signup"')
    .replaceAll('href="/"', 'href="index.html"')
    .replaceAll('href="#" className="hover:text-orange-500">Terms of Use', 'href="terms.html" className="hover:text-orange-500">Terms of Use')
    .replaceAll('href="#" className="hover:text-orange-500">Privacy Policy', 'href="privacy.html" className="hover:text-orange-500">Privacy Policy')
    .replaceAll('href="#" className="hover:text-orange-500">About Us', 'href="about.html" className="hover:text-orange-500">About Us')
    .replaceAll('href="#" className="hover:text-orange-500">Contact Support', 'href="contact.html" className="hover:text-orange-500">Contact Support')
    .replaceAll('href="#" className="hover:text-orange-500">FAQs', 'href="faqs.html" className="hover:text-orange-500">FAQs');

  if (page.output === 'index.html') {
    code = code.replace(
      /<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-orange-500 text-white shadow-xl shadow-orange-500\/25">\s*<LineIcon type="bolt" className="h-8 w-8" \/>\s*<\/div>/,
      askEmyPromptMascot
    ).replace(
      '<div className="absolute bottom-8 left-[8%] z-40 hidden max-w-[310px] rotate-[-3deg] rounded-[2rem] border border-white/80 bg-white/95 p-5 shadow-2xl shadow-[#001B47]/10 backdrop-blur-2xl lg:block">',
      '<a href="about-ask-emy.html" aria-label="About Ask EMY" className="absolute bottom-8 left-[8%] z-40 hidden max-w-[310px] rotate-[-3deg] rounded-[2rem] border border-white/80 bg-white/95 p-5 text-left shadow-2xl shadow-[#001B47]/10 backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-orange-200/40 lg:block">'
    ).replace(
      /(<div className="mt-5 flex items-center justify-between rounded-2xl border border-orange-100 bg-\[#fff8ef\] px-4 py-3 text-sm font-semibold text-\[#001B47\]\/50">[\s\S]*?<\/div>)\s*<\/div>\s*(<div className="absolute bottom-8 right-8 z-40 hidden rounded-full border border-white\/80 bg-white\/95 px-6 py-4 shadow-xl shadow-orange-200\/40 backdrop-blur-xl xl:flex">)/,
      '$1\n      </a>\n\n      $2'
    );
  }

  code = code.replace(
    /function IconButton\(\{ label, className = "", children, \.\.\.props \}\) \{[\s\S]*?\r?\n\}(?=\r?\n\r?\nfunction (?:Logo|SearchIcon))/,
    String.raw`function IconButton({ label, className = "", children, tooltipPosition = "bottom", ...props }) {
  const tooltipClass = tooltipPosition === "top"
    ? "pointer-events-none absolute bottom-full left-1/2 z-[260] mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100"
    : "pointer-events-none absolute left-1/2 top-full z-[260] mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs font-bold text-white opacity-0 shadow-lg transition group-hover:opacity-100";
  return (
    <button type="button" aria-label={label} className={"group relative cursor-pointer " + className} {...props}>
      {children}
      {tooltipPosition !== "none" && <span className={tooltipClass}>
        {label}
      </span>}
    </button>
  );
}
`
  );

  code = code
    .replaceAll('logIn: "Log in"', 'logIn: "Sign In"')
    .replaceAll('loginWithEmy: "Log in with EMY account details"', 'loginWithEmy: "Sign in with EMY account details"')
    .replaceAll('logIntoAccount: "Log into your account"', 'logIntoAccount: "Sign in to your account"')
    .replaceAll('signInMessage: "To use Ask EMY, you need to log in with your EMY login details."', 'signInMessage: "To use Ask EMY, you need to sign in with your EMY account details."')
    .replaceAll('switchToLogin: "Log in"', 'switchToLogin: "Sign In"')
    .replaceAll('typeMessage: "Type your message here..."', 'typeMessage: "Tell me..."')
    .replaceAll('then come back and log in with your EMY details.', 'then come back and sign in with your EMY details.')
    .replaceAll('You are logging into', 'You are signing in to')
    .replaceAll('You have logged out of Ask EMY.', 'You have signed out of Ask EMY.')
    .replaceAll('logged out of Ask EMY', 'signed out of Ask EMY')
    .replaceAll('Log in', 'Sign In')
    .replaceAll('log in', 'sign in');
  code = code.replace(
    /function SignUpIntro\(\{ onClose, onSwitch, onCreate \}\) \{\r?\n(?!\s*const openEmySignup)/,
    'function SignUpIntro({ onClose, onSwitch, onCreate }) {\n  const openEmySignup = () => {\n    window.location.href = "index.html?emyAuth=signup";\n  };\n\n'
  );
  code = code.replace(
    '<button type="button" onClick={onCreate} className="mt-7 w-full cursor-pointer rounded-2xl bg-orange-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600">{copy.createAccountOnEmy}</button>',
    '<button type="button" onClick={openEmySignup} className="mt-7 w-full cursor-pointer rounded-2xl bg-orange-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600">{copy.createAccountOnEmy}</button>'
  );

  if (page.output === 'ask-emy.html') {
    code = code.replace(
      'signedInAs: "Signed in as",',
      'signedInAs: "Signed in as",\n  closeSearch: "Close search",\n  recentChats: "Recent Chats",\n  noRecent: "No recent chats yet",\n  noChatsFound: "No chats found",\n  searchRecentChats: "Search recent chats...",\n  closeSidebar: "Close sidebar",\n  pinSidebar: "Pin menu",\n  unpinSidebar: "Unpin menu",\n  deleteChat: "Delete chat",\n  pinChat: "Pin chat",\n  unpinChat: "Unpin chat",\n  pinnedChats: "Pinned Chats",\n  logout: "Log out",\n  viewProfile: "Go to EMY Profile",'
    );
    code = code.replace(
      /  voiceSearch: "Voice search",\r?\n  askEmyVoice: "Ask EMY voice",/,
      '  listening: "Dictating...",\n  voiceSearch: "Dictate",\n  stopListening: "Stop dictation",\n  sendMessage: "Send message",\n  askEmyVoice: "Ask EMY voice",\n  voiceReady: "Dictation added. Press send when ready.",\n  askEmyVoiceReady: "Ask EMY voice is listening.",\n  micBlocked: "Microphone access is blocked. Allow the microphone in your browser/site settings, then click the mic again.",\n  voiceNotSupported: "Voice search is not supported in this browser or preview. Try Chrome/Edge on HTTPS, or type your message.",'
    );
    code = code.replace(
      /function SearchBar\(\{ location, setLocation, radius, setRadius, savedLocations, setSavedLocations, user(?:, onAuthRequired)? \}\) \{[\s\S]*?\r?\n\}\r?\n\r?\nfunction App\(\) \{/,
      `${askHomeSearchBarComponent}\n\nfunction App() {`
    );
    code = code.replace(
      '<span className="h-7 w-px rounded-full bg-[#d7dbe5]" /><Logo small />',
      '<span className="h-7 w-px rounded-full bg-[#d7dbe5]" /><Logo small />' + askEmyMenuMascot
    );
  }

  code = code.replace(
    /\s*<p className="relative z-10 mt-8 inline-flex rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-\[0\.18em\] text-orange-600">\s*Beta preview\s*<\/p>/g,
    ''
  );
  code = code.replace(
    /\s*<a href="(?:\/team|about\.html#about-team)" className="mt-8 inline-flex items-center justify-center rounded-xl bg-orange-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600\/25 transition hover:bg-orange-700">\s*Meet the full team\s*?\s*<\/a>/g,
    ''
  );
  code = code.replace(
    'const submit = () => { if (!hasQuery) return; alert(`Open the results page with search: ${query.trim()}`); setQuery(""); };',
    'const submit = () => { if (!hasQuery) return; window.location.href = `ask-emy-results.html?q=${encodeURIComponent(query.trim())}`; };'
  );
  code = code.replace(
    'const startNewChat = () => alert("This will open a new Ask EMY chat/results page.");',
    'const startNewChat = () => { window.location.href = "ask-emy.html"; };'
  );
  code = code.replace(
    /  const newChat = \(\) => \{\r?\n    const now = Date\.now\(\);\r?\n    const newConversation = \{\r?\n      id: `chat-\$\{now\}`,\r?\n      title: "New chat",\r?\n      pinned: false,\r?\n      messages: \[\{ id: `assistant-\$\{now\}`, role: "assistant", text: copy\.welcome, results: \[\] \}\],\r?\n    \};\r?\n    setChats\(\(current\) => \[newConversation, \.\.\.current\]\);\r?\n    setActiveChatId\(newConversation\.id\);\r?\n    setDrawerOpen\(false\);\r?\n  \};/,
    '  const newChat = () => {\n    saveStoredAskChats(chats);\n    saveStoredAskSidebarOpen(drawerOpen);\n    window.location.href = askHomeUrl(location, radius, drawerOpen);\n  };'
  );
  code = code.replace(
    'const firstQuery = "Best local services today";',
    'const firstQuery = new URLSearchParams(window.location.search).get("q") || "Best local services today";'
  );
  code = code.replace(
    'const firstQuery = new URLSearchParams(window.location.search).get("q") || "Best local services today";',
    'const askParams = new URLSearchParams(window.location.search);\n  const requestedChatId = askParams.get("chat");\n  const firstQuery = askParams.get("q") || "Best local services today";\n  const initialChatLocation = readStoredAskLocation(askParams);'
  );
  code = code.replace(
    'id: "chat-1",',
    'id: requestedChatId || createAskChatId(),'
  );
  code = code.replace(
    /const \[activeChatId, setActiveChatId\] = useState\("chat-1"\);\r?\n  const \[chats, setChats\] = useState\(\[initialChat\]\);/,
    'const initialChatState = useMemo(() => {\n    const storedChats = readStoredAskChats();\n    const storedActiveChatId = readStoredAskActiveChatId();\n    const existingChat = requestedChatId\n      ? storedChats.find((chat) => chat.id === requestedChatId)\n      : storedActiveChatId ? storedChats.find((chat) => chat.id === storedActiveChatId) : null;\n    const hasUsableMessages = existingChat && Array.isArray(existingChat.messages) && existingChat.messages.length > 0;\n    if (hasUsableMessages) {\n      saveStoredAskActiveChatId(existingChat.id);\n      return { activeChatId: existingChat.id, chats: storedChats };\n    }\n    if (!requestedChatId && !askParams.get("q") && storedChats[0] && Array.isArray(storedChats[0].messages) && storedChats[0].messages.length > 0) {\n      saveStoredAskActiveChatId(storedChats[0].id);\n      return { activeChatId: storedChats[0].id, chats: storedChats };\n    }\n    const nextChats = [initialChat, ...storedChats.filter((chat) => chat.id !== initialChat.id)].slice(0, 50);\n    saveStoredAskChats(nextChats);\n    saveStoredAskActiveChatId(initialChat.id);\n    return { activeChatId: initialChat.id, chats: nextChats };\n  }, []);\n  const [activeChatId, setActiveChatId] = useState(initialChatState.activeChatId);\n  const [chats, setChats] = useState(initialChatState.chats);\n  useEffect(() => { saveStoredAskChats(chats); }, [chats]);'
  );
  code = code.replace(
    'const [showDetails, setShowDetails] = useState(false);',
    'const [showDetails, setShowDetails] = useState(false);'
  );
  code = code.replace(
    '{!showDetails ? (',
    '{!showDetails ? ('
  );
  code = code.replace(
    '<button type="button" onClick={() => setShowDetails(false)} className="mb-5 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-black text-[#001B47] hover:bg-orange-50">‹ Back</button>',
    '<button type="button" onClick={() => setShowDetails(false)} className="mb-5 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-black text-[#001B47] hover:bg-orange-50">‹ Back</button>'
  );
  code = code.replace(
    'const [loginPassword, setLoginPassword] = useState("");',
    'const [loginPassword, setLoginPassword] = useState("");\n  const [showPassword, setShowPassword] = useState(false);'
  );
  code = code.replace(
    '<label className="block text-left text-[13px] font-black text-[#2d1d52]">{copy.password}<span className="text-orange-500">*</span><input type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} className={`mt-2 h-[46px] w-full rounded-md border bg-white px-3 text-sm font-semibold text-[#171435] outline-none focus:border-orange-500 ${passwordHasError ? "border-rose-400" : "border-[#d7d0cd]"}`} placeholder={copy.password} />{passwordHasError && <span className="mt-1 block text-[11px] font-semibold text-rose-500">Please enter Password.</span>}</label>',
    '<label className="block text-left text-[13px] font-black text-[#2d1d52]">{copy.password}<span className="text-orange-500">*</span><div className="relative mt-2"><input type={showPassword ? "text" : "password"} value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} className={`h-[46px] w-full rounded-md border bg-white px-3 pr-12 text-sm font-semibold text-[#171435] outline-none focus:border-orange-500 ${passwordHasError ? "border-rose-400" : "border-[#d7d0cd]"}`} placeholder={copy.password} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-orange-600 hover:bg-orange-50" aria-label={showPassword ? "Hide password" : "Show password"}><EyeIcon hidden={showPassword} /></button></div>{passwordHasError && <span className="mt-1 block text-[11px] font-semibold text-rose-500">Please enter Password.</span>}</label>'
  );
  code = code.replace(
    'onBack={() => setIsClosed(true)}',
    'onBack={() => { saveStoredAskSidebarOpen(drawerOpen); window.location.href = askHomeUrl(location, radius, drawerOpen); }}'
  );
  code = code.replace(
    '        <main className="flex min-h-screen flex-col items-center justify-start px-5 pb-20 pt-36 md:pt-40">',
    '        <main className="flex min-h-screen flex-col items-center justify-center px-5 pb-28 pt-28 md:pt-32">'
  );
  code = code.replace(
    /          <\/section>\r?\n        <\/main>\r?\n        <footer className="fixed bottom-6 left-0 right-0 z-10 px-5 text-center text-sm font-semibold text-\[#001B47\]\/45">\{copy\.footerStart\} <span className="font-black text-\[#001B47\]">\{copy\.terms\}<\/span> \{copy\.and\} <span className="font-black text-\[#001B47\]">\{copy\.privacy\}<\/span>\.<\/footer>/,
    `            <p className="mt-8 px-5 text-center text-sm font-semibold text-[#001B47]/45">{copy.footerStart} <span className="font-black text-[#001B47]">{copy.terms}</span> {copy.and} <span className="font-black text-[#001B47]">{copy.privacy}</span>.</p>
          </section>
        </main>`
  );
  code = code.replaceAll(
    '<div className="fixed inset-0 z-[100]',
    '<div className="emy-fullscreen-cover fixed inset-0 z-[100]'
  );
  code = code.replace(
    '<div className="emy-fullscreen-cover fixed inset-0 z-[100] bg-[#fff8ef] text-[#001B47]"',
    '<div className="emy-fullscreen-cover fixed inset-0 z-[100] overflow-hidden bg-[#fff8ef] text-[#001B47]"'
  );
  code = code.replace(
    '<div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">',
    '<div className="grid h-full min-h-0 grid-cols-1 lg:grid-cols-2">'
  );
  code = code.replace(
    '<a href="#" className="flex w-full items-center justify-center gap-4 rounded-2xl bg-[#001B47] px-6 py-4 text-white shadow-xl shadow-[#001B47]/15 transition hover:-translate-y-0.5 hover:bg-orange-600">',
    '<a href="../emy-app-web/index.html" className="flex w-full items-center justify-center gap-4 rounded-2xl bg-[#001B47] px-6 py-4 text-white shadow-xl shadow-[#001B47]/15 transition hover:-translate-y-0.5 hover:bg-orange-600">'
  );
  code = code.replace(
    /<svg width="26" height="26" viewBox="0 0 24 24">\s*<path fill="#34A853" d="M3 12l7-4v8z" \/>\s*<path fill="#FBBC05" d="M10 8l5 4-5 4z" \/>\s*<path fill="#EA4335" d="M15 4l6 4-6 4z" \/>\s*<path fill="#4285F4" d="M15 12l6 4-6 4z" \/>\s*<\/svg>/,
    `<span className="flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden="true">
          <svg className="h-8 w-8" viewBox="0 0 48 48" fill="none">
            <path d="M8 6.6v34.8c0 1.8 1.9 2.9 3.4 1.9L30.2 24 11.4 4.7C9.9 3.7 8 4.8 8 6.6z" fill="#34A853" />
            <path d="M30.2 24 8 6.6c.1-.8.6-1.5 1.3-1.9.7-.4 1.5-.4 2.1 0L35.1 18 30.2 24z" fill="#4285F4" />
            <path d="M35.1 30 11.4 43.3c-.6.4-1.4.4-2.1 0-.7-.4-1.2-1.1-1.3-1.9L30.2 24l4.9 6z" fill="#FBBC05" />
            <path d="M39.3 21.6c1.7 1 1.7 3.8 0 4.8L35.1 30l-4.9-6 4.9-6 4.2 3.6z" fill="#EA4335" />
          </svg>
        </span>`
  );
  code = code.replace(
    '<section className="relative flex min-h-screen flex-col bg-white px-6 py-8 lg:px-16">',
    '<section className="relative flex h-full min-h-0 flex-col overflow-y-auto bg-white px-6 py-6 lg:px-16">'
  );
  code = code.replace(
    '<div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-12">',
    '<div className="mx-auto flex min-h-0 w-full max-w-lg flex-1 flex-col justify-center py-8">'
  );
  code = code.replace(
    '<div className="mx-auto mt-7 w-full max-w-5xl">',
    '<div className="mx-auto mt-7 w-full max-w-[960px]">'
  );
  code = code.replace(
    '<div className="mx-auto mt-7 w-full max-w-[960px]">',
    '<div className="relative z-40 mx-auto mt-7 w-full max-w-[960px]">'
  );
  code = code.replace(
    /  const \[location, setLocation\] = useState\("Near me"\);\r?\n  const \[radius, setRadius\] = useState\(5\);\r?\n  const \[savedLocations, setSavedLocations\] = useState\(\[\]\);/,
    '  const initialAskLocation = useMemo(() => readStoredAskLocation(new URLSearchParams(window.location.search)), []);\n  const [location, setLocation] = useState(initialAskLocation.location);\n  const [radius, setRadius] = useState(initialAskLocation.radius);\n  const [savedLocations, setSavedLocations] = useState(initialAskLocation.savedLocations);\n  useEffect(() => { saveStoredAskLocation({ location, radius, savedLocations }); }, [location, radius, savedLocations]);'
  );
  code = code.replace(
    'function SearchBar({ location, setLocation, radius, setRadius, savedLocations, setSavedLocations, user }) {',
    'function SearchBar({ location, setLocation, radius, setRadius, savedLocations, setSavedLocations, user, onAuthRequired }) {'
  );
  code = code.replace(
    'const submit = () => { if (!hasQuery) return; window.location.href = `ask-emy-results.html?q=${encodeURIComponent(query.trim())}`; };',
    'const submit = () => { if (!hasQuery) return; if (!user) { onAuthRequired(); return; } const chatId = createAskChatId(); saveStoredAskLocation({ location, radius, savedLocations }); window.location.href = askResultsUrl(query.trim(), chatId, location, radius); };'
  );
  code = code.replace(
    '  const startVoiceInput = () => {\n    if (isListening) { stopVoiceInput(); return; }',
    '  const startVoiceInput = () => {\n    if (isListening) { stopVoiceInput(); return; }\n    if (!user) { onAuthRequired(); return; }'
  );
  code = code.replace(
    '<section className="w-full text-center">',
    '<section className="emy-visual-center mx-auto w-full max-w-5xl text-center">'
  );
  code = code.replace(
    '<p className="mx-auto mt-5 max-w-5xl whitespace-nowrap text-sm font-semibold leading-6 text-[#001B47]/56 md:text-[15px]">',
    '<p className="mx-auto mt-5 max-w-3xl px-3 text-center text-sm font-semibold leading-6 text-[#001B47]/56 md:text-[15px]">'
  );
  code = code.replace(
    '{suggestions.map((item) => <button key={item} type="button" className="pointer-events-auto cursor-pointer rounded-full border border-[#001B47]/8 bg-white/55 px-5 py-3 text-sm font-bold text-[#001B47]/50 shadow-sm backdrop-blur hover:bg-orange-50 hover:text-orange-600">{item}</button>)}',
    '{suggestions.map((item) => <button key={item} type="button" onClick={() => { window.location.href = "ask-emy-results.html?q=" + encodeURIComponent(item); }} className="pointer-events-auto cursor-pointer rounded-full border border-[#001B47]/8 bg-white/55 px-5 py-3 text-sm font-bold text-[#001B47]/50 shadow-sm backdrop-blur hover:bg-orange-50 hover:text-orange-600">{item}</button>)}'
  );
  code = code.replace(
    'onClick={() => { window.location.href = "ask-emy-results.html?q=" + encodeURIComponent(item); }}',
    'onClick={() => { if (!user) { requireAuthForSearch(); return; } const chatId = createAskChatId(); saveStoredAskLocation({ location, radius, savedLocations }); saveStoredAskSidebarOpen(menuOpen); window.location.href = askResultsUrl(item, chatId, location, radius, menuOpen); }}'
  );
  code = code.replace(
    '<div className="pointer-events-none relative -z-10 mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-3 opacity-80">',
    '<div className="relative z-0 mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-3 opacity-80">'
  );
  code = code.replaceAll(
    '<span className="h-5 w-px bg-[#001B47]/12" />',
    '<span className="h-7 w-px rounded-full bg-[#d7dbe5]" />'
  );
  if (page.output === 'ask-emy.html') {
    code = code.replace(
      '<span className="h-7 w-px rounded-full bg-[#d7dbe5]" /><Logo small /></div>',
      '<span className="h-7 w-px rounded-full bg-[#d7dbe5]" /><Logo small />' + askEmyMenuMascot + '</div>'
    );
  }
  code = code.replaceAll(
    'z-50 w-80 rounded-3xl',
    'z-[120] w-80 rounded-3xl'
  );
  code = code.replace(
    'absolute left-0 top-14 z-[120] w-80 rounded-3xl border border-[#001B47]/8 bg-white p-4 text-left shadow-[0_24px_70px_rgba(0,27,71,0.22)] backdrop-blur-xl',
    'absolute left-0 top-14 z-[220] w-80 rounded-3xl border border-[#001B47]/8 bg-white p-4 text-left shadow-[0_24px_70px_rgba(0,27,71,0.22)] backdrop-blur-xl'
  );
  code = code.replace(
    'absolute left-0 top-14 z-[120] w-80 rounded-3xl border border-[#001B47]/8 bg-white/95 p-4 text-left shadow-xl backdrop-blur-xl',
    'absolute left-0 top-14 z-[220] w-80 rounded-3xl border border-[#001B47]/8 bg-white p-4 text-left shadow-[0_24px_70px_rgba(0,27,71,0.22)] backdrop-blur-xl'
  );
  code = code.replace(
    'absolute bottom-16 left-0 z-[120] w-80 rounded-3xl border border-[#001B47]/8 bg-white p-4 text-left shadow-[0_18px_50px_rgba(0,27,71,0.14)]',
    'absolute bottom-16 left-0 z-[220] w-80 rounded-3xl border border-[#001B47]/8 bg-white p-4 text-left shadow-[0_18px_50px_rgba(0,27,71,0.14)]'
  );
  code = code.replaceAll(
    'className="sticky bottom-0 mt-4 w-full cursor-pointer rounded-2xl bg-[#001B47]',
    'className="mt-4 w-full cursor-pointer rounded-2xl bg-[#001B47]'
  );
  code = code.replace(
    'bg-white/95 p-4 text-left shadow-xl backdrop-blur-xl',
    'bg-white p-4 text-left shadow-[0_24px_70px_rgba(0,27,71,0.22)] backdrop-blur-xl'
  );
  code = code.replace(
    'const selectNearMe = () => { setLocation("Near me"); setRadius(5); setDraftLocation(""); };',
    'const selectNearMe = () => { setLocation("Near me"); setRadius(5); setDraftLocation(""); setIsOpen(false); };'
  );
  code = code.replace(
    '<div className="flex items-center gap-3 md:gap-4"><button type="button" onClick={() => onAuth("signin")} className="cursor-pointer rounded-full border border-[#001B47]/10 bg-white/70 px-5 py-3 text-sm font-bold text-[#001B47] shadow-sm transition hover:bg-orange-50 hover:text-orange-600">{copy.logIn}</button><button type="button" onClick={() => onAuth("signup")} className="cursor-pointer rounded-full bg-[#001B47] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#001B47]/10 transition hover:bg-orange-600">{copy.signUp}</button></div>',
    '<div className="flex items-center gap-3 md:gap-4"><a href="index.html" className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-black text-[#001B47]/70 transition hover:bg-orange-50 hover:text-orange-600 sm:inline-flex">EMY Home</a><a href="about-ask-emy.html" className="inline-flex cursor-pointer rounded-full px-3 py-3 text-sm font-black text-[#001B47]/70 transition hover:bg-orange-50 hover:text-orange-600 md:px-4">About Ask EMY</a><button type="button" onClick={() => onAuth("signin")} className="cursor-pointer rounded-full border border-[#001B47]/10 bg-white/70 px-5 py-3 text-sm font-bold text-[#001B47] shadow-sm transition hover:bg-orange-50 hover:text-orange-600">{copy.logIn}</button><button type="button" onClick={() => onAuth("signup")} className="cursor-pointer rounded-full bg-[#001B47] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#001B47]/10 transition hover:bg-orange-600">{copy.signUp}</button></div>'
  );
  code = code.replace(
    /<div className="flex items-center gap-3">\r?\n\s*<button type="button" onClick=\{\(\) => alert\("This will open the user's EMY Profile\."\)\}/,
    '<div className="flex items-center gap-3">\n          <a href="about-ask-emy.html" className="inline-flex cursor-pointer rounded-full px-3 py-3 text-sm font-black text-[#001B47]/70 transition hover:bg-orange-50 hover:text-orange-600 md:px-4">About Ask EMY</a>\n          <button type="button" onClick={() => alert("This will open the user\'s EMY Profile.")}'
  );
  code = code.replace(
    String.raw`<button type="button" onClick={onAccount} className="flex cursor-pointer items-center gap-3 rounded-full border border-[#001B47]/10 bg-white/80 px-3 py-2 shadow-sm hover:bg-orange-50">
            <img src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-orange-100" />
            <span className="hidden text-left sm:block"><span className="block text-sm font-black leading-4 text-[#001B47]">{user.name}</span><span className="block max-w-[170px] truncate text-xs font-semibold text-[#001B47]/45">{user.email}</span></span>
          </button>`,
    String.raw`<button type="button" onClick={onAccount} aria-label={copy.viewProfile} title={copy.viewProfile} className="flex h-11 max-w-[148px] cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[#001B47]/10 bg-white/90 px-2 pr-3 shadow-sm transition hover:bg-orange-50 hover:text-orange-600">
            <AskAccountAvatar account={user} className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-orange-100" />
            <span className="hidden max-w-[76px] truncate text-sm font-black leading-none text-[#001B47] sm:block">Profile</span>
          </button>`
  );
  code = code.replace(
    'relative min-h-screen overflow-hidden bg-[#fbfaf8]',
    'relative min-h-screen overflow-visible bg-[#fbfaf8]'
  );
  code = code.replace(
    'fixed bottom-0 left-0 z-30 bg-[#fff8ef]/95',
    'fixed bottom-0 left-0 z-[80] bg-[#fff8ef]/95'
  );
  code = code.replaceAll(
    '{copy.footerStart} <span className="font-black text-[#001B47]">{copy.terms}</span> {copy.and} <span className="font-black text-[#001B47]">{copy.privacy}</span>.',
    '{copy.footerStart} <a href="terms.html" className="font-black text-[#001B47] underline decoration-orange-300 decoration-2 underline-offset-4 hover:text-orange-600">{copy.terms}</a> {copy.and} <a href="privacy.html" className="font-black text-[#001B47] underline decoration-orange-300 decoration-2 underline-offset-4 hover:text-orange-600">{copy.privacy}</a>.'
  );
  code = code.replace(
    'function RoleCard({ label, onClick }) {',
    String.raw`function EyeIcon({ hidden = false, className = "h-5 w-5" }) {
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

function RoleCard({ label, onClick }) {`
  );
  code = code.replace(
    '<button type="button" onClick={onCreate} className="mt-7 w-full cursor-pointer rounded-2xl bg-orange-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600">{copy.createAccountOnEmy}</button>',
    '<button type="button" onClick={onCreate} className="mt-7 w-full cursor-pointer rounded-2xl bg-orange-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600">{copy.createAccountOnEmy}</button>'
  );
  code = code.replace(
    '                </form>\n                <p className="mt-7 text-center text-sm font-semibold text-[#8a8594]">',
    '                </form>\n                <SocialAuthButtons mode="sign in" />\n                <p className="mt-7 text-center text-sm font-semibold text-[#8a8594]">'
  );
  code = code.replace(
    /                <\/form>\r?\n                <p className="mt-7 text-center text-sm font-semibold text-\[#8a8594\]">/,
    '                </form>\n                <SocialAuthButtons mode="sign in" />\n                <p className="mt-7 text-center text-sm font-semibold text-[#8a8594]">'
  );
  code = code.replace(
    'const [user, setUser] = useState(null);',
    'const [user, setUser] = useState(() => readStoredAskUser());\n  const [authPrompt, setAuthPrompt] = useState(false);'
  );
  code = code.replace(
    /const \[authPrompt, setAuthPrompt\] = useState\(false\);\r?\n  const suggestions = \["Best local services today", "Shops open now", "Businesses with offers"\];/,
    'const [authPrompt, setAuthPrompt] = useState(false);\n  const [chats, setChats] = useState(() => readStoredAskChats());\n  useEffect(() => { if (sidebarPinned && !menuOpen) setMenuOpen(true); }, [sidebarPinned, menuOpen]);\n  useEffect(() => { if (menuOpen) setChats(readStoredAskChats()); }, [menuOpen]);\n  useEffect(() => { saveStoredAskSidebarOpen(Boolean(menuOpen || sidebarPinned)); }, [menuOpen, sidebarPinned]);\n  const suggestions = ["Best local services today", "Shops open now", "Businesses with offers"];'
  );
  code = code.replace(
    /const \[authModal, setAuthModal\] = useState\(null\);\r?\n  const \[menuOpen, setMenuOpen\] = useState\(false\);/,
    'const [authModal, setAuthModal] = useState(null);\n  const initialSidebarOpen = useMemo(() => readStoredAskSidebarOpen(new URLSearchParams(window.location.search)), []);\n  const [menuOpen, setMenuOpen] = useState(initialSidebarOpen);\n  const [sidebarPinned, setSidebarPinned] = useState(() => readStoredAskSidebarPinned());\n  const toggleSidebarPinned = () => {\n    setSidebarPinned((current) => {\n      const next = !current;\n      saveStoredAskSidebarPinned(next);\n      if (next) setMenuOpen(true);\n      return next;\n    });\n  };'
  );
  code = code.replace(
    'const suggestions = ["Best local services today", "Shops open now", "Businesses with offers"];',
    'const suggestions = ["Best local services today", "Shops open now", "Businesses with offers"];\n  const requireAuthForSearch = () => setAuthPrompt(true);'
  );
  code = code.replace(
    '<SearchBar location={location} setLocation={setLocation} radius={radius} setRadius={setRadius} savedLocations={savedLocations} setSavedLocations={setSavedLocations} user={user} />',
    '<SearchBar location={location} setLocation={setLocation} radius={radius} setRadius={setRadius} savedLocations={savedLocations} setSavedLocations={setSavedLocations} user={user} onAuthRequired={requireAuthForSearch} sidebarOpen={menuOpen} />'
  );
  code = code.replace(
    '{authModal && <AuthModal type={authModal} onClose={() => setAuthModal(null)} onSwitch={setAuthModal} onLogin={loginUser} />}',
    '{authPrompt && <AuthRequiredPrompt onClose={() => setAuthPrompt(false)} onSignIn={() => { setAuthPrompt(false); setAuthModal("signin"); }} onSignUp={() => { setAuthPrompt(false); setAuthModal("signup"); }} />}\n      {authModal && <AuthModal type={authModal} onClose={() => setAuthModal(null)} onSwitch={setAuthModal} onLogin={loginUser} />}'
  );
  code = code.replace(
    'const loginUser = (email) => { setUser({ name: "Stephane Elkrak", email: email || "stephaneelkrak@hotmail.com", image: profileImage }); setAuthModal(null); };',
    'const loginUser = (email) => { const nextUser = makeAskUserFromLogin(email); setUser(nextUser); saveStoredAskUser(nextUser); setAuthModal(null); };'
  );
  code = code.replace(
    'const logoutUser = () => { setUser(null); setMenuOpen(false); };',
    'const logoutUser = () => { goToEmyLogin(); };'
  );
  code = code.replace(
    'const startNewChat = () => { window.location.href = "ask-emy.html"; };',
    'const startNewChat = () => { saveStoredAskSidebarOpen(menuOpen); window.location.href = askHomeUrl(location, radius, menuOpen); };\n  const openSavedChat = (chatId) => { saveStoredAskSidebarOpen(menuOpen); window.location.href = "ask-emy-results.html?chat=" + encodeURIComponent(chatId) + "&location=" + encodeURIComponent(location) + "&radius=" + encodeURIComponent(radius) + "&sidebar=" + (menuOpen ? "open" : "closed"); };\n  const deleteSavedChat = (chatId) => { setChats((current) => { const next = current.filter((chat) => chat.id !== chatId); saveStoredAskChats(next); return next; }); };\n  const toggleSavedChatPin = (chatId) => { setChats((current) => { const next = current.map((chat) => chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat); saveStoredAskChats(next); return next; }); };\n  const goToEmyAccount = () => { goToEmyProfile(); };\n  const switchAskAccount = (role) => {\n    const nextUser = switchEmyAskAccount(role);\n    const nextLocation = readStoredAskLocation(new URLSearchParams(window.location.search));\n    setUser(nextUser || readStoredAskUser());\n    setLocation(nextLocation.location);\n    setRadius(nextLocation.radius);\n    setSavedLocations(nextLocation.savedLocations);\n    setChats(readStoredAskChats());\n    setMenuOpen(true);\n  };'
  );
  code = code.replace(
    '<LoggedInMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} user={user} onLogout={logoutUser} onNewChat={startNewChat} />',
    '<LoggedInMenu isOpen={menuOpen} onClose={() => { if (!sidebarPinned) setMenuOpen(false); }} isPinned={sidebarPinned} onTogglePinned={toggleSidebarPinned} user={user} onLogout={logoutUser} onNewChat={startNewChat} chats={chats} activeChatId={null} onOpenChat={openSavedChat} onDeleteChat={deleteSavedChat} onTogglePin={toggleSavedChatPin} onAccount={goToEmyAccount} onSwitchAccount={switchAskAccount} />'
  );
  code = code.replace(
    'function Header({ onAuth, user, onLogout, onToggleMenu, isMenuOpen })',
    'function Header({ onAuth, user, onLogout, onToggleMenu, isMenuOpen, onAccount })'
  );
  code = code.replace(
    /onClick=\{\(\) => alert\("This will open the user\\?'s EMY Profile\."\)\}/,
    'onClick={onAccount}'
  );
  code = code.replace(
    '<Header onAuth={setAuthModal} user={user} onLogout={logoutUser} onToggleMenu={() => setMenuOpen((current) => !current)} isMenuOpen={menuOpen} />',
    '<Header onAuth={setAuthModal} user={user} onLogout={logoutUser} onToggleMenu={() => setMenuOpen((current) => sidebarPinned ? true : !current)} isMenuOpen={menuOpen} onAccount={goToEmyAccount} />'
  );
  code = code.replace(
    String.raw`<button type="button" onClick={onAccount} className="flex cursor-pointer items-center gap-3 rounded-full border border-[#001B47]/10 bg-white/80 px-3 py-2 shadow-sm hover:bg-orange-50">
            <img src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-orange-100" />
            <span className="hidden text-left sm:block"><span className="block text-sm font-black leading-4 text-[#001B47]">{user.name}</span><span className="block max-w-[170px] truncate text-xs font-semibold text-[#001B47]/45">{user.email}</span></span>
          </button>`,
    String.raw`<button type="button" onClick={onAccount} aria-label={copy.viewProfile} title={copy.viewProfile} className="flex h-11 max-w-[148px] cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[#001B47]/10 bg-white/90 px-2 pr-3 shadow-sm transition hover:bg-orange-50 hover:text-orange-600">
            <AskAccountAvatar account={user} className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-orange-100" />
            <span className="hidden max-w-[76px] truncate text-sm font-black leading-none text-[#001B47] sm:block">Profile</span>
          </button>`
  );
  code = code.replace(
    new RegExp(String.raw`<button type="button" onClick=\{onAccount\} className="flex cursor-pointer items-center gap-3 rounded-full border border-\[#001B47\]/10 bg-white/80 px-3 py-2 shadow-sm hover:bg-orange-50">\s*<img src=\{user\.image\} alt=\{user\.name\} className="h-9 w-9 rounded-full object-cover ring-2 ring-orange-100" \/>\s*<span className="hidden text-left sm:block"><span className="block text-sm font-black leading-4 text-\[#001B47\]">\{user\.name\}<\/span><span className="block max-w-\[170px\] truncate text-xs font-semibold text-\[#001B47\]/45">\{user\.email\}<\/span><\/span>\s*<\/button>`),
    String.raw`<button type="button" onClick={onAccount} aria-label={copy.viewProfile} title={copy.viewProfile} className="flex h-11 max-w-[148px] cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-[#001B47]/10 bg-white/90 px-2 pr-3 shadow-sm transition hover:bg-orange-50 hover:text-orange-600">
            <AskAccountAvatar account={user} className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-orange-100" />
            <span className="hidden max-w-[76px] truncate text-sm font-black leading-none text-[#001B47] sm:block">Profile</span>
          </button>`
  );
  code = code.replace(
    /function LoggedInMenu\(\{ isOpen, onClose, user, onLogout, onNewChat \}\) \{[\s\S]*?\r?\n\}\r?\n\r?\nfunction LocationFilter/,
    String.raw`function AccountIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 5h3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 5l-4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrashIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6l1 15h10l1-15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon({ className = "h-4 w-4", filled = false }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path d="M14.5 3.5l6 6-3.2 1.3-3.6 3.6.4 4.2-2 2-4.7-4.7-4.9 4.9-1.4-1.4 4.9-4.9-4.7-4.7 2-2 4.2.4 3.6-3.6 1.4-3.1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatRow({ chat, activeChatId, onOpenChat, onTogglePin, onDeleteChat }) {
  const rowClass = chat.id === activeChatId ? "bg-orange-50" : "hover:bg-[#001B47]/5";
  return (
    <div className={"flex items-center gap-2 rounded-2xl px-3 py-3 " + rowClass}>
      <button type="button" onClick={() => onOpenChat(chat.id)} className="min-w-0 flex-1 cursor-pointer truncate text-left text-base font-bold text-[#001B47]">
        {chat.title}
      </button>
      <IconButton label={chat.pinned ? copy.unpinChat : copy.pinChat} onClick={() => onTogglePin(chat.id)} className={"flex h-8 w-8 items-center justify-center rounded-full hover:bg-orange-50 " + (chat.pinned ? "text-orange-500" : "text-[#001B47]/45 hover:text-orange-500")}>
        <PinIcon className="h-4 w-4" filled={chat.pinned} />
      </IconButton>
      <IconButton label={copy.deleteChat} onClick={() => onDeleteChat(chat.id)} className="flex h-9 w-9 items-center justify-center rounded-full text-rose-500 hover:bg-rose-50">
        <TrashIcon />
      </IconButton>
    </div>
  );
}

function AskAccountAvatar({ account, className, alt = "" }) {
  const imageRef = String(account?.imageRef || "").trim();
  const image = String(account?.image || "").trim();
  const [resolvedImage, setResolvedImage] = useState("");
  const [isBroken, setIsBroken] = useState(false);
  const avatarRef = useRef(null);
  useEffect(() => {
    let cancelled = false;
    setIsBroken(false);
    setResolvedImage("");
    if (imageRef && window.emyResolveFeedMedia) {
      window.emyResolveFeedMedia(imageRef).then((record) => {
        if (!cancelled && record && record.url) setResolvedImage(record.url);
      }).catch(() => {});
    }
    return () => { cancelled = true; };
  }, [imageRef, image]);
  const safeDirectImage = /^(data:image\/|blob:|https?:\/\/|\/|\.\/|\.\.\/|assets\/)/i.test(image) ? image : "";
  const displayImage = resolvedImage || (safeDirectImage && (!imageRef || !window.emyResolveFeedMedia || /^(data:image\/|blob:)/i.test(safeDirectImage)) ? safeDirectImage : "");
  useEffect(() => {
    if (!isBroken && displayImage && imageRef && avatarRef.current && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(avatarRef.current);
  }, [imageRef, displayImage, isBroken]);
  const label = alt || account?.name || "";
  const initial = String(account?.name || account?.email || "S").trim().charAt(0).toUpperCase() || "S";
  if (!displayImage || isBroken) {
    return <span role="img" aria-label={label} className={(className || "") + " inline-flex items-center justify-center bg-orange-50 text-[#001B47] font-black"}>{initial}</span>;
  }
  return <img ref={avatarRef} src={displayImage} data-emy-media-ref={imageRef || undefined} alt="" aria-label={label} onError={() => setIsBroken(true)} className={className} />;
}

function UserProfileCard({ user, compact = false, onLogout, onAccount, onSwitchAccount }) {
  const activeRole = activeAskAccountRole();
  const otherRole = activeRole === "business" ? "customer" : "business";
  const otherAccount = readEmyAskAccountOptions().find((account) => account.role === otherRole);
  const switchLabel = otherRole === "business" ? "Switch to Business" : "Switch to Customer";

  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-[#001B47]/8 bg-white px-3 py-2 shadow-sm">
        <AskAccountAvatar account={user} className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-100" />
        <div className="hidden min-w-0 text-left sm:block">
          <p className="truncate text-sm font-black text-[#001B47]">{user.name}</p>
          <p className="truncate text-xs font-semibold text-[#001B47]/45">{user.email}</p>
        </div>
        <IconButton label={copy.viewProfile} onClick={onAccount} className="flex h-9 w-9 items-center justify-center rounded-full text-[#001B47]/55 hover:bg-orange-50 hover:text-orange-600">
          <AccountIcon />
        </IconButton>
        <IconButton label={copy.logout} onClick={onLogout} className="flex h-9 w-9 items-center justify-center rounded-full text-[#001B47]/55 hover:bg-orange-50 hover:text-orange-600">
          <LogoutIcon />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="rounded-[1.4rem] border border-orange-100 bg-[#fff8ef] p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">{copy.signedInAs}</p>
      <div className="mt-3 flex items-center gap-3">
        <AskAccountAvatar account={user} className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-100" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-black text-[#001B47]">{user.name}</p>
          <p className="truncate text-xs font-semibold text-[#001B47]/50">{user.email}</p>
        </div>
      </div>
      {otherAccount && (
        <button type="button" onClick={() => onSwitchAccount && onSwitchAccount(otherRole)} className="mt-4 flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-[#001B47]/8 bg-white px-3 py-3 text-left shadow-sm transition hover:border-orange-200 hover:bg-orange-50">
          <AskAccountAvatar account={otherAccount} className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-100" />
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-orange-500">{switchLabel}</span>
            <span className="block truncate text-sm font-black text-[#001B47]">{otherAccount.name}</span>
            <span className="block truncate text-xs font-semibold text-[#001B47]/45">{otherAccount.email}</span>
          </span>
        </button>
      )}
      <div className="mt-4 grid grid-cols-1 gap-2">
        <button type="button" onClick={onAccount} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#001B47] shadow-sm hover:bg-orange-50 hover:text-orange-600">
          <AccountIcon className="h-4 w-4" />
          {copy.viewProfile}
        </button>
        <button type="button" onClick={onLogout} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#001B47] shadow-sm hover:bg-orange-50 hover:text-orange-600">
          <LogoutIcon className="h-4 w-4" />
          {copy.logout}
        </button>
      </div>
    </div>
  );
}

function LoggedInMenu({ isOpen, onClose, isPinned, onTogglePinned, chats, activeChatId, onNewChat, onOpenChat, onDeleteChat, onTogglePin, user, onLogout, onAccount, onSwitchAccount }) {
  const [isSearching, setIsSearching] = useState(false);
  const [chatSearch, setChatSearch] = useState("");

  if (!isOpen || !user) return null;

  const searchTerm = chatSearch.toLowerCase().trim();
  const filteredChats = chats.filter((chat) => chat.title.toLowerCase().includes(searchTerm));
  const pinnedChats = filteredChats.filter((chat) => chat.pinned);
  const recentChats = filteredChats.filter((chat) => !chat.pinned);

  const toggleSearch = () => {
    if (isSearching) setChatSearch("");
    setIsSearching((open) => !open);
  };

  return (
    <aside role="complementary" aria-label="Ask EMY sidebar" className="fixed right-0 top-0 z-[90] h-full w-[min(100vw,336px)] overflow-hidden border-l border-orange-100 bg-white text-[#001B47] shadow-2xl">
      <div className="flex items-center justify-between border-b border-orange-100 bg-[#fff8ef]/80 px-6 py-6">
        <img src={emyLogo} alt="EMY" className="h-11 w-auto object-contain" />
        <div className="flex items-center gap-2">
          <IconButton label={isPinned ? copy.unpinSidebar : copy.pinSidebar} onClick={onTogglePinned} className={"flex h-9 w-9 items-center justify-center rounded-xl hover:bg-orange-50 " + (isPinned ? "bg-orange-50 text-orange-500" : "text-[#001B47] hover:text-orange-600")}>
            <PinIcon className="h-4 w-4" filled={isPinned} />
          </IconButton>
          {!isPinned && (
            <IconButton label={copy.closeSidebar} onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl text-[#001B47] hover:bg-orange-50 hover:text-orange-600">
              <MenuIcon className="h-5 w-5" />
            </IconButton>
          )}
        </div>
      </div>

      <div className="h-[calc(100%-93px)] overflow-y-auto p-6">
        <UserProfileCard user={user} onLogout={onLogout} onAccount={onAccount} onSwitchAccount={onSwitchAccount} />

        <div className="mt-5" />
        <button type="button" onClick={onNewChat} className="flex w-full cursor-pointer items-center gap-1 rounded-2xl px-3 py-3 text-left text-base font-bold text-[#001B47] hover:bg-orange-50 hover:text-orange-600">
          <span className="text-lg font-black leading-none text-[#001B47]">+</span>
          <span>{copy.newChat}</span>
        </button>

        <IconButton label={isSearching ? copy.closeSearch : copy.searchChats} onClick={toggleSearch} className={"mt-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-base font-bold " + (isSearching ? "bg-orange-50 text-orange-600" : "text-[#001B47] hover:bg-orange-50 hover:text-orange-600")}>
          <SearchIcon className="h-5 w-5 text-orange-500" />
          <span>{isSearching ? copy.closeSearch : copy.searchChats}</span>
        </IconButton>

        {isSearching && (
          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[#001B47]/10 bg-[#fff8ef] px-4 py-3">
            <SearchIcon className="h-4 w-4 shrink-0 text-orange-500" />
            <input value={chatSearch} onChange={(event) => setChatSearch(event.target.value)} autoFocus placeholder={copy.searchRecentChats} className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#001B47] outline-none placeholder:text-[#001B47]/35" />
            <IconButton label={copy.closeSearch} onClick={() => { setIsSearching(false); setChatSearch(""); }} className="flex h-7 w-7 items-center justify-center rounded-full text-[#001B47]/45 hover:bg-white hover:text-orange-600">x</IconButton>
          </div>
        )}

        {chats.length === 0 && <p className="mt-8 text-sm font-semibold text-[#001B47]/40">{copy.noRecent}</p>}
        {chats.length > 0 && filteredChats.length === 0 && <p className="mt-8 text-sm font-semibold text-[#001B47]/40">{copy.noChatsFound}</p>}

        {pinnedChats.length > 0 && (
          <section>
            <h2 className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-[#001B47]/40">{copy.pinnedChats}</h2>
            <div className="mt-4 space-y-2">
              {pinnedChats.map((chat) => (
                <ChatRow key={chat.id} chat={chat} activeChatId={activeChatId} onOpenChat={onOpenChat} onTogglePin={onTogglePin} onDeleteChat={onDeleteChat} />
              ))}
            </div>
          </section>
        )}

        {recentChats.length > 0 && (
          <section>
            <h2 className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-[#001B47]/40">{copy.recentChats}</h2>
            <div className="mt-4 space-y-2">
              {recentChats.map((chat) => (
                <ChatRow key={chat.id} chat={chat} activeChatId={activeChatId} onOpenChat={onOpenChat} onTogglePin={onTogglePin} onDeleteChat={onDeleteChat} />
              ))}
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}

function LocationFilter`
  );
  code = code.replace(
    /  const currentUser = \{\r?\n    name: "Isaac Stephane",\r?\n    email: "isaac@emy\.com",\r?\n    image: "https:\/\/images\.unsplash\.com\/photo-1500648767791-00dcc994a43e\?auto=format&fit=crop&w=240&q=80",\r?\n  \};/,
    '  const currentUser = readStoredAskUser();\n  useEffect(() => { if (!currentUser) window.location.replace(askHomeUrl(location, radius)); }, [currentUser, location, radius]);'
  );
  code = code.replace(
    /  const logout = \(\) => \{\r?\n    alert\("You have signed out of Ask EMY\. In the full app this will end the EMY account session\."\);\r?\n    setIsClosed\(true\);\r?\n  \};/,
    '  const logout = () => {\n    clearStoredAskUser();\n    window.location.replace(askHomeUrl(location, radius));\n  };'
  );
  if (page.output === 'ask-emy-results.html') {
    code = code.replace(
      /const mockBusinesses = \[[\s\S]*?\];/,
      'const mockBusinesses = [];'
    );
    code = code.replace(
      'signedInAs: "Signed in as",',
      'signedInAs: "Signed in as",\n  logIn: "Sign In",\n  signUp: "Sign up",\n  logIntoAccount: "Sign in to your account",\n  signInMessage: "To use Ask EMY, you need to sign in with your EMY account details.",\n  loginWithEmy: "Sign in with EMY account details",\n  welcomeBack: "Welcome back! Please enter your details",\n  noAccount: "Don\'t have an account?",\n  alreadyAccount: "Already have an account?",\n  switchToSignUp: "Sign up",\n  switchToLogin: "Sign In",\n  signUpTitle: "Create your EMY account",\n  signUpMessage: "To use Ask EMY, you need an EMY account first. Create your account on EMY, then come back and sign in with your EMY details.",\n  createAccountOnEmy: "Create account on EMY",\n  selectRole: "Select your role",\n  customer: "Customer",\n  business: "Business",\n  enjoyLife: "And enjoy life during the time you just saved!",\n  firstName: "First Name",\n  lastName: "Last Name",\n  email: "Email",\n  password: "Password",\n  mobileNumber: "Mobile Number",\n  confirmPassword: "Confirm Password",\n  agreeTerms: "Yes! I Agree all Teams & Condition",\n  rememberMe: "Remember me",\n  forgotPassword: "Forgot Password?",'
    );
    code = code.replace(
      /function ResultCard\(\{ result \}\) \{[\s\S]*?\r?\n\}\r?\n\r?\nfunction makeReply/,
      String.raw`function resultOpenLabel(type) {
  const clean = String(type || "").toLowerCase();
  if (clean === "product") return "View product";
  if (clean === "job") return "View job";
  if (clean === "event") return "View event";
  if (clean === "clip") return "Watch clip";
  if (clean === "post" || clean === "article") return "View post";
  if (clean === "service") return "View service";
  if (clean === "profile" || clean === "customer-profile" || clean === "business-profile") return "Open profile";
  if (clean === "map" || clean === "directions") return "Open EMY map";
  return "Open";
}

function resultMetaItems(result) {
  const items = [];
  const type = String(result.type || "").toLowerCase();
  const add = (value) => {
    const text = String(value || "").trim();
    if (text && !items.some((item) => item.toLowerCase() === text.toLowerCase())) items.push(text);
  };
  if (type !== "product" && result.business && result.business !== result.name) add(result.business);
  add(result.category);
  add(result.place);
  add(result.availability);
  if (type !== "product") add(formatAskProductDate(result.date));
  if (type !== "product") add(result.mediaType);
  return items.slice(0, 4);
}

function formatAskProductDate(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  const day = date.getDate();
  const month = date.toLocaleString(undefined, { month: "short" });
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return day + " " + month + " at " + hours + ":" + minutes;
}

function askProductNearbyLabel(result) {
  const place = String(result.place || result.location || "").trim();
  if (!place || /^near\s*me$/i.test(place)) return "Nearby";
  return place;
}

function askProductAvailabilityLabel(result) {
  const text = String(result.availability || "").trim();
  return text || "In stock";
}

function askResultSlug(value, fallback = "") {
  return String(value || fallback || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function askCanonicalResultUrl(result) {
  const row = result || {};
  const type = String(row.type || "").toLowerCase();
  const title = String(row.name || row.title || row.jobTitle || row.productName || row.business || "").trim();
  const business = askResultSlug(row.businessKey || row.profileKey || row.ownerKey || row.sellerKey || row.business || row.businessName || row.ownerName || row.sellerName || row.profileName || "", "profile");
  const query = encodeURIComponent(title);
  const item = encodeURIComponent(String(row.id || row.itemId || row.feedId || row.productId || row.jobId || row.eventId || row.clipId || row.reelId || row.postId || row.articleId || title || "").trim());
  if (!query && !item) return "";
  if (type === "product") return "emy-business-profile.html?business=" + encodeURIComponent(business) + "&tab=products&open=product&item=" + item + "&title=" + query;
  if (type === "job") return "emy-business-profile.html?business=" + encodeURIComponent(business) + "&tab=posts&open=job&item=" + item + "&title=" + query;
  if (type === "event") return "emy-business-profile.html?business=" + encodeURIComponent(business) + "&tab=posts&open=event&item=" + item + "&title=" + query;
  if (type === "clip" || type === "reel") return "emy-business-profile.html?business=" + encodeURIComponent(business) + "&tab=reels&open=clip&item=" + item + "&title=" + query;
  if (type === "post" || type === "article") return "emy-business-profile.html?business=" + encodeURIComponent(business) + "&tab=posts&open=" + (type === "article" ? "article" : "post") + "&item=" + item + "&title=" + query;
  return "";
}

function askResultUrl(result) {
  const explicit = String((result && (result.url || result.mapUrl || result.directionsUrl)) || "").trim();
  const canonical = askCanonicalResultUrl(result);
  const type = String(result && result.type || "").toLowerCase();
  if (type === "clip" || type === "reel") return canonical || "#clip-viewer";
  if (canonical && ["product", "job", "event", "clip", "reel", "post", "article"].includes(type)) return canonical;
  return explicit || canonical;
}

function goToAskResultUrl(result) {
  const url = askResultUrl(result);
  if (!url) return;
  window.location.assign(url);
}

function askResultMediaIsVideo(value, mediaType = "") {
  const source = String(value || "").trim();
  const type = String(mediaType || "").toLowerCase();
  if (/\b(video|clip|reel)\b/.test(type)) return Boolean(source);
  return /\.(mp4|webm|mov|m4v)(?:[?#].*)?$/i.test(source) || /\/video\/upload\//i.test(source);
}

function askResultVisualConfig(type) {
  const clean = String(type || "business").toLowerCase();
  const configs = {
    job: {
      label: "Job",
      icon: "bg-[#EEF4FF] text-[#155EEF]",
      badge: "bg-[#EEF4FF] text-[#155EEF]",
      bar: "bg-[#155EEF]",
      chip: "bg-[#EEF4FF] text-[#344054]",
      cta: "bg-[#001B47] text-white hover:bg-[#062B63]",
    },
    service: {
      label: "Service",
      icon: "bg-[#ECFDF3] text-[#079455]",
      badge: "bg-[#ECFDF3] text-[#079455]",
      bar: "bg-[#12B76A]",
      chip: "bg-[#ECFDF3] text-[#344054]",
      cta: "bg-[#079455] text-white hover:bg-[#067647]",
    },
    business: {
      label: "Business",
      icon: "bg-orange-50 text-orange-600",
      badge: "bg-orange-50 text-orange-600",
      bar: "bg-orange-500",
      chip: "bg-[#FFF4E8] text-[#7A3D00]",
      cta: "bg-orange-500 text-white hover:bg-orange-600",
    },
    profile: {
      label: "Profile",
      icon: "bg-[#F0F9FF] text-[#026AA2]",
      badge: "bg-[#F0F9FF] text-[#026AA2]",
      bar: "bg-[#0BA5EC]",
      chip: "bg-[#F0F9FF] text-[#075985]",
      cta: "bg-[#026AA2] text-white hover:bg-[#075985]",
    },
    "customer-profile": {
      label: "Customer profile",
      icon: "bg-[#F0F9FF] text-[#026AA2]",
      badge: "bg-[#F0F9FF] text-[#026AA2]",
      bar: "bg-[#0BA5EC]",
      chip: "bg-[#F0F9FF] text-[#075985]",
      cta: "bg-[#026AA2] text-white hover:bg-[#075985]",
    },
    "business-profile": {
      label: "Business profile",
      icon: "bg-orange-50 text-orange-600",
      badge: "bg-orange-50 text-orange-600",
      bar: "bg-orange-500",
      chip: "bg-[#FFF4E8] text-[#7A3D00]",
      cta: "bg-orange-500 text-white hover:bg-orange-600",
    },
    map: {
      label: "EMY Map",
      icon: "bg-[#ECFDF3] text-[#079455]",
      badge: "bg-[#ECFDF3] text-[#067647]",
      bar: "bg-[#12B76A]",
      chip: "bg-[#ECFDF3] text-[#344054]",
      cta: "bg-[#079455] text-white hover:bg-[#067647]",
    },
    directions: {
      label: "EMY Map",
      icon: "bg-[#ECFDF3] text-[#079455]",
      badge: "bg-[#ECFDF3] text-[#067647]",
      bar: "bg-[#12B76A]",
      chip: "bg-[#ECFDF3] text-[#344054]",
      cta: "bg-[#079455] text-white hover:bg-[#067647]",
    },
    event: {
      label: "Event",
      icon: "bg-[#FDF2FA] text-[#C11574]",
      badge: "bg-[#FDF2FA] text-[#C11574]",
      bar: "bg-[#C11574]",
      chip: "bg-[#FDF2FA] text-[#6941C6]",
      cta: "bg-[#C11574] text-white hover:bg-[#9E165F]",
    },
    clip: {
      label: "Clip",
      icon: "bg-[#F4F3FF] text-[#6938EF]",
      badge: "bg-[#F4F3FF] text-[#6938EF]",
      bar: "bg-[#7A5AF8]",
      chip: "bg-[#F4F3FF] text-[#4A1FB8]",
      cta: "bg-[#6938EF] text-white hover:bg-[#5925DC]",
    },
    article: {
      label: "Post",
      icon: "bg-[#F0F9FF] text-[#026AA2]",
      badge: "bg-[#F0F9FF] text-[#026AA2]",
      bar: "bg-[#0BA5EC]",
      chip: "bg-[#F0F9FF] text-[#075985]",
      cta: "bg-[#026AA2] text-white hover:bg-[#075985]",
    },
    post: {
      label: "Post",
      icon: "bg-[#F0F9FF] text-[#026AA2]",
      badge: "bg-[#F0F9FF] text-[#026AA2]",
      bar: "bg-[#0BA5EC]",
      chip: "bg-[#F0F9FF] text-[#075985]",
      cta: "bg-[#026AA2] text-white hover:bg-[#075985]",
    },
  };
  if (clean === "reel") return configs.clip;
  return configs[clean] || configs.business;
}

function AskResultTypeGlyph({ type, className = "h-5 w-5" }) {
  const clean = String(type || "").toLowerCase();
  if (clean === "map" || clean === "directions") return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.1"><path d="M9 18.5 4.5 20V6L9 4.5l6 2L19.5 5v14L15 20.5l-6-2Z"/><path d="M9 4.5v14M15 6.5v14"/><path d="M6.8 9.2c1.4 1.6 2.8 2.3 4.2 2.1 1.7-.2 2.8-1.6 4.6-1.8"/></svg>;
  if (clean === "profile" || clean === "customer-profile" || clean === "business-profile") return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.1"><path d="M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M4.5 20c1.3-3.5 4-5.3 7.5-5.3s6.2 1.8 7.5 5.3"/></svg>;
  if (clean === "job") return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.1"><path d="M9 7V5.8C9 4.8 9.8 4 10.8 4h2.4C14.2 4 15 4.8 15 5.8V7"/><path d="M5 7h14v11.5A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5V7Z"/><path d="M5 12h14M10 12v1.5h4V12"/></svg>;
  if (clean === "service") return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.1"><path d="M12 3.5 19.5 7v5.2c0 4.4-3 7.2-7.5 8.3-4.5-1.1-7.5-3.9-7.5-8.3V7L12 3.5Z"/><path d="m8.7 12.2 2.1 2.1 4.5-4.7"/></svg>;
  if (clean === "event") return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.1"><path d="M6.5 5.5h11A2.5 2.5 0 0 1 20 8v10a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18V8a2.5 2.5 0 0 1 2.5-2.5Z"/><path d="M8 3.5v4M16 3.5v4M4 10h16"/><path d="M8 14h3M14 14h2M8 17h2"/></svg>;
  if (clean === "clip" || clean === "reel") return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.1"><path d="M6 5.5h12A2.5 2.5 0 0 1 20.5 8v8A2.5 2.5 0 0 1 18 18.5H6A2.5 2.5 0 0 1 3.5 16V8A2.5 2.5 0 0 1 6 5.5Z"/><path d="m10 9 5 3-5 3V9Z"/></svg>;
  if (clean === "post" || clean === "article") return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.1"><path d="M6.5 4.5h11A2.5 2.5 0 0 1 20 7v10a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17V7a2.5 2.5 0 0 1 2.5-2.5Z"/><path d="M8 9h8M8 12h8M8 15h5"/></svg>;
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.1"><path d="M4.5 20V8.5L12 4l7.5 4.5V20"/><path d="M9 20v-6h6v6M7.5 10.5h9"/></svg>;
}

function askResultSafeMediaSource(value) {
  const source = String(value || "").trim();
  return /^(data:image\/|blob:|https?:\/\/|\/|\.\/|\.\.\/|assets\/)/i.test(source) ? source : "";
}

function askResultDirectVideoSource(result) {
  const mediaType = result?.mediaType || result?.contentType || result?.kind || "";
  const candidates = [
    result?.video,
    result?.videoUrl,
    result?.videoSrc,
    result?.clipUrl,
    result?.clipSrc,
    result?.mediaSrc,
    result?.detailMediaSrc,
    result?.image,
    result?.imageUrl,
    result?.imageSrc,
  ];
  for (const value of candidates) {
    const source = askResultSafeMediaSource(value);
    if (source && askResultMediaIsVideo(source, mediaType)) return source;
  }
  return "";
}

function askResultDirectImageSource(result) {
  const mediaType = result?.mediaType || result?.contentType || result?.kind || "";
  const candidates = [
    result?.poster,
    result?.posterSrc,
    result?.thumbnail,
    result?.thumbnailSrc,
    result?.coverImage,
    result?.coverImageUrl,
    result?.profileImage,
    result?.profileImageUrl,
    result?.image,
    result?.imageUrl,
    result?.imageSrc,
    result?.mediaSrc,
    result?.detailMediaSrc,
  ];
  for (const value of candidates) {
    const source = askResultSafeMediaSource(value);
    if (source && !askResultMediaIsVideo(source, mediaType)) return source;
  }
  return "";
}

function askResultHasMedia(result) {
  return Boolean(
    askResultDirectVideoSource(result) ||
    askResultDirectImageSource(result) ||
    String(result?.mediaRef || result?.imageRef || result?.videoRef || result?.posterRef || result?.thumbnailRef || "").trim()
  );
}

function askResultCountValue() {
  for (let index = 0; index < arguments.length; index += 1) {
    const value = arguments[index];
    if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, value);
    const text = String(value == null ? "" : value).replace(/,/g, "").trim();
    if (/^\d+(?:\.\d+)?$/.test(text)) return Math.max(0, Number(text) || 0);
  }
  return 0;
}

function askResultStatLabel(value, singular, plural) {
  const count = askResultCountValue(value);
  return count.toLocaleString() + " " + (count === 1 ? singular : plural);
}

function askResultBusinessStatus(result) {
  const rawStatus = String(result?.openStatus || result?.statusText || result?.businessStatus || result?.status || result?.availability || "").trim();
  const hours = String(result?.openStatusDetail || result?.openingHours || result?.businessHours || result?.hours || result?.workingHours || result?.workingDays || result?.openingTimes || "").trim();
  const statusText = rawStatus.toLowerCase();
  const hoursText = hours.toLowerCase();
  let label = "";
  if (/\b(closed|offline|paused|pause|unavailable)\b/.test(statusText)) label = "Closed";
  else if (/\b(open now|opened|open|available|live|online)\b/.test(statusText)) label = /open now/.test(statusText) ? "Open now" : "Open";
  else if (/\bclosed now\b/.test(hoursText)) label = "Closed now";
  else if (/\bopen now\b/.test(hoursText)) label = "Open now";
  else if (/\bclosed\b/.test(hoursText) && !/\bopen\b/.test(hoursText)) label = "Closed";
  else if (hours) label = "Hours listed";
  else label = "Hours not set";
  const cleanLabel = label || "Hours not set";
  const lower = cleanLabel.toLowerCase();
  const className = lower.includes("open")
    ? "bg-[#ECFDF3] text-[#067647] ring-[#ABEFC6]"
    : lower.includes("closed")
      ? "bg-[#FEF3F2] text-[#B42318] ring-[#FECDCA]"
      : "bg-[#F2F4F7] text-[#667085] ring-[#E4E7EC]";
  return { label: cleanLabel, detail: hours, className };
}

function AskOwnerBadge({ result, compact = false }) {
  if (!result) return null;
  const badges = [];
  if (result.isOwnedByViewer) badges.push({ label: "Your business", className: "bg-[#001B47] text-white" });
  if (result.isCustomerOfViewer) badges.push({ label: "You're a customer", className: "bg-[#ECFDF3] text-[#067647]" });
  if (result.isFollowedByViewer) badges.push({ label: "Following", className: "bg-orange-50 text-orange-600" });
  if (!badges.length) return null;
  return (
    <span className="flex flex-wrap gap-1.5">
      {badges.map((badge) => (
        <span key={badge.label} className={(compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]") + " inline-flex w-fit items-center rounded-full font-black uppercase tracking-normal shadow-sm " + badge.className}>
          {badge.label}
        </span>
      ))}
    </span>
  );
}

function AskProductSigns({ result }) {
  if (!result) return null;
  const signs = [];
  if (result.isOwnedByViewer) signs.push({ label: "Own", className: "bg-[#001B47] text-white" });
  if (result.isCustomerOfViewer) signs.push({ label: "Cust", className: "bg-[#ECFDF3] text-[#067647]" });
  if (result.isFollowedByViewer) signs.push({ label: "Follow", className: "bg-orange-50 text-orange-600" });
  if (!signs.length) return null;
  return (
    <div className="flex min-h-[18px] flex-wrap gap-1">
      {signs.slice(0, 3).map((sign) => (
        <span key={sign.label} className={"inline-flex h-[18px] items-center rounded-full px-1.5 text-[9px] font-black uppercase leading-none shadow-sm " + sign.className}>
          {sign.label}
        </span>
      ))}
    </div>
  );
}

function AskMiniStatIcon({ type, className = "h-3.5 w-3.5" }) {
  if (type === "save") {
    return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M7 4.5h10v15l-5-3-5 3v-15Z" /></svg>;
  }
  if (type === "view") {
    return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M2.8 12s3.4-5.8 9.2-5.8S21.2 12 21.2 12s-3.4 5.8-9.2 5.8S2.8 12 2.8 12Z" /><circle cx="12" cy="12" r="2.4" /></svg>;
  }
  if (type === "comment") {
    return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6A2.5 2.5 0 0 1 16.5 15H11l-4 4v-4A2 2 0 0 1 5 13V6.5Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M20.2 8.4c0 5.1-8.2 10.2-8.2 10.2S3.8 13.5 3.8 8.4A4.1 4.1 0 0 1 12 6.8a4.1 4.1 0 0 1 8.2 1.6Z" /></svg>;
}

function AskResultInlineMedia({ result, label = "Media", controls = false, alwaysShow = false, fit = "cover", onVideoPlay, onVideoPause }) {
  const directVideo = askResultDirectVideoSource(result);
  const directImage = askResultDirectImageSource(result);
  const mediaRef = String(result?.mediaRef || result?.imageRef || result?.videoRef || "").trim();
  const posterRef = String(result?.posterRef || result?.thumbnailRef || result?.videoPosterRef || "").trim();
  const [resolved, setResolved] = useState({ video: "", image: "", poster: "" });
  const [isBroken, setIsBroken] = useState(false);
  const mediaNodeRef = useRef(null);
  useEffect(() => {
    let cancelled = false;
    setIsBroken(false);
    setResolved({ video: "", image: "", poster: "" });
    const resolveRef = (ref, kind) => {
      if (!ref || !window.emyResolveFeedMedia) return;
      window.emyResolveFeedMedia(ref).then((record) => {
        if (cancelled || !record) return;
        const recordType = record.mediaType || record.type || record.resourceType || record.contentType || "";
        const rawUrl = record.video || record.videoUrl || record.videoSrc || record.url || record.src || record.mediaSrc || record.image || record.imageUrl || record.posterSrc || record.thumbnailSrc || "";
        const url = askResultSafeMediaSource(rawUrl);
        if (!url) return;
        setResolved((current) => {
          if (kind === "poster") return Object.assign({}, current, { poster: url });
          if (askResultMediaIsVideo(url, recordType || result?.mediaType)) return Object.assign({}, current, { video: url });
          return Object.assign({}, current, { image: url });
        });
      }).catch(() => {});
    };
    if (!directVideo && !directImage) resolveRef(mediaRef, "media");
    if (!directImage) resolveRef(posterRef, "poster");
    return () => { cancelled = true; };
  }, [directVideo, directImage, mediaRef, posterRef, result?.mediaType]);
  const videoSrc = directVideo || resolved.video;
  const imageSrc = resolved.poster || directImage || resolved.image;
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  useEffect(() => {
    if (!isBroken && mediaRef && mediaNodeRef.current && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(mediaNodeRef.current);
  }, [mediaRef, videoSrc, imageSrc, isBroken]);
  if (videoSrc && !isBroken) {
    return (
      <video
        ref={mediaNodeRef}
        src={videoSrc}
        data-emy-media-ref={!directVideo && mediaRef ? mediaRef : undefined}
        poster={imageSrc || undefined}
        controls={controls ? true : undefined}
        muted={controls ? undefined : true}
        playsInline
        preload="metadata"
        onPlay={() => { if (typeof onVideoPlay === "function") onVideoPlay(); }}
        onPlaying={() => { if (typeof onVideoPlay === "function") onVideoPlay(); }}
        onPause={() => { if (typeof onVideoPause === "function") onVideoPause(); }}
        onEnded={() => { if (typeof onVideoPause === "function") onVideoPause(); }}
        onError={() => setIsBroken(true)}
        className={"absolute inset-0 h-full w-full bg-black " + fitClass}
      />
    );
  }
  if (imageSrc && !isBroken) {
    return <img ref={mediaNodeRef} src={imageSrc} data-emy-media-ref={!directImage && mediaRef ? mediaRef : undefined} alt={label} onError={() => setIsBroken(true)} className={"absolute inset-0 h-full w-full transition duration-300 group-hover:scale-[1.03] " + fitClass} />;
  }
  if (!alwaysShow) return null;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_20%_20%,rgba(122,90,248,.18),transparent_34%),linear-gradient(135deg,#F4F3FF_0%,#F8FAFC_52%,#EEF4FF_100%)] px-4 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-[#6938EF] shadow-sm">
        <AskResultTypeGlyph type={result?.type || "clip"} className="h-6 w-6" />
      </span>
      <span className="max-w-full rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#667085]">{label}</span>
    </div>
  );
}

function AskProductMedia({ result }) {
  const directImage = askResultSafeMediaSource(result.image || result.imageUrl || result.imageSrc || result.mediaSrc || result.detailMediaSrc || result.thumbnailSrc || result.posterSrc);
  const imageRef = String(result.imageRef || result.mediaRef || "").trim();
  const [resolvedImage, setResolvedImage] = useState("");
  const [isBroken, setIsBroken] = useState(false);
  const imageNodeRef = useRef(null);
  useEffect(() => {
    let cancelled = false;
    setIsBroken(false);
    setResolvedImage("");
    if (!directImage && imageRef && window.emyResolveFeedMedia) {
      window.emyResolveFeedMedia(imageRef).then((record) => {
        const url = record && (record.url || record.src || record.mediaSrc || record.image || record.imageUrl);
        if (!cancelled && url) setResolvedImage(String(url || ""));
      }).catch(() => {});
    }
    return () => { cancelled = true; };
  }, [directImage, imageRef]);
  const displayImage = resolvedImage || directImage;
  useEffect(() => {
    if (!isBroken && displayImage && imageRef && imageNodeRef.current && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(imageNodeRef.current);
  }, [imageRef, displayImage, isBroken]);
  if (displayImage && !isBroken) {
    return <img ref={imageNodeRef} src={displayImage} data-emy-media-ref={imageRef || undefined} alt={result.name} onError={() => setIsBroken(true)} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />;
  }
  const label = String(result.category || result.business || "Product").trim();
  const initial = String(result.name || label || "P").trim().charAt(0).toUpperCase() || "P";
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_18%_18%,rgba(255,106,0,.18),transparent_34%),linear-gradient(135deg,#FFF7ED_0%,#F3F6FB_55%,#EAF2FF_100%)] px-4 text-center">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-lg font-black text-orange-500 shadow-sm">{initial}</span>
      <span className="max-w-full truncate rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#667085]">{label}</span>
    </div>
  );
}

function askSetNativeDetailData(card, key, value) {
  const text = String(value == null ? "" : value).trim();
  if (!text) return;
  card.dataset[key] = text;
}

function askNativeDetailMediaItems(result, preferredType) {
  const items = [];
  const sourceItems = Array.isArray(result?.mediaItems) ? result.mediaItems : [];
  sourceItems.forEach((item) => {
    if (!item || typeof item !== "object") return;
    const type = String(item.type || item.mediaType || item.contentType || preferredType || "").toLowerCase();
    const src = askResultSafeMediaSource(item.src || item.url || item.mediaSrc || item.image || item.imageUrl || item.video || item.videoUrl || "");
    const ref = String(item.ref || item.mediaRef || item.imageRef || item.videoRef || "").trim();
    const posterSrc = askResultSafeMediaSource(item.posterSrc || item.poster || item.thumbnailSrc || item.thumbnail || "");
    const posterRef = String(item.posterRef || item.videoPosterRef || item.thumbnailRef || "").trim();
    if (src || ref || posterSrc || posterRef) items.push({ type: type.includes("video") || type.includes("clip") || type.includes("reel") ? "video" : "image", src, ref, posterSrc, posterRef });
  });
  const directVideo = askResultDirectVideoSource(result);
  const directImage = askResultDirectImageSource(result);
  const mediaType = String(result?.mediaType || preferredType || "").toLowerCase();
  const mediaRef = String(result?.mediaRef || result?.videoRef || result?.imageRef || "").trim();
  const imageRef = String(result?.imageRef || result?.photoRef || "").trim();
  const posterRef = String(result?.posterRef || result?.videoPosterRef || result?.thumbnailRef || "").trim();
  const posterSrc = askResultSafeMediaSource(result?.posterSrc || result?.poster || result?.thumbnailSrc || result?.thumbnail || "");
  if ((directVideo || (mediaRef && /video|clip|reel/.test(mediaType))) && !items.some((item) => item.type === "video" && (item.src === directVideo || item.ref === mediaRef))) {
    items.push({ type: "video", src: directVideo, ref: mediaRef, posterSrc, posterRef });
  }
  if ((directImage || imageRef || (mediaRef && !/video|clip|reel/.test(mediaType))) && !items.some((item) => item.type === "image" && (item.src === directImage || item.ref === (imageRef || mediaRef)))) {
    items.push({ type: "image", src: directImage, ref: imageRef || (!/video|clip|reel/.test(mediaType) ? mediaRef : ""), posterSrc: "", posterRef: "" });
  }
  return items.filter((item) => item.src || item.ref || item.posterSrc || item.posterRef);
}

function askCreateNativeDetailCard(result, detailType) {
  if (typeof document === "undefined") return null;
  const type = String(detailType || result?.type || "product").toLowerCase();
  const isClip = type === "clip" || type === "reel";
  const isJob = type === "job";
  const card = document.createElement("article");
  card.className = isClip
    ? "card reel-card feed-clip-card is-clip"
    : isJob
      ? "feed-card social-feed-card social-feed-job-card is-job"
      : "card product-card feed-product-card is-product";
  card.setAttribute("data-card", "");
  card.setAttribute("data-open-item-detail", "");
  card.setAttribute("data-ask-native-detail-card", "true");
  if (isClip) card.setAttribute("data-clip-open-mode", "single");
  const title = String(result?.productName || result?.productTitle || result?.jobTitle || result?.name || result?.title || result?.business || (isClip ? "Clip" : isJob ? "Help wanted" : "Product")).trim();
  const business = String(result?.business || result?.businessName || result?.ownerName || "").trim();
  const mediaType = String(result?.mediaType || (isClip ? "video" : "image")).toLowerCase();
  const directVideo = askResultDirectVideoSource(result);
  const directImage = askResultDirectImageSource(result);
  const mediaRef = String(result?.mediaRef || result?.videoRef || result?.imageRef || "").trim();
  const posterSrc = askResultSafeMediaSource(result?.posterSrc || result?.poster || result?.thumbnailSrc || result?.thumbnail || "");
  const posterRef = String(result?.posterRef || result?.videoPosterRef || result?.thumbnailRef || "").trim();
  const mediaItems = askNativeDetailMediaItems(result, mediaType);
  askSetNativeDetailData(card, "detailKind", isClip ? "Clip" : isJob ? "Job" : "Product");
  askSetNativeDetailData(card, "detailTitle", title);
  askSetNativeDetailData(card, "detailDescription", result?.desc || result?.description || (isJob && business ? business + " is hiring." : title));
  askSetNativeDetailData(card, "detailBusiness", business);
  askSetNativeDetailData(card, "detailPrice", isClip ? result?.price || "" : result?.price || result?.priceText || "");
  askSetNativeDetailData(card, "detailBusinessKey", result?.businessKey || result?.profileKey || result?.ownerKey || "");
  askSetNativeDetailData(card, "businessKey", result?.businessKey || result?.profileKey || result?.ownerKey || "");
  askSetNativeDetailData(card, "feedId", result?.feedId || result?.id || result?.itemId || "");
  askSetNativeDetailData(card, "itemId", result?.itemId || result?.id || "");
  askSetNativeDetailData(card, "jobId", result?.jobId || result?.feedId || result?.itemId || result?.id || "");
  askSetNativeDetailData(card, "productId", result?.productId || result?.itemId || result?.id || "");
  askSetNativeDetailData(card, "businessProductId", result?.businessProductId || result?.productId || result?.itemId || result?.id || "");
  askSetNativeDetailData(card, "clipId", result?.clipId || result?.reelId || result?.feedId || result?.id || "");
  askSetNativeDetailData(card, "reelId", result?.reelId || result?.clipId || result?.feedId || result?.id || "");
  askSetNativeDetailData(card, "ownedJob", result?.isOwnedByViewer ? "true" : "");
  askSetNativeDetailData(card, "jobLocation", result?.jobLocation || result?.location || result?.place || "");
  askSetNativeDetailData(card, "jobWorkplace", result?.workplace || "");
  askSetNativeDetailData(card, "jobEmployment", result?.employment || "");
  askSetNativeDetailData(card, "jobExperience", result?.experience || "");
  askSetNativeDetailData(card, "jobApply", result?.apply || "");
  askSetNativeDetailData(card, "jobNotes", result?.notes || "");
  askSetNativeDetailData(card, "jobApplicants", result?.applicants || result?.applicantCount || "");
  askSetNativeDetailData(card, "productName", result?.productName || result?.productTitle || (!isClip ? title : ""));
  askSetNativeDetailData(card, "productTitle", result?.productName || result?.productTitle || (!isClip ? title : ""));
  askSetNativeDetailData(card, "productDescription", result?.desc || result?.description || "");
  askSetNativeDetailData(card, "productCategory", result?.category || "");
  askSetNativeDetailData(card, "productAvailability", result?.availability || "");
  askSetNativeDetailData(card, "detailMeta", isJob
    ? [result?.jobLocation || result?.location || result?.place || "Location to confirm", result?.workplace || "On-site", result?.employment || "Flexible", result?.date].filter(Boolean).join("|")
    : [result?.category, result?.availability, result?.place, result?.date].filter(Boolean).join("|"));
  askSetNativeDetailData(card, "detailMedia", isClip ? "reel" : "feed");
  askSetNativeDetailData(card, "detailMediaSrc", isClip ? directVideo : directImage);
  askSetNativeDetailData(card, "detailMediaRef", mediaRef);
  askSetNativeDetailData(card, "detailMediaType", mediaType || (isClip ? "video" : "image"));
  askSetNativeDetailData(card, "detailPosterSrc", posterSrc);
  askSetNativeDetailData(card, "detailPosterRef", posterRef);
  askSetNativeDetailData(card, "detailAvatarSrc", result?.profileImage || result?.avatar || "");
  askSetNativeDetailData(card, "detailAvatarRef", result?.profileImageRef || result?.avatarRef || "");
  askSetNativeDetailData(card, "detailDuration", result?.duration || result?.videoDuration || "");
  if (mediaItems.length) card.dataset.detailMediaItems = JSON.stringify(mediaItems);
  let bucket = document.querySelector("[data-ask-native-detail-source]");
  if (!bucket) {
    bucket = document.createElement("div");
    bucket.setAttribute("data-ask-native-detail-source", "true");
    bucket.setAttribute("aria-hidden", "true");
    bucket.style.cssText = "position:fixed;left:-10000px;top:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;";
    document.body.appendChild(bucket);
  }
  bucket.appendChild(card);
  return card;
}

function askOpenNativeProductDetail(result) {
  if (typeof window === "undefined" || typeof window.emyOpenItemDetail !== "function") return false;
  askCloseResultOverlays();
  const card = askCreateNativeDetailCard(result, "product");
  return !!(card && window.emyOpenItemDetail(card) !== false);
}

function askOpenNativeJobDetail(result) {
  if (typeof window === "undefined" || typeof window.emyOpenItemDetail !== "function") return false;
  askCloseResultOverlays();
  const card = askCreateNativeDetailCard(result, "job");
  return !!(card && window.emyOpenItemDetail(card) !== false);
}

function askOpenNativeClipViewer(result) {
  if (typeof window === "undefined" || typeof window.emyOpenClipViewer !== "function") return false;
  askCloseResultOverlays();
  const card = askCreateNativeDetailCard(result, "clip");
  return !!(card && window.emyOpenClipViewer(card) !== false);
}

function askResultHasNativeDetailView(type) {
  const clean = String(type || "").toLowerCase();
  return clean === "product" || clean === "job" || clean === "clip" || clean === "reel";
}

function askOpenNativeResultDetail(result) {
  const type = String(result && result.type || "").toLowerCase();
  if (type === "product") return askOpenNativeProductDetail(result);
  if (type === "job") return askOpenNativeJobDetail(result);
  if (type === "clip" || type === "reel") return askOpenNativeClipViewer(result);
  return false;
}

function askStopOpenEvent(event) {
  if (!event) return;
  if (event.preventDefault) event.preventDefault();
  if (event.stopPropagation) event.stopPropagation();
  const nativeEvent = event.nativeEvent || event;
  if (nativeEvent && nativeEvent.stopImmediatePropagation) nativeEvent.stopImmediatePropagation();
}

function askOpenAfterCurrentClick(callback) {
  if (typeof window === "undefined") {
    callback();
    return;
  }
  window.__emyAskNativeOpenGuardUntil = Date.now() + 900;
  window.setTimeout(() => {
    callback();
    window.setTimeout(() => {
      if (window.__emyAskNativeOpenGuardUntil && Date.now() >= window.__emyAskNativeOpenGuardUntil) {
        delete window.__emyAskNativeOpenGuardUntil;
      }
    }, 950);
  }, 0);
}

const ASK_RESULT_OVERLAY_CLOSE_EVENT = "emy-ask-close-result-overlays";

function askCloseResultOverlays() {
  if (typeof window === "undefined" || typeof window.dispatchEvent !== "function") return;
  try {
    window.dispatchEvent(new CustomEvent(ASK_RESULT_OVERLAY_CLOSE_EVENT));
  } catch (error) {
    try {
      const event = document.createEvent("Event");
      event.initEvent(ASK_RESULT_OVERLAY_CLOSE_EVENT, true, true);
      window.dispatchEvent(event);
    } catch (nestedError) {}
  }
}

function AskOverlayPortal({ children }) {
  if (!children) return null;
  if (typeof document !== "undefined" && document.body && typeof ReactDOM !== "undefined" && ReactDOM.createPortal) {
    return ReactDOM.createPortal(children, document.body);
  }
  return <>{children}</>;
}

function AskProductMiniCard({ result }) {
  const clickable = Boolean(askResultUrl(result));
  const [choiceOpen, setChoiceOpen] = useState(false);
  useEffect(() => {
    const closeOverlays = () => {
      setChoiceOpen(false);
    };
    window.addEventListener(ASK_RESULT_OVERLAY_CLOSE_EVENT, closeOverlays);
    return () => window.removeEventListener(ASK_RESULT_OVERLAY_CLOSE_EVENT, closeOverlays);
  }, []);
  const likeCount = askResultCountValue(result.likeCount, result.likes);
  const savedCount = askResultCountValue(result.saveCount, result.saved);
  const viewCount = askResultCountValue(result.viewCount, result.views);
  const commentCount = askResultCountValue(result.commentCount, result.comments);
  const demandRank = askResultCountValue(result.demandRank);
  const demandSignal = String(result.demandSignal || "").trim();
  const demandBasis = String(result.demandBasis || "").trim().toLowerCase();
  const demandLabel = demandBasis.includes("purchase") ? "Sales signal" : demandSignal ? "Activity signal" : "";
  const availability = askProductAvailabilityLabel(result);
  const hasStock = !/\b(out|sold|unavailable|none)\b/i.test(availability);
  const openHere = () => {
    askCloseResultOverlays();
    setChoiceOpen(false);
    askOpenAfterCurrentClick(() => {
      askOpenNativeProductDetail(result);
    });
  };
  const goToLocation = () => {
    askCloseResultOverlays();
    setChoiceOpen(false);
    goToAskResultUrl(result);
  };
  const open = (event) => {
    askStopOpenEvent(event);
    askCloseResultOverlays();
    askOpenAfterCurrentClick(() => {
      askOpenNativeProductDetail(result);
    });
  };
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") open(event); }}
      aria-label={"Open product details " + (result.name || "product")}
      className={"group flex w-[176px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-[#001B47]/10 bg-white shadow-sm shadow-[#001B47]/5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/10 sm:w-[196px]"}
    >
      <div className="relative aspect-[1.08/1] overflow-hidden bg-[#EEF2F7]">
        <AskProductMedia result={result} />
        <div className="absolute left-2 top-2">
          <AskProductSigns result={result} />
        </div>
        {demandRank > 0 && (
          <span className="absolute right-2 top-2 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[#001B47] px-2 text-[11px] font-black text-white shadow-lg shadow-[#001B47]/20">
            #{demandRank}
          </span>
        )}
        {result.price && (
          <span className="absolute bottom-2 left-2 max-w-[calc(100%-16px)] truncate rounded-full bg-white/95 px-2.5 py-1 text-xs font-black text-[#D85A00] shadow-sm ring-1 ring-orange-100">
            {result.price}
          </span>
        )}
      </div>
      <div className="flex min-h-[104px] flex-1 flex-col px-2.5 py-2.5">
        <h4 className="line-clamp-2 text-[13px] font-black leading-[17px] text-[#001B47]">{result.name}</h4>
        <p className="mt-1 truncate text-[11px] font-bold text-[#667085]">{result.business || result.category || "EMY product"}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className={(hasStock ? "text-[#079455]" : "text-[#B42318]") + " inline-flex min-w-0 items-center gap-1 text-[11px] font-black"}>
            <span className={(hasStock ? "bg-[#12B76A]" : "bg-[#F04438]") + " h-2 w-2 shrink-0 rounded-full"} aria-hidden="true"></span>
            <span className="truncate">{availability}</span>
          </span>
          {result.category && <span className="max-w-[62px] truncate rounded-full bg-[#F3F6FB] px-2 py-0.5 text-[10px] font-black text-[#667085]">{result.category}</span>}
        </div>
        {demandLabel && (
          <div className="mt-2 rounded-lg bg-[#F8FAFC] px-2 py-1.5">
            <p className="text-[9px] font-black uppercase tracking-normal text-orange-600">{demandLabel}</p>
            <p className="truncate text-[11px] font-black text-[#001B47]" title={demandSignal}>{demandSignal || "Ranked product"}</p>
          </div>
        )}
        <div className="mt-auto flex items-center justify-between gap-1 pt-2 text-[10px] font-black text-[#667085]">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F8FAFC] px-2 py-1" title={askResultStatLabel(likeCount, "like", "likes")}>
            <AskMiniStatIcon type="like" />
            {likeCount}
          </span>
          {viewCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F8FAFC] px-2 py-1" title={askResultStatLabel(viewCount, "view", "views")}>
              <AskMiniStatIcon type="view" />
              {viewCount}
            </span>
          )}
          {commentCount > 0 && viewCount <= 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F8FAFC] px-2 py-1" title={askResultStatLabel(commentCount, "comment", "comments")}>
              <AskMiniStatIcon type="comment" />
              {commentCount}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F8FAFC] px-2 py-1" title={askResultStatLabel(savedCount, "saved", "saved")}>
            <AskMiniStatIcon type="save" />
            {savedCount}
          </span>
        </div>
      </div>
      <AskOverlayPortal>
        {choiceOpen && <AskResultOpenChoice result={result} onClose={() => setChoiceOpen(false)} onOpenHere={openHere} onGo={goToLocation} />}
      </AskOverlayPortal>
    </article>
  );
}

function askEmyInlineMapNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function askEmyInlineMapBusinessMarkers(result) {
  const rows = Array.isArray(result && result.businessMarkers) ? result.businessMarkers : [];
  return rows.map((marker) => {
    const latitude = askEmyInlineMapNumber(marker && (marker.latitude || marker.lat));
    const longitude = askEmyInlineMapNumber(marker && (marker.longitude || marker.lng || marker.lon));
    const name = String(marker && marker.name || "").trim();
    return latitude !== null && longitude !== null && name ? { latitude, longitude, name } : null;
  }).filter(Boolean).slice(0, 8);
}

function askEmyLoadInlineLeaflet() {
  if (window.L && window.L.map) return Promise.resolve(window.L);
  if (window.emyAskLeafletPromise) return window.emyAskLeafletPromise;
  window.emyAskLeafletPromise = new Promise((resolve, reject) => {
    const finish = () => window.L && window.L.map ? resolve(window.L) : reject(new Error("Leaflet did not load"));
    if (!document.getElementById("emy-leaflet-css")) {
      const link = document.createElement("link");
      link.id = "emy-leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }
    const existing = document.getElementById("emy-leaflet-js");
    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener("error", reject, { once: true });
      window.setTimeout(finish, 0);
      return;
    }
    const script = document.createElement("script");
    script.id = "emy-leaflet-js";
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.defer = true;
    script.onload = finish;
    script.onerror = reject;
    document.head.appendChild(script);
  }).catch((error) => {
    window.emyAskLeafletPromise = null;
    throw error;
  });
  return window.emyAskLeafletPromise;
}

function askEmyPostcodeFromText(value) {
  const match = String(value || "").toUpperCase().match(/\b([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})\b/);
  return match ? match[1].replace(/\s+/, " ") : "";
}

async function askEmyResolvePostcodeCoordinates(label) {
  const postcode = askEmyPostcodeFromText(label);
  if (!postcode) return null;
  try {
    const response = await fetch("https://api.postcodes.io/postcodes/" + encodeURIComponent(postcode));
    if (!response.ok) return null;
    const payload = await response.json();
    const latitude = askEmyInlineMapNumber(payload && payload.result && payload.result.latitude);
    const longitude = askEmyInlineMapNumber(payload && payload.result && payload.result.longitude);
    return latitude !== null && longitude !== null ? { latitude, longitude, label: postcode } : null;
  } catch (error) {
    return null;
  }
}

function AskEmyInlineMap({ result, origin, radiusLabel, businessCount, businessNames, onOpen }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerRef = useRef(null);
  const initialLatitude = askEmyInlineMapNumber(result && result.latitude);
  const initialLongitude = askEmyInlineMapNumber(result && result.longitude);
  const markerRows = askEmyInlineMapBusinessMarkers(result);
  const [status, setStatus] = useState(initialLatitude !== null && initialLongitude !== null ? "ready" : "finding");
  const [locationText, setLocationText] = useState(String(result && result.locationLabel || origin || "Your map view").trim());
  useEffect(() => {
    let cancelled = false;
    const fallbackCenter = {
      latitude: initialLatitude !== null ? initialLatitude : 51.509865,
      longitude: initialLongitude !== null ? initialLongitude : -0.595040,
      label: locationText || origin || "Your map view",
    };
    const drawMap = (L, center, accuracy) => {
      if (cancelled || !mapRef.current) return;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      const map = L.map(mapRef.current, {
        scrollWheelZoom: true,
        zoomControl: true,
        attributionControl: false,
      }).setView([center.latitude, center.longitude], 16);
      mapInstanceRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { minZoom: 3, maxZoom: 19 }).addTo(map);
      const layer = L.layerGroup().addTo(map);
      layerRef.current = layer;
      if (accuracy) {
        L.circle([center.latitude, center.longitude], {
          radius: Math.min(260, Math.max(18, accuracy)),
          color: "#1677d2",
          weight: 1,
          opacity: .36,
          fillColor: "#1677d2",
          fillOpacity: .12,
          interactive: false,
        }).addTo(layer);
      }
      const userIcon = L.divIcon({
        className: "",
        html: '<span style="display:block;width:24px;height:24px;border-radius:999px;background:#1677d2;border:4px solid white;box-shadow:0 0 0 2px rgba(22,119,210,.35),0 12px 24px rgba(0,27,71,.25)"></span>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      L.marker([center.latitude, center.longitude], { icon: userIcon, keyboard: false }).addTo(layer);
      const bounds = [[center.latitude, center.longitude]];
      markerRows.forEach((marker) => {
        const markerIcon = L.divIcon({
          className: "",
          html: '<span title="' + marker.name.replace(/"/g, "&quot;") + '" style="display:block;width:18px;height:18px;border-radius:999px;background:#ff6a00;border:3px solid white;box-shadow:0 0 0 7px rgba(255,106,0,.16),0 10px 22px rgba(0,27,71,.18)"></span>',
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });
        L.marker([marker.latitude, marker.longitude], { icon: markerIcon, keyboard: false }).bindPopup(marker.name).addTo(layer);
        bounds.push([marker.latitude, marker.longitude]);
      });
      if (bounds.length > 1) map.fitBounds(bounds, { padding: [34, 34], maxZoom: 16 });
      window.setTimeout(() => { if (!cancelled && map.invalidateSize) map.invalidateSize(); }, 120);
    };
    askEmyLoadInlineLeaflet().then(async (L) => {
      let center = fallbackCenter;
      let accuracy = 140;
      if (initialLatitude === null || initialLongitude === null) {
        const postcodeCenter = await askEmyResolvePostcodeCoordinates(origin);
        if (!cancelled && postcodeCenter) {
          center = postcodeCenter;
          accuracy = 180;
          setLocationText(postcodeCenter.label);
          setStatus("ready");
        }
      }
      drawMap(L, center, accuracy);
      if ((initialLatitude === null || initialLongitude === null) && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          if (cancelled || !position || !position.coords) return;
          const liveCenter = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            label: "Your live location",
          };
          setLocationText("Your live location");
          setStatus("live");
          drawMap(L, liveCenter, position.coords.accuracy);
        }, () => {
          if (!cancelled) setStatus("ready");
        }, { enableHighAccuracy: true, timeout: 7000, maximumAge: 60000 });
      } else {
        setStatus("ready");
      }
    }).catch(() => setStatus("preview"));
    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [origin, initialLatitude, initialLongitude, markerRows.length]);
  const statusLabel = status === "live" ? "GPS on" : status === "finding" ? "Finding" : status === "preview" ? "Map preview" : "EMY map";
  return (
    <div data-ask-card-action="true" onClick={(event) => event.stopPropagation()} className="relative mt-4 min-h-[260px] overflow-hidden rounded-lg border border-[#B7D7C6] bg-[#DDEFEA] shadow-inner">
      <div ref={mapRef} className="absolute inset-0 z-0 bg-[#DDEFEA]" aria-label="EMY map preview"></div>
      <div className="pointer-events-none absolute left-3 top-3 z-[410] max-w-[calc(100%-112px)] rounded-xl border border-[#D0D5DD] bg-white/95 p-3 shadow-lg shadow-[#001B47]/10">
        <p className="text-[12px] font-black text-[#001B47]">{status === "live" ? "Your live location" : "Your map view"}</p>
        <p className="mt-1 max-w-[290px] truncate text-[12px] font-bold text-[#475467]">{locationText || origin}{radiusLabel ? " - " + radiusLabel : ""}</p>
        <p className="mt-1 text-[11px] font-black text-[#667085]">{businessCount ? businessCount + " nearby business" + (businessCount === 1 ? "" : "es") : "No nearby businesses showing yet"}</p>
      </div>
      <div className="absolute right-3 top-3 z-[410] flex flex-col gap-2">
        <button type="button" onClick={(event) => { event.stopPropagation(); if (typeof onOpen === "function") onOpen(); }} className="rounded-lg bg-white/95 px-3 py-2 text-[11px] font-black text-[#001B47] shadow transition hover:bg-orange-50 hover:text-orange-600">Expand map</button>
        <span className="rounded-lg bg-white/95 px-3 py-2 text-[11px] font-black text-[#001B47] shadow">EMY map</span>
        <span className="rounded-lg bg-white/90 px-3 py-2 text-[11px] font-black text-[#155EEF] shadow">{statusLabel}</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 z-[410] flex flex-wrap gap-2">
        {businessNames.length ? businessNames.map((name) => (
          <span key={name} className="max-w-[180px] truncate rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-black text-[#001B47] shadow-sm">{name}</span>
        )) : <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-black text-[#667085] shadow-sm">Try a wider radius</span>}
      </div>
    </div>
  );
}

function askResultOpenHereLabel(type) {
  const clean = String(type || "").toLowerCase();
  if (clean === "clip" || clean === "reel") return "Play clip here";
  if (clean === "product") return "View product here";
  if (clean === "job") return "View job here";
  if (clean === "event") return "View event here";
  if (clean === "post" || clean === "article") return "Read here";
  if (clean === "map" || clean === "directions") return "Show map here";
  if (clean === "business") return "View summary here";
  return "Open here";
}

function askResultGoLocationLabel(type) {
  const clean = String(type || "").toLowerCase();
  if (clean === "product") return "Go to product";
  if (clean === "job") return "Go to job";
  if (clean === "event") return "Go to event";
  if (clean === "post" || clean === "article") return "Go to post";
  if (clean === "map" || clean === "directions") return "Open full map";
  if (clean === "business") return "Go to profile";
  return "Go to location";
}

function AskResultOpenChoice({ result, onClose, onOpenHere, onOpenClipView, onGo }) {
  const type = String(result && result.type || "result").toLowerCase();
  const title = String(result && (result.name || result.title || result.business) || "EMY result").trim();
  const isClipType = type === "clip" || type === "reel";
  const canGoToLocation = type !== "clip" && type !== "reel";
  const openHereClass = isClipType
    ? "border-orange-200 bg-orange-50 text-[#D85A00] transition hover:bg-orange-100"
    : "border-orange-200 bg-orange-50 text-[#D85A00] transition hover:bg-orange-100";
  return (
    <div data-ask-card-action="true" onClick={(event) => { event.stopPropagation(); onClose(); }} className="fixed inset-0 z-[10500] flex items-center justify-center bg-[#001225]/48 px-4 py-6 backdrop-blur-[2px]">
      <div role="dialog" aria-modal="true" aria-label="Choose how to open this EMY result" onClick={(event) => event.stopPropagation()} className="w-full max-w-[300px] overflow-hidden rounded-xl border border-white/80 bg-white shadow-lg shadow-black/20">
        <div className="border-b border-[#E4E7EC] px-3.5 py-2.5">
          <p className="text-[9px] font-bold uppercase tracking-normal text-orange-600">Open result</p>
          <h3 className="mt-0.5 break-words text-[16px] font-bold leading-tight text-[#001B47]">{title}</h3>
          {result && result.business && result.business !== title && <p className="mt-0.5 text-[12px] font-semibold text-[#667085]">{result.business}</p>}
        </div>
        <div className="grid gap-2 px-3.5 py-3">
          <button type="button" onClick={(event) => { askStopOpenEvent(event); onOpenHere(); }} className={"flex min-h-[40px] items-center justify-between rounded-xl border px-3 text-left text-[12px] font-semibold " + openHereClass}>
            <span>{askResultOpenHereLabel(type)}</span>
            <span aria-hidden="true">{">"}</span>
          </button>
          {isClipType && (
            <button type="button" onClick={(event) => { askStopOpenEvent(event); if (typeof onOpenClipView === "function") onOpenClipView(); else onOpenHere(); }} className="flex min-h-[40px] items-center justify-between rounded-xl border border-[#6938EF]/20 bg-[#F4F3FF] px-3 text-left text-[12px] font-semibold text-[#4A1FB8] transition hover:bg-[#EDE9FE]">
              <span>Open clip view</span>
              <span aria-hidden="true">{">"}</span>
            </button>
          )}
          {canGoToLocation && (
            <button type="button" onClick={(event) => { askStopOpenEvent(event); onGo(); }} className="flex min-h-[40px] items-center justify-between rounded-xl border border-[#D0D5DD] bg-white px-3 text-left text-[12px] font-semibold text-[#001B47] transition hover:bg-[#F8FAFC]">
              <span>{askResultGoLocationLabel(type)}</span>
              <span aria-hidden="true">{">"}</span>
            </button>
          )}
          <button type="button" onClick={(event) => { askStopOpenEvent(event); onClose(); }} className="min-h-[34px] rounded-full bg-[#F4F6F8] px-3 text-[12px] font-semibold text-[#667085] transition hover:bg-[#E4E7EC]">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function AskClipInlineViewer({ result, onClose, onGo }) {
  const frameRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const title = String(result && (result.name || result.title || result.business) || "EMY clip").trim();
  const businessName = String(result && (result.business || result.name) || "Business clip").trim();
  const initials = businessName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase() || "B";
  const dateLabel = formatAskProductDate(result && result.date);
  const viewCount = askResultCountValue(result && result.viewCount, result && result.views);
  const likeCount = askResultCountValue(result && result.likeCount, result && result.likes);
  const businessLikeCount = askResultCountValue(result && result.businessLikeCount, result && result.businessLikes, result && result.likedBusinessCount);
  const commentCount = askResultCountValue(result && result.commentCount, result && result.comments);
  const stats = [
    viewCount ? askResultStatLabel(viewCount, "view", "views") : "",
    likeCount ? askResultStatLabel(likeCount, "like", "likes") : "",
    commentCount ? askResultStatLabel(commentCount, "comment", "comments") : "",
    dateLabel,
  ].filter(Boolean);
  const setVideoSound = (video, nextMuted) => {
    if (!video) return;
    video.muted = !!nextMuted;
    video.defaultMuted = !!nextMuted;
    if (nextMuted) video.setAttribute("muted", "");
    else video.removeAttribute("muted");
    if (!nextMuted) video.volume = 1;
  };
  const togglePlay = (event) => {
    if (event) event.stopPropagation();
    const video = frameRef.current && frameRef.current.querySelector("video");
    if (!video) return;
    if (!video.paused && !video.ended) {
      video.pause();
      setPlaying(false);
      return;
    }
    setVideoSound(video, muted);
    setPlaying(true);
    video.play && video.play().catch(() => setPlaying(false));
  };
  const toggleMute = (event) => {
    if (event) event.stopPropagation();
    const nextMuted = !muted;
    setMuted(nextMuted);
    setVideoSound(frameRef.current && frameRef.current.querySelector("video"), nextMuted);
  };
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      const video = frameRef.current && frameRef.current.querySelector("video");
      if (video && video.pause) {
        try { video.pause(); } catch (error) {}
      }
    };
  }, []);
  return (
    <div data-ask-card-action="true" onClick={(event) => { event.stopPropagation(); onClose(); }} className="fixed inset-0 z-[10400] flex items-center justify-center overflow-y-auto bg-[#001225]/70 px-4 py-5 backdrop-blur-[2px]">
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()} className="relative grid w-full max-w-[760px] gap-3 md:grid-cols-[minmax(190px,250px)_minmax(240px,320px)] md:items-center md:justify-center">
        <button type="button" onClick={onClose} className="absolute right-0 top-0 z-30 flex h-9 w-9 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full bg-white text-base font-bold text-[#001B47] shadow-lg shadow-black/20 hover:bg-orange-50" aria-label="Close clip viewer">x</button>
        <aside className="order-2 rounded-xl border border-white/10 bg-white/95 p-3 text-[#001B47] shadow-lg shadow-black/20 md:order-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F3F6FB] text-xs font-bold text-[#001B47] ring-1 ring-[#D0D5DD]">
              {result && result.profileImage ? <img src={result.profileImage} alt="" className="h-full w-full object-cover" /> : initials}
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-sm font-bold">{businessName}</strong>
              <small className="block truncate text-[11px] font-semibold text-[#667085]">{result && (result.category || result.mediaType) || "Business clip"}</small>
            </span>
          </div>
          <h3 className="mt-3 break-words text-xl font-bold leading-tight">{title}</h3>
          {result && result.desc && <p className="mt-2 text-xs font-medium leading-5 text-[#475467]">{result.desc}</p>}
          {(result && (result.isOwnedByViewer || result.isCustomerOfViewer || result.isFollowedByViewer)) && <div className="mt-2"><AskOwnerBadge result={result} /></div>}
          {businessLikeCount > 0 && (
            <div className="mt-2">
              <span className="inline-flex min-h-[30px] items-center rounded-full border border-orange-200 bg-orange-50 px-3 text-xs font-bold text-[#D85A00] shadow-sm">
                Liked business {businessLikeCount}
              </span>
            </div>
          )}
          {stats.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {stats.map((item) => <span key={item} className="rounded-full bg-[#F3F6FB] px-2.5 py-1 text-[10px] font-bold text-[#667085]">{item}</span>)}
            </div>
          )}
          <div className="mt-4 grid gap-2">
            <button type="button" onClick={togglePlay} className="inline-flex min-h-[36px] items-center justify-center rounded-full bg-[#001B47] px-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#062B63]">{playing ? "Pause clip" : "Play here"}</button>
          </div>
        </aside>
        <article data-ask-clip-inline-viewer="true" className="order-1 mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl bg-black shadow-xl shadow-black/25 ring-1 ring-white/15 md:order-2">
          <div
            ref={frameRef}
            role="button"
            tabIndex={0}
            onClick={togglePlay}
            onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); togglePlay(event); } }}
            className="relative aspect-[9/16] max-h-[70vh] min-h-[400px] overflow-hidden bg-black text-white"
            aria-label={(playing ? "Pause" : "Play") + " clip"}
          >
            <AskResultInlineMedia
              result={result}
              label="Clip"
              alwaysShow
              fit="cover"
              onVideoPlay={() => setPlaying(true)}
              onVideoPause={() => setPlaying(false)}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.42)_0%,rgba(0,0,0,0)_30%,rgba(0,0,0,0)_60%,rgba(0,0,0,.58)_100%)]" aria-hidden="true"></div>
            <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white/15 text-xs font-bold text-white backdrop-blur">
                  {result && result.profileImage ? <img src={result.profileImage} alt="" className="h-full w-full object-cover" /> : initials}
                </span>
                <span className="min-w-0">
                  <strong className="block truncate text-xs font-bold leading-tight">{businessName}</strong>
                  <small className="block truncate text-[11px] font-bold text-white/80">clip</small>
                </span>
              </div>
              <span className="rounded-full bg-white/14 px-2.5 py-1 text-[10px] font-bold uppercase text-white backdrop-blur">Clip</span>
            </div>
            {!playing && (
              <button type="button" data-ask-card-action="true" onClick={togglePlay} className="absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[#001B47] shadow-xl shadow-black/25 transition hover:scale-105" aria-label="Play clip">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-current" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z" /></svg>
              </button>
            )}
            <div className="absolute inset-x-0 bottom-0 z-10 p-3">
              <h4 className="line-clamp-2 text-lg font-bold leading-tight">{title}</h4>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <button type="button" data-ask-card-action="true" onClick={togglePlay} className="inline-flex min-h-[32px] items-center rounded-full bg-white px-3 text-xs font-bold text-[#001B47]">{playing ? "Pause" : "Play"}</button>
                <button type="button" data-ask-card-action="true" onClick={toggleMute} className="inline-flex min-h-[32px] items-center rounded-full bg-white/15 px-3 text-xs font-bold text-white backdrop-blur">{muted ? "Sound off" : "Sound on"}</button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function AskGeneratedResultCardWindow({ result, onClose }) {
  const title = String(result && (result.name || result.title || result.business) || "EMY card").trim();
  return (
    <div data-ask-card-action="true" onClick={(event) => { event.stopPropagation(); onClose(); }} className="fixed inset-0 z-[10400] flex items-center justify-center overflow-y-auto bg-[#001B47]/62 px-4 py-6 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()} className="relative w-full max-w-[760px]">
        <button type="button" onClick={onClose} className="absolute right-3 top-3 z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl font-black text-[#001B47] shadow-lg shadow-[#001B47]/15 transition hover:bg-[#F2F4F7]" aria-label="Close">x</button>
        <ResultCard result={result} />
      </div>
    </div>
  );
}

function askInlineGeneratedCardResult(result) {
  if (!result || result.viewSpec && typeof result.viewSpec === "object") return result;
  const type = String(result.type || result.kind || "").trim().toLowerCase();
  const url = String(askResultUrl(result) || "").trim();
  const isBusinessProfile = type === "business" || type === "profile" || /emy-business-profile\.html/i.test(url);
  if (!isBusinessProfile) return result;
  const title = String(result.name || result.title || result.business || "Business profile").trim();
  const subtitle = String(result.desc || result.description || result.summary || "").trim();
  const category = String(result.category || result.kind || "").trim();
  const place = String(result.place || result.area || result.location || "").trim();
  const distance = String(result.distanceText || result.distance || result.distanceMiles || result.miles || "").trim();
  const likes = askResultCountValue(result.likeCount, result.likes, result.businessLikes);
  const facts = [
    { label: "Business", value: title },
    { label: "Category", value: category },
    { label: "Area", value: place },
    { label: "Distance", value: distance },
    { label: "Business likes", value: likes ? askResultStatLabel(likes, "like", "likes") : "" },
  ].filter((item) => String(item.value || "").trim());
  const badges = [
    "Business profile",
    result.isOwned || result.owned ? "Your business" : "",
    result.isFollowing || result.following ? "Following" : "",
  ].filter(Boolean);
  return {
    ...result,
    type: "business",
    viewSpec: {
      variant: "business",
      kind: "Business profile",
      eyebrow: "Business card",
      title,
      subtitle,
      badges,
      facts,
      highlights: facts.filter((item) => /likes|distance/i.test(item.label)),
    },
  };
}

function AskResultInlineWindow({ result, onClose, onGo }) {
  const generatedResult = askInlineGeneratedCardResult(result);
  if (generatedResult && generatedResult.viewSpec && typeof generatedResult.viewSpec === "object") {
    return <AskGeneratedResultCardWindow result={generatedResult} onClose={onClose} />;
  }
  const type = String(result && result.type || "result").toLowerCase();
  const visual = askResultVisualConfig(type);
  const meta = resultMetaItems(result || {});
  const title = String(result && (result.name || result.title || result.business) || "EMY result").trim();
  const isClip = type === "clip" || type === "reel";
  const isProduct = type === "product";
  const isMap = type === "map" || type === "directions";
  const productAvailability = isProduct ? askProductAvailabilityLabel(result || {}) : "";
  const productLikes = isProduct ? askResultCountValue(result && result.likeCount, result && result.likes) : 0;
  const productSaved = isProduct ? askResultCountValue(result && result.saveCount, result && result.saved) : 0;
  const productViews = isProduct ? askResultCountValue(result && result.viewCount, result && result.views) : 0;
  const productComments = isProduct ? askResultCountValue(result && result.commentCount, result && result.comments) : 0;
  const productDetails = isProduct ? [
    { label: "Business", value: result && result.business },
    { label: "Price", value: result && result.price },
    { label: "Availability", value: productAvailability },
    { label: "Category", value: result && result.category },
    { label: "Views", value: productViews ? askResultStatLabel(productViews, "view", "views") : "" },
    { label: "Likes", value: productLikes ? askResultStatLabel(productLikes, "like", "likes") : "" },
    { label: "Saved", value: productSaved ? askResultStatLabel(productSaved, "saved", "saved") : "" },
    { label: "Comments", value: productComments ? askResultStatLabel(productComments, "comment", "comments") : "" },
  ].filter((item) => String(item.value || "").trim()) : [];
  const origin = String(result && result.origin || "Your search area").trim();
  const radius = String(result && (result.radius || result.searchRadius) || "").trim();
  const radiusLabel = radius ? (/\b(km|mi|mile|miles)\b/i.test(radius) ? radius : radius + " km") : "";
  const businessCount = askResultCountValue(result && (result.businessCount || result.businessesCount));
  const businessNames = (Array.isArray(result && result.businesses) ? result.businesses : String(result && result.business || "").split(",")).map((item) => String(item || "").trim()).filter(Boolean).slice(0, 4);
  if (isClip) return <AskClipInlineViewer result={result} onClose={onClose} onGo={onGo} />;
  return (
    <div data-ask-card-action="true" onClick={(event) => { event.stopPropagation(); onClose(); }} className="fixed inset-0 z-[10400] flex items-center justify-center overflow-y-auto bg-[#001B47]/62 px-4 py-6 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()} className="relative w-full max-w-[760px] overflow-hidden rounded-xl bg-white shadow-2xl shadow-[#001B47]/30">
        <div className="flex items-start justify-between gap-3 border-b border-[#E4E7EC] px-5 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-normal text-orange-600">Opened here</p>
            <h3 className="mt-1 break-words text-2xl font-black leading-tight text-[#001B47]">{title}</h3>
            {result && result.business && result.business !== title && <p className="mt-1 text-sm font-bold text-[#667085]">{result.business}</p>}
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7] text-xl font-black text-[#001B47] hover:bg-[#E4E7EC]" aria-label="Close">x</button>
        </div>
        <div className="grid gap-4 p-5">
          {isMap ? (
            <AskEmyInlineMap result={result} origin={origin} radiusLabel={radiusLabel} businessCount={businessCount} businessNames={businessNames} onOpen={onGo} />
          ) : isProduct ? (
            <div className="grid gap-4 md:grid-cols-[minmax(220px,320px)_1fr]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#EEF2F7] ring-1 ring-[#001B47]/5">
                <AskProductMedia result={result} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  {result && result.isOwnedByViewer && <span className="rounded-full bg-[#001B47] px-2.5 py-1 text-[11px] font-black uppercase text-white">Your business</span>}
                  {result && result.isCustomerOfViewer && <span className="rounded-full bg-[#ECFDF3] px-2.5 py-1 text-[11px] font-black uppercase text-[#067647]">You're a customer</span>}
                  {result && result.isFollowedByViewer && <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-black uppercase text-orange-600">Following</span>}
                </div>
                {productDetails.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {productDetails.map((item) => (
                      <div key={item.label} className="rounded-md border border-[#E4E7EC] bg-[#F8FAFC] px-3 py-2">
                        <p className="text-[10px] font-black uppercase tracking-normal text-[#98A2B3]">{item.label}</p>
                        <p className="mt-1 break-words text-sm font-black leading-5 text-[#001B47]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
                {result && result.price && <div className="mt-4 inline-flex min-h-[34px] items-center rounded-full bg-orange-50 px-3 text-base font-black text-[#D85A00]">{result.price}</div>}
              </div>
            </div>
          ) : askResultHasMedia(result) ? (
            <div className="relative aspect-[16/8] overflow-hidden rounded-lg bg-[#F5F7FB] ring-1 ring-[#001B47]/5">
              <AskResultInlineMedia result={result} label={visual.label + " media"} controls fit={type === "event" ? "cover" : "contain"} />
            </div>
          ) : null}
          {result && result.desc && <p className="text-sm font-semibold leading-6 text-[#475467]">{result.desc}</p>}
          {meta.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {meta.map((item) => <span key={item} className={"rounded-full px-2.5 py-1 text-[11px] font-bold " + visual.chip}>{item}</span>)}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E4E7EC] pt-4">
            {typeof onGo === "function" && (
              <button type="button" onClick={onGo} className={"inline-flex min-h-[40px] items-center rounded-full px-4 text-sm font-black shadow-sm transition " + visual.cta}>{askResultGoLocationLabel(type)}<span className="ml-2" aria-hidden="true">{">"}</span></button>
            )}
            <ResponseActions result={result} text={formatResultForAction(result)} title={title} label="result" className="flex items-center gap-2 overflow-visible" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductResultRail({ results }) {
  const rows = (Array.isArray(results) ? results : []).filter((result) => String(result && result.type || "").toLowerCase() === "product");
  if (!rows.length) return null;
  const showMore = rows.length > 3;
  const [expanded, setExpanded] = useState(false);
  return (
    <section data-product-rail-wrap="true" className="mt-3 w-full">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-xl font-black tracking-normal text-[#001B47]">Product options</h3>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600">{expanded ? "All products" : rows.length + " shown"}</span>
      </div>
      <div
        data-product-rail={expanded ? undefined : "true"}
        className={expanded
          ? "grid grid-cols-[repeat(auto-fill,minmax(176px,1fr))] justify-items-start gap-3 sm:grid-cols-[repeat(auto-fill,minmax(196px,1fr))]"
          : "-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]"}
      >
        {rows.map((result, index) => (
          <AskProductMiniCard key={result.id || result.url || ((result.name || "product") + "-" + index)} result={result} />
        ))}
      </div>
      {showMore && (
        <div className="relative mt-3 flex items-center justify-center">
          <span className="absolute left-0 right-0 top-1/2 h-px bg-[#D0D5DD]" aria-hidden="true"></span>
          <button type="button" aria-expanded={expanded} onClick={() => setExpanded((current) => !current)} className="relative inline-flex min-h-[44px] min-w-[220px] items-center justify-center gap-3 rounded-full bg-[#F2F4F7] px-6 text-sm font-black text-[#001B47] shadow-sm transition hover:bg-orange-50 hover:text-orange-600">
            {expanded ? "Show fewer" : "More products"} <span aria-hidden="true">{expanded ? "^" : "v"}</span>
          </button>
        </div>
      )}
    </section>
  );
}

function askProductAnalyticsDisplayName(result, bar) {
  return String(
    result?.productName ||
    result?.productTitle ||
    bar?.label ||
    result?.name ||
    "Product"
  ).trim();
}

function askProductAnalyticsMetricLabel(metric, value) {
  const clean = String(metric || "views").toLowerCase();
  const count = askResultCountValue(value);
  if (/likes?/.test(clean)) return count === 1 ? "like" : "likes";
  if (/comments?/.test(clean)) return count === 1 ? "comment" : "comments";
  if (/saves?|saved/.test(clean)) return count === 1 ? "save" : "saves";
  if (/orders?/.test(clean)) return count === 1 ? "order" : "orders";
  if (/enquir|inquir/.test(clean)) return count === 1 ? "enquiry" : "enquiries";
  return count === 1 ? "view" : "views";
}

function askProductAnalyticsTopResult(analytics, results) {
  if (!analytics || analytics.answer_type !== "analytics_bar_chart") return null;
  const bars = Array.isArray(analytics.bars) ? analytics.bars : [];
  const firstBar = bars[0] || null;
  const productResults = (Array.isArray(results) ? results : []).filter((result) => String(result && result.type || "").toLowerCase() === "product");
  const firstDetails = firstBar && firstBar.details && typeof firstBar.details === "object" ? firstBar.details : {};
  const firstType = String(firstDetails.type || "").toLowerCase();
  const hasProductDetails = firstType === "product" || Boolean(firstDetails.product_id || firstDetails.productName);
  if (firstBar && !productResults.length && !hasProductDetails) return null;
  const match = firstBar && productResults.find((result) => {
    const name = askProductAnalyticsDisplayName(result, firstBar).toLowerCase();
    return name && name === String(firstBar.label || "").trim().toLowerCase();
  });
  const topResult = match || productResults[0] || null;
  if (!topResult && !firstBar) return null;
  return { result: topResult || { type: "product", name: firstBar.label || "Product" }, bar: firstBar };
}

function askTextWithoutProductAnalyticsBlocks(text) {
  return String(text || "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => {
      const first = block.split(/\n/).map((line) => line.trim()).filter(Boolean)[0] || "";
      return !/^(product statistics chart|text bars?|details)$/i.test(first);
    })
    .join("\n\n")
    .trim();
}

function ProductAnalyticsSummaryCard({ analytics, item }) {
  if (!item || !analytics) return null;
  const result = item.result || {};
  const bar = item.bar || {};
  const metric = String(analytics.metric || "views").toLowerCase();
  const value = askResultCountValue(bar.value, result.viewCount, result.views);
  const metricLabel = askProductAnalyticsMetricLabel(metric, value);
  const details = bar.details || {};
  const name = askProductAnalyticsDisplayName(result, bar);
  const price = String(result.price || details.price || "").trim();
  const business = String(result.business || result.businessName || "").trim();
  const category = String(result.category || "").trim();
  const availability = askProductAvailabilityLabel(result);
  const hasDirectMedia = Boolean(askResultDirectImageSource(result) || askResultDirectVideoSource(result));
  const hasMediaRef = Boolean(String(result.imageRef || result.mediaRef || result.videoRef || "").trim());
  const statItems = [
    { label: "Views", value: askResultCountValue(details.views, result.viewCount, result.views), type: "view" },
    { label: "Likes", value: askResultCountValue(details.likes, result.likeCount, result.likes), type: "like" },
    { label: "Comments", value: askResultCountValue(details.comments, result.commentCount, result.comments), type: "comment" },
    { label: "Saves", value: askResultCountValue(details.saves, result.saveCount, result.saved, result.saves), type: "save" },
  ];
  const barText = String(bar.bar || "").trim();
  const canOpenProduct = Boolean(result && (result.id || result.productId || result.name || result.productName || askResultUrl(result)));
  const openProductHere = () => {
    askCloseResultOverlays();
    askOpenAfterCurrentClick(() => {
      askOpenNativeProductDetail(result);
    });
  };
  return (
    <article className="mt-3 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-lg shadow-orange-500/10">
      <div className="grid gap-0 sm:grid-cols-[176px_minmax(0,1fr)]">
        <div className="group relative aspect-[4/3] min-h-[156px] overflow-hidden bg-[#FFF4E8] sm:aspect-auto sm:min-h-full">
          <AskResultInlineMedia result={{ ...result, name }} label={name + " image"} alwaysShow fit="cover" />
          <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-normal text-orange-600 shadow-sm">Top product</div>
          {!hasDirectMedia && (
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 px-3 py-2 text-center text-[11px] font-black text-[#667085] shadow-sm">
              {hasMediaRef ? "Image preview not available" : "No image saved"}
            </div>
          )}
        </div>
        <div className="min-w-0 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#155EEF]">{analytics.title || "Product analytics"}</p>
              <h3 className="mt-1 break-words text-xl font-black leading-6 text-[#001B47]">{name}</h3>
              {business && <p className="mt-1 text-xs font-black uppercase tracking-normal text-[#667085]">{business}</p>}
            </div>
            {price && <span className="shrink-0 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-black text-orange-600">{price}</span>}
          </div>
          <div className="mt-4 rounded-xl border border-[#E4E7EC] bg-[#F8FAFC] p-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-normal text-[#667085]">Main signal</p>
                <p className="mt-0.5 text-2xl font-black leading-none text-[#001B47]">{askFormatStatisticValue(value)} <span className="text-sm">{metricLabel}</span></p>
              </div>
              {barText && <span className="font-mono text-sm font-black tracking-normal text-orange-500" aria-label={askFormatStatisticValue(value) + " " + metricLabel}>{barText}</span>}
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-orange-500" style={{ width: "100%" }} aria-hidden="true"></div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {statItems.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[#E4E7EC] bg-white px-3 py-2 shadow-sm shadow-[#001B47]/5">
                <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-normal text-[#667085]"><AskMiniStatIcon type={stat.type} />{stat.label}</p>
                <p className="mt-1 text-base font-black text-[#001B47]">{askFormatStatisticValue(stat.value)}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {category && <span className="rounded-full bg-[#F3F6FB] px-2.5 py-1 text-xs font-bold text-[#667085]">{category}</span>}
            {availability && <span className="rounded-full bg-[#ECFDF3] px-2.5 py-1 text-xs font-black text-[#027A48]">{availability}</span>}
          </div>
          {analytics.top_insight && <p className="mt-3 rounded-xl bg-[#FFF8F1] px-3 py-2 text-sm font-semibold leading-6 text-[#001B47]/82">{analytics.top_insight}</p>}
          {canOpenProduct && (
            <button type="button" onClick={openProductHere} className="mt-4 inline-flex min-h-[40px] items-center rounded-full bg-orange-500 px-4 text-sm font-black text-white shadow-sm transition hover:bg-orange-600">
              Open product <span className="ml-2" aria-hidden="true">{">"}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function askAnalyticsDetailsFromBar(bar) {
  return bar && bar.details && typeof bar.details === "object" ? bar.details : {};
}

function askAnalyticsResultFromBar(bar) {
  const details = askAnalyticsDetailsFromBar(bar);
  const name = String(details.productName || details.name || bar?.label || "Product").trim();
  return {
    type: String(details.type || "product").trim() || "product",
    id: String(details.id || details.product_id || bar?.id || name).trim(),
    productId: String(details.product_id || details.id || "").trim(),
    productName: name,
    name,
    price: String(details.price || "").trim(),
    business: String(details.business || "").trim(),
    businessKey: String(details.businessKey || "").trim(),
    category: String(details.category || "").trim(),
    availability: String(details.availability || "").trim(),
    image: String(details.image || "").trim(),
    imageRef: String(details.imageRef || details.mediaRef || "").trim(),
    mediaRef: String(details.mediaRef || details.imageRef || "").trim(),
    video: String(details.video || "").trim(),
    videoRef: String(details.videoRef || "").trim(),
    url: String(details.url || "").trim(),
    views: askResultCountValue(details.views),
    likes: askResultCountValue(details.likes),
    comments: askResultCountValue(details.comments),
    saves: askResultCountValue(details.saves),
    saved: askResultCountValue(details.saves),
  };
}

function askAnalyticsRows(analytics, results = []) {
  const bars = Array.isArray(analytics && analytics.bars) ? analytics.bars : [];
  const productResults = (Array.isArray(results) ? results : []).filter((result) => String(result && result.type || "").toLowerCase() === "product");
  return bars.map((bar, index) => {
    const details = askAnalyticsDetailsFromBar(bar);
    const label = String(bar && (bar.label || details.productName || details.name) || "Product").trim();
    const lowerLabel = label.toLowerCase();
    const matched = productResults.find((result) => {
      const resultLabel = askProductAnalyticsDisplayName(result, bar).toLowerCase();
      return resultLabel && resultLabel === lowerLabel;
    });
    const result = matched || askAnalyticsResultFromBar(bar);
    return {
      bar,
      result,
      label,
      value: askResultCountValue(bar && bar.value),
      rank: index + 1,
    };
  }).filter((row) => row.label);
}

function AnalyticsChartRenderer({ analytics, results = [] }) {
  if (!analytics || analytics.answer_type !== "analytics_bar_chart") return null;
  const rows = askAnalyticsRows(analytics, results).slice(0, 10);
  if (!rows.length) return null;
  const metric = String(analytics.metric || "views").toLowerCase();
  const max = Math.max(...rows.map((row) => row.value), 1);
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  const top = rows[0];
  const metricLabel = askProductAnalyticsMetricLabel(metric, top.value);
  const dataQuality = analytics.data_quality || {};
  if (analytics.presentation === "cross_entity_comparison") {
    const warnings = Array.isArray(dataQuality.warnings) ? dataQuality.warnings.filter(Boolean) : [];
    const groups = [
      { key: "product", title: "Products", tone: "orange", rows: rows.filter((row) => String((row.result && row.result.type) || row.bar && row.bar.details && row.bar.details.type || "").toLowerCase() === "product" || /^product:/i.test(row.label)).slice(0, 5) },
      { key: "clip", title: "Clips", tone: "blue", rows: rows.filter((row) => String((row.result && row.result.type) || row.bar && row.bar.details && row.bar.details.type || "").toLowerCase() === "clip" || /^clip:/i.test(row.label)).slice(0, 5) },
    ].filter((group) => group.rows.length);
    const cleanLabel = (label) => String(label || "").replace(/^(product|clip):\s*/i, "");
    const barColor = (tone) => tone === "blue" ? "#155EEF" : "#FF6B00";
    return (
      <section className="mt-3 rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm shadow-[#001B47]/6" aria-label={analytics.title || "Analytics comparison"}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-orange-600">Analysis</p>
            <h3 className="mt-1 break-words text-lg font-black leading-6 text-[#001B47]">{analytics.title || "Comparison"}</h3>
            {analytics.summary && <p className="mt-1 text-sm font-semibold leading-6 text-[#001B47]/72">{analytics.summary}</p>}
          </div>
          <div className="rounded-xl bg-[#FFF8F1] px-3 py-2 text-right">
            <p className="text-[10px] font-black uppercase tracking-normal text-[#667085]">Top signal</p>
            <p className="text-lg font-black text-[#001B47]">{askFormatStatisticValue(top.value)} <span className="text-xs">{metricLabel}</span></p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.key} className="rounded-xl border border-[#E4E7EC] bg-[#F8FAFC] p-3">
              <h4 className="text-xs font-black uppercase tracking-[0.08em] text-[#475467]">{group.title}</h4>
              <div className="mt-3 grid gap-3">
                {group.rows.map((row, index) => {
                  const width = Math.max(row.value > 0 ? 6 : 0, Math.round((row.value / max) * 100));
                  return (
                    <div key={group.key + row.label + index} className="grid gap-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="min-w-0 truncate text-sm font-black text-[#001B47]">{cleanLabel(row.label)}</span>
                        <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-black text-[#001B47]">{askFormatStatisticValue(row.value)} {askProductAnalyticsMetricLabel(metric, row.value)}</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: width + "%", backgroundColor: barColor(group.tone) }} aria-hidden="true"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {(analytics.top_insight || warnings.length || analytics.next_action) && (
          <div className="mt-4 rounded-xl border border-orange-100 bg-[#FFF8F1] p-3">
            {analytics.top_insight && <p className="text-sm font-semibold leading-6 text-[#001B47]/86">{analytics.top_insight}</p>}
            {warnings.map((warning, index) => <p key={warning + index} className="mt-1 text-xs font-bold leading-5 text-[#667085]">{warning}</p>)}
            {analytics.next_action && <p className="mt-2 text-xs font-black uppercase tracking-normal text-orange-600">{analytics.next_action}</p>}
          </div>
        )}
      </section>
    );
  }
  const openProductHere = (result) => {
    if (!result) return;
    askCloseResultOverlays();
    askOpenAfterCurrentClick(() => {
      askOpenNativeProductDetail(result);
    });
  };
  const colors = ["#FF6B00", "#155EEF", "#12B76A", "#7A5AF8", "#C11574", "#0BA5EC", "#F79009", "#667085"];
  return (
    <section className="mt-3 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-lg shadow-orange-500/10" aria-label={analytics.title || "Analytics chart"}>
      <div className="border-b border-[#E4E7EC] bg-[#FFF8F1] px-4 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-orange-600">Analytics chart</p>
            <h3 className="mt-1 break-words text-xl font-black leading-6 text-[#001B47]">{analytics.title || "Product performance"}</h3>
            {analytics.summary && <p className="mt-1 text-sm font-semibold leading-6 text-[#001B47]/72">{analytics.summary}</p>}
          </div>
          <div className="rounded-xl bg-white px-3 py-2 text-right shadow-sm shadow-[#001B47]/5">
            <p className="text-[10px] font-black uppercase tracking-normal text-[#667085]">Top</p>
            <p className="text-lg font-black text-[#001B47]">{askFormatStatisticValue(top.value)} <span className="text-xs">{metricLabel}</span></p>
          </div>
        </div>
      </div>
      <div className="grid gap-3 p-4">
        {rows.map((row, index) => {
          const result = row.result || {};
          const details = askAnalyticsDetailsFromBar(row.bar);
          const width = Math.max(row.value > 0 ? 7 : 0, Math.round((row.value / max) * 100));
          const share = total ? Math.round((row.value / total) * 100) : 0;
          const unit = askProductAnalyticsMetricLabel(metric, row.value);
          const canOpen = String(result.type || "").toLowerCase() === "product" && Boolean(result.id || result.productId || result.name || result.productName);
          const price = String(result.price || details.price || "").trim();
          const likes = askResultCountValue(details.likes, result.likeCount, result.likes);
          const comments = askResultCountValue(details.comments, result.commentCount, result.comments);
          const saves = askResultCountValue(details.saves, result.saveCount, result.saved, result.saves);
          return (
            <article key={row.label + "-" + index} className="rounded-xl border border-[#E4E7EC] bg-[#F8FAFC] p-3 shadow-sm shadow-[#001B47]/5">
              <div className="grid gap-3 sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:items-center">
                <div className="relative h-[72px] w-[72px] overflow-hidden rounded-xl border border-white bg-white">
                  <AskResultInlineMedia result={result} label={row.label + " image"} alwaysShow fit="cover" />
                  <span className="absolute left-2 top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-white/95 px-2 text-[10px] font-black text-orange-600 shadow-sm">{row.rank}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="break-words text-base font-black leading-5 text-[#001B47]">{row.label}</h4>
                      {result.business && <p className="mt-0.5 text-xs font-black uppercase tracking-normal text-[#667085]">{result.business}</p>}
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-sm font-black text-[#001B47]">{askFormatStatisticValue(row.value)} {unit}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-white">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: width + "%", backgroundColor: colors[index % colors.length] }} aria-hidden="true"></div>
                    </div>
                    <span className="w-10 shrink-0 text-right text-[11px] font-black text-[#667085]">{share}%</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {price && <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-black text-orange-600">{price}</span>}
                    {likes > 0 && <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#667085]">{likes} {likes === 1 ? "like" : "likes"}</span>}
                    {comments > 0 && <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#667085]">{comments} {comments === 1 ? "comment" : "comments"}</span>}
                    {saves > 0 && <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#667085]">{saves} {saves === 1 ? "save" : "saves"}</span>}
                  </div>
                </div>
                {canOpen && (
                  <button type="button" onClick={() => openProductHere(result)} className="inline-flex min-h-[38px] items-center justify-center rounded-full bg-[#001B47] px-4 text-sm font-black text-white shadow-sm transition hover:bg-orange-600">
                    Open here <span className="ml-2" aria-hidden="true">{">"}</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {(analytics.top_insight || analytics.next_action) && (
        <div className="border-t border-[#E4E7EC] bg-[#FFF8F1] px-4 py-3">
          {analytics.top_insight && <p className="text-sm font-semibold leading-6 text-[#001B47]/86">{analytics.top_insight}</p>}
          {analytics.next_action && <p className="mt-1 text-xs font-black uppercase tracking-normal text-orange-600">{analytics.next_action}</p>}
        </div>
      )}
    </section>
  );
}

function ResultCard({ result }) {
  const type = String(result.type || "record").toLowerCase();
  const isProduct = type === "product";
  const meta = resultMetaItems(result);
  const clickable = Boolean(askResultUrl(result));
  const hasNativeDetail = askResultHasNativeDetailView(type);
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [inlineOpen, setInlineOpen] = useState(false);
  const [clipPlaying, setClipPlaying] = useState(false);
  const [clipOverlayDismissed, setClipOverlayDismissed] = useState(false);
  const cardRef = useRef(null);
  const pauseCardVideos = () => {
    const root = cardRef.current;
    if (!root) return;
    root.querySelectorAll("video").forEach((video) => {
      try {
        video.pause();
      } catch (error) {}
    });
    setClipPlaying(false);
  };
  useEffect(() => {
    const closeOverlays = () => {
      setChoiceOpen(false);
      setInlineOpen(false);
      pauseCardVideos();
    };
    window.addEventListener(ASK_RESULT_OVERLAY_CLOSE_EVENT, closeOverlays);
    return () => window.removeEventListener(ASK_RESULT_OVERLAY_CLOSE_EVENT, closeOverlays);
  }, []);
  const openHere = () => {
    askCloseResultOverlays();
    setChoiceOpen(false);
    if (hasNativeDetail) {
      if (type === "clip" || type === "reel") pauseCardVideos();
      askOpenAfterCurrentClick(() => {
        askOpenNativeResultDetail(result);
      });
      return;
    }
    if (type === "clip" || type === "reel") {
      pauseCardVideos();
      return;
    }
    setInlineOpen(true);
  };
  const openClipViewerHere = () => {
    askCloseResultOverlays();
    setChoiceOpen(false);
    setInlineOpen(false);
    if (type === "clip" || type === "reel") {
      pauseCardVideos();
      askOpenAfterCurrentClick(() => {
        askOpenNativeClipViewer(result);
      });
      return;
    }
    if (!hasNativeDetail) setInlineOpen(true);
  };
  const goToLocation = () => {
    askCloseResultOverlays();
    setChoiceOpen(false);
    setInlineOpen(false);
    if (type === "clip" || type === "reel") {
      pauseCardVideos();
      goToAskResultUrl(result);
      return;
    }
    goToAskResultUrl(result);
  };
  useEffect(() => {
    if (type !== "clip") return undefined;
    const pauseOnExit = () => pauseCardVideos();
    const pauseOnHidden = () => {
      if (document.visibilityState === "hidden") pauseCardVideos();
    };
    window.addEventListener("pagehide", pauseOnExit);
    window.addEventListener("beforeunload", pauseOnExit);
    window.addEventListener("popstate", pauseOnExit);
    document.addEventListener("visibilitychange", pauseOnHidden);
    return () => {
      pauseCardVideos();
      window.removeEventListener("pagehide", pauseOnExit);
      window.removeEventListener("beforeunload", pauseOnExit);
      window.removeEventListener("popstate", pauseOnExit);
      document.removeEventListener("visibilitychange", pauseOnHidden);
    };
  }, [type]);
  useEffect(() => {
    if (type === "clip" && (choiceOpen || inlineOpen)) pauseCardVideos();
  }, [type, choiceOpen, inlineOpen]);
  const showOpenChoice = (event) => {
    if (!clickable) return;
    const target = event.target;
    if (target && target.closest && target.closest("a,button,input,textarea,select,[data-ask-card-action]")) return;
    if (event.preventDefault) event.preventDefault();
    if (event.stopPropagation) event.stopPropagation();
    askCloseResultOverlays();
    setChoiceOpen(true);
  };
  const showOpenChoiceFromAction = (event) => {
    if (!clickable) return;
    askStopOpenEvent(event);
    askCloseResultOverlays();
    setChoiceOpen(true);
  };
  const openResult = (event) => {
    showOpenChoice(event);
  };
  const openResultWithKeyboard = (event) => {
    if (!clickable || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    setChoiceOpen(true);
  };
  const modalLayer = (
    <AskOverlayPortal>
      {choiceOpen && <AskResultOpenChoice result={result} onClose={() => setChoiceOpen(false)} onOpenHere={openHere} onOpenClipView={openClipViewerHere} onGo={goToLocation} />}
      {inlineOpen && !hasNativeDetail && <AskResultInlineWindow result={result} onClose={() => setInlineOpen(false)} onGo={goToLocation} />}
    </AskOverlayPortal>
  );
  const viewSpec = result && result.viewSpec && typeof result.viewSpec === "object" ? result.viewSpec : null;
  if (viewSpec) {
    const specTitle = String(viewSpec.title || result.name || "EMY card").trim();
    const specSubtitle = String(viewSpec.subtitle || result.business || result.desc || "").trim();
    const specEyebrow = String(viewSpec.eyebrow || "Created by Ask EMY").trim();
    const specKind = String(viewSpec.kind || type || "card").trim();
    const specVariant = String(viewSpec.variant || "profile").trim().toLowerCase();
    const isMediaSpec = specVariant === "media";
    const isCompactSpec = specVariant === "compact";
    const isBusinessSpec = specVariant === "business";
    const isIdentitySpec = specVariant === "identity";
    const specActionLabel = resultOpenLabel(type);
    const specMedia = viewSpec.media && typeof viewSpec.media === "object" ? viewSpec.media : {};
    const allowSpecMedia = !isBusinessSpec || specMedia.source === "business_profile" || specMedia.isBusinessProfileMedia === true;
    const explicitSpecImage = specMedia.src || specMedia.image || "";
    const explicitSpecRef = specMedia.ref || specMedia.imageRef || "";
    const mediaResult = {
      ...result,
      image: explicitSpecImage,
      imageRef: explicitSpecRef,
      mediaSrc: explicitSpecImage,
      mediaRef: explicitSpecRef,
      mediaType: specMedia.type || "",
    };
    const hasSpecMedia = allowSpecMedia && Boolean(explicitSpecImage || explicitSpecRef);
    const useSideMedia = hasSpecMedia && isMediaSpec;
    const useInlineHeaderMedia = hasSpecMedia && !useSideMedia;
    const mediaBlockSizeClass = isMediaSpec ? "aspect-[16/5] min-h-0" : isCompactSpec ? "min-h-[120px]" : isBusinessSpec ? "min-h-[220px]" : "min-h-[210px]";
    const facts = Array.isArray(viewSpec.facts) ? viewSpec.facts.filter((item) => item && String(item.label || item.value || "").trim()).slice(0, 8) : [];
    const badges = Array.isArray(viewSpec.badges) ? viewSpec.badges.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 5) : [];
    const highlights = Array.isArray(viewSpec.highlights) ? viewSpec.highlights.filter((item) => item && String(item.label || item.value || "").trim()).slice(0, 4) : [];
    const sections = Array.isArray(viewSpec.sections) ? viewSpec.sections.filter((section) => section && (section.title || Array.isArray(section.items))).slice(0, 4) : [];
    return (
      <article
        role={clickable ? "link" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={openResult}
        onKeyDown={openResultWithKeyboard}
        aria-label={clickable ? specActionLabel + " " + specTitle : undefined}
        className={"group relative w-full overflow-hidden rounded-2xl border bg-white text-left shadow-xl transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-500/10 " + (isMediaSpec ? "border-[#001B47]/15 shadow-[#001B47]/12" : isCompactSpec ? "border-orange-100 shadow-orange-500/8" : isBusinessSpec ? "border-emerald-100 shadow-emerald-500/10" : isIdentitySpec ? "border-sky-100 shadow-sky-500/10" : "border-[#DDE7FF] shadow-[#001B47]/8") + (clickable ? " cursor-pointer" : "")}
      >
        <div className="grid gap-0">
          {useSideMedia && (
            <div className={"relative overflow-hidden " + (isBusinessSpec ? "bg-[linear-gradient(135deg,#ECFDF3_0%,#F8FAFC_48%,#FFF4E8_100%)]" : isIdentitySpec ? "bg-[linear-gradient(135deg,#EFF8FF_0%,#F8FAFC_58%,#FFF4E8_100%)]" : "bg-[linear-gradient(135deg,#FFF4E8_0%,#F8FAFC_55%,#EEF4FF_100%)]") + " " + mediaBlockSizeClass}>
              {hasSpecMedia ? (
                <AskResultInlineMedia result={mediaResult} label={specTitle + " media"} alwaysShow fit={specMedia.fit || "cover"} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-3xl font-black text-orange-500 shadow-lg shadow-[#001B47]/10">
                    {specTitle.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase() || "E"}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#001B47]/40 to-transparent p-4">
                <span className="inline-flex min-h-[28px] items-center rounded-full bg-white/92 px-3 text-[10px] font-black uppercase tracking-normal text-orange-600 shadow-sm">{specKind}</span>
              </div>
            </div>
          )}
          <div className={"flex min-w-0 flex-col " + (isCompactSpec ? "p-4" : "p-5")}>
            {!useSideMedia && (
              <div className={"mb-4 flex items-center gap-3 rounded-2xl border px-4 py-3 " + (isBusinessSpec ? "border-emerald-100 bg-[#F0FDF4]" : isIdentitySpec ? "border-sky-100 bg-[#EFF8FF]" : "border-orange-100 bg-[#FFF8F1]")}>
                {useInlineHeaderMedia ? (
                  <span className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm shadow-[#001B47]/10">
                    <AskResultInlineMedia result={mediaResult} label={specTitle + " media"} alwaysShow fit={specMedia.fit || "cover"} />
                  </span>
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-xl font-black text-orange-500 shadow-sm shadow-[#001B47]/10">
                    {specTitle.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase() || "E"}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-normal text-orange-600">{specKind}</p>
                  <p className="mt-1 break-words text-sm font-black text-[#001B47]">{isBusinessSpec ? "Business profile card" : "Generated EMY card"}</p>
                </div>
              </div>
            )}
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-orange-600">{specEyebrow}</p>
            <h3 className={"mt-2 break-words font-black leading-[1.08] text-[#001B47] " + (isCompactSpec ? "text-[20px]" : "text-[24px]")}>{specTitle}</h3>
            {specSubtitle && <p className="mt-2 text-sm font-semibold leading-5 text-[#475467]">{specSubtitle}</p>}
            {badges.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {badges.map((badge) => <span key={badge} className="inline-flex min-h-[26px] items-center rounded-full bg-[#F8FAFC] px-3 text-[11px] font-black text-[#667085] ring-1 ring-[#E4E7EC]">{badge}</span>)}
              </div>
            )}
            {highlights.length > 0 && (
              <div className="mt-4 grid gap-2 lg:grid-cols-2">
                {highlights.map((item) => (
                  <div key={String(item.label || item.value)} className={"rounded-2xl border px-3 py-3 " + (isBusinessSpec ? "border-emerald-100 bg-[#F0FDF4]" : "border-[#E4E7EC] bg-[#F8FAFC]")}>
                    <p className={"text-[10px] font-black uppercase tracking-normal " + (isBusinessSpec ? "text-[#067647]" : "text-[#98A2B3]")}>{item.label}</p>
                    <p className="mt-1 break-words text-[18px] font-black leading-6 text-[#001B47]">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
            {facts.length > 0 && (
              <div className="mt-4 grid gap-2 lg:grid-cols-2">
                {facts.map((fact) => (
                  <div key={String(fact.label || fact.value)} className="rounded-xl border border-[#E4E7EC] bg-[#F8FAFC] px-3 py-2">
                    <p className="text-[10px] font-black uppercase tracking-normal text-[#98A2B3]">{fact.label}</p>
                    <p className="mt-1 break-words text-sm font-black leading-5 text-[#001B47]">{fact.value}</p>
                  </div>
                ))}
              </div>
            )}
            {sections.length > 0 && (
              <div className="mt-4 grid gap-3">
                {sections.map((section) => (
                  <div key={String(section.title || "section")} className="rounded-xl border border-orange-100 bg-[#FFF8F1] px-3 py-2">
                    {section.title && <p className="text-[10px] font-black uppercase tracking-[0.12em] text-orange-600">{section.title}</p>}
                    <div className="mt-1 grid gap-1">
                      {(Array.isArray(section.items) ? section.items : []).map((item) => <p key={String(item)} className="text-sm font-semibold leading-5 text-[#001B47]">{String(item)}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
              {clickable ? <button type="button" data-ask-card-action="true" onClick={showOpenChoiceFromAction} className="inline-flex min-h-[40px] items-center rounded-full bg-[#001B47] px-4 text-sm font-black text-white shadow-sm transition hover:bg-orange-600">{specActionLabel}<span className="ml-2" aria-hidden="true">{">"}</span></button> : <span></span>}
              <div data-ask-card-action="true" onClick={(event) => event.stopPropagation()}>
                <ResponseActions result={result} text={formatResultForAction(result)} title={specTitle} label="result" className="flex items-center gap-2 overflow-visible" />
              </div>
            </div>
          </div>
        </div>
        {modalLayer}
      </article>
    );
  }
  if (type === "map" || type === "directions") {
    const visual = askResultVisualConfig(type);
    const isAreaMap = String(result.mapMode || "").toLowerCase() === "area";
    const actionLabel = isAreaMap ? "Open EMY map" : resultOpenLabel(type);
    const origin = String(result.origin || "Your search area").trim();
    const destination = String(result.destination || result.address || result.place || result.business || "").trim();
    const unavailable = Boolean(result.mapUnavailable) || !clickable || (!isAreaMap && !destination);
    const statusState = askResultBusinessStatus(result);
    const coordinateText = result.latitude && result.longitude ? String(result.latitude) + ", " + String(result.longitude) : "";
    const radius = String(result.radius || result.searchRadius || "").trim();
    const radiusLabel = radius ? (/\b(km|mi|mile|miles)\b/i.test(radius) ? radius : radius + " km") : "";
    const businessCount = askResultCountValue(result.businessCount, result.businessesCount);
    const businessesWithLocations = askResultCountValue(result.businessesWithLocations, result.businessesWithPins, result.locationCount);
    const missingLocationCount = askResultCountValue(result.missingLocationCount, result.businessesMissingLocations);
    const mapBusinessNames = (Array.isArray(result.businesses) ? result.businesses : String(result.business || "").split(",")).map((item) => String(item || "").trim()).filter(Boolean).slice(0, 4);
    const routeDetails = (isAreaMap ? [
      { label: "Location", value: origin },
      { label: "Radius", value: radiusLabel },
      { label: "Businesses", value: businessCount ? businessCount + " showing" : "No businesses yet" },
      { label: "With pins", value: businessesWithLocations ? businessesWithLocations + " ready" : "Pins needed" },
      { label: "Needs location", value: missingLocationCount ? missingLocationCount + " profile" + (missingLocationCount === 1 ? "" : "s") : "" },
    ] : [
      { label: "Start", value: origin },
      { label: "Destination", value: destination || "Location needed" },
      { label: "Status", value: statusState.label },
      { label: "Hours", value: result.openingHours || statusState.detail },
      { label: "Pin", value: coordinateText || (destination ? "Using saved EMY address" : "No saved pin yet") },
    ]).filter((item) => String(item.value || "").trim()).slice(0, 5);
    return (
      <article
        role={clickable ? "link" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={openResult}
        onKeyDown={openResultWithKeyboard}
        aria-label={clickable ? actionLabel + " " + result.name : undefined}
        className={"group relative col-span-1 flex w-full flex-col overflow-visible rounded-lg border border-[#001B47]/10 bg-white text-left shadow-lg shadow-[#001B47]/5 transition hover:-translate-y-0.5 hover:border-[#12B76A]/30 hover:shadow-xl hover:shadow-[#12B76A]/10 sm:col-span-2" + (clickable ? " cursor-pointer" : "")}
      >
        <div className={"absolute inset-x-0 top-0 h-1.5 " + visual.bar} aria-hidden="true"></div>
        <div className="flex flex-col gap-4 p-4 sm:p-5">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <span className={"flex h-12 w-12 shrink-0 items-center justify-center rounded-lg " + visual.icon} aria-hidden="true">
                <AskResultTypeGlyph type={type} className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h3 className="break-words text-[20px] font-black leading-[1.16] text-[#001B47] sm:text-[22px]">{result.name || "EMY map"}</h3>
                {result.business && <p className="mt-1 text-xs font-black uppercase tracking-normal text-[#667085]">{result.business}</p>}
                {(result.isOwnedByViewer || result.isCustomerOfViewer || result.isFollowedByViewer) && <div className="mt-2"><AskOwnerBadge result={result} compact /></div>}
              </div>
            </div>
            <span className={"inline-flex min-h-[28px] shrink-0 items-center rounded-full px-3 text-[11px] font-black uppercase tracking-normal " + visual.badge}>{visual.label}</span>
          </div>

          <div className="rounded-lg border border-[#D0D5DD] bg-[#F8FAFC] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-normal text-[#667085]">{isAreaMap ? "EMY Map View" : "EMY Directions"}</p>
                <p className="mt-1 break-words text-[17px] font-black leading-6 text-[#001B47]">{isAreaMap ? <>{origin} <span className="text-orange-500">nearby</span> businesses</> : <>{origin} <span className="text-orange-500">to</span> {destination || result.business || "destination"}</>}</p>
              </div>
              <span className={"inline-flex min-h-[30px] items-center rounded-full px-3 text-[11px] font-black uppercase tracking-normal " + (unavailable ? "bg-[#F2F4F7] text-[#667085]" : "bg-[#ECFDF3] text-[#067647]")}>{unavailable ? (isAreaMap ? "Map unavailable" : "Location needed") : (isAreaMap ? "Area ready" : "Ready in EMY Maps")}</span>
            </div>
            {isAreaMap && (
              <AskEmyInlineMap result={result} origin={origin} radiusLabel={radiusLabel} businessCount={businessCount} businessNames={mapBusinessNames} onOpen={() => setChoiceOpen(true)} />
            )}
            <p className="mt-3 text-sm font-semibold leading-5 text-[#475467]">{unavailable ? (isAreaMap ? "Ask EMY can show this map once a search location is available." : "Add a saved address or map pin before EMY can open directions.") : (isAreaMap ? "This preview shows your Ask EMY map area here first. Use the full map only when you want GPS, expand map, or directions." : "Open this in the EMY map direction tool to choose walking, driving, public transport, or nearby options.")}</p>
          </div>

          {result.desc && <p className="text-sm font-semibold leading-5 text-[#475467]">{result.desc}</p>}
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {routeDetails.map((item) => (
              <div key={item.label} className="min-w-0 rounded-md border border-[#E4E7EC] bg-[#F8FAFC] px-3 py-2">
                <p className="text-[10px] font-black uppercase tracking-normal text-[#98A2B3]">{item.label}</p>
                <p className="mt-1 break-words text-sm font-black leading-5 text-[#001B47]">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {clickable ? <button type="button" data-ask-card-action="true" onClick={showOpenChoiceFromAction} className={"inline-flex min-h-[40px] items-center rounded-full px-4 text-sm font-black shadow-sm transition " + visual.cta}>{actionLabel}<span className="ml-2" aria-hidden="true">{">"}</span></button> : <span className="inline-flex min-h-[38px] items-center rounded-full bg-[#F2F4F7] px-4 text-sm font-black text-[#667085]">Location needed</span>}
            <div data-ask-card-action="true" onClick={(event) => event.stopPropagation()}>
              <ResponseActions result={result} text={formatResultForAction(result)} title={result.name} label="result" className="flex items-center gap-2 overflow-visible" />
            </div>
          </div>
        </div>
        {modalLayer}
      </article>
    );
  }
  if (isProduct) {
    const dateLabel = formatAskProductDate(result.date);
    const nearbyLabel = askProductNearbyLabel(result);
    const availabilityLabel = askProductAvailabilityLabel(result);
    const likeCount = askResultCountValue(result.likeCount, result.likes);
    const savedCount = askResultCountValue(result.saveCount, result.saved);
    const viewCount = askResultCountValue(result.viewCount, result.views);
    const commentCount = askResultCountValue(result.commentCount, result.comments);
    const statItems = [
      askResultStatLabel(likeCount, "like", "likes"),
      askResultStatLabel(savedCount, "saved", "saved"),
      viewCount ? askResultStatLabel(viewCount, "view", "views") : "",
      commentCount ? askResultStatLabel(commentCount, "comment", "comments") : "",
    ].filter(Boolean);
    const likeLabel = "Like Product " + String(likeCount);
    const openProductHere = (event) => {
      const target = event && event.target;
      if (target && target.closest && target.closest("a,button,input,textarea,select,[data-ask-card-action]")) return;
      askStopOpenEvent(event);
      askOpenAfterCurrentClick(() => {
        askOpenNativeProductDetail(result);
      });
    };
    return (
      <article
        role="button"
        tabIndex={0}
        onClick={openProductHere}
        onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") openProductHere(event); }}
        aria-label={"Open product details " + (result.name || "product")}
        className={"group relative flex min-h-[220px] w-full cursor-pointer flex-col overflow-visible rounded-lg border border-[#001B47]/10 bg-white text-left shadow-lg shadow-[#001B47]/5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10"}
      >
        <div className="relative mx-2 mt-2 aspect-[16/10] overflow-hidden rounded-md bg-[#EEF2F7]">
          <AskProductMedia result={result} />
          <button
            type="button"
            data-ask-card-action="true"
            aria-label="More options"
            onClick={(event) => event.stopPropagation()}
            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/85 text-base font-black leading-none text-[#667085] shadow-lg shadow-[#001B47]/15 backdrop-blur"
          >
            ...
          </button>
        </div>
        <div className="flex flex-1 flex-col px-3 pb-3 pt-3">
          <h3 className="break-words text-[17px] font-black leading-[1.15] tracking-normal text-[#001B47]">{result.name}</h3>
          {result.desc && <p className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-[#667085]">{result.desc}</p>}
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex min-h-[24px] items-center rounded-full bg-orange-50 px-2.5 text-xs font-black text-orange-500">{nearbyLabel}</span>
            <AskOwnerBadge result={result} />
          </div>
          <div className="mt-2 inline-flex items-start gap-2 text-[15px] font-black leading-5 text-[#079455]">
            <span className="mt-[4px] h-2.5 w-2.5 shrink-0 rounded-full bg-[#20C987] shadow-[0_0_0_3px_rgba(32,201,135,.14)]" aria-hidden="true"></span>
            <span>{availabilityLabel}</span>
          </div>
          {result.price && <div className="mt-2 inline-flex min-h-[30px] w-fit items-center rounded-full bg-orange-50 px-3 text-[16px] font-black text-[#D85A00]">{result.price}</div>}
          {statItems.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {statItems.map((item) => (
                <span key={item} className="inline-flex min-h-[22px] items-center rounded-full bg-[#F3F6FB] px-2 text-[11px] font-black text-[#667085]">{item}</span>
              ))}
            </div>
          )}
          <div className="mt-auto flex items-end justify-between gap-3 pt-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                data-ask-card-action="true"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex min-h-[34px] items-center gap-2 rounded-full border border-orange-200 bg-white px-3 text-xs font-black text-[#D85A00] shadow-[0_12px_24px_rgba(255,106,0,.10)]"
              >
                <span className="flex h-4 w-4 items-center justify-center text-orange-500" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.4]"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3"/><path d="M9.4 14.2c1.7 1.2 3.5 1.2 5.2 0"/></svg>
                </span>
                {likeLabel}
              </button>
              {clickable && (
                <button
                type="button"
                data-ask-card-action="true"
                  onClick={(event) => {
                    askStopOpenEvent(event);
                    askOpenAfterCurrentClick(() => {
                      askOpenNativeProductDetail(result);
                    });
                  }}
                  className="inline-flex min-h-[34px] items-center rounded-full bg-orange-500 px-3 text-xs font-black text-white shadow-sm transition hover:bg-orange-600"
                >
                  View product <span className="ml-2" aria-hidden="true">{">"}</span>
                </button>
              )}
            </div>
            {dateLabel && <span className="shrink-0 text-right text-sm font-black text-[#98A2B3]">{dateLabel}</span>}
          </div>
        </div>
        {modalLayer}
      </article>
    );
  }
  if (type === "business") {
    const visual = askResultVisualConfig(type);
    const actionLabel = resultOpenLabel(type);
    const coverCandidate = result.coverImage || result.image || "";
    const videoSrc = result.video || (askResultMediaIsVideo(coverCandidate, result.mediaType) ? coverCandidate : "");
    const coverImage = videoSrc ? "" : coverCandidate;
    const profileImage = result.profileImage || (!videoSrc && !coverImage ? result.image : "");
    const dateLabel = formatAskProductDate(result.date);
    const initials = String(result.name || "B").trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase() || "B";
    const recentActivity = String(result.recentActivity || "").trim();
    const businessDescription = String(result.businessDescription || result.desc || "").trim();
    const businessOffer = String(result.businessOffer || "").trim();
    const statusState = askResultBusinessStatus(result);
    const businessLikeCount = askResultCountValue(result.businessLikeCount, result.businessLikes, result.likedBusinessCount, result.likeCount, result.likes);
    const showRecentActivity = recentActivity && recentActivity.toLowerCase() !== businessDescription.toLowerCase();
    const detailItems = [
      { label: "Area", value: result.address || result.place },
      { label: "Status", value: statusState.label },
      { label: "Business likes", value: businessLikeCount ? askResultStatLabel(businessLikeCount, "business like", "business likes") : "" },
      { label: "Category", value: result.category },
      { label: "Phone", value: result.phone },
      { label: "Email", value: result.email },
      { label: "Website", value: result.website },
      { label: "Opening hours", value: result.openingHours },
      { label: "Updated", value: dateLabel },
      { label: "Media", value: videoSrc ? "Video available" : coverImage || profileImage ? "Images available" : "" },
    ].filter((item) => String(item.value || "").trim()).slice(0, 8);
    return (
      <article
        role={clickable ? "link" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={openResult}
        onKeyDown={openResultWithKeyboard}
        aria-label={clickable ? actionLabel + " " + result.name : undefined}
        className={"group relative flex min-h-[342px] w-full flex-col overflow-hidden rounded-lg border border-[#001B47]/10 bg-white text-left shadow-lg shadow-[#001B47]/5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10" + (clickable ? " cursor-pointer" : "")}
      >
        <div className="relative h-36 overflow-hidden bg-[#EEF2F7]">
          {videoSrc ? (
            <video src={videoSrc} muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
          ) : coverImage ? (
            <img src={coverImage} alt={result.name} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,106,0,.24),transparent_32%),linear-gradient(135deg,#FFF4E8_0%,#F8FAFC_55%,#EEF4FF_100%)]" aria-hidden="true"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001B47]/30 via-transparent to-transparent" aria-hidden="true"></div>
          <span className={"absolute right-4 top-4 inline-flex min-h-[28px] items-center rounded-full px-3 text-[11px] font-black uppercase tracking-normal " + visual.badge}>{visual.label}</span>
        </div>
        <div className="relative flex flex-1 flex-col px-5 pb-5 pt-8">
          <div className="absolute -top-9 left-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-orange-50 text-xl font-black text-orange-600 shadow-lg shadow-[#001B47]/10">
            {profileImage ? <img src={profileImage} alt={result.name} className="h-full w-full object-cover" /> : <span>{initials}</span>}
          </div>
          <div className="min-w-0 pr-2">
            <h3 className="break-words text-[21px] font-black leading-[1.12] text-[#001B47]">{result.name}</h3>
            {result.place && <p className="mt-2 text-sm font-black text-orange-600">{result.place}</p>}
            {(result.isOwnedByViewer || result.isCustomerOfViewer || result.isFollowedByViewer) && <div className="mt-2"><AskOwnerBadge result={result} /></div>}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={"inline-flex min-h-[28px] items-center rounded-full px-3 text-xs font-black ring-1 " + statusState.className}>{statusState.label}</span>
            {statusState.detail && <span className="inline-flex min-h-[28px] max-w-full items-center rounded-full bg-[#F8FAFC] px-3 text-xs font-black text-[#001B47]/70 ring-1 ring-[#E4E7EC]">{statusState.detail}</span>}
            {businessLikeCount > 0 && <span className="inline-flex min-h-[28px] items-center rounded-full bg-orange-50 px-3 text-xs font-black text-orange-600 ring-1 ring-orange-100">{askResultStatLabel(businessLikeCount, "business like", "business likes")}</span>}
          </div>
          {businessDescription && <p className="mt-3 line-clamp-3 text-sm font-semibold leading-5 text-[#475467]">{businessDescription}</p>}
          {businessOffer && (
            <div className="mt-3 rounded-md border border-[#E4E7EC] bg-[#F8FAFC] px-3 py-2">
              <p className="text-[10px] font-black uppercase tracking-normal text-[#667085]">What they offer</p>
              <p className="mt-1 line-clamp-3 text-sm font-semibold leading-5 text-[#001B47]">{businessOffer}</p>
            </div>
          )}
          {showRecentActivity && (
            <div className="mt-3 rounded-md border border-orange-100 bg-orange-50/70 px-3 py-2">
              <p className="text-[10px] font-black uppercase tracking-normal text-orange-600">Recent update</p>
              <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-[#001B47]">{recentActivity}</p>
            </div>
          )}
          {detailItems.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              {detailItems.map((item) => (
                <div key={item.label} className="min-w-0 border-t border-[#E4E7EC] pt-2">
                  <p className="text-[10px] font-black uppercase tracking-normal text-[#98A2B3]">{item.label}</p>
                  <p className="mt-1 break-words text-sm font-black leading-5 text-[#001B47]">{item.value}</p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            {clickable ? <button type="button" data-ask-card-action="true" onClick={showOpenChoiceFromAction} className={"inline-flex min-h-[40px] items-center rounded-full px-4 text-sm font-black shadow-sm transition " + visual.cta}>{actionLabel}<span className="ml-2" aria-hidden="true">{">"}</span></button> : <span></span>}
            <div data-ask-card-action="true" onClick={(event) => event.stopPropagation()}>
              <ResponseActions result={result} text={formatResultForAction(result)} title={result.name} label="result" className="flex items-center gap-2 overflow-visible" />
            </div>
          </div>
        </div>
        {modalLayer}
      </article>
    );
  }
  if (type === "clip" || type === "reel") {
    const visual = askResultVisualConfig(type);
    const actionLabel = clickable ? "Open clip view" : "Clip location needed";
    const dateLabel = formatAskProductDate(result.date);
    const likeCount = askResultCountValue(result.likeCount, result.likes);
    const viewCount = askResultCountValue(result.viewCount, result.views);
    const commentCount = askResultCountValue(result.commentCount, result.comments);
    const businessName = result.business || result.name || "Business clip";
    const initials = String(businessName || "B").trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase() || "B";
    const statItems = [
      viewCount ? askResultStatLabel(viewCount, "view", "views") : "",
      likeCount ? askResultStatLabel(likeCount, "like", "likes") : "",
      commentCount ? askResultStatLabel(commentCount, "comment", "comments") : "",
      dateLabel,
    ].filter(Boolean);
    const playClipHere = (event) => {
      askStopOpenEvent(event);
      askCloseResultOverlays();
      pauseCardVideos();
      setChoiceOpen(false);
      askOpenAfterCurrentClick(() => {
        askOpenNativeClipViewer(result);
      });
    };
    return (
      <article
        ref={cardRef}
        data-ask-clip-card="true"
        className="group relative isolate mx-auto flex w-full max-w-[340px] flex-col overflow-hidden rounded-xl border border-[#001B47]/10 bg-white text-left shadow-xl shadow-[#001B47]/10 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-[#001B47]/12"
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={"Play clip here " + (result.name || businessName)}
          onClick={playClipHere}
          onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); playClipHere(event); } }}
          className="relative aspect-[9/14] min-h-[420px] overflow-hidden bg-black text-white"
        >
          <div data-ask-card-action="true" onClick={(event) => event.stopPropagation()} className="absolute inset-0">
            <AskResultInlineMedia
              result={result}
              label="Clip preview"
              alwaysShow
              fit="cover"
              onVideoPlay={() => { setClipPlaying(true); setClipOverlayDismissed(true); }}
              onVideoPause={() => setClipPlaying(false)}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.32)_0%,rgba(0,0,0,0)_34%,rgba(0,0,0,0)_66%,rgba(0,0,0,.22)_100%)]" aria-hidden="true"></div>
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/80 bg-white/20 text-sm font-black text-white shadow-lg shadow-[#001B47]/30 backdrop-blur" aria-hidden="true">
                {result.profileImage ? <img src={result.profileImage} alt="" className="h-full w-full object-cover" /> : initials}
              </span>
              <span className="min-w-0">
                <strong className="block truncate text-sm font-black leading-tight text-white drop-shadow">{businessName}</strong>
                <small className="block truncate text-[11px] font-bold leading-tight text-white/82">{result.category || result.mediaType || "Business clip"}</small>
              </span>
            </div>
            <span className="inline-flex min-h-[28px] shrink-0 items-center rounded-full bg-white/92 px-3 text-[11px] font-black uppercase tracking-normal text-[#4A1FB8] shadow-lg shadow-[#001B47]/15">{visual.label}</span>
          </div>
          {!clipPlaying && !clipOverlayDismissed && (
            <button
              type="button"
              data-ask-card-action="true"
              onClick={playClipHere}
              className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[#061F4B] shadow-2xl shadow-[#001B47]/30 backdrop-blur transition group-hover:scale-105"
              aria-label="Play clip here"
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-current" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z" /></svg>
            </button>
          )}
        </div>
        <div className="grid gap-3 px-4 pb-4 pt-3 text-[#001B47]">
          <div className="min-w-0">
            <h3 className="break-words text-[18px] font-black leading-[1.12] tracking-normal">{result.name || "Business clip"}</h3>
            {result.desc && <p className="mt-1 line-clamp-2 text-[13px] font-bold leading-[1.35] text-[#667085]">{result.desc}</p>}
          </div>
          {(result.isOwnedByViewer || result.isCustomerOfViewer || result.isFollowedByViewer) && <div><AskOwnerBadge result={result} compact /></div>}
          {statItems.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {statItems.map((item) => (
                <span key={item} className="rounded-full bg-[#F3F6FB] px-2.5 py-1 text-[11px] font-black text-[#667085]">
                  {item}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E4E7EC] pt-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                data-ask-card-action="true"
                onClick={playClipHere}
                className="inline-flex min-h-[36px] items-center rounded-full bg-[#001B47] px-4 text-xs font-black text-white shadow-sm transition hover:bg-[#062B63]"
              >
                Play here
              </button>
              {clickable ? <button type="button" data-ask-card-action="true" onClick={showOpenChoiceFromAction} className="inline-flex min-h-[36px] items-center rounded-full bg-[#6938EF] px-4 text-xs font-black text-white shadow-sm transition hover:bg-[#5925DC]">{actionLabel}<span className="ml-2" aria-hidden="true">{">"}</span></button> : <span className="inline-flex min-h-[36px] items-center rounded-full bg-[#F2F4F7] px-4 text-xs font-black text-[#667085]">Clip location needed</span>}
            </div>
            <div data-ask-card-action="true" onClick={(event) => event.stopPropagation()} className="rounded-full bg-[#F8FAFC] px-1.5 py-1">
              <ResponseActions result={result} text={formatResultForAction(result)} title={result.name} label="result" className="flex items-center gap-1.5 overflow-visible" />
            </div>
          </div>
        </div>
        {modalLayer}
      </article>
    );
  }
  if (type === "job") {
    const visual = askResultVisualConfig(type);
    const actionLabel = resultOpenLabel(type);
    const dateLabel = formatAskProductDate(result.date);
    const jobLocation = result.jobLocation || result.place || "Location to confirm";
    const employment = result.employment || result.category || "";
    const workplace = result.workplace || "";
    const experience = result.experience || "";
    const apply = result.apply || "Message this business on EMY";
    const applicants = result.applicants || "";
    const extraNote = String(result.notes || "").trim();
    const showExtraNote = extraNote && extraNote.toLowerCase() !== String(result.desc || "").trim().toLowerCase();
    const similarLabel = String(result.similarListingLabel || "").trim();
    const similarNote = String(result.similarListingNote || "").trim();
    const detailItems = [
      { label: "Location", value: jobLocation },
      { label: "Employment", value: employment },
      { label: "Workplace", value: workplace },
      { label: "Experience", value: experience },
      { label: "Applicants", value: applicants },
      { label: "Posted", value: dateLabel },
    ].filter((item) => String(item.value || "").trim());
    return (
      <article
        role={clickable ? "link" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={openResult}
        onKeyDown={openResultWithKeyboard}
        aria-label={clickable ? actionLabel + " " + result.name : undefined}
        className={"group relative flex w-full flex-col overflow-visible rounded-lg border border-[#001B47]/10 bg-white text-left shadow-lg shadow-[#001B47]/5 transition hover:-translate-y-0.5 hover:border-[#155EEF]/25 hover:shadow-xl hover:shadow-[#155EEF]/10" + (clickable ? " cursor-pointer" : "")}
      >
        <div className={"absolute inset-x-0 top-0 h-1.5 " + visual.bar} aria-hidden="true"></div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <span className={"flex h-12 w-12 shrink-0 items-center justify-center rounded-lg " + visual.icon} aria-hidden="true">
              <AskResultTypeGlyph type={type} className="h-6 w-6" />
            </span>
            <span className={"inline-flex min-h-[28px] shrink-0 items-center rounded-full px-3 text-[11px] font-black uppercase tracking-normal " + visual.badge}>{visual.label}</span>
          </div>
          <div className="mt-4 min-w-0">
            <h3 className="break-words text-[20px] font-black leading-[1.15] text-[#001B47]">{result.jobTitle || result.name}</h3>
            {result.business && <p className="mt-1 text-xs font-black uppercase tracking-normal text-[#667085]">{result.business}</p>}
            {(result.isOwnedByViewer || result.isCustomerOfViewer || result.isFollowedByViewer) && <div className="mt-2"><AskOwnerBadge result={result} compact /></div>}
          </div>
          {similarLabel && (
            <div className="mt-3 rounded-md border border-[#155EEF]/15 bg-[#EFF4FF] px-3 py-2">
              <p className="text-[10px] font-black uppercase tracking-normal text-[#155EEF]">{similarLabel}</p>
              {similarNote && <p className="mt-1 text-xs font-semibold leading-5 text-[#001B47]">{similarNote}</p>}
            </div>
          )}
          {askResultHasMedia(result) && (
            <div data-ask-card-action="true" onClick={(event) => event.stopPropagation()} className="relative mt-4 aspect-[16/7] overflow-hidden rounded-lg bg-[#EEF4FF] ring-1 ring-[#155EEF]/10">
              <AskResultInlineMedia result={result} label="Job media" fit="cover" />
            </div>
          )}
          {result.desc && <p className="mt-3 line-clamp-3 text-sm font-semibold leading-5 text-[#475467]">{result.desc}</p>}
          {detailItems.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              {detailItems.map((item) => (
                <div key={item.label} className="min-w-0 border-t border-[#E4E7EC] pt-2">
                  <p className="text-[10px] font-black uppercase tracking-normal text-[#98A2B3]">{item.label}</p>
                  <p className="mt-1 break-words text-sm font-black leading-5 text-[#001B47]">{item.value}</p>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 border-l-4 border-[#155EEF] bg-[#F8FAFC] py-2 pl-3 pr-2">
            <p className="text-[10px] font-black uppercase tracking-normal text-[#98A2B3]">Apply method</p>
            <p className="mt-1 break-words text-sm font-black leading-5 text-[#001B47]">{apply}</p>
          </div>
          {showExtraNote && (
            <div className="mt-3 rounded-md border border-[#E4E7EC] bg-white px-3 py-2">
              <p className="text-[10px] font-black uppercase tracking-normal text-[#98A2B3]">Notes</p>
              <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-[#667085]">{extraNote}</p>
            </div>
          )}
          <div className="mt-5 flex items-center justify-between gap-3">
            {clickable ? <button type="button" data-ask-card-action="true" onClick={showOpenChoiceFromAction} className={"inline-flex min-h-[40px] items-center rounded-full px-4 text-sm font-black shadow-sm transition " + visual.cta}>{actionLabel}<span className="ml-2" aria-hidden="true">{">"}</span></button> : <span></span>}
            <div data-ask-card-action="true" onClick={(event) => event.stopPropagation()}>
              <ResponseActions result={result} text={formatResultForAction(result)} title={result.name} label="result" className="flex items-center gap-2 overflow-visible" />
            </div>
          </div>
        </div>
        {modalLayer}
      </article>
    );
  }
  const visual = askResultVisualConfig(type);
  const secondaryTags = (result.tags || []).filter((tag) => !meta.some((item) => item.toLowerCase() === String(tag).toLowerCase())).slice(0, 3);
  const actionLabel = resultOpenLabel(type);
  return (
    <article
      role={clickable ? "link" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={openResult}
      onKeyDown={openResultWithKeyboard}
      aria-label={clickable ? actionLabel + " " + result.name : undefined}
      className={"group relative flex min-h-[226px] w-full flex-col overflow-visible rounded-lg border border-[#001B47]/10 bg-white text-left shadow-lg shadow-[#001B47]/5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-xl hover:shadow-[#001B47]/10" + (clickable ? " cursor-pointer" : "")}
    >
      <div className={"absolute inset-x-0 top-0 h-1.5 " + visual.bar} aria-hidden="true"></div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <span className={"flex h-12 w-12 shrink-0 items-center justify-center rounded-lg " + visual.icon} aria-hidden="true">
            <AskResultTypeGlyph type={type} className="h-6 w-6" />
          </span>
          <span className={"inline-flex min-h-[28px] shrink-0 items-center rounded-full px-3 text-[11px] font-black uppercase tracking-normal " + visual.badge}>{visual.label}</span>
        </div>
        {askResultHasMedia(result) && (
          <div data-ask-card-action="true" onClick={(event) => event.stopPropagation()} className="relative mt-4 h-36 overflow-hidden rounded-md bg-[#F5F7FB] ring-1 ring-[#001B47]/5">
            <AskResultInlineMedia result={result} label={visual.label + " media"} controls fit={type === "event" ? "cover" : "contain"} />
          </div>
        )}
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="break-words text-[18px] font-black leading-[1.15] text-[#001B47]">{result.name}</h3>
            {result.business && result.business !== result.name && <p className="mt-1 text-xs font-black uppercase tracking-normal text-[#667085]">{result.business}</p>}
            {(result.isOwnedByViewer || result.isCustomerOfViewer || result.isFollowedByViewer) && <div className="mt-2"><AskOwnerBadge result={result} compact /></div>}
          </div>
          {result.price && <p className="shrink-0 rounded-full bg-[#001B47] px-3 py-1.5 text-xs font-black text-white">{result.price}</p>}
        </div>
        {result.desc && <p className="mt-3 line-clamp-3 text-sm font-semibold leading-5 text-[#667085]">{result.desc}</p>}
        {meta.length > 0 && <div className="mt-4 flex flex-wrap gap-2">
          {meta.map((item) => (
            <span key={item} className={"rounded-full px-2.5 py-1 text-[11px] font-bold " + visual.chip}>
              {item}
            </span>
          ))}
        </div>}
        {secondaryTags.length > 0 && <div className="mt-2 flex flex-wrap gap-2">
          {secondaryTags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#F8FAFC] px-2.5 py-1 text-[10px] font-black text-[#667085]">
              {tag}
            </span>
          ))}
        </div>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {clickable ? <button type="button" data-ask-card-action="true" onClick={showOpenChoiceFromAction} className={"inline-flex min-h-[38px] items-center rounded-full px-4 text-sm font-black shadow-sm transition " + visual.cta}>{actionLabel}<span className="ml-2" aria-hidden="true">{">"}</span></button> : <span></span>}
          <div data-ask-card-action="true" onClick={(event) => event.stopPropagation()}>
            <ResponseActions result={result} text={formatResultForAction(result)} title={result.name} label="result" className="flex items-center gap-2 overflow-visible" />
          </div>
        </div>
      </div>
      {modalLayer}
    </article>
  );
}

function makeReply`
    );
    code = code.replace(
      /function makeReply\(query\) \{[\s\S]*?\r?\n\}/,
      String.raw`function askResultLooksLikePlaceholderText(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return true;
  if (askResultIsSystemCardText(text)) return true;
  const compact = text.replace(/[^a-z0-9]+/g, "");
  if (!compact) return true;
  if (/^(test|testing|demo|dummy|sample|placeholder|lorem|ipsum|asdf|qwer|qwerty|foo|bar|blah|none|null|undefined|product|post|clip|item|ddaas)$/i.test(compact)) return true;
  if (/^([a-z0-9])\1{1,}$/i.test(compact)) return true;
  if (/^[a-z]{1,2}$/i.test(compact)) return true;
  if (/\b(gjh|qwd|hjkl|asdf|qwerty|pjnh|iuo|lnih|hbbid|ddaas)\b/i.test(text)) return true;
  return text.split(/[^a-z0-9]+/).filter(Boolean).some((word) => word.length >= 7 && /[a-z]/i.test(word) && /[bcdfghjklmnpqrstvwxyz]{5,}/i.test(word));
}

function askResultIsSystemCardText(value) {
  return /^(your post was published|clip upload completed|post upload completed|upload completed|new clip|new post)[\s.!?]*$/i.test(String(value || "").trim());
}

function askResultLooksLikeWeakDescription(value) {
  const text = String(value || "").trim();
  if (!text) return true;
  if (askResultIsSystemCardText(text)) return true;
  if (/^[£$€]?\s*[\d,.\s]+%?$/i.test(text)) return true;
  return text.length <= 3 && askResultLooksLikePlaceholderText(text);
}

function normaliseAskResult(result, index = 0) {
  const name = result?.name || result?.title || result?.business || "";
  const rawDesc = result?.desc || result?.description || result?.summary || "";
  const type = result?.type || "";
  if (["product", "job", "event", "service"].includes(String(type).toLowerCase()) && askResultLooksLikePlaceholderText(name)) return null;
  const businessDescriptionRaw = String(type).toLowerCase() === "business"
    ? (result?.businessDescription || result?.profileDescription || result?.aboutBusiness || result?.about || result?.bio || rawDesc || "")
    : "";
  const businessDescription = businessDescriptionRaw && !askResultLooksLikeWeakDescription(businessDescriptionRaw) ? String(businessDescriptionRaw) : "";
  const businessOfferRaw = String(type).toLowerCase() === "business"
    ? (result?.businessOffer || result?.businessOffers || result?.whatTheyOffer || result?.whatWeOffer || result?.offer || result?.offers || result?.servicesOffered || result?.businessServices || result?.services || result?.serviceDescription || result?.emyService || result?.service || result?.serviceName || "")
    : "";
  const businessOffer = businessOfferRaw && !askResultLooksLikeWeakDescription(businessOfferRaw) && String(businessOfferRaw).toLowerCase() !== String(businessDescription).toLowerCase() ? String(businessOfferRaw) : "";
  const desc = String(type).toLowerCase() === "business"
    ? businessDescription
    : askResultLooksLikeWeakDescription(rawDesc) ? "" : rawDesc;
  const mediaItems = Array.isArray(result?.mediaItems) ? result.mediaItems : [];
  const profileImage = result?.profileImage || result?.profileImageUrl || result?.avatar || result?.avatarUrl || result?.avatarSrc || result?.logo || result?.logoUrl || "";
  const coverImage = result?.coverImage || result?.coverImageUrl || result?.cover || result?.coverUrl || result?.coverSrc || result?.bannerImage || result?.bannerImageUrl || "";
  const imageRef = result?.imageRef || result?.mediaRef || result?.photoRef || result?.thumbnailRef || mediaItems.map((item) => item && (item.ref || item.imageRef || item.mediaRef || item.photoRef)).find(Boolean) || "";
  const posterRef = result?.posterRef || result?.videoPosterRef || mediaItems.map((item) => item && (item.posterRef || item.videoPosterRef)).find(Boolean) || "";
  const image = result?.image || result?.imageUrl || result?.imageSrc || result?.photo || result?.photoUrl || result?.thumbnail || result?.mediaSrc || result?.detailMediaSrc || result?.posterSrc || result?.thumbnailSrc || mediaItems.map((item) => item && (item.src || item.image || item.imageUrl || item.mediaSrc || item.thumbnailSrc || item.posterSrc)).find(Boolean) || coverImage || profileImage || "";
  const video = result?.video || result?.videoUrl || result?.videoSrc || result?.clipUrl || result?.clipSrc || (askResultMediaIsVideo(image, result?.mediaType || result?.contentType || result?.kind) ? image : "");
  if (String(type).toLowerCase() === "business" && String(name).trim().toLowerCase() === "emy" && !desc && !result?.place && !result?.location && !result?.category && !image) return null;
  if (!name && !desc) return null;
  return {
    id: result?.id || result?.uid || "ask-result-" + index,
    viewSpec: result?.viewSpec && typeof result.viewSpec === "object" ? result.viewSpec : null,
    productId: result?.productId || result?.detailProductId || result?.itemId || "",
    productKey: result?.productKey || result?.detailProductKey || result?.itemKey || "",
    productName: result?.productName || result?.productTitle || result?.itemTitle || "",
    name: name || "Saved EMY record",
    business: result?.business || result?.businessName || result?.ownerName || "",
    businessKey: result?.businessKey || result?.profileKey || result?.key || "",
    place: result?.place || result?.location || "",
    desc,
    price: result?.price || result?.priceText || "",
    image,
    imageRef,
    mediaRef: imageRef,
    posterRef,
    profileImage,
    coverImage,
    video,
    url: result?.url || result?.href || result?.link || "",
    mapUrl: result?.mapUrl || "",
    directionsUrl: result?.directionsUrl || "",
    mapMode: result?.mapMode || result?.mode || "",
    origin: result?.origin || "",
    destination: result?.destination || "",
    radius: result?.radius || result?.searchRadius || "",
    businessCount: result?.businessCount || result?.businessesCount || "",
    businessesWithLocations: result?.businessesWithLocations || result?.businessesWithPins || result?.locationCount || "",
    missingLocationCount: result?.missingLocationCount || result?.businessesMissingLocations || "",
    businesses: Array.isArray(result?.businesses) ? result.businesses.slice(0, 8) : [],
    businessMarkers: Array.isArray(result?.businessMarkers) ? result.businessMarkers.slice(0, 8) : [],
    locationLabel: result?.locationLabel || "",
    locationSource: result?.locationSource || "",
    latitude: result?.latitude || result?.lat || "",
    longitude: result?.longitude || result?.lng || result?.lon || "",
    mapUnavailable: Boolean(result?.mapUnavailable || result?.locationMissing),
    type,
    category: result?.category || "",
    availability: result?.availability || "",
    date: result?.date || result?.time || "",
    mediaType: result?.mediaType || "",
    businessDescription,
    businessOffer,
    phone: result?.phone || result?.phoneNumber || result?.mobile || result?.mobileNumber || "",
    email: result?.email || result?.contactEmail || result?.businessEmail || "",
    website: result?.website || result?.site || result?.businessWebsite || "",
    address: result?.address || result?.businessAddress || "",
    openingHours: result?.openingHours || result?.businessHours || result?.hours || result?.workingHours || result?.workingDays || result?.openingTimes || "",
    openStatus: result?.openStatus || result?.statusText || result?.businessStatus || result?.status || "",
    openStatusDetail: result?.openStatusDetail || result?.statusDetail || result?.nextOpeningTime || result?.nextClosingTime || "",
    businessLikeCount: result?.businessLikeCount || result?.businessLikes || result?.likedBusinessCount || "",
    recentActivity: result?.recentActivity || "",
    jobTitle: result?.jobTitle || "",
    jobLocation: result?.jobLocation || "",
    workplace: result?.workplace || "",
    employment: result?.employment || "",
    experience: result?.experience || "",
    apply: result?.apply || "",
    notes: result?.notes || result?.feedIntro || result?.shareText || "",
    applicants: result?.stats || (result?.applicants === 0 ? "0 applicants" : result?.applicants || ""),
    likes: result?.likes || "",
    likeCount: result?.likeCount || result?.countedLikeCount || result?.likes || "",
    saved: result?.saved || result?.saves || "",
    saveCount: result?.saveCount || result?.savedCount || result?.saved || result?.saves || "",
    views: result?.views || "",
    viewCount: result?.viewCount || result?.views || "",
    comments: result?.commentsCount || result?.commentCount || result?.comments || "",
    commentCount: result?.commentCount || result?.commentsCount || result?.comments || "",
    isOwnedByViewer: Boolean(result?.isOwnedByViewer || result?.ownedByViewer || result?.ownerNotice || result?.ownershipNotice),
    ownerNotice: result?.ownerNotice || result?.ownershipNotice || "",
    isFollowedByViewer: Boolean(result?.isFollowedByViewer || result?.followedByViewer || result?.followingByViewer || result?.viewerFollows),
    isCustomerOfViewer: Boolean(result?.isCustomerOfViewer || result?.customerOfViewer || result?.viewerIsCustomer),
    relationshipNotice: result?.relationshipNotice || result?.viewerRelationshipNotice || "",
    similarListingIndex: result?.similarListingIndex || "",
    similarListingCount: result?.similarListingCount || "",
    similarListingLabel: result?.similarListingLabel || "",
    similarListingNote: result?.similarListingNote || "",
    tags: Array.isArray(result?.tags) && result.tags.length ? result.tags.filter(Boolean).slice(0, 4) : [result?.type, result?.category, result?.availability].filter(Boolean).slice(0, 4),
  };
}

function askReadJsonStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    if (!value) return fallback;
    const parsed = JSON.parse(value);
    return parsed == null ? fallback : parsed;
  } catch (error) {
    return fallback;
  }
}

function askCollectFollowedBusinesses() {
  const rows = [];
  const add = (value, fallbackKey = "", relationshipSource = "") => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((entry, index) => add(entry, fallbackKey ? fallbackKey + "-" + index : "", relationshipSource));
      return;
    }
    if (typeof value === "object") {
      rows.push({ ...value, key: value.key || value.businessKey || fallbackKey, relationshipSource: value.relationshipSource || relationshipSource });
      return;
    }
    rows.push({ key: String(value), businessKey: String(value), name: String(value), following: relationshipSource !== "customer", isCustomer: relationshipSource === "customer", active: true, relationshipSource });
  };
  const customerBusinesses = askReadJsonStorage("emyCustomerBusinesses", {});
  if (Array.isArray(customerBusinesses)) customerBusinesses.forEach((row, index) => add(row, "customer-" + index, "customer"));
  else Object.keys(customerBusinesses || {}).forEach((key) => add(customerBusinesses[key], key, "customer"));
  const following = askReadJsonStorage("emyCustomerFollowing", []);
  if (Array.isArray(following)) following.forEach((row, index) => add(row, "following-" + index, "following"));
  else Object.keys(following || {}).forEach((key) => add(following[key], key, "following"));
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index) || "";
      if (key.indexOf("emyCustomerFollow:") === 0 && localStorage.getItem(key) === "1") {
        const businessKey = key.slice("emyCustomerFollow:".length);
        add({ key: businessKey, businessKey, following: true, active: true }, businessKey, "following");
      }
    }
  } catch (error) {}
  return rows.filter((row) => {
    const status = String([row.status, row.customerStatus, row.relationshipStatus, row.relationship].filter(Boolean).join(" ")).toLowerCase();
    if (row.removed === true || row.deleted === true || row.active === false || /\b(removed|deleted|blocked|rejected|declined|cancelled|inactive)\b/.test(status)) return false;
    return true;
  }).slice(0, 80);
}

function askCollectBusinessCustomers() {
  const rows = [];
  const add = (value, fallbackBusinessKey = "") => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((entry) => add(entry, fallbackBusinessKey));
      return;
    }
    if (typeof value === "object") {
      rows.push({
        key: value.key || value.customerKey || value.id || value.email || "",
        id: value.id || value.customerKey || value.key || "",
        businessKey: value.businessKey || fallbackBusinessKey || value.detailBusinessKey || "",
        businessName: value.businessName || value.business || "",
        business: value.business || value.businessName || "",
        customerKey: value.customerKey || value.key || value.id || "",
        customerName: value.customerName || value.name || value.displayName || "",
        customerEmail: value.customerEmail || value.email || "",
        status: value.status || value.customerStatus || value.relationshipStatus || "",
        customerStatus: value.customerStatus || "",
        relationshipStatus: value.relationshipStatus || "",
        active: value.active !== false,
        isCustomer: value.isCustomer !== false,
        connected: value.connected === true,
        following: value.following === true,
        accepted: value.accepted === true,
        approved: value.approved === true,
        customerSince: value.customerSince || value.acceptedAt || value.addedAt || value.createdAt || "",
        acceptedAt: value.acceptedAt || "",
        relationshipSource: "business-customer",
      });
      return;
    }
  };
  const addRowsFromStore = (key, fallbackBusinessKey = "") => {
    const value = askReadJsonStorage(key, null);
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.keys(value).forEach((rowKey) => add(value[rowKey], fallbackBusinessKey || key.replace(/^emyBusinessCustomers:?/i, "")));
      return;
    }
    add(value, fallbackBusinessKey);
  };
  addRowsFromStore("emyBusinessCustomers");
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index) || "";
      if (/^emyBusinessCustomers:/i.test(key)) addRowsFromStore(key, key.replace(/^emyBusinessCustomers:/i, ""));
    }
  } catch (error) {}
  const seen = new Set();
  return rows.filter((row) => {
    const status = String([row.status, row.customerStatus, row.relationshipStatus].filter(Boolean).join(" ")).toLowerCase();
    if (row.active === false || row.removed === true || /\b(removed|deleted|blocked|rejected|declined|cancelled|inactive)\b/.test(status)) return false;
    const id = [row.businessKey, row.businessName, row.customerKey, row.customerEmail, row.customerName].join("|").toLowerCase();
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  }).slice(0, 120);
}

function askCollectCustomerSelfContent() {
  const rows = [];
  const user = typeof readStoredAskUser === "function" ? readStoredAskUser() : null;
  const identifiers = new Set();
  const addIdentifier = (value) => {
    const text = String(value || "").trim().toLowerCase();
    if (text) identifiers.add(text);
  };
  [
    user && user.id,
    user && user.uid,
    user && user.key,
    user && user.email,
    user && user.name,
    user && user.displayName,
    user && user.customerName,
    askReadJsonStorage("emyCustomerDisplayName", ""),
    askReadJsonStorage("emyCustomerEmail", ""),
    askReadJsonStorage("emyCustomerKey", ""),
    askReadJsonStorage("emyCustomerProfileKey", ""),
  ].forEach(addIdentifier);

  const rowText = (row, fields) => fields.map((field) => row && row[field]).filter(Boolean).join(" ").toLowerCase();
  const hasCustomerSignal = (row) => {
    if (!row || typeof row !== "object") return false;
    if (row.my === true || row.isUserPost === true || row.createdByCurrentAccount === true) return true;
    const owner = rowText(row, ["owner", "createdAs", "accountType", "actorType", "role", "authorRole", "ownerType", "postedByType", "createdByType"]);
    const source = rowText(row, ["source", "createdFrom", "origin"]);
    const href = String(row.profileHref || row.href || row.url || "").toLowerCase();
    const id = String(row.id || row.key || row.postId || row.clipId || row.feedId || "").toLowerCase();
    if (/\b(customer|client|buyer)\b/.test(owner)) return true;
    if (/\bcustomer\b/.test(source) || source === "customer-profile") return true;
    if (href.indexOf("emy-customer-profile") !== -1) return true;
    if (/^(customer-post-|user-feed-|customer-clip-|customer-upload-)/.test(id)) return true;
    const values = [
      row.customerKey,
      row.customerId,
      row.customerUid,
      row.customerEmail,
      row.customerName,
      row.userId,
      row.uid,
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
    ].map((value) => String(value || "").trim().toLowerCase()).filter(Boolean);
    return values.some((value) => identifiers.has(value));
  };
  const hasBusinessSignal = (row) => {
    if (!row || typeof row !== "object") return false;
    const owner = rowText(row, ["owner", "createdAs", "accountType", "actorType", "role", "authorRole", "ownerType", "postedByType", "createdByType"]);
    const source = rowText(row, ["source", "createdFrom", "origin"]);
    const href = String(row.profileHref || row.href || row.url || "").toLowerCase();
    const id = String(row.id || row.key || row.postId || row.clipId || row.feedId || "").toLowerCase();
    return owner.indexOf("business") !== -1
      || source.indexOf("business") !== -1
      || href.indexOf("emy-business-profile") !== -1
      || id.indexOf("business-") === 0;
  };
  const add = (value, sourceKey = "", forceCustomer = false) => {
    if (!value || rows.length >= 80) return;
    if (Array.isArray(value)) {
      value.forEach((entry) => add(entry, sourceKey, forceCustomer));
      return;
    }
    if (typeof value === "object") {
      if (Array.isArray(value.rows)) return add(value.rows, sourceKey, forceCustomer);
      if (Array.isArray(value.items)) return add(value.items, sourceKey, forceCustomer);
      if (value.data && typeof value.data === "object" && !value.title && !value.name && !value.text && !value.caption) return add(value.data, sourceKey, forceCustomer);
      const explicitCustomer = forceCustomer || hasCustomerSignal(value);
      if (!explicitCustomer || (hasBusinessSignal(value) && !forceCustomer)) return;
      rows.push({
        ...value,
        sourceKey,
        customerKey: value.customerKey || value.profileKey || (user && (user.key || user.uid || user.id)) || "",
        customerName: value.customerName || value.displayName || value.ownerName || value.authorName || (user && (user.name || user.displayName || user.customerName)) || "",
        customerEmail: value.customerEmail || value.email || value.ownerEmail || value.authorEmail || (user && user.email) || "",
        createdByCurrentAccount: true
      });
    }
  };

  ["emyCustomerUploads", "emyCustomerEvents", "emyCustomerClips", "emyCustomerReels", "emyCreatedClips"].forEach((key) => add(askReadJsonStorage(key, null), key, true));
  ["emyFeedCreatedPosts", "emyFeedCreatedClips", "emyFeedCreatedEvents", "emyFeedCreatedArticles", "emyCustomerSavedFeedItems", "emySavedFeedItems"].forEach((key) => add(askReadJsonStorage(key, null), key, false));

  const seen = new Set();
  return rows.filter((row) => {
    const id = String(row.id || row.key || row.postId || row.clipId || row.feedId || row.title || row.name || JSON.stringify(row).slice(0, 160)).toLowerCase();
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  }).slice(0, 80);
}

function askEmyFirstNameFromUser(user) {
  const cleanPart = (value) => String(value || "").trim().replace(/\s+/g, " ");
  const activeUser = user && typeof user === "object" ? user : {};
  const direct = cleanPart(activeUser.firstName || activeUser.customerFirstName || activeUser.givenName);
  const display = cleanPart(activeUser.displayName || activeUser.name || activeUser.profileName);
  const businessName = cleanPart(activeUser.businessName || activeUser.business);
  const candidate = direct || (display && display.toLowerCase() !== businessName.toLowerCase() ? display.split(" ")[0] : "");
  if (!candidate) return "";
  if (/^(emy|customer|business|account|test|user)$/i.test(candidate)) return "";
  return candidate.slice(0, 32);
}

function askEmyGreetingPrefix(context = {}) {
  const name = askEmyFirstNameFromUser(context.user || context.activeUser || (typeof readStoredAskUser === "function" ? readStoredAskUser() : null));
  return name ? "Hi " + name + "." : "Hi.";
}

function askEmyIsIdentityIntroQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (/\b(who are my|who is my|show me|find|search|list|near|nearby|directions?|map|customers?|products?|businesses?|jobs?|clips?|posts?|services?|events?)\b/.test(text)) return false;
  return /\b(who are you|who r you|what are you|tell me who you are|tell me about yourself|who is ask emy|what is ask emy|what can you do|what do you do|how can you help|what are you able to do)\b/.test(text);
}

function askEmyIsSimpleGreetingQuery(query) {
  return /^(hi|hello|hey|good morning|good afternoon|good evening)[.!?]*$/i.test(String(query || "").trim());
}

function askEmyHasRepeatedGreeting(query, context = {}) {
  if (!askEmyIsSimpleGreetingQuery(query)) return false;
  const current = String(query || "").trim().toLowerCase();
  const history = Array.isArray(context.history) ? context.history : [];
  const userGreetings = history
    .filter((message) => message && message.role === "user" && askEmyIsSimpleGreetingQuery(message.text))
    .map((message) => String(message.text || "").trim().toLowerCase());
  const includesCurrent = userGreetings.includes(current);
  return includesCurrent ? userGreetings.length > 1 : userGreetings.length > 0;
}

function askEmyGreetingHistoryCount(context = {}) {
  const history = Array.isArray(context.history) ? context.history : [];
  return history.filter((message) => message && message.role === "user" && askEmyIsSimpleGreetingQuery(message.text)).length;
}

function askEmyIsOpenConversationPrompt(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  return /^(tell me|tell me then|go on|go ahead|say it|sure tell me|ok tell me|okay tell me|yes tell me|what then)[.!?]*$/.test(text);
}

function askEmyIsConversationalFragmentQuery(query) {
  const text = String(query || "").toLowerCase().replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (/^(and you|in you|you|you then|what about you|how about you|ok|okay|yes|yeah|yep|no|nope|maybe|hmm|hm|huh|what|why|tell me|go on|go ahead)$/.test(text)) return true;
  const words = text.split(" ").filter(Boolean);
  if (!words.length || words.length > 3) return false;
  const fragmentWords = new Set(["i", "me", "my", "you", "your", "yours", "we", "us", "in", "on", "at", "to", "for", "with", "and", "or", "but", "then", "ok", "okay", "yes", "no", "what", "why"]);
  return words.every((word) => fragmentWords.has(word)) && words.some((word) => word === "you" || word === "me" || word === "i" || word === "what" || word === "why");
}

function askEmyIsOwnershipFollowUpQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (/^(show|find|search|list|open|get|give me)\b/.test(text)) return false;
  return /\b(are|is|were|was|do|does|did)\b[\s\S]{0,40}\b(they|these|those|them|it|this|that|products?|items?|cards?|results?)\b[\s\S]{0,80}\b(my|mine|your|owned|belong(?:s)? to me|from my|from your|my business|your business)\b/.test(text)
    || /\b(my|mine|your)\s+(products?|items?|cards?|results?)\b/.test(text) && /\b(are|is|they|these|those|them)\b/.test(text)
    || /\b(?:the\s+)?ones?\s+(?:i|we)\s+own\b/.test(text)
    || /\b(?:which|what)\s+(?:ones?|items?|records?|cards?|results?)\s+(?:are\s+)?(?:mine|my|ours?|owned|belong(?:s)? to me)\b/.test(text);
}

function askEmyLastHistoryResults(context = {}, type = "") {
  const target = String(type || "").toLowerCase();
  const history = Array.isArray(context.history) ? context.history : [];
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const message = history[index] || {};
    const results = Array.isArray(message.results) ? message.results : [];
    const typed = target ? results.filter((record) => String(record && record.type || "").toLowerCase() === target) : results;
    if (typed.length) return typed;
  }
  return [];
}

function askEmyOwnershipTypeFromText(value) {
  const text = askEmyBrowserNormalizeIntentText(value);
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

function askEmyRecentOwnershipContextType(context = {}) {
  const history = Array.isArray(context.history) ? context.history : [];
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const message = history[index] || {};
    const textType = askEmyOwnershipTypeFromText(message.text);
    if (textType) return textType;
    const results = Array.isArray(message.results) ? message.results : [];
    const types = Array.from(new Set(results.map((record) => String(record && record.type || "").toLowerCase()).filter(Boolean)));
    if (types.length === 1) return types[0];
  }
  return "";
}

function askEmyOwnershipFollowUpReply(query, context = {}) {
  const text = String(query || "").toLowerCase();
  const explicitType = askEmyOwnershipTypeFromText(text);
  const type = explicitType || askEmyRecentOwnershipContextType(context);
  if (!type) {
    return [
      "Do you mean your products, jobs, clips, posts, articles, events, or services?",
      "I will keep it separate\nTell me the type and I will show only that kind of owned content.\nFor example: my products, my clips, or my job posts."
    ].join("\n\n");
  }
  const results = askEmyLastHistoryResults(context, type);
  const owned = results.filter((record) => record && (record.isOwnedByViewer || record.ownedByViewer || record.ownerNotice));
  const noun = askEmyOwnershipTypeLabel(type);
  const businessNames = Array.from(new Set(owned.concat(results).map((record) => String(record && (record.business || record.businessName) || "").trim()).filter(Boolean))).slice(0, 2);
  const businessText = businessNames.length ? " from " + businessNames.join(" and ") : "";
  const contextLine = explicitType ? "I am looking only at your " + noun + "." : "I am treating that as your " + noun + ", because that is the current thread context.";
  if (owned.length) {
    return contextLine + " I found " + owned.length + " " + askEmyOwnershipCountLabel(owned.length, type) + businessText + ".\n\nWhat this means\nThese are content records under your business, not separate businesses themselves.\nI am not mixing in clips, posts, jobs, or articles unless you ask for them.\n\nNext\nOpen one card, ask me to compare them, or ask me to improve one listing.";
  }
  if (results.length) {
    return "I found " + results.length + " " + askEmyOwnershipCountLabel(results.length, type) + businessText + ", but none are marked as yours in this chat context.\n\nBetter next step\nAsk me to show your " + noun + " from your business, and I will search the business records directly.";
  }
  return "I cannot confirm that from the previous cards because I do not have their ownership marker in this follow-up context.\n\nBetter next step\nAsk me to show your " + noun + " only, and I will filter for records marked as your business.\nWhen cards are marked Your business, I should answer ownership questions directly instead of repeating the search.";
}

function askEmyIsExplicitRecordSearchQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (/^(get|bring|attract|win|reach)\s+(?:more\s+)?(?:customers?|clients?|sales|orders)\b/.test(text)) return false;
  if (/^(open|start|set up|setup|create|launch)\s+(?:a\s+|an\s+|my\s+|your\s+)?(?:business|shop|company|store|profile)\b/.test(text)) return false;
  if (/^(show me|show|find me|find|search|list|open|get|give me|display|browse|more)\b/.test(text)) return true;
  if (/^(map|directions?|route)\b/.test(text)) return true;
  if (/\b(near me|nearby|around me|directions?|map|route|within \d+\s*(?:km|kilometres?|kilometers?|miles?))\b/.test(text)) return true;
  return /^\b(products?|businesses?|jobs?|clips?|videos?|posts?|articles?|services?|events?)\b[\s\S]{0,80}\b(near|nearby|around|available|price|prices|cheap|cheapest|open|more)\b/.test(text);
}

function askEmyIsProductCreationGuidanceQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text) return false;
  const contentWord = /\b(products?|items?|stock|listings?)\b/.test(text);
  if (!contentWord) return false;
  if (/^(show|find|search|browse|more)\b/.test(text)) return false;
  if (/^list\s+(?:my\s+|the\s+|all\s+|available\s+)?products?\b/.test(text) && !/\b(new|create|add|publish|upload|for sale|listing)\b/.test(text)) return false;
  return /\b(create|add|upload|publish|post|list|make|draft|prepare|set up|setup)\b[\s\S]{0,90}\b(?:a\s+|an\s+|my\s+|new\s+|the\s+)?(?:products?|items?|stock|listings?)\b/.test(text)
    || /\b(?:products?|items?|stock|listings?)\b[\s\S]{0,90}\b(create|add|upload|publish|post|list|make|draft|prepare|set up|setup)\b/.test(text)
    || /\b(can you|could you|will you|would you|help me|i want to|i need to)\b[\s\S]{0,80}\b(?:products?|items?|stock|listings?)\b/.test(text) && /\b(create|add|upload|publish|post|list|make|draft|prepare|set up|setup)\b/.test(text);
}

function askEmyVagueProductNeedDetailTerms(query) {
  const stopWords = new Set([
    "a", "an", "and", "any", "are", "area", "around", "available", "be", "buy", "can", "compare", "cost", "do", "does",
    "find", "for", "from", "get", "give", "have", "here", "in", "is", "item", "items", "list", "local", "look", "looking",
    "me", "near", "nearby", "need", "needed", "needs", "new", "of", "open", "price", "product", "products", "require",
    "required", "requires", "search", "see", "show", "something", "stock", "tell", "that", "the", "there", "to", "want",
    "what", "which", "with", "within", "you", "your"
  ]);
  return String(query || "").toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2 && !stopWords.has(word))
    .filter((word, index, list) => list.indexOf(word) === index);
}

function askEmyIsVagueProductNeedQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text || !/\b(products?|items?|stock|listings?)\b/.test(text)) return false;
  if (/^(show|find|search|browse|more|list)\b/.test(text)) return false;
  if (askEmyIsProductCreationGuidanceQuery(text)) return false;
  const asksForProduct = /\b(i|we|you)?\s*(?:need|want|require|looking for|look for|get|buy)\s+(?:a\s+|an\s+|some\s+|any\s+|new\s+|the\s+|my\s+)?(?:products?|items?|something)\b/.test(text)
    || /\b(?:products?|items?)\s+(?:needed|required|wanted)\b/.test(text);
  if (!asksForProduct) return false;
  return askEmyVagueProductNeedDetailTerms(text).length === 0;
}

function askEmyIsBusinessSetupGuidanceQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (/^(show|find|search|browse|more|list)\b/.test(text)) return false;
  const setupVerb = /\b(start|setup|set up|create|launch|build|open|register|make)\b/.test(text);
  const businessTarget = /\b(business|shop|company|store|business profile|profile|emy)\b/.test(text);
  return setupVerb && businessTarget
    || /\b(i want to|i need to|help me|can you help|could you help)\b[\s\S]{0,80}\b(set up|setup|start|create|launch|open)\b[\s\S]{0,80}\b(business|shop|company|store|profile)\b/.test(text);
}

function askEmyActionTarget(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
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

function askEmyBareActionNounReply(query, firstName = "") {
  const text = String(query || "").toLowerCase();
  const prefix = firstName ? firstName + ", " : "";
  if (/\b(stats?|statistics|analytics|data|performance|insights?|views?|likes?|saves?|engagement|sales|orders?|revenue)\b/.test(text)) {
    return prefix + "do you want me to show your statistics here, explain what the stats mean, or check one specific metric?";
  }
  if (/\b(products?|items?|stock|listings?)\b/.test(text)) {
    return prefix + "do you mean show your products, find products to view, or help create or improve a product listing?";
  }
  if (/\b(customers?|clients?)\b/.test(text)) {
    return prefix + "do you want to see customer relationships, find customers, or open a customer profile?";
  }
  if (/\b(jobs?|roles?)\b/.test(text)) {
    return prefix + "do you want to find jobs, create a job post, or check applicants?";
  }
  if (/\b(clips?|videos?|reels?)\b/.test(text)) {
    return prefix + "do you want to watch clips, upload one, or improve a clip caption?";
  }
  if (/\b(posts?|articles?|blogs?)\b/.test(text)) {
    return prefix + "do you want to read posts, create one, or improve your content?";
  }
  if (/\b(services?|events?|offers?)\b/.test(text)) {
    return prefix + "do you want to find it, create it for your business, or improve an existing listing?";
  }
  if (/\b(suppliers?|partners?)\b/.test(text)) {
    return prefix + "do you want to find suppliers, compare partners, or prepare a message to contact them?";
  }
  if (/\b(messages?|chat|notifications?|reviews?|settings|dashboard|backend|admin|payments?)\b/.test(text)) {
    return prefix + "do you want me to open that area, explain it, or help you fix something there?";
  }
  if (/\b(profile|business|businesses|shops?)\b/.test(text)) {
    return prefix + "do you want to open the profile, improve it, or understand what is missing?";
  }
  if (/\b(map|directions?)\b/.test(text)) {
    return prefix + "do you want directions to a place, a map around your area, or nearby businesses?";
  }
  return prefix + "do you want me to show it, explain it, or help you do something with it?";
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

const ASK_EMY_BROWSER_ANALYTICS_KEYS = [
  "emyClipViewStats",
  "emyProductViewStats",
  "emyPostViewStats",
  "emyBusinessProfileViewStats",
  "emyBusinessDirectionStats",
  "emyBusinessLikeState",
  "emyBusinessLikePairs",
  "emyProductMascotLikeState",
  "emyClipMascotLikeState"
];

function askEmyBrowserCleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function askEmyBrowserReadStoredValue(value) {
  if (typeof value !== "string") return value;
  const text = value.trim();
  if (!text) return "";
  if (!/^[\[{]/.test(text)) return text;
  try {
    return JSON.parse(text);
  } catch (error) {
    return value;
  }
}

function askEmyBrowserReadLocalJson(key) {
  try {
    return askEmyBrowserReadStoredValue(localStorage.getItem(key));
  } catch (error) {
    return null;
  }
}

function askEmyBrowserNumberFrom(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  const text = askEmyBrowserCleanText(value).replace(/,/g, "");
  if (!text) return null;
  const labelled = text.match(/(\d+(?:\.\d+)?)\s*(?:views?|likes?|saves?|shares?|orders?|bookings?|sales?|directions?|clicks?|customers?|events?)/i);
  if (labelled) return Number(labelled[1]);
  if (/^\d+(?:\.\d+)?$/.test(text)) return Number(text);
  return null;
}

function askEmyBrowserFirstNumber(values) {
  for (const value of values) {
    const number = askEmyBrowserNumberFrom(value);
    if (number !== null && Number.isFinite(number)) return number;
  }
  return null;
}

function askEmyBrowserMetricKind(key, value) {
  const text = [
    key,
    value && value.type,
    value && value.kind,
    value && value.metric,
    value && value.action
  ].map((item) => askEmyBrowserCleanText(item).toLowerCase()).join(" ");
  if (/direction|route|map/.test(text)) return "directions";
  if (/profile/.test(text)) return "profile views";
  if (/clip|reel|video/.test(text)) return "clip views";
  if (/product/.test(text)) return "product engagement";
  if (/post|article|feed/.test(text)) return "post engagement";
  if (/like/.test(text)) return "likes";
  if (/save/.test(text)) return "saves";
  if (/share/.test(text)) return "shares";
  if (/order|booking|sale|revenue/.test(text)) return "sales";
  if (/customer|client/.test(text)) return "customer activity";
  return "engagement";
}

function askEmyBrowserMetricName(value, key, kind) {
  if (value && typeof value === "object") {
    const name = [
      value.name,
      value.title,
      value.productName,
      value.businessName,
      value.business,
      value.label,
      value.id,
      value.key
    ].map(askEmyBrowserCleanText).find(Boolean);
    if (name) return name.slice(0, 120);
  }
  const parts = String(key || "").split(/[.:/]/).filter(Boolean);
  let fallback = askEmyBrowserCleanText(parts.pop()).replace(/[-_]/g, " ");
  if (/^(total|count|value|views?|likes?|saves?|shares?|orders?|bookings?|sales?|revenue|events?)$/i.test(fallback)) {
    fallback = askEmyBrowserCleanText(parts.pop()).replace(/[-_]/g, " ") || fallback;
  }
  return fallback || kind;
}

function askEmyBrowserAnalyticsField(key) {
  const text = askEmyBrowserCleanText(key).toLowerCase();
  if (/(image|media|src|url|href|photo|logo|thumbnail|description|caption|body|email|phone|address|location|name|title|business|slug)(?:$|\.)/.test(text)) return false;
  return /(stat|analytic|view|count|total|like|save|share|direction|profile|order|booking|sale|revenue|engagement|click|impression|customer|event)/.test(text);
}

function askEmyBrowserFlattenAnalytics(value, key, rows = [], depth = 0) {
  if (rows.length >= 160 || depth > 5 || value === undefined || value === null) return rows;
  const stored = askEmyBrowserReadStoredValue(value);
  if (Array.isArray(stored)) {
    stored.forEach((entry, index) => askEmyBrowserFlattenAnalytics(entry, key + "." + index, rows, depth + 1));
    return rows;
  }
  if (stored && typeof stored === "object") {
    const eventCount = Array.isArray(stored.events) ? stored.events.length : 0;
    const total = askEmyBrowserFirstNumber([
      stored.total,
      stored.count,
      stored.value,
      stored.views,
      stored.viewCount,
      stored.profileViews,
      stored.directions,
      stored.directionCount,
      stored.likes,
      stored.likeCount,
      stored.saves,
      stored.saveCount,
      stored.shares,
      stored.shareCount,
      stored.orders,
      stored.bookings,
      stored.sales,
      stored.revenue
    ]);
    const bestTotal = Math.max(total || 0, eventCount);
    const pushedMetric = bestTotal > 0;
    if (pushedMetric) {
      const kind = askEmyBrowserMetricKind(key, stored);
      rows.push({
        kind,
        name: askEmyBrowserMetricName(stored, key, kind),
        total: bestTotal,
        source: askEmyBrowserCleanText(key).slice(0, 120)
      });
    }
    Object.keys(stored).slice(0, 80).forEach((childKey) => {
      if (childKey === "events") return;
      if (pushedMetric && /^(total|count|value|views?|viewCount|profileViews|directions?|directionCount|likes?|likeCount|saves?|saveCount|shares?|shareCount|orders?|bookings?|sales?|revenue)$/i.test(childKey)) return;
      const childValue = stored[childKey];
      if (childValue && typeof childValue === "object") {
        askEmyBrowserFlattenAnalytics(childValue, key + "." + childKey, rows, depth + 1);
      } else if (askEmyBrowserAnalyticsField(key + "." + childKey)) {
        askEmyBrowserFlattenAnalytics(childValue, key + "." + childKey, rows, depth + 1);
      }
    });
    return rows;
  }
  const scalar = askEmyBrowserNumberFrom(stored);
  if (scalar !== null && scalar > 0 && askEmyBrowserAnalyticsField(key)) {
    const kind = askEmyBrowserMetricKind(key, null);
    rows.push({
      kind,
      name: askEmyBrowserMetricName(null, key, kind),
      total: scalar,
      source: askEmyBrowserCleanText(key).slice(0, 120)
    });
  }
  return rows;
}

function askEmyBrowserContentKindFromKey(key) {
  const text = String(key || "");
  if (/BusinessProducts|FeedCreatedProducts|ProductList/i.test(text)) return "products";
  if (/BusinessClips|BusinessReels|ProductReels|CreatedClips/i.test(text)) return "clips";
  if (/BusinessPosts|FeedPosts|CreatedPosts/i.test(text)) return "posts";
  if (/Articles|ArticlePosts/i.test(text)) return "articles";
  if (/BusinessJobs|JobPosts|CreatedJobs/i.test(text)) return "jobs";
  if (/BusinessEvents|EventPosts|CustomerEvents/i.test(text)) return "events";
  if (/BusinessProfiles|BusinessDirectory|NearbyBusinesses|LocalBusinesses/i.test(text)) return "businesses";
  if (/BusinessCustomers|CustomerBusinesses|RelationshipRequests/i.test(text)) return "customers";
  return "";
}

function askEmyBrowserStoredCount(value) {
  const stored = askEmyBrowserReadStoredValue(value);
  if (Array.isArray(stored)) return stored.filter(Boolean).length;
  if (stored && typeof stored === "object") return Object.keys(stored).filter((key) => stored[key]).length;
  return 0;
}

function askEmyBrowserStatisticsSummary() {
  const rows = [];
  const contentCounts = {};
  try {
    ASK_EMY_BROWSER_ANALYTICS_KEYS.forEach((key) => {
      const value = askEmyBrowserReadLocalJson(key);
      if (value !== null && value !== undefined && value !== "") askEmyBrowserFlattenAnalytics(value, key, rows, 0);
    });
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index) || "";
      if (!/^emy/i.test(key)) continue;
      if (/AskSavedChats|AskSearchHistory|Sidebar|Password|Token|Secret|ApiKey|Runtime|Debug|Cache/i.test(key)) continue;
      const kind = askEmyBrowserContentKindFromKey(key);
      const value = localStorage.getItem(key);
      if (kind) contentCounts[kind] = Math.max(contentCounts[kind] || 0, askEmyBrowserStoredCount(value));
      if (/ViewStats|DirectionStats|LikeState|LikePairs|Mascot|Analytics|Statistics|Engagement/i.test(key)) {
        askEmyBrowserFlattenAnalytics(value, key, rows, 0);
      }
    }
  } catch (error) {}
  const seenMetrics = new Set();
  const seenMetricValues = new Set();
  const metrics = rows
    .filter((row) => row && Number(row.total) > 0)
    .sort((a, b) => Number(b.total) - Number(a.total))
    .filter((row) => {
      const id = (row.kind + "|" + row.name + "|" + row.total).toLowerCase();
      const valueId = (row.kind + "|" + row.total).toLowerCase();
      if (seenMetrics.has(id)) return false;
      if (seenMetricValues.has(valueId)) return false;
      seenMetrics.add(id);
      seenMetricValues.add(valueId);
      return true;
    })
    .slice(0, 8);
  return {
    metrics,
    contentCounts,
    hasMetricStats: metrics.length > 0,
    hasContentCounts: Object.keys(contentCounts).some((key) => contentCounts[key] > 0)
  };
}

function askEmyBrowserAnalyticsMode(query) {
  const text = askEmyBrowserNormalizeIntentText(query);
  const simple = text.replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
  if (/^(graphs?|charts?|visuals?|bars?)$/.test(simple)) return "show";
  if (/\b(line charts?|line graphs?|trend charts?|trend graphs?|time series|timeseries|over time|daily|weekly|monthly)\b/.test(simple)) return "line";
  if (/^(what are|what is|explain|define)\b[\s\S]{0,40}\b(stats?|statistics|analytics|engagement|views?|insights?)\b/.test(simple) && !/\b(my|mine|for me|business|profile|product|these|those|numbers?)\b/.test(simple)) return "concept";
  if (/^(explain|what does|what do|break down|help me understand)\b[\s\S]{0,80}\b(my|mine|business|profile|product|these|those|numbers?|stats?|statistics|analytics|views?|signals?)\b/.test(simple)) return "insight";
  if (!simple || askEmyIsBareActionNounQuery(simple)) return "clarify";
  if (askEmyBrowserIsProductPerformanceQuery(simple)) return "product";
  if (/\b(compare|comparison|versus|vs|against|difference|better|best|top)\b/.test(simple)) return "compare";
  if (/\b(sales|orders?|revenue|bookings?|enquiries|enquiry|income|money|customers? bought|buy most|bought most)\b/.test(simple)) return "sales";
  if (/\b(products?|items?|listings?|stock)\b/.test(simple) && /\b(stats?|statistics|analytics|engagement|views?|likes?|saves?|performance|perform|doing|interest)\b/.test(simple)) return "product";
  if (/\b(why|mean|means|good|bad|low|high|improve|next|should i|what to do|understand|analyse|analyze|review|insight|performance|performing|working)\b/.test(simple)) return "insight";
  if (/\b(graphs?|charts?|visual|show|pull up|bring|display|open|give me|what are my|my stats|my statistics|how many)\b/.test(simple)) return "show";
  return "clarify";
}

function askEmyBrowserAnalyticsRows(summary, filterPattern) {
  const rows = (summary.metrics || []).filter((row) => row && Number(row.total) > 0);
  return filterPattern ? rows.filter((row) => filterPattern.test(String(row.kind || "") + " " + String(row.name || "") + " " + String(row.source || ""))) : rows;
}

function askEmyBrowserAnalyticsChartRows(summary, filterPattern, limit = 6) {
  const rows = askEmyBrowserAnalyticsRows(summary, filterPattern);
  if (rows.length) return rows.slice(0, limit).map((row) => row.kind + ": " + row.total);
  return Object.keys(summary.contentCounts || {})
    .filter((key) => !filterPattern || filterPattern.test(key))
    .sort((a, b) => summary.contentCounts[b] - summary.contentCounts[a])
    .slice(0, limit)
    .map((key) => key + ": " + summary.contentCounts[key]);
}

function askEmyBrowserHasSalesMetrics(summary) {
  return askEmyBrowserAnalyticsRows(summary, /enquiries?|inquiries?|messages?|contacts?|leads?|customer interest|directions?/i).length > 0;
}

function askEmyBrowserAnalyticsTable(rows) {
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
      return "| " + row.kind + " | " + row.total + " | " + suggestion + " |";
    })
  ].join("\n");
}

function askEmyBrowserStatisticsReply(query, context = {}) {
  const summary = askEmyBrowserStatisticsSummary();
  const mode = askEmyBrowserAnalyticsMode(query);
  const chartRows = askEmyBrowserAnalyticsChartRows(summary, null, 6);
  const strongest = summary.metrics[0];
  if (mode === "clarify") {
    return [
      "What do you want to do with the statistics?",
      "I can show them here, explain what they mean, compare the strongest signals, check product interest, or work out what to improve next."
    ].join("\n\n");
  }
  if (mode === "concept") {
    return [
      "Statistics in EMY are signals that show what people are doing around your business and content.",
      "Useful examples\nProfile views show attention on the business page.\nProduct engagement shows interest in products.\nLikes, saves, clips, posts, directions, messages, and enquiries each answer a different business question.",
      "The important part\nStats are not just numbers. They help decide what to improve, what to promote, and where customer interest is strongest."
    ].join("\n\n");
  }
  if (mode === "line") {
    return [
      "I cannot make a true line chart yet because I only have current totals, not historical daily or weekly data.",
      "Available chart now\n" + (chartRows.length ? chartRows.slice(0, 5).join("\n") : "A bar chart or product comparison can be shown once current totals are available."),
      "Why\nA line chart needs saved values over time, such as daily or weekly views.\nI should not pretend snapshot totals are a real trend."
    ].join("\n\n");
  }
  if (mode === "sales") {
    const salesRows = askEmyBrowserAnalyticsChartRows(summary, /enquiries?|inquiries?|messages?|contacts?|leads?|customer interest|directions?/i, 5);
    if (!salesRows.length) {
      return [
        "EMY products are listings inside the platform, so I should treat this as interest and action signals.",
        "What I can use instead\n" + (chartRows.length ? chartRows.slice(0, 4).join("\n") : "Saved content counts and activity signals only."),
        "What this means\nI can talk about attention, product interest, enquiries, messages, customers, directions, and profile activity when those signals are saved."
      ].join("\n\n");
    }
    return [
      "Here are the customer action signals I can see.",
      "Action chart\n" + salesRows.join("\n"),
      "What this means\nUse these with profile views and product interest to see where attention becomes action."
    ].join("\n\n");
  }
  if (mode === "product") {
    const productMetricRows = askEmyBrowserAnalyticsRows(summary, /product|item|listing|stock/i).filter((row) => !/profile views?|directions?/i.test(row.kind || ""));
    const productRows = productMetricRows.length
      ? productMetricRows.slice(0, 6).map((row) => row.kind + ": " + row.total)
      : summary.contentCounts && summary.contentCounts.product ? ["products: " + summary.contentCounts.product] : [];
    if (!productRows.length) {
      return [
        "I do not see separate product performance numbers here yet.",
        "What I can still check\nProduct count, product cards, prices, photos, descriptions, likes, saves, and any product view signals that are saved.",
        "Better next question\nAsk me to show your products, compare your products, or improve one product listing."
      ].join("\n\n");
    }
    return [
      "Here is the product interest I can see.",
      "Product statistics chart\n" + productRows.join("\n"),
        "What to do next\nPut the products with the strongest interest first, make the price and next action clear, and turn product attention into a message, enquiry, follow, direction request, or customer relationship."
    ].join("\n\n");
  }
  if (mode === "compare") {
    const rows = askEmyBrowserAnalyticsRows(summary, null).slice(0, 5);
    if (rows.length < 2) {
      return "Compare which statistics: profile views, product interest, clips/posts, customers, enquiries, messages, or directions? I need at least two signals to compare properly.";
    }
    return [
      "Here is the clean comparison.",
      askEmyBrowserAnalyticsTable(rows),
      askEmyBrowserHasSalesMetrics(summary)
        ? "Read this as attention versus action: views show interest, enquiries, messages, and directions show stronger customer action."
        : "I do not see enquiry, message, customer, or direction stats yet, so this compares attention signals only."
    ].join("\n\n");
  }
  if (mode === "insight") {
    const gap = askEmyBrowserHasSalesMetrics(summary)
      ? "Now compare attention with enquiries, messages, customers, or directions so you can see what creates action."
      : "The missing piece is enquiry, message, customer, or direction data, so I should treat this as interest, not proof of action.";
    return [
      strongest
        ? "The main thing I see is " + strongest.total + " " + strongest.kind + ". That is where attention is strongest right now."
        : "I do not see enough saved statistic numbers here to diagnose performance properly.",
      "What this means\n" + (chartRows.length ? chartRows.slice(0, 4).join("\n") : "There are not enough saved signals to rank yet."),
      "My read\n" + gap,
      "Next move\nImprove the thing that gets attention first, then connect it to a clear action: message, enquire, follow, visit, or get directions."
    ].join("\n\n");
  }
  const intro = summary.hasMetricStats
    ? "Here are the statistics I can see here. The strongest visible signal is " + strongest.total + " " + strongest.kind + "."
    : summary.hasContentCounts
      ? "I do not see synced statistic numbers yet, but I can still show the EMY content counts I can see here."
      : "I cannot see synced statistic numbers in this browser yet. I will show the statistics page and avoid inventing figures.";
  const explain = [];
  if (summary.hasMetricStats) {
    explain.push("The chart ranks the biggest saved signals first, so it shows where attention is strongest right now.");
    if (!summary.metrics.some((row) => /enquiries?|inquiries?|messages?|contacts?|leads?|customer interest|directions?/i.test(row.kind + " " + row.source))) {
      explain.push("EMY products are listings inside the platform, so this is an activity and interest view.");
    }
  } else if (summary.hasContentCounts) {
    explain.push("These are counts of saved EMY content, not performance numbers.");
    explain.push("Once views, likes, saves, enquiries, messages, customers, or directions are synced, I can rank what is actually performing.");
  } else {
    explain.push("The statistics source is either empty or not synced into Ask EMY yet.");
  }
  return [
    intro,
    chartRows.length ? "Statistics chart\n" + chartRows.join("\n") : "",
    summary.hasMetricStats ? "What this means\n" + explain.join("\n") : "What this means\n" + explain.join("\n")
  ].filter(Boolean).join("\n\n");
}

function askEmyIsPlatformActionGuidanceQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
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
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
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
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim().replace(/[.!?]+$/g, "");
  return /^(what should i do|what should i do next|what do i do|what next|next step|next steps|where do i start|what can i do|help me decide|guide me)$/.test(text);
}

function askEmyNextStepReply(query, context = {}) {
  const greeting = askEmyGreetingPrefix(context);
  return [
    greeting + " Good question. I need one direction first, then I can move with you.",
    "Decision map\n1. Set up or improve your business profile.\n2. Add or improve products, posts, clips, jobs, services, or offers.\n3. Find customers, suppliers, partners, or places.\n4. Understand stats, charts, views, likes, saves, and performance.\n5. Search EMY records only when you actually want records.",
    "What happens next\nIf you choose data, I show charts and explain the numbers.\nIf you choose a product, job, clip, post, or business, I use the existing EMY view here instead of redirecting you.\nIf you are just talking, I answer without dumping saved cards."
  ].join("\n\n");
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

function askEmyPlatformActionReply(query, context = {}) {
  const text = String(query || "").toLowerCase();
  if (askEmyIsBareNextStepQuestion(text)) return askEmyNextStepReply(query, context);
  const target = askEmyActionTarget(text);
  const label = askEmyActionLabel(target);
  const createAction = /\b(create|add|upload|publish|post|list|make|set up|setup)\b/.test(text);
  const openAction = /\b(open|take me to|go to|bring|pull up|show me where)\b/.test(text);
  const draftAction = /\b(draft|prepare|write|rewrite|convert|turn|summari[sz]e|improve)\b/.test(text);
  const proactiveAction = /\b(before i ask|proactive|what should i do next|next action|next step)\b/.test(text);
  if (target === "data") {
    return askEmyBrowserStatisticsReply(query, context);
  }
  if (openAction && target) {
    return [
      "I can open the existing " + label + " view here when that item is available in this chat.",
      "What happens here\nI use EMY's existing view for that item.\nI do not need to redirect you or show a raw link.\nIf you want a specific item, tell me its name or show it first."
    ].join("\n\n");
  }
  if (draftAction) {
    return [
      "Yes. I can turn rough notes into something ready to use on EMY.",
      "What I can convert or prepare\nA product listing\nA service description\nA job post\nA business profile description\nA customer message\nA post, clip caption, event, or offer",
      "Send me the raw material\nPaste your rough notes, a photo description, a price, a few bullet points, or the old text. I will reshape it into the right EMY format."
    ].join("\n\n");
  }
  if (proactiveAction) {
    return [
      "Yes. I can suggest the next useful move instead of waiting for perfect instructions.",
      "How I will decide\nIf you are setting up: I check what profile, product, service, post, clip, or job content is missing.\nIf you are offering products or services: I look for the clearest path to customers, suppliers, messages, directions, or product interest.\nIf you are reviewing data: I explain what the numbers show and what to improve next.",
      "Start point\nTell me what page or goal you are on now, or ask: what should I do next for my business?"
    ].join("\n\n");
  }
  if (createAction && target) {
    return [
      "Yes. I can help you create a " + label + " on EMY.",
      "What I need\nName or title\nShort description\nCategory\nPrice, date, stock, or availability if relevant\nPhoto, video, or key details if you have them\nWhat you want the customer to do next",
      "Send rough details\nYou can give messy notes. I will clean them up, structure them, and tell you the next action."
    ].filter(Boolean).join("\n\n");
  }
  return [
    "I can handle that as an EMY action, not just a search.",
    "Choose the action\nOpen a page or area\nCreate or add content\nDraft or convert text\nBring data or records\nCompare options\nSuggest the next step before you ask",
    "Tell me the target\nSay product, service, job, post, clip, event, customer, supplier, business profile, or data, and I will guide the next move."
  ].join("\n\n");
}

function askEmyAssistantGuidanceReply(query, context = {}) {
  const text = String(query || "").toLowerCase();
  const user = context.user || context.activeUser || (typeof readStoredAskUser === "function" ? readStoredAskUser() : null) || {};
  const greeting = askEmyGreetingPrefix({ ...context, user });
  const businessName = String(user.businessName || user.business || "").trim();
  const businessText = businessName ? " for " + businessName : "";
  if (askEmyIsBareNextStepQuestion(text)) return askEmyNextStepReply(query, { ...context, user });
  if (askEmyIsVagueProductNeedQuery(text)) {
    return [
      greeting + " What product do you need?",
      "Tell me one detail\nThe item name, like face wash, bottle, food, phone charger, uniform, or cleaning product.\nOr the category, budget, and whether you want it near you.\nIf you mean you want to create a product for your business, say create product and send the rough details.",
      "Then I can\nSearch EMY products properly.\nCompare options.\nOpen a product card.\nOr help you create the product in your business Products section."
    ].join("\n\n");
  }
  if (askEmyIsProductCreationGuidanceQuery(text)) {
    return [
      greeting + " Yes. In EMY you create products from your business profile, not by searching for a product called create.",
      "Create it in EMY\nGo to your business profile" + businessText + ".\nOpen the Products section.\nPress Add product.\nChoose the main product photo or video. You can also add a detail photo, an in-use photo, or a product video.\nFill product name, price and currency, category, availability, and product description.\nPress Save product. The product then appears in your business Products area for customers.",
      "What I can do next\nGive me rough product details and I will draft the title, description, category, price wording, availability, and customer next action before you save it."
    ].join("\n\n");
  }
  if (askEmyIsBusinessSetupGuidanceQuery(text)) {
    return [
      greeting + " Yes. I can help you set up the business in EMY step by step.",
      "Start with\nCreate or open the business profile.\nAdd the business name, category, location, phone, email, website, and opening hours.\nWrite a clear description: what you offer, who it is for, and how customers should contact you.\nAdd a profile image or cover image so the page does not look empty.",
      "What to prepare\nBusiness name and category.\nShort description.\nAddress or service area.\nPhone, email, website, and opening hours.\nLogo, profile photo, or cover photo.\nThe first products, services, posts, clips, jobs, or offers you want to publish.",
      "What I can do next\nTurn rough notes into the business profile description.\nDraft product or service listings.\nCheck what is missing from the profile.\nGuide you to customers, suppliers, posts, clips, jobs, and data once the profile exists.",
      "Best next question\nTell me the business name and what it offers, and I will draft the profile setup text."
    ].join("\n\n");
  }
  if (askEmyIsPlatformActionGuidanceQuery(text)) {
    return askEmyPlatformActionReply(query, context);
  }
  if (/\b(start|setup|set up|create|launch|open)\b[\s\S]{0,80}\b(business|shop|company|store|profile|emy)\b/.test(text)) {
    return [
      greeting + " Yes. We can build this step by step" + businessText + ".",
      "Start with\nProfile: name, category, location, contact details, opening times, and a clear description.\nOffer: add products, services, jobs, posts, clips, or events so people understand what you do.\nTrust: add real photos, useful details, and a simple next action like message, visit, apply, enquire, or follow.\nGrowth: once the profile is clear, use EMY to discover customers, suppliers, local opportunities, and performance signals.",
      "Best next question\nAre you setting up the profile, adding products or services, trying to get customers, or checking your data first?"
    ].join("\n\n");
  }
  if (/\b(grow|increase|improve|boost|attract|bring|get more|reach|win)\b[\s\S]{0,80}\b(business|sales|customers?|clients?|orders|profile|views|products?)\b/.test(text)) {
    return [
      greeting + " Yes. We can work on growth" + businessText + " without turning the answer into random search cards.",
      "Good growth paths\nGet seen: make the profile, products, services, and photos clear.\nGet interest: post useful updates, clips, offers, or product details that give people a reason to act.\nGet action: make it easy to message, follow, visit, enquire, apply, or ask for directions.\nUnderstand what works: check views, likes, saves, product interest, clips, and customer activity when the data is connected.",
      "Choose one\nDo you want more customers, a stronger profile, better products/content, supplier help, or a data review first?"
    ].join("\n\n");
  }
  if (/\b(connect|discover|reach)\b[\s\S]{0,90}\b(customers?|clients?|suppliers?|partners?|markets?|places?|world|country|countries)\b/.test(text) || /\bsuppliers?\b/.test(text)) {
    return [
      greeting + " I can help you connect the dots instead of just throwing listings at you.",
      "How we can approach it\nCustomers: define who you want to reach, where they are, and what action you want from them.\nSuppliers or partners: define what you need, the place or country to search, and whether you want local EMY records or wider discovery.\nNext action: once the target is clear, I can search EMY and show cards only when cards are useful.",
      "Tell me this\nAre you looking for customers, suppliers, or business partners, and in what place?"
    ].join("\n\n");
  }
  if (/\b(analy[sz]e|understand|review)\b[\s\S]{0,90}\b(data|stats|statistics|performance|sales|views|engagement|customers?|products?)\b/.test(text)) {
    return [
      greeting + " I can help you understand the data when EMY has the signals connected.",
      "What I can look at\nProfile views, product activity, saves, likes, clips, posts, customer interest, jobs, events, and business performance.\nIf a number is missing, I should say it is missing instead of inventing it.",
      "Best next question\nDo you want me to look at profile performance, product interest, clips/posts, customer activity, enquiries, messages, or directions first?"
    ].join("\n\n");
  }
  return [
    greeting + " I'll guide the next move first.",
    "Decision map\n1. Improve the business.\n2. Add content.\n3. Find customers or suppliers.\n4. Check stats and charts.\n5. Search EMY records.",
    "What happens next\nCharts, product views, and useful panels appear when they answer the question. Saved record cards stay hidden unless you ask to find or open records."
  ].join("\n\n");
}

function conversationalAskEmyReply(query, context = {}) {
  const text = String(query || "").toLowerCase();
  const raw = String(query || "");
  const greeting = askEmyGreetingPrefix(context);
  const firstName = askEmyFirstNameFromUser(context.user || context.activeUser || (typeof readStoredAskUser === "function" ? readStoredAskUser() : null));
  const nameSuffix = firstName ? ", " + firstName : "";
  if (askEmyIsOpenConversationPrompt(query)) {
    return "Sure. What would you like me to tell you?";
  }
  if (askEmyIsConversationalFragmentQuery(query)) {
    return "I didn't catch that. Say it another way and I'll follow you.";
  }
  if (askEmyIsSocialChatQuery(query)) {
    return askEmySocialChatReply(raw, firstName);
  }
  if (askEmyIsBareActionNounQuery(query)) {
    return askEmyBareActionNounReply(query, firstName);
  }
  if (askEmyIsSimpleGreetingQuery(query)) {
    const count = askEmyGreetingHistoryCount(context);
    const name = firstName || "";
    const variants = name
      ? [
          "Hi " + name + ". Good to see you again.",
          "Hi " + name + ". What are we working on today?",
          "Hi " + name + ". Hope you're doing well.",
          "Hi " + name + ".",
          "Hi " + name + ". What can I help with?",
        ]
      : [
          "Hi. Good to see you.",
          "Hi. What are we working on today?",
          "Hi. Hope you're doing well.",
          "Hi.",
          "Hi. What can I help with?",
        ];
    return variants[Math.min(count, variants.length - 1)];
  }
  if (/\b(test|testing|try|checking|check)\b/.test(text)) {
    return greeting + " You can ask naturally, like what should I do next, help me set up my business, find suppliers, compare products, or understand what is happening in EMY.";
  }
  if (/\b(how are you|how's your day|how is your day|what's up|whats up|how is it going|how's it going)\b/.test(text)) {
    return "I'm doing well" + nameSuffix + ". Tell me what you are trying to do in EMY, and I will help you think it through or move to the right place.";
  }
  if (/\b(thanks|thank you)\b/.test(text)) {
    return "You're welcome" + nameSuffix + ". I'm here whenever you want help with EMY.";
  }
  return greeting + " Tell me what you want to do, and I will help you find the next step in EMY.";
}

function askEmyIsSocialChatQuery(query) {
  const raw = String(query || "").trim();
  const text = raw.toLowerCase().replace(/\s+/g, " ").trim();
  if (!text) return false;
  if (/\b(show|find|search|list|open|map|directions?|products?|businesses?|jobs?|clips?|posts?|services?|events?|customers?|statistics|stats|data)\b/.test(text)) return false;
  return /^(ha+|haha+|hehe+|lol|lmao|rofl)\b/.test(text)
    || /\b(joke|joking|funny|made me laugh|you are funny|that's funny|that is funny)\b/.test(text)
    || /[😂🤣😄😆😅😉😊🙂😍😘🥰😜😎👍❤️💕🔥✨]/.test(raw);
}

function askEmySocialChatReply(query, firstName = "") {
  const raw = String(query || "");
  const text = raw.toLowerCase();
  const nameBit = firstName ? " " + firstName : "";
  if (/[😂🤣😄😆😅]/.test(raw) || /^(ha+|haha+|hehe+|lol|lmao|rofl)\b/.test(text) || /\b(funny|joke|joking|laugh)\b/.test(text)) {
    return "Haha" + nameBit + ", I'm with you 😄 What are we doing next in EMY?";
  }
  if (/[😘🥰😍❤️💕]/.test(raw)) {
    return "Aww" + nameBit + ", I hear you 😊 I'm here. What should we build, check, or improve next in EMY?";
  }
  if (/[👍🔥✨😎]/.test(raw)) {
    return "Nice" + nameBit + " 😄 What do you want to move forward in EMY?";
  }
  return "I'm here with you" + nameBit + " 😊 Say it however it comes, and I'll help you move it forward.";
}

function askEmyIdentityIntroReply() {
  return [
    "I'm Ask EMY, the guide inside EMY. I help customers and businesses move through the platform, not just search saved items.",
    "What I can help with\nDiscover businesses, products, services, jobs, posts, clips, places, and opportunities on EMY.\nGuide customers from a question to the right action: compare, message, follow, enquire, apply, visit, or get directions.\nHelp businesses set up and improve their EMY presence: profile, products, services, posts, clips, jobs, events, customers, suppliers, and activity.\nAnalyse EMY data and signals when they are connected, including views, likes, saves, customer interest, product activity, clips, and business performance.\nSupport wider discovery when EMY has records for another place or the request asks beyond one local area.",
    "How I answer\nI use real EMY information when it is available, and I say clearly when something is missing instead of inventing it.",
  ].join("\n\n");
}

function askEmyPlatformInfoReply(context = {}) {
  const user = context.user || context.activeUser || (typeof readStoredAskUser === "function" ? readStoredAskUser() : null) || {};
  const firstName = askEmyFirstNameFromUser(user);
  const ownedBusiness = String(user.businessName || user.business || "").trim();
  const personalLine = ownedBusiness
    ? "For you, EMY is also where you can manage " + ownedBusiness + ": products, posts, clips, jobs, profile details, customers, and business activity."
    : "For you, EMY is the place to discover useful businesses nearby and keep everything connected in one account.";
  return [
    (firstName ? firstName + ", " : "") + "EMY is a local business platform built to connect everyday customers with real businesses, products, jobs, services, posts, clips, and directions in one place.",
    "What EMY is\nLocal discovery: find nearby businesses, products, offers, services, jobs, events, clips, and posts.\nBusiness connection: follow businesses, like products, message businesses, and open their profiles from one place.\nReal platform data: Ask EMY should use what businesses have actually added on EMY instead of inventing fake listings.\nBuilt for action: open a card, message a business, view a product, apply for a job, or use EMY Maps for directions.",
    "For customers\nFind what is near you by location and radius.\nSee products, prices, stock, clips, jobs, posts, services, and business profiles.\nFollow businesses you care about and return to their latest updates quickly.\nAsk EMY follow-up questions like cheapest option, more products, opening times, or directions.",
    "For businesses\nCreate a public business profile with contact details, description, images, opening times, and location.\nAdd products, services, jobs, posts, clips, events, and campaign content from the backend.\nUse business statistics to understand views, likes, product engagement, clips, and customer interest.\nTurn attention into action by helping customers message, enquire, apply, visit, or follow.",
    "How Ask EMY fits in\nSearch assistant: Ask EMY can search across EMY content and show cards, links, products, jobs, clips, services, posts, and maps.\nBusiness helper: it can explain what to improve using business stats and profile signals.\nPrivacy aware: business public details can be shown, but private customer details stay protected.\n" + personalLine,
  ].join("\n\n");
}

function askEmyBrowserRadiusLabel(value) {
  const num = Number(value);
  if (Number.isFinite(num) && num > 0) return num + " km";
  const text = String(value || "").trim();
  return text || "not set";
}

function askEmyBrowserViewerAccount(context = {}) {
  return context.user || context.activeUser || (typeof readStoredAskUser === "function" ? readStoredAskUser() : null) || {};
}

function askEmyBrowserViewerName(context = {}) {
  const user = askEmyBrowserViewerAccount(context);
  return String(user.name || user.displayName || user.customerName || context.customerName || user.email || context.email || "").trim();
}

function askEmyBrowserViewerEmail(context = {}) {
  const user = askEmyBrowserViewerAccount(context);
  return String(user.email || context.email || context.customerEmail || "").trim();
}

function askEmyBrowserIsViewerSubjectCorrectionQuery(query) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text) return false;
  return /\b(?:no|no no|not|wrong|i mean|i said|i asked)\b[\s\S]{0,90}\b(?:honey shop|business|shop|store|company|clip|post|content|product)\b[\s\S]{0,90}\b(?:me|myself|my account|my profile|my customer profile|signed in user|signed in customer)\b/.test(text)
    || /\b(?:no|no no|not|wrong|i mean|i said|i asked)\b[\s\S]{0,90}\b(?:me|myself|my account|my profile|my customer profile|signed in user|signed in customer)\b/.test(text)
    || /\bnot\s+[a-z0-9 '&-]{2,80}\s+me\b/.test(text);
}

function askEmyBrowserIsViewerLocationQuery(query, context = {}) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text) return false;
  const asksBusinessCustomers = /\b(?:my|our)\s+customers?\b[\s\S]{0,80}\b(?:from|location|locations|area|areas|map|heatmap|live|based)\b/.test(text)
    || /\bwhere\b[\s\S]{0,80}\b(?:my|our)\s+customers?\b/.test(text);
  if (asksBusinessCustomers) return false;
  const history = Array.isArray(context.history) ? context.history.map((item) => String(item && item.text || "")).join(" ").toLowerCase() : "";
  const selfCue = /\b(me|my|mine|myself|i|signed in user|signed in customer|customer account|customer profile|as a customer)\b/.test(text);
  const locationCue = /\b(location|address|postcode|where i am|where am i|current location|gps|search area|saved area)\b/.test(text);
  if (selfCue && locationCue) return true;
  return askEmyBrowserIsViewerSubjectCorrectionQuery(text) && /\b(location|address|postcode|where i am|where am i|current location|gps|search area|saved area)\b/.test(text + " " + history);
}

function askEmyBrowserIsViewerProfileQuery(query, context = {}) {
  const text = askEmyBrowserNormalizeIntentText(query).replace(/\bi\s+m\b/g, "i am").replace(/\bim\b/g, "am");
  if (!text) return false;
  if (askEmyBrowserIsViewerLocationQuery(text, context)) return false;
  if (askEmyBrowserIsViewerSubjectCorrectionQuery(text)) return true;
  return /\b(do you know me|know me|know who i am|do you know who i am|who am i|who i am|what do you know about me|tell me about me|tell me about my account|what do you know about my account|my account details|my account information)\b/.test(text)
    || /\b(?:my|me|myself)\b[\s\S]{0,40}\b(?:customer profile|customer account|customer card|signed in account)\b/.test(text);
}

function askEmyBrowserViewerProfileWantsDetails(query) {
  const text = askEmyBrowserNormalizeIntentText(query).replace(/\bi\s+m\b/g, "i am").replace(/\bim\b/g, "am");
  return /\b(what do you know about me|tell me about me|tell me about my account|what do you know about my account|details?|account info|account information|my account details|my account information|profile info|profile information|email|role|context)\b/.test(text);
}

function askEmyBrowserViewerProfileReplyResult(query, context = {}) {
  const name = askEmyBrowserViewerName(context);
  const email = askEmyBrowserViewerEmail(context);
  const role = String(context.accountRole || askEmyBrowserViewerAccount(context).role || "customer/user").trim();
  const wantsDetails = askEmyBrowserViewerProfileWantsDetails(query);
  const roleText = role && role !== "customer/user" ? role : "customer";
  if (!wantsDetails) {
    return {
      text: name ? "You're " + name + "." : "I can see you're signed in to EMY.",
      results: []
    };
  }
  return {
    text: [
      (askEmyBrowserIsViewerSubjectCorrectionQuery(query) ? "Got it" : "Yes") + " - I understand you mean your own signed-in EMY account.",
      [
        "Your EMY account",
        name ? "Account name: " + name : "Account name: not provided to Ask EMY in this chat context.",
        "Role/context: " + roleText,
        /\bemail\b/.test(askEmyBrowserNormalizeIntentText(query)) && email ? "Email: " + email : ""
      ].filter(Boolean).join("\n"),
      "I will not bring in your saved location, radius, or business data unless that is what you ask about."
    ].join("\n\n"),
    results: []
  };
}

function askEmyBrowserViewerLocationReplyResult(query, context = {}) {
  const location = String(context.location || "").trim();
  const radius = askEmyBrowserRadiusLabel(context.radius);
  const locationText = location
    ? "Yes, I can see your saved Ask EMY/customer search location: " + location + (radius ? ", radius " + radius : "") + "."
    : "I cannot see a saved customer search location for this chat yet.";
  return {
    text: [
      locationText,
      "I cannot see your live GPS unless you allow location or save it from the location picker."
    ].join("\n\n"),
    results: []
  };
}

function askEmyBrowserIsMapCapabilityQuery(query) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text) return false;
  if (/\b(directions?|route|nearby|near me|around me|within|postcode|radius)\b/.test(text)) return false;
  return /\b(?:can|could|do|does|will|would)\b[\s\S]{0,50}\b(?:show|make|create|open|display|support|use)\b[\s\S]{0,40}\bmaps?\b/.test(text)
    || /\bwhat\s+maps?\b[\s\S]{0,40}\b(?:can|could|do|does|will|would)\b/.test(text)
    || /^maps?\?$/.test(text);
}

function askEmyBrowserMapCapabilityReplyResult() {
  return {
    text: [
      "Yes. Ask EMY can show map cards when EMY has saved location data.",
      "Map types\nYour saved customer/search location.\nA business location map when the business has an address or map pin.\nDirections to a business when both start and destination are available.\nA customer area map for your business when customer location data is connected.\nA grouped customer heatmap across your businesses when there is enough privacy-safe data.",
      "Important\nI should not open directions unless you ask for directions.\nCustomer maps should be grouped by area, not exact individual home addresses."
    ].join("\n\n"),
    results: []
  };
}

function askEmyBrowserIsBusinessCustomerGeoQuery(query) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text || askEmyBrowserIsViewerLocationQuery(text)) return false;
  return /\b(?:where|map|maps?|location|locations|area|areas|from|based|live|heatmap)\b[\s\S]{0,90}\b(?:my|our)\s+customers?\b/.test(text)
    || /\b(?:my|our)\s+customers?\b[\s\S]{0,90}\b(?:where|map|maps?|location|locations|area|areas|from|based|live|heatmap)\b/.test(text);
}

function askEmyBrowserCustomerRegionLabel(row = {}) {
  const city = String(row.customerCity || row.city || row.town || row.customerTown || row.area || row.customerArea || row.region || row.customerRegion || "").trim();
  if (city) return city;
  const source = String(row.customerPostcode || row.postcode || row.zip || row.customerZip || row.address || row.customerAddress || row.location || row.customerLocation || "").toUpperCase();
  const outward = source.match(/\b[A-Z]{1,2}\d[A-Z\d]?\b/);
  if (outward) return outward[0];
  return "";
}

function askEmyBrowserCustomerGeoReplyResult(query, context = {}) {
  const rows = Array.isArray(context.businessCustomers) ? context.businessCustomers : [];
  const groups = new Map();
  rows.forEach((row) => {
    const label = askEmyBrowserCustomerRegionLabel(row);
    if (!label) return;
    groups.set(label, (groups.get(label) || 0) + 1);
  });
  if (!rows.length) {
    return {
      text: "I can check where your customers are from when the Ask EMY backend has customer relationship data loaded.\n\nPrivacy\nCustomer maps should show grouped areas only, not exact home addresses.",
      results: []
    };
  }
  if (!groups.size) {
    return {
      text: "I can see customer relationships, but I do not see saved customer location areas yet.\n\nNeeded for maps\nCustomer postcode area, city, or another privacy-safe location field.\nExact home addresses should be aggregated before Ask EMY shows them.",
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
    text: [
      "Here is where your customers are from.",
      "Customer areas\n" + grouped.map((row) => row.label + ": " + row.count + " customer" + (row.count === 1 ? "" : "s")).join("\n"),
      "Privacy\nCustomer locations are grouped by area.\nI should not show individual customer home addresses in Ask EMY."
    ].join("\n\n"),
    results: []
  };
}

function askLocalCustomerRelationshipQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (askEmyBrowserIsViewerLocationQuery(text) || askEmyBrowserIsViewerProfileQuery(text) || askEmyBrowserIsBusinessCustomerGeoQuery(text)) return false;
  if (askEmyIsProfileIntentQuery(text)) return false;
  if (askEmyBrowserIsCustomerSelfContentQuery(text)) return false;
  if (!/\b(customers?|clients?)\b/.test(text)) return false;
  if (/\b(customer experience|customer behaviour|customer behavior|customer support|customer service)\b/.test(text)) return false;
  if (/\b(gain|get|attract|increase|grow|more|find|bring|win|improve|boost|reach)\s+(?:more\s+)?(?:customers?|clients?)\b/.test(text)) return false;
  return /\b(does|do|has|have|had|any|who|list|show|see|their|his|her|its|my|our|business|shop|store|customers?|clients?)\b/.test(text);
}

function askEmyBrowserIsCustomerSelfContentQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
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

function askEmyBrowserCustomerSelfCountType(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!/\b(how many|count|number of|total)\b/.test(text)) return "";
  if (/\b(clip|clips|video|videos|reel|reels)\b/.test(text)) return "clips";
  if (/\b(event|events)\b/.test(text)) return "events";
  if (/\b(article|articles|blog|blogs)\b/.test(text)) return "articles";
  if (/\b(post|posts|feed|feeds|updates?)\b/.test(text)) return "posts";
  if (/\b(content|uploads?|activity)\b/.test(text)) return "content items";
  return "";
}

function askEmyBrowserCustomerSelfAllowsCards(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (askEmyBrowserCustomerSelfCountType(text)) return false;
  return /\b(show|open|view|search|find|list|bring|pull up|display)\b/.test(text)
    || /\b(customer\s+(content|posts?|clips?|videos?|profile|account|uploads?|feed|activity|page)|my\s+customer\s+(content|posts?|clips?|videos?|profile|account|uploads?|feed|activity|page))\b/.test(text);
}

function askEmyIsProfileImageQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text || /\bprofile views?\b/.test(text)) return false;
  return /\b(image|photo|picture|avatar)\b/.test(text)
    && /\b(my|mine|me|account|profile|customer|client|business|shop|store|company)\b/.test(text);
}

function askEmyIsProfileOpenQuery(query) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (!text || askEmyIsProfileImageQuery(text)) return false;
  if (!/\b(profile|account)\b/.test(text)) return false;
  return /\b(show|open|view|go to|take me|bring|pull up|display)\b/.test(text)
    && /\b(my|mine|customer|client|business|shop|store|company|profile|account)\b/.test(text);
}

function askEmyIsProfileIntentQuery(query) {
  return askEmyIsProfileImageQuery(query) || askEmyIsProfileOpenQuery(query);
}

function askEmyProfileTargetRole(query, context = {}) {
  const text = String(query || "").toLowerCase().replace(/\s+/g, " ").trim();
  if (/\b(customers?|clients?|personal)\b/.test(text)) return "customer";
  if (/\b(business|shop|store|company|seller|owner)\b/.test(text)) return "business";
  const user = context.user || context.activeUser || (typeof readStoredAskUser === "function" ? readStoredAskUser() : null) || {};
  const role = String(context.accountRole || user.role || "").toLowerCase();
  return /\bbusiness\b/.test(role) ? "business" : "customer";
}

function askEmyProfileAccountCandidates(context = {}) {
  const rows = [];
  const add = (account) => {
    if (!account || typeof account !== "object") return;
    rows.push(account);
  };
  add(context.user);
  add(context.activeUser);
  if (Array.isArray(context.accountOptions)) context.accountOptions.forEach(add);
  if (Array.isArray(context.accounts)) context.accounts.forEach(add);
  const stored = typeof readStoredAskUser === "function" ? readStoredAskUser() : null;
  add(stored);
  return rows;
}

function askEmyProfileAccountMatchesRole(account = {}, role = "customer") {
  const accountRole = String(account.role || account.accountRole || account.type || "").toLowerCase();
  const hasBusinessIdentity = Boolean(account.businessName || account.businessKey || account.business || account.profileKey);
  if (role === "business") return /\bbusiness\b/.test(accountRole) || hasBusinessIdentity;
  return /\bcustomer\b/.test(accountRole) || (!accountRole && !hasBusinessIdentity);
}

function askEmyProfileAccountForRole(context = {}, role = "customer") {
  const rows = askEmyProfileAccountCandidates(context);
  return rows.find((account) => askEmyProfileAccountMatchesRole(account, role)) || rows[0] || {};
}

function askEmyProfileMedia(account = {}) {
  const pick = (values) => values.map((value) => String(value || "").trim()).find(Boolean) || "";
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
  const text = String(value || "").trim();
  if (!text || text.length > 2000) return "";
  if (/^(https?:\/\/|\/|\.\/|\.\.\/|assets\/|blob:|data:image\/)/i.test(text)) return text;
  return "";
}

function askEmyProfileUrlForRole(role) {
  return role === "business" ? "emy-business-profile.html?mode=business" : "emy-customer-profile.html";
}

function askEmyProfileReplyResult(query, context = {}) {
  const role = askEmyProfileTargetRole(query, context);
  const account = askEmyProfileAccountForRole(context, role);
  const media = askEmyProfileMedia(account);
  const hasImage = Boolean(media.image || media.imageRef);
  const label = role === "business" ? "business profile" : "customer profile";
  const name = String(role === "business" ? account.businessName || account.name || "" : account.name || account.displayName || account.customerName || "").trim();
  const url = askEmyProfileUrlForRole(role);
  const inlineImage = askEmyProfileInlineImage(media.image);
  const result = {
    type: role === "business" ? "business-profile" : "customer-profile",
    name: (name || "Your") + " " + label,
    desc: hasImage ? "This is the " + label + " image Ask EMY can see from your account data." : "I cannot see a saved image for this " + label + " yet.",
    image: media.image,
    imageRef: media.imageRef,
    url,
    tags: [role === "business" ? "Business profile" : "Customer profile", hasImage ? "Image saved" : "No image visible"].filter(Boolean)
  };
  if (!askEmyIsProfileImageQuery(query)) {
    return {
      text: [
        "Open your " + label + (name ? " for " + name : "") + ".",
        hasImage ? "Profile image\n" + (inlineImage ? "Image: " + inlineImage : "I can see a saved media reference for the profile image.") : ""
      ].filter(Boolean).join("\n\n"),
      results: [result]
    };
  }
  if (hasImage) {
    return {
      text: [
        "Yes, I can see your " + label + " image" + (name ? " for " + name : "") + ".",
        inlineImage ? "Image: " + inlineImage : "I can see a saved media reference for it, but not a direct image URL in this Ask EMY message.",
        "Open profile\nUse the profile card here to open the existing EMY profile view."
      ].join("\n\n"),
      results: [result]
    };
  }
  return {
    text: [
      "I cannot see a saved " + label + " image in the account data Ask EMY received.",
      "Open profile\nUse the profile card here to open the existing EMY profile view.",
      "What to do\n" + (role === "business" ? "Open the business profile and add or update the business profile photo." : "Open the customer profile and add or update the profile photo.")
    ].join("\n\n"),
    results: [result]
  };
}

function askEmyCustomerSelfContentReplyResult(query, context = {}) {
  const profile = askEmyProfileReplyResult("show my customer profile", context);
  const user = context.user || context.activeUser || (typeof readStoredAskUser === "function" ? readStoredAskUser() : null) || {};
  const businessName = String(user.businessName || user.business || "").trim();
  const contrast = businessName ? businessName + "'s customer list" : "a business customer list";
  const content = Array.isArray(context.customerContent) ? context.customerContent : askCollectCustomerSelfContent();
  const countType = askEmyBrowserCustomerSelfCountType(query);
  if (countType) {
    const matching = countType === "content items"
      ? content
      : content.filter((row) => {
          const source = String([row.sourceKey, row.type, row.kind, row.contentType, row.postMode, row.uploadType, row.mediaType].filter(Boolean).join(" ")).toLowerCase();
          if (countType === "posts") return /\b(post|feed|update)\b/.test(source) || !/\b(clip|reel|video|event|article|blog|news)\b/.test(source);
          if (countType === "clips") return /\b(clip|reel|video)\b/.test(source);
          if (countType === "events") return /\b(event|booking|workshop|class)\b/.test(source);
          if (countType === "articles") return /\b(article|blog|news)\b/.test(source);
          return false;
        });
    return {
      text: [
        matching.length
          ? "You have " + matching.length + " customer-side " + countType + " visible in EMY."
          : "I do not see any customer-side " + countType + " for your account in the Ask EMY records here yet.",
        "I counted your own customer-side content, not " + contrast + "."
      ].join("\n\n"),
      results: []
    };
  }
  return {
    text: [
      "I understand - you mean your own customer-side content/profile, not " + contrast + ".",
      content.length ? "What I found\nCustomer-side content visible: " + content.length + "\nI am showing the matching customer-side cards below." : "What I can show\nI can open your customer profile from the card below.\nI do not see saved customer posts or clips for your customer account in this browser yet.",
      "Next\nAsk for only your customer posts, clips, or profile and I will keep it separate from business-customer relationships."
    ].join("\n\n"),
    results: content.length ? content.map((row, index) => normaliseAskResult({
      id: row.id || row.key || row.postId || row.clipId || row.feedId || "customer-content-" + index,
      type: String([row.sourceKey, row.type, row.kind, row.contentType, row.mediaType].filter(Boolean).join(" ")).toLowerCase().includes("clip") ? "clip" : String([row.sourceKey, row.type, row.kind, row.contentType].filter(Boolean).join(" ")).toLowerCase().includes("event") ? "event" : "post",
      name: row.title || row.name || row.caption || row.text || "Your customer content",
      desc: row.description || row.summary || row.caption || row.text || row.body || row.message || "",
      image: row.image || row.imageUrl || row.imageSrc || row.photo || row.photoUrl || row.thumbnail || row.thumbnailUrl || row.coverImage || row.coverImageUrl || row.mediaSrc || row.mediaUrl || row.posterSrc || "",
      video: row.video || row.videoUrl || row.videoSrc || row.clipUrl || row.clipSrc || "",
      url: row.url || row.href || row.link || row.permalink || row.pageUrl || row.deepLink || askEmyProfileUrlForRole("customer"),
      date: row.date || row.createdAt || row.updatedAt || row.postedAt || row.time || "",
      tags: ["Customer content"]
    })).filter(Boolean).concat(profile.results || []) : profile.results
  };
}

const ASK_EMY_BROWSER_INTENT_WORDS = [
  "product", "products", "item", "items", "stock", "listing", "listings", "tomato", "tomatoes",
  "business", "businesses", "customer", "customers", "service", "services",
  "job", "jobs", "clip", "clips", "video", "videos", "post", "posts",
  "article", "articles", "event", "events", "price", "prices",
  "view", "views", "viewed", "viewing", "liked", "saved", "engagement", "performance", "popular", "rank", "ranking",
  "application", "applications", "applicant", "applicants", "profile",
  "stat", "stats", "statistic", "statistics", "analytics", "graph", "graphs", "chart", "charts", "compare", "comparison", "line", "bars"
];

const ASK_EMY_BROWSER_INTENT_WORD_ALIASES = {
  im: "am",
  busniess: "business",
  businiess: "business",
  busnies: "business",
  busniesses: "businesses",
  businiesses: "businesses",
  busnieses: "businesses",
  bsuniess: "business",
  buisness: "business",
  cutomer: "customer",
  cutomers: "customers",
  custmer: "customer",
  custmers: "customers",
  costumer: "customer",
  costumers: "customers",
  porudct: "product",
  porudcts: "products",
  producs: "products",
  prodcut: "product",
  prodcuts: "products",
  tomoato: "tomato",
  tomoatos: "tomatoes",
  tomoatoes: "tomatoes",
  tomatos: "tomatoes",
  actircle: "article",
  actircles: "articles",
  articel: "article",
  articels: "articles",
  orpost: "or post",
  orposts: "or posts",
  orclip: "or clip",
  orclips: "or clips",
  graophts: "graphs",
  graphts: "graphs",
  graps: "graphs",
  anylitic: "analytic",
  anylitics: "analytics",
  analitic: "analytic",
  analitics: "analytics",
  anlytic: "analytic",
  anlytics: "analytics",
  chrt: "chart",
  chrts: "charts",
  shoshow: "show",
  shwo: "show",
  showw: "show",
};

function askEmyBrowserSortedLetters(value) {
  return String(value || "").split("").sort().join("");
}

function askEmyBrowserNormalizeIntentWord(word) {
  const text = String(word || "").toLowerCase();
  if (ASK_EMY_BROWSER_INTENT_WORD_ALIASES[text]) return ASK_EMY_BROWSER_INTENT_WORD_ALIASES[text];
  if (text === "llocation") return "location";
  if (text === "viewd") return "viewed";
  if (!text || text.length < 4 || ASK_EMY_BROWSER_INTENT_WORDS.includes(text)) return text;
  const sorted = askEmyBrowserSortedLetters(text);
  const match = ASK_EMY_BROWSER_INTENT_WORDS.find((candidate) => candidate.length === text.length && candidate[0] === text[0] && askEmyBrowserSortedLetters(candidate) === sorted);
  return match || text;
}

function askEmyBrowserNormalizeIntentText(query) {
  return String(query || "").toLowerCase().replace(/\s+/g, " ").trim().replace(/\b[a-z][a-z0-9]*\b/g, (word) => askEmyBrowserNormalizeIntentWord(word));
}

function askEmyBrowserHasProductSearchTerm(text) {
  return /\b(products?|items?|listings?|stock|tomatoe?s?)\b/.test(text);
}

function askEmyBrowserIsProductPerformanceQuery(query) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text) return false;
  const wantsProduct = askEmyBrowserHasProductSearchTerm(text);
  const hasRankWord = /\b(most|top|best|highest|popular|rank|ranking|ranked)\b/.test(text);
  const hasMetricWord = /\b(views?|viewed|visits?|liked|saved|engagement|performance|interest|popular)\b/.test(text);
  const hasChartWord = /\b(compare|comparison|chart|graph|bars?)\b/.test(text);
  return wantsProduct && hasRankWord && (hasMetricWord || hasChartWord);
}

function askEmyBrowserIsSingleProductMetricQuestion(query) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text || !askEmyBrowserHasProductSearchTerm(text)) return false;
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

function askEmyBrowserIsGenericAnalyticsQuery(query) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text) return false;
  if (askEmyBrowserIsAnalyticsCapabilityQuestion(text)) return false;
  const hasLocationCue = /\b(near|nearby|near me|postcode|radius|km|miles|map|directions|route|around|area|close to)\b/.test(text);
  const hasAnalyticsWord = /\b(stat|stats|statistic|statistics|analytics|performance|graphs?|charts?|visual|bars?|line chart|bar chart|compare chart|pie chart|donut chart|over time|time series|timeseries)\b/.test(text);
  const hasMetric = /\b(profile views?|product views?|views?|viewed|likes?|liked|comments?|replies|saves?|saved|applications?|applicants?|enquiries?|inquiries?|messages?|engagement|overall score|count)\b/.test(text);
  const hasEntity = /\b(products?|items?|listings?|businesses?|shops?|stores?|jobs?|roles?|clips?|videos?|posts?|articles?|customers?)\b/.test(text);
  const entityByMetric = hasEntity && /\bby\b/.test(text) && hasMetric;
  const compareBusinesses = /\b(compare|comparison)\b[\s\S]{0,60}\b(businesses|shops|stores)\b/.test(text);
  if (hasLocationCue && !hasAnalyticsWord && !entityByMetric && !compareBusinesses) return false;
  return Boolean(hasAnalyticsWord || entityByMetric || compareBusinesses);
}

function askEmyBrowserIsAnalyticsCapabilityQuestion(query) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text) return false;
  const asksCapability = /\b(do you|can you|could you|are you able to|would you|will you)\b/.test(text);
  const analyticsSubject = /\b(analytics?|statistics?|stats?|analysis|analyse|analyze|graphs?|charts?|compar(?:e|ison))\b/.test(text);
  if (!asksCapability || !analyticsSubject) return false;
  const executionCue = /\b(show|open|pull up|give me|list|rank|ranking|top|most|highest|which|what is|how many|over time|by|from|using|my products?|my business|profile views?|product views?|clip views?|post views?)\b/.test(text);
  return !executionCue;
}

function askEmyBrowserIsDailyUpdateQuery(query) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text) return false;
  const actionUpdate = /\b(update my|update the|edit|change|create|publish|draft|delete|remove)\b/.test(text)
    && /\b(profile|account|business|product|post|clip|job|image|video|card)\b/.test(text);
  if (actionUpdate) return false;
  return /\b(what'?s new|whats new|what is new)\b/.test(text)
    || /\b(new|latest|recent|today'?s|daily)\b[\s\S]{0,28}\b(emy|updates?|activity|things?|records?|businesses?|products?|jobs?|clips?|posts?|articles?|events?)\b/.test(text)
    || /\b(emy|platform)\b[\s\S]{0,28}\b(new|latest|recent|updates?|activity|changed|changes)\b/.test(text)
    || /\b(tell me|give me|show me|bring me|pull up)\b[\s\S]{0,28}\b(daily update|latest update|today'?s update|recent activity|new activity)\b/.test(text);
}

const EMY_ASSISTANT_CONTRACT_VERSION = "v1";

function askEmyBrowserBrainResponseType(intent, recordCardsAllowed) {
  if (recordCardsAllowed) return "small_result_list";
  if (intent === "analytics") return "analytics_chart";
  if (intent === "guidance") return "guidance_steps";
  if (intent === "viewer-location" || intent === "viewer-profile" || intent === "identity" || intent === "conversation" || intent === "platform-info") return "chat_answer";
  if (intent === "unclear") return "confirmation_question";
  return "chat_answer";
}

function askEmyBrowserPlannerIntentFromDecision(intent, lowered) {
  if (intent === "conversation") return "CHAT";
  if (intent === "daily-update") return "DAILY_UPDATE";
  if (intent === "viewer-location") return "VIEWER_LOCATION";
  if (intent === "viewer-profile") return /\b(account|details?|information)\b/.test(lowered) ? "ACCOUNT" : "IDENTITY";
  if (intent === "guidance") return "GUIDANCE";
  if (intent === "profile" && /\b(business|shop|store|company)\b/.test(lowered)) return "BUSINESS_PROFILE";
  if (intent === "analytics") return /\bproducts?\b/.test(lowered) ? "PRODUCT_LIST_METRIC" : "BUSINESS_ANALYTICS";
  if (intent === "business") {
    if (!/\b(stat|stats|statistics|analytics|graph|graphs|chart|charts|performance|views?|likes?|comments?|saves?|engagement|data)\b/.test(lowered)
      && !(/^(open|view)\s+(?:the\s+)?(?:business|shop|store|company)\s+\S/.test(lowered) && !/\b(my|mine|own|owned|card|profile|page)\b/.test(lowered))
      && (/\b(show|open|view|display|bring|pull up|find|get|see)\b[\s\S]{0,50}\b(my|own|owned|business|shop|store|company)\b[\s\S]{0,35}\b(card|profile|page|business|shop|store|company)\b/.test(lowered) || /\bcan you find my (business|shop|store|company)\b/.test(lowered))) return "BUSINESS_PROFILE";
    return /\b(near|nearby|around me|local|postcode|radius|map|directions|location|area)\b/.test(lowered) ? "SEARCH_NEARBY" : "UNKNOWN";
  }
  if (intent === "clip") {
    if (/\b(show|list|display|bring|pull up|see|get|give|open|view)\b[\s\S]{0,50}\b(my|mine|own|owned|business)\b[\s\S]{0,50}\b(clips?|videos?|reels?)\b/.test(lowered) || /\b(my|mine|own|owned|business)\b[\s\S]{0,50}\b(clips?|videos?|reels?)\b/.test(lowered)) return "CLIP_LIST";
    if (/\b(show|list|display|bring|pull up|see|get|give|open|view|find|search)\b[\s\S]{0,60}\b(clips?|videos?|reels?)\b/.test(lowered) || /\b(clips?|videos?|reels?)\b[\s\S]{0,60}\b(near|nearby|around|local|all|show|list|find|search)\b/.test(lowered)) return "CLIP_SEARCH";
  }
  if (intent === "post") {
    if (/\b(show|list|display|bring|pull up|see|get|give|open|view)\b[\s\S]{0,50}\b(my|mine|own|owned|business)\b[\s\S]{0,50}\b(posts?|updates?|feed)\b/.test(lowered) || /\b(my|mine|own|owned|business)\b[\s\S]{0,50}\b(posts?|updates?|feed)\b/.test(lowered)) return "POST_LIST";
    if (/\b(show|list|display|bring|pull up|see|get|give|open|view|find|search)\b[\s\S]{0,60}\b(posts?|updates?|feed)\b/.test(lowered) || /\b(posts?|updates?|feed)\b[\s\S]{0,60}\b(near|nearby|around|local|all|show|list|find|search)\b/.test(lowered)) return "POST_SEARCH";
  }
  if (intent === "product") {
    if (askEmyBrowserIsSingleProductMetricQuestion(lowered)) return "PRODUCT_SINGLE_METRIC";
    if (askEmyBrowserIsProductPerformanceQuery(lowered)) return "PRODUCT_LIST_METRIC";
    if (/\b(my|mine|own|owned|business)\b[\s\S]{0,50}\bproducts?\b/.test(lowered) || /\bmy products?\b/.test(lowered)) return "PRODUCT_LIST";
    if (/\b(near|nearby|near me|around me|postcode|radius|km|miles|map|directions|location|area|close to)\b/.test(lowered)) return "SEARCH_NEARBY";
    return "PRODUCT_SEARCH";
  }
  return "UNKNOWN";
}

function askEmyBrowserPlannerToolHint(plannerIntent) {
  if (plannerIntent === "IDENTITY" || plannerIntent === "ACCOUNT") return "getViewerAccount";
  if (plannerIntent === "VIEWER_LOCATION") return "getViewerLocation";
  if (plannerIntent === "DAILY_UPDATE") return "getDailyEmyUpdate";
  if (plannerIntent === "GUIDANCE") return "guideNextStep";
  if (plannerIntent === "PRODUCT_LIST") return "getOwnedProducts";
  if (plannerIntent === "CLIP_LIST") return "getOwnedClips";
  if (plannerIntent === "POST_LIST") return "getOwnedPosts";
  if (plannerIntent === "CLIP_SEARCH" || plannerIntent === "POST_SEARCH") return "searchNearby";
  if (plannerIntent === "BUSINESS_PROFILE") return "getOwnedBusinessCard";
  if (plannerIntent === "PRODUCT_SINGLE_METRIC") return "getMostViewedProduct";
  if (plannerIntent === "PRODUCT_LIST_METRIC") return "getTopProductsAnalytics";
  if (plannerIntent === "BUSINESS_ANALYTICS") return "getBusinessStatsOverview";
  if (plannerIntent === "SEARCH_NEARBY") return "searchNearby";
  if (plannerIntent === "PRODUCT_SEARCH") return "searchProducts";
  return "answerDirectly";
}

function askEmyBrowserToolPolicy(toolHint) {
  const policies = {
    answerDirectly: { permission: "viewer", dataSource: "assistant_context", responseType: "chat_answer", cardsAllowed: false, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: false },
    getViewerAccount: { permission: "viewer", dataSource: "viewer_session", responseType: "chat_answer", cardsAllowed: false, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: false },
    getViewerLocation: { permission: "viewer", dataSource: "viewer_location_context", responseType: "chat_answer", cardsAllowed: false, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: false },
    guideNextStep: { permission: "viewer", dataSource: "assistant_playbook", responseType: "guidance_steps", cardsAllowed: false, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: false },
    getDailyEmyUpdate: { permission: "viewer", dataSource: "recent_emy_activity", responseType: "small_result_list", cardsAllowed: true, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: true },
    getOwnedProducts: { permission: "business-owner", dataSource: "owned_business_products", responseType: "small_result_list", cardsAllowed: true, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: true },
    getOwnedClips: { permission: "business-owner", dataSource: "owned_business_clips", responseType: "small_result_list", cardsAllowed: true, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: true },
    getOwnedPosts: { permission: "business-owner", dataSource: "owned_business_posts", responseType: "small_result_list", cardsAllowed: true, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: true },
    getOwnedBusinessCard: { permission: "business-owner", dataSource: "owned_business_profile", responseType: "small_result_list", cardsAllowed: true, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: true },
    searchProducts: { permission: "public", dataSource: "public_product_search", responseType: "small_result_list", cardsAllowed: true, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: true },
    getMostViewedProduct: { permission: "business-owner", dataSource: "canonical_product_analytics", responseType: "inline_product_view", cardsAllowed: true, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: true },
    getTopProductByMetric: { permission: "business-owner", dataSource: "canonical_product_analytics", responseType: "inline_product_view", cardsAllowed: true, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: true },
    getTopProductsAnalytics: { permission: "business-owner", dataSource: "canonical_product_analytics", responseType: "analytics_chart", cardsAllowed: false, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: false },
    getBusinessStatsOverview: { permission: "business-owner", dataSource: "canonical_business_analytics", responseType: "analytics_chart", cardsAllowed: false, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: false },
    searchNearby: { permission: "public", dataSource: "public_location_search", responseType: "small_result_list", cardsAllowed: true, locationSearchAllowed: true, requiresConfirmation: false, usesExistingView: true },
    createDraft: { permission: "viewer", dataSource: "draft_builder", responseType: "draft_preview", cardsAllowed: false, locationSearchAllowed: false, requiresConfirmation: true, usesExistingView: false },
    openInlineView: { permission: "viewer", dataSource: "existing_item_view", responseType: "inline_product_view", cardsAllowed: true, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: true },
    compareItems: { permission: "viewer", dataSource: "canonical_comparison", responseType: "comparison_table", cardsAllowed: false, locationSearchAllowed: false, requiresConfirmation: false, usesExistingView: false }
  };
  return policies[toolHint] || policies.answerDirectly;
}

function askEmyIsNoCardQuestion(query, context = {}) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text) return true;
  if (askEmyBrowserIsAnalyticsCapabilityQuestion(text)) return true;
  if (askEmyBrowserIsViewerLocationQuery(text, context)) return true;
  if (askEmyBrowserIsViewerProfileQuery(text, context)) return true;
  if (askEmyIsIdentityIntroQuery(text)) return true;
  if (askEmyIsOpenConversationPrompt(text)) return true;
  if (askEmyIsConversationalFragmentQuery(text)) return true;
  if (askEmyIsSimpleGreetingQuery(text)) return true;
  if (askEmyIsBareNextStepQuestion(text)) return true;
  if (askEmyIsAssistantGuidanceQuery(text)) return true;
  if (/\b(tell me about my account|what do you know about my account|my account details|my account information|do you know who i am|who am i|what do i do|what should i do|where do i start)\b/.test(text)) return true;
  return false;
}

function askEmyExplicitRecordCardQuery(query, context = {}) {
  const text = askEmyBrowserNormalizeIntentText(query);
  if (!text || askEmyIsNoCardQuestion(text, context)) return false;
  if (askEmyBrowserIsDailyUpdateQuery(text)) return true;
  if (askEmyBrowserIsCustomerSelfContentQuery(text)) return askEmyBrowserCustomerSelfAllowsCards(text);
  if (askEmyIsProfileOpenQuery(text) || askEmyIsProfileImageQuery(text)) return true;
  if (askEmyBrowserIsSingleProductMetricQuestion(text)) return true;
  const recordNoun = askEmyBrowserHasProductSearchTerm(text) || /\b(businesses?|shops?|stores?|places?|jobs?|roles?|clips?|videos?|reels?|posts?|articles?|services?)\b/.test(text);
  if (!recordNoun) return false;
  const explicitAction = /\b(show|list|display|open|view|search|find|bring|pull up|see|get|give)\b/.test(text);
  const explicitOwnedContent = /\b(my|own|owned|all)\b[\s\S]{0,45}\b(products?|posts?|clips?|jobs?|content|items?|listings?|tomatoe?s?)\b/.test(text);
  const correctionToOwnedContent = /\b(i said|i asked|i mean|no no|not that|wrong)\b[\s\S]{0,80}\bmy\b[\s\S]{0,35}\b(products?|posts?|clips?|jobs?|content)\b/.test(text);
  const locationRecordSearch = /\b(near|nearby|near me|around me|postcode|radius|km|miles|map|directions|route|area|close to)\b/.test(text)
    && /\b(shops?|businesses?|stores?|places?|jobs?|products?|services?)\b/.test(text);
  return Boolean(explicitAction || explicitOwnedContent || correctionToOwnedContent || locationRecordSearch);
}

function askEmyBrowserBrainDecision(query, context = {}) {
  const clean = String(query || "").trim() || "nearby businesses";
  const lowered = askEmyBrowserNormalizeIntentText(clean);
  const intent = askEmyBrowserIsViewerLocationQuery(lowered, context) ? "viewer-location"
    : askEmyBrowserIsViewerProfileQuery(lowered, context) ? "viewer-profile"
    : askEmyBrowserIsMapCapabilityQuery(lowered) ? "map-capability"
    : askEmyBrowserIsBusinessCustomerGeoQuery(lowered) ? "customer-geo"
    : askEmyIsIdentityIntroQuery(lowered) ? "identity"
    : askEmyIsOpenConversationPrompt(lowered) ? "conversation"
    : askEmyIsConversationalFragmentQuery(lowered) ? "conversation"
    : askEmyIsSocialChatQuery(clean) ? "conversation"
    : /^(hi|hello|hey|how are you|how're you|how is it going|how's it going|good morning|good afternoon|good evening|thanks|thank you)\b/.test(lowered) || /\b(how are you|how's your day|how is your day|what's up|whats up)\b/.test(lowered) ? "conversation"
    : askEmyBrowserIsDailyUpdateQuery(lowered) ? "daily-update"
    : /\b(what is emy|what's emy|about emy|explain emy|tell me about emy|how does emy work|what does emy do)\b/.test(lowered) ? "platform-info"
    : askEmyIsBareActionNounQuery(lowered) ? "conversation"
    : askEmyIsAssistantGuidanceQuery(lowered) ? "guidance"
    : askEmyBrowserIsAnalyticsCapabilityQuestion(lowered) ? "conversation"
    : askEmyIsProfileIntentQuery(lowered) ? "profile"
    : askEmyBrowserIsCustomerSelfContentQuery(lowered) ? "customer-self"
    : askLocalCustomerRelationshipQuery(lowered) ? "customer"
      : askEmyBrowserIsSingleProductMetricQuestion(lowered) ? "product"
      : askEmyBrowserIsProductPerformanceQuery(lowered) ? "product"
      : askEmyBrowserIsGenericAnalyticsQuery(lowered) ? "analytics"
      : /\b(service|services|support|logistics|supplier|suppliers|legal|financial|finance|advice|insight|insights|customer experience|business access)\b/.test(lowered) ? "service"
        : /\b(job|jobs|hiring|hire|work|role|roles|cv|apply)\b/.test(lowered) ? "job"
          : /\b(event|events|meetup|booking|class|workshop|when)\b/.test(lowered) ? "event"
            : /\b(product|products|price|prices|buy|available|cheapest|cost|bottle|face wash|pizza slice|tomatoe?s?)\b/.test(lowered) ? "product"
              : /\b(clip|clips|video|videos|reel|reels)\b/.test(lowered) ? "clip"
                : /\b(article|articles|blog|news)\b/.test(lowered) ? "article"
                  : /\b(post|posts|feed|feeds|update|updates)\b/.test(lowered) ? "post"
                    : /\b(near|nearby|around me|local|business|businesses|open)\b/.test(lowered) ? "business"
                    : "general";
  const customerSelfCardsAllowed = intent === "customer-self" && askEmyBrowserCustomerSelfAllowsCards(clean);
  const assistantOnly = ["identity", "conversation", "platform-info", "guidance", "profile", "analytics", "viewer-location", "viewer-profile", "map-capability", "customer-geo"].includes(intent)
    || askEmyIsNoCardQuestion(clean, context)
    || askEmyIsOwnershipFollowUpQuery(clean);
  const baseRecordCardsAllowed = intent === "daily-update" || (!assistantOnly && ["business", "service", "product", "job", "event", "clip", "article", "post"].includes(intent)) || customerSelfCardsAllowed;
  const plannerIntent = askEmyBrowserPlannerIntentFromDecision(intent, lowered);
  const plannerToolHint = askEmyBrowserPlannerToolHint(plannerIntent);
  const toolPolicy = askEmyBrowserToolPolicy(plannerToolHint);
  const explicitRecordCardsAllowed = askEmyExplicitRecordCardQuery(clean, context);
  const recordCardsAllowed = Boolean(((toolPolicy.cardsAllowed && baseRecordCardsAllowed) || customerSelfCardsAllowed) && explicitRecordCardsAllowed);
  return {
    clean,
    lowered,
    intent,
    assistantOnly,
    explicitRecordCardsAllowed,
    recordCardsAllowed,
    responseType: askEmyBrowserBrainResponseType(intent, recordCardsAllowed),
    cardsAllowedReason: recordCardsAllowed ? "intent:" + intent : assistantOnly ? "assistant-only:" + intent : "blocked:" + intent,
    contractVersion: EMY_ASSISTANT_CONTRACT_VERSION,
    plannerIntent: plannerIntent,
    plannerToolHint: plannerToolHint,
    selectedToolName: plannerToolHint,
    selectedToolPermission: toolPolicy.permission,
    selectedToolDataSource: toolPolicy.dataSource,
    selectedToolRequiresConfirmation: Boolean(toolPolicy.requiresConfirmation),
    selectedToolUsesExistingView: Boolean(toolPolicy.usesExistingView),
    locationSearchAllowed: Boolean(toolPolicy.locationSearchAllowed && plannerIntent === "SEARCH_NEARBY"),
    mode: recordCardsAllowed ? "records" : "assistant"
  };
}

const ASK_EMY_ENDPOINT_TIMEOUT_MS = 45000;
const ASK_EMY_TOTAL_REPLY_TIMEOUT_MS = 55000;
const ASK_EMY_PENDING_RECOVERY_MS = 60000;
const ASK_EMY_AI_FIRST_FRONTEND_VERSION = 2;

function askEmyProviderLooksLiveAi(provider) {
  return /^(openai|openrouter|deepseek):/i.test(String(provider || "").trim());
}

function askEmyMessageUsesCurrentAi(message) {
  if (!message || message.role !== "assistant") return true;
  const version = Number(message.aiFirstVersion || message.liveAiVersion || 0);
  if (version >= ASK_EMY_AI_FIRST_FRONTEND_VERSION) return true;
  const provider = String(message.provider || "").trim();
  if (askEmyProviderLooksLiveAi(provider)) return true;
  if (/^ai-(?:unavailable|error|empty|timeout)/i.test(provider)) return true;
  return false;
}

function askEmyAssistantMessageNeedsLiveRefresh(message, previousUserMessage, isLatestAssistant) {
  if (!isLatestAssistant || !message || message.role !== "assistant") return false;
  if (message.pending || message.loadingStarted) return false;
  if (!previousUserMessage || previousUserMessage.role !== "user" || !String(previousUserMessage.text || "").trim()) return false;
  if (askEmyMessageUsesCurrentAi(message)) return false;
  return true;
}

function askEmyAiUnavailableFrontendMessage(reason = "") {
  const detail = String(reason || "").trim();
  return detail
    ? "EMY AI is unavailable right now (" + detail + "). I will not use saved or template text for this answer."
    : "EMY AI is unavailable right now. I will not use saved or template text for this answer.";
}

function askEmyApiCandidates() {
  const urls = [];
  const seen = new Set();
  const add = (url) => {
    const value = String(url || "").trim();
    if (!value) return;
    let key = value;
    try {
      key = new URL(value, window.location.origin).href;
    } catch (error) {}
    if (seen.has(key)) return;
    seen.add(key);
    urls.push(value);
  };
  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    add(window.location.origin + "/api/ask-emy");
    add("/api/ask-emy");
  }
  try {
    add(window.EMY_ASK_EMY_API_URL);
    add(window.EMY_ASK_API_URL);
    add(localStorage.getItem("emyAskEmyApiUrl"));
    add(localStorage.getItem("emyAskApiUrl"));
    add(document.querySelector("meta[name='emy-ask-api-url']")?.content);
  } catch (error) {}
  if (window.EMY_ASK_ALLOW_FALLBACK_ENDPOINTS === true || localStorage.getItem("emyAskAllowFallbackEndpoints") === "1") {
    add("http://127.0.0.1:8779/api/ask-emy");
    add("http://localhost:8779/api/ask-emy");
    add("http://127.0.0.1:8767/api/ask-emy");
    add("http://localhost:8767/api/ask-emy");
    add("https://europe-west2-my-emy-db032.cloudfunctions.net/askEmyHttp");
  }
  return urls;
}

function unwrapAskEmyPayload(payload) {
  const source = payload && typeof payload === "object" ? payload : {};
  const answerValue = source.answer || source.text || "";
  if (typeof answerValue !== "string") return source;
  const clean = answerValue.trim();
  if (!/^\{[\s\S]*\}$/.test(clean)) return source;
  try {
    const parsed = JSON.parse(clean);
    if (!parsed || typeof parsed !== "object") return source;
    const parsedResults = Array.isArray(parsed.results) ? parsed.results : [];
    return {
      ...source,
      answer: parsed.answer || parsed.text || source.answer,
      text: parsed.text || parsed.answer || source.text,
      provider: source.provider || parsed.provider,
      results: Array.isArray(source.results) && source.results.length ? source.results : parsedResults,
    };
  } catch (error) {
    return source;
  }
}

function askEmyShouldUseLocalAssistantReply() {
  return false;
}

function askEmyFetchWithTimeout(endpoint, options = {}, timeoutMs = ASK_EMY_ENDPOINT_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    let settled = false;
    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      try { if (controller) controller.abort(); } catch (error) {}
      reject(new Error("Ask EMY request timed out"));
    }, timeoutMs);
    fetch(endpoint, {
      ...options,
      signal: controller ? controller.signal : options.signal,
    }).then((response) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve(response);
    }).catch((error) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      reject(error);
    });
  });
}

async function fetchAskEmyReply(query, context = {}) {
  const activeUser = typeof readStoredAskUser === "function" ? readStoredAskUser() : null;
  const accountOptions = typeof readEmyAskAccountOptions === "function" ? readEmyAskAccountOptions() : activeUser ? [activeUser] : [];
  const accountRole = typeof activeAskAccountRole === "function" ? activeAskAccountRole() : activeUser && activeUser.role || "";
  const askLocationState = typeof readStoredAskLocation === "function" ? readStoredAskLocation(new URLSearchParams(window.location.search || "")) : {};
  const fallbackContext = {
    ...context,
    location: context.location || askLocationState.location || "",
    radius: context.radius || askLocationState.radius || "",
    user: activeUser,
    accountOptions,
    accountRole
  };
  const browserBrain = askEmyBrowserBrainDecision(query);
  const suppressResults = !browserBrain.recordCardsAllowed;
  const shouldSendRecordContext = Boolean(browserBrain.recordCardsAllowed || browserBrain.explicitRecordCardsAllowed);
  const followedBusinesses = shouldSendRecordContext ? askCollectFollowedBusinesses() : [];
  const businessCustomers = shouldSendRecordContext ? askCollectBusinessCustomers() : [];
  const customerContent = shouldSendRecordContext ? askCollectCustomerSelfContent() : [];
  const customerContentTypeText = (row) => String([row.sourceKey, row.type, row.kind, row.contentType, row.postMode, row.uploadType, row.mediaType].filter(Boolean).join(" ")).toLowerCase();
  const businessLikePairs = askEmyBrowserReadLocalJson("emyBusinessLikePairs") || [];
  const businessLikeState = askEmyBrowserReadLocalJson("emyBusinessLikeState") || {};
  const body = JSON.stringify({
    query,
    chatId: context.chatId || "",
    location: context.location || askLocationState.location || "",
    radius: context.radius || askLocationState.radius || "",
    latitude: context.latitude ?? askLocationState.latitude ?? null,
    longitude: context.longitude ?? askLocationState.longitude ?? null,
    locationLabel: context.locationLabel || askLocationState.locationLabel || "",
    locationSource: context.locationSource || askLocationState.locationSource || "",
    accountRole,
    user: activeUser,
    accountOptions,
    followedBusinesses,
    businessCustomers,
    businessLikePairs,
    businessLikeState,
    emyBusinessLikePairs: businessLikePairs,
    emyBusinessLikeState: businessLikeState,
    customerContent,
    customerPosts: customerContent.filter((row) => !/\b(clip|reel|video|event|article|blog|news)\b/.test(customerContentTypeText(row))),
    customerClips: customerContent.filter((row) => /\b(clip|reel|video)\b/.test(customerContentTypeText(row))),
    customerUploads: customerContent,
    history: Array.isArray(context.history) ? context.history.slice(-8) : [],
  });
  let lastError = "";
  const replyDeadline = Date.now() + ASK_EMY_TOTAL_REPLY_TIMEOUT_MS;
  for (const endpoint of askEmyApiCandidates()) {
    try {
      const remainingMs = replyDeadline - Date.now();
      if (remainingMs < 250) break;
      const response = await askEmyFetchWithTimeout(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }, Math.min(ASK_EMY_ENDPOINT_TIMEOUT_MS, remainingMs));
      if (!response.ok) throw new Error("Ask EMY server returned " + response.status);
      const payload = unwrapAskEmyPayload(await response.json());
      const responseText = String(payload.answer || payload.text || "").trim();
      if (!responseText) throw new Error("Ask EMY AI returned an empty answer");
      const serverProvidedResults = Array.isArray(payload.results);
      const serverSelectedTool = payload.selectedToolName || browserBrain.selectedToolName || "";
      const serverResponseType = payload.responseType || browserBrain.responseType || "";
      const serverAllowsInlineResults = /^(openinlineview|getownedbusinesscard|getownedbusinesscards|getcustomerprofilecard|getviewerprofilecards|getmediapreview)$/i.test(String(serverSelectedTool || "").trim())
        || Boolean(payload.action && payload.action.usesExistingView)
        || /^inline_/.test(serverResponseType);
      const shouldSuppressResults = suppressResults && !serverAllowsInlineResults;
      const results = shouldSuppressResults ? [] : serverProvidedResults
        ? payload.results.map(normaliseAskResult).filter(Boolean)
        : [];
      return {
        text: responseText,
        results,
        analytics: payload.analytics || payload.chart || null,
        action: payload.action || null,
        provider: payload.provider || "Ask EMY AI",
        responseType: payload.responseType || browserBrain.responseType || "",
        selectedToolName: payload.selectedToolName || browserBrain.selectedToolName || "",
        aiFirstVersion: payload.aiFirstVersion || ASK_EMY_AI_FIRST_FRONTEND_VERSION,
      };
    } catch (error) {
      lastError = error && error.message ? error.message : "Ask EMY server unreachable";
    }
  }
  throw new Error(lastError || "Ask EMY request timed out");
}

function makeReply(query) {
  const now = Date.now();
  return {
    id: "assistant-" + now + "-" + Math.random().toString(36).slice(2, 7),
    role: "assistant",
    text: "...",
    results: [],
    pending: true,
    createdAt: now,
    query,
  };
}

function askEmyMessageLooksLoading(message = {}) {
  if (!message || message.role !== "assistant") return false;
  if (message.pending === true || message.loadingStarted === true) return true;
  return String(message.text || "").trim() === "...";
}

function askEmyMessageCanStop(message = {}) {
  if (!askEmyMessageLooksLoading(message)) return false;
  if (message.provider === "user-stopped" || message.responseType === "stopped") return false;
  return true;
}`
    );
    code = code.replace(
      /\s*\{\s*name:\s*"Bright IT Support",[\s\S]*?tags:\s*\[[^\]]*\],\s*\},?/,
      ''
    );
    code = code.replace(
      /function ChatMessage\(\{ entry \}\) \{[\s\S]*?\r?\n\}\r?\n\r?\nfunction LocationFilter/,
      `${askResultsResponseActions}

function askEntryIsConversation(entry) {
  const text = String((entry && (entry.query || entry.text)) || "").trim().toLowerCase();
  return /^(hi|hello|hey|how are you|how're you|how is it going|how's it going|good morning|good afternoon|good evening|thanks|thank you)\\b/.test(text)
    || /\\b(how are you|how's your day|how is your day|what's up|whats up)\\b/.test(text);
}

function askInlineParts(text) {
  const source = String(text || "");
  const parts = source.split(/(\`[^\`]+\`)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (/^\`[^\`]+\`$/.test(part)) {
      return <code key={index} className="rounded-md bg-[#001B47]/6 px-1.5 py-0.5 font-mono text-[0.92em] font-semibold text-[#001B47]">{part.slice(1, -1)}</code>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function askLineLooksLikeStrongSectionTitle(line, nextLine) {
  const text = String(line || "").trim().replace(/:$/, "");
  if (!text || !nextLine) return false;
  if (text.length > 54) return false;
  if (/[.!?]$/.test(text)) return false;
  return /^(draft message|job details|next step|search area|price note|ranking basis|statistics chart|stats chart|product statistics chart|product stats chart|top products|most sold product|most viewed product|popular products|other popular products|what i can see|what to improve next|what to prepare|what i need|how i can help|send me the product details|tell me one detail|then i can|open this|when you get there|what i can convert or prepare|send me the raw material|how i will decide|start point|open the right place|create it in emy|what i can do next|send rough details|open data area|what i can analyse|what i can analyze|choose the action|tell me the target|start with|good growth paths|choose one|best next question|how we can approach it|tell me this|what i can look at|i can help with|pick a direction|updated|i changed it so|results|details|summary|recommendation|recommendations|steps|why|how to apply)$/i.test(text);
}

function askLineLooksLikeSectionTitle(line, nextLine) {
  const text = String(line || "").trim().replace(/:$/, "");
  if (!text || !nextLine) return false;
  if (text.length > 54) return false;
  if (/[.!?]$/.test(text)) return false;
  return askLineLooksLikeStrongSectionTitle(line, nextLine)
    || (/^[A-Z][A-Za-z0-9 /&-]{2,54}$/.test(text) && !/:/.test(text));
}

function askSafeInlineUrl(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const lower = text.toLowerCase();
  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("/") ||
    lower.startsWith("./") ||
    lower.startsWith("../") ||
    lower.startsWith("assets/") ||
    lower.startsWith("data:image/") ||
    lower.startsWith("blob:")
  ) return text;
  if (/^[a-z0-9_.-]+[.]html(?:[?#].*)?$/i.test(text)) return text;
  return "";
}

function askRenderSpecialLine(line, key) {
  const text = String(line || "").trim();
  const imageMatch = text.match(/^(?:image|media):\s*(.+)$/i);
  if (imageMatch) {
    const url = askSafeInlineUrl(imageMatch[1]);
    if (url) {
      return (
        <span key={key} className="inline-flex max-w-full items-center rounded-xl border border-[#E4E7EC] bg-[#F8FAFC] p-1.5 align-middle">
          <img src={url} alt="Result image" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
        </span>
      );
    }
  }
  const linkMatch = text.match(/^(?:link|open):\s*(.+)$/i);
  if (linkMatch) {
    const url = askSafeInlineUrl(linkMatch[1]);
    if (url) {
      return (
        <a key={key} href={url} className="inline-flex min-h-[32px] items-center rounded-full bg-orange-500 px-3 text-xs font-black text-white shadow-sm transition hover:bg-orange-600">
          Open result <span className="ml-2" aria-hidden="true">{">"}</span>
        </a>
      );
    }
  }
  return null;
}

function askBareInlineUrl(line) {
  const text = askCleanBulletLine(line);
  return askSafeInlineUrl(text);
}

function askLooksLikeImageUrl(value) {
  const text = String(value || "").trim();
  return /\\.(png|jpe?g|webp|gif|avif)(?:[?#].*)?$/i.test(text) || /\\/image\\/upload\\//i.test(text) || /^data:image\\//i.test(text);
}

function askNormalizeSpecialAnswerLines(lines) {
  const source = Array.isArray(lines) ? lines : [];
  const normalized = [];
  for (let index = 0; index < source.length; index += 1) {
    const line = String(source[index] || "").trim();
    if (!line) continue;
    const cleanLine = askCleanBulletLine(line);
    const labelOnly = cleanLine.match(/^(image|media|thumbnail|photo|picture|link|open|url|product link|product url):\s*$/i);
    if (labelOnly && index + 1 < source.length) {
      const nextUrl = askBareInlineUrl(source[index + 1]);
      if (nextUrl) {
        normalized.push(labelOnly[1] + ": " + nextUrl);
        index += 1;
        continue;
      }
    }
    const bareUrl = askBareInlineUrl(cleanLine);
    if (bareUrl) {
      normalized.push((askLooksLikeImageUrl(bareUrl) ? "Image: " : "Link: ") + bareUrl);
      continue;
    }
    normalized.push(line);
  }
  return normalized;
}

function askLineIsSeparator(line) {
  return /^[-*_]{3,}$/.test(String(line || "").trim());
}

function askMarkdownTableCells(line) {
  let text = String(line || "").trim();
  if (!text || !text.includes("|")) return [];
  if (text.startsWith("|")) text = text.slice(1);
  if (text.endsWith("|")) text = text.slice(0, -1);
  return text.split("|").map((cell) => cell.trim());
}

function askLineIsMarkdownTableSeparator(line) {
  const cells = askMarkdownTableCells(line);
  return cells.length >= 2 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function askLineIsMarkdownTableRow(line) {
  const cells = askMarkdownTableCells(line);
  return cells.length >= 2 && !askLineIsMarkdownTableSeparator(line);
}

function askReadMarkdownTable(lines, startIndex) {
  const header = askMarkdownTableCells(lines[startIndex]);
  if (header.length < 2 || !askLineIsMarkdownTableSeparator(lines[startIndex + 1])) return null;
  const rows = [];
  let index = startIndex + 2;
  for (; index < lines.length; index += 1) {
    if (!askLineIsMarkdownTableRow(lines[index])) break;
    const cells = askMarkdownTableCells(lines[index]);
    rows.push(header.map((_, cellIndex) => cells[cellIndex] || ""));
  }
  if (!rows.length) return null;
  return { header, rows, endIndex: index };
}

function askRenderMarkdownTable(table, key) {
  if (!table || !Array.isArray(table.header) || !Array.isArray(table.rows) || !table.rows.length) return null;
  return (
    <div key={key} className="my-2 max-w-full overflow-x-auto rounded-xl border border-[#D0D5DD] bg-white shadow-sm shadow-[#001B47]/5">
      <table className="min-w-[560px] border-collapse text-left text-sm text-[#001B47]">
        <thead className="bg-[#F8FAFC]">
          <tr>
            {table.header.map((cell, index) => (
              <th key={index} className="border-b border-[#D0D5DD] px-4 py-3 text-xs font-black uppercase tracking-normal text-[#001B47]">{askInlineParts(cell)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[#E4E7EC] last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="max-w-[240px] align-top px-4 py-3 text-sm font-semibold leading-5 text-[#001B47]/90">
                  <span className="break-words">{askRenderSpecialLine(cell, key + "-cell-" + rowIndex + "-" + cellIndex) || askInlineParts(cell)}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function askRenderTextLinesWithTables(cleanLines, keyPrefix) {
  const output = [];
  let pending = [];
  let index = 0;
  let tableCount = 0;
  const flushPending = () => {
    if (!pending.length) return;
    output.push(askRenderPlainTextLines(pending, keyPrefix + "-text-" + output.length));
    pending = [];
  };
  while (index < cleanLines.length) {
    const table = askReadMarkdownTable(cleanLines, index);
    if (table) {
      flushPending();
      output.push(askRenderMarkdownTable(table, keyPrefix + "-table-" + tableCount));
      tableCount += 1;
      index = table.endIndex;
      continue;
    }
    pending.push(cleanLines[index]);
    index += 1;
  }
  flushPending();
  return tableCount ? <div key={keyPrefix} className="space-y-3">{output}</div> : null;
}

function askAssistantBlockLines(block) {
  return String(block || "").split(/\\n/).map((line) => line.trim()).filter((line) => line && !askLineIsSeparator(line));
}

function askAssistantFirstBlockLine(block) {
  const lines = askAssistantBlockLines(block);
  return lines[0] || "";
}

function askMergeAssistantBlocks(rawBlocks) {
  const blocks = Array.isArray(rawBlocks) ? rawBlocks : [];
  const merged = [];
  for (let index = 0; index < blocks.length; index += 1) {
    const lines = askAssistantBlockLines(blocks[index]);
    if (!lines.length) continue;
    const nextFirst = askAssistantFirstBlockLine(blocks[index + 1]);
    if (lines.length === 1 && askLineLooksLikeStrongSectionTitle(lines[0], nextFirst)) {
      const sectionLines = [lines[0]];
      index += 1;
      for (; index < blocks.length; index += 1) {
        const nextLines = askAssistantBlockLines(blocks[index]);
        if (!nextLines.length) continue;
        const followingFirst = askAssistantFirstBlockLine(blocks[index + 1]);
        if (sectionLines.length > 1 && nextLines.length === 1 && askLineLooksLikeStrongSectionTitle(nextLines[0], followingFirst)) {
          index -= 1;
          break;
        }
        sectionLines.push(...nextLines);
      }
      merged.push(sectionLines.join("\\n"));
      continue;
    }
    merged.push(lines.join("\\n"));
  }
  return merged;
}

function askSingleMarkdownTableBlockLine(block) {
  const lines = askAssistantBlockLines(block);
  return lines.length === 1 ? lines[0] : "";
}

function askMergeMarkdownTableBlocks(rawBlocks) {
  const blocks = Array.isArray(rawBlocks) ? rawBlocks : [];
  const merged = [];
  let index = 0;
  while (index < blocks.length) {
    const headerLine = askSingleMarkdownTableBlockLine(blocks[index]);
    const separatorLine = askSingleMarkdownTableBlockLine(blocks[index + 1]);
    if (askLineIsMarkdownTableRow(headerLine) && askLineIsMarkdownTableSeparator(separatorLine)) {
      const rows = [];
      let rowIndex = index + 2;
      for (; rowIndex < blocks.length; rowIndex += 1) {
        const rowLine = askSingleMarkdownTableBlockLine(blocks[rowIndex]);
        if (!askLineIsMarkdownTableRow(rowLine)) break;
        rows.push(rowLine);
      }
      if (rows.length) {
        merged.push([headerLine, separatorLine, ...rows].join("\\n"));
        index = rowIndex;
        continue;
      }
    }
    merged.push(blocks[index]);
    index += 1;
  }
  return merged;
}

function askRenderPlainTextLines(lines, keyPrefix) {
  const cleanLines = askNormalizeSpecialAnswerLines(lines.map((line) => String(line || "").trim()).filter((line) => line && !askLineIsSeparator(line)));
  if (!cleanLines.length) return null;
  const unordered = cleanLines.every((line) => /^[-*•]\\s+/.test(line));
  const numbered = cleanLines.every((line) => /^\\d+[.)]\\s+/.test(line));
  if (unordered || numbered) {
    const Tag = unordered ? "ul" : "ol";
    const listClass = unordered ? "list-disc" : "list-decimal";
    return (
      <Tag key={keyPrefix} className={listClass + " space-y-2 pl-5 text-sm leading-6"}>
        {cleanLines.map((line, index) => {
          const cleanLine = line.replace(/^[-*•]\\s+|^\\d+[.)]\\s+/, "");
          return <li key={index}>{askRenderSpecialLine(cleanLine, keyPrefix + "-special-" + index) || askInlineParts(cleanLine)}</li>;
        })}
      </Tag>
    );
  }
  const mixedList = cleanLines.some((line) => /^[-*â€¢]\\s+|^\\d+[.)]\\s+/.test(line));
  if (mixedList) {
    return (
      <div key={keyPrefix} className="space-y-2 text-sm leading-6">
        {cleanLines.map((line, index) => {
          const isNumbered = /^\\d+[.)]\\s+/.test(line);
          const isBullet = /^[-*â€¢]\\s+/.test(line);
          const cleanLine = line.replace(/^[-*â€¢]\\s+|^\\d+[.)]\\s+/, "");
          if (isNumbered) {
            return (
              <div key={index} className="mt-2 flex items-center gap-2 rounded-lg border border-[#E4E7EC] bg-[#F8FAFC] px-3 py-2">
                <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 px-2 text-[11px] font-black text-white shadow-sm">{index + 1}</span>
                <p className="break-words text-sm font-black uppercase tracking-normal text-[#001B47]">{askInlineParts(cleanLine)}</p>
              </div>
            );
          }
          if (isBullet) {
            return (
              <p key={index} className="ml-4 flex gap-2 text-[#001B47]/90">
                <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden="true"></span>
                <span>{askRenderSpecialLine(cleanLine, keyPrefix + "-special-" + index) || askInlineParts(cleanLine)}</span>
              </p>
            );
          }
          return <p key={index}>{askRenderSpecialLine(line, keyPrefix + "-special-" + index) || askInlineParts(line)}</p>;
        })}
      </div>
    );
  }
  return cleanLines.map((line, index) => (
    <p key={keyPrefix + "-" + index} className="text-sm leading-6">
      {askRenderSpecialLine(line, keyPrefix + "-special-" + index) || askInlineParts(line)}
    </p>
  ));
}

function askRenderTextLines(lines, keyPrefix) {
  const cleanLines = askNormalizeSpecialAnswerLines(lines.map((line) => String(line || "").trim()).filter((line) => line && !askLineIsSeparator(line)));
  if (!cleanLines.length) return null;
  return askRenderTextLinesWithTables(cleanLines, keyPrefix) || askRenderPlainTextLines(cleanLines, keyPrefix);
}

function askSectionTone(title) {
  const text = String(title || "").toLowerCase();
  if (/decision map|what happens next|what to prepare|what i need|how i can help|send me the product details|open this|when you get there|what i can convert or prepare|send me the raw material|how i will decide|start point|open the right place|send rough details|open data area|what i can analyse|what i can analyze|choose the action|tell me the target|start with|good growth paths|choose one|best next question|how we can approach it|tell me this|what i can look at|i can help with|pick a direction/.test(text)) {
    return {
      section: "border-orange-100 bg-[#FFF8F1]",
      heading: "text-orange-600",
      marker: "bg-orange-500",
      chip: "bg-orange-50 text-orange-600",
    };
  }
  if (/narrow it down|options|price note/.test(text)) {
    return {
      section: "border-[#001B47]/8 bg-white",
      heading: "text-[#667085]",
      marker: "bg-[#D0D5DD]",
      chip: "bg-[#F3F6FB] text-[#667085]",
    };
  }
  if (/search area|location|route/.test(text)) {
    return {
      section: "border-[#12B76A]/12 bg-[#F8FFFB]",
      heading: "text-[#067647]",
      marker: "bg-[#12B76A]",
      chip: "bg-[#ECFDF3] text-[#067647]",
    };
  }
  if (/what i can see|details|results|matches|top products|popular products|most sold product|most viewed product|ranking basis/.test(text)) {
    return {
      section: "border-[#155EEF]/12 bg-[#F8FAFC]",
      heading: "text-[#155EEF]",
      marker: "bg-[#155EEF]",
      chip: "bg-[#EFF4FF] text-[#155EEF]",
    };
  }
  if (/judge|recommend|improve|next|why|steps|apply/.test(text)) {
    return {
      section: "border-orange-200 bg-[#FFF8F1]",
      heading: "text-orange-600",
      marker: "bg-orange-500",
      chip: "bg-orange-50 text-orange-600",
    };
  }
  return {
    section: "border-[#001B47]/8 bg-white",
    heading: "text-[#001B47]/70",
    marker: "bg-orange-500",
    chip: "bg-[#F3F6FB] text-[#001B47]/70",
  };
}

function askSectionIsGuidance(title) {
  return /narrow it down|options|price note/i.test(String(title || ""));
}

function askCleanBulletLine(line) {
  return String(line || "").trim().replace(/^[-*â€¢Ã¢â‚¬Â¢]\s+|^\d+[.)]\s+/, "").trim();
}

function askSplitLabelValue(line) {
  const text = askCleanBulletLine(line);
  const match = text.match(/^([^:]{2,48}):\s+(.+)$/);
  if (!match) return { label: "", value: text };
  return {
    label: match[1].trim(),
    value: match[2].trim(),
  };
}

function askSectionIsProductDetailList(title) {
  return /top products|popular products|most sold product|most viewed product|other popular products|product ranking/i.test(String(title || ""));
}

function askProductGroupInitial(title) {
  const match = String(title || "").trim().match(/[A-Za-z0-9]/);
  return match ? match[0].toUpperCase() : "P";
}

function askParseProductDetailGroups(lines) {
  const groups = [];
  const intro = [];
  let current = null;
  askNormalizeSpecialAnswerLines(lines).forEach((line) => {
    const cleanLine = String(line || "").trim();
    if (!cleanLine) return;
    const start = cleanLine.match(/^(\d+)[.)]\s+(.+)$/);
    if (start) {
      if (current) groups.push(current);
      current = { rank: start[1], title: start[2].trim(), facts: [], image: "", link: "" };
      return;
    }
    if (!current) {
      intro.push(cleanLine);
      return;
    }
    const parts = askSplitLabelValue(cleanLine);
    const label = String(parts.label || "").trim();
    const value = String(parts.value || "").trim();
    if (/^(image|media|thumbnail|photo|picture)$/i.test(label)) {
      const url = askSafeInlineUrl(value);
      if (url && !current.image) current.image = url;
      return;
    }
    if (/^(link|open|url|product link|product url)$/i.test(label)) {
      const url = askSafeInlineUrl(value);
      if (url && !current.link) current.link = url;
      return;
    }
    current.facts.push({ label, value: value || askCleanBulletLine(cleanLine) });
  });
  if (current) groups.push(current);
  return { groups, intro };
}

function askProductFactValue(group, pattern) {
  const fact = (group.facts || []).find((item) => pattern.test(String(item.label || "")));
  return fact ? fact.value : "";
}

function askRenderProductDetailCards(lines, keyPrefix, sectionTitle) {
  if (!askSectionIsProductDetailList(sectionTitle)) return null;
  const parsed = askParseProductDetailGroups(lines);
  if (!parsed.groups.length) return null;
  return (
    <div key={keyPrefix} className="grid gap-3">
      {parsed.intro.map((line, index) => (
        <p key={"intro-" + index} className="text-sm font-semibold leading-6 text-[#001B47]/88">{askInlineParts(askCleanBulletLine(line))}</p>
      ))}
      {parsed.groups.map((group, index) => {
        const business = askProductFactValue(group, /^business$/i);
        const price = askProductFactValue(group, /^price$/i);
        const availability = askProductFactValue(group, /availability|stock/i);
        const category = askProductFactValue(group, /^category$/i);
        const detailFacts = (group.facts || []).filter((fact) => !/^(price|availability|stock|category)$/i.test(String(fact.label || "")));
        return (
          <article key={group.rank + "-" + index} className="rounded-xl border border-[#E4E7EC] bg-white p-3 shadow-sm shadow-[#001B47]/5">
            <div className="flex gap-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E4E7EC] bg-[#F3F6FB] text-lg font-black text-orange-500">
                {group.image ? <img src={group.image} alt="" className="h-full w-full object-cover" /> : askProductGroupInitial(group.title)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-normal text-[#155EEF]">Product {group.rank}</p>
                    <h4 className="mt-0.5 break-words text-[15px] font-black leading-5 text-[#001B47]">{askInlineParts(group.title)}</h4>
                  </div>
                  {price && <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-black text-orange-600">{askInlineParts(price)}</span>}
                </div>
                {business && <p className="mt-1 text-xs font-bold uppercase tracking-normal text-[#667085]">{askInlineParts(business)}</p>}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {category && <span className="rounded-full bg-[#F3F6FB] px-2.5 py-1 text-xs font-bold text-[#667085]">{askInlineParts(category)}</span>}
                  {availability && <span className="rounded-full bg-[#ECFDF3] px-2.5 py-1 text-xs font-black text-[#027A48]">{askInlineParts(availability)}</span>}
                </div>
              </div>
            </div>
            {detailFacts.length > 0 && (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {detailFacts.map((fact, factIndex) => (
                  <div key={factIndex} className="rounded-lg bg-[#F8FAFC] px-3 py-2">
                    {fact.label && <p className="text-[10px] font-black uppercase tracking-normal text-[#667085]">{fact.label}</p>}
                    <p className="mt-0.5 text-sm font-semibold leading-5 text-[#001B47]/90">{askInlineParts(fact.value)}</p>
                  </div>
                ))}
              </div>
            )}
            {group.link && (
              <a href={group.link} className="mt-3 inline-flex rounded-full bg-orange-500 px-3 py-2 text-xs font-black text-white shadow-sm hover:bg-orange-600">
                Open product <span className="ml-2" aria-hidden="true">{">"}</span>
              </a>
            )}
          </article>
        );
      })}
    </div>
  );
}

function askParseStatisticLine(line) {
  const text = askCleanBulletLine(String(line || "").trim())
    .replace(/^(?:\u2022|\u00b7|\u25cf|\u25aa|\u25e6)\s*/, "")
    .trim();
  const match = text.match(/^(.+?)(?:\s*[:=|-]\s*|\s+)(-?\d[\d,]*(?:\.\d+)?)\s*(?:views?|likes?|saves?|clicks?|engagements?)?\s*$/i);
  if (!match) return null;
  const value = Number(String(match[2]).replace(/,/g, ""));
  if (!Number.isFinite(value)) return null;
  return {
    label: match[1].replace(/^[-*]\s+/, "").trim(),
    value
  };
}

function askFormatStatisticValue(value) {
  const number = Number(value) || 0;
  try {
    return new Intl.NumberFormat("en-GB", { maximumFractionDigits: number % 1 ? 1 : 0 }).format(number);
  } catch (error) {
    return String(number);
  }
}

function askRenderStatisticsChart(lines, keyPrefix) {
  const stats = lines.map(askParseStatisticLine).filter(Boolean).filter((row) => row.value > 0).slice(0, 8);
  if (!stats.length) return null;
  const max = Math.max(...stats.map((row) => row.value), 1);
  const total = stats.reduce((sum, row) => sum + row.value, 0);
  const top = stats[0];
  const second = stats[1];
  const topShare = total ? Math.round((top.value / total) * 100) : 0;
  const leadRatio = second && second.value > 0 ? (top.value / second.value).toFixed(top.value / second.value >= 10 ? 0 : 1) : "";
  const colors = ["#FF6B00", "#155EEF", "#12B76A", "#7A5AF8", "#C11574", "#0BA5EC", "#F79009", "#667085"];
  const insight = second
    ? top.label + " is " + leadRatio + "x the next visible signal."
    : top.label + " is the only visible signal in this chart.";
  return (
    <div key={keyPrefix} className="rounded-2xl border border-orange-100 bg-[#FFF8F1] p-3 shadow-sm shadow-orange-500/10" role="img" aria-label={"Statistics chart led by " + top.label + " with " + askFormatStatisticValue(top.value)}>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="min-w-0 rounded-xl border border-white bg-white px-3 py-3 shadow-sm shadow-[#001B47]/5">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-orange-600">Strongest signal</p>
          <div className="mt-1 flex flex-wrap items-end gap-x-2 gap-y-1">
            <strong className="text-3xl font-black leading-none text-[#001B47]">{askFormatStatisticValue(top.value)}</strong>
            <span className="pb-0.5 text-sm font-black text-[#001B47]/78">{askInlineParts(top.label)}</span>
          </div>
          <p className="mt-2 text-xs font-semibold leading-5 text-[#001B47]/70">{askInlineParts(insight)}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:w-40 sm:grid-cols-1">
          <div className="rounded-xl border border-white bg-white px-3 py-2 shadow-sm shadow-[#001B47]/5">
            <p className="text-[10px] font-black uppercase tracking-normal text-[#667085]">Signals</p>
            <p className="text-xl font-black text-[#001B47]">{stats.length}</p>
          </div>
          <div className="rounded-xl border border-white bg-white px-3 py-2 shadow-sm shadow-[#001B47]/5">
            <p className="text-[10px] font-black uppercase tracking-normal text-[#667085]">Top weight</p>
            <p className="text-xl font-black text-[#001B47]">{topShare}%</p>
          </div>
        </div>
      </div>
      <div className="mt-3 overflow-hidden rounded-full border border-white bg-white p-1 shadow-inner shadow-[#001B47]/5" aria-hidden="true">
        <div className="flex h-4 overflow-hidden rounded-full bg-[#F3F6FB]">
          {stats.map((row, index) => {
            const share = total ? Math.max(4, (row.value / total) * 100) : 100 / stats.length;
            return (
              <span
                key={"share-" + row.label + "-" + index}
                className="h-full transition-all duration-700"
                style={{ width: share + "%", backgroundColor: colors[index % colors.length] }}
                title={row.label + ": " + askFormatStatisticValue(row.value)}
              ></span>
            );
          })}
        </div>
      </div>
      <div className="mt-3 grid gap-2">
        {stats.map((row, index) => {
          const width = Math.max(6, Math.round((row.value / max) * 100));
          const share = total ? Math.round((row.value / total) * 100) : 0;
          return (
            <div key={row.label + "-" + index} className="rounded-xl border border-white bg-white px-3 py-2.5 shadow-sm shadow-[#001B47]/5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 break-words text-xs font-black uppercase tracking-normal text-[#001B47]">{askInlineParts(row.label)}</span>
                <span className="shrink-0 text-sm font-black text-[#001B47]">{askFormatStatisticValue(row.value)}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-[#F3F6FB]">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: width + "%", backgroundColor: colors[index % colors.length] }} aria-hidden="true"></div>
                </div>
                <span className="w-10 shrink-0 text-right text-[11px] font-black text-[#667085]">{share}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 rounded-xl bg-white/75 px-3 py-2 text-xs font-semibold leading-5 text-[#001B47]/70">
        Bars are scaled to the strongest saved number, so you can see the gap quickly.
      </p>
    </div>
  );
}

function askRenderStatisticsSection(lines, keyPrefix) {
  const cleanLines = askNormalizeSpecialAnswerLines(lines.map((line) => String(line || "").trim()).filter(Boolean));
  if (!cleanLines.length) return null;
  const first = cleanLines[0] || "";
  const rest = cleanLines.slice(1);
  const titleLooksStat = /statistics chart|stats chart|graph|chart/i.test(first);
  const statisticRows = titleLooksStat ? rest : cleanLines;
  if (statisticRows.filter((line) => askParseStatisticLine(line)).length < 2) return null;
  const chart = askRenderStatisticsChart(statisticRows, keyPrefix + "-stats-chart");
  if (!chart) return null;
  return (
    <section key={keyPrefix} className="space-y-2 px-1">
      {titleLooksStat && <h3 className="text-[11px] font-black uppercase tracking-[0.12em] text-orange-600">{first}</h3>}
      {chart}
    </section>
  );
}

function askRenderDesignedRows(lines, keyPrefix, sectionTitle) {
  const cleanLines = askNormalizeSpecialAnswerLines(lines.map((line) => String(line || "").trim()).filter(Boolean));
  if (!cleanLines.length) return null;
  const tone = askSectionTone(sectionTitle);
  const productCards = askRenderProductDetailCards(cleanLines, keyPrefix, sectionTitle);
  if (productCards) return productCards;
  if (/statistics chart|stats chart|graph|chart/i.test(String(sectionTitle || ""))) {
    const chart = askRenderStatisticsChart(cleanLines, keyPrefix + "-stats-chart");
    if (chart) return chart;
  }
  const tableRows = askRenderTextLinesWithTables(cleanLines, keyPrefix + "-tables");
  if (tableRows) return tableRows;
  if (askSectionIsGuidance(sectionTitle)) {
    return (
      <div key={keyPrefix} className="space-y-2">
        {cleanLines.map((line, index) => {
          const cleanLine = askCleanBulletLine(line);
          const special = askRenderSpecialLine(cleanLine, keyPrefix + "-special-" + index);
          return (
            <p key={index} className="rounded-lg bg-[#F8FAFC] px-3 py-2 text-sm font-semibold leading-6 text-[#001B47]/88">
              {special || askInlineParts(cleanLine)}
            </p>
          );
        })}
      </div>
    );
  }
  const boxedRows = /search area|location|route/i.test(String(sectionTitle || ""));
  if (boxedRows) {
    return (
      <div key={keyPrefix} className="grid gap-2">
        {cleanLines.map((line, index) => {
          const special = askRenderSpecialLine(askCleanBulletLine(line), keyPrefix + "-special-" + index);
          const numbered = line.match(/^(\d+)[.)]\s+/);
          const parts = askSplitLabelValue(line);
          return (
            <div key={index} className={"group flex gap-3 rounded-lg border px-3 py-2.5 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md " + tone.section}>
              <span className={"mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white shadow-sm " + tone.marker} aria-hidden="true">
                {numbered ? numbered[1] : <span className="h-1.5 w-1.5 rounded-full bg-white"></span>}
              </span>
              <div className="min-w-0 flex-1">
                {parts.label && <p className={"mb-0.5 text-[10px] font-black uppercase tracking-normal " + tone.heading}>{parts.label}</p>}
                <div className="break-words text-sm font-semibold leading-6 text-[#001B47]">
                  {special || askInlineParts(parts.value)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div key={keyPrefix} className="space-y-2">
      {cleanLines.map((line, index) => {
        const special = askRenderSpecialLine(askCleanBulletLine(line), keyPrefix + "-special-" + index);
        const numbered = line.match(/^(\d+)[.)]\s+/);
        const parts = askSplitLabelValue(line);
        if (numbered) {
          return (
            <div key={index} className="mt-2 flex items-center gap-2 rounded-lg border border-[#E4E7EC] bg-[#F8FAFC] px-3 py-2 shadow-sm shadow-[#001B47]/5">
              <span className="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-orange-500 px-2 text-[11px] font-black text-white shadow-sm">{numbered[1]}</span>
              <p className="min-w-0 break-words text-sm font-black uppercase tracking-normal text-[#001B47]">{special || askInlineParts(parts.value)}</p>
            </div>
          );
        }
        return (
          <div key={index} className="flex items-start gap-2 rounded-md px-1.5 py-1 text-[#001B47]">
            <span className={"mt-2 shrink-0 " + (numbered ? "min-w-5 text-xs font-black text-orange-600" : "h-1.5 w-1.5 rounded-full " + tone.marker)} aria-hidden="true">
              {numbered ? numbered[1] + "." : ""}
            </span>
            <div className="min-w-0 flex-1">
              {parts.label && <span className="mr-1 text-sm font-black text-[#001B47]">{parts.label}:</span>}
              <span className="break-words text-sm font-semibold leading-6 text-[#001B47]/88">
                {special || askInlineParts(parts.value)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function askSectionUsesPanel(title) {
  const text = String(title || "").toLowerCase();
  return /decision map|what happens next|search area|route summary|what i can see|what to prepare|what i need|how i can help|send me the product details|tell me one detail|then i can|open this|when you get there|what i can convert or prepare|send me the raw material|how i will decide|start point|open the right place|create it in emy|what i can do next|send rough details|open data area|what i can analyse|what i can analyze|choose the action|tell me the target|start with|good growth paths|choose one|best next question|how we can approach it|tell me this|what i can look at|i can help with|pick a direction|matches|businesses|jobs|services|customers|customer relationships/.test(text);
}

function FormattedAssistantText({ text }) {
  const rawBlocks = String(text || "").split(/\\n{2,}/).map((block) => block.trim()).filter((block) => block && !askLineIsSeparator(block));
  const contentBlocks = askMergeAssistantBlocks(askMergeMarkdownTableBlocks(rawBlocks));
  if (!contentBlocks.length) return null;
  return (
    <div className="space-y-4 rounded-2xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#001B47] shadow-sm">
      {contentBlocks.map((block, blockIndex) => {
        const lines = block.split(/\\n/).map((line) => line.trim()).filter((line) => line && !askLineIsSeparator(line));
        if (!lines.length) return null;
        const first = lines[0] || "";
        const rest = lines.slice(1);
        if (/^summary$/i.test(first) && rest.length) {
          return (
            <div key={blockIndex} className="space-y-2 text-[#001B47]/90">
            {askRenderTextLines(rest, "summary-" + blockIndex)}
          </div>
        );
      }
      const statisticsSection = askRenderStatisticsSection(lines, "stats-block-" + blockIndex);
      if (statisticsSection) return statisticsSection;
      const leadBlock = blockIndex === 0 && contentBlocks.length > 1 && lines.length <= 2;
      if (leadBlock) {
        return (
          <div key={blockIndex} className="rounded-xl border border-orange-100 bg-[#FFF8F1] px-3 py-2.5 shadow-sm shadow-orange-500/5">
            <div className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" aria-hidden="true"></span>
              <div className="min-w-0 space-y-2 text-[#001B47]">
                {askRenderTextLines(lines, "lead-" + blockIndex)}
              </div>
            </div>
          </div>
        );
      }
      if (askLineLooksLikeSectionTitle(first, rest[0])) {
        const tone = askSectionTone(first);
        if (!askSectionUsesPanel(first)) {
            return (
              <section key={blockIndex} className={askSectionIsGuidance(first) ? "space-y-2 rounded-xl border border-[#001B47]/8 bg-white/80 px-3 py-3" : "space-y-2 px-1"}>
                <h3 className={"text-[11px] font-black uppercase tracking-[0.12em] " + tone.heading}>{first}</h3>
                {askRenderDesignedRows(rest, "section-" + blockIndex, first)}
              </section>
            );
          }
          return (
            <section key={blockIndex} className={"overflow-hidden rounded-xl border p-3 " + tone.section}>
              <div className="mb-2 flex items-center gap-2">
                <span className={"h-2 w-2 rounded-full " + tone.marker} aria-hidden="true"></span>
                <h3 className={"text-[11px] font-black uppercase tracking-[0.12em] " + tone.heading}>{first}</h3>
              </div>
              {askRenderDesignedRows(rest, "section-" + blockIndex, first)}
            </section>
          );
        }
        return (
          <div key={blockIndex} className="space-y-2 text-[#001B47]/90">
            {askRenderTextLines(lines, "block-" + blockIndex)}
          </div>
        );
      })}
    </div>
  );
}

function askUnwrapAssistantText(value) {
  const raw = String(value || "").trim();
  const candidates = [raw];
  const fenced = raw.match(new RegExp("^\\\\x60{3}(?:json)?\\\\s*([\\\\s\\\\S]*?)\\\\s*\\\\x60{3}$", "i"));
  if (fenced) candidates.push(fenced[1].trim());
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) candidates.push(raw.slice(firstBrace, lastBrace + 1));
  for (const candidate of candidates) {
    if (!/^\\{[\\s\\S]*\\}$/.test(candidate)) continue;
    try {
      const parsed = JSON.parse(candidate);
      if (parsed && typeof parsed === "object") {
        const answer = typeof parsed.answer === "string" ? parsed.answer : typeof parsed.text === "string" ? parsed.text : "";
        if (answer.trim()) return { text: answer.trim(), wasJson: true };
      }
    } catch (error) {}
  }
  return { text: raw, wasJson: false };
}

function askEmyHasGeneratedInlineView(entry) {
  const results = Array.isArray(entry && entry.results) ? entry.results : [];
  const selectedTool = String(entry && (entry.selectedToolName || entry.action && entry.action.toolName) || "").trim().toLowerCase();
  return /^(openinlineview|getownedbusinesscard|getownedbusinesscards|getcustomerprofilecard|getviewerprofilecards|getmediapreview)$/i.test(selectedTool) && results.some((result) => result && result.viewSpec && typeof result.viewSpec === "object");
}

function askEmyShouldRenderResultCards(entry, previousUserMessage = null) {
  const results = Array.isArray(entry && entry.results) ? entry.results : [];
  if (!results.length) return false;
  const query = String(entry && entry.query || previousUserMessage && previousUserMessage.text || "").trim();
  if (!query) return false;
  if (askEmyHasGeneratedInlineView(entry)) return true;
  if (typeof askEmyIsNoCardQuestion === "function" && askEmyIsNoCardQuestion(query)) return false;
  const selectedTool = String(entry && (entry.selectedToolName || entry.action && entry.action.toolName) || "").trim().toLowerCase();
  const hasGeneratedViewSpec = results.some((result) => result && result.viewSpec && typeof result.viewSpec === "object");
  if (selectedTool === "openinlineview" && hasGeneratedViewSpec) return true;
  if (selectedTool === "getcustomerselfcontent") return true;
  const brain = typeof askEmyBrowserBrainDecision === "function" ? askEmyBrowserBrainDecision(query) : null;
  if (brain && brain.recordCardsAllowed) return true;
  if (typeof askEmyIsProfileOpenQuery === "function" && askEmyIsProfileOpenQuery(query)) return true;
  if (typeof askEmyIsProfileImageQuery === "function" && askEmyIsProfileImageQuery(query)) return true;
  return false;
}

function askActionFieldLabel(field) {
  const text = String(field || "").replace(/_/g, " ").trim();
  if (!text) return "Detail";
  return text.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function askActionFieldPlaceholder(field, label) {
  const key = String(field || "").toLowerCase();
  if (/title|name/.test(key)) return "Type the " + label.toLowerCase();
  if (/description|body|text|caption/.test(key)) return "Write the main details here";
  if (/price|rate/.test(key)) return "Add price or leave blank";
  if (/image|photo|video|media|thumbnail|cover/.test(key)) return "Describe the media you want to use";
  if (/availability|stock/.test(key)) return "In stock, limited, available by request...";
  if (/location|address/.test(key)) return "Add location if needed";
  return "Add " + label.toLowerCase();
}

function askActionLooksLongField(field) {
  return /\b(description|body|text|caption|notes|opening_hours|cover_image|profile_image|image|video|media|thumbnail)\b/i.test(String(field || ""));
}

function askActionTargetType(target) {
  const clean = String(target || "").trim().toLowerCase();
  if (!clean) return "";
  if (/customer[-\s]?profile|customer account|personal profile|personal account/.test(clean)) return "customer-profile";
  if (/products?|items?|stock|listings?/.test(clean)) return "product";
  if (/jobs?|hiring|vacanc/.test(clean)) return "job";
  if (/clips?|reels?|videos?/.test(clean)) return "clip";
  if (/posts?|articles?/.test(clean)) return "post";
  if (/events?/.test(clean)) return "event";
  if (/services?/.test(clean)) return "service";
  if (/business|shop|store/.test(clean)) return "business";
  if (/profile|account/.test(clean)) return "customer-profile";
  return clean.replace(/s$/, "");
}

function askActionResultMatches(action, result) {
  const target = askActionTargetType(action && action.target);
  if (!target || !result) return false;
  const type = String(result.type || "").trim().toLowerCase();
  if (target === "business") return ["business", "business-profile"].includes(type);
  if (target === "customer-profile") return ["customer-profile", "profile"].includes(type);
  if (target === "post") return type === "post" || type === "article";
  if (target === "clip") return type === "clip" || type === "reel";
  return type === target;
}

function askActionMatchingResults(action, results = []) {
  const rows = Array.isArray(results) ? results : [];
  const matches = rows.filter((result) => askActionResultMatches(action, result));
  return matches.length ? matches : rows.filter((result) => result && askResultUrl(result)).slice(0, 3);
}

function askActionResultTitle(result) {
  return String(result && (result.name || result.title || result.productName || result.jobTitle || result.business) || "EMY item").trim();
}

function askActionOpenResultHere(result, setInlineResult) {
  if (!result) return;
  const type = String(result.type || "").toLowerCase();
  askCloseResultOverlays();
  askOpenAfterCurrentClick(() => {
    if (askResultHasNativeDetailView(type)) {
      askOpenNativeResultDetail(result);
      return;
    }
    setInlineResult(result);
  });
}

function askActionDraftText(fields, values) {
  return fields
    .map((field) => {
      const value = String(values[field] || "").trim();
      return value ? askActionFieldLabel(field) + ": " + value : "";
    })
    .filter(Boolean)
    .join("\\n");
}

function askActionDraftPayload(action, fields, values) {
  const data = {};
  fields.forEach((field) => {
    const value = String(values[field] || "").trim();
    if (value) data[field] = value;
  });
  return {
    id: "ask-emy-draft-" + Date.now(),
    source: "ask-emy",
    createdAt: new Date().toISOString(),
    target: askActionTargetType(action && action.target) || String(action && action.target || "item").trim(),
    scope: String(action && action.scope || "").trim().toLowerCase(),
    label: String(action && (action.label || action.target) || "EMY draft").trim(),
    fields: data,
  };
}

function askActionStoreDraft(payload) {
  if (!payload || typeof window === "undefined" || !window.localStorage) return false;
  try {
    const text = JSON.stringify(payload);
    window.localStorage.setItem("emyAskActionLatestDraft", text);
    if (payload.target) window.localStorage.setItem("emyAskActionDraft:" + payload.target, text);
    window.dispatchEvent(new CustomEvent("emy-ask-action-draft-prepared", { detail: payload }));
    return true;
  } catch (error) {
    return false;
  }
}

function askActionRealFormUrl(action) {
  const target = askActionTargetType(action && action.target);
  const directUrl = String(action && action.url || "").trim();
  const scope = String(action && action.scope || "").trim().toLowerCase();
  if (directUrl && !/emy-admin|backend/i.test(directUrl)) return directUrl;
  if (scope === "customer") {
    if (target === "post") return "emy-customer-home.html?tab=feeds&askDraft=post#feeds";
    if (target === "event") return "emy-customer-home.html?tab=feeds&askDraft=event#feeds";
    if (target === "article") return "emy-customer-home.html?tab=feeds&askDraft=article#feeds";
    if (target === "job") return "emy-customer-home.html?tab=feeds&askDraft=hiring#feeds";
    if (target === "clip") return "emy-customer-home.html?tab=reels&askDraft=clip#reels";
  }
  if (target === "product") return "emy-business-profile.html?mode=business&tab=products&askDraft=product";
  if (target === "job") return "emy-business-profile.html?mode=business&tab=posts&askDraft=job";
  if (target === "post") return "emy-business-profile.html?mode=business&tab=posts&askDraft=post";
  if (target === "event") return "emy-business-profile.html?mode=business&tab=posts&askDraft=event";
  if (target === "clip") return "emy-business-profile.html?mode=business&tab=reels&askDraft=clip";
  if (target === "service") {
    const hasBusinessProfile = typeof window !== "undefined" && window.localStorage && (
      window.localStorage.getItem("emyBusinessProfileDraft") ||
      window.localStorage.getItem("emyBusinessName") ||
      window.localStorage.getItem("emyBusinessDisplayName")
    );
    const role = typeof window !== "undefined" && window.localStorage ? String(window.localStorage.getItem("emyMainSignedInRole") || "").toLowerCase() : "";
    return role === "business" || hasBusinessProfile
      ? "emy-business-profile.html?mode=edit&askDraft=service"
      : "emy-business-profile.html?setup=1&askDraft=service";
  }
  if (target === "business") {
    const hasBusinessProfile = typeof window !== "undefined" && window.localStorage && (
      window.localStorage.getItem("emyBusinessProfileDraft") ||
      window.localStorage.getItem("emyBusinessName") ||
      window.localStorage.getItem("emyBusinessDisplayName")
    );
    const role = typeof window !== "undefined" && window.localStorage ? String(window.localStorage.getItem("emyMainSignedInRole") || "").toLowerCase() : "";
    return role === "business" || hasBusinessProfile
      ? "emy-business-profile.html?mode=edit&askDraft=business"
      : "emy-business-profile.html?setup=1&askDraft=business";
  }
  return "";
}

function askActionOpenRealForm(action, prepareDraft) {
  const url = askActionRealFormUrl(action);
  if (!url || typeof window === "undefined") return;
  if (typeof prepareDraft === "function") prepareDraft();
  window.location.assign(url);
}

function AskActionPanel({ action, responseType = "", selectedToolName = "", results = [], messageId = "" }) {
  const cleanAction = action && typeof action === "object" ? action : null;
  const isDraft = String(responseType || cleanAction?.responseType || "").toLowerCase() === "draft_preview"
    || String(selectedToolName || cleanAction?.toolName || "").toLowerCase() === "createdraft"
    || String(cleanAction?.mode || "").toLowerCase() === "create";
  const isOpen = String(cleanAction?.mode || "").toLowerCase() === "open"
    || String(selectedToolName || cleanAction?.toolName || "").toLowerCase() === "openinlineview";
  if (!cleanAction && !isDraft && !isOpen) return null;
  const label = String(cleanAction?.label || cleanAction?.target || (isDraft ? "EMY draft" : "EMY item")).trim();
  const target = String(cleanAction?.target || "").trim();
  const rawFields = Array.isArray(cleanAction?.draftFields) ? cleanAction.draftFields : [];
  const fields = (rawFields.length ? rawFields : isDraft ? ["title", "description", "category", "next_action"] : [])
    .map((field) => String(field || "").trim())
    .filter(Boolean)
    .slice(0, 8);
  const [values, setValues] = useState({});
  const [prepared, setPrepared] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [draftPayload, setDraftPayload] = useState(null);
  const [inlineResult, setInlineResult] = useState(null);
  const matchingResults = isOpen ? askActionMatchingResults(cleanAction, results).slice(0, 3) : [];
  if (isOpen && !isDraft && !matchingResults.length) return null;
  const realFormUrl = isDraft ? askActionRealFormUrl(cleanAction) : "";
  const filled = fields.filter((field) => String(values[field] || "").trim());
  const updateField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setPrepared(false);
    setDraftSaved(false);
  };
  const prepareDraft = () => {
    const payload = askActionDraftPayload(cleanAction, fields, values);
    setDraftPayload(payload);
    setPrepared(true);
    setDraftSaved(askActionStoreDraft(payload));
    return payload;
  };
  const copyFilled = () => {
    const payload = prepareDraft();
    const text = askActionDraftText(fields, values) || JSON.stringify(payload.fields || {}, null, 2);
    if (!text) return;
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) navigator.clipboard.writeText(text).catch(() => {});
  };
  if (isOpen && !isDraft) {
    return (
      <section className="mt-3 rounded-2xl border border-[#DDE7FF] bg-[#F8FAFC] p-3 shadow-sm shadow-[#001B47]/5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#155EEF]">Existing EMY view</p>
            <h3 className="mt-1 text-base font-black leading-5 text-[#001B47]">{label}</h3>
          </div>
          <span className="rounded-full bg-[#EFF4FF] px-3 py-1 text-xs font-black text-[#155EEF]">opens here</span>
        </div>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#001B47]/75">
          I will use the existing EMY {target || "item"} view in this chat. If no item is shown yet, ask me to show the specific {target || "item"} first.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {matchingResults.map((result, index) => (
            <button key={(result.id || result.productId || result.jobId || result.clipId || result.postId || result.name || "result") + "-" + index} type="button" onClick={() => askActionOpenResultHere(result, setInlineResult)} className="inline-flex min-h-[38px] items-center rounded-full bg-[#155EEF] px-4 text-xs font-black text-white shadow-sm transition hover:bg-[#004EEB]">
              Open here: {askActionResultTitle(result)} <span className="ml-2" aria-hidden="true">{">"}</span>
            </button>
          ))}
        </div>
        <AskOverlayPortal>
          {inlineResult && <AskResultInlineWindow result={inlineResult} onClose={() => setInlineResult(null)} />}
        </AskOverlayPortal>
      </section>
    );
  }
  return (
    <section className="mt-3 rounded-2xl border border-orange-100 bg-[#FFF8F1] p-3 shadow-sm shadow-orange-500/10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-orange-600">Draft here</p>
          <h3 className="mt-1 text-base font-black leading-5 text-[#001B47]">{label}</h3>
        </div>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600">{filled.length}/{fields.length} filled</span>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {fields.map((field) => {
          const labelText = askActionFieldLabel(field);
          const commonClass = "w-full rounded-xl border border-orange-100 bg-white px-3 py-2 text-sm font-bold leading-5 text-[#001B47] outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100";
          return (
            <label key={field} className={askActionLooksLongField(field) ? "sm:col-span-2" : ""}>
              <span className="mb-1 block text-[10px] font-black uppercase tracking-normal text-[#667085]">{labelText}</span>
              {askActionLooksLongField(field) ? (
                <textarea value={values[field] || ""} onChange={(event) => updateField(field, event.target.value)} rows={3} placeholder={askActionFieldPlaceholder(field, labelText)} className={commonClass + " min-h-[86px] resize-y"} />
              ) : (
                <input value={values[field] || ""} onChange={(event) => updateField(field, event.target.value)} placeholder={askActionFieldPlaceholder(field, labelText)} className={commonClass} />
              )}
            </label>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={prepareDraft} className="rounded-full bg-orange-500 px-4 py-2 text-xs font-black text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">Prepare draft</button>
        {realFormUrl && <button type="button" onClick={() => askActionOpenRealForm(cleanAction, prepareDraft)} className="rounded-full bg-[#001B47] px-4 py-2 text-xs font-black text-white shadow-lg shadow-[#001B47]/15 hover:bg-[#062B63]">Open real EMY form</button>}
        <button type="button" onClick={copyFilled} disabled={!filled.length} className="rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-black text-orange-600 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50">Copy filled fields</button>
      </div>
      {prepared && (
        <div className="mt-3 rounded-xl border border-white bg-white px-3 py-2 shadow-sm shadow-[#001B47]/5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] font-black uppercase tracking-normal text-[#667085]">Draft preview</p>
            {draftSaved && <span className="rounded-full bg-[#ECFDF3] px-2.5 py-1 text-[10px] font-black uppercase text-[#067647]">Saved here</span>}
          </div>
          {filled.length ? (
            <div className="mt-1 space-y-1 text-sm font-semibold leading-6 text-[#001B47]/82">
              {filled.map((field) => <p key={field}><strong>{askActionFieldLabel(field)}:</strong> {String(values[field] || "").trim()}</p>)}
            </div>
          ) : (
            <p className="mt-1 text-sm font-semibold leading-6 text-[#001B47]/72">Add a few details above and I will keep the structure ready.</p>
          )}
          {draftPayload && <p className="mt-2 text-xs font-bold leading-5 text-[#667085]">Stored as {draftPayload.target || "draft"} draft for this Ask EMY session.</p>}
        </div>
      )}
    </section>
  );
}

function askAssistantDisplay(entry, previousUserMessage = null) {
  let repairedEntry = entry && entry.role === "assistant" && typeof repairStoredAskMessage === "function" ? repairStoredAskMessage(entry, previousUserMessage) : entry;
  const decoded = askUnwrapAssistantText(repairedEntry && repairedEntry.text);
  const query = String(repairedEntry && repairedEntry.query || previousUserMessage && previousUserMessage.text || "");
  const introAnswer = decoded.wasJson && /\\b(i['’]?m\\s+(?:emy|ask emy)|marketplace assistant|guide inside emy)\\b/i.test(decoded.text);
  const generatedInlineViewAllowed = askEmyHasGeneratedInlineView(repairedEntry);
  const suppressResults = !generatedInlineViewAllowed && (askEmyIsIdentityIntroQuery(query) || askEmyIsNoCardQuestion(query) || introAnswer || !askEmyShouldRenderResultCards(repairedEntry, previousUserMessage));
  const selectedTool = String(repairedEntry && repairedEntry.selectedToolName || repairedEntry && repairedEntry.action && repairedEntry.action.toolName || "").trim().toLowerCase();
  const responseType = String(repairedEntry && repairedEntry.responseType || "").trim().toLowerCase();
  const analyticsBlocked = askEmyIsNoCardQuestion(query) || askEmyBrowserIsAnalyticsCapabilityQuestion(query);
  const analyticsToolAllowed = responseType === "analytics_chart" && /^(gettopproductsanalytics|getbusinessstatsoverview|comparecontentviews|getbusinesscustomersanalytics|getcustomergeoanalytics|getmultibusinesscomparison)$/i.test(selectedTool);
  const analyticsAllowed = !analyticsBlocked && analyticsToolAllowed && (askEmyBrowserIsGenericAnalyticsQuery(query) || askEmyBrowserIsSingleProductMetricQuestion(query) || selectedTool === "comparecontentviews" || selectedTool === "getbusinesscustomersanalytics" || selectedTool === "getmultibusinesscomparison");
  const cleanText = String(decoded.text || "").trim();
  return {
    text: decoded.text,
    results: suppressResults ? [] : Array.isArray(repairedEntry && repairedEntry.results) ? repairedEntry.results : [],
    analytics: analyticsAllowed && repairedEntry && repairedEntry.analytics ? repairedEntry.analytics : null,
    action: repairedEntry && repairedEntry.action ? repairedEntry.action : null,
    responseType: repairedEntry && repairedEntry.responseType || "",
    selectedToolName: repairedEntry && repairedEntry.selectedToolName || "",
    pending: Boolean(repairedEntry && (repairedEntry.pending || repairedEntry.loadingStarted || cleanText === "..." || cleanText === "•••" || cleanText === "…")),
  };
}

function ChatMessage({ entry, previousUserMessage = null, onEditUserMessage }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(entry.text);
  const legacyLoadingText = ["Ask EMY is checking the business data", "and preparing an answer..."].join(" ");
  const assistantDisplay = entry.role === "assistant" ? askAssistantDisplay(entry, previousUserMessage) : { text: entry.text, results: [], pending: false };
  const isLoadingReply = Boolean(assistantDisplay.pending || (entry.role === "assistant" && String(assistantDisplay.text || "").includes(legacyLoadingText)));
  const visibleResults = assistantDisplay.results;
  const generatedViewCount = visibleResults.filter((result) => result && result.viewSpec && typeof result.viewSpec === "object").length;
  const generatedInlineViewVisible = Boolean(generatedViewCount > 0 && /^(openinlineview|getownedbusinesscard|getownedbusinesscards|getcustomerprofilecard|getviewerprofilecards|getmediapreview)$/i.test(String(assistantDisplay.selectedToolName || "").trim()));
  const productResults = visibleResults.filter((result) => String(result && result.type || "").toLowerCase() === "product");
  const productHeavy = productResults.length >= 3 && productResults.length === visibleResults.length;
  const analyticsBars = Array.isArray(assistantDisplay.analytics && assistantDisplay.analytics.bars) ? assistantDisplay.analytics.bars : [];
  const analyticsLooksProduct = analyticsBars.some((bar) => {
    const details = bar && bar.details && typeof bar.details === "object" ? bar.details : {};
    return String(details.type || "").toLowerCase() === "product" || Boolean(details.product_id || details.productName);
  });
  const analyticsChartVisible = Boolean(assistantDisplay.analytics && assistantDisplay.analytics.answer_type === "analytics_bar_chart" && (analyticsBars.length > 1 || !analyticsLooksProduct));
  const productAnalyticsItem = analyticsChartVisible ? null : askProductAnalyticsTopResult(assistantDisplay.analytics, visibleResults);
  const assistantText = productAnalyticsItem || analyticsChartVisible ? askTextWithoutProductAnalyticsBlocks(assistantDisplay.text) : assistantDisplay.text;
  const hideDuplicateSingleProductCard = Boolean(productAnalyticsItem && visibleResults.length === 1 && productResults.length === 1);

  useEffect(() => {
    if (!isEditing) setDraft(entry.text);
  }, [entry.text, isEditing]);

  const saveEdit = () => {
    const clean = draft.trim();
    if (!clean) return;
    if (onEditUserMessage) onEditUserMessage(entry.id, clean);
    setIsEditing(false);
  };

  if (entry.role === "user") {
    if (isEditing) {
      return (
        <div className="flex justify-end">
          <div className="w-full max-w-xl rounded-2xl border border-orange-200 bg-white p-3 shadow-lg shadow-orange-500/10">
            <textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) saveEdit(); }} autoFocus rows={3} className="min-h-[88px] w-full resize-none rounded-xl border border-[#001B47]/10 bg-[#fff8ef] px-3 py-3 text-sm font-bold leading-6 text-[#001B47] outline-none focus:border-orange-300" />
            <div className="mt-2 flex justify-end gap-2">
              <button type="button" onClick={() => { setDraft(entry.text); setIsEditing(false); }} className="rounded-full border border-[#001B47]/10 bg-white px-4 py-2 text-xs font-black text-[#001B47] hover:bg-orange-50">Cancel</button>
              <button type="button" onClick={saveEdit} className="rounded-full bg-orange-500 px-4 py-2 text-xs font-black text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">Search</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-end">
        <div className="max-w-[78%]">
          <div className="whitespace-pre-wrap break-words rounded-2xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20">
            {entry.text}
          </div>
          <UserMessageActions text={entry.text} onEdit={() => setIsEditing(true)} />
        </div>
      </div>
    );
  }

  if (isLoadingReply) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[90%]">
          <div data-ask-loading-dots="true" className="inline-flex items-center gap-1.5 px-1 py-1" aria-label="Ask EMY is searching">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="h-2 w-2 animate-bounce rounded-full bg-orange-500" style={{ animationDelay: (dot * 120) + "ms" }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className={visibleResults.length > 0 ? "w-full max-w-[820px]" : "max-w-[90%]"}>
        <FormattedAssistantText text={assistantText} />
        {!generatedInlineViewVisible && <AskActionPanel action={assistantDisplay.action} responseType={assistantDisplay.responseType} selectedToolName={assistantDisplay.selectedToolName} results={visibleResults} messageId={entry.id} />}
        <ProductAnalyticsSummaryCard analytics={assistantDisplay.analytics} item={productAnalyticsItem} />
        <AnalyticsChartRenderer analytics={analyticsChartVisible ? assistantDisplay.analytics : null} results={visibleResults} />
        <ResponseActions entry={{ ...entry, text: assistantText, results: visibleResults }} />
        {!hideDuplicateSingleProductCard && productHeavy ? (
          <ProductResultRail results={productResults} />
        ) : !hideDuplicateSingleProductCard && visibleResults.length > 0 && (
          <div className="mt-3 grid w-full grid-cols-1 items-start gap-4 sm:grid-cols-2">
            {visibleResults.map((result, resultIndex) => {
              const shouldSpanFull = Boolean(result && result.viewSpec && typeof result.viewSpec === "object" && generatedViewCount <= 1);
              return (
                <div key={result.id || result.url || ((result.name || "result") + "-" + resultIndex)} className={shouldSpanFull ? "w-full min-w-0 sm:col-span-2" : "w-full min-w-0"}>
                  <ResultCard result={result} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function LocationFilter`
    );
    code = code.replace(
      'function LocationFilter',
      `${askResultsAuthComponents}\n\nfunction LocationFilter`
    );
    code = code.replace(
      'const [drawerOpen, setDrawerOpen] = useState(false);',
      'const [sidebarPinned, setSidebarPinned] = useState(() => readStoredAskSidebarPinned());\n  const [drawerOpen, setDrawerOpen] = useState(() => readStoredAskSidebarOpen(askParams));\n  const toggleSidebarPinned = () => {\n    setSidebarPinned((current) => {\n      const next = !current;\n      saveStoredAskSidebarPinned(next);\n      if (next) setDrawerOpen(true);\n      return next;\n    });\n  };\n  useEffect(() => { if (sidebarPinned && !drawerOpen) setDrawerOpen(true); }, [sidebarPinned, drawerOpen]);\n  useEffect(() => { saveStoredAskSidebarOpen(Boolean(drawerOpen || sidebarPinned)); }, [drawerOpen, sidebarPinned]);'
    );
    code = code.replace(
      'function ChatDrawer({ isOpen, onClose, chats, activeChatId, onNewChat, onOpenChat, onDeleteChat, onTogglePin, user, onLogout, onAccount }) {',
      'function ChatDrawer({ isOpen, onClose, isPinned, onTogglePinned, chats, activeChatId, onNewChat, onOpenChat, onDeleteChat, onTogglePin, user, onLogout, onAccount, onSwitchAccount }) {'
    );
    code = code.replace(
      '<UserProfileCard user={user} onLogout={onLogout} onAccount={onAccount} />',
      '<UserProfileCard user={user} onLogout={onLogout} onAccount={onAccount} onSwitchAccount={onSwitchAccount} />'
    );
    code = code.replace(
      /function UserProfileCard\(\{ user, compact = false, onLogout, onAccount \}\) \{[\s\S]*?\r?\n\}\r?\n\r?\n(?=function ChatDrawer)/,
      String.raw`function AskAccountAvatar({ account, className, alt = "" }) {
  const imageRef = String(account?.imageRef || "").trim();
  const image = String(account?.image || "").trim();
  const [resolvedImage, setResolvedImage] = useState("");
  const [isBroken, setIsBroken] = useState(false);
  const avatarRef = useRef(null);
  useEffect(() => {
    let cancelled = false;
    setIsBroken(false);
    setResolvedImage("");
    if (imageRef && window.emyResolveFeedMedia) {
      window.emyResolveFeedMedia(imageRef).then((record) => {
        if (!cancelled && record && record.url) setResolvedImage(record.url);
      }).catch(() => {});
    }
    return () => { cancelled = true; };
  }, [imageRef, image]);
  const safeDirectImage = /^(data:image\/|blob:|https?:\/\/|\/|\.\/|\.\.\/|assets\/)/i.test(image) ? image : "";
  const displayImage = resolvedImage || (safeDirectImage && (!imageRef || !window.emyResolveFeedMedia || /^(data:image\/|blob:)/i.test(safeDirectImage)) ? safeDirectImage : "");
  useEffect(() => {
    if (!isBroken && displayImage && imageRef && avatarRef.current && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(avatarRef.current);
  }, [imageRef, displayImage, isBroken]);
  const label = alt || account?.name || "";
  const initial = String(account?.name || account?.email || "S").trim().charAt(0).toUpperCase() || "S";
  if (!displayImage || isBroken) {
    return <span role="img" aria-label={label} className={(className || "") + " inline-flex items-center justify-center bg-orange-50 text-[#001B47] font-black"}>{initial}</span>;
  }
  return <img ref={avatarRef} src={displayImage} data-emy-media-ref={imageRef || undefined} alt="" aria-label={label} onError={() => setIsBroken(true)} className={className} />;
}

function UserProfileCard({ user, compact = false, onLogout, onAccount, onSwitchAccount }) {
  const activeRole = activeAskAccountRole();
  const otherRole = activeRole === "business" ? "customer" : "business";
  const otherAccount = readEmyAskAccountOptions().find((account) => account.role === otherRole);
  const switchLabel = otherRole === "business" ? "Switch to Business" : "Switch to Customer";

  if (compact) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-[#001B47]/8 bg-white px-3 py-2 shadow-sm">
        <AskAccountAvatar account={user} className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-100" />
        <div className="hidden min-w-0 text-left sm:block">
          <p className="truncate text-sm font-black text-[#001B47]">{user.name}</p>
          <p className="truncate text-xs font-semibold text-[#001B47]/45">{user.email}</p>
        </div>
        <IconButton label={copy.viewProfile} onClick={onAccount} className="flex h-9 w-9 items-center justify-center rounded-full text-[#001B47]/55 hover:bg-orange-50 hover:text-orange-600">
          <AccountIcon />
        </IconButton>
        <IconButton label={copy.logout} onClick={onLogout} className="flex h-9 w-9 items-center justify-center rounded-full text-[#001B47]/55 hover:bg-orange-50 hover:text-orange-600">
          <LogoutIcon />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="rounded-[1.4rem] border border-orange-100 bg-[#fff8ef] p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">{copy.signedInAs}</p>
      <div className="mt-3 flex items-center gap-3">
        <AskAccountAvatar account={user} className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-100" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-black text-[#001B47]">{user.name}</p>
          <p className="truncate text-xs font-semibold text-[#001B47]/50">{user.email}</p>
        </div>
      </div>
      {otherAccount && (
        <button type="button" onClick={() => onSwitchAccount && onSwitchAccount(otherRole)} className="mt-4 flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-[#001B47]/8 bg-white px-3 py-3 text-left shadow-sm transition hover:border-orange-200 hover:bg-orange-50">
          <AskAccountAvatar account={otherAccount} className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-100" />
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-black uppercase tracking-[0.16em] text-orange-500">{switchLabel}</span>
            <span className="block truncate text-sm font-black text-[#001B47]">{otherAccount.name}</span>
            <span className="block truncate text-xs font-semibold text-[#001B47]/45">{otherAccount.email}</span>
          </span>
        </button>
      )}
      <div className="mt-4 grid grid-cols-1 gap-2">
        <button type="button" onClick={onAccount} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#001B47] shadow-sm hover:bg-orange-50 hover:text-orange-600">
          <AccountIcon className="h-4 w-4" />
          {copy.viewProfile}
        </button>
        <button type="button" onClick={onLogout} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#001B47] shadow-sm hover:bg-orange-50 hover:text-orange-600">
          <LogoutIcon className="h-4 w-4" />
          {copy.logout}
        </button>
      </div>
    </div>
  );
}

`
    );
    code = code.replace(
      'function PinIcon({ className = "h-5 w-5", filled = false }) {',
      'function PinIcon({ className = "h-4 w-4", filled = false }) {'
    );
    code = code.replace(
      /<IconButton label=\{chat\.pinned \? copy\.unpinChat : copy\.pinChat\} onClick=\{\(\) => onTogglePin\(chat\.id\)\} className=\{`flex h-9 w-9 items-center justify-center rounded-full hover:bg-orange-50 \$\{chat\.pinned \? "text-orange-500" : "text-\[#001B47\]\/45 hover:text-orange-500"\}`\}>\s*<PinIcon filled=\{chat\.pinned\} \/>/,
      '<IconButton label={chat.pinned ? copy.unpinChat : copy.pinChat} onClick={() => onTogglePin(chat.id)} className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-orange-50 ${chat.pinned ? "text-orange-500" : "text-[#001B47]/45 hover:text-orange-500"}`}>\n        <PinIcon className="h-4 w-4" filled={chat.pinned} />'
    );
    code = code.replace(
      `<IconButton label={copy.closeSidebar} onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl text-[#001B47] hover:bg-orange-50 hover:text-orange-600">
          <MenuIcon className="h-5 w-5" />
        </IconButton>`,
      `<div className="flex items-center gap-2">
          <IconButton label={isPinned ? copy.unpinSidebar : copy.pinSidebar} onClick={onTogglePinned} className={"flex h-9 w-9 items-center justify-center rounded-xl hover:bg-orange-50 " + (isPinned ? "bg-orange-50 text-orange-500" : "text-[#001B47] hover:text-orange-600")}>
            <PinIcon className="h-4 w-4" filled={isPinned} />
          </IconButton>
          {!isPinned && (
            <IconButton label={copy.closeSidebar} onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl text-[#001B47] hover:bg-orange-50 hover:text-orange-600">
              <MenuIcon className="h-5 w-5" />
            </IconButton>
          )}
        </div>`
    );
    code = code.replace(
    '  const currentUser = readStoredAskUser();\n  useEffect(() => { if (!currentUser) window.location.replace(askHomeUrl(location, radius)); }, [currentUser, location, radius]);',
      '  const [currentUser, setCurrentUser] = useState(() => readStoredAskUser());\n  const [authPrompt, setAuthPrompt] = useState(() => !readStoredAskUser());\n  const [authModal, setAuthModal] = useState(null);\n  const loginUser = (email) => {\n    const nextUser = makeAskUserFromLogin(email);\n    saveStoredAskUser(nextUser);\n    setCurrentUser(nextUser);\n    setAuthPrompt(false);\n    setAuthModal(null);\n  };'
    );
    code = code.replace(
      '  const logout = () => {\n    clearStoredAskUser();\n    window.location.replace(askHomeUrl(location, radius));\n  };',
      '  const logout = () => {\n    goToEmyLogin();\n  };'
    );
    code = code.replace(
      /  const goToEmyAccount = \(\) => \{\r?\n    alert\("This will open the user's EMY Profile\. Ask EMY is connected to EMY, so everything the user searches on EMY can show here\."\);\r?\n  \};/,
      '  const goToEmyAccount = () => {\n    goToEmyProfile();\n  };'
    );
    code = code.replace(
      /  const goToEmyAccount = \(\) => \{\r?\n    goToEmyProfile\(\);\r?\n  \};\r?\n\r?\n  const activeChat = useMemo/,
      '  const goToEmyAccount = () => {\n    goToEmyProfile();\n  };\n\n  const switchAskAccount = (role) => {\n    const nextUser = switchEmyAskAccount(role);\n    const nextLocation = readStoredAskLocation(new URLSearchParams(window.location.search));\n    const nextChats = readStoredAskChats();\n    setCurrentUser(nextUser || readStoredAskUser());\n    setLocation(nextLocation.location);\n    setRadius(nextLocation.radius);\n    setSavedLocations(nextLocation.savedLocations);\n    setChats(nextChats);\n    setDrawerOpen(true);\n    saveStoredAskSidebarOpen(true);\n    if (nextChats.length) {\n      setActiveChatId(nextChats[0].id);\n      window.history.replaceState(null, "", askResultsUrl(nextChats[0].title || "", nextChats[0].id, nextLocation.location, nextLocation.radius, true));\n    } else {\n      window.location.href = askHomeUrl(nextLocation.location, nextLocation.radius, true);\n    }\n  };\n\n  const activeChat = useMemo'
    );
    code = code.replace(
      /    pinned: false,\r?\n    messages: \[/,
      '    pinned: false,\n    location: initialChatLocation.location,\n    radius: initialChatLocation.radius,\n    messages: ['
    );
    code = code.replace(
      /  const activeChat = useMemo\(\(\) => chats\.find\(\(chat\) => chat\.id === activeChatId\) \|\| chats\[0\], \[chats, activeChatId\]\);/,
      '  const activeChat = useMemo(() => chats.find((chat) => chat.id === activeChatId) || chats[0] || initialChat, [chats, activeChatId]);\n  const skipNextChatLocationSave = useRef(true);\n  useEffect(() => {\n    const selectedChat = chats.find((chat) => chat.id === activeChatId);\n    if (!selectedChat || !selectedChat.location) return;\n    const nextLocation = normaliseAskLocation({ location: selectedChat.location, radius: selectedChat.radius, savedLocations });\n    skipNextChatLocationSave.current = true;\n    setLocation(nextLocation.location);\n    setRadius(nextLocation.radius);\n  }, [activeChatId]);\n  useEffect(() => {\n    if (skipNextChatLocationSave.current) {\n      skipNextChatLocationSave.current = false;\n      return;\n    }\n    setChats((current) => current.map((chat) => chat.id === activeChatId ? { ...chat, location, radius } : chat));\n  }, [location, radius]);'
    );
    code = code.replace(
      /  const activeChat = useMemo\(\(\) => chats\.find\(\(chat\) => chat\.id === activeChatId\) \|\| chats\[0\] \|\| initialChat, \[chats, activeChatId\]\);[\s\S]*?  \}, \[location, radius\]\);/,
      String.raw`  const activeChat = useMemo(() => chats.find((chat) => chat.id === activeChatId) || chats[0] || initialChat, [chats, activeChatId]);
  const skipNextChatLocationSave = useRef(true);
  const pendingAskRequestsRef = useRef(new Map());
  const stoppedAskReplyIdsRef = useRef(new Set());
  const clearAskRequest = (pendingId, options = {}) => {
    if (!pendingId) return;
    const request = pendingAskRequestsRef.current.get(pendingId);
    if (!request) return;
    if (request.recoveryTimer) window.clearTimeout(request.recoveryTimer);
    if (options.abort && request.controller) {
      try { request.controller.abort(); } catch (error) {}
    }
    pendingAskRequestsRef.current.delete(pendingId);
  };
  const clearAskRequestsForChat = (chat, options = {}) => {
    const pendingIds = (chat && Array.isArray(chat.messages) ? chat.messages : [])
      .filter((message) => message.role === "assistant" && askEmyMessageCanStop(message))
      .map((message) => message.id);
    pendingIds.forEach((pendingId) => clearAskRequest(pendingId, options));
    return pendingIds;
  };
  useEffect(() => {
    const selectedChat = chats.find((chat) => chat.id === activeChatId);
    if (!selectedChat || !selectedChat.location) return;
    const nextLocation = normaliseAskLocation({ location: selectedChat.location, radius: selectedChat.radius, savedLocations });
    skipNextChatLocationSave.current = true;
    setLocation(nextLocation.location);
    setRadius(nextLocation.radius);
  }, [activeChatId]);
  useEffect(() => {
    if (skipNextChatLocationSave.current) {
      skipNextChatLocationSave.current = false;
      return;
    }
    setChats((current) => current.map((chat) => chat.id === activeChatId ? { ...chat, location, radius } : chat));
  }, [location, radius]);
  useEffect(() => {
    if (!activeChat || !activeChat.id) return;
    saveStoredAskActiveChatId(activeChat.id);
    if (typeof window === "undefined" || !window.history || !window.history.replaceState) return;
    const sidebarOpen = Boolean(drawerOpen || sidebarPinned);
    const nextUrl = askResultsUrl(activeChat.title || "", activeChat.id, location, radius, sidebarOpen);
    const currentUrl = window.location.pathname.split("/").pop() + window.location.search;
    if (currentUrl !== nextUrl) window.history.replaceState(null, "", nextUrl);
  }, [activeChat.id, activeChat.title, location, radius, drawerOpen, sidebarPinned]);

  const pendingAskKey = activeChat.messages
    .filter((message) => message.role === "assistant" && askEmyMessageCanStop(message))
    .map((message) => message.id)
    .join("|");
  const pendingAskStateKey = activeChat.messages
    .map((message) => [message.id, message.role, message.pending ? "pending" : "", message.loadingStarted ? "loading" : "", String(message.text || "").length].join(":"))
    .join("|");
  const liveAiRefreshKey = activeChat.messages
    .map((message) => [message.id, message.role, message.pending ? "pending" : "", message.provider || "", message.aiFirstVersion || "", String(message.text || "").length].join(":"))
    .join("|");
  useEffect(() => {
    const messages = activeChat?.messages || [];
    let latestAssistantIndex = -1;
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index] && messages[index].role === "assistant") {
        latestAssistantIndex = index;
        break;
      }
    }
    if (latestAssistantIndex < 0) return;
    const assistantMessage = messages[latestAssistantIndex];
    const previousUserMessage = messages.slice(0, latestAssistantIndex).reverse().find((message) => message.role === "user") || null;
    if (!askEmyAssistantMessageNeedsLiveRefresh(assistantMessage, previousUserMessage, true)) return;
    const query = String(assistantMessage.query || previousUserMessage.text || activeChat.title || "").trim();
    if (!query) return;
    setChats((current) => current.map((chat) => {
      if (chat.id !== activeChat.id) return chat;
      return {
        ...chat,
        messages: chat.messages.map((message) => {
          if (message.id !== assistantMessage.id) return message;
          const retry = makeReply(query);
          return {
            ...retry,
            id: message.id,
            refreshedFromCached: true,
            replacedProvider: message.provider || "",
            query,
          };
        }),
      };
    }));
  }, [activeChat.id, liveAiRefreshKey]);
  useEffect(() => {
    const pendingReplies = activeChat?.messages?.filter((message) => message.role === "assistant" && askEmyMessageCanStop(message)) || [];
    pendingReplies.forEach((pendingReply) => {
      const pendingId = pendingReply.id;
      if (pendingAskRequestsRef.current.has(pendingId)) return;
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      stoppedAskReplyIdsRef.current.delete(pendingId);
      const pendingIndex = activeChat.messages.findIndex((message) => message.id === pendingId);
      const previousUserMessage = pendingIndex >= 0
        ? activeChat.messages.slice(0, pendingIndex).reverse().find((message) => message.role === "user")
        : null;
      const query = pendingReply.query || previousUserMessage && previousUserMessage.text || activeChat.title;
      const recoveryTimer = window.setTimeout(() => {
        if (!pendingAskRequestsRef.current.has(pendingId) || stoppedAskReplyIdsRef.current.has(pendingId)) return;
        clearAskRequest(pendingId, { abort: true });
        setChats((current) => current.map((chat) => chat.id === activeChat.id ? {
          ...chat,
          messages: chat.messages.map((message) => message.id === pendingId ? {
            ...message,
            text: askEmyAiUnavailableFrontendMessage("request timed out"),
            results: [],
            analytics: null,
            action: null,
            provider: "ai-timeout",
            responseType: "ai_unavailable",
            selectedToolName: "answerDirectly",
            pending: false,
            loadingStarted: false,
            aiFirstVersion: ASK_EMY_AI_FIRST_FRONTEND_VERSION,
          } : message),
        } : chat));
      }, ASK_EMY_PENDING_RECOVERY_MS);
      pendingAskRequestsRef.current.set(pendingId, {
        chatId: activeChat.id,
        controller,
        recoveryTimer,
        startedAt: Date.now(),
      });
      const requestHistory = activeChat.messages.filter((message) => message.id !== pendingId).map((message) => ({
        role: message.role,
        text: message.text,
        results: Array.isArray(message.results) ? message.results.map((result) => ({
          id: result.id || "",
          type: result.type || "",
          name: result.name || "",
          business: result.business || "",
          businessKey: result.businessKey || "",
          place: result.place || "",
          url: result.url || "",
          isOwnedByViewer: Boolean(result.isOwnedByViewer),
          ownerNotice: result.ownerNotice || "",
          isFollowedByViewer: Boolean(result.isFollowedByViewer),
          isCustomerOfViewer: Boolean(result.isCustomerOfViewer),
          relationshipNotice: result.relationshipNotice || "",
        })).slice(0, 12) : [],
      }));
      fetchAskEmyReply(query, {
        chatId: activeChat.id,
        location,
        radius,
        history: requestHistory,
        signal: controller ? controller.signal : null,
      }).then((reply) => {
        if (!pendingAskRequestsRef.current.has(pendingId)) return;
        if (stoppedAskReplyIdsRef.current.has(pendingId)) {
          stoppedAskReplyIdsRef.current.delete(pendingId);
          clearAskRequest(pendingId);
          return;
        }
        clearAskRequest(pendingId);
        setChats((current) => current.map((chat) => chat.id === activeChat.id ? {
          ...chat,
          messages: chat.messages.map((message) => message.id === pendingId ? {
            ...message,
            text: reply.text,
            results: reply.results,
            analytics: reply.analytics || null,
            action: reply.action || null,
            provider: reply.provider,
            responseType: reply.responseType || "",
            selectedToolName: reply.selectedToolName || "",
            aiFirstVersion: reply.aiFirstVersion || ASK_EMY_AI_FIRST_FRONTEND_VERSION,
            pending: false,
            loadingStarted: false,
          } : message),
        } : chat));
      }).catch((error) => {
        if (!pendingAskRequestsRef.current.has(pendingId)) return;
        if (stoppedAskReplyIdsRef.current.has(pendingId)) {
          stoppedAskReplyIdsRef.current.delete(pendingId);
          clearAskRequest(pendingId);
          return;
        }
        clearAskRequest(pendingId);
        setChats((current) => current.map((chat) => chat.id === activeChat.id ? {
          ...chat,
          messages: chat.messages.map((message) => message.id === pendingId ? {
            ...message,
            text: askEmyAiUnavailableFrontendMessage(error && error.message ? error.message : ""),
            results: [],
            analytics: null,
            action: null,
            provider: "ai-unavailable",
            responseType: "ai_unavailable",
            selectedToolName: "answerDirectly",
            pending: false,
            loadingStarted: false,
            aiFirstVersion: ASK_EMY_AI_FIRST_FRONTEND_VERSION,
          } : message),
        } : chat));
      });
    });
  }, [activeChat.id, pendingAskKey, pendingAskStateKey, location, radius]);`
    );
    code = code.replace(
      /  const openChat = \(chatId\) => \{\r?\n    setActiveChatId\(chatId\);\r?\n    setDrawerOpen\(false\);\r?\n  \};/,
      '  const openChat = (chatId) => {\n    const selectedChat = chats.find((chat) => chat.id === chatId);\n    let nextLocation = { location, radius };\n    if (selectedChat && selectedChat.location) {\n      nextLocation = normaliseAskLocation({ location: selectedChat.location, radius: selectedChat.radius, savedLocations });\n      skipNextChatLocationSave.current = true;\n      setLocation(nextLocation.location);\n      setRadius(nextLocation.radius);\n    }\n    saveStoredAskActiveChatId(chatId);\n    if (selectedChat) window.history.replaceState(null, "", askResultsUrl(selectedChat.title || "", chatId, nextLocation.location, nextLocation.radius, Boolean(drawerOpen || sidebarPinned)));\n    setActiveChatId(chatId);\n  };'
    );
    code = code.replace(
      'function ChatScreen({ activeChat, onBack, onSend, onOpenDrawer, isSidebarOpen, location, setLocation, radius, setRadius, savedLocations, setSavedLocations, user, onLogout, onAccount }) {',
      'function ChatScreen({ activeChat, onBack, onSend, onEditUserMessage, onOpenDrawer, isSidebarOpen, location, setLocation, radius, setRadius, savedLocations, setSavedLocations, user, onLogout, onAccount, onStopReply }) {'
    );
    code = code.replace(
      /function ChatScreen\(\{ activeChat, onBack, onSend, onEditUserMessage, onOpenDrawer, isSidebarOpen, location, setLocation, radius, setRadius, savedLocations, setSavedLocations, user, onLogout, onAccount(?:, onStopReply)? \}\) \{\r?\n  const \[message, setMessage\] = useState\(""\);/,
      'function ChatScreen({ activeChat, onBack, onSend, onEditUserMessage, onOpenDrawer, isSidebarOpen, location, setLocation, radius, setRadius, savedLocations, setSavedLocations, user, onLogout, onAccount, onStopReply }) {\n  const [message, setMessage] = useState("");\n  const bottomRef = useRef(null);\n  const activeMessageKey = activeChat.messages.map((entry) => entry.id + ":" + (entry.pending ? "1" : "0") + ":" + (entry.loadingStarted ? "1" : "0") + ":" + String(entry.text || "").length + ":" + (Array.isArray(entry.results) ? entry.results.length : 0)).join("|");\n  const hasPendingReply = activeChat.messages.some((entry) => entry.role === "assistant" && (typeof askEmyMessageCanStop === "function" ? askEmyMessageCanStop(entry) : askEmyMessageLooksLoading(entry)));\n\n  useEffect(() => {\n    const timers = [];\n    let frame = 0;\n    const scrollToBottom = (behavior = "smooth") => {\n      if (bottomRef.current?.scrollIntoView) bottomRef.current.scrollIntoView({ behavior, block: "end" });\n      if (typeof window !== "undefined") {\n        const page = document.scrollingElement || document.documentElement;\n        if (page && typeof window.scrollTo === "function") window.scrollTo({ top: page.scrollHeight, behavior });\n      }\n    };\n    if (typeof window !== "undefined" && window.requestAnimationFrame) {\n      frame = window.requestAnimationFrame(() => scrollToBottom("smooth"));\n    } else {\n      scrollToBottom("auto");\n    }\n    timers.push(window.setTimeout(() => scrollToBottom("smooth"), 90));\n    timers.push(window.setTimeout(() => scrollToBottom("smooth"), 260));\n    return () => {\n      if (frame && typeof window !== "undefined" && window.cancelAnimationFrame) window.cancelAnimationFrame(frame);\n      timers.forEach((timer) => window.clearTimeout(timer));\n    };\n  }, [activeChat.id, activeMessageKey]);'
    );
    code = code.replace(
      /\s*<div className="mb-8 max-w-xl rounded-2xl bg-white px-5 py-4 text-left text-lg font-medium text-\[#001B47\] shadow-sm">\r?\n\s*\{copy\.welcome\}\r?\n\s*<\/div>/,
      ''
    );
    code = code.replace(
      /<IconButton label=\{copy\.back\} onClick=\{onBack\} className="flex h-11 w-11 items-center justify-center rounded-full text-\[#001B47\] hover:bg-orange-50">\s*<BackIcon \/>\s*<\/IconButton>/,
      '<a href={askHomeUrl(location, radius, isSidebarOpen)} aria-label={copy.back} className="flex h-11 w-11 items-center justify-center rounded-full text-[#001B47] hover:bg-orange-50">\n          <BackIcon />\n        </a>'
    );
    code = code.replace(
      '        <div className="space-y-5">',
      '        <div className="space-y-5" aria-live="polite" aria-busy={hasPendingReply ? "true" : "false"}>'
    );
    code = code.replace(
      '<ChatMessage key={entry.id} entry={entry} />',
      '<ChatMessage key={entry.id} entry={entry} previousUserMessage={entry.role === "assistant" ? activeChat.messages.slice(0, index).reverse().find((message) => message.role === "user") || null : null} onEditUserMessage={onEditUserMessage} />'
    );
    code = code.replace(
      '          {activeChat.messages.map((entry) => (\n            <ChatMessage key={entry.id} entry={entry} previousUserMessage={entry.role === "assistant" ? activeChat.messages.slice(0, index).reverse().find((message) => message.role === "user") || null : null} onEditUserMessage={onEditUserMessage} />\n          ))}',
      '          {activeChat.messages.filter((entry) => !entry.hidden).map((entry, index) => (\n            <ChatMessage key={entry.id} entry={entry} previousUserMessage={entry.role === "assistant" ? activeChat.messages.slice(0, index).reverse().find((message) => message.role === "user") || null : null} onEditUserMessage={onEditUserMessage} />\n          ))}'
    );
    code = code.replace(
      /activeChat\.messages\.map\(\(entry\) => \(\r?\n(\s*)<ChatMessage key=\{entry\.id\} entry=\{entry\} previousUserMessage=/,
      'activeChat.messages.filter((entry) => !entry.hidden).map((entry, index) => (\n$1<ChatMessage key={entry.id} entry={entry} previousUserMessage='
    );
    code = code.replace(
      /          \{activeChat\.messages\.map\(\(entry\) => \(\r?\n            <ChatMessage key=\{entry\.id\} entry=\{entry\} onEditUserMessage=\{onEditUserMessage\} \/>\r?\n          \)\)\}\r?\n        <\/div>/,
      '          {activeChat.messages.filter((entry) => !entry.hidden).map((entry, index) => (\n            <ChatMessage key={entry.id} entry={entry} previousUserMessage={entry.role === "assistant" ? activeChat.messages.slice(0, index).reverse().find((message) => message.role === "user") || null : null} onEditUserMessage={onEditUserMessage} />\n          ))}\n          <div ref={bottomRef} className="h-4" />\n        </div>'
    );
    code = code.replace(
      /  const newChat = \(\) => \{\r?\n    saveStoredAskChats\(chats\);/,
      String.raw`  const editUserMessage = (messageId, nextText) => {
    const clean = nextText.trim();
    if (!clean) return;
    clearAskRequestsForChat(activeChat, { abort: true });
    setChats((current) => current.map((chat) => {
      if (chat.id !== activeChatId) return chat;
      const messageIndex = chat.messages.findIndex((message) => message.id === messageId && message.role === "user");
      if (messageIndex < 0) return chat;
      const oldText = chat.messages[messageIndex].text;
      const nextMessages = [
        ...chat.messages.slice(0, messageIndex),
        { ...chat.messages[messageIndex], text: clean, edited: true },
        makeReply(clean),
      ];
      const shouldUpdateTitle = messageIndex === 0 || chat.title === oldText;
      return { ...chat, title: shouldUpdateTitle ? clean : chat.title, messages: nextMessages };
    }));
  };

  const stopAskReply = () => {
    const pendingReplies = activeChat?.messages?.filter((message) => typeof askEmyMessageCanStop === "function" ? askEmyMessageCanStop(message) : askEmyMessageLooksLoading(message)) || [];
    if (!pendingReplies.length) return;
    const pendingIds = new Set(pendingReplies.map((message) => message.id));
    pendingReplies.forEach((message) => {
      stoppedAskReplyIdsRef.current.add(message.id);
      clearAskRequest(message.id, { abort: true });
    });
    setChats((current) => current.map((chat) => chat.id === activeChat.id ? {
      ...chat,
      messages: chat.messages.map((message) => pendingIds.has(message.id) ? {
        ...message,
        text: "Stopped. You can send another question now.",
        results: [],
        analytics: null,
        action: null,
        provider: "user-stopped",
        responseType: "stopped",
        selectedToolName: "",
        pending: false,
        loadingStarted: false,
      } : message),
    } : chat));
  };

  const newChat = () => {
    saveStoredAskChats(chats);`
    );
    code = code.replace(
      '  if (isClosed) {',
      '  if (!currentUser) {\n    return (\n      <div className="relative min-h-screen bg-[#fff8ef] text-[#001B47]" style={{ fontFamily: "\'Public Sans\', sans-serif" }}>\n        <style>{fontImport}</style>\n        <div className="flex min-h-screen items-center justify-center px-5 text-center">\n          <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl shadow-[#001B47]/10">\n            <img src={emyLogo} alt="EMY" className="mx-auto h-12 w-auto object-contain" />\n            <h1 className="mt-6 text-3xl font-black tracking-[-0.03em]">{copy.logIntoAccount}</h1>\n            <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[#001B47]/55">{copy.signInMessage}</p>\n            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">\n              <button type="button" onClick={() => setAuthModal("signin")} className="cursor-pointer rounded-2xl bg-orange-500 px-5 py-4 text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600">{copy.logIn}</button>\n              <button type="button" onClick={() => setAuthModal("signup")} className="cursor-pointer rounded-2xl border border-[#001B47]/10 bg-white px-5 py-4 text-sm font-black text-[#001B47] hover:bg-orange-50 hover:text-orange-600">{copy.signUp}</button>\n            </div>\n          </div>\n        </div>\n        {authPrompt && <AuthRequiredPrompt onClose={() => setAuthPrompt(false)} onSignIn={() => { setAuthPrompt(false); setAuthModal("signin"); }} onSignUp={() => { setAuthPrompt(false); setAuthModal("signup"); }} />}\n        {authModal && <AuthModal type={authModal} onClose={() => setAuthModal(null)} onSwitch={setAuthModal} onLogin={loginUser} />}\n      </div>\n    );\n  }\n\n  if (isClosed) {'
    );
    code = code.replace(
      /  if \(!currentUser\) \{[\s\S]*?\r?\n  if \(isClosed\) \{/,
      '  const displayUser = currentUser || defaultAskUser();\n\n  if (isClosed) {'
    );
    code = code.replace('onSend={sendMessage}', 'onSend={(text) => currentUser ? sendMessage(text) : setAuthPrompt(true)}');
    code = code.replace(
      'onSend={(text) => currentUser ? sendMessage(text) : setAuthPrompt(true)} onOpenDrawer',
      'onSend={(text) => currentUser ? sendMessage(text) : setAuthPrompt(true)} onEditUserMessage={editUserMessage} onOpenDrawer'
    );
    code = code.replace(
      'onLogout={logout} onAccount={goToEmyAccount} />',
      'onLogout={logout} onAccount={goToEmyAccount} onStopReply={stopAskReply} />'
    );
    code = code.replaceAll('user={currentUser}', 'user={displayUser}');
    code = code.replace(
      /      <ChatDrawer isOpen=\{drawerOpen\}[\s\S]*?onAccount=\{goToEmyAccount\} \/>/,
      (match) => `${match.replace('<ChatDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} chats=', '<ChatDrawer isOpen={drawerOpen} onClose={() => { if (!sidebarPinned) setDrawerOpen(false); }} isPinned={sidebarPinned} onTogglePinned={toggleSidebarPinned} chats=').replace('onAccount={goToEmyAccount} />', 'onAccount={goToEmyAccount} onSwitchAccount={switchAskAccount} />')}\n      {!currentUser && authPrompt && <AuthRequiredPrompt onClose={() => setAuthPrompt(false)} onSignIn={() => { setAuthPrompt(false); setAuthModal("signin"); }} onSignUp={() => { setAuthPrompt(false); setAuthModal("signup"); }} />}\n      {authModal && <AuthModal type={authModal} onClose={() => setAuthModal(null)} onSwitch={setAuthModal} onLogin={loginUser} />}`
    );
    code = code.replace(
      '<div className="max-w-[90%]">',
      '<div className={visibleResults.length > 0 ? "w-full max-w-2xl" : "max-w-[90%]"}>'
    );
    code = code.replace(
      '<div className="grid gap-3 sm:grid-cols-2">',
      '<div className="mt-3 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">'
    );
    code = code.replace(
      '<p className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#001B47] shadow-sm">',
      '<p className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#001B47] shadow-sm">'
    );
  }
  if ((page.output === 'ask-emy.html' || page.output === 'ask-emy-results.html') && !code.includes('EMY_ASK_USER_KEY')) {
    code = code.replace('function App() {', `${askSessionHelpers}\nfunction App() {`);
  }
  if (page.output === 'ask-emy.html' || page.output === 'ask-emy-results.html') {
    code = code.replace(
      /function LocationFilter\(\{ location, setLocation, radius, setRadius, savedLocations, setSavedLocations \}\) \{[\s\S]*?\r?\n\}\r?\n\r?\n(?=function (?:SearchBar|ChatInput|ChatScreen)\()/,
      `${askVerifiedLocationFilterComponent}\n\n`
    );
    if (page.output === 'ask-emy-results.html') {
      code = code.replace(
        '<LocationFilter location={location} setLocation={setLocation} radius={radius} setRadius={setRadius} savedLocations={savedLocations} setSavedLocations={setSavedLocations} />',
        '<LocationFilter location={location} setLocation={setLocation} radius={radius} setRadius={setRadius} savedLocations={savedLocations} setSavedLocations={setSavedLocations} placement="top" />'
      );
      code = code.replace(
        'function ChatInput({ message, setMessage, submit, isSidebarOpen, location, setLocation, radius, setRadius, savedLocations, setSavedLocations }) {',
        'function ChatInput({ message, setMessage, submit, isSidebarOpen, location, setLocation, radius, setRadius, savedLocations, setSavedLocations, hasPendingReply = false, onStopReply }) {'
      );
      code = code.replace(
        '  const toggleAskEmyVoice = () => {\n    if (hasMessage) {',
        '  const stopReply = () => {\n    if (typeof onStopReply === "function") onStopReply();\n  };\n\n  const toggleAskEmyVoice = () => {\n    if (hasMessage) {'
      );
      code = code.replace(
        'placeholder={isListening ? copy.listening : copy.typeMessage}',
        'placeholder={hasPendingReply ? "Ask another question..." : isListening ? copy.listening : copy.typeMessage}'
      );
      code = code.replace(
        /onKeyDown=\{\(event\) => event\.key === "Enter" && submit\(\)\}/g,
        'onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); submit(); } }}'
      );
      if (!code.includes('const submitLockRef = useRef({ text: "", at: 0 });')) {
        code = code.replace(
          '  const [message, setMessage] = useState("");\n  const bottomRef = useRef(null);',
          '  const [message, setMessage] = useState("");\n  const bottomRef = useRef(null);\n  const submitLockRef = useRef({ text: "", at: 0 });'
        );
      }
      code = code.replace(
        '  const submit = () => {\n    const clean = message.trim();\n    if (!clean) return;\n    onSend(clean);\n    setMessage("");\n  };',
        String.raw`  const submit = () => {
    const clean = message.trim();
    if (!clean) return;
    const now = Date.now();
    const lastSubmit = submitLockRef.current || {};
    if (lastSubmit.text === clean && now - Number(lastSubmit.at || 0) < 900) return;
    submitLockRef.current = { text: clean, at: now };
    onSend(clean);
    setMessage("");
  };`
      );
      code = code.replace(
        /          <IconButton label=\{hasMessage \? copy\.sendMessage : isListening \? copy\.stopListening : copy\.askEmyVoice\}[\s\S]*?\r?\n            \{hasMessage \? <ArrowUpIcon \/> : <AudioIcon \/>\}\r?\n          <\/IconButton>/,
        [
          '          {hasPendingReply ? (',
          '            <>',
          '              {hasMessage && (',
          '                <IconButton label={copy.sendMessage} onClick={submit} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 p-3 text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600" data-ask-pending-send="true">',
          '                  <ArrowUpIcon />',
          '                </IconButton>',
          '              )}',
          '              <IconButton label="Stop response" onClick={onStopReply} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#101828] p-3 text-white shadow-lg shadow-[#001B47]/15 transition hover:-translate-y-0.5 hover:bg-orange-600" data-ask-stop-reply="true">',
          '                <span aria-hidden="true" className="block h-3.5 w-3.5 rounded-[3px] bg-current" />',
          '              </IconButton>',
          '            </>',
          '          ) : (',
          '            <IconButton label={hasMessage ? copy.sendMessage : isListening ? copy.stopListening : copy.askEmyVoice} onClick={toggleAskEmyVoice} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-3 text-white shadow-lg transition hover:-translate-y-0.5 ${hasMessage ? "bg-orange-500 shadow-orange-500/20 hover:bg-orange-600" : isListening ? "bg-orange-600 shadow-orange-500/25" : "bg-[#001B47] shadow-[#001B47]/15 hover:bg-orange-600"}`}>',
          '              {hasMessage ? <ArrowUpIcon /> : <AudioIcon />}',
          '            </IconButton>',
          '          )}',
        ].join('\n')
      );
      if (!code.includes('data-ask-stop-reply="true"')) {
        code = code.replace(
          String.raw`          <IconButton label={hasMessage ? copy.sendMessage : isListening ? copy.stopListening : copy.askEmyVoice} onClick={toggleAskEmyVoice} className={\`flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-3 text-white shadow-lg transition hover:-translate-y-0.5 \${hasMessage ? "bg-orange-500 shadow-orange-500/20 hover:bg-orange-600" : isListening ? "bg-orange-600 shadow-orange-500/25" : "bg-[#001B47] shadow-[#001B47]/15 hover:bg-orange-600"}\`}>
            {hasMessage ? <ArrowUpIcon /> : <AudioIcon />}
          </IconButton>`,
          [
            '          {hasPendingReply ? (',
            '            <>',
            '              {hasMessage && (',
            '                <IconButton label={copy.sendMessage} onClick={submit} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 p-3 text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600" data-ask-pending-send="true">',
            '                  <ArrowUpIcon />',
            '                </IconButton>',
            '              )}',
            '              <IconButton label="Stop response" onClick={onStopReply} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#101828] p-3 text-white shadow-lg shadow-[#001B47]/15 transition hover:-translate-y-0.5 hover:bg-orange-600" data-ask-stop-reply="true">',
            '                <span aria-hidden="true" className="block h-3.5 w-3.5 rounded-[3px] bg-current" />',
            '              </IconButton>',
            '            </>',
            '          ) : (',
            '            <IconButton label={hasMessage ? copy.sendMessage : isListening ? copy.stopListening : copy.askEmyVoice} onClick={toggleAskEmyVoice} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-3 text-white shadow-lg transition hover:-translate-y-0.5 ${hasMessage ? "bg-orange-500 shadow-orange-500/20 hover:bg-orange-600" : isListening ? "bg-orange-600 shadow-orange-500/25" : "bg-[#001B47] shadow-[#001B47]/15 hover:bg-orange-600"}`}>',
            '              {hasMessage ? <ArrowUpIcon /> : <AudioIcon />}',
            '            </IconButton>',
            '          )}',
          ].join('\n')
        );
      }
      code = code.replace(
        '<ChatInput message={message} setMessage={setMessage} submit={submit} isSidebarOpen={isSidebarOpen} location={location} setLocation={setLocation} radius={radius} setRadius={setRadius} savedLocations={savedLocations} setSavedLocations={setSavedLocations} />',
        '<ChatInput message={message} setMessage={setMessage} submit={submit} isSidebarOpen={isSidebarOpen} location={location} setLocation={setLocation} radius={radius} setRadius={setRadius} savedLocations={savedLocations} setSavedLocations={setSavedLocations} hasPendingReply={hasPendingReply} onStopReply={onStopReply} />'
      );
    }
  }
  code = code.replace(
    /const toggleAskEmyVoice = \(\) => \{\r?\n    if \(hasMessage\) \{\r?\n      submit\(\);\r?\n      return;\r?\n    \}\r?\n    setAskVoiceOpen\(\(open\) => !open\);\r?\n  \};/,
    'const toggleAskEmyVoice = () => {\n    if (hasMessage) {\n      submit();\n      return;\n    }\n    startDictation();\n  };'
  );
  code = code.replace(
    'askEmyVoiceReady: "Ask EMY voice mode will open a voice conversation. For now, use Dictate to speak into the text box.",',
    'askEmyVoiceReady: "Ask EMY voice is listening.",'
  );
  code = code.replace(
    '  const [askVoiceOpen, setAskVoiceOpen] = useState(false);\n',
    ''
  );
  code = code.replace(
    'label={hasMessage ? copy.sendMessage : askVoiceOpen ? "Close Ask EMY voice" : copy.askEmyVoice}',
    'label={hasMessage ? copy.sendMessage : isListening ? copy.stopListening : copy.askEmyVoice}'
  );
  code = code.replace(
    '${hasMessage ? "bg-orange-500 shadow-orange-500/20 hover:bg-orange-600" : askVoiceOpen ? "bg-orange-600 shadow-orange-500/25" : "bg-[#001B47] shadow-[#001B47]/15 hover:bg-orange-600"}',
    '${hasMessage ? "bg-orange-500 shadow-orange-500/20 hover:bg-orange-600" : isListening ? "bg-orange-600 shadow-orange-500/25" : "bg-[#001B47] shadow-[#001B47]/15 hover:bg-orange-600"}'
  );
  code = code.replaceAll('isListening || askVoiceOpen', 'isListening');
  code = code.replace(
    '(isListening || voiceStatus || askVoiceOpen)',
    '(isListening || voiceStatus)'
  );
  code = code.replace(
    /  const \[askVoiceOpen, setAskVoiceOpen\] = useState\(false\);\r?\n/g,
    ''
  );
  code = code.replace(
    /^\s*\{askVoiceOpen && <span[^\r\n]*\}\r?\n/gm,
    ''
  );
  code = code.replace(
    /^\s*\{askVoiceOpen && <button[^\r\n]*\}\r?\n/gm,
    ''
  );
  code = code.replaceAll(' || askVoiceOpen', '');
  code = code.replace(
    '            {askVoiceOpen && <span className="text-[#001B47]/45">{copy.askEmyVoiceReady}</span>}\n',
    ''
  );
  code = code.replace(
    '            {askVoiceOpen && <button type="button" onClick={() => setAskVoiceOpen(false)} className="cursor-pointer rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-black text-[#001B47] shadow-sm hover:bg-orange-50 hover:text-orange-600">Close Ask EMY voice</button>}\n',
    ''
  );
  if (page.output === 'ask-emy-results.html' && !code.includes('data-ask-stop-reply="true"')) {
    code = code.replace(
      /          <IconButton label=\{hasMessage \? copy\.sendMessage : isListening \? copy\.stopListening : copy\.askEmyVoice\}[\s\S]*?\r?\n            \{hasMessage \? <ArrowUpIcon \/> : <AudioIcon \/>\}\r?\n          <\/IconButton>/,
      [
        '          {hasPendingReply ? (',
        '            <>',
        '              {hasMessage && (',
        '                <IconButton label={copy.sendMessage} onClick={submit} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 p-3 text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600" data-ask-pending-send="true">',
        '                  <ArrowUpIcon />',
        '                </IconButton>',
        '              )}',
        '              <IconButton label="Stop response" onClick={onStopReply} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#101828] p-3 text-white shadow-lg shadow-[#001B47]/15 transition hover:-translate-y-0.5 hover:bg-orange-600" data-ask-stop-reply="true">',
        '                <span aria-hidden="true" className="block h-3.5 w-3.5 rounded-[3px] bg-current" />',
        '              </IconButton>',
        '            </>',
        '          ) : (',
        '            <IconButton label={hasMessage ? copy.sendMessage : isListening ? copy.stopListening : copy.askEmyVoice} onClick={toggleAskEmyVoice} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-3 text-white shadow-lg transition hover:-translate-y-0.5 ${hasMessage ? "bg-orange-500 shadow-orange-500/20 hover:bg-orange-600" : isListening ? "bg-orange-600 shadow-orange-500/25" : "bg-[#001B47] shadow-[#001B47]/15 hover:bg-orange-600"}`}>',
        '              {hasMessage ? <ArrowUpIcon /> : <AudioIcon />}',
        '            </IconButton>',
        '          )}',
      ].join('\n')
    );
  }
  if (page.output === 'ask-emy.html' || page.output === 'ask-emy-results.html') {
    code = code.replaceAll(
      '<img src={emyLogo} alt="EMY" className="h-11 w-auto object-contain" />',
      '<span className="flex items-center gap-2"><img src={emyLogo} alt="EMY" className="h-11 w-auto object-contain" />' + askEmyMenuMascot + '</span>'
    );
    code = code.replaceAll(
      'className="h-14 w-full bg-transparent text-lg font-semibold text-[#001B47] outline-none placeholder:text-[#001B47]/45 md:text-xl"',
      'className="h-14 w-full bg-transparent text-base font-normal text-[#001B47] outline-none placeholder:text-[#001B47]/45 md:text-lg"'
    );
    code = code.replace(
      '  const [loginAttempted, setLoginAttempted] = useState(false);',
      '  const [loginAttempted, setLoginAttempted] = useState(false);\n  const [signupOverlay, setSignupOverlay] = useState(null);\n  const [signupPrivacy, setSignupPrivacy] = useState("private");'
    );
    code = code.replaceAll(
      'onClick={() => onSwitch("signup")}',
      'onClick={() => setSignupOverlay("intro")}'
    );
    code = code.replace(
      /(        <CinematicPanel \/>\r?\n      <\/div>\r?\n)(    <\/div>\r?\n  \);\r?\n}\r?\n\r?\nfunction AuthModal)/,
      '$1      {signupOverlay === "intro" && <SignUpIntro onClose={() => setSignupOverlay(null)} onSwitch={() => setSignupOverlay(null)} onCreate={() => setSignupOverlay("role")} />}\n      {signupOverlay === "role" && <RoleSelection onBack={() => setSignupOverlay("intro")} onClose={() => setSignupOverlay(null)} onSelectRole={() => setSignupOverlay("form")} />}\n      {signupOverlay === "form" && <RegistrationForm privacy={signupPrivacy} setPrivacy={setSignupPrivacy} onBack={() => setSignupOverlay("role")} onClose={() => setSignupOverlay(null)} onSwitch={() => setSignupOverlay(null)} />}\n$2'
    );
    if (!code.includes('const openForgotPassword = () =>')) {
      code = code.replace(
        /  const submitLoginDetails = \(event\) => \{\r?\n    event\.preventDefault\(\);\r?\n    setLoginAttempted\(true\);\r?\n    if \(!loginEmail\.trim\(\) \|\| !loginPassword\.trim\(\)\) return;\r?\n    onLogin\(loginEmail\.trim\(\)\);\r?\n  \};/,
        String.raw`  const submitLoginDetails = (event) => {
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
  };`
      );
    }
    code = code.replace(
      '<button type="button" className="cursor-pointer font-semibold text-[#001B47] hover:text-orange-600">{copy.forgotPassword}</button>',
      '<button type="button" onClick={openForgotPassword} className="cursor-pointer font-semibold text-[#001B47] hover:text-orange-600">{copy.forgotPassword}</button>'
    );
    code = code
      .replaceAll('family=Public+Sans:wght@400;500;600;700;800;900', 'family=Inter:wght@400;500;600;700;800')
      .replaceAll('Public Sans', 'Inter');
    code = code.replace(
      "  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');",
      "  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');\n" + askSoftTypeCss
    );
    code = code.replace(
      'const fontImport = "@import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap\');";',
      'const fontImport = "@import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap\');\\n' + askSoftTypeCss.replaceAll('\n', '\\n') + '";'
    );
  }
  if (page.output === 'ask-emy-results.html') {
    if (!code.includes('pinSidebar: "Pin menu"')) {
      code = code.replace(
        'closeSidebar: "Close sidebar",',
        'closeSidebar: "Close sidebar",\n  pinSidebar: "Pin menu",\n  unpinSidebar: "Unpin menu",'
      );
    }
    code = code.replace(
      /(<span className="flex items-center gap-2">[\s\S]*?<\/span>)\s*<IconButton label=\{copy\.closeSidebar\} onClick=\{onClose\} className="flex h-10 w-10 items-center justify-center rounded-xl text-\[#001B47\] hover:bg-orange-50 hover:text-orange-600">\s*<MenuIcon className="h-5 w-5" \/>\s*<\/IconButton>/,
      String.raw`$1
        <div className="flex items-center gap-2">
          <IconButton label={isPinned ? copy.unpinSidebar : copy.pinSidebar} onClick={onTogglePinned} className={"flex h-9 w-9 items-center justify-center rounded-xl hover:bg-orange-50 " + (isPinned ? "bg-orange-50 text-orange-500" : "text-[#001B47] hover:text-orange-600")}>
            <PinIcon className="h-4 w-4" filled={isPinned} />
          </IconButton>
          {!isPinned && (
            <IconButton label={copy.closeSidebar} onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl text-[#001B47] hover:bg-orange-50 hover:text-orange-600">
              <MenuIcon className="h-5 w-5" />
            </IconButton>
          )}
        </div>`
    );
  }
  code = code
    .replaceAll('family=Public+Sans:wght@400;500;600;700;800;900', 'family=Inter:wght@400;500;600;700;800')
    .replaceAll('family=Public+Sans:ital,wght@0,100..900;1,100..900', 'family=Inter:wght@400;500;600;700;800')
    .replaceAll('Public Sans', 'Inter');
  return { code, componentName };
}
