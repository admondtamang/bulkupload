# Bulk upload 

Note: 
1. Donot add other files except pdf else it will treat as folder which cause error
1. Run only one function basic or multiple bulkupload from index.js

## Basic Bulk upload: Single folder

folder structure
11111111-> files
11111112-> files
11111113-> files

## Multiple_bulkupload: Nested folder / multiple folders

folder structure
CTT-001 -> 11111111-> files
CTT-002 -> 11111112-> files
CTT-003 -> 11111113-> files


## Usuage
index.js entry point of this application.

1. clear all unecessary files or folder in folder path.

2. utils/config.js -> change folder path

3. utils/config.js -> change branchId and hierarchy (2 changes)

```
 const doc = {
    identifier: getIdentifier(),
    otherTitle: api_result.AccountName + "-" + api_result.AccountNumber,
    documentTypeId: CITIZEN_DOCUMENTS.INDIVIDUAL.value,
    branchId: 9, [change  according  to branch id]
    sendToChecker: false,
    hierarchy: 'Branch_9', [change  according  to branch id]
    documentIndex
  }

```
4. utils/config.js -> line no. 23 Change number of folders.

5. Clear erorFile.txt

