const executeFindFiles = require("./findFiles");
const resolvePromisesSeq = require("./utils/resolvePromiseSeq");
const { folder_path } = require("./utils/config");


// Single folder upload

// (async () => {
//   try {
//     // find files of folder stores
//     const result = await executeFindFiles(folder_path);

//     // Send Data to DMS using Bulk uplod API
//     // const promises = await Promise.all(
//     //   result.map(async (row) => {
//     //     return await sendDataToDMS(row.attachments, row.name);
//     //   })
//     // );
//     await resolvePromisesSeq(result);

//     // console.log(promises);
//   } catch (e) {
//     console.log("error", e);
//   }
// })();


// Multiple folder uplaod upload

const single_folder = async (path) => {
  try {
    // find files of folder stores
    const result = await executeFindFiles(path);

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
}


// mutltiple folder upload

(async function Multiple_folder() {
  for (i = 4; i <= 128; i++) {
    console.log("folder,", folder_path + i);
    await single_folder(folder_path + i);
  }


})()



// resolve promise
const resolvePromises = async (tasks) => {
  await tasks.reduce(async (acc, row) => {
    // wait for previous action to complete
    await acc;

    await single_folder();
  }, Promise.resolve());
};