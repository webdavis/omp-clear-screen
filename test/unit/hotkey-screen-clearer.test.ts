import { expect, test } from "bun:test";
import { HotkeyScreenClearer } from "../../src/hotkey-screen-clearer.ts";
import { CLEAR_KEY, KeyboardStub } from "../helpers/keyboard-stub.ts";
import { ScreenSpy } from "../helpers/screen-spy.ts";

test("init does not message the screen", () => {
  const { screen } = makeSUT();

  expect(screen.messages).toEqual([]);
});

test("handleKey clears the screen on the key that clears", () => {
  const { sut, screen } = makeSUT();

  sut.handleKey(CLEAR_KEY);

  expect(screen.messages).toEqual(["clear"]);
});

test("handleKey keeps the key that clears from omp", () => {
  const { sut } = makeSUT();

  expect(sut.handleKey(CLEAR_KEY)).toEqual({ consume: true });
});

test("handleKey ignores any other key", () => {
  const { sut, screen } = makeSUT();

  const answer = sut.handleKey("any other key");

  expect(screen.messages).toEqual([]);
  expect(answer).toBeUndefined();
});

function makeSUT() {
  const screen = new ScreenSpy();
  const sut = new HotkeyScreenClearer(new KeyboardStub(), screen);
  return { sut, screen };
}
