const axios = require("axios");

class FreshdeskAPI {
  constructor(domain, freshdeskToken) {
    this.domain = domain;
    this.freshdeskToken = freshdeskToken;
    this.apiBaseUrl = `https://${this.domain}.freshdesk.com/api/v2/`;
  }

  //function to create a freshdesk contact using the given GitHub user information
  async createFreshdeskContact(githubUser) {
    try {
      const response = await axios.post(
        `${this.apiBaseUrl}contacts`,
        {
          name: githubUser.login,
          email: `${githubUser.login}@example.com`,
          unique_external_id: githubUser.id,
        },
        this.getRequestConfig()
      );

      return response.data;
    } catch (error) {
      throw new Error("[Failed to create Freshdesk contact]");
    }
  }

  //function to update a Freshdesk contact by updating the unique external ID
  async updateFreshDeskContact(contactId) {
    try {
      const newUniqueExternalId = this.generateUniqueExternalId();

      await axios.put(
        `${this.apiBaseUrl}contacts/${contactId}`,
        {
          unique_external_id: newUniqueExternalId,
        },
        this.getRequestConfig()
      );

      console.log("Contact's 'unique_external_id' updated successfully!");
    } catch (error) {
      throw new Error("[Failed to update Freshdesk contact]");
    }
  }

  //function to check if a freshdesk contact exists by searching with a given email
  //if the contact exists, return the Freshdesk ID (which cannot be changed)
  async getFreshDeskUserId(username) {
    try {
      const response = await axios.get(
        `${this.apiBaseUrl}contacts?email=${username.toLowerCase()}@example.com`,
        this.getRequestConfig()
      );
  
      if (response.data.length > 0) {
        return response.data[0].id;
      }
  
      return null;
    } catch (error) {
      if (error.response) {
        //more error handling can be added here depending on the status
        if (error.response.status === 401) {
          throw new Error("[invalid Freshdesk token].");
        } else if (error.response.status === 404) {
          throw new Error("[invalid Freshdesk domain].");
        }
      }
      throw new Error("[Failed to retrieve Freshdesk contact]"); // Catch any other error
    }
  }

  //helper method to get the request configuration with headers
  getRequestConfig() {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${this.freshdeskToken}:X`
        ).toString("base64")}`,
      },
    };
  }
  
  //helper method to generate a random unique external ID
  generateUniqueExternalId() {
    return Math.floor(Math.random() * 90000) + 10000;
  }

}

module.exports = FreshdeskAPI;
