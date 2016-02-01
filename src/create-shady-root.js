export default (comp) => {
    const sr = document.createElement('shady-root');
    comp.insertBefore(sr, comp.children[0]);
    return sr;
};
