const axios = require("axios");
const FreshdeskAPI= require("../src/freshdesk.js");
// const { FreshdeskAPI, getFreshDeskUserId } = require("../src/freshdesk.js");

jest.mock("axios");

describe("getFreshDeskUserId", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the user ID if a matching contact is found", async () => {
    const username = "jane.doe";
    const domain = "example";
    const freshdeskToken = "your-token";

    const responseData = [
      {
        id: 1070000800140,
      },
    ];

    axios.get.mockResolvedValue({ data: responseData });

    const freshdesk = new FreshdeskAPI(domain, freshdeskToken);
    const result = await freshdesk.getFreshDeskUserId(username);

    expect(axios.get).toHaveBeenCalledWith(
      `https://${domain}.freshdesk.com/api/v2/contacts?email=${username.toLowerCase()}@example.com`,
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + Buffer.from(freshdeskToken + ":X").toString("base64"),
        },
      })
    );

    expect(result).toEqual(responseData[0].id);
  });

  it("should return null if no matching contact is found", async () => {
    const username = "jane.doe";
    const domain = "example";
    const freshdeskToken = "your-token";

    const responseData = [];

    axios.get.mockResolvedValue({ data: responseData });

    const freshdesk = new FreshdeskAPI(domain, freshdeskToken);
    const result = await freshdesk.getFreshDeskUserId(username);

    expect(axios.get).toHaveBeenCalledWith(
      `https://${domain}.freshdesk.com/api/v2/contacts?email=${username.toLowerCase()}@example.com`,
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + Buffer.from(freshdeskToken + ":X").toString("base64"),
        },
      })
    );

    expect(result).toBeNull();
  });
});
