(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        $scope.update = update;
        UserService
            .getCurrentUser()
            .then(function(response){
                $scope.user = response.data;
            });

        function update(user) {
            UserService.updateUser(user._id, user);
        }
    }
})();