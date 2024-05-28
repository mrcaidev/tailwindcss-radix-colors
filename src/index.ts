import plugin from "tailwindcss/plugin";
import { createConfig } from "./config";
import { createPlugin } from "./plugin";

export default plugin.withOptions(createPlugin, createConfig);
