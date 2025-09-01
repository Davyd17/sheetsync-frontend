import { SheetApi } from '../api/SheetApi.js';
import { SpreadSheetApi } from '../api/SpreadSheetApi.js';

import SheetSummary from '../models/SheetSummary.js';
import SpreadSheet from '../models/SpreadSheet.js';

import { TableRenderer } from '../components/TableRenderer.js';
import PageResult from '../models/PageResult.js';

import { Pagination } from '../components/Pagination.js';

import { ErrorDisplay } from '../components/ErrorDisplay.js';

export class SheetSyncApp {
  constructor(spreadSheetId = '1GnfHRRt0YYGMQup-nnw8k-KsSQ0_jcwwpN-SsSedb1M') {

    // DOM Elements
    this.spreadsheetTitle = document.querySelector('#spreadsheet-title');
    this.sheetTitle = document.querySelector('#sheet-title');

    this.tableHead = document.querySelector('#dataTable thead');
    this.tableBody = document.querySelector('#dataTable tbody');

    this.paginationContainer = document.getElementById('pagination')
    //

    this.spreadSheetId = spreadSheetId;

    this.sheetApi = new SheetApi();
    this.spreadSheetApi = new SpreadSheetApi();

    this.spreadsheet;
    this.sheetSummary;

    this.pageResult;

    this.tableRenderer = new TableRenderer(this.tableHead, this.tableBody);
    this.errorDisplay = new ErrorDisplay(this.tableRenderer, this.tableBody);

    this.pagination = new Pagination(this.paginationContainer);
  }

  async init() {

    try {

      this.spreadsheet = await this.spreadSheetApi.fetchSpreadSheetById(this.spreadSheetId);

      const sheetSummaries = this.spreadsheet.sheetSummaries || [];
      if (sheetSummaries.length === 0) {
        this.errorDisplay.showError('No sheets available');
        return;
      }

      this.sheetSummary = sheetSummaries[0];

      this.renderPage();

    } catch (err) {
      console.error('Error initializing app:', err);
      this.errorDisplay.showError('Failed to load spreadsheet data');
    }
  }

  async renderPage(page = 0) {

    try {

      this.pageResult = await this.sheetApi.fetchSheetDataById(this.sheetSummary.id, page);

      this.spreadsheetTitle.textContent = this.spreadsheet.title;

      this.tableRenderer.renderTable(this.sheetSummary.headers, this.pageResult.content);

      this.pagination.renderButtonPages(
        this.pageResult.totalPages,
        this.currentPage,
        this.renderPage.bind(this));

      this.sheetTitle.textContent = this.sheetSummary.title;

    } catch (error) {
      this.errorDisplay.showError('Failed to load page data');
    }

  }

  async fetchDataByCriteria(page) {

    try {


    } catch (error) {
      console.error(`Error fetching data in page ${page}`, error);
    }

  }

}
