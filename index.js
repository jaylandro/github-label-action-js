try {
  const labelName = context.payload.label;
  const contentId = context.payload.issue.id;

  if (labelName === "help wanted") {
    github.projects.createCard({
      column_id: 9962014,
      content_id: contentId,
      content_type: "Issue",
    });
  }

  let contextHere = JSON.stringify(context.payload, null, 2);

  console.log(contextHere);

  return contextHere;
} catch (error) {
  new Error(error.message);
}

module.exports = ({ context }) => {
  return context.payload.client_payload.value;
};
