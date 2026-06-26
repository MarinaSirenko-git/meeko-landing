const DEFERRED_FONTS_HREF = "/css/fonts-deferred.css";

function injectDeferredFontsStylesheet() {
  if (document.querySelector(`link[href="${DEFERRED_FONTS_HREF}"]`)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = DEFERRED_FONTS_HREF;
  document.head.appendChild(link);
}

export function loadDeferredFonts() {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(injectDeferredFontsStylesheet, { timeout: 3000 });
    return;
  }

  window.setTimeout(injectDeferredFontsStylesheet, 1);
}
