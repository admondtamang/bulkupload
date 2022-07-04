const path = require("path");
const excludeFileTypes = [".exe", ".DS_Store"];
const fs = require("fs-extra");
const { moveDirectory, printObject } = require("./utils");

let result = [];

let attachments = [];
let document = {};
let count = 0;

/**
 *
 * Scan folder and files
 *
 * @param {String} folderName
 */
async function findFiles(folderName) {
  // list folders
  let items = await fs.readdir(folderName, { withFileTypes: true });

  // Browser folders
  await Promise.all(
    items.map(async (item) => {
      document = { name: folderName };
      const filePath = await path.join(folderName, item.name);

      // donot include file extension
      if (excludeFileTypes.includes(item.name)) return;

      // file found
      if (path.extname(item.name) === ".json") {
        attachments.push(filePath);
        result[count] = { ...document, attachments };

        console.log(
          `Found file: ${filePath} ${count} in folder: ${folderName}`
        );
      } else {
        // find next folder if finish finding files
        await findFiles(filePath);
      }
    })
  );

  // reset parameters and count document
  attachments = [];
  document = {};
  count = count + 1;
  // moveDirectory('23121');

  console.log("=============================");
  console.log("Finish Document ", folderName, count);
  console.log("=============================");
}

/**
 *
 * Execute find files
 *
 * @param {*} name
 * @returns list of documents with attachment.
 */
async function executeFindFiles(name) {
  await findFiles(name);
  return result;
}
module.exports = executeFindFiles;