const moment = require("moment");

const { CITIZEN_DOCUMENTS } = require("../constants/constant_citizen");

const dms_url = "http://192.168.82.80:8181/api/attachment/bulk-attachment-upload";

const folder_path = 'C:\\Users\\Administrator\\Desktop\\tokha\\SAVING ACCOUNT\\CTK_'; // change here

// Total number of folder
const initialNumberOfFolder=0;
const numberOfFolders=20; // change here

// document property
function retriveDoc({api_result,documentIndex}) {
  console.log(getIdentifier,  typeof getIdentifier);
  const doc = {
    identifier: getIdentifier(),
    otherTitle: api_result.AccountName + "-" + api_result.AccountNumber,
    documentTypeId: CITIZEN_DOCUMENTS.INDIVIDUAL.value,
    branchId: 82,  // change here
    name:api_result.AccountNumber,
    sendToChecker: false, 
    hierarchy: 'Branch_82', // change here
    documentIndex
  }

  return doc
}



/**
 * Generate identifiers for document title
 *
 * @param {*} tag
 * @returns
 */
 function getIdentifier(tag = "GDMS")  {
  return tag + "-" + moment().format("YYYY-MM-DD") + "-" + Date.now();
};


module.exports = { folder_path, dms_url,numberOfFolders,initialNumberOfFolder ,retriveDoc}