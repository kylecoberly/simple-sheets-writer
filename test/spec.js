const code = require("../index");
const assert = require("assert");
const nock = require("nock");

/* For right now, to get the tests to pass, these need to be be actual credentials */
process.env.SHEETS_CLIENT_EMAIL = "";
process.env.SHEETS_PRIVATE_KEY = ``;

describe("#modifySheets", () => {
    it("exports batchUpdate and append functions", () => {
        const sheets = code.modifySheets();
        assert.ok(sheets.batchUpdate);
        assert.ok(sheets.append);
    });
});

describe("#updateRows", () => {
    it("updates a row", (done) => {
        nock("https://sheets.googleapis.com")
            .post(/v4\/spreadsheets\/.*\/values:batchUpdate/)
            .reply(201, {
                totalUpdatedRows: 1
            });
        code.updateRows([{
            range: "A2:A",
            values: [["A"]]
        }],{
            spreadsheetId: "9wLECuzvVpx8z7Ux5_9if_wdTDwhxXRcJZpJ-xhVeJRs"
        }).then(response => {
            assert.deepEqual(response, {updatedRows: 1});
        }).then(done)
        .catch(done);
    });
});

describe("#addRows", () => {
    it("appends a row", (done) => {
        nock("https://sheets.googleapis.com")
            .post(/v4\/spreadsheets\/.*\/values\/\%27Form\%20Responses\%27\!A2\:B:append.*/)
            .reply(201, {
                updates: {
                    updatedRows: 1
                }
            });
        code.addRows("'Form Responses'!A2:B", [
            ["column 1", "column 2"],
            ["column 1", "column 2"]
        ], {
            spreadsheetId: "9wLECuzvVpx8z7Ux5_9if_wdTDwhxXRcJZpJ-xhVeJRs"
        }).then(response => {
            assert.deepEqual(response, {updatedRows: 1});
        }).then(done)
        .catch(done);
    });
});
