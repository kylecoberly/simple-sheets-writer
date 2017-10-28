require("dotenv").load();

var google = require("googleapis");
var sheets = google.sheets({
    version: "v4",
    auth: new google.auth.JWT(
        process.env.SHEETS_CLIENT_EMAIL,
        null,
        process.env.SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
        ["https://www.googleapis.com/auth/spreadsheets"],
        null
    )
}).spreadsheets;

function updateSurveyData(sheets, spreadsheetId, data, options){
    options = options || {};
    return new Promise(function(resolve, reject){
        sheets.values.batchUpdate({
            spreadsheetId,
            ranges,
            valueInputOption: options.valueInputOption || "USER_ENTERED",
            data
        }, function(error, response){
            if (error){reject(error);}
            resolve(response);
        });
    });
}

module.exports = getSurveyData.bind(null, sheets);