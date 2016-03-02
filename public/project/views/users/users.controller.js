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
        $scope.addUser = addUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;

        function findUser(id){
            $location.url("/profile/" + id);
        }

        function addUser(user){
            UserService.createUser(user, function(response){
                $scope.newUser="";
            });
        }

        function deleteUser(user){
            UserService.deleteUser(user._id, function(){

            })
        }

        function selectUser(user){
            $scope.newUser = {
                _id : user._id,
                password : user.password,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            };
        }

        function updateUser(user){
            UserService.updateUser(user._id, user, function(){

            })
        }

    }
})();