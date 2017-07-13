const AwsS3PublicURL    = require('../../resources/AwsS3BucketPublicURL');
const AlbumDataModel    = require('../model/album');
const mongoose          = require('mongoose');
const Album             = mongoose.model('Album');
const csrf              = require('csurf');
const csrfProtection    = csrf();

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// This will make a get request for the list of images
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.getListOfPhoto = (req, res) => {
    let query = Album.find({}).select({'__v': 0}).sort('dateCreated');

    query.exec((err, album) => {
        if(err)
            return res.status(500).json({success:false, error: err, message: 'Could not get a list of photo. Something went wrong'});

        if(!album)
            return res.status(404).json({success:false, message: 'List of photo does not exist.'});

        res.render('photo-list.ejs', { image: album });
    });
};


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// This will make a get request for getting the form for uploading a photo
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.getUploadForm = (req, res) => {
    res.render('photo-uploader.ejs',
    {
        csrfToken: req.csrfToken(),
    });
};


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// This will make a post request for uploading a photo
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports.postUploadPhoto = (req, res) => {
    let album = new Album();

    //req.files.map(file => );
    for(let i=0; i < req.files.length; i++){
        album.image.addToSet(AwsS3PublicURL.setAwsPublicUrlAny(req, i));
    }
    album.uploadedBy = req.body.uploadedBy;

    album.save((err,result) => {
        if(err){
            return res.status(500).json({success: false, message: 'Something went wrong.'});
        }
        res.redirect('/photo/list');
    });
};


