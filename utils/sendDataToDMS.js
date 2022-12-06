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
const { dms_url, retriveDoc } = require("./config");


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

  if(attachments.length>5){
    writeToFile(document_name, 'error/multiple_attach.txt', true)
    await  moveDirectory(document_name, path,"multiple_attach");

    return
  }


  // Get data from channel manager  
  const api_result = await channelManager(document_name);

  if(api_result==null){
    writeToFile(document_name, 'error/api_notfound.txt', true)
    await  moveDirectory(document_name, path,"failure_api");

    return
  }


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


  const doc = retriveDoc({api_result,documentIndex})



  // Add indicies in attachments
  attachments = attachments.map((row) => {
    const filename = row.name;
    const doc_type = filename.substring(filename.lastIndexOf("_") + 1, filename.length).split(".")[0];

    let ctzn_docs = [], parent_doc = {},temp_indicies;
    try {
      ctzn_docs = CITIZEN_DOCUMENTS?.[parseInt(doc_type)]?.documentIndex;
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
      temp_indicies=documentIndicies
      row.documentTypeId = parent_doc.value

      return row;
    } catch (error) {
      
      writeToFile({ filename,path, message: error?.message }, 'error/erorFile.txt', true)
      console.log("Not defined in constant. [Ignore error]",temp_indicies ,doc_type, filename)
      console.log(error.message, error);
    }


  });

  attachments= attachments.filter(row=> row !=undefined || row !=null)

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

  // get token
  // const token = await login();
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnZW50ZWNoLmNvbSIsInJvbGVJZCI6MSwiaGllcmFyY2h5IjoiU3VwZXItMDAxIiwiYnJhbmNoSWQiOjEsImRlcGFydG1lbnRJZCI6MSwiaWF0IjoxNjY1ODk1NDc4fQ.GqxnGJ8nIgFOnBX-1NPbu978hrTRe-oM02nkZs7I6OU"
  // payload send to dms
  writeToFile(form_data,"error/body.txt");

  console.log("Api call to DMS");
  if(attachments.length==0){
    await writeToFile(document_name, "error/no_attachment.txt",true);
    await  moveDirectory(document_name, path);
  }else{


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

    console.log("Document Upload to DMS:",data);
    // Move Directory to succes
    // exit()
    if (data == "Success!")
    {
    await  moveDirectory(document_name, path);
      console.log("===================== finish  =============================");
      console.log("");
      console.log("");
    }else if(data == "Duplicate content"){
    // await  moveDirectory(document_name, path);

     writeToFile(document_name, 'error/duplicate_document.txt', true)

    }


  } catch (error) {
    console.log("=============================");
    console.error("Folder error At: ");
    console.error("Error: ", error, error.message);

   writeToFile({error:error.message,document_name, attachmentLength:attachments.length}, "error/dms_error.txt",true);
  setTimeout(() => {
    console.log("===== ❌ ❌ ❌ ❌ Error at DMS. =============================");
    
  }, 5000);
    console.log("=============================");
    // exit();
  }
}

}

module.exports = sendDataToDMS;
