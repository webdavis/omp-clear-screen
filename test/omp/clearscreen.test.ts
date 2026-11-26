import { expect, test } from "bun:test";
import { clearscreenExtensionWith } from "../../src/clearscreen.ts";
import { ContextSpy } from "../helpers/context-spy.ts";
import { OmpSpy } from "../helpers/omp-spy.ts";
import { SettingsSpy } from "../helpers/settings-spy.ts";

test("ctrl+l from the prompt clears the screen", async () => {
  const { omp, context } = makeSUT();
  await omp.startSession(context);

  context.keyArrives("ctrl+l");

  expect(context.drawScreen()).toEqual(A_SCREEN_OF_BLANK_ROWS);
});

test("the key set in omp's settings clears the screen", async () => {
  const { omp, context } = makeSUT("alt+k");
  await omp.startSession(context);

  context.keyArrives("alt+k");

  expect(context.drawScreen()).toEqual(A_SCREEN_OF_BLANK_ROWS);
});

test("a key other than the clear key reaches the prompt", async () => {
  const { omp, context } = makeSUT();
  await omp.startSession(context);

  context.keyArrives("ctrl+k");

  expect(context.keysPassedOn).toEqual(["ctrl+k"]);
});

test("ctrl+l still clears the screen after omp switches session", async () => {
  const { omp, context } = makeSUT();
  await omp.startSession(context);
  context.ompDropsKeyHandlers();
  await omp.switchSession(context);

  context.keyArrives("ctrl+l");

  expect(context.drawScreen()).toEqual(A_SCREEN_OF_BLANK_ROWS);
});

test("ctrl+l still clears the screen after omp branches the session", async () => {
  const { omp, context } = makeSUT();
  await omp.startSession(context);
  context.ompDropsKeyHandlers();
  await omp.branchSession(context);

  context.keyArrives("ctrl+l");

  expect(context.drawScreen()).toEqual(A_SCREEN_OF_BLANK_ROWS);
});

test("omp holds one key handler when it keeps the handler across session changes", async () => {
  const { omp, context } = makeSUT();
  await omp.startSession(context);
  await omp.switchSession(context);
  await omp.branchSession(context);

  expect(context.keyHandlers).toHaveLength(1);
});

test("the clearscreen command clears the screen", async () => {
  const { omp, context } = makeSUT();

  await omp.runCommand("clearscreen", context);

  expect(context.drawScreen()).toEqual(A_SCREEN_OF_BLANK_ROWS);
});

test("the clearscreen command does not read the key setting", async () => {
  const { omp, context, settings } = makeSUT();

  await omp.runCommand("clearscreen", context);

  expect(settings.messages).toEqual([]);
});

const A_SCREEN_OF_BLANK_ROWS = new Array(new ContextSpy().terminalRows).fill("");

function makeSUT(key = "ctrl+l") {
  const omp = new OmpSpy();
  const context = new ContextSpy();
  const settings = new SettingsSpy(key);
  clearscreenExtensionWith(settings)(omp);
  return { omp, context, settings };
}
