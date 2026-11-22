import { expect, test } from "bun:test";
import clearScreenExtension from "../../src/clear-screen.ts";
import { ContextSpy } from "../helpers/context-spy.ts";
import { OmpSpy } from "../helpers/omp-spy.ts";
import { TranscriptSpy } from "../helpers/transcript-spy.ts";

test("ctrl+l in an omp session empties the transcript", () => {
  const { omp, context, transcript } = makeSUT();
  omp.startSession(context);

  context.keyArrives("\f");

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

test("the clear-screen command empties the transcript", async () => {
  const { omp, context, transcript } = makeSUT();

  await omp.runCommand("clear-screen", context);

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

function makeSUT() {
  const omp = new OmpSpy();
  const context = new ContextSpy();
  const transcript = new TranscriptSpy();
  context.showScreen(transcript);
  clearScreenExtension(omp);
  return { omp, context, transcript };
}
