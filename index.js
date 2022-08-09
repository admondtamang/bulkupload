const sendDataToDMS = require("./sendDataToDMS");
const executeFindFiles = require("./findFiles");
const { default: axios } = require("axios");
const resolvePromisesSeq = require("./utils/resolvePromiseSeq");

(async () => {
  try {
    // find files of folder stores
    const result = await executeFindFiles(process.env.FOLDER_PATH || "stores");

    // Send Data to DMS using Bulk uplod API
    // const promises = await Promise.all(
    //   result.map(async (row) => {
    //     return await sendDataToDMS(row.attachments, row.name);
    //   })
    // );
    await resolvePromisesSeq(result);

    // console.log(promises);
  } catch (e) {
    console.log("error", e);
  }
})();
