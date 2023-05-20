// const dotenv = require("dotenv");
const GitHubAPI = require("./GitHubAPI.js");
const FreshdeskAPI = require("./FreshdeskAPI.js");

//maybe we can make a map for error handling
// const map = {
//   404: NotFoundError,
//   400: BadRequestError
//   //more errors
//   }
//and use : 
//throw new map[error.statusCode](error.response.message, error);  [ this should be in
//GitHubAPI.js and FreshdeskAPI.js ]

class ContactSync {
  // constructor() {
  //   dotenv.config();
  // }

  async getUserAndSyncContact(username, domain, githubToken, freshdeskToken) {
    try {
      //get the github users information
      const github = new GitHubAPI(githubToken);
      //get the contact info 
      const freshdesk = new FreshdeskAPI(domain, freshdeskToken);

      //output github user info 
      const githubUser = await github.getUser(username);
      console.log(githubUser);
      //get the id of the freshdesk contact
      const freshdeskUserId = await freshdesk.getFreshDeskUserId(username);
      //if the id is not found hence null, create a new freshdesk contact
      if (!freshdeskUserId) {
        const result = await freshdesk.createFreshdeskContact(githubUser);
        console.log("Contact created successfully!");
        console.log("Contact Id:", result.id);
        return;
      }
      //if it has been found, update its unique external id (more properties can be updated in the future)
      console.log(`FreshDesk user found with Id: ${freshdeskUserId}. Updating information!`);
      await freshdesk.updateFreshDeskContact(freshdeskUserId);
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
  }

}

module.exports = ContactSync;
