const axios = require("axios");

class GitHubAPI {
  constructor(token) {
    this.token = token;
  }
  //function to get GitHub user information
  async getUser(username) {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return {
        login: response.data.login,
        name: response.data.name,
        email: response.data.email,
        id: response.data.id,
      };
    } catch (error) {
      if (error.response) {
        //more error handling can be added here depending on the status
        if (error.response.status === 404) {
          throw new Error("[Invalid GitHub user]");
        } else if (error.response.status === 401) {
          throw new Error("[Invalid Github token]");
        }
      }
      throw new Error("[Failed to fetch GitHub user]"); // Catch any other error
    }
  }
}

module.exports = GitHubAPI;
