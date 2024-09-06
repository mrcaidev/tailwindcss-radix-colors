/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { describe, expect, test } from "vitest";
import { createConfig } from "./config";

const radixColorShape = {
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

const tailwindColorShape = {
  "50": expect.any(String),
  "100": expect.any(String),
  "200": expect.any(String),
  "300": expect.any(String),
  "400": expect.any(String),
  "500": expect.any(String),
  "600": expect.any(String),
  "700": expect.any(String),
  "800": expect.any(String),
  "900": expect.any(String),
  "950": expect.any(String),
};

describe("When `priority=no-tailwind`", () => {
  test("Given neither `include` nor `exclude`", () => {
    const config = createConfig();
    const colors = config.theme.colors;

    expect(colors).toHaveProperty("red", radixColorShape);
    expect(colors).toHaveProperty("redp3", radixColorShape);
    expect(colors).toHaveProperty("reda", radixColorShape);
    expect(colors).toHaveProperty("redp3a", radixColorShape);
    expect(colors).toHaveProperty("reddark", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3", radixColorShape);
    expect(colors).toHaveProperty("reddarka", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3a", radixColorShape);

    expect(colors).toHaveProperty("sage", radixColorShape);
    expect(colors).toHaveProperty("sagep3", radixColorShape);
    expect(colors).toHaveProperty("sagea", radixColorShape);
    expect(colors).toHaveProperty("sagep3a", radixColorShape);
    expect(colors).toHaveProperty("sagedark", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3", radixColorShape);
    expect(colors).toHaveProperty("sagedarka", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3a", radixColorShape);

    expect(colors).not.toHaveProperty("zinc");

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });

  test("Given only `include`", () => {
    const config = createConfig({
      include: ["red", "sage", "zinc"],
    });
    const colors = config.theme.colors;

    expect(colors).toHaveProperty("red", radixColorShape);
    expect(colors).toHaveProperty("reddark", radixColorShape);
    expect(colors).not.toHaveProperty("redp3");
    expect(colors).not.toHaveProperty("reda");
    expect(colors).not.toHaveProperty("redp3a");
    expect(colors).not.toHaveProperty("reddarkp3");
    expect(colors).not.toHaveProperty("reddarka");
    expect(colors).not.toHaveProperty("reddarkp3a");

    expect(colors).toHaveProperty("sage", radixColorShape);
    expect(colors).toHaveProperty("sagedark", radixColorShape);
    expect(colors).not.toHaveProperty("sagep3");
    expect(colors).not.toHaveProperty("sagea");
    expect(colors).not.toHaveProperty("sagep3a");
    expect(colors).not.toHaveProperty("sagedarkp3");
    expect(colors).not.toHaveProperty("sagedarka");
    expect(colors).not.toHaveProperty("sagedarkp3a");

    expect(colors).not.toHaveProperty("zinc");

    expect(colors).not.toHaveProperty("green");

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });

  test("Given only `exclude`", () => {
    const config = createConfig({
      exclude: ["red", "sage", "zinc"],
    });
    const colors = config.theme.colors;

    expect(colors).not.toHaveProperty("red");
    expect(colors).not.toHaveProperty("reddark");
    expect(colors).toHaveProperty("redp3", radixColorShape);
    expect(colors).toHaveProperty("reda", radixColorShape);
    expect(colors).toHaveProperty("redp3a", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3", radixColorShape);
    expect(colors).toHaveProperty("reddarka", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3a", radixColorShape);

    expect(colors).not.toHaveProperty("sage");
    expect(colors).not.toHaveProperty("sagedark");
    expect(colors).toHaveProperty("sagep3", radixColorShape);
    expect(colors).toHaveProperty("sagea", radixColorShape);
    expect(colors).toHaveProperty("sagep3a", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3", radixColorShape);
    expect(colors).toHaveProperty("sagedarka", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3a", radixColorShape);

    expect(colors).not.toHaveProperty("zinc");

    expect(colors).toHaveProperty("green", radixColorShape);
    expect(colors).toHaveProperty("greenp3", radixColorShape);
    expect(colors).toHaveProperty("greena", radixColorShape);
    expect(colors).toHaveProperty("greenp3a", radixColorShape);
    expect(colors).toHaveProperty("greendark", radixColorShape);
    expect(colors).toHaveProperty("greendarkp3", radixColorShape);
    expect(colors).toHaveProperty("greendarka", radixColorShape);
    expect(colors).toHaveProperty("greendarkp3a", radixColorShape);

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });

  test("Given both `include` and `exclude`", () => {
    const config = createConfig({
      include: ["red", "green", "sage", "zinc"],
      exclude: ["red"],
    });
    const colors = config.theme.colors;

    expect(colors).not.toHaveProperty("red");
    expect(colors).not.toHaveProperty("reddark");
    expect(colors).not.toHaveProperty("redp3");
    expect(colors).not.toHaveProperty("reda");
    expect(colors).not.toHaveProperty("redp3a");
    expect(colors).not.toHaveProperty("reddarkp3");
    expect(colors).not.toHaveProperty("reddarka");
    expect(colors).not.toHaveProperty("reddarkp3a");

    expect(colors).toHaveProperty("green", radixColorShape);
    expect(colors).toHaveProperty("greendark", radixColorShape);
    expect(colors).not.toHaveProperty("greenp3");
    expect(colors).not.toHaveProperty("greena");
    expect(colors).not.toHaveProperty("greenp3a");
    expect(colors).not.toHaveProperty("greendarkp3");
    expect(colors).not.toHaveProperty("greendarka");
    expect(colors).not.toHaveProperty("greendarkp3a");

    expect(colors).toHaveProperty("sage", radixColorShape);
    expect(colors).toHaveProperty("sagedark", radixColorShape);
    expect(colors).not.toHaveProperty("sagep3");
    expect(colors).not.toHaveProperty("sagea");
    expect(colors).not.toHaveProperty("sagep3a");
    expect(colors).not.toHaveProperty("sagedarkp3");
    expect(colors).not.toHaveProperty("sagedarka");
    expect(colors).not.toHaveProperty("sagedarkp3a");

    expect(colors).not.toHaveProperty("zinc");

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });
});

describe("When `priority=radix-first`", () => {
  test("Given neither `include` nor `exclude`", () => {
    const config = createConfig({
      priority: "radix-first",
    });
    const colors = config.theme.colors;

    expect(colors).toHaveProperty("red", radixColorShape);
    expect(colors).toHaveProperty("redp3", radixColorShape);
    expect(colors).toHaveProperty("reda", radixColorShape);
    expect(colors).toHaveProperty("redp3a", radixColorShape);
    expect(colors).toHaveProperty("reddark", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3", radixColorShape);
    expect(colors).toHaveProperty("reddarka", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3a", radixColorShape);

    expect(colors).toHaveProperty("sage", radixColorShape);
    expect(colors).toHaveProperty("sagep3", radixColorShape);
    expect(colors).toHaveProperty("sagea", radixColorShape);
    expect(colors).toHaveProperty("sagep3a", radixColorShape);
    expect(colors).toHaveProperty("sagedark", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3", radixColorShape);
    expect(colors).toHaveProperty("sagedarka", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3a", radixColorShape);

    expect(colors).toHaveProperty("zinc", tailwindColorShape);

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });

  test("Given only `include`", () => {
    const config = createConfig({
      include: ["red", "sage", "zinc"],
      priority: "radix-first",
    });
    const colors = config.theme.colors;

    expect(colors).toHaveProperty("red", radixColorShape);
    expect(colors).toHaveProperty("reddark", radixColorShape);
    expect(colors).not.toHaveProperty("redp3");
    expect(colors).not.toHaveProperty("reda");
    expect(colors).not.toHaveProperty("redp3a");
    expect(colors).not.toHaveProperty("reddarkp3");
    expect(colors).not.toHaveProperty("reddarka");
    expect(colors).not.toHaveProperty("reddarkp3a");

    expect(colors).toHaveProperty("sage", radixColorShape);
    expect(colors).toHaveProperty("sagedark", radixColorShape);
    expect(colors).not.toHaveProperty("sagep3");
    expect(colors).not.toHaveProperty("sagea");
    expect(colors).not.toHaveProperty("sagep3a");
    expect(colors).not.toHaveProperty("sagedarkp3");
    expect(colors).not.toHaveProperty("sagedarka");
    expect(colors).not.toHaveProperty("sagedarkp3a");

    expect(colors).toHaveProperty("zinc", tailwindColorShape);

    expect(colors).not.toHaveProperty("green");

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });

  test("Given only `exclude`", () => {
    const config = createConfig({
      exclude: ["red", "sage", "zinc"],
      priority: "radix-first",
    });
    const colors = config.theme.colors;

    expect(colors).not.toHaveProperty("red");
    expect(colors).not.toHaveProperty("reddark");
    expect(colors).toHaveProperty("redp3", radixColorShape);
    expect(colors).toHaveProperty("reda", radixColorShape);
    expect(colors).toHaveProperty("redp3a", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3", radixColorShape);
    expect(colors).toHaveProperty("reddarka", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3a", radixColorShape);

    expect(colors).not.toHaveProperty("sage");
    expect(colors).not.toHaveProperty("sagedark");
    expect(colors).toHaveProperty("sagep3", radixColorShape);
    expect(colors).toHaveProperty("sagea", radixColorShape);
    expect(colors).toHaveProperty("sagep3a", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3", radixColorShape);
    expect(colors).toHaveProperty("sagedarka", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3a", radixColorShape);

    expect(colors).not.toHaveProperty("zinc");

    expect(colors).toHaveProperty("green", radixColorShape);
    expect(colors).toHaveProperty("greenp3", radixColorShape);
    expect(colors).toHaveProperty("greena", radixColorShape);
    expect(colors).toHaveProperty("greenp3a", radixColorShape);
    expect(colors).toHaveProperty("greendark", radixColorShape);
    expect(colors).toHaveProperty("greendarkp3", radixColorShape);
    expect(colors).toHaveProperty("greendarka", radixColorShape);
    expect(colors).toHaveProperty("greendarkp3a", radixColorShape);

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });

  test("Given both `include` and `exclude`", () => {
    const config = createConfig({
      include: ["red", "green", "sage", "zinc"],
      exclude: ["red"],
      priority: "radix-first",
    });
    const colors = config.theme.colors;

    expect(colors).not.toHaveProperty("red");
    expect(colors).not.toHaveProperty("reddark");
    expect(colors).not.toHaveProperty("redp3");
    expect(colors).not.toHaveProperty("reda");
    expect(colors).not.toHaveProperty("redp3a");
    expect(colors).not.toHaveProperty("reddarkp3");
    expect(colors).not.toHaveProperty("reddarka");
    expect(colors).not.toHaveProperty("reddarkp3a");

    expect(colors).toHaveProperty("green", radixColorShape);
    expect(colors).toHaveProperty("greendark", radixColorShape);
    expect(colors).not.toHaveProperty("greenp3");
    expect(colors).not.toHaveProperty("greena");
    expect(colors).not.toHaveProperty("greenp3a");
    expect(colors).not.toHaveProperty("greendarkp3");
    expect(colors).not.toHaveProperty("greendarka");
    expect(colors).not.toHaveProperty("greendarkp3a");

    expect(colors).toHaveProperty("sage", radixColorShape);
    expect(colors).toHaveProperty("sagedark", radixColorShape);
    expect(colors).not.toHaveProperty("sagep3");
    expect(colors).not.toHaveProperty("sagea");
    expect(colors).not.toHaveProperty("sagep3a");
    expect(colors).not.toHaveProperty("sagedarkp3");
    expect(colors).not.toHaveProperty("sagedarka");
    expect(colors).not.toHaveProperty("sagedarkp3a");

    expect(colors).toHaveProperty("zinc", tailwindColorShape);

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });
});

describe("When `priority=tailwind-first`", () => {
  test("Given neither `include` nor `exclude`", () => {
    const config = createConfig({
      priority: "tailwind-first",
    });
    const colors = config.theme.colors;

    expect(colors).toHaveProperty("red", tailwindColorShape);
    expect(colors).toHaveProperty("redp3", radixColorShape);
    expect(colors).toHaveProperty("reda", radixColorShape);
    expect(colors).toHaveProperty("redp3a", radixColorShape);
    expect(colors).toHaveProperty("reddark", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3", radixColorShape);
    expect(colors).toHaveProperty("reddarka", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3a", radixColorShape);

    expect(colors).toHaveProperty("sage", radixColorShape);
    expect(colors).toHaveProperty("sagep3", radixColorShape);
    expect(colors).toHaveProperty("sagea", radixColorShape);
    expect(colors).toHaveProperty("sagep3a", radixColorShape);
    expect(colors).toHaveProperty("sagedark", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3", radixColorShape);
    expect(colors).toHaveProperty("sagedarka", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3a", radixColorShape);

    expect(colors).toHaveProperty("zinc", tailwindColorShape);

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });

  test("Given only `include`", () => {
    const config = createConfig({
      include: ["red", "sage", "zinc"],
      priority: "tailwind-first",
    });
    const colors = config.theme.colors;

    expect(colors).toHaveProperty("red", tailwindColorShape);
    expect(colors).toHaveProperty("reddark", radixColorShape);
    expect(colors).not.toHaveProperty("redp3");
    expect(colors).not.toHaveProperty("reda");
    expect(colors).not.toHaveProperty("redp3a");
    expect(colors).not.toHaveProperty("reddarkp3");
    expect(colors).not.toHaveProperty("reddarka");
    expect(colors).not.toHaveProperty("reddarkp3a");

    expect(colors).toHaveProperty("sage", radixColorShape);
    expect(colors).toHaveProperty("sagedark", radixColorShape);
    expect(colors).not.toHaveProperty("sagep3");
    expect(colors).not.toHaveProperty("sagea");
    expect(colors).not.toHaveProperty("sagep3a");
    expect(colors).not.toHaveProperty("sagedarkp3");
    expect(colors).not.toHaveProperty("sagedarka");
    expect(colors).not.toHaveProperty("sagedarkp3a");

    expect(colors).toHaveProperty("zinc", tailwindColorShape);

    expect(colors).not.toHaveProperty("green");

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });

  test("Given only `exclude`", () => {
    const config = createConfig({
      exclude: ["red", "sage", "zinc"],
      priority: "tailwind-first",
    });
    const colors = config.theme.colors;

    expect(colors).not.toHaveProperty("red");
    expect(colors).not.toHaveProperty("reddark");
    expect(colors).toHaveProperty("redp3", radixColorShape);
    expect(colors).toHaveProperty("reda", radixColorShape);
    expect(colors).toHaveProperty("redp3a", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3", radixColorShape);
    expect(colors).toHaveProperty("reddarka", radixColorShape);
    expect(colors).toHaveProperty("reddarkp3a", radixColorShape);

    expect(colors).not.toHaveProperty("sage");
    expect(colors).not.toHaveProperty("sagedark");
    expect(colors).toHaveProperty("sagep3", radixColorShape);
    expect(colors).toHaveProperty("sagea", radixColorShape);
    expect(colors).toHaveProperty("sagep3a", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3", radixColorShape);
    expect(colors).toHaveProperty("sagedarka", radixColorShape);
    expect(colors).toHaveProperty("sagedarkp3a", radixColorShape);

    expect(colors).not.toHaveProperty("zinc");

    expect(colors).toHaveProperty("green", tailwindColorShape);
    expect(colors).toHaveProperty("greenp3", radixColorShape);
    expect(colors).toHaveProperty("greena", radixColorShape);
    expect(colors).toHaveProperty("greenp3a", radixColorShape);
    expect(colors).toHaveProperty("greendark", radixColorShape);
    expect(colors).toHaveProperty("greendarkp3", radixColorShape);
    expect(colors).toHaveProperty("greendarka", radixColorShape);
    expect(colors).toHaveProperty("greendarkp3a", radixColorShape);

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });

  test("Given both `include` and `exclude`", () => {
    const config = createConfig({
      include: ["red", "green", "sage", "zinc"],
      exclude: ["red"],
      priority: "tailwind-first",
    });
    const colors = config.theme.colors;

    expect(colors).not.toHaveProperty("red");
    expect(colors).not.toHaveProperty("reddark");
    expect(colors).not.toHaveProperty("redp3");
    expect(colors).not.toHaveProperty("reda");
    expect(colors).not.toHaveProperty("redp3a");
    expect(colors).not.toHaveProperty("reddarkp3");
    expect(colors).not.toHaveProperty("reddarka");
    expect(colors).not.toHaveProperty("reddarkp3a");

    expect(colors).toHaveProperty("green", tailwindColorShape);
    expect(colors).toHaveProperty("greendark", radixColorShape);
    expect(colors).not.toHaveProperty("greenp3");
    expect(colors).not.toHaveProperty("greena");
    expect(colors).not.toHaveProperty("greenp3a");
    expect(colors).not.toHaveProperty("greendarkp3");
    expect(colors).not.toHaveProperty("greendarka");
    expect(colors).not.toHaveProperty("greendarkp3a");

    expect(colors).toHaveProperty("sage", radixColorShape);
    expect(colors).toHaveProperty("sagedark", radixColorShape);
    expect(colors).not.toHaveProperty("sagep3");
    expect(colors).not.toHaveProperty("sagea");
    expect(colors).not.toHaveProperty("sagep3a");
    expect(colors).not.toHaveProperty("sagedarkp3");
    expect(colors).not.toHaveProperty("sagedarka");
    expect(colors).not.toHaveProperty("sagedarkp3a");

    expect(colors).toHaveProperty("zinc", tailwindColorShape);

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });
});

describe("Given `aliases`", () => {
  test("Radix color names are aliased", () => {
    const config = createConfig({
      aliases: {
        red: "sun",
      },
    });
    const colors = config.theme.colors;

    expect(colors).not.toHaveProperty("red");
    expect(colors).toHaveProperty("sun", radixColorShape);

    expect(colors).toHaveProperty("inherit", "inherit");
    expect(colors).toHaveProperty("transparent", "transparent");
    expect(colors).toHaveProperty("current", "currentColor");
    expect(colors).toHaveProperty("black", "#000");
    expect(colors).toHaveProperty("white", "#fff");
  });

  test("`include` respect aliases", () => {
    const config = createConfig({
      aliases: {
        red: "sun",
        green: "grass",
      },
      include: ["sun", "green"],
    });
    const colors = config.theme.colors;

    expect(colors).not.toHaveProperty("red");
    expect(colors).toHaveProperty("sun", radixColorShape);

    expect(colors).not.toHaveProperty("green");
    expect(colors).not.toHaveProperty("grass");

    expect(colors).toHaveProperty("inherit");
    expect(colors).toHaveProperty("transparent");
    expect(colors).toHaveProperty("current");
    expect(colors).toHaveProperty("black");
    expect(colors).toHaveProperty("white");
  });

  test("`exclude` respect aliases", () => {
    const config = createConfig({
      aliases: {
        red: "sun",
        green: "grass",
      },
      exclude: ["sun", "green"],
    });
    const colors = config.theme.colors;

    expect(colors).not.toHaveProperty("red");
    expect(colors).not.toHaveProperty("sun");

    expect(colors).not.toHaveProperty("green");
    expect(colors).toHaveProperty("grass", radixColorShape);

    expect(colors).toHaveProperty("inherit");
    expect(colors).toHaveProperty("transparent");
    expect(colors).toHaveProperty("current");
    expect(colors).toHaveProperty("black");
    expect(colors).toHaveProperty("white");
  });
});
