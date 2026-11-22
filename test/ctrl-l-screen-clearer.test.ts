import { expect, test } from "bun:test";
import { CtrlLScreenClearer } from "../src/ctrl-l-screen-clearer.ts";
import { ScreenSpy } from "./helpers/screen-spy.ts";

test("init does not message the screen", () => {
  const { screen } = makeSUT();

  expect(screen.messages).toEqual([]);
});

function makeSUT() {
  const screen = new ScreenSpy();
  const sut = new CtrlLScreenClearer(screen);
  return { sut, screen };
}
