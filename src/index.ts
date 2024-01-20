import plugin from "tailwindcss/plugin";
import { config } from "./config";
import { pluginCreator } from "./plugin";

export default plugin(pluginCreator, config);
