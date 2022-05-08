"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orchestrator = void 0;
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const cli_table_1 = __importDefault(require("cli-table"));
const types_json_1 = __importDefault(require("../types.json"));
const chalk_1 = __importDefault(require("chalk"));
class Orchestrator {
    constructor(setupAdapter, scriptAdapter) {
        this.setupAdapter = setupAdapter;
        this.scriptAdapter = scriptAdapter;
        this.setupAdapter = setupAdapter;
        this.scriptAdapter = scriptAdapter;
    }
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setupAdapter, scriptAdapter } = this;
            const alias = (args.alias || args._[0]);
            const projectName = (args.projectName || args._[1]);
            const setups = setupAdapter.list();
            const setup = setups.find(setup => setup.alias === alias);
            const pathOfScript = path_1.default.join(os_1.default.homedir(), ".config", "pjs", "setups", `${alias}.sh`);
            const setupScriptExists = fs_1.default.existsSync(pathOfScript);
            if (!setup) {
                console.log(`${chalk_1.default.red.bold("Error:")} Setup with alias "${alias}" not found.`);
                process.exit(1);
            }
            if (!setupScriptExists) {
                setupAdapter.create(setup);
            }
            scriptAdapter.execute(pathOfScript, projectName);
        });
    }
    listSetups(filterByType) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setupAdapter } = this;
            const setups = setupAdapter.list(filterByType);
            const table = new cli_table_1.default({
                head: ["Name", "Alias", "Type"],
            });
            setups.forEach(setup => {
                var _a;
                table.push([
                    setup.name,
                    setup.alias,
                    (_a = types_json_1.default.find(type => type.type === setup.type)) === null || _a === void 0 ? void 0 : _a.name,
                ]);
            });
            console.log(table.toString());
        });
    }
}
exports.Orchestrator = Orchestrator;
