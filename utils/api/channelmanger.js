const { default: axios } = require("axios");
const { exit } = require("process");
const { Encrypt } = require("../crypto");

const url = "http://192.168.82.80:8088/api/RetailCtznDms/RetailCtznDmsReq";

/**
 *
 * @returns token
 */
async function channelManager(accountNumber) {
  try {
    const payload = await Encrypt(`{"TransactionId": "RCD-11","AccountNumber": "${accountNumber}"}`);
    console.log("Connecting with Bank API through Channel Manager API ",payload,accountNumber)

    const { data } = await axios({
      method: "post",
      url: url,
      data: `{"Payload": "${payload}"}`,
      headers: {
        'Content-Type': 'application/json',
        'AuthKey':
          "fef050171efc46c03d237bc467cae61d07b10809d3c93889afe2c2a5a5fcfd1e846c1ae41be5f8aae22ff93de8008299bf27d9a67495ff30c91e8699a40e49bf",
        'Authorization':
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhc2hpc2ggdGhhc3MiLCJlbWFpbCI6ImFzaGlzaEBnZW5lcmFsdGVjaG5vbG9neS5jb20ubnAiLCJiaXJ0aGRhdGUiOiIwMDAxLTAxLTAxIiwianRpIjoiNDVhZjM0ZmEtOWEzMC00ODFkLWIxNmItMDAyMWFkYzY0MDRlIiwiZXhwIjoxNjYxMjI4NDM5LCJpc3MiOiJnZW50ZWNoIiwiYXVkIjoiZ2xvYmFsIn0.3Kzz90Mq8aXA8Uaz9S0_CWKOAEXkLai98FFz8FgTRoA",
      },
    });
    console.log(JSON.parse(data.data).Data);

    return JSON.parse(data.data).Data
  } catch (error) {
    console.log("=============================");
    console.error("Channel manager Error ");
    console.error("Error: ", error);
    console.log("=============================");

    exit();
  }
}

// channelManager('0070100000001041')
// channelManager('0010100001280013')
module.exports = { channelManager };
