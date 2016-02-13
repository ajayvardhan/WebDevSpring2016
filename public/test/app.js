/**
 * Created by ajyva on 2/3/2016.
 */
(function(){
    $(init);
    var $movieTitle;
    var $search;
    var $tbody;
    var $searchURL = "http://www.omdbapi.com/?s=TITLE&page=PAGE"
    var $detailsURL = "http://www.omdbapi.com/?i=ID"
    function init(){
        $movieTitle = $("#movieTitle");
        $search = $("#search");
        $tbody = $("#movieTable tbody")

        $search.click(searchMovie);
    }

    function searchMovie(){
        var val = $movieTitle.val();
        var url = $searchURL.replace("TITLE",val).replace("PAGE",1);
        //alert(url);
        $.ajax({
            url: url,
            success: renderMovie
        });
    }
    function renderMovie(response){
        $tbody.empty();
        console.log(response);
        var total = response.totalRestuls;
        var movies = response.Search;

        for(var i=0;i<movies.length; i++){
            var movie = movies[i];
            var title = movie.Title;
            var imdb = movie.imdbID;
            var poster = movie.Poster
            var img = $("<img>")
                        .attr("src",poster)
                        .addClass("poster")
                        .attr("id", imdb)
                        .click(movieDetails);
            console.log(title);
            var tr = $("<tr>");
            var td = $("<td>");
            td.append(img);
            tr.append(td);
            td = $("<td>").append(title);
            tr.append(td);
            td = $("<td>").append(imdb);
            tr.append(td);
            $tbody.append(tr);
        }
    }
    function movieDetails(event){
        var img = $(event.currentTarget);
        var imdbid = img.attr("id")

        var url = $detailsURL.replace("ID", imdbid)

        $.ajax({
            url: $detailsURL,
            success: renderMovieDetails
        });
    }

    function renderMovieDetails(movie){
        console.log(movie);
    }
})()