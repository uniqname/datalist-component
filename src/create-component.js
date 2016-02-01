import qsa from './qsa';
import { isUpgraded } from './symbols';
import mutations from './observe-mutations';

const attrChangeConfig = {attributes: true};
const componentInsExConfig = {childList: true, subtree: true};
const onlyNodeName = name => {
    const re = new RegExp(`^${name}$`, 'i');
    return ({nodeName}) => !!nodeName.match(re);
};
const isNotUpgradedFilter = comp => !comp[isUpgraded];

const upgradeComponent = ({onCreate,
                        onAttrChange,
                        onInsertion}) => (comp) => {

    //immediately create componets for existing selectors
    onCreate(comp);

    //immediately call onInsertion for existing componets
    onInsertion(comp);

    //listen for attrChange events
    mutations(comp,
        attrChangeConfig,
        (record, oldValue, newValue) => onAttrChange(
            record.attributeName,
            comp.getAttribute(record.attributeName),
            oldValue
        )
    );

    //set upgraded flag
    comp[isUpgraded] = true;

    return comp;
};

export default (tagName, {
    onCreate = (comp) => undefined,
    onAttrChange = (comp) => undefined,
    onInsertion = (comp) => undefined,
    onExtraction = (comp) => undefined
}={}) => {
    const tagNameFilter = onlyNodeName(tagName);
    const upgrader = upgradeComponent({onCreate,
                                        onAttrChange,
                                        onInsertion,
                                        onExtraction});

    //Find all existing
    qsa(tagName)
        .filter(isNotUpgradedFilter)
        .map(upgrader);

    //listen for add/remove from document
    mutations(document.body,
              componentInsExConfig,
              ({removedNodes, addedNodes}) => {
                [...removedNodes]
                    .filter(tagNameFilter)
                    .map(onExtraction);

                [...addedNodes]
                    .filter(tagNameFilter)
                    .map(comp => {
                        isNotUpgradedFilter(comp) ?
                        upgrader(comp) :
                        onInsertion(comp)
                    })

              }
    );
}
