import type { ExtensionContext } from "@oh-my-pi/pi-coding-agent";

export type OmpContext = Pick<ExtensionContext, "isIdle">;

export class OmpScreen {
  constructor(private readonly context: OmpContext) {}

  isBusy(): boolean {
    return true;
  }
}
