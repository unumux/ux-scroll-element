let _ = require("lodash");

export function determineNextColumn(scrollPos, offsets) {
    let next = determineCurrentColumn(scrollPos, offsets) + 1;

    next = makeInRange(next, 0, Math.max(offsets.length - 1, 0));

    return {
        index: next,
        offset: offsets[next] || 0
    };
}

export function determinePreviousColumn(scrollPos, offsets) {
    let previous = determineCurrentColumn(scrollPos, offsets) - 1;

    if(scrollPos > offsets[previous + 1]) {
        previous++;
    }

    previous = makeInRange(previous, 0, Math.max(offsets.length - 1, 0));

    return {
        index: previous,
        offset: offsets[previous] || 0
    };
}

export function determineCurrentColumn(scrollPos, offsets) {
    let index = _.findLastIndex(offsets, (offset) => scrollPos >= offset);

    return index < 0 ? 0 : index;
}

function makeInRange(val, min, max) {
    if(val < min) {
        return min;
    }

    if(val > max) {
        return max;
    }

    return val;
}
