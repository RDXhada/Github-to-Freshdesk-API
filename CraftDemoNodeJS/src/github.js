const axios = require("axios");

const getGitHubUser = async (username, token) => {
  const response = await axios.get(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    login: response.data.login,
    name: response.data.name, //we can create/take more information (name might be null)
    email: response.data.email, //we can create/take more information (email might be null)
    id: response.data.id,
  };
};

module.exports = { getGitHubUser };
