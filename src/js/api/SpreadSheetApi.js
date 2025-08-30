import SpreadSheet from '../models/SpreadSheet.js';
import SheetSummary from '../models/SheetSummary.js';

export class SpreadSheetApi {
    constructor(baseURL = 'http://localhost:8080') {
        this.getSpreadSheetById = `${baseURL}/api/v1/spreadsheet/`
    }

    fetchSpreadSheetById = async (spreadSheetId) => {

        try {

            const response = await fetch(`${this.getSpreadSheetById}${spreadSheetId}`);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const json = await response.json();

            return new SpreadSheet({
                spreadsheetId: json.spreadsheetId,
                title: json.title,
                sheetSummaries: json.sheetSummaries?.map(sheet => new SheetSummary({
                    id: sheet.id,
                    title: sheet.title,
                    headers: sheet.headers,
                    spreadsheetId: sheet.spreadsheetId
                })) || []
            });

        } catch (err) {

            console.error('Failed to fetch spreadsheet:', err);
            throw err;

        }
    }

}