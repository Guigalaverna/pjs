"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptAdapter = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
class ScriptAdapter {
    execute(path, projectName) {
        shelljs_1.default.exec(`PROJECT_NAME=${projectName} bash ${path}`);
    }
}
exports.ScriptAdapter = ScriptAdapter;
