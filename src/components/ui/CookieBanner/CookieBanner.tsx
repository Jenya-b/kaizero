"use client";

import { useSyncExternalStore } from "react";
import styles from "./CookieBanner.module.scss";

const storageKey = "kaizero-cookie-consent";
const storageEventName = "kaizero-cookie-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(storageEventName, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(storageEventName, callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(storageKey) === "accepted";
}

function getServerSnapshot() {
  return true;
}

export function CookieBanner() {
  const hasAccepted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  function acceptCookies() {
    localStorage.setItem(storageKey, "accepted");
    window.dispatchEvent(new Event(storageEventName));
  }

  if (hasAccepted) {
    return null;
  }

  return (
    <div className={styles.banner} role="region" aria-label="Уведомление о cookie">
      <p>
        Мы используем cookie для корректной работы сайта и анализа посещаемости.
        Продолжая пользоваться сайтом, вы соглашаетесь с их использованием.
      </p>
      <button type="button" onClick={acceptCookies}>
        Понятно
      </button>
    </div>
  );
}
