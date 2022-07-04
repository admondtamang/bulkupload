// const fs = require("fs").promises;
const path = require("path");
const excludeFileTypes = ['.exe', '.DS_Store'];
const fs = require('fs-extra');
const { moveDirectory, printObject } = require('./utils');

let result=[];

async function findFiles(folderName) {
  // list folders
  let items = await fs.readdir(folderName, { withFileTypes: true });  

  // Browser folders
  let attachments=[];
 const res= items.map((item,index) => {
    let document = { name: folderName};
    const filePath = path.join(folderName, item.name);;

    // donot include file extension
    if (excludeFileTypes.includes(item.name)) return; 
    
    // file found
    if (path.extname(item.name) === '.json') {
      attachments.push(filePath)

      result[index] = { ...document, attachments}
      // result.push({...document, attachments})
      
      console.log(`Found file: ${item.name} ${index} in folder: ${folderName}`);
    } else {
      // find next folder if finish finding files
      // recursive function for other folder
      attachments=[]
      return findFiles(filePath);
    }
  })

  printObject(attachments)
return attachments  
}



// moveDirectory('23121');
//  findFiles('stores');


(async () => {
  try {  
    const result = await findFiles('stores');
    printObject("Final=",result)
  } catch (e) {
    console.log("error",e);
  }
})();
