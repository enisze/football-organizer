# Use a base image that supports running cron jobs
FROM ubuntu:latest

# Install necessary dependencies
RUN apt-get update && apt-get -y install wget curl unzip xvfb libxi6 libgconf-2-4

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get -y install yarn

# Download and install Chromium for ARM64
RUN apt-get update && apt-get -y install chromium-browser

# Set the working directory
WORKDIR /app

# Copy the script file and .env file into the container
COPY /src/scripts/script.ts /app/script.ts
COPY tsconfig.json /app/tsconfig.json
COPY /src/emails/transporter.ts /app/transporter.ts
COPY /inngest/createSendEmail.ts /app/createSendEmail.ts
COPY /src/scripts/getSoccerDate.ts /app/getSoccerDate.ts
COPY .env /app/.env

# Install project dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install

# Run the script
CMD ["yarn", "start-script"]

