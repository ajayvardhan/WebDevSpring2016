(function(){
    angular
        .module('MyModule', [])
        .controller('defaultController', defaultController)
        .directive('autoComplete', autoComplete);

    function defaultController($scope){
        $scope.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine",
            "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas",
            "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];
    }

    function autoComplete($timeout){
        return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                        iElement.trigger('input');
                    }, 0);
                }
            });
        };
    }
})();