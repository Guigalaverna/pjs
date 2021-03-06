"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupAdapter = void 0;
const YAML = __importStar(require("yaml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const log_1 = require("../../src/lib/log");
class SetupAdapter {
    setHeader(params) {
        // This process is just to make the params on Windows.
        switch (process.platform) {
            case "win32":
                return "param(" + params.join(", ") + ")";
                break;
            case "darwin":
            case "linux":
            default:
                return "";
        }
    }
    setParsedStepsToCommand(setup, params) {
        return setup.steps.map(step => {
            var _a;
            // take all the params starting with $
            const param = step.command.split(" ").filter(param => param.startsWith("$"));
            // add param on params if not already in there
            param.forEach(param => {
                if (!params.includes(param)) {
                    params.push(param);
                }
            });
            return `# ${(_a = step.description) === null || _a === void 0 ? void 0 : _a.toUpperCase()}
      ${step.command}`;
        });
    }
    mapExtension() {
        switch (process.platform) {
            case "win32":
                return "ps1";
            case "darwin":
            case "linux":
            default:
                return "sh";
        }
    }
    create(setup) {
        try {
            const params = [];
            const parsedStepsToCommand = this.setParsedStepsToCommand(setup, params);
            const header = this.setHeader(params);
            const script = "# THIS IS A AUTO-GENERATED FILE BY PJS \n" +
                "# DO NOT EDIT THIS FILE DIRECTLY\n" +
                header + "\n" +
                parsedStepsToCommand.join("\n");
            const extension = this.mapExtension();
            this.createScript(setup.alias, extension, script);
            return;
        }
        catch (err) {
            // @ts-ignore
            log_1.log(log_1.LogCategory.ERROR, err.message);
        }
        finally {
            process.exit(0);
        }
    }
    createScript(alias, extension, script) {
        fs_1.default.writeFileSync(path_1.default.join(os_1.default.homedir(), ".config", "pjs", "setups", `${alias}.${extension} `), script);
    }
    list(filterByType) {
        try {
            const rawFile = fs_1.default.readFileSync(path_1.default.join(os_1.default.homedir(), ".config", "pjs", "setups.yaml"), "utf8");
            const setups = YAML.parse(rawFile);
            log_1.log(log_1.LogCategory.DEBUG, `setups: ${JSON.stringify(setups)} `);
            switch (!!filterByType) {
                case true:
                    return setups.filter(setup => setup.type === filterByType);
                case false:
                    return setups;
            }
        }
        catch (err) {
            // @ts-ignore
            log_1.log(log_1.LogCategory.ERROR, err.message);
        }
    }
}
exports.SetupAdapter = SetupAdapter;
