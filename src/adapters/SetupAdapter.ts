import { SetupAdapter as SetupAdapterType } from "../../@types/adapters/setup-adapter";
import { Setup } from "../../@types/Setup";

import * as YAML from "yaml";

import fs from "fs";
import path from "path";
import os from "os";

export class SetupAdapter implements SetupAdapterType {
  create(setup: Setup): Promise<void> {
    return Promise.resolve();
  }
  list(): Setup[] {
    const rawFile = fs.readFileSync(
      path.join(os.homedir(), ".config", "pjs", "setups.yaml"),
      "utf8"
    );
    const setups = YAML.parse(rawFile);

    return setups;
  }
}
