const executeFindFiles = require("./findFiles");
const { printObject } = require("./utils");

(async () => {
  try {
    // find files of folder stores
    const result = await executeFindFiles("stores");
  } catch (e) {
    console.log("error", e);
  }
})();
