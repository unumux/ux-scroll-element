var expect = require("expect");

import { determineNextColumn, determinePreviousColumn, determineCurrentColumn } from "../src/util.js";

describe("determineNextColumn function", function() {
    it("should go to the next column", function() {
        expect(determineNextColumn(0, [0, 200, 300, 400])).toEqual({ index: 1, offset: 200 });
        expect(determineNextColumn(200, [0, 200, 300, 400])).toEqual({ index: 2, offset: 300 });
    });

    it("should go to the next when next is used halfway between columns", function() {
        expect(determineNextColumn(100, [0, 200, 300, 400])).toEqual({ index: 1, offset: 200 });
        expect(determineNextColumn(250, [0, 200, 300, 400])).toEqual({ index: 2, offset: 300 });
    });

    it("should not go past the last column", function() {
        expect(determineNextColumn(400, [0, 200, 300, 400])).toEqual({ index: 3, offset: 400 });
        expect(determineNextColumn(500, [0, 200, 300, 400])).toEqual({ index: 3, offset: 400 });
    });

    it("should behave properly with an array of 1 item", function() {
        expect(determineNextColumn(0, [0])).toEqual({ index: 0, offset: 0 });
    });

    it("should behave properly with an empty array", function() {
        expect(determineNextColumn(0, [])).toEqual({ index: 0, offset: 0 });
    });
});

describe("determinePreviousColumn function", function() {

    it("should go to the previous column", function() {
        expect(determinePreviousColumn(200, [0, 200, 300, 400])).toEqual({ index: 0, offset: 0 });
        expect(determinePreviousColumn(300, [0, 200, 300, 400])).toEqual({ index: 1, offset: 200 });
    });

    it("should move to start of current column if previous is used halfway between columns", function() {
        expect(determinePreviousColumn(100, [0, 200, 300, 400])).toEqual({ index: 0, offset: 0 });
        expect(determinePreviousColumn(250, [0, 200, 300, 400])).toEqual({ index: 1, offset: 200 });
    });

    it("should not go below 0", function() {
        expect(determinePreviousColumn(0, [0, 200, 300, 400])).toEqual({ index: 0, offset: 0 });
        expect(determinePreviousColumn(-10, [0, 200, 300, 400])).toEqual({ index: 0, offset: 0 });
    });

    it("should behave properly with an array of 1 item", function() {
        expect(determinePreviousColumn(0, [0])).toEqual({ index: 0, offset: 0 });
    });

    it("should behave properly with an empty array", function() {
        expect(determinePreviousColumn(0, [])).toEqual({ index: 0, offset: 0 });
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
