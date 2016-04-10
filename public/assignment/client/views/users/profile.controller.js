(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope) {
        var vm = this;
        
        vm.update = update;

        UserService
            .getCurrentUser()
            .then(
                function(response){
                    vm.user = response.data;
                }
            );

        function update(user) {
            var emails = user.emails.toString();
            emails = emails.split(",");
            user.emails = emails;
            UserService
                .updateUser(user._id, user)
                .then(function(response){
                    UserService
                        .setCurrentUser(user);
                });
        }
    }
})();