var _ = require("lodash");

function determineNextColumn(scrollPos, offsets, scrollWidth, containerWidth) {
    var offsetsWithMax = determineOffsetsWithMax(offsets, scrollWidth - containerWidth);

    var next = determineCurrentColumn(scrollPos, offsetsWithMax) + 1;
    var nextInRange = makeInRange(next, 0, Math.max(offsetsWithMax.length - 1, 0));


    var offset = next > nextInRange ? scrollWidth - containerWidth : offsetsWithMax[nextInRange];

    return {
        index: nextInRange,
        offset: offset || 0
    };
}

function determinePreviousColumn(scrollPos, offsets, scrollWidth, containerWidth) {
    var offsetsWithMax = determineOffsetsWithMax(offsets, scrollWidth - containerWidth);

    var previous = determineCurrentColumn(scrollPos, offsetsWithMax) - 1;

    if(scrollPos > offsetsWithMax[previous + 1]) {
        previous++;
    }

    previous = makeInRange(previous, 0, Math.max(offsetsWithMax.length - 1, 0));

    return {
        index: previous,
        offset: offsetsWithMax[previous] || 0
    };
}

function determineCurrentColumn(scrollPos, offsets) {
    var index = _.findLastIndex(offsets, function(offset) {
        return scrollPos >= offset;
    });

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

function determineOffsetsWithMax(offsets, max) {
    return offsets.filter(function(offset) {
        return offset <= max;
    });
}

module.exports = {
    determineNextColumn: determineNextColumn,
    determinePreviousColumn: determinePreviousColumn,
    determineCurrentColumn: determineCurrentColumn
};
