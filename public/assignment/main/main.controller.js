(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController",MainController);

    function MainController($scope,$location,$rootScope){
        $scope.location=$location;
        $scope.c = c;

        function c(){
            console.log($rootScope.loggedInUser);
        }

    }


})();