(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {
        var vm = this;

        vm.location = $location;
        vm.logout = logout;

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