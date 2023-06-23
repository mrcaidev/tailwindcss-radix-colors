/**
 * Build the dark mode CSS selector from the user's configuration.
 *
 * @param config A function to look up values in the user's Tailwind configuration.
 * @see https://tailwindcss.com/docs/dark-mode
 */
function buildDarkSelector(config) {
  const darkMode = config("darkMode");
  const prefix = config("prefix");

  if (Array.isArray(darkMode)) {
    if (darkMode.length < 2) {
      throw new Error(
        "To customize the dark mode selector, `darkMode` should contain two items. Documentation: https://tailwindcss.com/docs/dark-mode#customizing-the-class-name"
      );
    }

    if (darkMode[0] !== "class") {
      throw new Error(
        'To customize the dark mode selector, `darkMode` should have "class" as its first item. Documentation: https://tailwindcss.com/docs/dark-mode#customizing-the-class-name'
      );
    }

    return darkMode[1] + " &";
  }

  if (darkMode === "media") {
    return "@media (prefers-color-scheme: dark)";
  }

  if (darkMode !== "class") {
    throw new Error(
      "Invalid `darkMode`. Documentation: https://tailwindcss.com/docs/dark-mode"
    );
  }

  if (prefix) {
    return `[class~="${prefix}dark"] &`;
  }

  return '[class~="dark"] &';
}

module.exports = { buildDarkSelector };
