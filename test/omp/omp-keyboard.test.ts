import { expect, test } from "bun:test";
import { OmpKeyboard } from "../../src/omp-keyboard.ts";

test("isClearKey recognises the byte a terminal sends for ctrl+l", () => {
  expect(makeSUT().isClearKey("\f")).toBe(true);
});

test("isClearKey recognises ctrl+l sent in the Kitty keyboard protocol", () => {
  expect(makeSUT().isClearKey("\x1b[108;5u")).toBe(true);
});

test("isClearKey rejects any other key", () => {
  expect(makeSUT().isClearKey("l")).toBe(false);
});

test("isClearKey recognises only the key it is given", () => {
  const sut = makeSUT("alt+k");

  expect([ALT_K, CTRL_L].map((data) => sut.isClearKey(data))).toEqual([true, false]);
});

const ALT_K = "\x1bk";
const CTRL_L = "\f";

function makeSUT(key = "ctrl+l") {
  return new OmpKeyboard(key);
}
