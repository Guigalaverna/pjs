export interface Step {
  description?: string;
  command: string;
}

export interface Setup {
  name?: string;
  alias: string;
  type?: string;
  author?: string;
  version?: string;
  steps: Step[];
}
