## Short Story

### Add a user

```bash
sudo adduser foobar
# enter password and other info it asks
# username would be added to /etc/passwd file
# encrypted password stored in the /etc/shadow file
```

### Login using your username

```bash
ssh -i ~/.ssh/aws.pub.key sudo adduser foobar@your-aws-ubuntu-server-ip
ssh -i ~/.ssh/generated.pemfile.pem sudo adduser foobar@your-aws-ubuntu-server-ip
```

### Run server

```bash
# start it
ufw enable
# or
sudo systemctl start ufw

# check status
systemctl status ufw
# or
systemctl status iptables



```

---

## Detailed Story

### Check your remote machine for _leakages_

```bash
namp <ipaddress>
nmap  192.168.10.1
```

### Creating a user account using useradd command on Ubuntu

Alternatively, you can use the useradd command is a low level utility for adding users on Ubuntu. The syntax is:
$ sudo useradd -s /path/to/shell -d /home/{dirname} -m -G {secondary-group} {username}
$ sudo passwd {username}

Let us create a new user named vivek using the useradd command on Ubuntu:
$ sudo useradd -s /bin/bash -d /home/vivek/ -m -G sudo vivek
$ sudo passwd vivek

#### ip tables

```bash
https://o7planning.org/en/11363/redirecting-port-80-443-on-ubuntu-server-using-iptables
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
```

```bash
asdasd
```

```bash
asdasd
```

### UFW

#### What is UFW?

Uncomplicated Firewalls by ubuntu

#### Configure a Firewall on Ubuntu 18.04

- install ufw

```bash
apt install ufw
apt install iptables

# to uninstall
# apt remove iptables

#
```

- get help

```bash
  ufw --help
```

- check status

```bash
$ systemctl status ufw
● ufw.service - Uncomplicated firewall
   Loaded: loaded (/lib/systemd/system/ufw.service; enabled; vendor preset: enabled)
   Active: active (exited) since Wed 2020-10-07 06:39:52 UTC; 1 months 2 days ago
     Docs: man:ufw(8)
 Main PID: 428 (code=exited, status=0/SUCCESS)
    Tasks: 0 (limit: 1057)
   CGroup: /system.slice/ufw.service

Warning: Journal has been rotated since unit was started. Log output is incomplete or unavailable.
```
