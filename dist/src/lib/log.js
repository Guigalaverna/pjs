"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
function log(category, message) {
    const log = console.log;
    switch (category) {
        case "ERR":
            log(`${chalk_1.default.red.bold("[Error]")} ${message}`);
            break;
        case "WARN":
            log(`${chalk_1.default.yellow.bold("[Warning]")} ${message}`);
            break;
        case "INFO":
            log(`${chalk_1.default.green.bold("[Info]")} ${message}`);
            break;
        case "DEBUG":
            log(`${chalk_1.default.blue.bold("[Debug]")} ${message}`);
            break;
        default:
            log(message);
    }
}
exports.log = log;
