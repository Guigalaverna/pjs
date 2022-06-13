import { ScriptAdapter } from "../@types/adapters/script-adapter";
import { SetupAdapter } from "../@types/adapters/setup-adapter";
import yargs from "yargs";

import path from "path";
import os from "os";
import fs from "fs";
import Table from "cli-table";

import types from "../types.json";
import { log, LogCategory } from "./lib/log";

export class Orchestrator {
  constructor(
    private setupAdapter: SetupAdapter,
    private scriptAdapter: ScriptAdapter
  ) {
    this.setupAdapter = setupAdapter;
    this.scriptAdapter = scriptAdapter;
  }

  public async execute(args: yargs.Arguments) {
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
        log(LogCategory.ERROR, `Setup with alias "${alias}" not found.`);
        process.exit(0);
      }

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

  public async getDirectory() {
    try {
      switch (process.platform) {
        case "win32": 
          const directory = `${os.homedir()}\\.config\\pjs`.replace(/\\/g, "/");
          log("INFO", `Your directory is: ${directory}`);
          break;
        case "linux":
        case "darwin":
          log("INFO", `Your directory is: ${os.homedir()}/.config/pjs/setups.yaml`);
          break;
        default:
          log("ERR", "Your platform is not supported.");
      }          
    } catch (err) {
      // @ts-ignore
      log("ERR", err.message);
    } finally {
      process.exit(0);
    }
  }

  public async listSetups(filterByType?: string) {
    try {
      const { setupAdapter } = this;
      const setups = setupAdapter.list(filterByType);

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
