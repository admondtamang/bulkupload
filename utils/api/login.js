const { default: axios } = require("axios");
const { exit } = require("process");

const login_url = "http://192.168.82.80:8181/api/signin";

/**
 *
 * @returns token
 */
async function login() {
  //localhost:8181/api/signin
  try {
    const { data } = await axios({
      method: "post",
      url: login_url,
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

module.exports = { login };
