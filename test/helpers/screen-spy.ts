import type { Screen } from "../../src/screen.ts";

export class ScreenSpy implements Screen {
  readonly messages: string[] = [];
  private busy = false;
  private transcriptFound = true;

  responseIsRunning(): void {
    this.busy = true;
  }

  transcriptIsMissing(): void {
    this.transcriptFound = false;
  }

  isBusy(): boolean {
    return this.busy;
  }

  async clear(): Promise<boolean> {
    this.messages.push("clear");
    return this.transcriptFound;
  }

  warn(_message: string): void {
    this.messages.push("warn");
  }

  reportError(_message: string): void {
    this.messages.push("reportError");
  }
}
