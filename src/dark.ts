import type {
  DarkModeConfig,
  PluginAPI,
  PrefixConfig,
} from "tailwindcss/types/config";

/**
 * Build dark mode selector according to user configuration.
 *
 * @see https://tailwindcss.com/docs/dark-mode
 */
export function buildDarkSelector(config: PluginAPI["config"]) {
  const darkMode: DarkModeConfig = config("darkMode");
  const prefix: PrefixConfig = config("prefix");

  if (Array.isArray(darkMode)) {
    if (darkMode.length !== 2) {
      throw new Error(
        "Configuration `darkMode` should contain exactly two items. Documentation: https://tailwindcss.com/docs/dark-mode#customizing-the-class-name",
      );
    }

    if (darkMode[0] === "variant") {
      throw new Error(
        "This plugin currently does not support using variant to customize dark mode selector.",
      );
    }

    if (darkMode[0] === "selector") {
      return `:where(${darkMode[1]}) &`;
    }

    if (prefix) {
      return `[class~="${prefix}${darkMode[1]}"] &`;
    }

    return `[class~="${darkMode[1]}"] &`;
  }

  if (darkMode === "media") {
    return "@media (prefers-color-scheme: dark)";
  }

  if (darkMode === "selector") {
    return `:where([class~="dark"]) &`;
  }

  if (prefix) {
    return `[class~="${prefix}dark"] &`;
  }

  return '[class~="dark"] &';
}
