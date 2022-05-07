const fs = require("fs");
const os = require("os");
const path = require("path");
const YAML = require("yaml");
const shell = require("shelljs");

function run(rawArgs) {
  const args = {
    alias: rawArgs.alias || rawArgs._[0],
    projectName: rawArgs.projectName || rawArgs._[1],
  };

  const setups = YAML.parse(
    fs.readFileSync(
      path.join(os.homedir(), ".config", "pjs", "setups.yaml"),
      "utf-8"
    )
  );

  const setupChoosen = setups.find(
    setup => setup.alias === args["alias" || "a"]
  );

  if (!setupChoosen) {
    console.log("Setup not found.");
    process.exit(1);
  }

  const command = setupChoosen.steps.map(step => {
    return `# ${step.description.toUpperCase()}
  ${step.command}
  `;
  });

  const script = `# THIS IS A AUTOMATICALLY GENERATED FILE BY PJS.
# DO NOT EDIT THIS FILE.

${command.join("\n")}`;

  fs.writeFileSync(
    path.join(
      os.homedir(),
      ".config",
      "pjs",
      "setups",
      `${args["alias" || "a"]}.sh`
    ),
    script
  );

  shell.exec(
    `PROJECT_NAME=${args["projectName" || "p"]} bash ~/.config/pjs/setups/${
      args["alias" || "a"]
    }.sh`
  );
}

module.exports = {
  run,
};
