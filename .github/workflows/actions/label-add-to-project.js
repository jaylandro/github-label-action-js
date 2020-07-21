module.exports = ({ context, github }) => {
  const issue = context.payload.issue;
  let selectedProject;

  const project = {
    column_id: 9962014,
    components: ["c: SQL Editor", "Bug", "WIP"],
    label: "automated!"
  }

  if (project.components.includes(issue.label)) {
    selectedProject = project;
  }

  if (selectedProject) {
    await github.issues.addLabels({
      issue_number: context.payload.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      labels: selectedProject.label,
    })
    await github.projects.createCard({
      column_id: selectedProject.column_id,
      content_id: context.payload.issue.id,
      content_type: "Issue",
    })
    console.log('Label Added:', labelAdded, 'Added to Project', addedToProject)
  } else {
    console.log("Not ready for Eng", context.payload);
  }
};
