import SheetSummary from '../models/SheetSummary.js';
import DataRow from '../models/DataRow.js';
import PageResult from '../models/PageResult.js';

export class SheetApi {
  constructor(baseURL = 'http://localhost:8080') {
    this.getSheetById = `${baseURL}/api/v1/sheet/`
  }

  fetchSheetInfoById = async (sheetId) => {

    try {

      const response = await fetch(`${this.getSheetById}${sheetId}`);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const json = await response.json();

      return new SheetSummary({
        id: json.id,
        title: json.title,
        headers: json.headers,
        spreadSheetId: json.spreadSheetId
      });

    } catch (err) {
      console.error('Failed to fetch sheet info:', err);
      throw err;
    }

  }

  fetchSheetDataById = async (sheetId, page) => {

    let pageSize = 10;

    try {

      const response = await fetch(`${this.getSheetById}${sheetId}/data?page=${page}&size=${pageSize}`);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const json = await response.json();

      return new PageResult({
        content: json.content?.map(row => new DataRow(row)) || [],
        totalElements: json.page["totalElements"],
        totalPages: json.page["totalPages"],
        page: json.page["number"],
        size: json.page["size"]
      }
      );

    } catch (err) {

      console.error('Failed to fetch sheet data:', err);
      throw err;

    }

  }

  fetchSheetDataByIdWithHeaderCriteria = async (id, header, page, criteria) => {

    let pageSize = 10;

    const headerCriteriaSearchPath = `/${header}/search?criteria=${criteria}`;
    const pagePath = `page=${page}&size=${pageSize}`;

    try {

      const response = await fetch(`${this.getSheetById}${id}${headerCriteriaSearchPath}&${pagePath}`);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const json = await response.json();

      return new PageResult({
        content: json.content?.map(row => new DataRow(row)) || [],
        totalElements: json.page["totalElements"],
        totalPages: json.page["totalPages"],
        page: json.page["number"],
        size: json.page["size"]
      });

    } catch (err) {

      console.error('Failed to fetch sheet data with header criteria:', err);
      throw err;

    }

  }
}