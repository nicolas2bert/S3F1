"use strict";
const express = require('express');

const router = express.Router();
const resultsAWS = require('../../resultsAWS.json');
const resultsLocal = require('../../results.json');

const spawn = require('child_process').spawn;

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', { title: 'S3F1',
                          subtitle: 'Racing Scality and AWS',
                        }
    );
});

router.get('/blast', (req, res) => {
    const deploymentSpawn = spawn('fab', ['-f', './Local-Fabric/fabfile.py',
    'deploy_local']);

    deploymentSpawn.stdout.on('data', data => {
        console.log(`deploymentSpawn stdout: ${data}`);
    });

    deploymentSpawn.stderr.on('data', data => {
        console.log(`deploymentSpawn stderr: ${data}`);
    });

    deploymentSpawn.on('close', code => {
        console.log(`deploymentSpawn child process exited with code ${code}`);
        console.log('Start BLASTING!!');
    });

    setTimeout(function () {
        const runSpawn = spawn('fab', ['-f', './Local-Fabric/fabfile.py',
                                       'run_blaster']);

        runSpawn.stdout.on('data', data => {
           console.log(`runSpawn stdout: ${data}`);
        });

        runSpawn.on('close', code => {
          console.log(`runSpawn child process exited with code ${code}`);
          res.render('blast', { title: 'Blasting S3...',
                          resultsAWS: resultsAWS,
                          resultsLocal: resultsLocal,
                          len: JSON.stringify(resultsAWS.length).toString(),
                          parallelReq: JSON.parse(
                              resultsAWS[1].numParallelReq).toString(),
                        });
        });
    }, 10000);
});

module.exports = router;
