import { escapeHtml } from '../utils/EscapeHtml.js';

export class TableRenderer {

    constructor(tableHead, tableBody) {

    this.tableHead = tableHead;
    this.tableBody = tableBody;
    }

    renderTable(headers, rows) {

        this.clearTable();

        if (rows.length === 0 && headers.length === 0) {
            this.tableBody.innerHTML = '<tr><td colspan="100%">No data available</td></tr>';
            return;
        }

        this.#renderHeaders(headers);
        this.#renderRows(rows);
    }

    #renderHeaders(headers) {

        const row = headers.map(h => `<th>${escapeHtml(h)}</th>`).join('');
        this.tableHead.innerHTML = `<tr>${row}</tr>`;
    }

    #renderRows(rows) {

        this.tableBody.innerHTML = rows.map(row => {

            const rowHTML = [];

            Object.entries(row).forEach(([key, value]) => {

                rowHTML.push(`<td>${escapeHtml(value)}</td>`);

            });

            return `<tr>${rowHTML.join('')}</tr>`;

        }).join('');
    }

    clearTable() {
        this.tableHead.innerHTML = '';
        this.tableBody.innerHTML = '';
    }


}