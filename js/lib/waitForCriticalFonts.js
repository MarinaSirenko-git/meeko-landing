const CRITICAL_FONT_SPECS = [
  '1em "Uncut Sans"',
  '600 32px "Inter"',
  '600 1em "Uncut Sans"',
];

export async function waitForCriticalFonts() {
  await Promise.all(
    CRITICAL_FONT_SPECS.map((spec) =>
      document.fonts.load(spec).catch(() => undefined),
    ),
  );
}
