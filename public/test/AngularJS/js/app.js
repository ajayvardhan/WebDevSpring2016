/**
 * Created by ajyva on 2/18/2016.
 */
(function(){
    angular
        .module("SongSearch",[])
        .controller("SongSearchController", songSearchController);

    function songSearchController($scope){
        $scope.songs=[
            {artist:"A R Rahman",album:"Roja"},
            {artist:"Santhosh Narayanan",album:"Pizza"}
        ];

        $scope.song={artist:"Ghibran",album:"Uttama Villain"};

        $scope.AddSong = addSong;
        $scope.SongDelete = deleteSong;

        function addSong(song){
            var newSong={
                artist:song.artist,
                album:song.album
            };
            $scope.songs.push(newSong);
            song.artist="";
            song.album="";
        }

        function deleteSong(song){
            var index = $scope.songs.indexOf(song);
            $scope.songs.splice(index, 1);
        }
    }
})();