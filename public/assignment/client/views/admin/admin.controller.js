(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService){
        var vm = this;

        vm.selectUser = selectUser;
        vm.addUser = addUser;
        vm.modifyUser = modifyUser;
        vm.removeUser = removeUser;

        function init(){
            UserService
                .findAllUsers()
                .then(
                    function(response){
                        vm.users = response.data;
                    }
                )
        }

        init();


        function selectUser(user){
            vm.selectedUser = {
                _id: user._id,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                emails: user.emails,
                roles: user.roles
            }
        }

        function addUser(user){
            UserService
                .addUser(user)
                .then(
                    function(response){
                        vm.selectedUser = null;
                        vm.users = response.data;
                    }
                )
        }

        function modifyUser(user){
            UserService
                .modifyUser(user)
                .then(
                    function(response){
                        vm.selectedUser = null;
                        vm.users = response.data;
                    }
                )
        }

        function removeUser(user){
            UserService
                .deleteUserById(user._id)
                .then(
                    function(response){
                        vm.users = response.data;
                    }
                )
        }
    }
})();