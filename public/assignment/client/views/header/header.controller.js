(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.logout = logout;
        $scope.location = $location;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();