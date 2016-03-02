(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController($scope, $rootScope, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.currentUser;

        function update(user) {
            UserService.updateUser(user._id, user,
                function(response) {
                    $rootScope.currentUser = response;
                });
        }
    }
})();