(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("EditProfileController", EditProfileController);

    function EditProfileController($scope, $location, $rootScope, UserService) {
        $scope.update = update;
        $scope.user = $rootScope.currentUser;
        $scope.goToWatchlist = goToWatchlist;

        function update(user) {
            UserService.updateUser(user._id, user,
                function(response) {
                    $rootScope.currentUser = response;
                });
        }

        function goToWatchlist(){
            $location.url("/watchlist");
        }
    }
})();