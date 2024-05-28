import { describe, expect, test } from "vitest";
import { buildColorName, parseColorName } from "./colors";

describe("parseColorName", () => {
  test("It correctly parses base color", () => {
    const result = parseColorName("blue");
    expect(result).toStrictEqual({
      base: "blue",
      dark: false,
      alpha: false,
      p3: false,
    });
  });

  test("It correctly parses alpha color", () => {
    const result = parseColorName("bluea");
    expect(result).toStrictEqual({
      base: "blue",
      dark: false,
      alpha: true,
      p3: false,
    });
  });

  test("It correctly parses P3 color", () => {
    const result = parseColorName("bluep3");
    expect(result).toStrictEqual({
      base: "blue",
      dark: false,
      alpha: false,
      p3: true,
    });
  });

  test("It correctly parses P3 alpha color", () => {
    const result = parseColorName("bluep3a");
    expect(result).toStrictEqual({
      base: "blue",
      dark: false,
      alpha: true,
      p3: true,
    });
  });

  test("It correctly parses dark color", () => {
    const result = parseColorName("bluedark");
    expect(result).toStrictEqual({
      base: "blue",
      dark: true,
      alpha: false,
      p3: false,
    });
  });

  test("It correctly parses dark alpha color", () => {
    const result = parseColorName("bluedarka");
    expect(result).toStrictEqual({
      base: "blue",
      dark: true,
      alpha: true,
      p3: false,
    });
  });

  test("It correctly parses dark P3 color", () => {
    const result = parseColorName("bluedarkp3");
    expect(result).toStrictEqual({
      base: "blue",
      dark: true,
      alpha: false,
      p3: true,
    });
  });

  test("It correctly parses dark P3 alpha color", () => {
    const result = parseColorName("bluedarkp3a");
    expect(result).toStrictEqual({
      base: "blue",
      dark: true,
      alpha: true,
      p3: true,
    });
  });
});

describe("buildColorName", () => {
  test("It correctly builds base color", () => {
    const result = buildColorName({
      base: "blue",
      dark: false,
      alpha: false,
      p3: false,
    });
    expect(result).toStrictEqual("blue");
  });

  test("It correctly builds alpha color", () => {
    const result = buildColorName({
      base: "blue",
      dark: false,
      alpha: true,
      p3: false,
    });
    expect(result).toStrictEqual("bluea");
  });

  test("It correctly builds P3 color", () => {
    const result = buildColorName({
      base: "blue",
      dark: false,
      alpha: false,
      p3: true,
    });
    expect(result).toStrictEqual("bluep3");
  });

  test("It correctly builds P3 alpha color", () => {
    const result = buildColorName({
      base: "blue",
      dark: false,
      alpha: true,
      p3: true,
    });
    expect(result).toStrictEqual("bluep3a");
  });

  test("It correctly builds dark color", () => {
    const result = buildColorName({
      base: "blue",
      dark: true,
      alpha: false,
      p3: false,
    });
    expect(result).toStrictEqual("bluedark");
  });

  test("It correctly builds dark alpha color", () => {
    const result = buildColorName({
      base: "blue",
      dark: true,
      alpha: true,
      p3: false,
    });
    expect(result).toStrictEqual("bluedarka");
  });

  test("It correctly builds dark P3 color", () => {
    const result = buildColorName({
      base: "blue",
      dark: true,
      alpha: false,
      p3: true,
    });
    expect(result).toStrictEqual("bluedarkp3");
  });

  test("It correctly builds dark P3 alpha color", () => {
    const result = buildColorName({
      base: "blue",
      dark: true,
      alpha: true,
      p3: true,
    });
    expect(result).toStrictEqual("bluedarkp3a");
  });
});
