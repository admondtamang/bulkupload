const executeFindFiles = require("./findFiles");
const resolvePromisesSeq = require("./utils/resolvePromiseSeq");
const { folder_path } = require("./utils/config");


// Single folder upload

const Basic_bulkupload = async (path) => {
    try {
        // find files of folder stores
        const result = await executeFindFiles(path || folder_path);

        await resolvePromisesSeq(result, path || false);

    } catch (e) {
        console.log("error", e);
    }
}


// mutltiple folder upload
const Multiple_bulkupload = async () => {
    const numberOfFolders = 3 //128
    for (i = 1; i <= numberOfFolders; i++) {
        await Basic_bulkupload(folder_path + i);
    }

}

module.exports = { Multiple_bulkupload, Basic_bulkupload }