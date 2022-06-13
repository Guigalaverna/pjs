"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptAdapter = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const log_1 = require("../../src/lib/log");
class ScriptAdapter {
    execute(path, projectName) {
        try {
            log_1.log("DEBUG", JSON.stringify({ path, projectName, os: process.platform }));
            switch (process.platform) {
                case "win32":
                    const command = `powershell -Command "& {${path} ${projectName}}"`;
                    log_1.log("INFO", `Executing script at ${path}`);
                    shelljs_1.default.exec(command);
                    break;
                case "darwin":
                case "linux":
                default:
                    log_1.log("INFO", `Executing script at ${path}`);
                    shelljs_1.default.exec(`PROJECT_NAME=${projectName} bash ${path}`);
            }
        }
        catch (err) {
            // @ts-ignore
            log_1.log("ERR", err.message);
        }
        finally {
            process.exit(0);
        }
    }
}
exports.ScriptAdapter = ScriptAdapter;
