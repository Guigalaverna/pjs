"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.LogCategory = void 0;
const chalk_1 = __importDefault(require("chalk"));
var LogCategory;
(function (LogCategory) {
    LogCategory["INFO"] = "INFO";
    LogCategory["WARNING"] = "WARN";
    LogCategory["ERROR"] = "ERR";
    LogCategory["DEBUG"] = "DEBUG";
})(LogCategory = exports.LogCategory || (exports.LogCategory = {}));
function log(category, message) {
    const log = console.log;
    switch (category) {
        case LogCategory.ERROR:
            log(`${chalk_1.default.red.bold("[Error]")} ${message}`);
            break;
        case LogCategory.WARNING:
            log(`${chalk_1.default.yellow.bold("[Warning]")} ${message}`);
            break;
        case LogCategory.INFO:
            log(`${chalk_1.default.green.bold("[Info]")} ${message}`);
            break;
        case LogCategory.DEBUG:
            log(`${chalk_1.default.blue.bold("[Debug]")} ${message}`);
            break;
        default:
            log(message);
    }
}
exports.log = log;
