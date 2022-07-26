const fs = require("fs");
/**
 * Output content to file
 * @param {String} content
 * @param {String} location
 */
function writeToFile(content, location = "test.txt") {
  fs.writeFile(location, JSON.stringify(content), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File write success", location);
  });
}

module.exports = writeToFile;
