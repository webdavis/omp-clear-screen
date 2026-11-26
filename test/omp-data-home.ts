import { join } from "node:path";

function pointOmpAtTheFixtureDataHomeBeforeAnyTestLoadsIt(): void {
  process.env.XDG_DATA_HOME = join(import.meta.dir, "fixtures", "omp-data-home");
}

function keepOmpAwayFromThisMachinesProfilesAndAgentFolder(): void {
  for (const name of ["PI_CODING_AGENT_DIR", "OMP_PROFILE", "PI_PROFILE"]) delete process.env[name];
}

pointOmpAtTheFixtureDataHomeBeforeAnyTestLoadsIt();
keepOmpAwayFromThisMachinesProfilesAndAgentFolder();
