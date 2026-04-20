import { useState, useEffect } from "react";
import { Globe, X } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "ur", name: "Urdu" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "hi", name: "Hindi" },
  { code: "tr", name: "Turkish" },
  { code: "zh-CN", name: "Chinese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "nl", name: "Dutch" },
  { code: "fa", name: "Persian" },
  { code: "bn", name: "Bengali" },
  { code: "id", name: "Indonesian" },
  { code: "ms", name: "Malay" },
  { code: "sv", name: "Swedish" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "gu", name: "Gujarati" },
  { code: "pl", name: "Polish" },
  { code: "uk", name: "Ukrainian" },
];

export default function LanguageSelector() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((l) => l.code).join(","),
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Wait for the select element to be created
      const checkReady = setInterval(() => {
        const select = document.querySelector("#google_translate_element select");
        if (select) {
          setIsReady(true);
          clearInterval(checkReady);
        }
      }, 100);

      // Timeout after 10 seconds
      setTimeout(() => clearInterval(checkReady), 10000);
    };
  }, []);

  const handleLanguageSelect = (code) => {
    const select = document.querySelector("#google_translate_element select");
    if (select) {
      // Set the value
      select.value = code;
      
      // Trigger change event (multiple methods for compatibility)
      const changeEvent = new Event("change", { bubbles: true });
      select.dispatchEvent(changeEvent);
      
      // Also try triggering it directly if the above doesn't work
      if (select.onchange) {
        select.onchange({ target: select });
      }
    }
    setModalOpen(false);
  };

  return (
    <div>
      {/* Language Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-300 shadow-sm hover:bg-gray-50 transition text-sm text-gray-700"
      >
        <Globe size={18} />
        <span>Language</span>
      </button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative animate-fadeIn">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Language</h2>

            {!isReady && (
              <p className="text-sm text-gray-500 mb-3">Loading languages...</p>
            )}

            <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  disabled={!isReady}
                  className="px-3 py-2 bg-gray-100 hover:bg-orange-400 hover:text-white rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Off-screen Google Translate element */}
      <div
        id="google_translate_element"
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          zIndex: -1,
          visibility: "hidden",
        }}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}