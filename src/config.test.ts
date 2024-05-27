/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, expect, test } from "vitest";
import { buildConfig } from "./config";

const radixColorNames = [
  "gray",
  "mauve",
  "slate",
  "sage",
  "olive",
  "sand",
  "gold",
  "bronze",
  "brown",
  "yellow",
  "amber",
  "orange",
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "lime",
  "mint",
  "sky",
];

const colorShape = {
  "1": expect.any(String),
  "2": expect.any(String),
  "3": expect.any(String),
  "4": expect.any(String),
  "5": expect.any(String),
  "6": expect.any(String),
  "7": expect.any(String),
  "8": expect.any(String),
  "9": expect.any(String),
  "10": expect.any(String),
  "11": expect.any(String),
  "12": expect.any(String),
};

describe("Given no options", () => {
  const config = buildConfig();
  const colors = config.theme.colors;

  test("All base colors and their dark variants are correctly transformed", () => {
    for (const colorName of radixColorNames) {
      expect(colors).toHaveProperty(colorName, colorShape);
      expect(colors).toHaveProperty(colorName + "dark", colorShape);
    }
  });

  test("All alpha colors and their dark variants are correctly transformed", () => {
    for (const colorName of radixColorNames) {
      expect(colors).toHaveProperty(colorName + "a", colorShape);
      expect(colors).toHaveProperty(colorName + "darka", colorShape);
    }
  });

  test("All P3 colors and their dark variants are correctly transformed", () => {
    for (const colorName of radixColorNames) {
      expect(colors).toHaveProperty(colorName + "p3", colorShape);
      expect(colors).toHaveProperty(colorName + "darkp3", colorShape);
    }
  });

  test("All P3 alpha colors and their dark variants are correctly transformed", () => {
    for (const colorName of radixColorNames) {
      expect(colors).toHaveProperty(colorName + "p3a", colorShape);
      expect(colors).toHaveProperty(colorName + "darkp3a", colorShape);
    }
  });

  test("`blacka` and `whitea` and their P3 variants are correctly transformed", () => {
    expect(colors).toHaveProperty("blacka", colorShape);
    expect(colors).toHaveProperty("whitea", colorShape);
    expect(colors).toHaveProperty("blackp3a", colorShape);
    expect(colors).toHaveProperty("whitep3a", colorShape);
  });

  test("`transparent` and `currentColor` are included", () => {
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
  });

  test("`black` and `white` are included", () => {
    expect(colors).toHaveProperty("black", "black");
    expect(colors).toHaveProperty("white", "white");
  });
});

describe("Given option `include`", () => {
  const config = buildConfig({
    include: ["red", "greena", "bluep3", "yellowp3a"],
  });
  const colors = config.theme.colors;

  test("The specified colors and their dark variants are included", () => {
    expect(colors).toHaveProperty("red", colorShape);
    expect(colors).toHaveProperty("reddark", colorShape);

    expect(colors).toHaveProperty("greena", colorShape);
    expect(colors).toHaveProperty("greendarka", colorShape);

    expect(colors).toHaveProperty("bluep3", colorShape);
    expect(colors).toHaveProperty("bluedarkp3", colorShape);

    expect(colors).toHaveProperty("yellowp3a", colorShape);
    expect(colors).toHaveProperty("yellowdarkp3a", colorShape);
  });

  test("Other colors are not included", () => {
    // 4 stands for `transparent`, `current`, `black`, and `white`.
    // 8 stands for 4 specified colors and their 4 dark variants.
    expect(Object.keys(colors)).toHaveLength(4 + 8);
  });

  test("`transparent` and `currentColor` are included", () => {
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
  });

  test("`black` and `white` are included", () => {
    expect(colors).toHaveProperty("black", "black");
    expect(colors).toHaveProperty("white", "white");
  });
});

describe("Given option `exclude`", () => {
  const config = buildConfig({
    exclude: ["red", "greena", "bluep3", "yellowp3a"],
  });
  const colors = config.theme.colors;

  test("The specified colors and their dark variants are excluded", () => {
    expect(colors).not.toHaveProperty("red");
    expect(colors).not.toHaveProperty("reddark");

    expect(colors).not.toHaveProperty("greena");
    expect(colors).not.toHaveProperty("greendarka");

    expect(colors).not.toHaveProperty("bluep3");
    expect(colors).not.toHaveProperty("bluedarkp3");

    expect(colors).not.toHaveProperty("yellowp3a");
    expect(colors).not.toHaveProperty("yellowdarkp3a");
  });

  test("Other colors are included", () => {
    expect(colors).toHaveProperty("reda", colorShape);
    expect(colors).toHaveProperty("reddarka", colorShape);

    expect(colors).toHaveProperty("greenp3", colorShape);
    expect(colors).toHaveProperty("greendarkp3", colorShape);

    expect(colors).toHaveProperty("bluep3a", colorShape);
    expect(colors).toHaveProperty("bluedarkp3a", colorShape);

    expect(colors).toHaveProperty("yellow", colorShape);
    expect(colors).toHaveProperty("yellowdark", colorShape);
  });

  test("`transparent` and `currentColor` are included", () => {
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
  });

  test("`black` and `white` are included", () => {
    expect(colors).toHaveProperty("black", "black");
    expect(colors).toHaveProperty("white", "white");
  });
});

describe("Given option `include` and `exclude`", () => {
  const config = buildConfig({
    include: ["red", "greena", "bluep3", "yellowp3a"],
    exclude: ["red", "greena", "bluep3"],
  });
  const colors = config.theme.colors;

  test("The specified colors and their dark variants are included", () => {
    expect(colors).toHaveProperty("yellowp3a", colorShape);
    expect(colors).toHaveProperty("yellowdarkp3a", colorShape);
  });

  test("Other colors are excluded", () => {
    // 4 stands for `transparent`, `current`, `black`, and `white`.
    // 2 stands for 1 specified color and its 1 dark variant.
    expect(Object.keys(colors)).toHaveLength(4 + 2);
  });

  test("`transparent` and `currentColor` are included", () => {
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
  });

  test("`black` and `white` are included", () => {
    expect(colors).toHaveProperty("black", "black");
    expect(colors).toHaveProperty("white", "white");
  });
});
