import { ScriptAdapter } from "../@types/adapters/script-adapter";
import { SetupAdapter } from "../@types/adapters/setup-adapter";
import yargs, { Arguments, Argv } from "yargs";

import path from "path";
import os from "os";
import fs from "fs";

export class Orchestrator {
  constructor(
    private setupAdapter: SetupAdapter,
    private scriptAdapter: ScriptAdapter
  ) {
    this.setupAdapter = setupAdapter;
    this.scriptAdapter = scriptAdapter;
  }

  async execute(args: yargs.Arguments) {
    const { setupAdapter, scriptAdapter } = this;

    const alias = (args.alias || args._[0]) as string;
    const projectName = (args.projectName || args._[1]) as string;

    const setups = setupAdapter.list();
    const setup = setups.find(setup => setup.alias === alias);
    const pathOfScript = path.join(
      os.homedir(),
      ".config",
      "pjs",
      "setups",
      `${alias}.sh`
    );
    const setupScriptExists = fs.existsSync(pathOfScript);

    if (!setup) {
      throw new Error(`Setup with alias ${alias} not found.`);
    }

    if (!setupScriptExists) {
      setupAdapter.create(setup);
    }

    scriptAdapter.execute(pathOfScript, projectName);
  }

  async listSetups() {}
}
