'use strict';
const fs = require('fs');
const readline = require('readline');

let fastestTimes = [
	{ 'numParallelReq': 32,
		'latency': 0 },
	{ 'numParallelReq': 64,
		'latency': 0 },
	{ 'numParallelReq': 128,
		'latency': 0 },
	{ 'numParallelReq': 256,
		'latency': 0 },
	{ 'numParallelReq': 512, 
		'latency': 0 }
];

module.exports.parseLines = () => {
	let lineNumber = 0;
	const rl = readline.createInterface({
		input: fs.createReadStream('./results/hello/scality/worker1/s3standard_stats.txt'),
	});	
	rl.on('line', line => {
		console.log('in on line event');
		lineNumber += 1;
		if (lineNumber > 7 && lineNumber < 53) {
			const parRequests = line.toString().split(/\s+/)[2];
			const latencyTime = line.toString().split(/\s+/)[3];
			let index = 0;
			while (index < fastestTimes.length) {
				if (fastestTimes[index].numParallelReq == parRequests) {
					if (fastestTimes[index].latency === 0 || latencyTime < fastestTimes[index].latency) {
						fastestTimes[index].latency = latencyTime;
					}
				}
				index += 1;
			}
		}
	});
	console.log('before close');
	rl.on('close', () => {
		console.log('in close before writefile');
		return fs.writeFile('./results.json', JSON.stringify(fastestTimes), err => {
			if (err) {
				return console.log(err);
			}
			console.log('it works!');
			return true;
		});
	});
};

