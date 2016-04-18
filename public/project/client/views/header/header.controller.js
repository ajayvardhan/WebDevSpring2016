(function() {
    "use strict";
    angular
        .module("NowWatching")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, UserService) {
        var vm = this;

        vm.searchType = "post";

        vm.showSelect = false;
        vm.logout = logout;
        vm.location = $location;
        vm.login = login;
        vm.register = register;
        vm.showModal = showModal;
        vm.goToProfile = goToProfile;
        vm.showSearch = showSearch;
        vm.showSearchBar = showSearchBar;
        vm.postSearch = postSearch;
        vm.userSearch = userSearch;
        vm.movieSearch = movieSearch;
        vm.searchKey = searchKey;

        function searchKey(key){
            switch(vm.searchType) {
                case "user":
                    $location.url("/profile/" + key._id);
                    break;
                case "post":
                    $location.url("/post/" + key._id);
                    break;
                case "movie":
                    $location.url("/movie/" + key.imdbID);
                    break;
            }
        }

        function postSearch(){
            vm.searchType = "post";
        }

        function userSearch(){
            vm.searchType = "user";
        }

        function movieSearch(){
            vm.searchType = "movie";
        }

        function goToProfile(){
            $location.url("/profile/" + $rootScope.currentUser._id);
        }

        function logout() {
            UserService
                .logout()
                .then(function(response){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }

        function login(user) {
            vm.user = null;
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(
                    function(response){
                        UserService.setCurrentUser(response.data);
                        $('#myModal').modal('hide');
                        $location.url("/posts");
                    },
                    function(error){
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
                                UserService
                                    .getCurrentUser()
                                    .then(function(response){
                                        console.log(response.data);
                                    });
                                // $location.url("/posts");
                            }
                        });
            }
        }

        function showModal(){
            vm.message = null;
            vm.user = null;
        }

        function showSearch(){
            vm.showSelect = true;
        }

        $('.icon').click(function () {
            $('.selectType').toggleClass('expanded');
        });


        // _____________________________________________________________

        function showSearchBar(){
            $( "#searchBar" ).toggle("blind");
        }

        $("#searchBar").hide();


    }
})();