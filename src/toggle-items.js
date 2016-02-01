import itemMatches from './matched-items-filter';

const toggleOn = (item) => item.setAttribute('tabindex', '1');
const toggleOff = (item) => item.removeAttribute('tabindex');

export default (val) => (items) => items.map(item => itemMatches(val)(item)
                                                     ? toggleOn(item)
                                                     : toggleOff(item));
