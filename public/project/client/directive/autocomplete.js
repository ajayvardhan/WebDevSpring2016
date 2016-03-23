(function () {
    'use strict';
    angular
        .module('autoComplete', [])
        .directive('autoComplete', autoComplete);

    function autoComplete($timeout) {
        return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                    }, 0);
                }
            });
        };
    }
})();