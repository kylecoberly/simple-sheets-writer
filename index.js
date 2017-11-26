var google = require("googleapis");

function _sheets(clientEmail, privateKey){
    return google.sheets({
        version: "v4",
        auth: new google.auth.JWT(
            clientEmail,
            null,
            privateKey,
            ["https://www.googleapis.com/auth/spreadsheets"],
            null
        )
    }).spreadsheets.values;
}

function updateRows(data, options){
    return new Promise((resolve, reject) => {
        if (!data || !data.length){reject("Need data")}
        if (!options || !options.spreadsheetId){reject("Need valid spreadsheetId")}

        _sheets(options.clientEmail, options.privateKey).batchUpdate({
            spreadsheetId: options.spreadsheetId,
            resource: {
                valueInputOption: options.valueInputOption || "USER_ENTERED",
                data
            }
        }, (error, response) => {
            if (error){reject(error);}
            resolve(response);
        });
    }).then(response => ({updatedRows: response.totalUpdatedRows}))
    .catch(console.error);
}

function addRows(range, data, options){
    return new Promise((resolve, reject) => {
        if (!range){reject("Need range")}
        if (!data || !data.length){reject("Need data")}
        if (!options || !options.spreadsheetId){reject("Need valid spreadsheetId")}

        _sheets(options.clientEmail, options.privateKey).append({
            spreadsheetId: options.spreadsheetId,
            range,
            valueInputOption: options.valueInputOption || "USER_ENTERED",
            insertDataOption: "INSERT_DATA",
            resource: {
                values: data
            }
        }, (error, response) => {
            if (error){reject(error)}
            resolve(response);
        });
    }).then(response => ({updatedRows: response.updates.updatedRows}))
    .catch(console.error);
}

module.exports = {
    _sheets,
    updateRows,
    addRows
};
