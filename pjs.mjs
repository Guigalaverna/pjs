#!/usr/bin/env zx

// This is a simple utility to help you create setups of projects
await $`clear`;

console.log(`
PJS - Project Setup Utility
---------------------------------------------------------
| This utility will help you create a setup of projects |
| for you to work on.                                   |
---------------------------------------------------------
| ${chalk.yellow("Usage:")}                                                |
| pjs ${chalk.green.bold("<slug> <project-name>")}                             |
---------------------------------------------------------
`);

const userConfigFolder = path.join(process.env.HOME, ".config", "pjs");
const userSetupsFolder = path.join(
  process.env.HOME,
  ".config",
  "pjs",
  "setups"
);

await fs.ensureFile(path.join(userConfigFolder, "setups.yaml"), err => {
  if (err) {
    console.log(
      `${chalk.yellow.bold(
        "Attention:"
      )} Creating setups configuration file in ~/.config/pjs/setups.yaml`
    );
    console.log("           Please populate it with your setups.");
  }
});

const buffer = await fs.readFile(path.join(userConfigFolder, "setups.yaml"));
const setups = YAML.parse(buffer.toString());

const args = process.argv.slice(3);
const slug = args[0];
const projectName = args[1];

if (!slug) {
  console.log(`${chalk.red.bold("Error:")} You must provide a slug.`);
}

if (!projectName) {
  console.log(`${chalk.red.bold("Error:")} You must provide a project name.`);
}
