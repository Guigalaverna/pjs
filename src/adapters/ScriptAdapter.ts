import { ScriptAdapter as ScriptAdapterType } from "../../@types/adapters/script-adapter";

import shell from "shelljs";
import { log, LogCategory } from "../../src/lib/log";
export class ScriptAdapter implements ScriptAdapterType {
  execute(path: string, projectName: string): void {
    try {
      log(LogCategory.DEBUG, JSON.stringify({ path, projectName, os: process.platform }));
      switch (process.platform) {
        case "win32":
          const command = `powershell -Command "& {${path} ${projectName}}"`
          log(LogCategory.INFO, `Executing script at ${path}`);
          shell.exec(command);

          break;
        case "darwin":
        case "linux":
        default:
          log(LogCategory.INFO, `Executing script at ${path}`);
          shell.exec(`PROJECT_NAME=${projectName} bash ${path}`);
      }
      
    } catch (err) {
      // @ts-ignore
      log(LogCategory.ERROR, err.message);
    } finally {
      process.exit(0);
    }
  }
}
