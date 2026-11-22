import type { ExtensionContext } from "@oh-my-pi/pi-coding-agent";
import type { Component, Container } from "@oh-my-pi/pi-tui";
import type { Screen } from "./screen.ts";

export type OmpContext = Pick<ExtensionContext, "isIdle"> & { ui: Pick<ExtensionContext["ui"], "notify" | "custom"> };

// omp exposes no handle to its transcript, so it is recognised by the method only the transcript has.
function isTranscript(component: Component): component is Container {
  return "resetStableEmission" in component;
}

function findTranscript(component: Component): Container | undefined {
  if (isTranscript(component)) return component;
  if (!("children" in component) || !Array.isArray(component.children)) return undefined;
  for (const child of component.children) {
    const found = findTranscript(child);
    if (found) return found;
  }
  return undefined;
}

export class OmpScreen implements Screen {
  constructor(private readonly context: OmpContext) {}

  isBusy(): boolean {
    return !this.context.isIdle();
  }

  warn(message: string): void {
    this.context.ui.notify(message, "warning");
  }

  reportError(message: string): void {
    this.context.ui.notify(message, "error");
  }

  clear(): Promise<boolean> {
    return this.context.ui.custom<boolean>((tui, _theme, _keybindings, done) => {
      const transcript = findTranscript(tui);
      if (transcript) {
        transcript.dispose();
        transcript.clear();
        tui.requestRender(true, { clearScrollback: true });
      }
      done(transcript !== undefined);
      return { render: () => [], invalidate: () => {} };
    });
  }
}
