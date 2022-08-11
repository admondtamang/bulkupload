const DOUCMENT_INDICIES = {
    28: "Account Name", // INDIVIDUAL
    29: "Account Number",
    30: "Retail CIF ID",
    31: "Branch Code",
    32: "DOB",
    26: "ACOUNT TYPE", // AOF INDIVIDUAL
    1: "FATHER NAME ", // KYC Individual
    2: "GRANDFATHER",
    3: "MOBILE NUMBER",
    4: "IDENTIFICATION DOCUMENT", // IDENTIFICATION DOCUMENT Individaul
    5: "ID NUMBER",
    6: "PLACE OF ISSUE",
    7: "DOB",
    8: "EXPIRY DATE",
    9: "NAME OF SIGNATORY", //SIGNATURE CARD - Corporate
    10: "Remarks",
    11: "SIGNATORY NAME", // KYC  - Corporate
    12: "FATHER NAME ",
    13: "GRANDFATHER",
    14: "MOBILE NUMBER",
    15: "IDENTIFICATION DOCUMENT", // IDENTIFICATION DOCUMENT- Corporate
    16: "ID NUMBER",
    17: "PLACE OF ISSUE",
    18: "DOB",
    19: "EXPIRY DATE",
    20: "Registration Number    ", // COMPANY DOCUMENTS - Corporate
    21: "Registration date",
    22: "PAN number",
    23: "ID issue organization",
    24: "Date of registration/expiry", // TAX CLEARANCE/AUDIT REPORT - Corporate
    25: "EXPIRY DATE",
    27: "ACOUNT TYPE", // AOF Corporate
    33: "Account Name", // Corporate
    34: "Account Number",
    35: "Corporate CIF ID ",
    36: "Corporate address ",
    37: "Phone number ",
};

// used for adding indexes to attachment and document
const CITIZEN_DOCUMENTS = {
    INDIVIDUAL: {
        name: 'INDIVIDUAL',
        value: 1,
        documentIndex: [
            {
                documentIndexId: 28,
                name: 'AccountName'
            },
            {
                documentIndexId: 29,
                name: 'AccountNumber'
            }, {
                documentIndexId: 30,
                name: 'CifId'
            }, {
                documentIndexId: 31,
                name: 'BranchCode'
            }, {
                documentIndexId: 32,
                name: 'CustDob',
                validation: { date: true }

            },
        ],
    },
    0001: {
        name: "AOF",
        value: 10,
        documentIndex: [{
            documentIndexId: 26,
            name: 'IdNumber',
            validation: {

                defaultValue: 1
            }
        },
        ]
    },
    0002: {
        name: "KYC",
        value: 3,
        documentIndex: [{
            documentIndexId: 1,
            name: 'FathersName'
        }, {
            documentIndexId: 2,
            name: 'GrandfathersName'
        }, {
            documentIndexId: 3,
            name: 'PhoneNum'
        },
        ]
    },
    0003: {
        name: "IDENTIFICATION DOCUMENT",
        value: 4,
        documentIndex: [{
            documentIndexId: 4,
            name: 'IdentificationDocument'
        }, {
            documentIndexId: 5,
            name: 'IdNumber'
        }, {
            documentIndexId: 6,
            name: 'PlaceOfIssue',
            validation: { table: 'district' }
        }, {
            documentIndexId: 7,
            name: 'CustDob',
            validation: { date: true }
        }, {
            documentIndexId: 8,
            name: 'DocExpiryDate',
            validation: { date: true }

        },
        ]
    },
    0004: {
        name: "OTHERS",
        value: 12,
        documentIndex: []
    }
}

module.exports = { DOUCMENT_INDICIES, CITIZEN_DOCUMENTS };
