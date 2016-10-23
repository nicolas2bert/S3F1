const express = require('express');

const router = express.Router();
const results = require('../../results.json');
const exec = require('child_process').exec;

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'S3F1',
                          subtitle: 'Racing Scality and AWS',
                        }
    );
});

router.get('/blast', (req, res) => {
    exec('fab -f ./Local-Fabric/fabfile.py deploy_local',
        (error, stdout) => {
            console.log('stdout: ' + stdout);
            if (error !== null) {
                 console.log('exec error: ' + error);
            }
        });

    setTimeout(function(){
        exec('fab -f ./Local-Fabric/fabfile.py run_blaster',
            (error, stdout) => {
                console.log('stdout: ' + stdout);
                if (error !== null) {
                     console.log('exec error: ' + error);
                }
            });
    }, 20000);

    res.render('blast', { title: 'Blasting S3...',
                          results: JSON.stringify(results, null, 2),
                          parallelReq: JSON.parse(
                              results[1].numParallelReq).toString(),
                          latencyTime: JSON.parse(
                              results[1].latency).toString() + 'px',
                        });
});

module.exports = router;
