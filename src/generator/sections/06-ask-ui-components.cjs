/* EMY generator section: 06-ask-ui-components.cjs (source lines 2571-3015) */
const askHomeSearchBarComponent = String.raw`function SearchBar({ location, setLocation, radius, setRadius, savedLocations, setSavedLocations, user, onAuthRequired, sidebarOpen = false }) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const recognitionRef = useRef(null);
  const hasQuery = query.trim().length > 0;

  const submit = () => {
    if (!hasQuery) return;
    if (!user) {
      onAuthRequired();
      return;
    }
    const chatId = createAskChatId();
    saveStoredAskLocation({ location, radius, savedLocations });
    saveStoredAskSidebarOpen(sidebarOpen);
    window.location.href = askResultsUrl(query.trim(), chatId, location, radius, sidebarOpen);
  };

  const stopDictation = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    recognitionRef.current = null;
    setIsListening(false);
    setVoiceStatus("");
  };

  const startDictation = () => {
    if (!user) {
      onAuthRequired();
      return;
    }

    if (typeof window === "undefined") return;

    if (isListening) {
      stopDictation();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceStatus(copy.voiceNotSupported);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "en-GB";
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceStatus(copy.listening);
      };

      recognition.onend = () => {
        recognitionRef.current = null;
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        recognitionRef.current = null;
        setIsListening(false);
        const blocked = event.error === "not-allowed" || event.error === "service-not-allowed";
        setVoiceStatus(blocked ? copy.micBlocked : copy.voiceNotSupported);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results).map((result) => result[0].transcript).join(" ").trim();
        if (transcript) {
          setQuery(transcript);
          setVoiceStatus(copy.voiceReady);
        }
      };

      recognition.start();
    } catch (error) {
      setIsListening(false);
      recognitionRef.current = null;
      setVoiceStatus(copy.voiceNotSupported);
    }
  };

  const toggleAskEmyVoice = () => {
    if (hasQuery) {
      submit();
      return;
    }
    startDictation();
  };

  return (
    <div className="relative z-40 mx-auto mt-7 w-full max-w-[960px]">
      <div className={"rounded-[2rem] border bg-white/85 p-2 shadow-[0_18px_60px_rgba(0,27,71,0.08)] backdrop-blur-2xl " + (isListening ? "border-orange-300" : "border-[#001B47]/10")}>
        <div className="flex items-center gap-3">
          <LocationFilter location={location} setLocation={setLocation} radius={radius} setRadius={setRadius} savedLocations={savedLocations} setSavedLocations={setSavedLocations} />
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <SearchIcon className="hidden h-5 w-5 shrink-0 text-[#001B47]/35 sm:block" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submit()} placeholder={isListening ? copy.listening : getAskGreetingPlaceholder()} className="h-14 w-full bg-transparent text-lg font-semibold text-[#001B47] outline-none placeholder:text-[#001B47]/45 md:text-xl" />
          </div>

          <IconButton label={isListening ? copy.stopListening : copy.voiceSearch} onClick={startDictation} className={"flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition hover:bg-orange-50 hover:text-orange-600 " + (isListening ? "bg-orange-100 text-orange-600" : "text-[#001B47]")}>
            <MicIcon />
          </IconButton>

          <IconButton label={hasQuery ? copy.sendMessage : isListening ? copy.stopListening : copy.askEmyVoice} onClick={toggleAskEmyVoice} className={"flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-3 text-white shadow-lg transition hover:-translate-y-0.5 " + (hasQuery ? "bg-orange-500 shadow-orange-500/20 hover:bg-orange-600" : isListening ? "bg-orange-600 shadow-orange-500/25" : "bg-[#001B47] shadow-[#001B47]/15 hover:bg-orange-600")}>
            {hasQuery ? <ArrowUpIcon /> : <AudioIcon />}
          </IconButton>
        </div>

        {(isListening || voiceStatus) && (
          <div className="flex flex-wrap items-center gap-3 px-5 pb-2 pt-2 text-xs font-bold">
            {isListening && <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-orange-500" />}
            {voiceStatus && <span className={isListening ? "text-orange-600" : "text-[#001B47]/45"}>{voiceStatus}</span>}
            {isListening && <button type="button" onClick={stopDictation} className="cursor-pointer rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-black text-[#001B47] shadow-sm hover:bg-orange-50 hover:text-orange-600">Close dictation</button>}
            {!isListening && voiceStatus && <button type="button" onClick={() => setVoiceStatus("")} className="cursor-pointer rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-black text-[#001B47] shadow-sm hover:bg-orange-50 hover:text-orange-600">Close message</button>}
          </div>
        )}
      </div>
    </div>
  );
}`;

