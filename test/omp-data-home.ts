import { join } from "node:path";

// omp settles where its data lives when it first loads, so it is pointed at the fixture before any test file runs.
process.env.XDG_DATA_HOME = join(import.meta.dir, "fixtures", "omp-data-home");

// A profile or an agent folder named in the environment would send omp back to this machine's own settings.
for (const name of ["PI_CODING_AGENT_DIR", "OMP_PROFILE", "PI_PROFILE"]) delete process.env[name];
