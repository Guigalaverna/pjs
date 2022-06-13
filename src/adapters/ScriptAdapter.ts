import { ScriptAdapter as ScriptAdapterType } from "../../@types/adapters/script-adapter";

import shell from "shelljs";
import { log, LogCategory } from "../../src/lib/log";
export class ScriptAdapter implements ScriptAdapterType {
  execute(path: string, projectName: string): void {
    try {
      shell.exec(`PROJECT_NAME=${projectName} bash ${path}`);
    } catch (err) {
      // @ts-ignore
      log(LogCategory.ERROR, err.message);
    } finally {
      process.exit(0);
    }
  }
}
