export type KeyAnswer = { consume: true } | undefined;

export interface KeyListener {
  handleKey(data: string): KeyAnswer;
}
