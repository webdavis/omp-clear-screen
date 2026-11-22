import { expect, test } from "bun:test";
import { OmpSettings } from "../../src/omp-settings.ts";
import { PluginSettingsStoreSpy } from "../helpers/plugin-settings-store-spy.ts";

test("clearKey answers ctrl+l when no key is set", async () => {
  const { sut } = makeSUT();

  expect(await sut.clearKey("/a/project")).toBe("ctrl+l");
});

function makeSUT() {
  const store = new PluginSettingsStoreSpy();
  const sut = new OmpSettings(store);
  return { sut, store };
}
