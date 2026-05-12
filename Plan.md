# Plan

High-level plan for the landing page. Edit as the project evolves.

## Goals

### изображения

получим все изображения темплейта через скрипт, анимируемые иконки оставим как разметку, не анимируемые сохраним в ассеты

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











## Notes

_Add decisions, open questions, and milestones here._
