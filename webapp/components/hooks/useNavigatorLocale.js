import { useEffect, useState } from "react";
import locales from "../../config/locales";

export const useNavigatorLocale = () => {
  const [locale, setLocale] = useState({ locale: "en", messages: locales["en"] });

  useEffect(() => {
    let navLocale =
      (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || "en";
    const localeWithoutRegionCode = navLocale.toLowerCase().split(/[_-]+/)[0];
    const localeMessages = locales[navLocale] || locales[localeWithoutRegionCode] || locales["en"];

    if (!(localeMessages === locales["en"])) {
      setLocale({ locale: navLocale, messages: localeMessages });
    }
  }, []);

  return locale;
};