const askVerifiedLocationFilterComponent = String.raw`function isMeaningfulAskLocationQuery(query) {
  const text = String(query || "").trim();
  return text.length >= 3 && /[A-Za-z0-9]/.test(text);
}

function cleanAskRadius(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.min(10, Math.max(1, Math.round(numeric))) : 5;
}

function shortAskLocationLabel(address) {
  const text = String(address || "").trim();
  if (!text || text === "Near me") return "Near me";
  const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
  const label = parts.length > 1 ? parts.slice(0, 2).join(", ") : text;
  return label.length > 54 ? label.slice(0, 51).trim() + "..." : label;
}

function uniqueAskLocationSuggestions(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = String(item.address || "").toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 6);
}

async function lookupAskLocationSuggestions(query) {
  const text = String(query || "").trim();
  if (!isMeaningfulAskLocationQuery(text)) return [];
  const suggestions = [];
  const compactPostcode = text.replace(/\s+/g, "").toUpperCase();
  try {
    const postcodeResponse = await fetch("https://api.postcodes.io/postcodes/" + encodeURIComponent(compactPostcode) + "/autocomplete", { headers: { Accept: "application/json" } });
    if (postcodeResponse.ok) {
      const postcodeData = await postcodeResponse.json();
      const postcodes = Array.isArray(postcodeData && postcodeData.result) ? postcodeData.result : [];
      postcodes.slice(0, 5).forEach((postcode) => suggestions.push({ address: postcode, latitude: null, longitude: null }));
    }
  } catch (error) {}
  try {
    const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=gb&limit=6&q=" + encodeURIComponent(text);
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (response.ok) {
      const data = await response.json();
      (Array.isArray(data) ? data : []).forEach((item) => {
        const latitude = Number(item.lat);
        const longitude = Number(item.lon);
        if (item.display_name && Number.isFinite(latitude) && Number.isFinite(longitude)) {
          suggestions.push({ address: item.display_name, latitude, longitude });
        }
      });
    }
  } catch (error) {}
  return uniqueAskLocationSuggestions(suggestions);
}

async function resolveAskLocationCoordinates(address, preferredSuggestion) {
  const text = String(address || "").trim();
  if (!isMeaningfulAskLocationQuery(text)) return null;
  const selected = preferredSuggestion && String(preferredSuggestion.address || "").trim().toLowerCase() === text.toLowerCase() ? preferredSuggestion : null;
  if (selected && Number.isFinite(Number(selected.latitude)) && Number.isFinite(Number(selected.longitude))) {
    return { address: selected.address, latitude: Number(selected.latitude), longitude: Number(selected.longitude) };
  }
  const compactPostcode = text.replace(/\s+/g, "").toUpperCase();
  const looksLikeUkPostcode = /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(compactPostcode);
  if (looksLikeUkPostcode) {
    try {
      const postcodeResponse = await fetch("https://api.postcodes.io/postcodes/" + encodeURIComponent(compactPostcode), { headers: { Accept: "application/json" } });
      if (postcodeResponse.ok) {
        const postcodeData = await postcodeResponse.json();
        const result = postcodeData && postcodeData.result;
        if (result && Number.isFinite(Number(result.latitude)) && Number.isFinite(Number(result.longitude))) {
          return { address: result.postcode || text, latitude: Number(result.latitude), longitude: Number(result.longitude) };
        }
      }
    } catch (error) {}
  }
  try {
    const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=gb&limit=1&q=" + encodeURIComponent(text);
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) return null;
    const data = await response.json();
    const first = Array.isArray(data) ? data[0] : null;
    const latitude = Number(first && first.lat);
    const longitude = Number(first && first.lon);
    if (!first || !Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    return { address: first.display_name || text, latitude, longitude };
  } catch (error) {
    return null;
  }
}

async function reverseAskLocationCoordinates(latitude, longitude) {
  try {
    const url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + encodeURIComponent(latitude) + "&lon=" + encodeURIComponent(longitude);
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) return "";
    const data = await response.json();
    return data.display_name || "";
  } catch (error) {
    return "";
  }
}

function nextAskSavedLocations(address, savedLocations) {
  const clean = String(address || "").trim();
  return [clean, ...savedLocations.filter((item) => item.toLowerCase() !== clean.toLowerCase())]
    .filter(isMeaningfulAskLocationQuery)
    .slice(0, 5);
}

function LocationFilter({ location, setLocation, radius, setRadius, savedLocations, setSavedLocations, placement = "bottom" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftLocation, setDraftLocation] = useState(location === "Near me" ? "" : location);
  const [status, setStatus] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isResolving, setIsResolving] = useState(false);
  const suggestionRequestRef = useRef(0);
  const locationFilterRef = useRef(null);
  const radiusOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const storedAskLocation = readStoredAskLocation();
  const isCurrentLocation = location === "Near me" || (storedAskLocation.locationSource === "current" && storedAskLocation.location === location);
  const label = location === "Near me" ? copy.nearMe : location.trim() ? shortAskLocationLabel(location) : copy.streetOrPostcode;
  const cleanSavedLocations = savedLocations.filter(isMeaningfulAskLocationQuery);
  const popupPosition = placement === "top" ? "fixed bottom-28 left-1/2 z-[260] -translate-x-1/2" : "absolute left-0 top-14 z-[220]";

  useEffect(() => {
    setDraftLocation(location === "Near me" ? "" : location);
  }, [location]);

  useEffect(() => {
    if (cleanSavedLocations.length !== savedLocations.length) {
      setSavedLocations(cleanSavedLocations);
      saveStoredAskLocation({ location, radius, savedLocations: cleanSavedLocations });
    }
  }, [savedLocations]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutside = (event) => {
      if (locationFilterRef.current && !locationFilterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const clean = draftLocation.trim();
    setSelectedSuggestion(null);
    clearTimeout(suggestionRequestRef.current);
    if (!clean) {
      setSuggestions([]);
      setStatus("");
      return;
    }
    if (!isMeaningfulAskLocationQuery(clean)) {
      setSuggestions([]);
      setStatus("Enter a real postcode, street, or town.");
      return;
    }
    suggestionRequestRef.current = setTimeout(async () => {
      const requestId = Date.now();
      suggestionRequestRef.current = requestId;
      setStatus("Searching locations...");
      const nextSuggestions = await lookupAskLocationSuggestions(clean);
      if (suggestionRequestRef.current !== requestId) return;
      setSuggestions(nextSuggestions);
      setStatus(nextSuggestions.length ? "Choose a matching location or apply the exact address." : "No matching location found yet. Try a postcode, road, or town.");
    }, 300);
    return () => clearTimeout(suggestionRequestRef.current);
  }, [draftLocation, isOpen]);

  const persistLocation = ({ address, latitude, longitude, source, nextRadius = radius, nextSaved = cleanSavedLocations }) => {
    const cleanAddress = String(address || "").trim() || "Near me";
    setLocation(cleanAddress);
    setRadius(cleanAskRadius(nextRadius));
    setSavedLocations(nextSaved);
    saveStoredAskLocation({
      location: cleanAddress,
      radius: cleanAskRadius(nextRadius),
      savedLocations: nextSaved,
      latitude,
      longitude,
      locationLabel: shortAskLocationLabel(cleanAddress),
      locationSource: source,
    });
  };

  const selectNearMe = () => {
    setStatus("Finding your current location...");
    setIsResolving(true);
    setSuggestions([]);
    setRadius(5);
    if (!navigator.geolocation) {
      setIsResolving(false);
      setStatus("Current location is not available in this browser. Choose a real address instead.");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const address = await reverseAskLocationCoordinates(latitude, longitude);
      persistLocation({ address: address || "Near me", latitude, longitude, source: "current", nextRadius: 5, nextSaved: cleanSavedLocations });
      setDraftLocation("");
      setStatus(address ? "Current location saved." : "Current location saved. Address lookup will connect through the location backend.");
      setIsResolving(false);
      setIsOpen(false);
    }, () => {
      setIsResolving(false);
      setStatus("Location permission was not allowed. Choose a real address instead.");
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
  };

  const selectSavedLocation = async (item) => {
    setStatus("Checking saved location...");
    setIsResolving(true);
    const resolved = await resolveAskLocationCoordinates(item);
    if (!resolved) {
      setIsResolving(false);
      setStatus("We could not verify this saved location. Please edit it with a real postcode or address.");
      return;
    }
    const nextSaved = nextAskSavedLocations(resolved.address, cleanSavedLocations);
    persistLocation({ address: resolved.address, latitude: resolved.latitude, longitude: resolved.longitude, source: "saved", nextSaved });
    setDraftLocation(resolved.address);
    setIsResolving(false);
    setIsOpen(false);
  };

  const saveLocation = async () => {
    const clean = draftLocation.trim();
    if (!isMeaningfulAskLocationQuery(clean)) {
      setStatus("Enter a real postcode, street, or town.");
      return;
    }
    setStatus("Checking location coordinates...");
    setIsResolving(true);
    const resolved = await resolveAskLocationCoordinates(clean, selectedSuggestion);
    if (!resolved) {
      setIsResolving(false);
      setStatus("We could not find that location. Please enter a real postcode or address.");
      return;
    }
    const nextSaved = nextAskSavedLocations(resolved.address, cleanSavedLocations);
    persistLocation({ address: resolved.address, latitude: resolved.latitude, longitude: resolved.longitude, source: "saved", nextSaved });
    setDraftLocation(resolved.address);
    setStatus("Location saved.");
    setIsResolving(false);
    setIsOpen(false);
  };

  const deleteLocation = (event, item) => {
    event.stopPropagation();
    const nextSaved = cleanSavedLocations.filter((saved) => saved !== item);
    setSavedLocations(nextSaved);
    saveStoredAskLocation({ location, radius, savedLocations: nextSaved });
    if (location === item) {
      setLocation("Near me");
      saveStoredAskLocation({ location: "Near me", radius, savedLocations: nextSaved, latitude: null, longitude: null, locationSource: "current" });
    }
    if (draftLocation === item) setDraftLocation("");
  };

  const toggleLocationMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen((value) => !value);
  };

  return (
    <div ref={locationFilterRef} className="relative flex min-w-0 shrink-0">
      <button type="button" aria-expanded={isOpen} onPointerDown={toggleLocationMenu} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") toggleLocationMenu(event); }} className="flex h-12 min-w-[112px] max-w-[44vw] cursor-pointer items-center gap-2 rounded-full border border-[#001B47]/8 bg-white px-3 text-xs font-medium text-[#001B47]/62 shadow-sm hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 sm:max-w-[260px] sm:px-4 sm:text-sm"><LocationIcon className="h-4 w-4 shrink-0" /><span className="min-w-0 truncate">{label}</span><span className="shrink-0 rounded-full bg-orange-50 px-2 py-1 text-[11px] font-semibold text-orange-600">{radius} {copy.mileShort}</span></button>
      {isOpen && (
        <div className={popupPosition + " max-h-[72vh] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-3xl border border-[#001B47]/8 bg-white p-4 text-left shadow-[0_24px_70px_rgba(0,27,71,0.22)] backdrop-blur-xl"}>
          <div className="mb-2 flex items-center justify-between px-1"><p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">{copy.location}</p><button type="button" onClick={() => setIsOpen(false)} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-orange-50 text-sm font-black text-[#001B47]/70 hover:bg-orange-100 hover:text-orange-600" aria-label="Close location"><span aria-hidden="true">x</span></button></div>
          <button type="button" onClick={selectNearMe} disabled={isResolving} className={"mb-3 flex w-full cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-sm font-black " + (isCurrentLocation ? "bg-orange-100 text-orange-600" : "bg-orange-50 text-[#001B47] hover:bg-orange-100 hover:text-orange-600")}><span className="flex min-w-0 items-center gap-2"><LocationIcon className="h-4 w-4 shrink-0" /><span className="truncate">{copy.nearMe}</span></span><span className="rounded-full bg-white/80 px-2 py-1 text-[11px] font-black">5 {copy.miles}</span></button>
          {cleanSavedLocations.map((item) => (
            <div key={item} className={"mb-2 flex items-center gap-2 rounded-2xl px-3 py-2 " + (location === item ? "bg-[#f0f1f3]" : "bg-[#001B47]/5")}>
              <button type="button" onClick={() => selectSavedLocation(item)} className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left text-sm font-black text-[#001B47]/75 hover:text-orange-600"><LocationIcon className="h-4 w-4 shrink-0 text-orange-500" /><span className="truncate">{shortAskLocationLabel(item)}</span></button>
              <button type="button" onClick={(event) => deleteLocation(event, item)} className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-sm font-black text-[#001B47]/45 shadow-sm hover:bg-orange-50 hover:text-orange-600" aria-label={"Delete " + item}>x</button>
            </div>
          ))}
          <label className="block text-xs font-bold text-[#001B47]/55">{copy.streetOrPostcode}</label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[#001B47]/10 bg-white px-3 py-2"><LocationIcon className="h-4 w-4 shrink-0 text-orange-500" /><input value={draftLocation} onChange={(event) => setDraftLocation(event.target.value)} placeholder={copy.locationExample} className="h-9 w-full bg-transparent text-sm font-bold text-[#001B47] outline-none placeholder:text-[#001B47]/35" /></div>
          {suggestions.length > 0 && (
            <div className="mt-2 max-h-44 overflow-y-auto rounded-2xl border border-[#001B47]/8 bg-white shadow-lg shadow-[#001B47]/5">
              {suggestions.map((item) => (
                <button key={item.address} type="button" onClick={() => { setDraftLocation(item.address); setSelectedSuggestion(item); setSuggestions([]); setStatus("Location selected. Apply to save it."); }} className="block w-full cursor-pointer px-3 py-2 text-left hover:bg-orange-50">
                  <span className="block truncate text-sm font-black text-[#001B47]">{shortAskLocationLabel(item.address)}</span>
                  <span className="block truncate text-[11px] font-semibold text-[#001B47]/45">{item.address}</span>
                </button>
              ))}
            </div>
          )}
          {status && <p className="mt-2 text-xs font-bold leading-5 text-[#001B47]/55">{status}</p>}
          <div className="mt-4 flex items-center justify-between"><p className="text-xs font-bold text-[#001B47]/55">{copy.searchRadius}</p><p className="text-sm font-black text-orange-600">{radius} {copy.miles}</p></div>
          <div className="mt-3 grid grid-cols-5 gap-2">{radiusOptions.map((mile) => <button key={mile} type="button" onClick={() => setRadius(mile)} className={"cursor-pointer rounded-2xl px-3 py-2 text-sm font-black " + (radius === mile ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-orange-50 text-orange-600 hover:bg-orange-100")}>{mile}</button>)}</div>
          <button type="button" onClick={saveLocation} disabled={isResolving} className="mt-4 w-full cursor-pointer rounded-2xl bg-[#001B47] px-4 py-3 text-sm font-black text-white hover:bg-orange-600 disabled:cursor-wait disabled:bg-[#001B47]/60">{isResolving ? "Checking..." : copy.applyLocation}</button>
        </div>
      )}
    </div>
  );
}`;

