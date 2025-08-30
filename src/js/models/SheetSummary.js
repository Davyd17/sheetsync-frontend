export default class SheetSummary {
    constructor({id, title, headers, spreadsheetId}){
        this.id = id;
        this.title = title;
        this.headers = headers;
        this.spreadsheetId = spreadsheetId;
    }
}