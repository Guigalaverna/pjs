export function parseSteps(setup) {
  const steps = setup.steps.map(step => {
    return {
      description: step.description,
      command: step.command,
    };
  });

  return steps;
}
