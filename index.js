const executeFindFiles = require("./findFiles");
const resolvePromisesSeq = require("./utils/resolvePromiseSeq");
const { folder_path } = require("./utils/config");


// Single folder upload

// (async () => {
//   try {
//     // find files of folder stores
//     const result = await executeFindFiles(folder_path);

//     await resolvePromisesSeq(result);

//   } catch (e) {
//     console.log("error", e);
//   }
// })();


// Multiple folder uplaod upload
const single_folder = async (path) => {
  try {
    // find files of folder stores
    const result = await executeFindFiles(path);

    await resolvePromisesSeq(result, path);

    // console.log(promises);
  } catch (e) {
    console.log("error", e);
  }
}


// mutltiple folder upload
(async function Multiple_folder() {
  // 128
  for (i = 1; i <= 128; i++) {
    await single_folder(folder_path + i);
  }

})()
