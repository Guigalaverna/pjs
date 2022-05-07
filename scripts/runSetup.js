const shell = require("shelljs");

function execute(alias, projectName) {
  shell.exec(
    `PROJECT_NAME=${projectName} bash ~/.config/pjs/setups/${alias}.sh`
  );
}

module.exports = { execute };
