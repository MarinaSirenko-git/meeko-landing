import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const localesDir = join(dirname(fileURLToPath(import.meta.url)), "locales");
const locales = ["en", "ru", "th", "zh-Hans"];

function flattenKeys(object, prefix = "") {
  /** @type {string[]} */
  const keys = [];

  for (const [key, value] of Object.entries(object)) {
    const nextKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value, nextKey));
      continue;
    }

    keys.push(nextKey);
  }

  return keys;
}

/** @type {Record<string, Set<string>>} */
const keysByLocale = {};

for (const locale of locales) {
  const filePath = join(localesDir, `${locale}.json`);
  const json = JSON.parse(readFileSync(filePath, "utf8"));
  keysByLocale[locale] = new Set(flattenKeys(json));
}

let hasDiff = false;

for (const locale of locales) {
  for (const otherLocale of locales) {
    if (locale === otherLocale) continue;

    const missingInLocale = [...keysByLocale[otherLocale]].filter(
      (key) => !keysByLocale[locale].has(key),
    );
    const extraInLocale = [...keysByLocale[locale]].filter(
      (key) => !keysByLocale[otherLocale].has(key),
    );

    if (missingInLocale.length > 0 || extraInLocale.length > 0) {
      hasDiff = true;
      console.log(`\n${locale} vs ${otherLocale}:`);

      if (missingInLocale.length > 0) {
        console.log(`  Missing in ${locale}:`, missingInLocale);
      }

      if (extraInLocale.length > 0) {
        console.log(`  Extra in ${locale}:`, extraInLocale);
      }
    }
  }
}

if (!hasDiff) {
  console.log("Key parity OK across en, ru, th, zh-Hans");
}

process.exit(hasDiff ? 1 : 0);
