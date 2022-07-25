const util = require("util");
const moment = require("moment");

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
  const sourceDir = "stores/" + dir_name;
  const destDir = "success/" + dir_name;

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
