import { expect, test } from "bun:test";
import { OmpKeyboard } from "../../src/omp-keyboard.ts";

test("isClearKey recognises the key it is given, named as omp names it", () => {
  expect(makeSUT("ctrl+l").isClearKey("ctrl+l")).toBe(true);
});

test("isClearKey rejects any other key", () => {
  expect(makeSUT("ctrl+l").isClearKey("ctrl+k")).toBe(false);
});

function makeSUT(key: string) {
  return new OmpKeyboard(key);
}
