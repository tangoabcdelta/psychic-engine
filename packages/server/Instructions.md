    ssh -i PATH_TO_PRIVATE_KEY USERNAME@EXTERNAL_IP


Replace the following:

    PATH_TO_PRIVATE_KEY: the path to your private SSH key file.
    USERNAME: the username of the user connecting to the instance. If you manage your SSH keys in metadata, the username is what you specified when you created the SSH key. For OS Login accounts, the username is defined in your Google profile.
    EXTERNAL_IP: The external IP address for your instance.

