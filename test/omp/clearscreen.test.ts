import { expect, test } from "bun:test";
import { clearscreenExtensionWith } from "../../src/clearscreen.ts";
import { ContextSpy } from "../helpers/context-spy.ts";
import { OmpSpy } from "../helpers/omp-spy.ts";
import { SettingsSpy } from "../helpers/settings-spy.ts";

test("ctrl+l in an omp session clears the screen", async () => {
  const { omp, context } = makeSUT();
  await omp.startSession(context);

  context.keyArrives("\f");

  expect(context.drawScreen()).toEqual(A_SCREEN_OF_BLANK_ROWS);
});

test("the key set in omp's settings clears the screen in an omp session", async () => {
  const { omp, context } = makeSUT("alt+k");
  await omp.startSession(context);

  context.keyArrives("\x1bk");

  expect(context.drawScreen()).toEqual(A_SCREEN_OF_BLANK_ROWS);
});

test("ctrl+l clears the screen after omp switches session", async () => {
  const { omp, context } = makeSUT();
  await omp.startSession(context);
  context.ompDropsKeyListeners();
  await omp.switchSession(context);

  context.keyArrives("\f");

  expect(context.drawScreen()).toEqual(A_SCREEN_OF_BLANK_ROWS);
});

test("ctrl+l clears the screen after omp branches the session", async () => {
  const { omp, context } = makeSUT();
  await omp.startSession(context);
  context.ompDropsKeyListeners();
  await omp.branchSession(context);

  context.keyArrives("\f");

  expect(context.drawScreen()).toEqual(A_SCREEN_OF_BLANK_ROWS);
});

test("ctrl+l clears the screen once when omp keeps the key listener across a session change", async () => {
  const { omp, context } = makeSUT();
  await omp.startSession(context);
  await omp.switchSession(context);

  context.keyArrives("\f");

  expect(context.messages).toEqual(["setWidget"]);
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
