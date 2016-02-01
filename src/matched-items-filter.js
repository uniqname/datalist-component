export default (val) => {
    const v = val ? val.toLowerCase() : '';

    return v
        ? (item) => item.getAttribute('value').toLowerCase().match(v) ||
                    item.textContent.toLowerCase().match(v)
        : () => false;
};
