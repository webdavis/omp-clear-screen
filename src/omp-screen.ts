import type { ExtensionContext } from "@oh-my-pi/pi-coding-agent";
import type { Screen } from "./screen.ts";

export type OmpContext = Pick<ExtensionContext, "isIdle"> & {
  ui: Pick<ExtensionContext["ui"], "notify" | "setWidget">;
};

const BLANK_ROWS_WIDGET = "omp-clearscreen";

function blankRows(count: number): string[] {
  return new Array<string>(count).fill("");
}

export class OmpScreen implements Screen {
  constructor(private readonly context: OmpContext) {}

  isBusy(): boolean {
    return !this.context.isIdle();
  }

  warn(message: string): void {
    this.context.ui.notify(message, "warning");
  }

  clear(): void {
    this.context.ui.setWidget(BLANK_ROWS_WIDGET, (host) => ({
      render: () => {
        this.removeBlankRowsOnceDrawn();
        return blankRows(host.size().rows);
      },
    }));
  }

  private removeBlankRowsOnceDrawn(): void {
    setTimeout(() => this.context.ui.setWidget(BLANK_ROWS_WIDGET, undefined));
  }
}
