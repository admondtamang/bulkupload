const util = require("util");
const moment = require("moment");
const fs = require("fs-extra");
const { folder_path } = require("./config");
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
function moveDirectory(dir_name) {
  // create success dir if not created
  if (!fs.existsSync(folder_path+"/success")) {
    fs.mkdirSync(folder_path+"/success");
  }

  const sourceDir = folder_path+"/" + dir_name;
  const destDir =  folder_path+"/success/"+ dir_name;

  fs.move(sourceDir, destDir, (err) => {
    if (err) return console.error(err);
    console.log("success!");
  });
}

/**
 * Generate identifiers for document title
 *
 * @param {*} tag
 * @returns
 */
const getIdentifier = (tag = "GDMS") => {
  return tag + "-" + moment().format("YYYY-MM-DD") + "-" + Date.now();
};

module.exports = { moveDirectory, printObject, getIdentifier };
