const axios = require("axios");
const GitHubAPI = require("../src/GitHubAPI.js");

jest.mock("axios");

class GitHubAPITest {
  constructor() {
    this.token = "your-github-token";
    this.username = "john.doe";
    this.userData = {
      login: "johndoe",
      name: "John Doe",
      email: "johndoe@example.com",
      id: 123456789,
    };
  }

  setupMock() {
    axios.get.mockResolvedValue({ data: this.userData });
  }

  clearMocks() {
    jest.clearAllMocks();
  }

  getExpectedHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  runTests() {
    describe("getUser", () => {
      beforeEach(() => {
        this.setupMock();
      });

      afterEach(() => {
        this.clearMocks();
      });

      it("should return user information", async () => {
        const gitHubAPI = new GitHubAPI(this.token);
        const result = await gitHubAPI.getUser(this.username);

        expect(axios.get).toHaveBeenCalledWith(
          `https://api.github.com/users/${this.username}`,
          expect.objectContaining({
            headers: this.getExpectedHeaders(),
          })
        );

        expect(result).toEqual(this.userData);
      });
    });
  }
}

const testSuite = new GitHubAPITest();
testSuite.runTests();
