import { matchesKey } from "@oh-my-pi/pi-tui";
import type { Keyboard } from "./keyboard.ts";

export class OmpKeyboard implements Keyboard {
  isCtrlL(data: string): boolean {
    return matchesKey(data, "ctrl+l");
  }
}
