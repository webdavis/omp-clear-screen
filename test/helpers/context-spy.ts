import type { OmpContext } from "../../src/omp-screen.ts";

type Widget = (host: { size(): { columns: number; rows: number } }) => { render(width: number): readonly string[] };
type KeyHandler = (key: { id: string }) => boolean;

const COLUMNS = 80;

export class ContextSpy implements OmpContext {
  readonly cwd = "/a/project";
  readonly terminalRows = 24;
  readonly messages: string[] = [];
  readonly notifications: { message: string; level?: string }[] = [];
  readonly keyHandlers: KeyHandler[] = [];
  readonly keysPassedOn: string[] = [];
  private idle = true;
  private readonly widgets = new Map<string, Widget>();

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
    composer: {
      addKeyHandler: (handler: KeyHandler): (() => void) => {
        this.keyHandlers.push(handler);
        return () => {
          this.keyHandlers.splice(this.keyHandlers.indexOf(handler), 1);
        };
      },
    },
  };

  ompIsWorking(): void {
    this.idle = false;
  }

  ompDropsKeyHandlers(): void {
    this.keyHandlers.length = 0;
  }

  keyArrives(id: string): void {
    const handled = this.keyHandlers.some((handler) => handler({ id }));
    if (!handled) this.keysPassedOn.push(id);
  }

  drawScreen(): string[] {
    const host = { size: () => ({ columns: COLUMNS, rows: this.terminalRows }) };
    return [...this.widgets.values()].flatMap((widget) => [...widget(host).render(COLUMNS)]);
  }

  isIdle(): boolean {
    return this.idle;
  }
}
