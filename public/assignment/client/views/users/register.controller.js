(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.register = register;

        function register(user) {
            UserService
                .createUser(user)
                .then(function(response){
                    UserService.setCurrentUser(user);
                    $location.url("/profile");
                });
        }
    }
})();