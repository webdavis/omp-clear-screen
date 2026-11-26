import { expect, test } from "bun:test";
import { ClearKeyListener } from "../../src/clear-key-listener.ts";
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

  expect(sut.handleKey(CLEAR_KEY)).toBe(true);
});

test("handleKey ignores any other key", () => {
  const { sut, clearer } = makeSUT();

  const handled = sut.handleKey("any other key");

  expect(clearer.messages).toEqual([]);
  expect(handled).toBe(false);
});

function makeSUT() {
  const clearer = new ScreenClearerSpy();
  const sut = new ClearKeyListener(new KeyboardStub(), clearer);
  return { sut, clearer };
}
