# Simple Sheets Writer

*This package is deprecated in favor of [`simple-sheets`](https://www.npmjs.com/package/simple-sheets), which combines this with the `simple-sheets-reader` API*

Writes Google Sheets data, perfect for sheets populated by Google Forms. This is a wrapper for the very powerful-yet-overwhelming official Sheets API.

Authenticates via a [Google Service Account](https://cloud.google.com/iam/docs/understanding-service-accounts) by passing in the `client_email` and `private_key` values provided by the `.json` file that Google Service Accounts generate. See [service-account-credentials.json](service-account-credentials.json) for an example.

## API

`simple-sheets-writer` exports an object with two functions, `updateRows` and `addRows`. `updateRows` takes the following arguments:

```js
updateRows(data, options).then();
```

`data` is an array of objects, following the following format:

```js
[{
    range: "A2:A",
    values: [
        ["A"],
        ["B"]
    ]
}]
```

`options` include:

* `spreadsheetId` (required): The ID of the Google sheet, which is the long string in the URL of the page
* `clientEmail` (required): The authorized `client_email` for your service account (remember to add permissions for this email to your sheet!)
* `privateKey` (required): the authorized `private_key` for your service account
* `valueInputOption`: Whether input should be taken literally (`"RAW"`), or as if a user entered them (`"USER_ENTERED"`, default)

It returns a count of modified rows:

```js
{
    updatedRows: 1
}
```

`addRows` has the following parameters:

```js
addRows(range, data, options);
```

`range` is an A1 range (eg "A2:A") that will be searched to find something table-like to append to the end of.

`data` is an array of arrays of values to add:

```js
[
    ["column 1", "column 2"],
    ["column 1", "column 2"]
]
```

`options` include:

* `spreadsheetId` (required): The ID of the Google sheet, which is the long string in the URL of the page
* `clientEmail` (required): The authorized `client_email` for your service account (remember to add permissions for this email to your sheet!)
* `privateKey` (required): the authorized `private_key` for your service account
* `valueInputOption`: Whether input should be taken literally (`"RAW"`), or as if a user entered them (`"USER_ENTERED"`, default)

It returns an object with the count of modified rows:

```js
{
    updatedRows: 1
}
```

## Usage

```js
const {updateRows, addRows} = require("simple-sheets-writer");

updateRows([{
    range: "A2:A",
    values: [["A"], ["B"]]
},{
    range: "Users!A2:B",
    values: [["C", "D"], ["E", "F"]]
}], {
    spreadsheetId: "9wLECuzvVpx8z7Ux5_9if_wdTDwhxXRcJZpJ-xhVeJRs",
    clientEmail: "test-account@fast-ability-145401.iam.gserviceaccount.com",
    privateKey: PRIVATE_KEY
}).then(console.log) // {updatedRows: 4}
.catch(console.error);

addRows("'Form Responses'!A2:B", [
    ["column 1", "column 2"],
    ["column 1", "column 2"]
], {
    spreadsheetId: "9wLECuzvVpx8z7Ux5_9if_wdTDwhxXRcJZpJ-xhVeJRs",
    clientEmail: "test-account@fast-ability-145401.iam.gserviceaccount.com",
    privateKey: PRIVATE_KEY
}).then(console.log) // {updatedRows: 2}
.catch(console.error);
```

---

Look at the [Google Sheets `batchUpdate` API Docs](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchGet) and the [Google Sheets `append` API Docs](ihttps://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append) for more information.

## Tests

`npm test`

## Upgrading to 2.0

* Credentials need to be passed in, rather than read from the environment
