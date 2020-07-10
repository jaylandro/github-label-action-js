const core = require("@actions/core");
const github = require("@actions/github");

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const labelName = github.context.payload.label.name;

  const output =
    labelName === "help wanted" ? "Yes we want help!" : "No we don't like help";

  console.log(
    `The event payload: ${labelName}, Helper? ${output}, ${JSON.stringify(
      github.context.payload,
      null,
      2
    )}`
  );
} catch (error) {
  core.setFailed(error.message);
}
