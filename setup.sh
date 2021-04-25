#!/bin/bash

CURRENT_USER="$(who | cut -d' ' -f1)"
distro_name="UNKNOWN"
ufw_ports_set="no"
gufw_installed="no"
node_installed="no"


# This contains the functions to provide a report for the installation script

if [[ $EUID -ne 0 ]]; then
  echo "This script must be run as root" 
  exit 1
else
  # install all prerequisites
  echo "installing all prerequisites"
  apt-get update && sudo apt-get upgrade -y

  # install ubuntu version detection libraries
  apt-get install lsb-core
  # detect the ubuntu version
  UBUNTU_VERSION=$(lsb_release -sr)
  UBUNTU_VERSION=$(cut -c 1,2 <<< "$UBUNTU_VERSION")
  # store it and echo it for confirmation
  echo $UBUNTU_VERSION

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

  # install aerospike
  echo https://www.aerospike.com/download/server/latest/artifact/ubuntu${UBUNTU_VERSION}





