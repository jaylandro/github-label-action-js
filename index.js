const core = require("@actions/core");
const github = require("@actions/github");

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const labelName = github.context.payload.label;
  const contentId = github.context.payload.issue.id;

  if (labelName === "help wanted") {
    github.projects.createCard({
      column_id: 9962014,
      content_id: contentId,
      content_type: "Issue",
    });
  }

  let context = JSON.stringify(github.context.payload, null, 2);

  console.log(context);

  return `The event payload: ${context}`;
} catch (error) {
  core.setFailed(error.message);
}
