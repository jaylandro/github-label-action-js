module.exports = ({ context }) => {
  try {
    const labelName = context.payload.label;
    const contentId = context.payload.issue.id;
    const contextHere = JSON.stringify(context.payload, null, 2);

    if (labelName === "help wanted") {
      github.projects.createCard({
        column_id: 9962014,
        content_id: contentId,
        content_type: "Issue",
      });
    }

    console.log(contextHere);

    return contextHere;
  } catch (error) {
    new Error(error.message);
  }
};
