from fabric.api import *

def deploy_local():
    local('echo "Waiting 20 seconds for docker container..."')
    local('docker run -d -p 8000:8000 scality/s3server:mem-latest')
    # local('ACCESSKEYID=your_access_key_id SECRETACCESSKEY=your_secret_access_key')

def run_blaster():
    local('ACCESSKEYID=accessKey1 SECRETACCESSKEY=verySecretKey1 npm start')

# If restart is needed, run:
# `docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)`
