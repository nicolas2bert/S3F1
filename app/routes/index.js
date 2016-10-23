var express = require('express');
var router = express.Router();
var results = require('../results.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'S3F1',
                          results: JSON.stringify(results, null, 2),
                          parallelReq: JSON.parse(results[1].numParallelReq).toString(),
                          latencyTime: JSON.parse(results[1].latency).toString()+"px",
                        });
});

module.exports = router;
