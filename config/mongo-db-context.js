const session    = require('express-session');
const mongoose   = require('mongoose');
const mongoStore = require('connect-mongo')(session);

//Local connection
let mongoConnectionLocal = {	
	'url': 'mongodb://sarwin:01610715@127.0.0.1:27017/aws-s3-image-upload'
};

let mongoConnectionOnline = {
	'url': 'mongodb://usernameValue:01610715@xxxxxxxx.mlab.com:39942/aws-s3-image-upload'
};


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Session storage and database configuration 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.pickEnv = (env, app) => {
	mongoose.Promise = global.Promise;
	switch (env) {
		case 'dev':
			app.set('port', process.env.PORT || 9000);
		    mongoose.connect(mongoConnectionOnline.url, err => { if(err) { console.log(err.stack); }}); 
		    break;
		case 'local':
	    	app.set('port', process.env.PORT || 9001);
	        mongoose.connect(mongoConnectionLocal.url, {auth:{authdb:"admin"}},  err => { if(err) { console.log(err); }});
			break;
	};

	app.use(session({
		secret : "xxxxxxxxxxxxxxxxxxxxx",    
		resave : true,
	  	saveUninitialized: false, 
		store  : new mongoStore({ mongooseConnection: mongoose.connection }),
		cookie : { maxAge: 60 * 60 * 1000}
	}));
};
