import { describe, expect, test } from "vitest";
import { parseColorName } from "./utils";

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

  test("It correctly parses dark variant of base color", () => {
    const result = parseColorName("bluedark");
    expect(result).toStrictEqual({
      base: "blue",
      dark: true,
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

  test("It correctly parses dark variant of alpha color", () => {
    const result = parseColorName("bluedarka");
    expect(result).toStrictEqual({
      base: "blue",
      dark: true,
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

  test("It correctly parses dark variant of P3 color", () => {
    const result = parseColorName("bluedarkp3");
    expect(result).toStrictEqual({
      base: "blue",
      dark: true,
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

  test("It correctly parses dark variant of P3 alpha color", () => {
    const result = parseColorName("bluedarkp3a");
    expect(result).toStrictEqual({
      base: "blue",
      dark: true,
      alpha: true,
      p3: true,
    });
  });

  test("It correctly parses `transparent` and `current`", () => {
    const result1 = parseColorName("transparent");
    const result2 = parseColorName("current");
    expect(result1).toStrictEqual({
      base: "transparent",
      dark: false,
      alpha: false,
      p3: false,
    });
    expect(result2).toStrictEqual({
      base: "current",
      dark: false,
      alpha: false,
      p3: false,
    });
  });
});
