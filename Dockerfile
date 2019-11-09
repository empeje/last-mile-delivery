# Dockerfile
#
# === Purpose
#
# @ This is the production container build for this app
# @ It will be very similar to one in Dockerfile.dev but meant for production
#

# Use official Node Docker container image
#
# @ Use explicit version to make sure unexpected error in the future
# @ Use alpine for lightweight container image
#
FROM node:10-alpine

# Folder in the running container that stores our files
#
# @ Can be changed in the future
#
WORKDIR "/app"

# Install git and openssh
#
# @ Needed for npm package that pulls additional dependencies using git
#
RUN apk --update add git openssh && \
  rm -rf /var/lib/apt/lists/* && \
  rm /var/cache/apk/*

# Install app dependencies
#
# @ yarn.lock is also copied to ensure versions are locked
# @ Step is isolated so docker caches and only runs npm install if package.json or package-lock.json is changed
#
COPY ./package.json ./yarn.lock ./
RUN yarn install --production=true

# Copy the other files in api_server over
#
# @ See .dockerignore for files being ignored
#
COPY . .

# Run start script
CMD ["yarn", "start"]
