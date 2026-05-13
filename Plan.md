# Plan

High-level plan for the landing page. Edit as the project evolves.

## Goals

### изображения и шрифты

- получим все изображения темплейта через скрипт, анимируемые иконки оставим как разметку, не анимируемые сохраним в ассеты

const urls = new Set();

document.querySelectorAll('img').forEach((img) => {
  if (img.src) urls.add(img.src);
  if (img.srcset) {
    img.srcset.split(',').forEach((item) => {
      const url = item.trim().split(' ')[0];
      if (url) urls.add(url);
    });
  }
});

document.querySelectorAll('*').forEach((el) => {
  const bg = getComputedStyle(el).backgroundImage;
  const matches = bg.match(/url\(["']?(.*?)["']?\)/g);

  if (matches) {
    matches.forEach((match) => {
      const url = match.replace(/url\(["']?|["']?\)/g, '');
      urls.add(url);
    });
  }
});

console.log([...urls].join('\n'));

- извлечем все woff файлы из кода и положим в ассеты

### CSS
- цвета получаем через скрипт

const colorVars = new Map();

[...document.styleSheets].forEach((sheet) => {
  let rules;

  try {
    rules = sheet.cssRules;
  } catch {
    return;
  }

  [...rules].forEach((rule) => {
    if (!rule.style) return;

    [...rule.style].forEach((prop) => {
      if (!prop.startsWith("--")) return;

      const value = rule.style.getPropertyValue(prop).trim();

      if (
        value.includes("rgb") ||
        value.includes("#") ||
        value.includes("hsl")
      ) {
        colorVars.set(prop, value);
      }
    });
  });
});

console.table(
  [...colorVars.entries()].map(([name, value]) => ({
    name,
    value,
  }))
);


### экраны

- header

разметка: header > a, nav > ul li a * 4, ul > li > a > img * 3
бем-классы: header header__logo header__nav header__nav-list header__nav-item header__nav-link header__social-list header__social-item header__social-link
планшет: header > a, button
мобильный вид: header > a, button
анимация: плавный скролл к секциям
js: -
ассеты: from public/assets/icons/nav
мобильное меню:
<div class="mobile-menu" id="mobile-menu" hidden>
  <nav class="mobile-menu__nav" aria-label="Mobile navigation">
    <ul class="mobile-menu__list">
      <li class="mobile-menu__item">
        <a class="mobile-menu__link" href="#services">Services</a>
      </li>

      <li class="mobile-menu__item">
        <a class="mobile-menu__link" href="#work">Work</a>
      </li>

      <li class="mobile-menu__item">
        <a class="mobile-menu__link" href="#about">About</a>
      </li>

      <li class="mobile-menu__item">
        <a class="mobile-menu__link" href="#contact">Contact</a>
      </li>
    </ul>
  </nav>
</div>

- hero

разметка:
бем-классы:
планшет:
мобильный вид:
анимация:
js:
ассеты:

- works

разметка:
бем-классы:
планшет:
мобильный вид:
анимация:
js:
ассеты:

- testimonials

разметка:
бем-классы:
планшет:
мобильный вид:
анимация:
js:
ассеты:

- process

разметка:
бем-классы:
планшет:
мобильный вид:
анимация:
js:
ассеты:

- numbers

разметка:
бем-классы:
планшет:
мобильный вид:
анимация:
js:
ассеты:

- about 

разметка:
бем-классы:
планшет:
мобильный вид:
анимация:
js:
ассеты:

- capabilities

разметка:
бем-классы:
планшет:
мобильный вид:
анимация:
js:
ассеты:

- blog

разметка:
бем-классы:
планшет:
мобильный вид:
анимация:
js:
ассеты:

- footer

разметка:
бем-классы:
планшет:
мобильный вид:
анимация:
js:
ассеты:







## Notes

_Add decisions, open questions, and milestones here._
