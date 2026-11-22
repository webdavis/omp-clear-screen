import type { OmpContext } from "../../src/omp-screen.ts";

export class ContextSpy implements OmpContext {
  private idle = true;

  ompIsWorking(): void {
    this.idle = false;
  }

  isIdle(): boolean {
    return this.idle;
  }
}
