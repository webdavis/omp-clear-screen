import { expect, test } from "bun:test";
import { Text } from "@oh-my-pi/pi-tui";
import { TranscriptContainer } from "@oh-my-pi/pi-tui/chrome/transcript-container";
import { OmpScreen } from "../../src/omp-screen.ts";
import { ContextSpy } from "../helpers/context-spy.ts";

test("clear empties a real omp transcript", async () => {
  const { sut, context } = makeSUT();
  const transcript = new TranscriptContainer();
  transcript.addChild(new Text("an earlier reply", 0, 0));
  context.showScreen(transcript);

  await sut.clear();

  expect(transcript.children).toEqual([]);
});

function makeSUT() {
  const context = new ContextSpy();
  const sut = new OmpScreen(context);
  return { sut, context };
}
