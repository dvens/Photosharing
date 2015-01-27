var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

  req.getConnection(function(err, connection){
    if(err){ return next(err); }

    connection.query('SELECT * FROM photos ORDER BY id DESC', function(err, photos){
      if(err){ return next(err); }

       	connection.query('SELECT * FROM comments', function(err, comments, comment){
	      if(err){ return next(err); }
	      	 res.render('home/index', {comments: comments, comment: comment, photos: photos, req: req});
	      });
    });
  });

});

router.post('/:id/comment', function(req, res){
	var id = req.params.id;
	var comment = req.body.comment;

	var d = new Date();
	var yy = d.getFullYear();
	var mm = d.getMonth();
	var dd = d.getDay();
	var day = mm+'/'+dd+'/'+yy;

  	req.getConnection(function(err, connection){
  		if(err){ next(err); }

	    connection.query("INSERT INTO comments (photo_id, created_at , comment) VALUES (?)", [[id, day, comment]], function(){
	    	res.redirect(req.baseUrl);
	    });
    });
});


module.exports = router;

