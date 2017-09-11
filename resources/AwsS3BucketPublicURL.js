let getAwsPublicUrl = (baseURL, bucketName, filename) => {
	let fullAwsURL = `${baseURL}/${bucketName}/${filename}`;
	return fullAwsURL;
};

module.exports.setAwsPublicUrlSingle = (req) => {
	baseURL    = 'https://s3.us-east-2.amazonaws.com';
	bucketName = process.env.AWS_BUCKET_NAME;
	filename   = req.file.originalname;
	return getAwsPublicUrl(baseURL, bucketName, filename);
};

module.exports.setAwsPublicUrlAny = (req, index) => {
	baseURL    = 'https://s3.us-east-2.amazonaws.com';
	bucketName = process.env.AWS_BUCKET_NAME;
	filename   = req.files[index].originalname;
	return getAwsPublicUrl(baseURL, bucketName, filename);
};

