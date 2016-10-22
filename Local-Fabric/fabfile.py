from fabric.api import *

local('docker run -d -p 8000:8000 scality/s3server:mem-latest')

# Set a delay for now to ensure the docker image is running
local('sleep 20')
local('npm start')

# If restart is needed, run:
# `docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)`
