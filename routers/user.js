var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  
  if(req.session.userId){
    req.getConnection(function(err, connection){
      if(err){ return next(err); }

      connection.query("SELECT * FROM users WHERE id = ?", [req.session.userId], function(err, records){
        if(err){ return next(err); }

        console.log(records);
        var name = records[0].name;
        res.render('./user', {name: name, req: req});
      });

      
    });
  } else {
    res.redirect('/user/login');
  }
});

router.get('/login', function(req, res){
	  res.render('./user/login', {
		  req: req,
    	error: null,
  	});
});

router.get('/logout', function(req, res){
  req.session.destroy(function() {
    res.redirect(req.baseUrl + "/");
  });
});

router.post('/login', function(req, res, next){
  var username = req.body.email;
  var password = req.body.password;
  
  req.getConnection(function(err, connection){
    if(err){ next(err); }

    connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [username, password], function(err, records){
      if(err){ next(err); }

      console.log(records);

      if(records.length > 0){
        req.session.userId = records[0].id;
        console.log("Logged in! HOORAY", records[0]);
        res.redirect(req.baseUrl + "/");
      } else {
        var data = {
          req: req,
          error: "Oh noes!"
        }
        res.render("user/login", data);
      }
    });

  });

});

module.exports = router;