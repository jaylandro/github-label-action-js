module.exports = ({ context, github }) => {

  async function testTeam() {
    try {
      return await github.teams.getMembershipForUserInOrg({
        org: "mode",
        team_slug: "frontend",
        username: context.actor,
      });
    } catch (error) {
      return error;
    }
  }

  const userIsMember = testTeam();

  console.log("Checkedit?", userIsMember);

  if (userIsMember) {
    console.log("Is Team?", userIsMember);
  }

  const rawCheck = await github.teams.getMembershipForUserInOrg({
    org: "mode",
    team_slug: "frontend",
    username: context.actor,
  });

  console.log(rawCheck, "RAWCHECK")

  console.log("Debug Context: ", context);
};
