(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController($scope, UserService) {
        $scope.update = update;
        

        UserService
            .getCurrentUser()
            .then(function(response){
                $scope.user = response.data;
            });



        function update(user) {
            UserService.updateUser(user._id, user)
                .then(function(response) {
                    $scope.message = "Your profile has been updated"
                });
        }

        
    }
})();