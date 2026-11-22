export class TranscriptSpy {
  readonly messages: string[] = [];

  resetStableEmission(): void {}

  clear(): void {
    this.messages.push("clear");
  }
}
