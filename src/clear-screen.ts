import type { ExtensionAPI, ExtensionContext } from "@oh-my-pi/pi-coding-agent";
import { HotkeyScreenClearer } from "./hotkey-screen-clearer.ts";
import { OmpKeyboard } from "./omp-keyboard.ts";
import { OmpScreen } from "./omp-screen.ts";
import type { ScreenClearer } from "./screen-clearer.ts";

function clearerFor(ctx: ExtensionContext): ScreenClearer {
  return new HotkeyScreenClearer(new OmpKeyboard("ctrl+l"), new OmpScreen(ctx));
}

export default function clearScreenExtension(pi: Pick<ExtensionAPI, "on" | "registerCommand">) {
  pi.registerCommand("clear-screen", {
    description: "Clear the screen and scrollback, keeping the session and its context",
    handler: (_args, ctx) => clearerFor(ctx).clear(),
  });

  pi.on("session_start", (_event, ctx) => {
    const clearer = clearerFor(ctx);
    ctx.ui.onTerminalInput((data) => clearer.handleKey(data));
  });
}
