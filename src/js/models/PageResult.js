export default class PageResult {
    constructor({content, totalElements, totalPages, page, size}) {
        this.content = content;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.page = page;
        this.size = size;
    }
}