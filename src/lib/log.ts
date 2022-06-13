import chalk from "chalk";

export enum LogCategory {
  INFO = "INFO",
  WARNING = "WARN",
  ERROR = "ERR",
  DEBUG = "DEBUG",
}

export function log(
  category: LogCategory,
  message: string
) {
  const log = console.log;

  switch (category) {
    case LogCategory.ERROR:
      log(`${chalk.red.bold("[Error]")} ${message}`);
      break;
    case LogCategory.WARNING:
      log(`${chalk.yellow.bold("[Warning]")} ${message}`);
      break;
    case LogCategory.INFO:
      log(`${chalk.green.bold("[Info]")} ${message}`);
      break;
    case LogCategory.DEBUG:
      log(`${chalk.blue.bold("[Debug]")} ${message}`);
      break;
    default:
      log(message);
  }
}
