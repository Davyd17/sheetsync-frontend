import { escapeHtml } from '../utils/EscapeHtml.js';

export class ErrorDisplay {
    constructor(tableRenderer, tableBody) {
        this.tableRenderer = tableRenderer;
        this.tableBody = tableBody;
    }

    showError(message) {
        this.tableRenderer.clearTable();
        this.tableBody.innerHTML = `<tr><td colspan="100%">${escapeHtml(message)}</td></tr>`;
    }

}