var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var Client = require('node-rest-client').Client;
var client = new Client();
var movieData = [];
var Movie = require("../models/moviesschema");

router.post("/add",function(req,res){

  client.get("http://www.omdbapi.com/?t="+req.body.movieName+"&y=&plot=full&r=json", function (cdata, response) {
    var mov = new Movie();

    mov.Title=cdata.Title;
    mov.Year=cdata.Year;
    mov.Rated=cdata.Rated;
    mov.Released=cdata.Released;
    mov.Runtime=cdata.Runtime;
    mov.Genre=cdata.Genre;
    mov.Director=cdata.Director;
    mov.Writer=cdata.Writer;
    mov.Actors=cdata.Actors;
    mov.Plot=cdata.Plot;
    mov.Language=cdata.Language;
    mov.Country=cdata.Country;
    mov.Awards=cdata.Awards;
    mov.Poster=cdata.Poster;
    mov.Metascore=cdata.Metascore;
    mov.imdbRating=cdata.imdbRating;
    mov.imdbVotes=cdata.imdbVotes;
    mov.imdbID=cdata.imdbID;
    mov.Type=cdata.Type;
    mov.Response=cdata.Response;

      mov.save(function(err, mov) {
        if (err) 
          return res.send(err);
          
        res.json({ message: 'Doc added to the locker!', data: mov });
      });
  });

});


router.get('/list', function(req, res){
  Movie.find(function(err, movieList){
    if(err)
      res.send(err);

    res.json(movieList);
  })
})


router.put('/update/:movie_id',function(req,res){
  Movie.findById(req.params.movie_id, function(err, movieRec){
    if(err)
      res.send(err);

    movieRec.Title=req.body.Title;
    movieRec.Year=req.body.Year;
    movieRec.Rated=req.body.Rated;


    movieRec.save(function(err){
      if(err)
        res.send(err);

      res.json(movieRec);

    })
  })
})


router.delete("/del/:movie_id",function(req, res){
  Movie.findByIdAndRemove(req.params.movie_id, function(err,movieRec){
    if(err)
      res.send(err)

    res.json({message: req.params.movie_id+" Deleted"});
  })
})

module.exports = router;
