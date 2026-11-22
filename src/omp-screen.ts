import type { ExtensionContext } from "@oh-my-pi/pi-coding-agent";

export type OmpContext = Pick<ExtensionContext, "isIdle"> & { ui: Pick<ExtensionContext["ui"], "notify"> };

export class OmpScreen {
  constructor(private readonly context: OmpContext) {}

  isBusy(): boolean {
    return !this.context.isIdle();
  }

  warn(message: string): void {
    this.context.ui.notify(message, "warning");
  }
}
