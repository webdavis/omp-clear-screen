import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import { CtrlLScreenClearer } from "./ctrl-l-screen-clearer.ts";
import { OmpKeyboard } from "./omp-keyboard.ts";
import { OmpScreen } from "./omp-screen.ts";

export default function clearScreenExtension(pi: Pick<ExtensionAPI, "on">) {
  pi.on("session_start", (_event, ctx) => {
    const clearer = new CtrlLScreenClearer(new OmpKeyboard(), new OmpScreen(ctx));
    ctx.ui.onTerminalInput((data) => clearer.handleKey(data));
  });
}
