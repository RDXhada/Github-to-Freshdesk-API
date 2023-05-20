require("dotenv").config();
const ContactSync = require("./contactSync.js");

//separate class to run the program, fullfiling the single responsibility requirement
class RunApp {
  static async runSyncProcess() {
    const [username, domain] = process.argv.slice(2);
    const githubToken = process.env.GITHUB_TOKEN;
    const freshdeskToken = process.env.FRESHDESK_TOKEN;
    
    if (!username || !domain || !githubToken || !freshdeskToken) {
      console.error("Invalid input. Please provide all required parameters.");
      return;
    }
    const contactSync = new ContactSync();
    await contactSync.getUserAndSyncContact(username, domain, githubToken, freshdeskToken);
  }

}

RunApp.runSyncProcess();
