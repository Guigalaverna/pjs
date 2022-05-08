import chalk from "chalk";

export function log(
  category: "ERR" | "WARN" | "INFO" | "DEBUG",
  message: string
) {
  const log = console.log;

  switch (category) {
    case "ERR":
      log(`${chalk.red.bold("[Error]")} ${message}`);
      break;
    case "WARN":
      log(`${chalk.yellow.bold("[Warning]")} ${message}`);
      break;
    case "INFO":
      log(`${chalk.green.bold("[Info]")} ${message}`);
      break;
    case "DEBUG":
      log(`${chalk.blue.bold("[Debug]")} ${message}`);
      break;
    default:
      log(message);
  }
}
