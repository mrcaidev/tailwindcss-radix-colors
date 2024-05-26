/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { expect, test } from "vitest";
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

const expectation = {
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

const config = buildConfig();
const colors = config.theme.colors;

test("All base colors and their dark variants are correctly transformed", () => {
  for (const colorName of radixColorNames) {
    expect(colors).toHaveProperty(colorName, expectation);
    expect(colors).toHaveProperty(colorName + "dark", expectation);
  }
});

test("All alpha colors and their dark variants are correctly transformed", () => {
  for (const colorName of radixColorNames) {
    expect(colors).toHaveProperty(colorName + "a", expectation);
    expect(colors).toHaveProperty(colorName + "darka", expectation);
  }
});

test("All P3 colors and their dark variants are correctly transformed", () => {
  for (const colorName of radixColorNames) {
    expect(colors).toHaveProperty(colorName + "p3", expectation);
    expect(colors).toHaveProperty(colorName + "darkp3", expectation);
  }
});

test("All P3 alpha colors and their dark variants are correctly transformed", () => {
  for (const colorName of radixColorNames) {
    expect(colors).toHaveProperty(colorName + "p3a", expectation);
    expect(colors).toHaveProperty(colorName + "darkp3a", expectation);
  }
});

test("`blacka` and `whitea` and their P3 variants are correctly transformed", () => {
  expect(colors).toHaveProperty("blacka", expectation);
  expect(colors).toHaveProperty("whitea", expectation);
  expect(colors).toHaveProperty("blackp3a", expectation);
  expect(colors).toHaveProperty("whitep3a", expectation);
});

test("`transparent` and `currentColor` are included", () => {
  expect(colors).toHaveProperty("transparent", "transparent");
  expect(colors).toHaveProperty("current", "currentColor");
});

test("`black` and `white` are included", () => {
  expect(colors).toHaveProperty("black", "black");
  expect(colors).toHaveProperty("white", "white");
});
