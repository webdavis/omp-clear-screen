import { expect, test } from "bun:test";
import { OmpSettings } from "../../src/omp-settings.ts";
import { PluginSettingsStoreSpy } from "../helpers/plugin-settings-store-spy.ts";

test("clearKey answers ctrl+l when no key is set", async () => {
  const { sut } = makeSUT();

  expect(await sut.clearKey("/a/project")).toBe("ctrl+l");
});

test("clearKey reads this plugin's settings for the project it is given", async () => {
  const { sut, store } = makeSUT();

  await sut.clearKey("/a/project");

  expect(store.messages).toEqual([["omp-clear-screen", "/a/project"]]);
});

test("clearKey answers the key that is set", async () => {
  const { sut, store } = makeSUT();
  store.holds({ key: "alt+k" });

  expect(await sut.clearKey("/a/project")).toBe("alt+k");
});

function makeSUT() {
  const store = new PluginSettingsStoreSpy();
  const sut = new OmpSettings(store);
  return { sut, store };
}
