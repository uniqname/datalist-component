export default () => {
    const template = `
        <!-- <data-list-label contenteditable></data-list-label> -->
        <input type="text" />
        <input type="hidden" />

        <data-list-projector select="data-list-option"></data-list-projector>
    `;

    const parser = document.createElement('div');
    parser.innerHTML = template;

    return [...parser.children]
        .reduce((frag, child) => {
            frag.appendChild(child);
            return frag;
        }, document.createDocumentFragment())

}
