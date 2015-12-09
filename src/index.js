/* global angular */

var util = require("./util");

var uxModule = angular.module("uxColumnSelect", [require("angular-scroll")]);

uxModule.factory("UXColumnSelectService", [function() {
    var _index = 0;

    var _btnState = {
        previousDisabled: true,
        nextDisabled: true
    };

    var _listeners = {
        next: [],
        previous: [],
        btnState: []
    };

    function _execListeners(listenerKey, data) {
        var listeners = _listeners[listenerKey];
        if (listeners.length > 0) {
            listeners.forEach(function(cb) {
                if (typeof cb === "function") {
                    if(data) {
                        cb(data);
                    } else {
                        cb();
                    }
                }
            });
        }
    }

    return {
        getIndex: function() {
            return _index;
        },
        setIndex: function(index) {
            _index = index;
        },
        next: function() {
            _execListeners("next");
        },
        previous: function() {
            _execListeners("previous");
        },
        getBtnState: function() {
            return _btnState;
        },
        setBtnState: function(state) {
            _btnState = state;
            _execListeners("btnState", _btnState);
        },
        on: function(event, cb) {
            _listeners[event].push(cb);
        }
    };
}]);

uxModule.directive("uxColumnSelectControls", ["UXColumnSelectService", function(UXColumnSelectService) {
    return {
        link: function(scope) {
            scope.previousDisabled = UXColumnSelectService.getBtnState().previousDisabled;
            scope.nextDisabled = UXColumnSelectService.getBtnState().nextDisabled;

            UXColumnSelectService.on("btnState", function(state) {
                scope.previousDisabled = state.previousDisabled;
                scope.nextDisabled = state.nextDisabled;
            });

            scope.onNext = function() {
                UXColumnSelectService.next();
            };

            scope.onPrevious = function() {
                UXColumnSelectService.previous();
            };

        }
    };
}]);

uxModule.directive("uxColumnSelect", ["UXColumnSelectService", function(UXColumnSelectService) {
    return {
        link: function(scope, element) {
            var _actualColumn = util.determineCurrentColumn(element[0].scrollLeft, getOffsets(element.children()));
            var _animating = false;

            var easing = {
                linear: function (t) { return t; }
            };

            function getColumnOffset(el) {
                return el[0].offsetLeft - el.parent()[0].offsetLeft;
            }

            function getOffsets(els) {
                var offsets = [];
                for (var i = 0; i < els.length; i++) {
                    var offset = getColumnOffset(els.eq(i));
                    offsets.push(offset);
                }
                return offsets;
            }

            function getScrollLeft() {
                return _animating ? _actualColumn.offset : element[0].scrollLeft;
            }

            function scrollTo(colObj) {
                _animating = true;
                UXColumnSelectService.setIndex(_actualColumn.index);
                setButtonsDisabled(colObj.offset);
                element.scrollTo(colObj.offset, 0, 200, easing.linear).then(function() {
                    _animating = false;
                });
            }

            function setButtonsDisabled(scrollLeft) {
                var previousDisabled = false;
                var nextDisabled = false;
                if(scrollLeft <= 0) {
                    previousDisabled = true;
                }

                if(scrollLeft >= element[0].scrollWidth - element[0].offsetWidth) {
                    nextDisabled = true;
                }

                UXColumnSelectService.setBtnState({
                    previousDisabled: previousDisabled,
                    nextDisabled: nextDisabled
                });
            }

            function updateState() {
                if(!_animating) {
                    var scrollLeft = element[0].scrollLeft;
                    setButtonsDisabled(scrollLeft);
                }
            }

            UXColumnSelectService.on("next", function() {
                var scrollLeft = getScrollLeft();
                var offsets = getOffsets(element.children());
                _actualColumn = util.determineNextColumn(scrollLeft, offsets, element[0].scrollWidth, element[0].offsetWidth);
                scrollTo(_actualColumn);
            });

            UXColumnSelectService.on("previous", function() {
                var scrollLeft = getScrollLeft();
                var offsets = getOffsets(element.children());
                _actualColumn = util.determinePreviousColumn(scrollLeft, offsets, element[0].scrollWidth, element[0].offsetWidth);
                scrollTo(_actualColumn);
            });


            element.on("scroll", function() { scope.$apply(updateState); });
            angular.element(window).on("resize", function() { scope.$apply(updateState); });
            updateState();
        }
    };
}]);
