#!/bin/bash


# this is a built-in command
# stops the execution of a script if a command or pipeline has an error
# which is the opposite of the default shell behaviour,
# which is to ignore errors in scripts.
set -e

# Type `help set` in a terminal for docs
# -e  Exit immediately if a command exits with a non-zero status.
# the alternative to `set -e` is to put `|| exit 1`
# after each important command



# aliases by default are not expanded in non-interactive shells.
# ariables are being expanded at the time you define the aliases,
# not when you are using them.
# Put a \ in front of them to escape them while they are defined.
# e.g.
# alias sroot="export SROOT="\$PWD""
# alias drumit="cd \$SROOT/abc/def/drumit"
# alias booom="export BOOOM="\$~/server/quic.sh""

if [[ $EUID -ne 0 ]];
then
  printf "This script must be run as root" 
  exit 1
else


  # https://www.tutorialspoint.com/execute_bash_online.php

  # bash ~/LOGIN.sh


  # Look for processes listening on all ports
  netstat -na -p tcp | grep LISTEN
  # lsof -ni tcp:80
  # lsof -ni tcp:4000


  bash ./quic.2.sh
  #bash ./quic.2.sh
  printf "\n"
fi

