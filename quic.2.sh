#!/bin/bash



# shallow cloning has to be done once during every vm initialization
# git clone -v --depth 2 https://github.com/tangoabcdelta/psychic-engine.git

# pull from remote

if [[ $PWD/ != */psychic-engine/* ]];
then
  printf "cd-ing into engine"
  cd ~
  cd psychic-engine
else
  printf "inside engine" 
fi

git pull --rebase


cp mynginx.conf /etc/nginx/sites-enabled/

cp -r ./packages/status-magnum/ ~/
cp -r ./packages/server/ ~/
cd ~/server/
yarn install
cd ~/status-magnum/
yarn install
yarn start
google-chrome ~/index.html



# cp -r packages/server/ ~/
# cd ~/server/


