const multer    = require('multer');
const AWS       = require('aws-sdk');
const multerS3  = require('multer-s3');

AWS.config.loadFromPath('./resources/AwsS3Key.json');
var s3 = new AWS.S3();

const s3Storage = multerS3({
	s3     : s3,
   	bucket : 'my-bucket',
   	acl    : 'public-read',
   	key    : function (req, file, callback) {
     	callback(null, file.originalname);
   	}
});
module.exports.awsS3Upload = multer({ storage: s3Storage });