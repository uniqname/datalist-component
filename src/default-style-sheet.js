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

        data-list input {
            width: 100%;
        }

        data-list shady-root > *,
        data-list shady-root > *::before,
        data-list shady-root > *::after {
            box-sizing: inherit;
        }

        data-list data-list-options {
            box-shadow: 0 0 2px hsla(0, 0%, 0%, .2);
            display: none;
            max-height: 80vh;
            overflow: auto;
            position: absolute;
            width: 100%;
        }

        data-list.active data-list-options {
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
            transition: all .1s ease-in-out;
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
            transform: scale(1.1);
            transform-origin: center center;
        }

    `;
    return style;
};
