#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const ScriptAdapter_1 = require("../src/adapters/ScriptAdapter");
const SetupAdapter_1 = require("../src/adapters/SetupAdapter");
const yargs_1 = __importDefault(require("yargs"));
const log_1 = require("../src/lib/log");
// show usage message
const usage = "\nUsage: pjs <alias> <project name>";
yargs_1.default
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
    .option("dir", {
    alias: "directory",
    describe: "Show the directory of the configured setups.",
    type: "string",
    demandOption: false,
})
    .locale("en")
    .help(true).argv;
const setupAdapter = new SetupAdapter_1.SetupAdapter();
const scriptAdapter = new ScriptAdapter_1.ScriptAdapter();
const orchestrator = new src_1.Orchestrator(setupAdapter, scriptAdapter);
const args = Object.entries(Object.assign({}, yargs_1.default.argv));
log_1.log(log_1.LogCategory.DEBUG, "PJS is running...");
log_1.log(log_1.LogCategory.DEBUG, JSON.stringify(args));
if (args.find(arg => arg[0] === "l" || arg[0] === "listSetups")) {
    orchestrator.listSetups(args[1][1]);
}
if (args.find(arg => arg[0] === "dir" || arg[0] === "directory")) {
    orchestrator.getDirectory();
}
if (Array.isArray(args[0][1]) && args[0][1].length === 0) {
    log_1.log(log_1.LogCategory.INFO, "No arguments provided. type 'pjs --help' for more info.");
    process.exit(0);
}
orchestrator.execute(yargs_1.default.argv);
