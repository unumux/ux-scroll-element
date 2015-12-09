var expect = require("expect");

var util = require("../src/util.js");
var determineNextColumn = util.determineNextColumn;
var determinePreviousColumn = util.determinePreviousColumn;
var determineCurrentColumn = util.determineCurrentColumn;

describe("determineNextColumn function", function() {
    it("should go to the next column", function() {
        expect(determineNextColumn(0, [0, 200, 300, 400], 1000, 200)).toEqual({ index: 1, offset: 200 });
        expect(determineNextColumn(200, [0, 200, 300, 400], 1000, 200)).toEqual({ index: 2, offset: 300 });
    });

    it("should go to the next when next is used halfway between columns", function() {
        expect(determineNextColumn(100, [0, 200, 300, 400], 1000, 200)).toEqual({ index: 1, offset: 200 });
        expect(determineNextColumn(250, [0, 200, 300, 400], 1000, 200)).toEqual({ index: 2, offset: 300 });
    });

    it("should behave properly with an array of 1 item", function() {
        expect(determineNextColumn(0, [0], 1000, 200)).toEqual({ index: 0, offset: 800 });
    });

    it("should behave properly with an empty array", function() {
        expect(determineNextColumn(0, [], 1000, 200)).toEqual({ index: 0, offset: 800 });
    });

    it("should not return a number that is past the maximum scrolling amount", function() {
        expect(determineNextColumn(400, [0, 200, 300, 400], 1000, 800)).toEqual({ index: 1, offset: 200 });
        expect(determineNextColumn(400, [0, 200, 300, 400], 1000, 1000)).toEqual({ index: 0, offset: 0 });
    });

    it("should scroll to the end if it's on the last column", function() {
        expect(determineNextColumn(3060, [0, 200, 400, 600, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200, 3400, 3600, 3800, 4000, 4200], 4400, 1280)).toEqual({ index: 13, offset: 3120 })
    });
});

describe("determinePreviousColumn function", function() {

    it("should go to the previous column", function() {
        expect(determinePreviousColumn(200, [0, 200, 300, 400], 1000, 200)).toEqual({ index: 0, offset: 0 });
        expect(determinePreviousColumn(300, [0, 200, 300, 400], 1000, 200)).toEqual({ index: 1, offset: 200 });
    });

    it("should move to start of current column if previous is used halfway between columns", function() {
        expect(determinePreviousColumn(100, [0, 200, 300, 400], 1000, 200)).toEqual({ index: 0, offset: 0 });
        expect(determinePreviousColumn(250, [0, 200, 300, 400], 1000, 200)).toEqual({ index: 1, offset: 200 });
    });

    it("should not go below 0", function() {
        expect(determinePreviousColumn(0, [0, 200, 300, 400], 1000, 200)).toEqual({ index: 0, offset: 0 });
        expect(determinePreviousColumn(-10, [0, 200, 300, 400], 1000, 200)).toEqual({ index: 0, offset: 0 });
    });

    it("should behave properly with an array of 1 item", function() {
        expect(determinePreviousColumn(0, [0], 1000, 200)).toEqual({ index: 0, offset: 0 });
    });

    it("should behave properly with an empty array", function() {
        expect(determinePreviousColumn(0, [], 1000, 200)).toEqual({ index: 0, offset: 0 });
    });

});

describe("determineCurrentColumn function", function() {

    it("should determine the current column", function() {
        expect(determineCurrentColumn(0, [0, 200, 300, 400])).toEqual(0);
        expect(determineCurrentColumn(200, [0, 200, 300, 400])).toEqual(1);
        expect(determineCurrentColumn(300, [0, 200, 300, 400])).toEqual(2);
        expect(determineCurrentColumn(400, [0, 200, 300, 400])).toEqual(3);
    });

    it("should determine the current column when offset is not directly equal to a column", function() {
        expect(determineCurrentColumn(10, [0, 200, 300, 400])).toEqual(0);
        expect(determineCurrentColumn(250, [0, 200, 300, 400])).toEqual(1);
        expect(determineCurrentColumn(399, [0, 200, 300, 400])).toEqual(2);
        expect(determineCurrentColumn(400, [0, 200, 300, 400])).toEqual(3);
    });

    it("should not go below 0", function() {
        expect(determineCurrentColumn(0, [0, 200, 300, 400])).toEqual(0);
        expect(determineCurrentColumn(-10, [0, 200, 300, 400])).toEqual(0);
    });

    it("should not go above number of columns", function() {
        expect(determineCurrentColumn(500, [0, 200, 300, 400])).toEqual(3);
        expect(determineCurrentColumn(401, [0, 200, 300, 400])).toEqual(3);
    });

    it("should behave properly with an array of 1 item", function() {
        expect(determineCurrentColumn(0, [0])).toEqual(0);
    });

    it("should behave properly with an empty array", function() {
        expect(determineCurrentColumn(0, [])).toEqual(0);
    });

});
