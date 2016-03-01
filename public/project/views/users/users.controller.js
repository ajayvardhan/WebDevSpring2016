(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("UsersController", UsersController);

    function UsersController($scope, UserService) {
        UserService.findAllUsers( function(response){
            $scope.users = response;
        });
    }
})();