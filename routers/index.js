var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

  req.getConnection(function(err, connection){
    if(err){ return next(err); }

    connection.query('SELECT * FROM photos ORDER BY id DESC', function(err, photos){
      if(err){ return next(err); }

       	connection.query('SELECT * FROM comments', function(err, comments){
	      if(err){ return next(err); }
	      	 res.render('home/index', {comments: comments ,photos: photos, req: req});
	      });
    });
  });

});

router.post('/:id/comment', function(req, res) {
	var index = req.params.id;
	var d = new Date();
	var yy = d.getFullYear();
	var mm = d.getMonth();
	var dd = d.getDay();
	var date =  mm+'/'+dd+'/'+yy;

	var comment = req.body.comment;
	
	req.getConnection(function(err, connection){
      	if(err){ next(err); }

		    connection.query('INSERT INTO comments (photo_id, created_at, comment) VALUES (?)', [[index, date, comment]], function(){
		    	res.redirect('/index');
		    });
	});
	

});

module.exports = router;



 // connection.query('INSERT INTO comments (photo_id, created_at, comment) VALUES (?)', [[index, date, comment]], function(){
	//     	res.send(index + date + comment);
	//     });