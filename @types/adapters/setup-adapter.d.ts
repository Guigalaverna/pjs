import { Setup } from "../Setup";

export interface SetupAdapter {
  create(setup: Setup): void;

  list(): Setup[];
}
