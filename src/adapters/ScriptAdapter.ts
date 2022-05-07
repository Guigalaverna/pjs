import { ScriptAdapter as ScriptAdapterType } from "../../@types/adapters/script-adapter";

import shell from "shelljs";
export class ScriptAdapter implements ScriptAdapterType {
  execute(path: string, projectName: string): void {
    shell.exec(`PROJECT_NAME=${projectName} bash ${path}`);
  }
}
