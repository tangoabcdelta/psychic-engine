# Ubuntu Setup (Fresh)

## Enable multiverse repository

### Methods to enable

#### Easy

This option is available for newer releases of Ubuntu:

```bash
sudo apt-add-repository multiverse && sudo apt-get update
```

#### Difficult

You can enable the [repository from the command line or graphically](https://askubuntu.com/a/89100/329271).

Open `/etc/apt/sources.list` with any editor.

```bash
# command line editor (nano)
sudo -e /etc/apt/sources.list

# graphical editor
gksu gedit /etc/apt/sources.list
```

Uncomment (remove the # from the front of) the `multiverse` lines or add them in if needed,

#### Medium

```bash
sudo sed -i "/^# deb.*multiverse/ s/^# //" /etc/apt/sources.list
sudo apt-get update
sudo apt-get upgrade -y
```

The Multiverse repository contains packages (software) that is "not free" , referring to licensing restrictions.

> The Multiverse repository contains software which has been classified as non-free. This software may not be permitted in some jurisdictions. When installing each package from this repository, you should verify that the laws of your country permit you to use it. Also, this software may not include security updates.

For additional information on the philosophy of the ubuntu repositories, see [Overview of the default Ubuntu software repositories](https://help.ubuntu.com/10.04/add-applications/C/default-repos.html)

#### Differences between Multiverse, Universe, Restricted, and Main Repositories on Ubuntu:

1. Main – Free and Open-Source Software Maintained by Canonical
2. Universe – Free and Open-Source Software Maintained by the Community
3. Restricted – Proprietary Software
4. Multiverse – Software Restricted by Copyright or Legal Issues

Read more: https://www.maketecheasier.com/multiverse-universe-restricted-main-repositories-ubuntu/

|                | **Open Source** | **Supported by Canonical** |
| -------------- | --------------- | -------------------------- |
| **Main**       | Yes             | Yes                        |
| **Universe**   | Yes             | No                         |
| **Restricted** | No              | Yes                        |
| **Multiverse** | No/Yes          | No                         |

### some other stupid installs

```bash
sudo apt-add-repository ppa:audio-recorder/ppa
sudo apt-get update
sudo apt-get install audio-recorder
sudo snap install audio-recorder --beta
```

## pre-requisites

```bash
sudo apt-get install curl apt-transport-https ca-certificates software-properties-common
```

### Install `curl`

```bash
sudo apt install curl
sudo apt install wget
```

### Install `telnet`

```bash
sudo apt-get install telnet
```

### Install `build-essential`s

```bash
sudo apt-get install -y \
    build-essential \
    vim \
    chromium-browser \
    curl \
    libssl-dev \
    git \
    mercurial \
    pepperflashplugin-nonfree \
    openjdk-7-jre-headless

# skip the JDK7
```

**Caution: check for the latest version for JDK and then install it**

### Install _snap_

```bash
sudo apt-get install snapd
```

### Install python

```bash
sudo apt-get install -y python-pip python-dev python-virtualenv
sudo pip install virtualenvwrapper
```

### Install postgresql

```bash
sudo apt-get install -y postgresql-9.3 postgresql-contrib-9.3 libpq-dev
```

##### Alternatively check the latest version and download it

```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql
```

## Install the bare-minimum

### Install Docker

```bash
sudo apt-get purge docker lxc-docker docker-engine docker.io
sudo apt-get remove docker docker-engine docker.io containerd runc


sudo apt-get install docker
sudo apt-get install docker.io
# sudo apt-get install docker-engine
sudo apt-get install containerd
sudo apt-get install runc

# ce = community edition
# sudo apt-get install docker-ce


# or the shorthand
sudo apt-get install docker \
    docker.io \
    docker-engine \
    containerd \
    runc


# check
sudo systemctl status docker

# search and download docker images
docker search ubuntu
docker pull ubuntu

# check
docker images

# run
docker run -i -t ubuntu /bin/bash

# To exit from docker container type CTRL + P + Q.
```

After successful installation of Docker community edition, the service will start automatically, Use below command to verify service status.

### Install Docker

```bash
sudo apt-get update
sudo apt-get remove docker docker-engine docker.io containerd runc
```

#### SET UP THE REPOSITORY

####

```bash
#! install using the repository
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

```

**Note**: The `lsb_release -cs` sub-command below returns the name of your Ubuntu distribution, such as `xenial`. Sometimes, in a distribution like Linux Mint, you might need to change `$(lsb_release -cs)` to your parent Ubuntu distribution. For example, if you are using `Linux Mint Tessa`, you could use `bionic`. Docker does not offer any guarantees on untested and unsupported Ubuntu distributions.

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

You can install Docker Engine in different ways, depending on your needs:

To exit from docker container type **CTRL + P + Q**. This will leave container running in the background an provide you host system console. If you used exit command, it will stop the current container.

After exiting from Docker container, execute below command to list all running containers.

```bash
docker ps

CONTAINER ID     IMAGE     COMMAND        CREATED        STATUS        PORTS    NAMES
f2582758af13     ubuntu    "/bin/bash"    2 hours ago    Up 2 hours             first_ubuntu
```

By default Above command will list only running containers. To list all containers (including stopped container) use following command.

```bash
docker ps -a
```

### Start/Stop/Attach Container

You can start, stop or attach to any containers with following commands. To start container use following command.

```bash
docker start <CONTAINER_ID>
```

To stop container use following command.

```bash
docker stop <CONTAINER_ID>
```

To attach to currently running container use following command.

```bash
docker attach <CONTAINER_ID>
```

## Install developer productivity tools

### Install chrome nightly / chromium-browser

```bash
sudo apt-get  install chromium-browser
```

### Install brave

```bash
sudo apt install apt-transport-https curl gnupg -y
curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-release.gpg add -
echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list
sudo apt update
sudo apt install brave-browser
```

### install kazam for screen recording

```bash
sudo apt-get install kazam -y
```

### Install docker

```bash
sudo apt  install docker.io
sudo snap install docker     # version 19.03.11
```

### wireshark

```bash
sudo apt-get install -y tmux nginx irssi
sudo apt-get install wireshark -y
```

### tmux a.k.a. Terminal Multiplexer

```bash
sudo apt-get install -y tmux nginx irssi
sudo apt-get install wireshark -y
```

### Install spotify for entertainment

```bash
sudo snap install spotify
sudo apt install spotify-client
```

## Re-Install some Ubuntu OS Packages

##### network-manager

```bash
sudo apt install network-manager
```

##### nmcli

```bash
nmcli
```

##### nmtui

```bash
nmtui
Command 'nmtui' not found, but can be installed with:
```

An alternative for the **[nmcli](https://www.tecmint.com/nmcli-configure-network-connection/)** is the **nmtui**, short for **Network Manager Text User Interface**, the **nmtui** is yet another handy tool that allows you to easily configure your network interfaces in Linux distributions using a graphical display by invoking the **nmtui** command straight from the terminal or even [putty](https://www.tecmint.com/install-putty-on-linux/).

To configure a network interface IPv4 address, start by invoking the **nmtui** tool.

There is [simple TUI](http://gotechnies.com/network-setup-centos-7/) command to configure whether you are configuring the network on Server or on Local System.

Use the below command and follow the steps-:

```bash
$ sudo nmtui
```

###### steps

1. Select the first option ‘**Edit a connection**’ and hit **ENTER**.
2. Next, select the interface you want to configure and hit **ENTER**. In this case, the interface we are configuring is `enps03`.
3. In the next step, key in the preferred IP address and define the subnet mask, default gateway, and DNS servers as shown below.
4. Once you are satisfied with your settings, scroll all the way down and hit ENTER on the ‘**OK**’ option.
5. This takes you back to the interfaces screen as shown below. Navigate and hit on the ‘**Back**’ option.
6. Select ‘**Activate a connection**’ and then ‘**OK**’ and hit **ENTER**.
7. Select your interface name and then navigate to the ‘**Deactivate**’ option and hit **ENTER**.
8. This will take you a step back whereupon you will click on the ‘**Activate**’ option as shown:
9. We’re all done now. To go back click on the ‘**Back**’ option and finally, press ENTER on the ‘**quit**’ selection.

Again, to verify that the network interface has acquired the IP address we have just configured, run the command:

```bash
$ ip addr show enp0s3
```

And this concludes this article on configuring IP network connection using ‘**nmtui**’ graphical command-line utility on Linux.

After configure the network. Activate the network. Restart the network service.

```bash
$ sudo systemctl restart network
```

## Git Aliases and Paths

https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases

This technique can also be very useful in creating commands that you think should exist. For example, to correct the usability problem you encountered with unstaging a file, you can add your own unstage alias to Git:

```bash
$ git config --global alias.unstage 'reset HEAD --'
$ git config --global alias.last 'log -1 HEAD'
$ git config --global alias.visual '!gitk'
```

---

## NetSec

### Install nmap, netcat, metasploit-framework

```bash
sudo apt-get install nmap
sudo apt-get install netcat
sudo apt-get install metasploit-framework
sudo apt-get install sqlmap
```

#### nmap

Ports are the entry points of any machine. To scan any machine for the open ports, Network Mapper(nmap) is used. It comes with certain modes like aggressive scan, full port scan, common port scan,stealth scan etc. Nmap can enumerate OS, services running on a particular port and will tell you about the state(open, closed,filtered etc) of each port. Nmap also has a scripting engine which can help automate simple network mapping tasks. You can install nmap using the following command;

#### etasploit-framework

Metasploit Framework is the very first tool hackers consult after finding a vulnerability. It contains information about vulnerabilities, exploits & lets hackers develop and execute codes against a vulnerable target. Armitage is the GUI version of Metasploit. While exploiting any remote target just provide the required fields like LPORT, RPORT, LHOST, RHOST & Directory etc and run the exploit. You can further background sessions & add routes for further exploitation of internal networks. You can install metasploit using the following command;

#### SQLmap

Finding vulnerable databases & extracting the data from them has become a huge security risk today. SQLmap is a tool to check any vulnerable databases and dumping the records from them. It can count rows, check vulnerable row & enumerate database. SQLmap can perform Error Based SQL injections, Blind SQL injection, Time Based SQL injection & Union Based attacks. It also has several risk & levels for increasing the severity of the attack. You can install sqlmap using the following command;

---

## Troubleshooting

### wifi and ethernet keep disconnecting

The problem used to occur with BroadCom devices, but has been known to occur on almost all devices that are primarily desinged for windows. This includes the dell-laptops too. If the internet, both Ethernet and WiFi, keep getting disconnected constantly, and the symptoms include:

- after boot-up it connects just fine to the Wi-Fi network
- after using the internet for some time, it all of a sudden disconnects
- you're either unable to connect again or it frequently keeps asking you for password
- it says "WiFi networks disconnected"
- it doesn't give you problem if you boot Windows 7 (or any other proprietary OS) on your computer i.e. it stays connected to the Wi-Fi without requiring any intervention but becomes a nightmare on ubuntu 15.04 or above (xenial, bionic or whatever).

..then, you can perform the following:

###### caution:

The following instructions can be harmful, especially, if you're attempting to `purge` network manager, then please make sure that you've a boot-able copy of ubuntu in a portable hardware so that you can manually launch / re-install it. I was unlucky as my hardware stopped functioning while I was attempting a purge and it was a nightmare for me it get it working again.

```bash
  sudo apt-get purge network-manager -y
  sudo apt-get update
  sudo apt-get autoremove -y
  sudo apt-get upgrade -y
  sudo apt-get install network-manager
  sudo apt install ubuntu-desktop
```

sauce: https://askubuntu.com/questions/653983/wifi-and-ethernet-keep-disconnecting
originally asked 5y+ ago & viewed 19k times

```bash
sudo snap install network-manager  # version 1.2.2-27, or
sudo apt install network-manager
sudo apt install gnome-control-center
```

#### if only the _Settings Shortcut_ is missing:

..then reinstall ubuntu-desktop.

```bash
sudo apt purge network-manager
sudo apt autoremove
sudo apt update
sudo apt full-upgrade
sudo apt install network-manager
sudo apt install ubuntu-desktop
```

### solution-steps

#### step 1: find the list of connected hardware and note the names down

```bash
$ ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: enp0s31f6: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether a4:4c:c8:17:32:cb brd ff:ff:ff:ff:ff:ff
3: wlp1s0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether ac:ed:5c:36:7f:3b brd ff:ff:ff:ff:ff:ff
```

##### (recommended alternative) list all networking interfaces on your machine

take a note of your network interface name
anything that starts with a `w` will be your `wlan` interface

```bash
$ ls /sys/class/net
enp0s31f6  lo  wlp1s0
```

##### (alternative) find out the name of your WiFi adaptor and wireless network

This displays the wireless interfaces on your system and check their status:

```bash
$ iwconfig
enp0s31f6   no wireless extensions.

wlp1s0      IEEE 802.11  ESSID:off/any
            Mode:Managed  Access Point: Not-Associated   Tx-Power=0 dBm
            Retry short limit:7   RTS thr:off   Fragment thr:off
            Power Management:on

lo          no wireless extensions.
```

###

#### step 2

```bash
$ sudo dhclient enp0s31f6
cmp: EOF on /tmp/tmp.ygUdW6QePO which is empty
$ lspci -nn -d 14e4:
```

### use `dhclient`

```bash
$ sudo dhclient enp0s31f6
cmp: EOF on /tmp/tmp.sI5g6OzhbN which is empty

$ sudo dhclient wlp1s0
RTNETLINK answers: Operation not possible due to RF-kill
```

### use `rfkill`

**`rfkill`** is a new command, available to new-er OSes.

##### list all rf-devices (1)

```bash
$ rfkill
    ID TYPE      DEVICE              SOFT      HARD
    1 wlan      dell-wifi      unblocked unblocked
    2 bluetooth dell-bluetooth unblocked unblocked
    3 wlan      phy0           unblocked unblocked
    5 bluetooth hci0           unblocked unblocked
    $ rfkill list all
```

##### list all rf-devices (2) / more verbose

```bash
$ rfkill list
    1: phy0: Wireless LAN
    Soft blocked: no
    Hard blocked: yes
    2: dell-wifi: Wireless LAN
    Soft blocked: no
    Hard blocked: no
    3: dell-bluetooth: Bluetooth
    Soft blocked: no
    Hard blocked: no
    6: hci0: Bluetooth
    Soft blocked: no
    Hard blocked: no
```

##### unblock all rf-devices?

```bash
$ rfkill unblock all
$ sudo rfkill unblock 1
```

##### if from the list, you see that you are not connected to any wireless network

then, run the following to list the wireless interfaces

```bash
    $ iw dev
    phy#0
        Interface wlp1s0
    	    ifindex 3
    	    wdev 0x1
    	    addr ac:ed:5c:36:7f:3b
    	    type managed
    	    txpower 0.00 dBm
```

##### determine if a particular interface is connected to any wireless device:

```bash
    $ iw wlp1s0 link
    Not connected.
```

##### before connecting to a WiFi network, it is important to perform a scan on the terminal to search the available wireless networks

## so, run the following command to scan:

```bash
$ iwlist wlp1s0 scan
wlp1s0    Failed to read scan data : Network is down
```

##### if internet was running, then it would have said something totally different

```bash
$ iwlist wlp1s0 scan | grep -i ESSID
wlp1s0    Failed to read scan data : Network is down
```

---

### generate `netplan`

```bash
$ netplan generate
ERROR: cannot create file /run/NetworkManager/conf.d/10-globally-managed-devices.conf: Failed to create file “//run/NetworkManager/conf.d/10-globally-managed-devices.conf.HU7GT0”: Permission denied
```

##### create a netplan in YAML to activate your wifi

```bash
$ netplan
You need to specify a command
usage: /usr/sbin/netplan  [-h] [--debug]  ...

Network configuration in YAML

    optional arguments:
      -h, --help  show this help message and exit
      --debug     Enable debug messages

    Available commands:

        help      Show this help message
        apply     Apply current netplan config to running system
        generate  Generate backend specific configuration files from
                  /etc/netplan/*.yaml
        info      Show current netplan version and available features
        ip        Retrieve IP information from the system
        try       Try to apply a new netplan config to running system, with
                  automatic rollback
```

##### use systemctl to troubleshoot

```bash
$ sudo systemctl start wpa_supplicant
```

`wpa_supplicant` will manage the wireless network
the file to configure is: `/etc/wpa_supplicant.conf`

# cat /etc/wpa_supplicant.conf

```yaml
network={
ssid="ssid_name"
psk="password"
}
```

---

##### WTH list??????

##### WTH

lists all connected hardware, and their manufacturer, etcetera etcetera

```bash
$ lspci
00:00.0 Host bridge: Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor Host Bridge/DRAM Registers (rev 07)
00:02.0 VGA compatible controller: Intel Corporation HD Graphics 530 (rev 06)
00:04.0 Signal processing controller: Intel Corporation Xeon E3-1200 v5/E3-1500 v5/6th Gen Core Processor Thermal Subsystem (rev 07)
00:14.0 USB controller: Intel Corporation 100 Series/C230 Series Chipset Family USB 3.0 xHCI Controller (rev 31)
00:14.2 Signal processing controller: Intel Corporation 100 Series/C230 Series Chipset Family Thermal Subsystem (rev 31)
00:15.0 Signal processing controller: Intel Corporation 100 Series/C230 Series Chipset Family Serial IO I2C Controller #0 (rev 31)
00:15.1 Signal processing controller: Intel Corporation 100 Series/C230 Series Chipset Family Serial IO I2C Controller #1 (rev 31)
00:16.0 Communication controller: Intel Corporation 100 Series/C230 Series Chipset Family MEI Controller #1 (rev 31)
00:17.0 SATA controller: Intel Corporation Q170/Q150/B150/H170/H110/Z170/CM236 Chipset SATA Controller [AHCI Mode] (rev 31)
00:1c.0 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #2 (rev f1)
00:1c.2 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #3 (rev f1)
00:1c.4 PCI bridge: Intel Corporation 100 Series/C230 Series Chipset Family PCI Express Root Port #5 (rev f1)
00:1f.0 ISA bridge: Intel Corporation CM238 Chipset LPC/eSPI Controller (rev 31)
00:1f.2 Memory controller: Intel Corporation 100 Series/C230 Series Chipset Family Power Management Controller (rev 31)
00:1f.3 Audio device: Intel Corporation CM238 HD Audio Controller (rev 31)
00:1f.4 SMBus: Intel Corporation 100 Series/C230 Series Chipset Family SMBus (rev 31)
00:1f.6 Ethernet controller: Intel Corporation Ethernet Connection (5) I219-LM (rev 31)
01:00.0 Network controller: Intel Corporation Wireless 8265 / 8275 (rev 78)
02:00.0 Unassigned class [ff00]: Realtek Semiconductor Co., Ltd. RTS525A PCI Express Card Reader (rev 01)
```

## Knowing what broadcom or what manufacturers wireless card you hae

##### WTH

```bash
$ lspci -nn -d 14e4:
```

##### WTH

# connect to wifi from terminal on ubuntu

```bash
$ ip link sho
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s31f6: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
link/ether a4:4c:c8:17:32:cb brd ff:ff:ff:ff:ff:ff
3: wlp1s0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
link/ether ac:ed:5c:36:7f:3b brd ff:ff:ff:ff:ff:ff
```

##### WTH

## use a grep to find out the wifi connection

```bash
$ ip link sho | grep w
3: wlp1s0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
```

##### WTH is this even supposed to do?

```bash
$ sudo ifconfig wlp1s0
wlp1s0: flags=4098<BROADCAST,MULTICAST>  mtu 1500
ether ac:ed:5c:36:7f:3b  txqueuelen 1000  (Ethernet)
RX packets 0  bytes 0 (0.0 B)
RX errors 0  dropped 0  overruns 0  frame 0
TX packets 0  bytes 0 (0.0 B)
TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

##### WTH

```bash
$ iwconfig wlp1s0 essid <name> key <password>
```

##### WTH

```bash
$ iwconfig wlp1s0 essid
Error for wireless request "Set ESSID" (8B1A) :
too few arguments.
```

##### WTH is this even supposed to do?

```bash
$ dhclient wlp1s0
RTNETLINK answers: Operation not permitted
```

```bash
$ sudo dhclient wlp1s0
```

##### WTH is this even supposed to do?

```bash
$ ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
inet 127.0.0.1/8 scope host lo
valid_lft forever preferred_lft forever
inet6 ::1/128 scope host
valid_lft forever preferred_lft forever
2: enp0s31f6: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
link/ether a4:4c:c8:17:32:cb brd ff:ff:ff:ff:ff:ff
3: wlp1s0: <BROADCAST,MULTICAST> mtu 1500 qdisc noqueue state DOWN group default qlen 1000
link/ether ac:ed:5c:36:7f:3b brd ff:ff:ff:ff:ff:ff
```

```

```
