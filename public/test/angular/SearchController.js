(function(){
    angular
        .module("SongApp")
        .controller("SearchController",searchController);

    function searchController($scope){
        $scope.songs=[
            {artist:"A R Rahman",album:"Roja"},
            {artist:"Santhosh Narayanan",album:"Pizza"}
        ];

        $scope.testClick=testClick;

        function testClick(){
            $scope.a=5;
        }
    }
})();