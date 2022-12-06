const path = require("path");
const excludeFileTypes = [".exe", ".DS_Store", "success","failure"];
const fs = require("fs-extra");
const { base64_encode } = require("./utils/createBase64");
const writeToFile = require("./utils/writeToFile");
const { limit } = require("./utils/config");

/**
 *
 * Execute find files
 *
 * @param {*} name
 * @returns list of documents with attachment.
 */
async function executeFindFiles(name) {

  let attachments = [];
  let result = [],
    document_name = "",
    document = {},
    count = 0;
  
  await findFiles(name);


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
     writeToFile(folderName, 'error/folder_not_found.txt', true)

    console.log("not a folder", error);
  }

  if (folderName == "success")
    await findFiles(filePath);

  // donot include file extension
  items = items.filter((row) => !excludeFileTypes.includes(row.name));
  items=limit>0? items.splice(0,limit):items

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
        // await writeToFile(attach.name, "attachments.txt",true);
        
        result[count] = { ...document, attachments };

        console.log(`Found file: ${filePath} ${count} in folder: ${folderName}`);
      } else {
        console.log(result.length);

        // await writeToFile("=============================", "attachments.txt",true);
        console.log("=============================");

        // find next folder if finish finding files
        // if(result.length<=10)
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
return result;
}

module.exports = executeFindFiles;
