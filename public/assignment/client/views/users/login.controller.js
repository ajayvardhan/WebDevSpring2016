(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;

        vm.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user)
                .then(
                    function(response)
                    {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    },
                    function(err) {
                        vm.message = err;
                    });
        }
    }
})();