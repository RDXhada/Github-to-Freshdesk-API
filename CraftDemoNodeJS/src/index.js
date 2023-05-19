const dotenv = require("dotenv");
const GitHubAPI = require("./GitHubAPI.js");
const FreshdeskAPI = require("./FreshdeskAPI.js");

class ContactSync {
  constructor() {
    dotenv.config();
  }

  async getUserAndSyncContact(username, domain, githubToken, freshdeskToken) {
    try {
      const github = new GitHubAPI(githubToken);
      const freshdesk = new FreshdeskAPI(domain, freshdeskToken);
      
      const githubUser = await github.getUser(username);
      console.log(githubUser);
      
      const freshdeskUserId = await freshdesk.getFreshDeskUserId(username);

      if (!freshdeskUserId) {
        const result = await freshdesk.createFreshdeskContact(githubUser);
        console.log("Contact created successfully!");
        console.log("Contact Id:", result.id);
        return;
      }
      
      console.log(`FreshDesk user found with Id: ${freshdeskUserId}. Updating information!`);
      await freshdesk.updateFreshDeskContact(freshdeskUserId);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Invalid GitHub user.");
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  }

  runSyncProcess() {
    const [username, domain] = process.argv.slice(2);

    const githubToken = process.env.GITHUB_TOKEN;
    const freshdeskToken = process.env.FRESHDESK_TOKEN;

    if (!username || !domain || !githubToken || !freshdeskToken) {
      console.error("Invalid input. Please provide all required parameters.");
      return;
    }

    this.getUserAndSyncContact(username, domain, githubToken, freshdeskToken);
  }
}

const contactSync = new ContactSync();
contactSync.runSyncProcess();
