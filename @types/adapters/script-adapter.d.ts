export interface ScriptAdapter {
  execute(path: string, projectName: string): void;
}
