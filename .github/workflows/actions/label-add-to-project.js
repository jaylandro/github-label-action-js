module.exports = ({ context, github }) => {
  const labelName = context.payload.label.name;

  const project = {
    column_id: 9962014,
    components: ["c: SQL Editor", "Bug", "WIP"],
    label: "automated!",
  };

  if (project.components.includes(labelName)) {
    labelAndAdd(project);
  }

  async function labelAndAdd(project) {
    await github.issues.addLabels({
      issue_number: context.payload.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      labels: project.label,
    });
    await github.projects.createCard({
      column_id: project.column_id,
      content_id: context.payload.issue.id,
      content_type: "Issue",
    });
  }
  console.log("Label Added & Added to project");
  // } else {
  //   console.log("Not ready for Eng", context.payload);
  // }
};
