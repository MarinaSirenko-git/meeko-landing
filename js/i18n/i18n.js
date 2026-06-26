const SUPPORTED_LOCALES = ["en", "ru", "th", "zh-Hans"];
const DEFAULT_LOCALE = "en";
const STORAGE_KEY = "meeko-locale";

/** @type {Record<string, Record<string, unknown>>} */
const messages = {};

let locale = DEFAULT_LOCALE;

function resolveMessage(source, key) {
  const parts = key.split(".");
  let value = source;

  for (const part of parts) {
    if (value == null || typeof value !== "object") {
      return undefined;
    }
    value = value[part];
  }

  return typeof value === "string" ? value : undefined;
}

function interpolate(template, params = {}) {
  return template.replace(/\{(\w+)\}/g, (_, name) => {
    return Object.prototype.hasOwnProperty.call(params, name)
      ? String(params[name])
      : `{${name}}`;
  });
}

/**
 * @param {string} key
 * @param {Record<string, string | number>} [params]
 */
export function t(key, params = {}) {
  const localized = resolveMessage(messages[locale], key);
  const fallback = resolveMessage(messages[DEFAULT_LOCALE], key);
  const value = localized ?? fallback;

  if (value === undefined) {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Missing translation key: ${key}`);
    }
    return key;
  }

  return interpolate(value, params);
}

export function getLocale() {
  return locale;
}

export function getSupportedLocales() {
  return [...SUPPORTED_LOCALES];
}

/** @type {Map<string, Promise<void>>} */
const localeLoadPromises = new Map();

async function loadLocale(loc) {
  const data = await import(`./locales/${loc}.json`);
  messages[loc] = data.default;
}

async function ensureLocaleLoaded(loc) {
  if (messages[loc]) {
    return;
  }

  let promise = localeLoadPromises.get(loc);
  if (!promise) {
    promise = loadLocale(loc).catch((error) => {
      localeLoadPromises.delete(loc);
      throw error;
    });
    localeLoadPromises.set(loc, promise);
  }

  await promise;
}

function scheduleIdleLocalePreload() {
  const pending = SUPPORTED_LOCALES.filter((loc) => !messages[loc]);
  if (pending.length === 0) {
    return;
  }

  const preload = () => {
    pending.forEach((loc) => {
      void ensureLocaleLoaded(loc);
    });
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(preload, { timeout: 4000 });
  } else {
    window.setTimeout(preload, 2000);
  }
}

function parseParams(raw) {
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Invalid data-i18n-params JSON: ${raw}`);
    }
    return {};
  }
}

export function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (!key) return;
    element.textContent = t(key, parseParams(element.getAttribute("data-i18n-params")));
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.getAttribute("data-i18n-html");
    if (!key) return;
    element.innerHTML = t(key, parseParams(element.getAttribute("data-i18n-params")));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.getAttribute("data-i18n-aria-label");
    if (!key) return;
    element.setAttribute(
      "aria-label",
      t(key, parseParams(element.getAttribute("data-i18n-params"))),
    );
  });

  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const key = element.getAttribute("data-i18n-title");
    if (!key) return;
    element.setAttribute(
      "title",
      t(key, parseParams(element.getAttribute("data-i18n-params"))),
    );
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.getAttribute("data-i18n-alt");
    if (!key) return;
    element.setAttribute(
      "alt",
      t(key, parseParams(element.getAttribute("data-i18n-params"))),
    );
  });

  updateDocumentMeta();
}

function updateDocumentMeta() {
  document.title = t("meta.title");

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", t("meta.description"));
  }
}

function detectInitialLocale() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LOCALES.includes(saved)) {
    return saved;
  }

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("ru")) return "ru";
  if (browserLang.startsWith("th")) return "th";
  if (browserLang.startsWith("zh")) return "zh-Hans";

  return DEFAULT_LOCALE;
}

function initLocaleSwitcher() {
  initHeaderLocaleSwitcher();
  initMobileLocaleSwitcher();
}

function initHeaderLocaleSwitcher() {
  const switcher = document.querySelector("[data-locale-switcher]");
  if (!switcher) return;

  const trigger = switcher.querySelector(".locale-switcher__trigger");
  const menu = switcher.querySelector(".locale-switcher__menu");

  if (!trigger || !menu) return;

  const closeMenu = () => {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    menu.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
  };

  const toggleMenu = () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  };

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  switcher.querySelectorAll("[data-locale-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLocale = button.getAttribute("data-locale-option");
      if (nextLocale) {
        setLocale(nextLocale);
      }
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!switcher.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function initMobileLocaleSwitcher() {
  const switcher = document.querySelector("[data-locale-switcher-mobile]");
  if (!switcher) return;

  switcher.querySelectorAll("[data-locale-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLocale = button.getAttribute("data-locale-option");
      if (nextLocale) {
        setLocale(nextLocale);
      }
    });
  });
}

function updateLocaleSwitcherUi() {
  document.querySelectorAll("[data-locale-option]").forEach((button) => {
    const optionLocale = button.getAttribute("data-locale-option");
    const isActive = optionLocale === locale;
    const activeClass = button.classList.contains("mobile-menu__locale-option")
      ? "mobile-menu__locale-option--active"
      : "locale-switcher__option--active";

    button.classList.toggle(activeClass, isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

/**
 * @param {string} newLocale
 */
export async function setLocale(newLocale) {
  if (!SUPPORTED_LOCALES.includes(newLocale)) {
    return;
  }

  await ensureLocaleLoaded(newLocale);

  const localeChanged = newLocale !== locale;
  locale = newLocale;
  localStorage.setItem(STORAGE_KEY, newLocale);
  document.documentElement.lang = newLocale;
  applyTranslations();
  updateLocaleSwitcherUi();

  if (localeChanged) {
    document.dispatchEvent(
      new CustomEvent("localechange", { detail: { locale: newLocale } }),
    );
  }
}

export async function initI18n() {
  locale = detectInitialLocale();

  await ensureLocaleLoaded(locale);

  if (locale !== DEFAULT_LOCALE) {
    void ensureLocaleLoaded(DEFAULT_LOCALE);
  }

  scheduleIdleLocalePreload();

  document.documentElement.lang = locale;
  applyTranslations();
  initLocaleSwitcher();
  updateLocaleSwitcherUi();
}
