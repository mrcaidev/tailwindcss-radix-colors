const radixColors = require("@radix-ui/colors");
const plugin = require("tailwindcss/plugin");

module.exports = plugin(
  ({ addComponents, config, theme }) => {
    const darkSelector = getDarkSelector(config);

    for (const [colorName, color] of Object.entries(theme("colors"))) {
      const shouldAddComponent = getShouldAddComponent(colorName);
      if (!shouldAddComponent) {
        continue;
      }

      const { solidColorName, darkColorName } = getColorNameFamily(
        theme,
        colorName
      );
      const darkColor = theme(`colors.${darkColorName}`);
      const solidTextColorValue = theme(
        `colors.${getNaturalColorPair(solidColorName)}.12`
      );

      addComponents({
        [`.bg-${colorName}-app`]: {
          backgroundColor: color["1"],
          [darkSelector]: {
            backgroundColor: darkColor["1"],
          },
        },
        [`.bg-${colorName}-subtle`]: {
          backgroundColor: color["2"],
          [darkSelector]: {
            backgroundColor: darkColor["2"],
          },
        },
        [`.bg-${colorName}-ui`]: {
          backgroundColor: color["3"],
          "&:hover": {
            backgroundColor: color["4"],
          },
          "&:active": {
            backgroundColor: color["5"],
          },
          [darkSelector]: {
            backgroundColor: darkColor["3"],
            "&:hover": {
              backgroundColor: darkColor["4"],
            },
            "&:active": {
              backgroundColor: darkColor["5"],
            },
          },
        },
        [`.bg-${colorName}-ghost`]: {
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: color["4"],
          },
          "&:active": {
            backgroundColor: color["5"],
          },
          [darkSelector]: {
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: darkColor["4"],
            },
            "&:active": {
              backgroundColor: darkColor["5"],
            },
          },
        },
        [`.bg-${colorName}-action`]: {
          backgroundColor: color["4"],
          "&:hover": {
            backgroundColor: color["5"],
          },
          "&:active": {
            backgroundColor: color["6"],
          },
          [darkSelector]: {
            backgroundColor: darkColor["4"],
            "&:hover": {
              backgroundColor: darkColor["5"],
            },
            "&:active": {
              backgroundColor: darkColor["6"],
            },
          },
        },
        [`.bg-${colorName}-solid`]: {
          backgroundColor: color["9"],
          color: solidTextColorValue,
          "&:hover": {
            backgroundColor: color["10"],
          },
          [darkSelector]: {
            backgroundColor: darkColor["9"],
            "&:hover": {
              backgroundColor: darkColor["10"],
            },
          },
        },
        [`.border-${colorName}-dim`]: {
          borderColor: color["6"],
          [darkSelector]: {
            borderColor: darkColor["6"],
          },
        },
        [`.border-${colorName}-normal`]: {
          borderColor: color["7"],
          "&:hover": {
            borderColor: color["8"],
          },
          [darkSelector]: {
            borderColor: darkColor["7"],
            "&:hover": {
              borderColor: darkColor["8"],
            },
          },
        },
        [`.divide-${colorName}-dim`]: {
          "& > :not([hidden]) ~ :not([hidden])": {
            borderColor: color["6"],
            [darkSelector]: {
              borderColor: darkColor["6"],
            },
          },
        },
        [`.divide-${colorName}-normal`]: {
          "& > :not([hidden]) ~ :not([hidden])": {
            borderColor: color["7"],
            "&:hover": {
              borderColor: color["8"],
            },
            [darkSelector]: {
              borderColor: darkColor["7"],
              "&:hover": {
                borderColor: darkColor["8"],
              },
            },
          },
        },
        [`.text-${colorName}-dim`]: {
          color: color["11"],
          [darkSelector]: {
            color: darkColor["11"],
          },
        },
        [`.text-${colorName}-normal`]: {
          color: color["12"],
          [darkSelector]: {
            color: darkColor["12"],
          },
        },
      });
    }
  },
  {
    theme: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        ...transformRadixColors(),
      },
    },
  }
);

function transformRadixColors() {
  const colors = {};

  for (const [radixColorName, radixColor] of Object.entries(radixColors)) {
    const colorName = radixColorName.toLowerCase();

    const color = {};
    for (const [radixScale, value] of Object.entries(radixColor)) {
      const regexResult = radixScale.match(/\d+$/);
      if (!regexResult || !regexResult[0]) {
        continue;
      }
      const scale = regexResult[0];
      color[scale] = value;
    }

    colors[colorName] = color;
  }

  return colors;
}

function getDarkSelector(config) {
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

function getShouldAddComponent(colorName) {
  const shouldNotAddComponent =
    colorName === "transparent" ||
    colorName === "current" ||
    colorName.endsWith("dark") ||
    colorName.endsWith("darka");
  return !shouldNotAddComponent;
}

function getColorNameFamily(theme, colorName) {
  if (colorName === "blacka") {
    return { solidColorName: "black", darkColorName: "whitea" };
  }

  if (colorName === "whitea") {
    return { solidColorName: "white", darkColorName: "blacka" };
  }

  if (colorName.endsWith("a")) {
    const solidColorName = colorName.slice(0, -1);
    if (theme("colors." + solidColorName)) {
      return { solidColorName, darkColorName: solidColorName + "darka" };
    }
  }

  return { solidColorName: colorName, darkColorName: colorName + "dark" };
}

function getNaturalColorPair(colorName) {
  switch (colorName) {
    case "tomato":
    case "red":
    case "crimson":
    case "pink":
    case "plum":
    case "purple":
    case "violet":
    case "mauve":
      return "mauvedark";
    case "sky":
      return "slate";
    case "indigo":
    case "blue":
    case "cyan":
    case "slate":
      return "slatedark";
    case "mint":
      return "sage";
    case "teal":
    case "green":
    case "sage":
      return "sagedark";
    case "lime":
      return "olive";
    case "grass":
    case "olive":
      return "olivedark";
    case "yellow":
    case "amber":
      return "sand";
    case "orange":
    case "brown":
    case "sand":
      return "sanddark";
    case "white":
      return "gray";
    case "gray":
    case "gold":
    case "bronze":
    case "black":
      return "graydark";
    default:
      return "graydark";
  }
}
