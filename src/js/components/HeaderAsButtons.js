export class HeaderAsButtons {
    constructor(tableHead) {
        this.tableHead = tableHead;
        this.headers = tableHead.querySelectorAll('th');
    }

    tableHeaderAsButton(onHeaderClick) {

        this.headers.forEach(th => {
            th.addEventListener('click', () => onHeaderClick(th.textContent));
            th.classList.add('clickable');
        });

    }


}