const multer    = require('multer');
const AWS       = require('aws-sdk');
const multerS3  = require('multer-s3');

var s3 = new AWS.S3();

const s3Storage = multerS3({
	s3     : s3,
   	bucket : process.env.AWS_BUCKET_NAME,
   	acl    : 'public-read',
   	key    : function (req, file, callback) {
     	callback(null, file.originalname);
   	}
});

module.exports.awsS3Upload = multer({ storage: s3Storage });