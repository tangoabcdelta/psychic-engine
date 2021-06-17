# About ssh-agent and ssh-add in Unix

```
# Make sure you use the backquote (`), located under the tilde (~), rather than the single quote (').
eval `ssh-agent`
# ssh-add
ssh-add ~/.ssh/id__rsa_2
```

#### Permissions settings:

- `.ssh` directory: `700 (drwx------)`
- public key (`.pub` file): `644 (-rw-r--r--)`
- private key (`id_rsa`): `600 (-rw-------)`
- lastly your home directory should not be writeable by the group or others (at most `755 (drwxr-xr-x)`).

I am assuming that you mean that you have to enter your system/user password each time, and that previously you did not have to. cdhowie's response is assuming you set a password/passphrase when generating your keys, and if you did then as he says you will have to enter your password every time unless you use an ssh agent.

#### `service ssh restart`

- Replace `$USER` everywhere with the SSH username you want to log into on the server.
- If you're trying to login as `root` you would need to use `/root/.ssh` etc., instead of `/home/root/.ssh` which is how it is for non-root users.

- Home directory on the server should not be writable by others: `chmod go-w /home/$USER`
- SSH folder on the server needs 700 permissions: `chmod 700 /home/$USER/.ssh`
- Authorized_keys file needs 644 permissions: `chmod 644 /home/$USER/.ssh/authorized_keys`
- Make sure that `user` owns the files/folders and not `root`: `chown user:user authorized_keys` and `chown user:user /home/$USER/.ssh`
- Put the generated public key (from `ssh-keygen`) in the user's `authorized_keys` file on the server
- Make sure that user's home directory is set to what you expect it to be and that it contains the correct `.ssh` folder that you've been modifying. If not, use `usermod -d /home/$USER $USER` to fix the issue
- Finally, restart ssh: `service ssh restart`
- Then make sure client has the public key and private key files in the local user's `.ssh` folder and login: `ssh user@host.com`
