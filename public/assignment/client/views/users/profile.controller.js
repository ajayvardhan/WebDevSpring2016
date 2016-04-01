(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService) {
        var vm = this;
        
        vm.update = update;
        UserService
            .getCurrentUser()
            .then(function(response){
                vm.user = response.data;
            });

        function update(user) {
            UserService
                .updateUser(user._id, user)
                .then(function(response){
                    console.log(user);
                    UserService
                        .setCurrentUser(user);
                });
        }
    }
})();