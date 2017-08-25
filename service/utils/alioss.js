const OSS = require('ali-oss').Wrapper;
const fs = require('fs');
var promise = require('bluebird');

var clientTempOss = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIPj80gPk91btS',
    accessKeySecret: 'an6Rt7GIcXDBHHSKXKduyf1HZsgCAx',
    bucket: 'membertemp'
});

var clientOss = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIPj80gPk91btS',
    accessKeySecret: 'an6Rt7GIcXDBHHSKXKduyf1HZsgCAx',
    bucket: 'memberimages'
});


var uploadfile = (req) => {
    if (!req.files) {
        console.log('No files were uploaded.');
        return null;
    }

    let sampleFile = req.files.giftimage;
    let dstr = Date.now();
    let path = dstr + '.jpg';

    sampleFile.mvAsync = promise.promisify(sampleFile.mv, sampleFile);

    return sampleFile.mvAsync(path).then(err => {
        if (err)
            throw (err);
    }).then(() => {
        return clientTempOss.put('obj-images-' + dstr, path).then(() => {
            // return getTempUrl('obj-images-' + dstr);
            return clientTempOss.signatureUrl('obj-images-' + dstr);
        }).then(url => {
            deletefile(path);
            return { 'url': url, 'objectname': 'obj-images-' + dstr };
        }).catch(err => {
            console.log(err);
            deletefile(path);
            return null;
        });
    }).catch(err => {
        console.log(err);
    });
}

var deletefile = path => {
    fs.unlink(path, err => {
        if (err) console.log(err);
    });
};

var savefile = (objname) => {
    return clientOss.copy(objname, '/membertemp/' + objname).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}



module.exports = {
    uploadfile,
    savefile,
    clientOss,
}