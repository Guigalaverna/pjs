import { ScriptAdapter } from "../@types/adapters/script-adapter";
import { SetupAdapter } from "../@types/adapters/setup-adapter";
import yargs from "yargs";

import path from "path";
import os from "os";
import fs from "fs";
import Table from "cli-table";

import types from "../types.json";
import { log, LogCategory } from "./lib/log";
import { Setup } from "../@types/Setup";

export class Orchestrator {
  constructor(
    private setupAdapter: SetupAdapter,
    private scriptAdapter: ScriptAdapter
  ) {
    this.setupAdapter = setupAdapter;
    this.scriptAdapter = scriptAdapter;
  }

  async execute(args: yargs.Arguments) {
    try {
      const { setupAdapter, scriptAdapter } = this;

      const alias = (args.alias || args._[0]) as string;
      const projectName = (args.projectName || args._[1]) as string;

      if (!alias) {
        log(LogCategory.ERROR, "No alias provided.");
        process.exit(0);
      }

      if (!projectName) {
        log(LogCategory.ERROR, "No project name provided.");
        process.exit(0);
      }

      const setups: Setup[] = setupAdapter.list();
      const setup = setups.find((setup) => setup.alias === alias);
      let extension;
      switch (process.platform) {
        case "win32":
          extension = "ps1";
          break;
        case "darwin":
        case "linux":
        default:
          extension = "sh";
      }
      const pathOfScript = path.join(
        os.homedir(),
        ".config",
        "pjs",
        "setups",
        `${alias}.${extension}`
      );
      if (!setup) {
        log(LogCategory.ERROR, `Setup with alias "${alias}" not found.`);
        process.exit(0);
      }
      
      const setupScriptExists = fs.existsSync(pathOfScript);
      log(LogCategory.DEBUG, `setupScriptExists: ${setupScriptExists}`);
      log(LogCategory.DEBUG, `pathOfScript: ${pathOfScript}`);
      if (!setupScriptExists) {
        setupAdapter.create(setup);
      }

      scriptAdapter.execute(pathOfScript, projectName);
    } catch (err) {
      // @ts-ignore
      log(LogCategory.ERROR, err.message);
    } finally {
      process.exit(0);
    }
  }

  async listSetups(filterByType?: string) {
    try {
      const { setupAdapter } = this;

      const setups: Setup[] = setupAdapter.list(filterByType);

      const table = new Table({
        head: ["Name", "Alias", "Type"],
      });

      setups.forEach(setup => {
        table.push([
          setup.name,
          setup.alias,
          types.find(type => type.type === setup.type)?.name,
        ]);
      });

      console.log(table.toString());
    } catch (err) {
      // @ts-ignore
      log(LogCategory.ERROR, err.message);
    } finally {
      process.exit(0);
    }
  }
}
