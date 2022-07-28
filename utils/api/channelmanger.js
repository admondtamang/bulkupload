const { default: axios } = require("axios");
const { exit } = require("process");

const url = "http://localhost:8181/api/signin";

/**
 *
 * @returns token
 */
async function channelManager() {
  //localhost:8181/api/signin
  try {
    const { data } = await axios({
      method: "post",
      url: url,
      data: {
        email: "admin@gentech.com",
        password: "admin123",
        remember: false,
      },
    });
    token = data.user.token;

    return token;
  } catch (error) {
    console.log("=============================");
    console.error("Login Error ");
    console.error("Error: ", error.message);
    console.log("=============================");

    exit();
  }
}

module.exports = { channelManager };
