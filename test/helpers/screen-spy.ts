import type { Screen } from "../../src/screen.ts";

export class ScreenSpy implements Screen {
  readonly messages: string[] = [];

  clear(): void {
    this.messages.push("clear");
  }
}
