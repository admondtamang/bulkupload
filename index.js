const executeFindFiles = require("./findFiles");
const { printObject } = require("./utils");

(async () => {
  try {
    // find files of folder stores
    const result = await executeFindFiles("stores");

    // printObject(result);
  } catch (e) {
    console.log("error", e);
  }
})();
