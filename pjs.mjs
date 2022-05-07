#!/usr/bin/env zx

import { folders } from "./src/lib/folders.mjs";
import { parseSetup } from "./src/lib/parseSetup.mjs";
import { parseSteps } from "./src/lib/parseSteps.mjs";

// This is a simple utility to help you create setups of projects
await $`clear`;

console.log(`
PJS - Project Setup Utility
---------------------------------------------------------
| This utility will help you create a setup of projects |
| for you to work on.                                   |
---------------------------------------------------------
| Usage:                                                |
| pjs <alias> <project name>                            |
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

await fs.ensureFile(path.join(folders.config, "setups.yaml"));

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

// =================================

$`PROJECT_NAME=${projectName} bash ${path.join(folders.setups, `${alias}.sh`)}`;
