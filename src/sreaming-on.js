const skipit = Symbol('skipit');

export default (evtName) => function streamer(obj, reducerItem) {
    return {
        map: (fn) => streamer(obj === skipit ? skipit : fn(obj)),
        filter: (fn) => ((obj === skipit) || !fn(obj)) ? streamer(obj) : streamer(skipit)),
        reduce: (fn) => streamer(fn(obj, reducerItem));
    };
}

streamEvents('click')(target)
    //returns a obj[map, filter, reduce]
    .map(e => fn)
