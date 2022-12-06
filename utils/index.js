const util = require("util");
const moment = require("moment");
const fs = require("fs-extra");
const { folder_path } = require("./config");
const { exit } = require("process");
const writeToFile = require("./writeToFile");
const { consoleLog } = require("./consoleLog");
/**
 * Display object
 *
 * @param {*} obj
 */
function printObject(obj) {
  consoleLog(util.inspect(obj, false, null, true /* enable colors */));
}

/**
 * Move folder after completion of request.
 *
 * @param {string} dir_name
 */
async function moveDirectory(dir_name, path, preffered_dest) {
  let folder = folder_path;
  if (path) folder = path;

  // create success dir if not created
  if (!fs.existsSync(folder + "/success")) {
    await fs.mkdirSync(folder + "/success");
  }
  if (!fs.existsSync(folder + "/failure")) {
    await fs.mkdirSync(folder + "/failure");
  }

  if (preffered_dest && !fs.existsSync(folder_path + preffered_dest)) {
    await fs.mkdirSync(folder_path + preffered_dest);
  }

  if (preffered_dest) preffered_dest = folder_path + preffered_dest + "/" + dir_name;

  const sourceDir = folder + "/" + dir_name;
  const destDir = folder + "/success/" + dir_name;

  try {
    await fs.moveSync(sourceDir, preffered_dest || destDir);

    await writeToFile(dir_name + `${preffered_dest ? ",failure" : ", success"}`, "result.csv", true);

    consoleLog(`${preffered_dest ? "❌ ❌ ❌ ❌" : "✅  ✅  ✅  ✅"} = Move to ${preffered_dest || "success folder"}`);
  } catch (error) {
    await writeToFile(dir_name + ", failure", "result.csv", true);
    const content = "Cannot move: " + sourceDir + path + destDir + preffered_dest;
    writeToFile(content, "error.txt", error);
    consoleLog(content, error);
  }
}

/**
 * Generate identifiers for document title
 *
 * @param {*} tag
 * @returns
 */
function getIdentifier(tag = "GDMS") {
  return tag + "-" + moment().format("YYYY-MM-DD") + "-" + Date.now();
}

module.exports = { moveDirectory, printObject, getIdentifier };