import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import { HotkeyScreenClearer } from "./hotkey-screen-clearer.ts";
import { IdleScreenClearer } from "./idle-screen-clearer.ts";
import { OmpKeyboard } from "./omp-keyboard.ts";
import { OmpScreen } from "./omp-screen.ts";
import { OmpSettings } from "./omp-settings.ts";
import type { PluginSettingsStore } from "./plugin-settings-store.ts";
import type { Settings } from "./settings.ts";

// Importing the loader on first read lets the extension load, with its default key, after omp moves the loader.
const ompPluginSettings: PluginSettingsStore = {
  read: async (plugin, cwd) =>
    (await import("@oh-my-pi/pi-coding-agent/extensibility/plugins/loader")).getPluginSettings(plugin, cwd),
};

export function clearScreenExtensionWith(settings: Settings) {
  return (pi: Pick<ExtensionAPI, "on" | "registerCommand">) => {
    pi.registerCommand("clear-screen", {
      description: "Clear the screen and scrollback, keeping the session and its context",
      handler: (_args, ctx) => new IdleScreenClearer(new OmpScreen(ctx)).clear(),
    });

    pi.on("session_start", async (_event, ctx) => {
      const keyboard = new OmpKeyboard(await settings.clearKey(ctx.cwd));
      const clearer = new HotkeyScreenClearer(keyboard, new OmpScreen(ctx));
      ctx.ui.onTerminalInput((data) => clearer.handleKey(data));
    });
  };
}

export default clearScreenExtensionWith(new OmpSettings(ompPluginSettings));
