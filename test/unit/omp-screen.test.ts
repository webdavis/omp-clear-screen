import { afterEach, beforeEach, expect, jest, test } from "bun:test";
import { OmpScreen } from "../../src/omp-screen.ts";
import { ContextSpy } from "../helpers/context-spy.ts";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

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

test("clear fills the screen with blank rows", () => {
  const { sut, context } = makeSUT();

  sut.clear();

  expect(context.drawScreen()).toEqual(new Array(context.terminalRows).fill(""));
});

test("clear keeps the blank rows until omp has drawn them", () => {
  const { sut, context } = makeSUT();

  sut.clear();
  jest.runAllTimers();

  expect(context.drawScreen()).toHaveLength(context.terminalRows);
});

test("clear takes the blank rows away once omp has drawn them", () => {
  const { sut, context } = makeSUT();

  sut.clear();
  context.drawScreen();
  jest.runAllTimers();

  expect(context.drawScreen()).toEqual([]);
});

test("clear keeps every message in the scrollback by only adding and removing the blank rows", () => {
  const { sut, context } = makeSUT();

  sut.clear();
  context.drawScreen();
  jest.runAllTimers();

  expect(context.messages).toEqual(["setWidget", "removeWidget"]);
});

function makeSUT() {
  const context = new ContextSpy();
  const sut = new OmpScreen(context);
  return { sut, context };
}
