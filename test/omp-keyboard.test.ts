import { expect, test } from "bun:test";
import { OmpKeyboard } from "../src/omp-keyboard.ts";

test("isCtrlL recognises the byte a terminal sends for ctrl+l", () => {
  expect(makeSUT().isCtrlL("\f")).toBe(true);
});

test("isCtrlL recognises ctrl+l sent in the Kitty keyboard protocol", () => {
  expect(makeSUT().isCtrlL("\x1b[108;5u")).toBe(true);
});

test("isCtrlL rejects any other key", () => {
  expect(makeSUT().isCtrlL("l")).toBe(false);
});

function makeSUT() {
  return new OmpKeyboard();
}
