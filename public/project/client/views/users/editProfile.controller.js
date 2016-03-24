(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController(UserService) {
        var vm = this;

        vm.update = update;
        

        UserService
            .getCurrentUser()
            .then(function(response){
                vm.user = response.data;
            });



        function update(user) {
            UserService.updateUser(user._id, user)
                .then(function(response) {
                    vm.message = "Your profile has been updated"
                });
        }

        
    }
})();