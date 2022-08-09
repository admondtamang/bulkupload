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

const DOCUMENT_TYPE = {
    1: {
        name: "Individual",
        documentIndex: [
            {
                documentIndexId: 28,
            },
            {
                documentIndexId: 29,
            }, {
                documentIndexId: 30,
            }, {
                documentIndexId: 31,
            }, {
                documentIndexId: 32,
            },
        ],
    },
    3: "KYC",
    4: "IDENTIFICATION DOCUMENT",
    10: "AOF", //  individual
    2: "CORPORATE",
    5: "SIGNATURE CARD",
    6: "KYC",
    7: "IDENTIFICATION DOCUMENT",
    8: "COMPANY DOCUMENTS",
    9: "TAX CLEARANCE/AUDIT REPORT ",
    11: "AOF"
};
// const DOCUMENT_TYPE = {
//     1: "INDIVIDUAL",
//     3: "KYC",
//     4: "IDENTIFICATION DOCUMENT",
//     10: "AOF", //  individual
//     2: "CORPORATE",
//     5: "SIGNATURE CARD",
//     6: "KYC",
//     7: "IDENTIFICATION DOCUMENT",
//     8: "COMPANY DOCUMENTS",
//     9: "TAX CLEARANCE/AUDIT REPORT ",
//     11: "AOF"
// };

const responseData = {
    AccountName: 28,
    AccountNumber: "0010100002494011",
    BranchCode: 31,
    BranchName: "DURBARMARG BRANCH",
    CifId: "R000362731",
    CustDob: "09/30/1991 00:00:00",
    GrandfathersName: "TUK PRASAD ADHIKARI",
    FathersName: "BALARAM SHRAMA ADHIKARI",
    PhoneNum: "9846169746",//
    IdentifcationDocument: "CTZN",
    IdNumber: "461002/1248",
    PlaceOfIssue: "KASKI",
    DocExpiryDate: null,//
    IdIssueOrganization: "DISTRICT ADMINISTRATION OFFICE",
};

const CITIZEN_DOCUMENTS = {
    0001: {
        name: "AOF",
        value: 10,
        documentIndex: [{
            documentIndexId: 26,
            name: 'IdNumber',
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
            documentIndexId: 4, // static
            name: 'IdentificationDocument'
        }, {
            documentIndexId: 5, // static
            name: 'IdNumber'
        }, {
            documentIndexId: 6, // static
            name: 'PlaceOfIssue',
            validation: { table: 'district' }
        }, {
            documentIndexId: 7, // static
            name: 'CustDob',
            validation: { date: 'date' }

        }, {
            documentIndexId: 8, // static
            name: 'DocExpiryDate',
            validation: { date: 'date' }

        },
        ]
    },
    0004:{
        name:"OTHERS",
        value:12,
        documentIndex: []
    }
}

module.exports = { DOUCMENT_INDICIES, DOCUMENT_TYPE, responseData, CITIZEN_DOCUMENTS };
