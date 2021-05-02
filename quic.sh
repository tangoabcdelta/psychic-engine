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


if [[ $EUID -ne 0 ]];
then
  printf "This script must be run as root" 
  exit 1
else
  cp -r packages/server/ ~/
  cd ~/server/
  yarn install
  yarn start

fi
