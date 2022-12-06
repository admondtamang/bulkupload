const { Multiple_bulkupload, Basic_bulkupload } = require("./main");

(async () => {
  // only run single function
  await Multiple_bulkupload()
  // await Basic_bulkupload()
})();