import { SetupAdapter as SetupAdapterType } from "../../@types/adapters/setup-adapter";
import { Setup } from "../../@types/Setup";

import * as YAML from "yaml";

import fs from "fs";
import path from "path";
import os from "os";
import { log, LogCategory } from "../../src/lib/log";

export class SetupAdapter implements SetupAdapterType {
  private setHeader(params: string[]) {
    // This process is just to make the params on Windows.
    switch (process.platform) {
      case "win32":
        return "param(" + params.join(", ") + ")";
        break;
      case "darwin":
      case "linux":
      default:
        return "";
    }
  }

  private setParsedStepsToCommand(setup: Setup, params: string[]) {
    return setup.steps.map(step => {
      // take all the params starting with $
      const param = step.command.split(" ").filter(param => param.startsWith("$"));
      // add param on params if not already in there
      param.forEach(param => {
        if (!params.includes(param)) {
          params.push(param);
        }
      }
      );

      return `# ${step.description?.toUpperCase()}
      ${step.command}`;
    });
  }

  private mapExtension() {
    switch (process.platform) {
      case "win32":
        return "ps1";
      case "darwin":
      case "linux":
      default:
        return "sh";
    }
  }

  public create(setup: Setup): void {
    try {
      const params: string[] = [];
      const parsedStepsToCommand = this.setParsedStepsToCommand(setup, params);
      const header = this.setHeader(params);

      const script = "# THIS IS A AUTO-GENERATED FILE BY PJS \n" +
        "# DO NOT EDIT THIS FILE DIRECTLY\n" +
        header + "\n" +
        parsedStepsToCommand.join("\n");

      const extension = this.mapExtension();

      this.createScript(setup.alias, extension, script);
      return;
    } catch (err) {
      // @ts-ignore
      log(LogCategory.ERROR, err.message);
    } finally {
      process.exit(0);
    }
  }

  private createScript(alias: string, extension: string, script: string) {
    fs.writeFileSync(
      path.join(
        os.homedir(),
        ".config",
        "pjs",
        "setups",
        `${alias}.${extension} `
      ),
      script
    );
  }

  public list(filterByType?: string) {
    try {
      const rawFile = fs.readFileSync(
        path.join(os.homedir(), ".config", "pjs", "setups.yaml"),
        "utf8"
      );
      const setups: Setup[] = YAML.parse(rawFile);
      log(LogCategory.DEBUG, `setups: ${JSON.stringify(setups)} `);
      switch (!!filterByType) {
        case true:
          return setups.filter(setup => setup.type === filterByType);
        case false:
          return setups;
      }
    } catch (err) {
      // @ts-ignore
      log(LogCategory.ERROR, err.message);
    }
  }
}
