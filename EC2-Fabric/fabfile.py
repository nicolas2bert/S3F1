from fabric.api import *
import logging
import os

env.hosts = ['ec2-52-90-48-240.compute-1.amazonaws.com']
env.user = 'ubuntu'
env.key_filename = '~/s3f1.pem'

s3f1_installed = 0

def clone_and_install ():
	run('sudo apt-get install git')
	
	#Get node 4.x
	run('curl -sL https://deb.nodesource.com/setup_4.x')
	run('sudo apt-get install -y nodejs')

	run('sudo apt-get install npm')
	run('git clone https://github.com/nicolas2bert/S3F1')
	run('cd ~/S3F1 && npm install')
	s3f1_installed = 1

def run_s3Blaster():
	run('cd S3F1;HOST=s3.amazonaws.com PORT=80 ACCESSKEYID=`echo $ACCESSKEYID` SECRETACCESSKEY=`echo $SECRETACCESSKEY` npm start')
	#Get the s3standard_stats.txt file from EC2
	command = "echo Getting stats file.....; scp -i ~/s3f1.pem ubuntu@52.90.48.240:/home/ubuntu/S3F1/results/hello/scality/worker1/s3standard_stats.txt ."
	os.system(command)