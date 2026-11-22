import { expect, test } from "bun:test";
import { clearScreenExtensionWith } from "../../src/clear-screen.ts";
import { ContextSpy } from "../helpers/context-spy.ts";
import { OmpSpy } from "../helpers/omp-spy.ts";
import { SettingsStub } from "../helpers/settings-stub.ts";
import { TranscriptSpy } from "../helpers/transcript-spy.ts";

test("ctrl+l in an omp session empties the transcript", async () => {
  const { omp, context, transcript } = makeSUT();
  await omp.startSession(context);

  context.keyArrives("\f");

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

test("the key set in omp's settings empties the transcript in an omp session", async () => {
  const { omp, context, transcript } = makeSUT("alt+k");
  await omp.startSession(context);

  context.keyArrives("\x1bk");

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

test("the clear-screen command empties the transcript", async () => {
  const { omp, context, transcript } = makeSUT();

  await omp.runCommand("clear-screen", context);

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

function makeSUT(key = "ctrl+l") {
  const omp = new OmpSpy();
  const context = new ContextSpy();
  const transcript = new TranscriptSpy();
  context.showScreen(transcript);
  clearScreenExtensionWith(new SettingsStub(key))(omp);
  return { omp, context, transcript };
}
