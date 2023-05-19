const axios = require("axios");
require("dotenv").config();

const { getGitHubUser } = require("./github.js");
const {
  createFreshdeskContact,
  updateFreshDeskContact,
  getFreshDeskUserId,
} = require("./freshdesk.js");

(async () => {
  const username = process.argv.slice(2)[0];
  const domain = process.argv.slice(2)[1]; // or process.env["FRESHDESK_DOMAIN"] FROM .ENV FILE;
  const githubToken = process.env["GITHUB_TOKEN"];
  const freshdeskToken = process.env["FRESHDESK_TOKEN"];

  try {
    const githubUser = await getGitHubUser(username, githubToken);

    console.log(githubUser);

    const freshdeskUserId = await getFreshDeskUserId(
      username,
      domain,
      freshdeskToken
    );

    if (!freshdeskUserId) {
      const result = await createFreshdeskContact(
        githubUser,
        domain,
        freshdeskToken
      );

      console.log("Contact created successfully!");
      console.log("Contact Id:", result.id);

      return;
    }

    console.log(
      `FreshDesk user found with Id: ${freshdeskUserId}. Updating information!`
    );

    await updateFreshDeskContact(freshdeskUserId, domain, freshdeskToken);
  } catch (error) {
    console.error(error.message, error.response);
  }
})();
