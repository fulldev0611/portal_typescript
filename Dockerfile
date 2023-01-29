FROM node:14
MAINTAINER akonovalov

# Install nginx
RUN apt-get update -y && apt-get install nginx -y

# Move nginx files to image
ADD nginx/main.conf /etc/nginx/nginx.conf
ADD nginx/mime.types /etc/nginx/mime.types
ADD nginx/nginx.conf /etc/nginx/sites-enabled/portal.conf

# Add supervisor to run multiple processes in the container
RUN apt install -yq supervisor
# https://stackoverflow.com/questions/18805073/docker-multiple-entrypoints#23968289
# https://blog.trifork.com/2014/03/11/using-supervisor-with-docker-to-manage-processes-supporting-image-inheritance/
ADD supervisord/supervisord.conf /etc/supervisor/supervisord.conf


# Create app and logs directories
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/logs

# Install app dependencies - OLD way
ADD package.json /usr/src/app
ADD tsconfig.json /usr/src/app
# ADD .eslintrc.js /usr/src/app
# ADD postcss.config.js /usr/src/app
# ADD tailwind.js /usr/src/app
# ADD tailwind.config.js /usr/src/app
# ADD webpack.config.js /usr/src/app
# # Bundle app folders
# ADD public /usr/src/app/public
# ADD src /usr/src/app/src

# Add build folder
ADD build /usr/src/app/build

WORKDIR /usr/src/app

# The assumption is that the NODE_ENV will be set in the command line
EXPOSE 80
ADD startPortalInContainer.sh /usr/local
RUN chmod +x /usr/local/startPortalInContainer.sh

# Add node_modules folder
ADD node_modules /usr/src/app/node_modules

ENTRYPOINT ["/usr/local/startPortalInContainer.sh"]
