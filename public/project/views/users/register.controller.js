(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.register = register;

        function register(user) {
            UserService.createUser(user,
                function (response) {
                    $rootScope.currentUser = response;
                });
            $location.url("/home");
        }
    }
})();