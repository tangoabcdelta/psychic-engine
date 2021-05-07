#!/bin/bash


bash ~/LOGIN.sh


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



  # aliases by default are not expanded in non-interactive shells.
  # ariables are being expanded at the time you define the aliases,
  # not when you are using them.
  # Put a \ in front of them to escape them while they are defined.
  # e.g.
  # alias sroot="export SROOT="\$PWD""
  # alias drumit="cd \$SROOT/abc/def/drumit"
  # alias booom="export BOOOM="\$~/server/quic.sh""




  # shallow cloning has to be done once during every vm initialization
  # git clone -v --depth 2 https://github.com/tangoabcdelta/psychic-engine.git

  # pull from remote
  
  cd ~
  cd psychic-engine
  git pull --rebase
  cp -r packages/server/ ~/
  cd ~/server/
  yarn install
  yarn start

  printf "\n"
  printf "default path: /etc/nginx/nginx.conf"
  printf "\n"
  cat /etc/nginx/nginx.conf 
  printf "\n"
  printf "new content"
  printf "\n"
  sudo cp nginx.conf /etc/nginx/nginx.conf

  # Ubuntu Linux - How to view status of your Nginx server
  sudo service status nginx

  # Ubuntu Linux - How to restart nginx
  

  # sudo systemctl [start|stop|restart] nginx 
  # sudo /etc/init.d/nginx [start|stop|restart]

  # sudo systemctl restart nginx
  # sudo service nginx restart
  # sudo /etc/init.d/nginx restart
  sudo service nginx restart
 
fi

