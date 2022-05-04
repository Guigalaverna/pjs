#!/usr/bin/env zx

import { folders } from "./lib/folders.mjs";
import { generateScript } from "./lib/generateScript.mjs";
import { parseSetup } from "./lib/parseSetup.mjs";
import { parseSteps } from "./lib/parseSteps.mjs";

// This is a simple utility to help you create setups of projects
await $`clear`;

console.log(`
PJS - Project Setup Utility
---------------------------------------------------------
| This utility will help you create a setup of projects |
| for you to work on.                                   |
---------------------------------------------------------
| ${chalk.yellow("Usage:")}                                                |
| pjs ${chalk.green.bold(
  "<alias> <project-name>"
)}                             |
---------------------------------------------------------
`);

const args = process.argv.slice(3);
const alias = args[0];
const projectName = args[1];

if (!alias) {
  console.log(`${chalk.red.bold("Error:")} You must provide a alias.`);
}

if (!projectName) {
  console.log(`${chalk.red.bold("Error:")} You must provide a project name.`);
}

await fs.ensureFile(path.join(folders.config, "setups.yaml"), err => {
  if (err) {
    console.log(
      `${chalk.yellow.bold(
        "Attention:"
      )} Creating setups configuration file in ~/.config/pjs/setups.yaml`
    );
    console.log("           Please populate it with your setups.");
  }
});

const buffer = await fs.readFile(path.join(folders.config, "setups.yaml"));
const setups = await parseSetup(buffer);

const setup = await setups.find(setup => setup.alias === alias);
const steps = await parseSteps(setup);

const commands = await steps.map(step => {
  return `# ${step.description.toUpperCase()}
${step.command}\n`;
});

const script = `# THIS IS AUTO GENERATED SCRIPT BY PJS

${commands.join("\n")}`;

await fs.outputFile(path.join(folders.setups, `${alias}.sh`), script);
