export async function parseSetup(buffer) {
  const setups = await YAML.parse(buffer.toString());

  return setups;
}
