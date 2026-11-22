export type KeyAnswer = { consume: true } | undefined;

export interface ScreenClearer {
  handleKey(data: string): KeyAnswer;
  clear(): Promise<void>;
}
