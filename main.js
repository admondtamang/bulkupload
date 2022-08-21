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
    let x = 0,
        y = 0,
        z = 0,
        i, num;

    for (i = 1; i <= numberOfFolders; i++) {
        z++;

        if (z > 9) {
            y++;
            z = 0;
        }

        if (y > 9) {
            x++;
            y = 0;
        }

        x = x.toString();

        num = x + y + z

        console.log("Path: ", folder_path + num);
        await Basic_bulkupload(folder_path + num);
    }

}

module.exports = { Multiple_bulkupload, Basic_bulkupload }