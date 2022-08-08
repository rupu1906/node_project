const fs = require('fs');
const shell = require('shelljs');
const json2csv = require('json2csv').parse;
const e = require('express');
path = require('path');

const data_file = []
const file_name = createFile()
for (let i = 0; i < 10; i++) {
    data_file.push({
        FIRSTNAME: "SAM",
        LASTNAME: "CH",
        DOB: "111999",
        FORMMATEDDOB: 1 / 1 / 1999,
        PHONE: i + "234312343",
        ADDRESS1: "",
        CITY1: "city",
        PROVINCE: "province",
        POSTAL1: "postal",
        ADDRESS2: "prev_address",
        CITY2: "",
        PR: "",
        POSTAL2: "prev_postal",
        APPROX_FICO_RISK_SCORE: "",
        APPROX_TRANS_UNION_RISK: " ",
        APPROX_FICO_BANKRU_PTCY_SCORE: " ",
        APPROX_FICO_BR_SCORE: "",
        SCORE0093: i * 2,
        UCS: "",
        DESCRIPTION: ""
    });
}

for (let i = 0; i < data_file.length; i++) {
    appendFile(file_name, data_file[i])
}

function createFile() {
    path = require('path');
    defaultFileExtension = 'csv';
    folderPath = './results/';
    shell.mkdir('-p', folderPath);
    uniqueIdentifier = Date.now();
    filename = 'Output_' + uniqueIdentifier
    var fields = ['FIRSTNAME', 'LASTNAME', 'DOB', 'FORMMATEDDOB', 'PHONE', 'ADDRESS', 'CITY', 'PROVINCE', 'POSTAL',
        'ADDRESS', 'CITY', 'PR.', 'POSTAL', 'APPROX FICO RISK SCORE', 'APPROX TRANSU-NION RISK',
        'APPROX FICO BANKRU-PTCY SCORE', 'APPROX FICO BR SCORE', 'SCORE0093', 'UCS', 'DESCRIPTION'];

    fields = fields + '\r\n';
    filePath = `${path.join(folderPath, filename)}.${defaultFileExtension}`,
        fs.writeFile(filePath, fields, function (err) {
            if (err) throw err;
            console.log('File created');
        });
    return filePath
}


function appendFile(file_name, data) {
    var newLine = '\r\n';
    let rows = json2csv(data, { header: false }) + newLine;
    fs.appendFileSync(file_name, rows)
}

function get_dob_from_formatted_dob(formated_dob) {
    const [year, month, date] = [formated_dob.slice(0, 4), formated_dob.slice(4, 6), formated_dob.slice(6, 8)];
    dob = year + "/" + month + "/" + date
    return dob
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
