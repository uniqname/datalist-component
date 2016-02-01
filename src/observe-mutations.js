import curry from 'instant-curry';

const observeMutations = (target, config, handler) => {
    const observer = new MutationObserver(mutations => {
        mutations.map(handler);
    });
    observer.observe(target, config);
    return () => observer.disconect();
};

const curried = curry(observeMutations);
export {  curried as default };
