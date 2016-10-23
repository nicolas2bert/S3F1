from fabric.api import *

def deploy_local():
    local('docker run -d -p 8000:8000 scality/s3server:mem-latest')    
    local('echo "Waiting for docker container..."')
    local('sleep 20')
    local('ACCESSKEYID=your_access_key_id SECRETACCESSKEY=your_secret_access_key')
    local('npm start')

# If restart is needed, run:
# `docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)`
