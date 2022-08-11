const { Multiple_bulkupload, Basic_bulkupload } = require("./main");
const { folder_path } = require("./utils/config");

(async () => {
  // only run single function
  await Multiple_bulkupload()
  // await Basic_bulkupload()
})();