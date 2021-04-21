#!/bin/bash

$UBUNTU_VERSION=$(`lsb_release -a`);
echo `https://www.aerospike.com/download/server/latest/artifact/{$UBUNTU_VERSION}`

# wget -O aerospike.tgz 'https://www.aerospike.com/download/server/latest/artifact/'

# cat /etc/lsb-release
# DISTRIB_RELEASE
# DISTRIB_DESCRIPTION
# DISTRIB_ID=Ubuntu
# DISTRIB_RELEASE=18.04
# DISTRIB_CODENAME=bionic
# DISTRIB_DESCRIPTION="Ubuntu 18.04.5 LTS"
