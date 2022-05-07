import { ScriptAdapter as ScriptAdapterType } from "../../@types/adapters/script-adapter";

export class ScriptAdapter implements ScriptAdapterType {
  execute(path: string, projectName: string): void {
    return;
  }
}
