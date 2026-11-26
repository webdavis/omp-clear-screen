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

export function clearscreenExtensionWith(settings: Settings) {
  return (pi: Pick<ExtensionAPI, "on" | "registerCommand">) => {
    pi.registerCommand("clearscreen", {
      description: "Clear the screen and scrollback, keeping the session and its context",
      handler: (_args, ctx) => clearerFor(ctx).clear(),
    });

    const nothingToStop = () => {};
    let stopListening = nothingToStop;
    const listenForTheClearKeyInTheCurrentSession = async (_event: unknown, ctx: ExtensionContext) => {
      const keyboard = new OmpKeyboard(await settings.clearKey(ctx.cwd));
      const listener = new ClearKeyListener(keyboard, clearerFor(ctx));
      stopListening();
      stopListening = ctx.ui.composer?.addKeyHandler((key) => listener.handleKey(key.id)) ?? nothingToStop;
    };

    pi.on("session_start", listenForTheClearKeyInTheCurrentSession);
    pi.on("session_switch", listenForTheClearKeyInTheCurrentSession);
    pi.on("session_branch", listenForTheClearKeyInTheCurrentSession);
  };
}

export default clearscreenExtensionWith(new OmpSettings(new OmpPluginSettingsStore()));
