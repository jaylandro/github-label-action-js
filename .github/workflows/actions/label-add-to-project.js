module.exports = ({ context, github }) => {
  const issue = context.payload.issue;
  const labelsAsStrings = issue.labels.map((label) => label.name);

  const workflowIssue = ["c: SQL Editor"].some((label) =>
    labelsAsStrings.includes(label)
  );

  const priorityExists = ["P0", "P1", "P2", "P3"].some((label) =>
    labelsAsStrings.includes(label)
  );

  if (workflowIssue && priorityExists) {
    return github.issues
      .addLabels({
        issue_number: context.payload.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        labels: ["automated!"],
      })
      .then((res) => {
        github.projects
          .createCard({
            column_id: 9962014,
            content_id: context.payload.issue.id,
            content_type: "Issue",
          })
          .then((result) => result);
      });
  } else {
    console.log("Not ready for Eng", context.payload);
  }
};
