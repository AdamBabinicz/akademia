import { createIntl, createIntlCache } from "react-intl";
import pl from "@/locales/pl.json";
import en from "@/locales/en.json";
import hu from "@/locales/hu.json";
import { Language } from "@/types/education";

export type MessagesType = typeof en;

export const messages: Record<Language, MessagesType> = {
  pl,
  en,
  hu,
};

const cache = createIntlCache();

const getLocale = (): Language => {
  const supportedLocales: Language[] = ["pl", "en", "hu"];

  // 1. Sprawdź, czy język jest już zapisany w localStorage
  const storedLanguage = localStorage.getItem("language") as Language;
  if (storedLanguage && supportedLocales.includes(storedLanguage)) {
    return storedLanguage;
  }

  // 2. Jeśli nie, sprawdź język przeglądarki
  const browserLanguage = navigator.language.split("-")[0] as Language;
  if (supportedLocales.includes(browserLanguage)) {
    return browserLanguage;
  }

  // 3. W ostateczności, użyj polskiego jako domyślnego
  return "pl";
};

const locale = getLocale();

export const intl = createIntl(
  {
    locale: locale,
    messages: messages[locale],
  },
  cache
);
