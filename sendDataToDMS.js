const { default: axios } = require("axios");
const { exit } = require("process");
const { getIdentifier, printObject, moveDirectory } = require("./utils");
const { channelManager } = require("./utils/api/channelmanger");
const { login } = require("./utils/api/login");
const writeToFile = require("./utils/writeToFile");

const url = "http://localhost:8181/api/attachment/bulk-attachment-upload";

/**
 *
 * @param {string} document_name
 */
async function sendDataToDMS(attachments, document_name) {
  // get file name
  document_name = document_name.split("\\")[1] || "Document";

  const api_result = await channelManager();
   
  console.log(channel_manager_data.Data);

  // Send request to DMS
  const doc = {
    identifier: getIdentifier(),
    otherTitle: document_name,
    documentTypeId: "1",
    documentIndex: [
      {
        documentIndexId: 28, // static
        value: api_result?.AccountName,
      },
      {
        documentIndexId: 29,
        value: api_result?.AccountNumber
      },{
        documentIndexId: 30,
        value: api_result?.CifId
      },{
        documentIndexId: 31,
        value: api_result?.BranchCode
      },{
        documentIndexId: 32,
        value: api_result?.CustDob
      },
    ],
  };

  // Add indicies in attachments
  attachments = attachments.map((row) => {
    row.documentIndex = [
      {
        documentIndexId: 28, // static
        value: "fsd",
      },
      {
        documentIndexId: 29,
        value: "aaa",
      },
    ];
    return row;
  });

  const form_data = {
    selectedFiles: [
      {
        document: doc,
        attachments,
      },
    ],
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  };

  console.log("login");
  // get token
  const token = await login();

  // payload send to dms
  writeToFile(form_data);
  writeToFile(token, "token.txt");

  // api call to dms
  try {
    console.log("Request send to DMS : ", document_name, " Contains :", attachments.length);

    const { data } = await axios({
      method: "post",
      url: url,
      data: JSON.stringify(form_data),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        Authorization: `Admin ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Document Upload Success");
    // Move Directory to succes
    if (data == "Success!") moveDirectory(document_name);
  } catch (error) {
    console.log("=============================");
    console.error("Folder error At: ");
    console.error("Error: ", error, error.message);
    console.log("=============================");
    exit();
  }
}

module.exports = sendDataToDMS;
