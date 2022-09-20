const util = require("util");
const moment = require("moment");
const fs = require("fs-extra");
const { folder_path } = require("./config");
const { exit } = require("process");
const writeToFile = require("./writeToFile");
/**
 * Display object
 *
 * @param {*} obj
 */
function printObject(obj) {
  console.log(util.inspect(obj, false, null, true /* enable colors */));
}

/**
 * Move folder after completion of request.
 *
 * @param {string} dir_name
 */
async function moveDirectory(dir_name, path) {
  let folder = folder_path
  if (path)
    folder = path

  // create success dir if not created
  if (!fs.existsSync(folder + "/success")) {
  await  fs.mkdirSync(folder + "/success");
  }

  const sourceDir = folder + "/" + dir_name;
  const destDir = folder + "/success/" + dir_name;

  try {
   await fs.moveSync(sourceDir, destDir, (err) => {
      if (err) {
        console.log(folder, "====");
        console.error(err);
        exit()
      }
      
    });

    await writeToFile(sourceDir, "success.txt");

    console.log(sourceDir," = Move to success folder");
  } catch (error) {
    const content = "Cannot move: " + sourceDir
    writeToFile(content, "error.txt");
    console.log(content);
  }
}

/**
 * Generate identifiers for document title
 *
 * @param {*} tag
 * @returns
 */
function getIdentifier(tag = "GDMS")  {
  return tag + "-" + moment().format("YYYY-MM-DD") + "-" + Date.now();
};

module.exports = { moveDirectory, printObject, getIdentifier };
