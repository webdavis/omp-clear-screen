import type { ExtensionAPI, ExtensionContext } from "@oh-my-pi/pi-coding-agent";
import { ClearKeyListener } from "./clear-key-listener.ts";
import { IdleScreenClearer } from "./idle-screen-clearer.ts";
import { OmpKeyboard } from "./omp-keyboard.ts";
import { OmpPluginSettingsStore } from "./omp-plugin-settings-store.ts";
import { OmpScreen } from "./omp-screen.ts";
import { OmpSettings } from "./omp-settings.ts";
import type { ScreenClearer } from "./screen-clearer.ts";
import type { Settings } from "./settings.ts";

function clearerFor(ctx: ExtensionContext): ScreenClearer {
  return new IdleScreenClearer(new OmpScreen(ctx));
}

export function clearScreenExtensionWith(settings: Settings) {
  return (pi: Pick<ExtensionAPI, "on" | "registerCommand">) => {
    pi.registerCommand("clear-screen", {
      description: "Clear the screen and scrollback, keeping the session and its context",
      handler: (_args, ctx) => clearerFor(ctx).clear(),
    });

    let stopListening = () => {};
    const listenForTheKey = async (_event: unknown, ctx: ExtensionContext) => {
      const keyboard = new OmpKeyboard(await settings.clearKey(ctx.cwd));
      const listener = new ClearKeyListener(keyboard, clearerFor(ctx));
      stopListening();
      stopListening = ctx.ui.onTerminalInput((data) => listener.handleKey(data));
    };

    // omp drops an extension's key listeners when the session changes, and does not start the session again.
    pi.on("session_start", listenForTheKey);
    pi.on("session_switch", listenForTheKey);
    pi.on("session_branch", listenForTheKey);
  };
}

export default clearScreenExtensionWith(new OmpSettings(new OmpPluginSettingsStore()));
