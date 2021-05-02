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



# set permissions
printf "setting permission for ./packages/server/bin/"
chmod -R 0755 ./packages/server/bin/
# alternatively
printf "setting permission for ./packages/server/bin/www"
chmod +x ./packages/server/bin/www
printf "setting permissions done"

#### Distro Installation


# - Can against Travis CI
# - Replaces `bash` to Zim (a zsh plugin) for a better autocomplete support
# -

printf "initializing variables"
CURRENT_USER="$(who | cut -d' ' -f1)"
distro_name="UNKNOWN"
ufw_ports_set="no"
gufw_installed="no"
node_installed="no"
npm_installed="no"
yarn_installed="no"
google_fonts_installed="no"
gimp_filters_installed="no"
appimages_installed="no"
etcher_installed="no"
git_installed="no"
gitit_installed="no"
ring_installed="no"
abricotine_installed="no"
youtube_dl_installed="no"
zsh_installed="no"
oh_my_zsh_installed="no"
bash_aliases_installed="no"
printer_installed="no"
wget_installed="no"
xdotool_installed="no"


# This contains the functions to provide a report for the installation script

if [[ $EUID -ne 0 ]]; then
  printf "This script must be run as root" 
  exit 1
else

  printf "running as root: $($EUID -ne 0)"
  printf "annouce the release version"
  lsb_release -a
  # No LSB modules are available.
  # Distributor ID:	Debian
  # Description:	Debian GNU/Linux 10 (buster)
  # Release:	10
  # Codename:	buster


  # install all prerequisites
  printf "updating the package lists, look for upgrades: apt-get update"
  apt-get update
  
  
  # install `dialog` to show options
  sudo apt-get install dialog
  cmd=(dialog --separate-output --checklist "Please Select Software you want to install:" 22 76 16)
  options=(1 "Sublime Text 3" off    # any option can be set to default to "on"
	         2 "LAMP Stack" off
	         3 "Build Essentials" off
	         4 "Node.js" off
	         5 "Git" off
	         6 "Composer" off
	         7 "JDK 8" off
	         8 "Bleachbit" off
	         9 "Ubuntu Restricted Extras" off
	         10 "VLC Media Player" off
	         11 "Unity Tewak Tool" off
	         12 "Google Chrome" off
	         13 "Teamiewer" off
	         14 "Skype" off
	         15 "Paper GTK Theme" off
	         16 "Arch Theme" off
	         17 "Arc Icons" off
	         18 "Numix Icons" off
           19 "Multiload Indicator" off
           20 "Pensor" off
           21 "Netspeed Indicator" off
           22 "Generate SSH Keys" off
           23 "Ruby" off
           24 "Sass" off
           25 "Vnstat" off
           26 "Webpack" off
           27 "Grunt" off
           28 "Gulp" off)
          choices=$("${cmd[@]}" "${options[@]}" 2>&1 >/dev/tty)
          clear


          printf '\n' 
          if ! [ -x "$(command -v git)" ]; then
            printf 'Error: git is not installed.' >&2
            printf '\n'
            exit 1
            else
            git_installed="yes"
            printf 'git is present'
            printf '\n'
          fi


          echo "writing functions to provide a script-run-report of the installation"
          if [ ! -f report_list ]; then touch report_list; fi

  # done
fi



if [[ $EUID -ne 0 ]];
  then
    printf "This script must be run as root" 
    exit 1
  else
    printf "running as root (sudo mode)" 
    apt install git

    # apt package manager doesn't download latest version
    # of nodejs, hence, we go via the `nvm` route
    # git is a pre-requisite for nvm

    # nvm
    # instructions on: https://github.com/nvm-sh/nvm/blob/master/README.md
    # 
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    # This loads nvm
    source ~/.bashrc

    # "node" is an alias for the latest version
    printf '\n'
    nvm install node
    printf '\n'
    printf "attempting to retrieve latest stable version"
    printf '\n'
    nvm ls-remote | grep Latest | tail -1
    printf '\n'



    # isn't using nvm yet
    # apt install nodejs
    # apt install npm
    
    # install yarn
    npm install -g yarn
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    printf "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    apt install yarn
    yarn --version
fi

printf "\n"
printf "default nginx file folder path: /var/www/html/"
printf "\n"
printf "contents: /var/www/html/"
printf "\n"
cat /var/www/html/index.nginx-debian.html


printf "\n"
printf "default nginx conf path: /etc/nginx/nginx.conf"
printf "\n"
printf "contents: /etc/nginx/nginx.conf"
printf "\n"
cat /etc/nginx/nginx.conf 



printf "installing aerospike"
printf https://www.aerospike.com/download/server/latest/artifact/ubuntu${UBUNTU_VERSION}

printf "upgrade to the fresh-est package updates: sudo apt-get upgrade -y"
sudo apt-get upgrade -y


printf "installing ubuntu version detection libraries"
apt-get install lsb-core

printf "detecting the ubuntu version"
UBUNTU_VERSION=$(lsb_release -sr)
UBUNTU_VERSION=$(cut -c 1,2 <<< "$UBUNTU_VERSION")
printf "storing it UBUNTU_VERSION, echoing it for confirmation: $UBUNTU_VERSION"



spatialPrint() {
  printf ""
  printf ""
  printf "$1"
	printf "================================"
}

print_line(){
    printf "********************************************* \n" >> report_list
}

report_restart(){
    print_line
    printf "*******************  RESTARTED ************** \n" >> report_list
}

print_distro_name(){
    printf "This distro is $distro_name \n"
}

report_distro_name(){
    print_line
    printf "This distro is $distro_name \n" >> report_list
}


report_install_flags(){

    printf "distro_name $distro_name \n" >> report_list
    printf "ufw_ports_set $ufw_ports_set \n" >> report_list
    printf "gufw_installed $gufw_installed \n" >> report_list
    printf "node_installed $node_installed \n" >> report_list
    printf "npm_installed $npm_installed \n" >> report_list
    printf "yarn_installed $yarn_installed \n" >> report_list
    printf "google_fonts_installed $google_fonts_installed \n" >> report_list
    printf "gimp_filters_installed $gimp_filters_installed \n" >> report_list
    printf "appimages_installed $appimages_installed \n" >> report_list
    printf "etcher_installed $etcher_installed \n" >> report_list
    printf "gitit_installed $gitit_installed \n" >> report_list
    printf "ring_installed $ring_installed \n" >> report_list
    printf "abricotine_installed $abricotine_installed \n" >> report_list
    printf "youtube_dl_installed $youtube_dl_installed \n" >> report_list
    printf "zsh_installed $zsh_installed \n" >> report_list
    printf "oh_my_zsh_installed $oh_my_zsh_installed \n" >> report_list
    printf "bash_aliases_installed $bash_aliases_installed \n" >> report_list
    printf "printer_installed $printer_installed \n" >> report_list
    printf "wget_installed $wget_installed \n" >> report_list
    
}

display_report(){

  cat report_list

}
