// src/hooks/useAnchorScrolling.ts
import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Ta funkcja próbuje przewinąć do elementu z podanym hashem.
 * Jeśli element nie zostanie znaleziony od razu (np. z powodu animacji),
 * będzie próbować ponownie co 100ms, maksymalnie przez sekundę.
 */
const scrollToHash = (hash: string, attempt = 0) => {
  const id = hash.replace("#", "");
  if (!id) return;

  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (attempt < 10) {
    // Ponów próbę po krótkim opóźnieniu
    setTimeout(() => scrollToHash(hash, attempt + 1), 100);
  }
};

export function useAnchorScrolling() {
  const [location] = useLocation();

  // Ten efekt obsługuje nawigację MIĘDZY różnymi stronami
  // (np. z Home do /ziemia-i-kosmos#seasons)
  useEffect(() => {
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }
  }, [location]);

  // Ten efekt obsługuje klikanie w kotwice NA TEJ SAMEJ stronie
  // (np. z #seasons do #gravity na stronie /ziemia-i-kosmos)
  useEffect(() => {
    const handleHashChange = () => {
      scrollToHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    // Sprzątanie po odmontowaniu komponentu
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []); // Uruchamiamy tylko raz, aby dodać nasłuchiwanie
}
