const { default: axios } = require("axios");
const { exit } = require("process");
const { Encrypt } = require("../crypto");

const url = "http://192.168.76.17:60064/api/RetailCtznDms/RetailCtznDmsReq";

/**
 *
 * @returns token
 */
async function channelManager(accountNumber) {
  try {
    const payload=await Encrypt(`{TransactionId: "RCD-11",AccountNumber: ${accountNumber})`);

    const { data } = await axios({
      method: "post",
      url: url,
      data:{Payload:payload},
      // data:`{"Payload": "${payload}"}` ,
      headers: {
        AuthKey:
          "a7aa2f507fae41c3d32f0e7ff1b9cbf5838e9a887049c4337904857d714bfd9af3ad3bfe4cc08cd9462a30546a4529df73b176f1dfac326075bd0ac561201fc0",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhc2hpc2ggdGhhc3MiLCJlbWFpbCI6ImFzaGlzaEBnZW5lcmFsdGVjaG5vbG9neS5jb20ubnAiLCJiaXJ0aGRhdGUiOiIwMDAxLTAxLTAxIiwianRpIjoiOTJkYjRhNjYtNzUzNi00NTIzLWExNjMtODIzMjlhOTFiZTAzIiwiZXhwIjoxNjU1ODA1ODUwLCJpc3MiOiJnZW50ZWNoIiwiYXVkIjoiZ2xvYmFsIn0.HZZvjmONsUpA7tjzcG2SpfjKDz3LMEI2v0HwUAF4ySg",
      },
    });
    return data
  console.log(data);  
  } catch (error) {
    console.log("=============================");
    console.error("Channel manager Error ");
    console.error("Error: ", error);
    console.log("=============================");

    exit();
  }
}

channelManager('0070100000001041')
module.exports = { channelManager };
