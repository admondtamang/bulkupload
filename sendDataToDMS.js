const { default: axios } = require("axios");
const { exit } = require("process");
const { CITIZEN_DOCUMENTS, DOCUMENT_TYPE } = require("./constants/constant_citizen");
const { getIdentifier, printObject, moveDirectory } = require("./utils");
const { channelManager } = require("./utils/api/channelmanger");
const { login } = require("./utils/api/login");
const writeToFile = require("./utils/writeToFile");

const url = "http://localhost:8181/api/attachment/bulk-attachment-upload";

/**
 *
 * Send data to dms through API
 * @param {Array} attachments
 * @param {string} document_name
 */
async function sendDataToDMS(attachments, document_name) {
  try {
    // get file name
    document_name = document_name.split("\\")[1];

  } catch (error) {
    console.log("Error== Folder name - cannot extract account number");
    console.log(error);
    exit()
  }

  // Get data from channel manager  
  const api_result = await channelManager(document_name);

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
      }, {
        documentIndexId: 30,
        value: api_result?.CifId
      }, {
        documentIndexId: 31,
        value: api_result?.BranchCode
      }, {
        documentIndexId: 32,
        value: api_result?.CustDob
      },
    ],
  };




  // Add indicies in attachments
  attachments = attachments.map((row) => {
    const filename = row.name;
    const doc_type = filename.substring(filename.lastIndexOf("_") + 1, filename.length).split(".")[0];

    let ctzn_docs = []
    try {
      ctzn_docs = CITIZEN_DOCUMENTS?.[parseInt(doc_type)].documentIndex;

    } catch (error) {
      console.log("Not defined in constant. ", doc_type)
      console.log(error);
      exit()

    }

    // document indexes mapped with document types.
    const documentIndicies = ctzn_docs.map(element => {
      let res = {};
      res = { ...res, documentIndexId: element.documentIndexId };
      res = { ...res, value: api_result?.[element.name] || "" };

      return res;
    })

    row.documentIndex = documentIndicies

    return row;
  });


  // Payload for dms api
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
    exit()
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
