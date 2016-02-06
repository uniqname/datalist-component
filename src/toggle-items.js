import itemMatches from './matched-items-filter';

const toggleOn = (item) => {
    item.setAttribute('tabindex', '1');
    return item;
};
const toggleOff = (item) => {
    item.removeAttribute('tabindex');
    return item;
}

export default (val) => (items) => items.map(item => itemMatches(val)(item)
                                                     ? toggleOn(item)
                                                     : toggleOff(item));
