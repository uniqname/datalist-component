import qsa from './qsa';
import createComponent from './create-component';
import createShadyRoot  from './create-shady-root';
import template from './shady-template';
import createDatalistProp  from './datalist-property';
import defaultStyleSheet from './default-style-sheet';
import toggleItems from './toggle-items';
import { datalist, offFocusListener } from './symbols';
import isPrintable from './is-printable-char';

createComponent('data-list', {
    onCreate(comp) {

        // attach shady-root
        const sr = createShadyRoot(comp);
        sr.appendChild(template());

        const fieldEl = qsa('input[type="text"]', sr)[0];
        const valueEl = qsa('input[type="hidden"]', sr)[0];
        valueEl.name = comp.getAttribute('name');

        const list = qsa('[select="data-list-option"]', sr)[0];

        const updateValFromItem = (item) => {
            const val = item.getAttribute('value');
            comp.value = val;
            comp.valueName = item.textContent
            const nextField = comp.nextElementSibling
            if (nextField) {
                nextField.focus();
            }
        }

        const updateValFromEvent = (e) => {
            updateValFromItem(e.target);
        }

        const nextFocusable = (list, inc = 1) => {
            const currentList = list
                .filter(item => item.getAttribute('tabindex'));
            const currentActive = currentList
                .indexOf(document.activeElement);
            const nextIndex = currentActive + inc;
            return currentList.slice(nextIndex, (nextIndex + 1))[0]
               || currentList.slice(nextIndex)[0]
               || currentList[0];
        };

        // attach shady styles
        document.head.insertBefore(defaultStyleSheet(), document.head.children[0]);

        //create value prop on component
        Object.defineProperty(comp, 'value', {
            get: () => valueEl.value,
            set: (val) => {
                valueEl.value = val;
                toggleItems(val)(comp[datalist]);
            }
        });

        //create valueName prop on component
        Object.defineProperty(comp, 'valueName', {
            get: () => fieldEl.value,
            set: (valName) => {
                fieldEl.value = valName;
                toggleItems(valName)(comp[datalist]);
            }
        });

        Object.defineProperty(comp, 'name', {
            get: () => valueEl.name,
            set: (name) => valueEl.name = name
        });

        // obtain reference to items list: comp[datalist]
        createDatalistProp(comp);

        fieldEl.addEventListener('keydown', (e) => {
            if (e.which === 40 || e.which === 38) {
                e.preventDefault();
                nextFocusable([...list.children]).focus();
            } else if (e.which === 13) {
                e.preventDefault();
                //select first matching item
                updateValFromItem(nextFocusable([...list.children]));
            }
        });

        // bind search filter
        fieldEl.addEventListener('input', (e) => {
            const matches = comp[datalist]
                .filter(items => items.getAttribute('tabindex'));
            comp.value = matches.length === 1
                            ? matches[0].getAttribute('value')
                            : comp.valueName;
        });

        toggleItems('')(comp[datalist]);

        // bind click on items
        list.addEventListener('click', updateValFromEvent);

        list.addEventListener('keydown', (e) => {
            e.preventDefault();
            if (e.which === 40) {
                nextFocusable([...list.children]).focus();
            } else if (e.which === 38) {
                nextFocusable([...list.children], -1).focus();

            } else if (e.which === 13) {
                updateValFromEvent(e);
            } else if (e.which === 8) {
                comp.valueName = comp.valueName.slice(0, -1);
            } else if (isPrintable(e.which)) {
                comp.valueName = `${comp.valueName}${String.fromCharCode(e.which)[e.shiftKey ? 'toUpperCase' : 'toLowerCase']()}`;
            }
        });

    },
    onInsertion(comp) {

        const focusClass = (e) => {
            const toggle = comp.contains(document.activeElement) ? 'add' : 'remove';
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
