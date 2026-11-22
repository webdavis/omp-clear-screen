import { expect, test } from "bun:test";
import { OmpScreen } from "../src/omp-screen.ts";
import { ContextSpy } from "./helpers/context-spy.ts";

test("isBusy answers true while omp is working", () => {
  const { sut, context } = makeSUT();
  context.ompIsWorking();

  expect(sut.isBusy()).toBe(true);
});

test("isBusy answers false while omp is idle", () => {
  const { sut } = makeSUT();

  expect(sut.isBusy()).toBe(false);
});

test("warn shows a warning in omp", () => {
  const { sut, context } = makeSUT();

  sut.warn("a warning");

  expect(context.notifications).toEqual([{ message: "a warning", level: "warning" }]);
});

function makeSUT() {
  const context = new ContextSpy();
  const sut = new OmpScreen(context);
  return { sut, context };
}
