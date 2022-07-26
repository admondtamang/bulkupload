const sendDataToDMS = require("../sendDataToDMS");

const resolvePromisesSeq = async (tasks) => {
  await tasks.reduce(async (acc, row) => {
    // wait for previous action to complete
    await acc;

    await sendDataToDMS(row.attachments, row.name);
  }, Promise.resolve());
};

module.exports = resolvePromisesSeq;
