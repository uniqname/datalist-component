import mutations from './observe-mutations';
import qsa from './qsa';

const mutationConfig = { childList: true,
                        subtree: true,
                        attributes: true,
                        attrubuteFilter: ['content']
                    };

export default (comp) => {
    const sr = document.createElement('shady-root');
    comp.insertBefore(sr, comp.children[0]);

    mutations(sr, mutationConfig, (mutation) => qsa('[select]', sr)
        .map(
            projector => qsa(projector.getAttribute('select'), comp)
                .filter(projectee => !projector.contains(projectee))
                .map(projectee => projector.appendChild(projectee))
        )
    )
    return sr;
};
