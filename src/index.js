import qsa from './qsa';
import createComponent from './create-component';
import createShadyRoot  from './create-shady-root';
import createDatalistProp  from './datalist-property';
import defaultStyleSheet from './default-style-sheet';
import toggleItems from './toggle-items';
import { datalist, offFocusListener } from './symbols';
import hasFocus from './has-focus';
import isPrintable from './is-printable-char';

createComponent('data-list', {
    onCreate(comp) {

        // attach shady-root
        const sr = createShadyRoot(comp);
        const inputEl = document.createElement('input');
        const list = document.createElement('data-list-options');

        const updateValFromEvent = (e) => {
            const val = e.target.getAttribute('value')
            comp.value = val;
            toggleItems(val)(comp[datalist]);
            inputEl.focus();
        }

        const nextFocusable = (list, inc=1) => {
            let currentList = list
                .filter(item => item.getAttribute('tabindex'));
            let currentActive = currentList
                .indexOf(document.activeElement);
            let nextIndex = currentActive + inc;
            return currentList.slice(nextIndex, (nextIndex + 1))[0]
            || currentList.slice(nextIndex)[0]
            || currentList[0];
        };

        sr.appendChild(inputEl);
        sr.appendChild(list);

        qsa('data-list-option', comp)
            .map(child => list.appendChild(child));

        // attach shady styles
        document.head.insertBefore(defaultStyleSheet(), document.head.children[0]);

        //create value prop on component
        Object.defineProperty(comp, 'value', {
            get: () => inputEl.value,
            set: (val) => inputEl.value = val
        });

        // obtain reference to items list: comp[datalist]
        createDatalistProp(comp);

        inputEl.addEventListener('keydown', (e) => {
            if (e.which === 40 || e.which === 38) {
                nextFocusable([...list.children]).focus();
            }
        });

        // bind search filter
        inputEl.addEventListener('input', (e) =>
            toggleItems(e.target.value)(comp[datalist]));

        toggleItems('')(comp[datalist]);

        // bind click on items
        list.addEventListener('click', updateValFromEvent);

        list.addEventListener('keydown', (e) => {
            if (e.which === 40) {
                nextFocusable([...list.children]).focus()
            } else if (e.which === 38) {
                nextFocusable([...list.children], -1).focus()
            } else if (e.which === 13 ) {
                updateValFromEvent(e);
            } else if (isPrintable(e.which)) {
                inputEl.focus();
            }
        });
    },
    onInsertion(comp) {

        const focusClass = (e) => {
            const toggle = hasFocus(comp) ? 'add' : 'remove';
            comp.classList[toggle]('focused');
        };
        //
        window.addEventListener('click', focusClass);
        window.addEventListener('keyup', focusClass);


    },
    onExtraction(comp) {
        // comp[offFocusListener]();
    }
});
