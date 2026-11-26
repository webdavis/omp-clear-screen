import { expect, test } from "bun:test";
import { clearscreenExtensionWith } from "../../src/clearscreen.ts";
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

test("ctrl+l empties the transcript after omp branches the session", async () => {
  const { omp, context, transcript } = makeSUT();
  await omp.startSession(context);
  context.ompDropsKeyListeners();
  await omp.branchSession(context);

  context.keyArrives("\f");

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

test("ctrl+l empties the transcript once when omp keeps the key listener across a session change", async () => {
  const { omp, context, transcript } = makeSUT();
  await omp.startSession(context);
  await omp.switchSession(context);

  context.keyArrives("\f");

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

test("the clearscreen command empties the transcript", async () => {
  const { omp, context, transcript } = makeSUT();

  await omp.runCommand("clearscreen", context);

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

test("the clearscreen command does not read the key setting", async () => {
  const { omp, context, settings } = makeSUT();

  await omp.runCommand("clearscreen", context);

  expect(settings.messages).toEqual([]);
});

function makeSUT(key = "ctrl+l") {
  const omp = new OmpSpy();
  const context = new ContextSpy();
  const transcript = new TranscriptSpy();
  const settings = new SettingsSpy(key);
  context.showScreen(transcript);
  clearscreenExtensionWith(settings)(omp);
  return { omp, context, transcript, settings };
}
