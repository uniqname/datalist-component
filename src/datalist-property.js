import qsa from './qsa';
import { datalist } from './symbols'
import mutations from './observe-mutations';

const getDatalist = (comp) => qsa('data-list-option', comp);
export default (comp) => {
    comp[datalist] = getDatalist(comp);

    mutations(comp, { childList: true }, (mutation) =>
        comp[datalist] = getDatalist(comp));
};
