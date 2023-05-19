const axios = require("axios");

class FreshdeskAPI {
  constructor(domain, freshdeskToken) {
    this.domain = domain;
    this.freshdeskToken = freshdeskToken;
    this.apiBaseUrl = `https://${this.domain}.freshdesk.com/api/v2/`;
  }

  //function to create a freshdesk contact using the given gitHub user information
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
      throw new Error("Failed to create Freshdesk contact.");
    }
  }

  // Function to update a Freshdesk contact by updating the unique external ID
  async updateFreshDeskContact(contactId) {
    try {
      const newUniqueExternalId = Math.floor(Math.random() * 90000) + 10000;

      await axios.put(
        `${this.apiBaseUrl}contacts/${contactId}`,
        {
          unique_external_id: newUniqueExternalId,
        },
        this.getRequestConfig()
      );

      console.log("Contact's 'unique_external_id' updated successfully!");
    } catch (error) {
      throw new Error("Failed to update Freshdesk contact.");
    }
  }

  //function to check if a freshdesk contact exists by searching with a given email
  //if the contact exists, return the reshdesk ID (which cannot be changed)
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
      throw new Error("Failed to retrieve Freshdesk contact[invalid domain].");
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
}

module.exports = FreshdeskAPI;
