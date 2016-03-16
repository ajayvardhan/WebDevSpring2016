(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location, UserService) {
        $scope.logout = logout;
        $scope.location = $location;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                });
        }

        init();

        function logout() {
            UserService
                .logout()
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $location.url("/home");
                })
        }
    }
})();