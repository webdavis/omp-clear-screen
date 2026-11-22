import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import { CtrlLScreenClearer } from "./ctrl-l-screen-clearer.ts";
import { OmpKeyboard } from "./omp-keyboard.ts";
import { OmpScreen } from "./omp-screen.ts";

export default function clearScreenExtension(pi: Pick<ExtensionAPI, "on" | "registerCommand">) {
  pi.registerCommand("clear-screen", {
    description: "Clear the screen and scrollback, keeping the session and its context",
    handler: (_args, ctx) => new CtrlLScreenClearer(new OmpKeyboard(), new OmpScreen(ctx)).clear(),
  });

  pi.on("session_start", (_event, ctx) => {
    const clearer = new CtrlLScreenClearer(new OmpKeyboard(), new OmpScreen(ctx));
    ctx.ui.onTerminalInput((data) => clearer.handleKey(data));
  });
}
