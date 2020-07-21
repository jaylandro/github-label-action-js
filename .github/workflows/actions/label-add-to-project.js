module.exports = ({ context, github }) => {
  const currentIssue = context.payload.issue;
  const labelName = context.payload.label.name;

  const project = {
    column_id: 9962014,
    components: ["c: SQL Editor", "Bug", "WIP"],
    labels: ["automated!"],
  };

  if (project.components.includes(labelName)) {
    labelAndAdd(project);
  }

  async function labelAndAdd(project) {
    try {
      await github.issues.addLabels({
        issue_number: currentIssue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        labels: project.labels,
      });

      await github.projects.createCard({
        column_id: project.column_id,
        content_id: currentIssue.id,
        content_type: "Issue",
      });

      console.log(
        `Added Labels: ${project.labels} & added to Project Column ${project.column_id}`
      );
    } catch (error) {
      if (error[0].message === "Project already has the associated issue") {
        return;
      }
      console.error("Label and add failed with:", error);
    }
  }
  console.log("Context: ", context);
};
