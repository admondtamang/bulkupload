const path = require("path");
const excludeFileTypes = [".exe", ".DS_Store"];
const fs = require("fs-extra");
const { moveDirectory, printObject } = require("./utils");
const { default: axios } = require("axios");
const FormData = require("form-data");
const { exit } = require("process");

let result = [],
  attachments = [],
  document = {},
  count = 0;

const url = "http://localhost:8181/api/bpm-document";

/**
 *
 * Scan folder and files
 *
 * @param {String} folderName
 */
async function findFiles(folderName) {
  // list folders
  let items = await fs.readdir(folderName, { withFileTypes: true });

  // donot include file extension
  items = items.filter((row) => !excludeFileTypes.includes(row.name));

  console.log(items);
  // Browser folders
  await Promise.all(
    items.map(async (item) => {
      document = { name: folderName };
      const filePath = await path.join(folderName, item.name);

      // file found with following extension
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

  // Send request to DMS
  const form_data = new FormData();
  attachments.map((file) => {
    form_data.append("files", fs.createReadStream(file));
  });

  try {
    const { data } = await axios({
      method: "post",
      url: url,
      data: form_data,
      headers: form_data.getHeaders(),
    });
    console.log(data);
  } catch (error) {
    console.log("=============================");
    console.error("Folder error At: ", folderName);
    console.error("Error: ", error.message);
    console.log("=============================");

    exit();
  }

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
