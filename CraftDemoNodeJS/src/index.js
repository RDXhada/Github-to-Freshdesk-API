require("dotenv").config();
const GitHubAPI = require("./github.js");
const FreshdeskAPI = require("./freshdesk.js");

//function to get the github user and create/update a contact 
//in freshdesk depending on the condition
async function getUserAndSyncContact(username, domain, githubToken, freshdeskToken) {
  try {
    //get github user
    const github = new GitHubAPI(githubToken);
    const freshdesk = new FreshdeskAPI(domain, freshdeskToken);
    //get github user info 
    const githubUser = await github.getUser(username);
    console.log(githubUser);
    //get freshdesk id by a given email (@example.com), return the id that cannot be changed [of the contact]
    const freshdeskUserId = await freshdesk.getFreshDeskUserId(username);

    //if id is null, create a contact
    if (!freshdeskUserId) {
      const result = await freshdesk.createFreshdeskContact(githubUser);
      console.log("Contact created successfully!");
      console.log("Contact Id:", result.id);
      return;
    }
    //otherwise update the contact by changing its unique external id
    console.log(`FreshDesk user found with Id: ${freshdeskUserId}. Updating information!`);
    await freshdesk.updateFreshDeskContact(freshdeskUserId);
  } catch (error) {
    //if github user doesnt exist, handle the error
    if (error.response && error.response.status === 404) {
      console.error("Invalid GitHub user.");
    } else {
      console.error("An error occurred:", error.message);
    }
  }
}

//function to run the program
function runSyncProcess() {
  const [username, domain] = process.argv.slice(2);

  const githubToken = process.env.GITHUB_TOKEN;
  const freshdeskToken = process.env.FRESHDESK_TOKEN;

  if (!username || !domain || !githubToken || !freshdeskToken) {
    console.error("Invalid input. Please provide all required parameters.");
    return;
  }

  getUserAndSyncContact(username, domain, githubToken, freshdeskToken);
}

runSyncProcess();
