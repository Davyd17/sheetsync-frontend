export class Pagination {
    constructor(paginationContainer) {
        this.paginationContainer = paginationContainer;
    }

    renderButtonPages(totalPages, currentPage, onPageClick) {

        console.log('Rendering pagination:', { totalPages, currentPage });

        this.paginationContainer.replaceChildren();

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;

            if (i - 1 === currentPage) {
                pageBtn.classList.add('active');
                console.log(`Page ${i} is active`);
            }

            pageBtn.addEventListener('click', () => onPageClick(i - 1));

            this.paginationContainer.appendChild(pageBtn);
        }
    }

}

