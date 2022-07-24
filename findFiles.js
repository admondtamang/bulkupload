const path = require("path");
const excludeFileTypes = [".exe", ".DS_Store"];
const fs = require("fs-extra");
const { moveDirectory, printObject } = require("./utils");
const { default: axios } = require("axios");
const FormData = require("form-data");
const { exit } = require("process");
const executePython = require("./utils/executePython");
const { base64_encode } = require("./createBase64");

var attachments = [];
let result = [],
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
  let items = [];
  // list folders
  try {
    items = await fs.readdir(folderName, { withFileTypes: true });
  } catch (error) {
    console.log("not a folder", error);
  }

  // donot include file extension
  items = items.filter((row) => !excludeFileTypes.includes(row.name));

  console.log(items);
  // Browser folders
  await Promise.all(
    items.map(async (item) => {
      document = { name: folderName };
      const filePath = await path.join(folderName, item.name);

      // file found with following extension
      if (path.extname(item.name) === ".pdf") {
        const encoded_data = base64_encode(filePath);

        const attach = {
          src: "data:application/pdf;base64,",
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
  // const form_data = new FormData();
  // attachments.map((file) => {
  //   form_data.append("files", fs.createReadStream(file));
  // });

  // try {
  //   const { data } = await axios({
  //     method: "post",
  //     url: url,
  //     data: form_data,
  //     headers: form_data.getHeaders(),
  //   });
  //   console.log(data);
  // } catch (error) {
  //   console.log("=============================");
  //   console.error("Folder error At: ", folderName);
  //   console.error("Error: ", error.message);
  //   console.log("=============================");

  //   // exit();
  // }

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
