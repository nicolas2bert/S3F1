const express = require('express');

const router = express.Router();
const results = require('../results.json');
const exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'S3F1',
                          results: JSON.stringify(results, null, 2),
                          parallelReq: JSON.parse(results[1].numParallelReq).toString(),
                          latencyTime: JSON.parse(results[1].latency).toString()+"px",
                        });
});

router.get('/blast', function(req, res, next) {
    exec('fab -f ./Local-Fabric/fabfile.py deploy_local',
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            if (error !== null) {
                 console.log('exec error: ' + error);
            }
        });

    res.render('index', { title: 'S3F1',
                          results: JSON.stringify(results, null, 2),
                          parallelReq: JSON.parse(results[1].numParallelReq).toString(),
                          latencyTime: JSON.parse(results[1].latency).toString()+"px",
                        });
});

module.exports = router;
