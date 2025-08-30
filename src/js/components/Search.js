import { SheetApi } from '../api/SheetApi.js';

export class Search {
    constructor(searchInput, api = new SheetApi()) {
        this.api = api;
        this.searchInput = searchInput;
    }

    setupSearch(id, header, page) {

        this.searchInput.addEventListener('input', async() => {

            const criteria = this.searchInput.value.toLowerCase();

            try {

                return await this.api.fetchSheetDataByIdWithHeaderCriteria(id, header, page, criteria);
                
            } catch (error) {
                console.error('Error during search:', error);
            }

        });
    }



}