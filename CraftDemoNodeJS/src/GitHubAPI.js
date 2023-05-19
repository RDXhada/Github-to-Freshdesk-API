const axios = require("axios");

class GitHubAPI {
  constructor(token) {
    this.token = token;
  }
//function to get github users information
  async getUser(username) {
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
  }
}

module.exports = GitHubAPI;
