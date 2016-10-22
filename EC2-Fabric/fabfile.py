from fabric.api import *
import logging
env.hosts = ['ec2-52-90-48-240.compute-1.amazonaws.com']
env.user = 'ubuntu'
env.key_filename = '~/s3f1.pem'

# remote_uname()
def local_uname():
    local('uname -a')

def remote_uname():
    run('uname -a')