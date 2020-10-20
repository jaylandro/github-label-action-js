module.exports = ({ context, github }) => {
  async function testTeam() {
    try {
      await github.teams.getMembershipForUserInOrg({
        org: "mode",
        team_slug: "frontend",
        username: context.actor,
      });
    } catch (error) {
      return false;
    }
  }

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
  }

  testTeam().then((res) => {
    console.log("Checkedit?", res);
    if (res) {
      console.log("Is Team?", res);
      labelTeam();
    }
  });

  console.log("Debug Context: ", context);
};
