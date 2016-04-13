(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {
        var vm = this;

        vm.showSelect = false;
        vm.logout = logout;
        vm.location = $location;
        vm.login = login;
        vm.register = register;
        vm.showModal = showModal;
        vm.goToProfile = goToProfile;
        vm.searchResults = searchResults;
        vm.showSearch = showSearch;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                    }
                });
        }

        init();

        function goToProfile(){
            $location.url("/profile/" + $rootScope.currentUser._id);
        }

        function logout() {
            UserService
                .logout()
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $location.url("/home");
                });
        }

        function login(user) {
            vm.user = null;
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(
                    function(response){
                        if (response.data) {
                            UserService.setCurrentUser(response.data);
                            $('#myModal').modal('hide');
                            $location.url("/posts");
                        }
                        else{
                            $( "#username" ).animate({
                                    backgroundColor: "#ff6666"
                                }, 1000 )
                                .dequeue()
                                .effect( "shake" )
                                .animate({
                                    backgroundColor: "#ffffff"
                                }, 1000 );
                            $( "#password" ).animate({
                                    backgroundColor: "#ff6666"
                                }, 1000 )
                                .dequeue()
                                .effect( "shake" )
                                .animate({
                                    backgroundColor: "#ffffff"
                                }, 1000 );
                        }
                    });
        }

        function register(user) {
            vm.user = null;


            if (user.newpassword != user.password2){
                vm.message = "Passwords don't match";
            }
            else {
                UserService
                    .findUserByUsername(user)
                    .then(
                        function(response){
                            if(response.data){
                                vm.message = "Username already exists";
                            }
                            else{
                                var newUser =
                                {
                                    username : user.username,
                                    password : user.newpassword,
                                    firstName : user.firstname,
                                    lastName : user.lastname
                                };
                                UserService
                                    .createUser(newUser)
                                    .then(
                                        function (response) {
                                            UserService.setCurrentUser(response.data);
                                        });
                                $('#myModal1').modal('hide');
                                $location.url("/posts");
                            }
                        });
            }
        }

        function showModal(){
            vm.message = null;
            vm.user = null;
        }

        function searchResults(search,type){
            switch(type) {
                case "Users":
                    $location.url("/profile/" + search._id);
                    break;
                case "Posts":
                    $location.url("/post/" + search._id);
                    break;
                case "Movies":
                    $location.url("/movie/" + search.imdbID);
                    break;
            }
        }


        function showSearch(){
            vm.showSelect = true;
        }

        $('.icon').click(function () {
            $('.selectType').toggleClass('expanded');
        });
    }
})();