const plugin = require("tailwindcss/plugin");
const { buildDarkSelector } = require("./dark");
const {
  formatRadixColors,
  getColorFamily,
  getShouldAddComponent,
} = require("./color");

module.exports = plugin(
  ({ addComponents, config, theme }) => {
    const darkSelector = buildDarkSelector(config);

    for (const [colorName, color] of Object.entries(theme("colors"))) {
      const shouldAddComponent = getShouldAddComponent(colorName);
      if (!shouldAddComponent) {
        continue;
      }

      const { darkColor, grayScale } = getColorFamily(theme, colorName);

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
          color: grayScale["12"],
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
        ...formatRadixColors(),
      },
    },
  }
);
