import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales"; // Import translations

// Function to get the saved language or fallback to "en"
const getInitialLanguage = () => {
  return localStorage.getItem("i18nLng") || "en"; // Default to "en" if not set
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(), // Use saved language or default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Listen for language changes and save to localStorage
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nLng", lng);
});

export default i18n;