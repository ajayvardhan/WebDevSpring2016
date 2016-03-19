(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                    else{
                        vm.message = "Incorrect username/password";
                    }
                });
        }
    }
})();