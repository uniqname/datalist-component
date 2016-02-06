export default () => {
    const style = document.createElement('style');
    style.textContent = `
        data-list {
            display: inline-block;
            overflow: visible;
        }
        data-list shady-root {
            display: block;
            box-sizing: border-box;
            position: relative;
        }

        data-list input[type="text"] {
            width: 100%;
            outline: none;
            display: block;
            text-align: left;
        }

        data-list shady-root > *,
        data-list shady-root > *::before,
        data-list shady-root > *::after {
            box-sizing: inherit;
            font-size: inherit;
            font-family: inherit;
            background-color: inherit;
            border: inherit;
            padding: inherit;
            margin: inherit;
            color: inherit;
        }

        data-list shady-root [select] {
            box-shadow: 0 0 2px hsla(0, 0%, 0%, .2);
            display: none;
            max-height: 80vh;
            overflow: auto;
            position: absolute;
            width: 100%;
            background-color: hsla(0, 100%, 100%, .2);
        }

        data-list.focused {
            outline: 2px auto rgb(59, 153, 252);
        }

        data-list.focused [select] {
            display: block;
        }

        data-list data-list-option[tabindex] {
            display: flex;
        }

        data-list data-list-option {
            cursor: pointer;
            display: none;
            opacity: .6;
            padding: .125em .25em;
            transition: all .2s ease-in-out;
            align-items: baseline;
        }

        data-list data-list-option::before {
            content: "(" attr(value) ")";
            font-size: .6em;
            margin-right: 1em;
            flex: 0 0 20%;
        }

        data-list data-list-option:hover,
        data-list data-list-option:focus {
            opacity: 1;
            background-color: hsla(0, 0%, 0%, .03);
            outline: none;
            transform: translateX(.25em);
            transform-origin: left center;
        }

    `;
    return style;
};
