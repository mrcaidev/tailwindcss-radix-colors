import plugin from "tailwindcss/plugin";
import { buildConfig } from "./config";
import { buildPlugin } from "./plugin";

export default plugin.withOptions(buildPlugin, buildConfig);
