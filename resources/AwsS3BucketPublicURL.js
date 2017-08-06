let getAwsPublicUrl = (baseURL, bucketName, filename) => {
	let fullAwsURL = `${baseURL}/${bucketName}/${filename}`;
	return fullAwsURL;
};

module.exports.setAwsPublicUrlSingle = (req) => {
	baseURL    = 'https://s3.us-east-2.amazonaws.com';
	bucketName = 'my-bucket';
	filename   = req.file.originalname;
	return getAwsPublicUrl(baseURL, bucketName, filename);
};

module.exports.setAwsPublicUrlAny = (req, index) => {
	baseURL    = 'https://s3.us-east-2.amazonaws.com';
	bucketName = 'my-bucket';
	filename   = req.files[index].originalname;
	return getAwsPublicUrl(baseURL, bucketName, filename);
};

