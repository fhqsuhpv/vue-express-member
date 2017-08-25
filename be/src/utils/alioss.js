var OSS = require('ali-oss').Wrapper;
var clientOss = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIPj80gPk91btS',
    accessKeySecret: 'an6Rt7GIcXDBHHSKXKduyf1HZsgCAx',
    bucket: 'memberimages'
});

export default clientOss;