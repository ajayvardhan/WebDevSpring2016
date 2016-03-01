(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password,
                function(response) {
                    if (response) {
                        $rootScope.currentUser = response;
                        $location.url("/home");
                    }
                    else{
                        $scope.message = "Incorrect username/password";
                    }
                });
        }
    }
})();