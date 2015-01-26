var express = require('express');
var router = express.Router();
 
 router.get('/', function(req, res) {
 	res.render('user_registreren/registreren', {req: req});
 });

router.post('/', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	var name = req.body.name;

	req.getConnection(function(err, connection) {
		if(err){
			next(err);
		}

		connection.query('SELECT * FROM users', function(err, records){
    		if(err){ return next(err); }
 			
   //  		for(var i = 0; i < records.length; i++){
   //  			// console.log(records[i].email);

   //  			if(email == records[i].email) { //email al bestaat
			// 		res.send("Deze gebruikersnaam bestaal al, Probeer een in te loggen");
			// 		// res.redirect('/login');
			// 	}
			// }
			connection.query('INSERT INTO users (email, password, name) VALUES (?)', [[email, password, name]]);
			res.redirect('/index');
    	});
	});
});


module.exports = router;
