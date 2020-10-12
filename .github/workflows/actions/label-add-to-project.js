module.exports = ({ context, github }) => {
  const currentIssue = context.payload.issue;
  const labelName = context.payload.label.name;

  const project = {
    column_id: 9962014,
    components: ["c: SQL Editor", "bug", "WIP"],
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
      if (error.message === "Project already has the associated issue") {
        return;
      }
      console.error("Label and add failed with:", error);
    }
  }
  
  
  async function testTeam() {
    try {
      return await github.teams.getMembershipForUserInOrg({  
        org: "jaylandro",
        team_slug: "test-team",
        username: context.actor,
      });  
      
    } catch (error) {
      return false;
    }
  };

  async function labelTeam() {
    try {
      await github.issues.addLabels({
        issue_number: issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        labels: "success",
      });

      console.log(`Added Label: success`);
    } catch (error) {
      console.error("Label team failed with:", error);
    }
  };
    
  testTeam().then(res => {
    if (res) {
      console.log('Is Team?', res);
      labelTeam();
    }
  });

  console.log("Debug Context: ", context);
};
