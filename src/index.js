const radixColors = require("@radix-ui/colors");
const plugin = require("tailwindcss/plugin");

const fixedColors = {
  transparent: "transparent",
  current: "currentColor",
};

const naturalColorPairs = {
  tomato: "mauvedark",
  red: "mauvedark",
  crimson: "mauvedark",
  pink: "mauvedark",
  plum: "mauvedark",
  purple: "mauvedark",
  violet: "mauvedark",
  sky: "slate",
  indigo: "slatedark",
  blue: "slatedark",
  cyan: "slatedark",
  mint: "sage",
  teal: "sagedark",
  green: "sagedark",
  lime: "olive",
  grass: "olivedark",
  yellow: "sand",
  amber: "sand",
  orange: "sanddark",
  brown: "sanddark",
};

const transformRadixColors = () => {
  const colors = {};

  for (const [radixColorName, radixColor] of Object.entries(radixColors)) {
    if (radixColorName.endsWith("A")) {
      continue;
    }

    const color = {};
    for (const [radixScale, value] of Object.entries(radixColor)) {
      const regexResult = radixScale.match(/\d+$/);
      if (!regexResult) {
        continue;
      }

      const scale = regexResult[0];
      color[scale] = value;
    }

    const colorName = radixColorName.toLowerCase();
    colors[colorName] = color;
  }

  return colors;
};

module.exports = plugin(
  ({ addComponents, config, theme }) => {
    const darkSelector =
      config("darkMode") === "media"
        ? "@media (prefers-color-scheme: dark)"
        : ".dark &";

    for (const [colorName, color] of Object.entries(theme("colors"))) {
      if (!(colorName in naturalColorPairs)) {
        continue;
      }

      const darkColor = theme(`colors.${colorName}dark`);
      const solidTextColorValue = theme(
        `colors.${naturalColorPairs[colorName]}.12`
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
        ...fixedColors,
        ...transformRadixColors(),
      },
    },
  }
);
