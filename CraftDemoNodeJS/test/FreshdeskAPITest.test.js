const axios = require("axios");
const FreshdeskAPI = require("../src/FreshdeskAPI.js");

jest.mock("axios");

class FreshdeskAPITest {
  constructor() {
    this.username = "jane.doe";
    this.domain = "example";
    this.freshdeskToken = "your-token";
    this.responseData = [
      {
        id: 1070000800140,
      },
    ];
    this.emptyResponseData = [];
  }

  setupMock() {
    axios.get.mockResolvedValue({ data: this.responseData });
  }

  clearMocks() {
    jest.clearAllMocks();
  }

  getExpectedHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from(this.freshdeskToken + ":X").toString("base64"),
    };
  }

  runTests() {
    describe("getFreshDeskUserId", () => {
      beforeEach(() => {
        this.setupMock();
      });

      afterEach(() => {
        this.clearMocks();
      });

      it("should return the user ID if a matching contact is found", async () => {
        const freshdesk = new FreshdeskAPI(
          this.domain,
          this.freshdeskToken
        );
        const result = await freshdesk.getFreshDeskUserId(this.username);

        expect(axios.get).toHaveBeenCalledWith(
          `https://${this.domain}.freshdesk.com/api/v2/contacts?email=${this.username.toLowerCase()}@example.com`,
          expect.objectContaining({
            headers: this.getExpectedHeaders(),
          })
        );

        expect(result).toEqual(this.responseData[0].id);
      });

      it("should return null if no matching contact is found", async () => {
        axios.get.mockResolvedValue({ data: this.emptyResponseData });

        const freshdesk = new FreshdeskAPI(
          this.domain,
          this.freshdeskToken
        );
        const result = await freshdesk.getFreshDeskUserId(this.username);

        expect(axios.get).toHaveBeenCalledWith(
          `https://${this.domain}.freshdesk.com/api/v2/contacts?email=${this.username.toLowerCase()}@example.com`,
          expect.objectContaining({
            headers: this.getExpectedHeaders(),
          })
        );

        expect(result).toBeNull();
      });
    });
  }
}

const testSuite = new FreshdeskAPITest();
testSuite.runTests();
