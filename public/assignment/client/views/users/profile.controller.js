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
                vm.user.emails = response.data.emails[0];
            });

        function update(user) {
            UserService
                .updateUser(user._id, user)
                .then(function(response){
                    UserService
                        .setCurrentUser(response.data);
                });
        }
    }
})();