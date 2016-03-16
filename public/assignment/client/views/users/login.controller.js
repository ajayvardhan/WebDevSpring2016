(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                    else{
                        $scope.message = "Incorrect username/password";
                    }
                });
        }
    }
})();