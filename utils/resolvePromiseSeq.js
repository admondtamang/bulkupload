const sendDataToDMS = require("./sendDataToDMS");
const writeToFile = require("./writeToFile");

const resolvePromisesSeq = async (tasks, path) => {
  await tasks.reduce(async (acc, row) => {
    // wait for previous action to complete
    await acc;

    writeToFile({name:row.name,length:row.attachments?.length}, 'error/uload_attach.txt', true)
    
    await sendDataToDMS(row.attachments, row.name, path);
  }, Promise.resolve());
};

module.exports = resolvePromisesSeq;
