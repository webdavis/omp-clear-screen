export interface Screen {
  isBusy(): boolean;
  clear(): void;
  warn(message: string): void;
}
