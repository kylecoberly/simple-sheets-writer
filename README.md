# Simple Sheets Writer

Writes Google Sheets data.

Authenticates via JWTs and a Google Service Account by looking for the presence of a `SHEETS_CLIENT_EMAIL` environment variable and a private key environment variable named `SHEETS_PRIVATE_KEY`. See `.env.example` for an example. These will have to be copied from the `.json` file that Google Service Accounts generate.

## Usage

```js
var putSheetsData = require("simple-sheets-writer");

updateSheetsData("9wLECuzvVpx8z7Ux5_9if_wdTDwhxXRcJZpJ-xhVeJRs", [{
    range: "A2",
    majorDimension: "ROWS",
    values: [[
        "Kyle"
    ]]
},{
    range: "B2:B3",
    majorDimension: "ROWS",
    values: [[
        "Kyle",
        "Elyse"
    ]]
}]).then(function(response){
    console.log(response);
}).catch(console.error);
```

Take an optional third argument that allows you to override `valueInputOption`.

```js
{
    valueInputOption: "RAW" // Defaults to "USER_ENTERED"
}
```

## Output

```
{
    spreadsheetId: string,
    totalUpdatedRows: number,
    totalUpdatedColumns: number,
    totalUpdatedCells: number,
    totalUpdatedSheets: number,
    responses: [{
        object(UpdateValuesResponse)
    }]
}
```

Look at the [Google Sheets `batchUpdate` API Docs](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchGet) for more information.
