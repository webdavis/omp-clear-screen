import { expect, test } from "bun:test";
import { CtrlLScreenClearer } from "../../src/ctrl-l-screen-clearer.ts";
import { CTRL_L, KeyboardStub } from "../helpers/keyboard-stub.ts";
import { ScreenSpy } from "../helpers/screen-spy.ts";

test("init does not message the screen", () => {
  const { screen } = makeSUT();

  expect(screen.messages).toEqual([]);
});

test("handleKey clears the screen on ctrl+l", () => {
  const { sut, screen } = makeSUT();

  sut.handleKey(CTRL_L);

  expect(screen.messages).toEqual(["clear"]);
});

test("handleKey keeps ctrl+l from omp", () => {
  const { sut } = makeSUT();

  expect(sut.handleKey(CTRL_L)).toEqual({ consume: true });
});

test("handleKey ignores any other key", () => {
  const { sut, screen } = makeSUT();

  const answer = sut.handleKey("any other key");

  expect(screen.messages).toEqual([]);
  expect(answer).toBeUndefined();
});

test("clear clears the screen", () => {
  const { sut, screen } = makeSUT();

  sut.clear();

  expect(screen.messages).toEqual(["clear"]);
});

test("clear warns and leaves the screen alone while a response is running", () => {
  const { sut, screen } = makeSUT();
  screen.responseIsRunning();

  sut.clear();

  expect(screen.messages).toEqual(["warn"]);
});

test("clear reports an error when omp's transcript cannot be found", async () => {
  const { sut, screen } = makeSUT();
  screen.transcriptIsMissing();

  await sut.clear();

  expect(screen.messages).toEqual(["clear", "reportError"]);
});

function makeSUT() {
  const screen = new ScreenSpy();
  const sut = new CtrlLScreenClearer(new KeyboardStub(), screen);
  return { sut, screen };
}
