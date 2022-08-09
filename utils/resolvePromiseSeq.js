const sendDataToDMS = require("../sendDataToDMS");

const resolvePromisesSeq = async (tasks,path) => {
  await tasks.reduce(async (acc, row) => {
    // wait for previous action to complete
    await acc;

   await sendDataToDMS(row.attachments, row.name,path);
  }, Promise.resolve());
};

module.exports = resolvePromisesSeq;
