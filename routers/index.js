var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

  req.getConnection(function(err, connection){
    if(err){ return next(err); }

    connection.query('SELECT * FROM photos ORDER BY id DESC', function(err, photos){
      if(err){ return next(err); }
      res.render('home/index', {photos: photos, req: req});
    });
  });

});

module.exports = router;