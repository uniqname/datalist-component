export default (comp) => {
    let next = document.activeElement;

    while (next) {
        if (next === comp) {
            return true;
        }
        next = next.parentElement;
    }
    return false;
};
