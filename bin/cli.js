#!/usr/bin/env node
const yargs = require("yargs");
const utils = require("./run");

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
  .locale("en")
  .help(true).argv;

utils.run(yargs.argv);
