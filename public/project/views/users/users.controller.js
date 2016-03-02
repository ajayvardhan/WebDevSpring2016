(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("UsersController", UsersController);

    function UsersController($scope, $location, UserService) {
        UserService.findAllUsers( function(response){
            $scope.users = response;
        });

        $scope.findUser = findUser;

        function findUser(id){
            $location.url("/profile/" + id);
        }
    }
})();