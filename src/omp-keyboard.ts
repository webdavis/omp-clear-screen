import { matchesKey } from "@oh-my-pi/pi-tui";
import type { Keyboard } from "./keyboard.ts";

type KeyName = Parameters<typeof matchesKey>[1];

export class OmpKeyboard implements Keyboard {
  constructor(private readonly key: string) {}

  isClearKey(data: string): boolean {
    return matchesKey(data, this.key as KeyName);
  }
}
