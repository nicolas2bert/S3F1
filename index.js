const runS3Blaster = require('s3blaster').RunS3Blaster;

const outputDir = `${__dirname}/results`;
const env = process.env;

const params = {
    host: env.HOST || 'localhost',
    port: env.PORT || 8000,
    forksNb: 1,
    bucketsNb: 1,
    bucketPrefix: 'bkts3std',
    objectsNb: 2000,
    sizes: [1],
    unit: 'KB',
    requests: 'put,get,delete',
    range: ['0:1000', '1000:2000', '0:1000'],
    fillObjs: true,
    fillRange: '1000:2000',
    fillThreads: 64,
    paralReqs: [32, 64, 128, 256, 512],
    schedule: 'each',
    simulDelay: 5,
    nextKey: 'seq',
    observationsNb: 1e6,
    workOnCurrObjs: false,
    runTime: 5,
    dontCleanDB: false,
    ssm: false,
    dirPath: outputDir,
    output: 's3standard',
    message: 'Performance measurement of S3 Server',
};


process.nextTick(runS3Blaster.start, params, err => {
    if (err) {
        console.log('err, s3f1 is not cool', err);
    }
    console.log('Wahouuu');
});
