(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController(UserService, $location) {
        var vm = this;
        vm.location = $location;
        UserService
            .getCurrentUser()
            .then(
                function(response){
                    vm.user = response.data;
                }
            );
    }
})();