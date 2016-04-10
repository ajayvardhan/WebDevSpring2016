(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;

        vm.register = register;

        function register(user) {
            if (!user){
                vm.message = "Please enter the details"
            }
            else if(!user.username){
                vm.message = "Please enter an username"
            }
            else if(!user.password){
                vm.message = "Please enter a password"
            }
            else if(user.password != user.password2){
                vm.message = "Passwords don't match"
            }
            else if(!user.emails){
                vm.message = "Please enter an email"
            }
            else {
                var emails = user.emails;
                user.emails = [];
                user.emails.push(emails);
                UserService
                    .createUser(user)
                    .then(function (response) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    });
            }
        }
    }
})();