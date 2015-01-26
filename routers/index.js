var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){

  req.getConnection(function(err, connection){
    if(err){ return next(err); }

    connection.query('SELECT * FROM photos', function(err, users){
      if(err){ return next(err); }
      res.render('home/index', {users: users});
    });
  });

});

module.exports = router;