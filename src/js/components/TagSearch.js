export class TagSearch {
    constructor(searchContainer){
        this.searchContainer = searchContainer;
    }

    addSearchCriteria(selectedHeader) {

        console.log('Adding tag for header:', selectedHeader);

        const input = this.#createInput();
        const tag = this.#createTag(selectedHeader, () => {
            input.remove()});

        this.searchContainer.appendChild(tag);
        this.searchContainer.appendChild(input);
        input.focus();
        
    }

    #createTag(header, onDelete) {

        const tag = document.createElement('div');
        tag.classList.add('tag');
        
        const span = document.createElement('span');
        span.textContent = header;
        tag.appendChild(span);

        const closeButton = this.#createCloseTagButton(onDelete);
        tag.appendChild(closeButton);
        
        return tag;
    }

    #createCloseTagButton(onDelete) {

        const button = document.createElement('button');
        button.innerHTML = '&times;';
        button.addEventListener('click', () => {
            button.parentElement.remove();
            onDelete();
        });

        return button;
    }

    #createInput() {

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'search...';

        input.addEventListener('keydown', (event) => {

        });
        return input;
    }


    clearTags() {
        this.searchContainer.innerHTML = '';
    }

}