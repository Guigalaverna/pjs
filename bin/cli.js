#!/usr/bin/env node
const yargs = require("yargs");
const script = require("../run");
const types = require("../types.json");
const Table = require("cli-table");

// show usage message
const usage = "\nUsage: pjs <alias> <project name>";
yargs
  .usage(usage)
  .option("a", {
    alias: "alias",
    describe: "Alias of a setup configured.",
    type: "string",
    demandOption: false,
  })
  .option("p", {
    alias: "projectName",
    describe: "Name of the project to be created.",
    type: "string",
    demandOption: false,
  })
  .option("l", {
    alias: "listSetups",
    describe: "List all configured setups.",
    type: "string",
    demandOption: false,
  })
  .locale("en")
  .help(true).argv;

const args = {
  alias: yargs.argv.alias || yargs.argv._[0],
  projectName: yargs.argv.projectName || yargs.argv._[1],
  listSetups: yargs.argv.listSetups,
};

if (args.listSetups) {
  if (args.listSetups === "all") {
    const setups = script.listSetups();

    var table = new Table({
      head: ["Name", "Alias", "Type"],
      colWidths: [40, 20, 20],
    });

    setups.forEach(setup => {
      table.push([
        setup.name,
        setup.alias,
        types.find(type => type.type === setup.type).name,
      ]);
    });

    console.log(table.toString());
    process.exit(0);
  } else {
    const setups = script.listSetups();

    var table = new Table({
      head: ["Name", "Alias", "Type"],
      colWidths: [40, 20, 20],
    });

    setups.forEach(setup => {
      table.push([
        setup.name,
        setup.alias,
        types.find(type => type.type === setup.type).name,
      ]);
    });

    console.log(table.toString());
    process.exit(0);
  }
}
script.runSetup(args.alias, args.projectName);
