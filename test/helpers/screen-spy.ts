import type { Screen } from "../../src/screen.ts";

export class ScreenSpy implements Screen {
  readonly messages: string[] = [];
  private busy = false;

  responseIsRunning(): void {
    this.busy = true;
  }

  isBusy(): boolean {
    return this.busy;
  }

  clear(): void {
    this.messages.push("clear");
  }

  warn(_message: string): void {
    this.messages.push("warn");
  }
}
