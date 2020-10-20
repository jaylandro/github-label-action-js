module.exports = ({ context, github }) => {
  let userRes;

  async function testTeam() {
    try {
      userRes = await github.teams.getMembershipForUserInOrg({
        org: "mode",
        team_slug: "frontend",
        username: context.actor,
      });
    } catch (error) {
      return error;
    }
  }

  testTeam().then((res) => {
    console.log("Checkedit?", res, "UserRes", userRes);
    if (res) {
      console.log("Is Team?", res);
      labelTeam();
    }
  });

  console.log("Debug Context: ", context);
  console.log("Github Context: ", github.teams);
};
