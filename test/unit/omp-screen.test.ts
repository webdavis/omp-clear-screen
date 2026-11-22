import { expect, test } from "bun:test";
import { OmpScreen } from "../../src/omp-screen.ts";
import { ContextSpy } from "../helpers/context-spy.ts";
import { TranscriptSpy } from "../helpers/transcript-spy.ts";

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

test("reportError shows an error in omp", () => {
  const { sut, context } = makeSUT();

  sut.reportError("an error");

  expect(context.notifications).toEqual([{ message: "an error", level: "error" }]);
});

test("clear finds a transcript nested inside other components", async () => {
  const { sut, context } = makeSUT();
  const transcript = new TranscriptSpy();
  context.showScreen({ children: [{ children: [transcript] }] });

  await sut.clear();

  expect(transcript.messages).toContain("clear");
});

test("clear disposes the transcript's components before it empties it", async () => {
  const { sut, context } = makeSUT();
  const transcript = new TranscriptSpy();
  context.showScreen(transcript);

  await sut.clear();

  expect(transcript.messages).toEqual(["dispose", "clear"]);
});

test("clear redraws the screen without its scrollback", async () => {
  const { sut, context } = makeSUT();
  context.showScreen(new TranscriptSpy());

  await sut.clear();

  expect(context.renderRequests).toEqual([[true, { clearScrollback: true }]]);
});

test("clear answers true when it found the transcript", async () => {
  const { sut, context } = makeSUT();
  context.showScreen(new TranscriptSpy());

  expect(await sut.clear()).toBe(true);
});

function makeSUT() {
  const context = new ContextSpy();
  const sut = new OmpScreen(context);
  return { sut, context };
}
