FROM node:18.20.4

# Install cron
RUN apt update -y && apt install -y cron

# Create user : appuser 
RUN useradd -m appuser

# Switch account to root，copy crontab and grant permission. Refer to: https://stackoverflow.com/questions/56340350/run-cron-as-non-root-user
USER root
COPY crontab /home/appuser/app-cron
RUN chown appuser:appuser /home/appuser/app-cron
RUN chmod gu+rw /var/run
RUN chmod gu+s /usr/sbin/cron

# Switch to appuser and exec crontab file
USER appuser
RUN crontab /home/appuser/app-cron

# Set container working directory and copy local files to it
WORKDIR /home/appuser/app
COPY . /home/appuser/app

# Switch to root and grant permission to appuser
USER root
RUN chown -R appuser:appuser /home/appuser/app

# Switch back to appuser and install npm packages
USER appuser
RUN npm install

# Start cron

ENTRYPOINT ["cron", "-f"]