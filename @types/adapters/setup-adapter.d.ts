import { Setup } from "../Setup";

export interface SetupAdapter {
  create(setup: Setup): Promise<void>;

  list(): Setup[];
}
