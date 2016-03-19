(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;

        vm.register = register;

        function register(user) {
            UserService
                .createUser(user)
                .then(function(response){
                    for (var i in response.data){
                        if (response.data[i].username == user.username) {
                            UserService.setCurrentUser(response.data[i]);
                        }
                    }
                    $location.url("/profile");
                });
        }
    }
})();