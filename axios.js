const { default: axios } = require("axios");
const { exit } = require("process");
const { getIdentifier, printObject } = require("./utils");
const { login } = require("./utils/api/login");

const url = "http://localhost:8181/api/attachment/bulk-attachment-upload";

/**
 *
 * @param {string} document_name
 */
async function sendData(attachments, document_name) {
  // Send request to DMS
  const doc = {
    identifier: getIdentifier(),
    otherTitle: document_name.split("\\")[1],
    documentTypeId: "1",
    documentIndex: [
      {
        documentIndexId: 28,
        value: "fsd",
      },
      {
        documentIndexId: 29,
        value: "aaa",
      },
    ],
  };

  const form_data = {
    selectedFiles: [
      {
        document: doc,
        attachments,
      },
    ],
  };

  const token = await login();

  // api call to dms
  try {
    const { data } = await axios({
      method: "post",
      url: url,
      data: form_data,
      headers: {
        Authorization: `Admin ${token}`,
      },
    });
    exit();
  } catch (error) {
    console.log("=============================");
    console.error("Folder error At: ");
    console.error("Error: ", error, error.message);
    console.log("=============================");

    exit();
  }
}

module.exports = sendData;
