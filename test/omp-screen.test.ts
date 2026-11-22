import { expect, test } from "bun:test";
import { OmpScreen } from "../src/omp-screen.ts";
import { ContextSpy } from "./helpers/context-spy.ts";

test("isBusy answers true while omp is working", () => {
  const { sut, context } = makeSUT();
  context.ompIsWorking();

  expect(sut.isBusy()).toBe(true);
});

function makeSUT() {
  const context = new ContextSpy();
  const sut = new OmpScreen(context);
  return { sut, context };
}
