const fs = require("fs");
const { consoleLog } = require("./consoleLog");
/**
 * Output content to file
 * @param {String} content
 * @param {String} location
 */
function writeToFile(content, location = "test.txt", append) {
  
  if (!fs.existsSync('error')) {
    fs.mkdirSync('error')
  }

  if (append) {
  
    // create file if not created
    if (!fs.existsSync(location)) {
      fs.writeFileSync(location, JSON.stringify(content) + "\n", (err) => {
        if (err) {
          console.error(err);
          return;
        }
        consoleLog("File write success", location);
      });
    }
  
    // check for content exists
    var text = fs.readFileSync(location).toString("utf-8");
    var array = text.split("\n");


    temp_content= '"' + content + '"';
    
  if (array.includes(temp_content)) return;


    // append file content
    fs.appendFileSync(location, JSON.stringify(content) + "\n", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      consoleLog("File write success", location);
    });
  } else
    fs.writeFileSync(location, JSON.stringify(content) + "\n", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      consoleLog("File write success", location);
    });
}

module.exports = writeToFile;