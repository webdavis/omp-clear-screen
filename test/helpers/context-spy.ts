import type { OmpContext } from "../../src/omp-screen.ts";

export class ContextSpy implements OmpContext {
  readonly notifications: { message: string; level?: string }[] = [];
  private idle = true;

  readonly ui = {
    notify: (message: string, level?: string): void => {
      this.notifications.push({ message, level });
    },
  };

  ompIsWorking(): void {
    this.idle = false;
  }

  isIdle(): boolean {
    return this.idle;
  }
}
