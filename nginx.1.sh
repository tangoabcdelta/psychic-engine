#!/bin/bash





printf "default path: /etc/nginx/nginx.conf"
printf "\n"
cat /etc/nginx/nginx.conf 
printf "\n"
printf "\n"
printf "\n"



printf "initial configure script parameters:"
printf "\n"
printf "\n"
# show the initial configure script parameters
# note: these are not the actual parameters that are running
/usr/sbin/nginx -V
printf "\n"
printf "\n"
printf "\n"


# to use an alternative configuration file
# instead on the default one, you can set the -c flag (man nginx):
# /usr/sbin/nginx -c /opt/nginx_agent/conf/nginx.conf
# printf "\n"



printf "new content"
printf "\n"
sudo cp nginx.conf /etc/nginx/nginx.conf
printf "\n"
printf "\n"
printf "\n"

# Ubuntu Linux - How to view status of your Nginx server
sudo service status nginx
printf "\n"
printf "\n"
printf "\n"
printf "\n"
printf "\n"
printf "\n"
# Ubuntu Linux - How to restart nginx
# sudo systemctl [start|stop|restart] nginx 
# sudo /etc/init.d/nginx [start|stop|restart]

# sudo systemctl restart nginx
# sudo service nginx restart
# sudo /etc/init.d/nginx restart
sudo service nginx restart




