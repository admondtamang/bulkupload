const fs = require("fs");
/**
 * Output content to file
 * @param {String} content
 * @param {String} location
 */
function writeToFile(content, location = "test.txt", append) {

  if (append)
    fs.appendFileSync(location, JSON.stringify(content), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File write success", location);
    });
  else
    fs.writeFileSync(location, JSON.stringify(content), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File write success", location);
    });
}

module.exports = writeToFile;
