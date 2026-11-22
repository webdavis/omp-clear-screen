import { expect, test } from "bun:test";
import { OmpPluginSettingsStore } from "../../src/omp-plugin-settings-store.ts";

test("read answers the settings omp has saved for a plugin", async () => {
  const sut = makeSUT();

  expect(await sut.read("omp-clear-screen", A_PROJECT_WITHOUT_SETTINGS)).toEqual({ key: "alt+k" });
});

const A_PROJECT_WITHOUT_SETTINGS = import.meta.dir;

function makeSUT() {
  return new OmpPluginSettingsStore();
}
