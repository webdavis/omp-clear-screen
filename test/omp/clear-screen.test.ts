import { expect, test } from "bun:test";
import { clearScreenExtensionWith } from "../../src/clear-screen.ts";
import { ContextSpy } from "../helpers/context-spy.ts";
import { OmpSpy } from "../helpers/omp-spy.ts";
import { SettingsSpy } from "../helpers/settings-spy.ts";
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

test("ctrl+l empties the transcript after omp switches session", async () => {
  const { omp, context, transcript } = makeSUT();
  await omp.startSession(context);
  context.ompDropsKeyListeners();
  await omp.switchSession(context);

  context.keyArrives("\f");

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

test("the clear-screen command empties the transcript", async () => {
  const { omp, context, transcript } = makeSUT();

  await omp.runCommand("clear-screen", context);

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

test("the clear-screen command does not read the key setting", async () => {
  const { omp, context, settings } = makeSUT();

  await omp.runCommand("clear-screen", context);

  expect(settings.messages).toEqual([]);
});

function makeSUT(key = "ctrl+l") {
  const omp = new OmpSpy();
  const context = new ContextSpy();
  const transcript = new TranscriptSpy();
  const settings = new SettingsSpy(key);
  context.showScreen(transcript);
  clearScreenExtensionWith(settings)(omp);
  return { omp, context, transcript, settings };
}
