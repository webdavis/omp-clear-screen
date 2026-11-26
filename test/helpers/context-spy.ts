import type { OmpContext } from "../../src/omp-screen.ts";

type Widget = (tui: { terminal: { columns: number; rows: number } }) => { render(width: number): readonly string[] };

const COLUMNS = 80;

export class ContextSpy implements OmpContext {
  readonly cwd = "/a/project";
  readonly terminalRows = 24;
  readonly messages: string[] = [];
  readonly notifications: { message: string; level?: string }[] = [];
  private idle = true;
  private readonly widgets = new Map<string, Widget>();
  private readonly keyListeners = new Set<(data: string) => unknown>();

  readonly ui = {
    notify: (message: string, level?: string): void => {
      this.messages.push("notify");
      this.notifications.push({ message, level });
    },
    setWidget: (key: string, widget: unknown): void => {
      if (widget) {
        this.messages.push("setWidget");
        this.widgets.set(key, widget as Widget);
      } else {
        this.messages.push("removeWidget");
        this.widgets.delete(key);
      }
    },
    onTerminalInput: (listener: (data: string) => unknown): (() => void) => {
      this.keyListeners.add(listener);
      return () => this.keyListeners.delete(listener);
    },
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

  drawScreen(): string[] {
    const tui = { terminal: { columns: COLUMNS, rows: this.terminalRows } };
    return [...this.widgets.values()].flatMap((widget) => [...widget(tui).render(COLUMNS)]);
  }

  isIdle(): boolean {
    return this.idle;
  }
}
