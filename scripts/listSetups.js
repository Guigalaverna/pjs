const path = require("path");
const fs = require("fs");
const os = require("os");
const YAML = require("yaml");

function execute(filterBy) {
  const setups = YAML.parse(
    fs.readFileSync(
      path.join(os.homedir(), ".config", "pjs", "setups.yaml"),
      "utf-8"
    )
  );

  if (filterBy) {
    return setups.filter(setup => setup.type === filterBy);
  }

  return setups;
}

module.exports = {
  execute,
};
