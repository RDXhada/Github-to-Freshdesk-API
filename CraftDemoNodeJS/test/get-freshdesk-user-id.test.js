const axios = require("axios");
const { getFreshDeskUserId } = require("../src/freshdesk.js");

jest.mock("axios");

describe("getFreshDeskUserId", () => {
  it("should return the user ID if a matching contact is found", async () => {
    const username = "jane.doe";
    const domain = "example";
    const freshdeskToken = "your-token";

    const responseData = [
      {
        id: 1070000800140,
      },
    ];

    const axiosResponse = {
      data: responseData,
    };

    axios.get.mockResolvedValue(axiosResponse);

    const result = await getFreshDeskUserId(username, domain, freshdeskToken);

    expect(axios.get).toHaveBeenCalledWith(
      `https://${domain}.freshdesk.com/api/v2/contacts?email=${username.toLowerCase()}@example.com`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + Buffer.from(freshdeskToken + ":X").toString("base64"),
        },
      }
    );

    expect(result).toEqual(responseData[0].id);
  });

  it("should return null if no matching contact is found", async () => {
    const username = "jane.doe";
    const domain = "example";
    const freshdeskToken = "your-token";

    const responseData = [];

    const axiosResponse = {
      data: responseData,
    };

    axios.get.mockResolvedValue(axiosResponse);

    const result = await getFreshDeskUserId(username, domain, freshdeskToken);

    expect(axios.get).toHaveBeenCalledWith(
      `https://${domain}.freshdesk.com/api/v2/contacts?email=${username.toLowerCase()}@example.com`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + Buffer.from(freshdeskToken + ":X").toString("base64"),
        },
      }
    );

    expect(result).toBeNull();
  });
});
