# Generating a new SSH key and adding it to the ssh-agent

- Check for existing SSH keys
- Generate a new SSH key to use for authentication
- Add it to the `ssh-agent`.

* If you don't already have an SSH key, you must generate a new SSH key. If you're unsure whether you already have an SSH key, check for existing keys.
* If you don't want to reenter your passphrase every time you use your SSH key, you can add your key to the SSH agent, which manages your SSH keys and remembers your passphrase.

### Generating a new SSH key

- Open Terminal.
- Paste the text below, substituting in your GitHub email address:

  \$ ssh-keygen -t ed25519 -C "your_email@example.com"

**Note:** If you are using a legacy system that doesn't support the `Ed25519` algorithm, use:

    $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

This creates a new ssh key, using the provided email as a label.

    > Generating public/private ed25519 key pair.

- When you're prompted to "Enter a file in which to save the key," press Enter.
- This accepts the default file location.

> Enter a file in which to save the key (/home/you/.ssh/id_ed25519): [Press enter]

- At the prompt, type a secure passphrase. (Actually, don't type a password).
- For more information, see "Working with SSH key passphrases".

> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]

### Adding your SSH key to the ssh-agent

Start the ssh-agent in the background.

    $ eval "$(ssh-agent -s)"
    > Agent pid 59566

Add your SSH private key to the ssh-agent. If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_ed25519 in the command with the name of your private key file.

    $ ssh-add ~/.ssh/id_ed25519

### Further reading
