const path = require("path");
const excludeFileTypes = [".exe", ".DS_Store","success"];
const fs = require("fs-extra");
const { base64_encode } = require("./utils/createBase64");

var attachments = [];
let result = [],
  document_name = "",
  document = {},
  count = 0;

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

/**
 *
 * Scan folder and files
 *
 * @param {String} folderName
 */
async function findFiles(folderName) {
  let items = [];
  // list folders
  try {
    items = await fs.readdir(folderName, { withFileTypes: true });
  } catch (error) {
    console.log("not a folder", error);
  }

  // donot include file extension
  items = items.filter((row) => !excludeFileTypes.includes(row.name));

  // File name
  document_name = folderName;

  // Browser folders
  await Promise.all(
    items.map(async (item) => {
      document = { name: folderName };
      const filePath = path.join(folderName, item.name);

      // file found with following extension
      if (path.extname(item.name) === ".pdf") {
        const encoded_data = base64_encode(filePath);

        const attach = {
          src: "data:application/pdf;base64," + encoded_data,
          type: "application/pdf",
          name: item.name,
          file: {
            originalname: item.name,
            size: 12654,
            mimetype: "application/pdf",
          },
        };
        attachments.push(attach);
        result[count] = { ...document, attachments };

        console.log(`Found file: ${filePath} ${count} in folder: ${folderName}`);
      } else {
        // find next folder if finish finding files
        await findFiles(filePath);
      }
    })
  ); // End of Promise

  // reset parameters and count document
  attachments = [];
  document = {};
  count = count + 1;
  console.log("=============================");
  console.log("Finish Document ", folderName, count);
  console.log("=============================");
}

module.exports = executeFindFiles;
