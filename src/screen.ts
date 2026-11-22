export interface Screen {
  isBusy(): boolean;
  clear(): Promise<boolean>;
  warn(message: string): void;
  reportError(message: string): void;
}
