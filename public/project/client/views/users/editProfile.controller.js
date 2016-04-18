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
                vm.userpassword = null;
            });



        function update(user) {
            if(vm.userpassword){
                if(vm.userpassword2) {
                    if (vm.userpassword == vm.userpassword2) {
                        user.password = vm.userpassword;
                    }
                    else {
                        vm.message = "Passwords don't match";
                        user.password = vm.userpassword = null;
                    }
                }
                else{
                    vm.message = "Confirm password can't be left blank";
                }
            }
            UserService.updateUser(user._id, user)
                .then(function(response) {
                    vm.message = "Your profile has been updated"
                });
        }

        
    }
})();