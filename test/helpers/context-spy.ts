import type { OmpContext } from "../../src/omp-screen.ts";

type ShowsACustomComponent = (tui: never, theme: never, keybindings: never, done: (result: never) => void) => unknown;

export class ContextSpy implements OmpContext {
  readonly notifications: { message: string; level?: string }[] = [];
  private idle = true;
  private screen: object = { children: [] };

  readonly ui = {
    notify: (message: string, level?: string): void => {
      this.notifications.push({ message, level });
    },
    custom: <T>(show: ShowsACustomComponent): Promise<T> =>
      new Promise((resolve) => {
        show(this.screen as never, {} as never, {} as never, resolve as never);
      }),
  };

  ompIsWorking(): void {
    this.idle = false;
  }

  showScreen(...children: object[]): void {
    this.screen = {
      children,
      requestRender: () => {},
    };
  }

  isIdle(): boolean {
    return this.idle;
  }
}
