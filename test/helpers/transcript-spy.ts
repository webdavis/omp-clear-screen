export class TranscriptSpy {
  readonly messages: string[] = [];

  resetStableEmission(): void {}

  dispose(): void {
    this.messages.push("dispose");
  }

  clear(): void {
    this.messages.push("clear");
  }
}
