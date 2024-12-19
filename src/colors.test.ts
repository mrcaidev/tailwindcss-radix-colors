import { describe, expect, test } from "bun:test";
import { buildColorName, parseColorName } from "./colors";

describe("Parse color name", () => {
  test("base", () => {
    const result = parseColorName("blue");
    expect(result).toEqual({
      base: "blue",
      dark: false,
      alpha: false,
      p3: false,
    });
  });

  test("P3", () => {
    const result = parseColorName("bluep3");
    expect(result).toEqual({
      base: "blue",
      dark: false,
      alpha: false,
      p3: true,
    });
  });

  test("alpha", () => {
    const result = parseColorName("bluea");
    expect(result).toEqual({
      base: "blue",
      dark: false,
      alpha: true,
      p3: false,
    });
  });

  test("P3 alpha", () => {
    const result = parseColorName("bluep3a");
    expect(result).toEqual({
      base: "blue",
      dark: false,
      alpha: true,
      p3: true,
    });
  });

  test("dark", () => {
    const result = parseColorName("bluedark");
    expect(result).toEqual({
      base: "blue",
      dark: true,
      alpha: false,
      p3: false,
    });
  });

  test("dark P3", () => {
    const result = parseColorName("bluedarkp3");
    expect(result).toEqual({
      base: "blue",
      dark: true,
      alpha: false,
      p3: true,
    });
  });

  test("dark alpha", () => {
    const result = parseColorName("bluedarka");
    expect(result).toEqual({
      base: "blue",
      dark: true,
      alpha: true,
      p3: false,
    });
  });

  test("dark P3 alpha", () => {
    const result = parseColorName("bluedarkp3a");
    expect(result).toEqual({
      base: "blue",
      dark: true,
      alpha: true,
      p3: true,
    });
  });
});

describe("Build color name", () => {
  test("base", () => {
    const result = buildColorName({
      base: "blue",
      dark: false,
      alpha: false,
      p3: false,
    });
    expect(result).toEqual("blue");
  });

  test("P3", () => {
    const result = buildColorName({
      base: "blue",
      dark: false,
      alpha: false,
      p3: true,
    });
    expect(result).toEqual("bluep3");
  });

  test("alpha", () => {
    const result = buildColorName({
      base: "blue",
      dark: false,
      alpha: true,
      p3: false,
    });
    expect(result).toEqual("bluea");
  });

  test("P3 alpha", () => {
    const result = buildColorName({
      base: "blue",
      dark: false,
      alpha: true,
      p3: true,
    });
    expect(result).toEqual("bluep3a");
  });

  test("dark", () => {
    const result = buildColorName({
      base: "blue",
      dark: true,
      alpha: false,
      p3: false,
    });
    expect(result).toEqual("bluedark");
  });

  test("dark P3", () => {
    const result = buildColorName({
      base: "blue",
      dark: true,
      alpha: false,
      p3: true,
    });
    expect(result).toEqual("bluedarkp3");
  });

  test("dark alpha", () => {
    const result = buildColorName({
      base: "blue",
      dark: true,
      alpha: true,
      p3: false,
    });
    expect(result).toEqual("bluedarka");
  });

  test("dark P3 alpha", () => {
    const result = buildColorName({
      base: "blue",
      dark: true,
      alpha: true,
      p3: true,
    });
    expect(result).toEqual("bluedarkp3a");
  });
});
