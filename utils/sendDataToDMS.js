const { default: axios } = require("axios");
const { exit } = require("process");
const { CITIZEN_DOCUMENTS, DOCUMENT_TYPE } = require("../constants/constant_citizen");
const District = require("../constants/district");
const { getIdentifier, printObject, moveDirectory } = require(".");
const { channelManager } = require("./api/channelmanger");
const { login } = require("./api/login");
const writeToFile = require("./writeToFile");
const moment = require("moment");
const { validateIndexes } = require("./validations");
const { dms_url } = require("./config");


/**
 *
 * Send data to dms through API
 * @param {Array} attachments
 * @param {string} document_name
 */
async function sendDataToDMS(attachments, document_name, path) {
  try {

    // get file name
    // document_name = document_name.split("\\")[1];
    document_name = document_name.split('\\').pop()

  } catch (error) {
    console.log("Error== Folder name - cannot extract account number");
    console.log(error);
    exit()
  }

  // Get data from channel manager  
  // const api_result = await channelManager(document_name);
  const api_result = {
    AccountName: 'Getta thapalia',
    AccountNumber: "0010100002494011",
    BranchCode: 31,
    BranchName: "DURBARMARG BRANCH",
    CifId: "R000362731",
    CustDob: "09/30/1991 00:00:00",
    GrandfathersName: "TUK PRASAD ADHIKARI",
    FathersName: "BALARAM SHRAMA ADHIKARI",
    PhoneNum: "9846169746",//
    IdentificationDocument: "CTZN",
    IdNumber: "461002/1248",
    PlaceOfIssue: "KASKI",
    DocExpiryDate: null,//
    IdIssueOrganization: "DISTRICT ADMINISTRATION OFFICE",
  };



  // document index for document
  const documentIndex = CITIZEN_DOCUMENTS.INDIVIDUAL.documentIndex.map(row => {

    let value = api_result?.[row.name]

    if (row?.validation && value) {
      value = validateIndexes(row, value)
    }

    return {
      documentIndexId: row.documentIndexId, value: value || ""
    };
  })


  // Send request to DMS
  const doc = {
    identifier: getIdentifier(),
    otherTitle: api_result.AccountName + "-" + api_result.AccountNumber,
    documentTypeId: CITIZEN_DOCUMENTS.INDIVIDUAL.value,
    branchId: 42,
    sendToChecker: false,
    hierarchy: 'Branch_42',
    documentIndex
  }



  // Add indicies in attachments
  attachments = attachments.map((row) => {
    const filename = row.name;
    const doc_type = filename.substring(filename.lastIndexOf("_") + 1, filename.length).split(".")[0];

    let ctzn_docs = [], parent_doc = {}
    try {
      ctzn_docs = CITIZEN_DOCUMENTS?.[parseInt(doc_type)].documentIndex;
      parent_doc = CITIZEN_DOCUMENTS?.[parseInt(doc_type)]

      // document indexes mapped with document types.
      const documentIndicies = ctzn_docs.map(element => {
        let value = api_result?.[element.name]

        if (element?.validation && value) {
          value = validateIndexes(element, value)
        }

        return { documentIndexId: element.documentIndexId, value: value || "" };
      })

      row.documentIndex = documentIndicies
      row.documentTypeId = parent_doc.value

      return row;
    } catch (error) {
      console.log("Not defined in constant. [Ignore error]", doc_type, filename)
      console.log(error.message, error);
      writeToFile({ path, message: error.message }, 'erorFile.txt', true)
      // exit()

    }


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
      url: dms_url,
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
    // exit()
    if (data == "Success!") moveDirectory(document_name, path);
    console.log("=============================");


  } catch (error) {
    console.log("=============================");
    console.error("Folder error At: ");
    console.error("Error: ", error, error.message);
    console.log("=============================");
    exit();
  }
}

module.exports = sendDataToDMS;
