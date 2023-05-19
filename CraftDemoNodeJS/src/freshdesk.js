const axios = require("axios");
const createFreshdeskContact = async (githubUser, domain, freshdeskToken) => {
  const response = await axios.post(
    `https://${domain}.freshdesk.com/api/v2/contacts`,
    {
      name: githubUser.login,
      email: `${githubUser.login}@example.com`,
      unique_external_id: githubUser.id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${freshdeskToken}:X`).toString(
          "base64"
        )}`,
      },
    }
  );

  return response.data;
};

const updateFreshDeskContact = async (contactId, domain, freshdeskToken) => {
  const new_unique_external_id = Math.floor(Math.random() * 90000) + 10000;

  await axios.put(
    `https://${domain}.freshdesk.com/api/v2/contacts/${contactId}`,
    {
      unique_external_id: new_unique_external_id, // Replace with the new unique external ID
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${freshdeskToken}:X`).toString(
          "base64"
        )}`,
      },
    }
  );

  console.log("Contact's 'unique_external_id' updated successfully!");
};

const getFreshDeskUserId = async (username, domain, freshdeskToken) => {
  const response = await axios.get(
    `https://${domain}.freshdesk.com/api/v2/contacts?email=${username.toLowerCase()}@example.com`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(freshdeskToken + ":X").toString("base64"),
      },
    }
  );

  if (response.data.length > 0) {
    return response.data[0].id;
  }

  return null;
};

module.exports = {
  createFreshdeskContact,
  updateFreshDeskContact,
  getFreshDeskUserId,
};
