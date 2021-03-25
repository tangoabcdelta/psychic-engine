##### Pre-requisites:

- What is `.dockerignore`
- Installing `docker` on your local machine
- Installing `docker` on your remote machine
- Creating a`docker` pipeline in Azure

### The base image

Dockerfile usually starts from a base image.

As defined in the [Docker documentation](https://docs.docker.com/engine/reference/builder/), a base image or parent image is where your image is based. It’s your starting point. It could be an Ubuntu OS, Redhat, MySQL, Redis, etc.

There are many pre-defined base images out there that you can use. If they don't match your requirements, then you will need to create one.


```dockerfile
# Filename: Dockerfile 
FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
```

#### Base Image by using Docker FROM 

We add the base image to Dockerfile using the **FROM** command, followed by the base image name:

```dockerfile
FROM node:10-alpine
```


#### Copying source code: Dockert COPY

Let’s instruct Docker to copy our source during Docker build:

```dockerfile
# Filename: Dockerfile 
FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
```

First, we set the working directory using **WORKDIR**. We then copy files using the **COPY** command. The first argument is the source path, and the second is the destination path on the image file system. We copy **package.json**and install our project dependencies using **npm install**. This will create the **node_modules** directory that we once ignored in .**dockerignore**.

You might be wondering why we copied **package.json** before the source code. Docker images are made up of layers. They’re created based on the output generated from each command. Since the file **package.json** does not change often as our source code, we don’t want to keep rebuilding **node_modules** each time we run Docker build.

Copying over files that define our app dependencies and install them immediately enables us to take advantage of the Docker cache. The main benefit here is quicker build time. There’s a really nice blog post that [explains this concept in detail. ](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)



#### Exposing a port: Docker EXPORT

Exposing port 3000 informs Docker which port the container is listening on at runtime. Let’s modify the Docker file and expose the port 3000.

```dockerfile
# Filename: Dockerfile 
FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
```

#### Docker CMD

The **CMD** command tells Docker how to run the application we packaged in the image.

In the following example: The CMD follows the format *CMD [“command”, “argument1”, “argument2”]*.

```dockerfile
CMD ["npm", "start"]
```

#### Docker RUN

```dockerfile
RUN apt update && npm install -g serve
```



