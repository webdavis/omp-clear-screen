import { expect, test } from "bun:test";
import { HotkeyScreenClearer } from "../../src/hotkey-screen-clearer.ts";
import { CLEAR_KEY, KeyboardStub } from "../helpers/keyboard-stub.ts";
import { ScreenClearerSpy } from "../helpers/screen-clearer-spy.ts";

test("init does not message the clearer", () => {
  const { clearer } = makeSUT();

  expect(clearer.messages).toEqual([]);
});

test("handleKey clears the screen on the key that clears", () => {
  const { sut, clearer } = makeSUT();

  sut.handleKey(CLEAR_KEY);

  expect(clearer.messages).toEqual(["clear"]);
});

test("handleKey keeps the key that clears from omp", () => {
  const { sut } = makeSUT();

  expect(sut.handleKey(CLEAR_KEY)).toEqual({ consume: true });
});

test("handleKey ignores any other key", () => {
  const { sut, clearer } = makeSUT();

  const answer = sut.handleKey("any other key");

  expect(clearer.messages).toEqual([]);
  expect(answer).toBeUndefined();
});

function makeSUT() {
  const clearer = new ScreenClearerSpy();
  const sut = new HotkeyScreenClearer(new KeyboardStub(), clearer);
  return { sut, clearer };
}
