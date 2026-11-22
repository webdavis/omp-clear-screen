import type { OmpContext } from "../../src/omp-screen.ts";

type ShowsACustomComponent = (tui: never, theme: never, keybindings: never, done: (result: never) => void) => unknown;

export class ContextSpy implements OmpContext {
  readonly cwd = "/a/project";
  readonly notifications: { message: string; level?: string }[] = [];
  readonly renderRequests: unknown[][] = [];
  private idle = true;
  private screen: object = { children: [] };
  private readonly keyListeners = new Set<(data: string) => unknown>();

  readonly ui = {
    notify: (message: string, level?: string): void => {
      this.notifications.push({ message, level });
    },
    onTerminalInput: (listener: (data: string) => unknown): (() => void) => {
      this.keyListeners.add(listener);
      return () => this.keyListeners.delete(listener);
    },
    custom: <T>(show: ShowsACustomComponent): Promise<T> =>
      new Promise((resolve) => {
        show(this.screen as never, {} as never, {} as never, resolve as never);
      }),
  };

  ompIsWorking(): void {
    this.idle = false;
  }

  ompDropsKeyListeners(): void {
    this.keyListeners.clear();
  }

  keyArrives(data: string): void {
    for (const listener of this.keyListeners) listener(data);
  }

  showScreen(...children: object[]): void {
    this.screen = {
      children,
      requestRender: (...request: unknown[]) => {
        this.renderRequests.push(request);
      },
    };
  }

  isIdle(): boolean {
    return this.idle;
  }
}
