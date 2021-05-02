#!/bin/bash

# set permissions
printf "\n"
printf "setting permission for ./packages/server/bin/"
printf "\n"
chmod -R 0755 .
printf "\n"
printf "setting permissions done"
printf "\n"






# Monitoring

# if you want to see all log messages about sshd, run this:
printf "\n"
printf "all logs:"
printf "\n"
grep -rsh sshd /var/log |sort

# this is useful for a one-time-daily-run
printf "showing sshd entries in the last 500 lines of the log:"
printf "\n"
tail -n 500 /var/log/auth.log | grep 'sshd'

# -f is for follow
printf "\n"
printf "auth failures in the log:"
printf "\n"
tail -f /var/log/auth.log

printf "only ssh related log lines:"
printf "\n"
grep 'sshd' /var/log/auth.log

# this is useful for debugging / active monitoring
printf "follow the log output as you test:"
printf "\n"
tail -f -n 500 /var/log/auth.log | grep 'sshd'



# nginx
printf "\n"
printf "nginx: access log"
printf "\n"
cat /var/log/nginx/access.log

# errors
printf "\n"
printf "nginx: error log"
printf "\n"
cat /var/log/nginx/error.log
