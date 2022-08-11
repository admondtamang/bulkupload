const { default: axios } = require("axios");
const { exit } = require("process");
const { CITIZEN_DOCUMENTS, DOCUMENT_TYPE } = require("../constants/constant_citizen");
const District = require("../constants/district");
const { getIdentifier, printObject, moveDirectory } = require(".");
const { channelManager } = require("./api/channelmanger");
const { login } = require("./api/login");
const writeToFile = require("./writeToFile");
const moment = require("moment")

const url = "http://localhost:8181/api/attachment/bulk-attachment-upload";

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
  const api_result = await channelManager(document_name);
  // const api_result = {
  //   AccountName: 28,
  //   AccountNumber: "0010100002494011",
  //   BranchCode: 31,
  //   BranchName: "DURBARMARG BRANCH",
  //   CifId: "R000362731",
  //   CustDob: "09/30/1991 00:00:00",
  //   GrandfathersName: "TUK PRASAD ADHIKARI",
  //   FathersName: "BALARAM SHRAMA ADHIKARI",
  //   PhoneNum: "9846169746",//
  //   IdentifcationDocument: "CTZN",
  //   IdNumber: "461002/1248",
  //   PlaceOfIssue: "KASKI",
  //   DocExpiryDate: null,//
  //   IdIssueOrganization: "DISTRICT ADMINISTRATION OFFICE",
  // };

  // Send request to DMS
  const doc = {
    identifier: getIdentifier(),
    otherTitle: api_result.AccountNumber + "-" + api_result.AccountName,
    documentTypeId: 1,
    departmentId:null,
    branchId: 42,
    securityLevel:null,
    locationMapId:42,
    name:api_result.AccountNumber,
    documentConditionId:1,
    sendToChecker: false,
    hierarchy: 'Branch_42',
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

    let ctzn_docs = [], parent_doc = {}
    try {
      ctzn_docs = CITIZEN_DOCUMENTS?.[parseInt(doc_type)].documentIndex;
      parent_doc = CITIZEN_DOCUMENTS?.[parseInt(doc_type)]
    } catch (error) {
      console.log("Not defined in constant. ", doc_type)
      console.log(error);
      exit()

    }

    // document indexes mapped with document types.
    const documentIndicies = ctzn_docs.map(element => {
      let value = api_result?.[element.name]

      if (element?.validation && value) {
        if (element?.validation?.table) {
          try {
            value = District.find(row => {
              return row.name.toLocaleLowerCase().trim() == value.toLocaleLowerCase().trim()
            })?.id || value

          } catch (error) {
            console.log("Cannot find district with our db");
            console.log(error);
            exit()
          }
        }

        if (element?.validation?.date) {
          value = moment(new Date(value)).format("YYYY-MM-DD");
        }
      }

      let res = {};
      res = { ...res, documentIndexId: element.documentIndexId };
      res = { ...res, value: doc_type == "0001" ? 1 : value || "" }; // static value of 0001 document (AOF)
      return res;
    })

    row.documentIndex = documentIndicies
    row.documentTypeId = parent_doc.value

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
    // Move Directory to succes
    // exit()
    if (data == "Success!") moveDirectory(document_name, path);
    console.log("=============================");


  } catch (error) {
    console.log("=============================");
    console.error("Folder error At:DMS SEnd ");
    console.error("Error: ", error.message);
    console.log("=============================");
    exit();
  }
}

module.exports = sendDataToDMS;
