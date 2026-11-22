import { expect, test } from "bun:test";
import { IdleScreenClearer } from "../../src/idle-screen-clearer.ts";
import { ScreenSpy } from "../helpers/screen-spy.ts";

test("init does not message the screen", () => {
  const { screen } = makeSUT();

  expect(screen.messages).toEqual([]);
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
  const sut = new IdleScreenClearer(screen);
  return { sut, screen };
}
