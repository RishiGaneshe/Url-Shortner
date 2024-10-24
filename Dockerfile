FROM node:latest

COPY .   /home/app/     
                # (this command copy all the files in the current directory to "/home/app/" folder)

WORKDIR  /home/app/
                # (this is the working directory)

RUN npm ci      
                # RUN npm ci (for downloading exact dependencies)

EXPOSE 3000     
                # this will expose the docker port at which the server is running 

CMD ["node","index"]


# CMD ["npm","run","dev"]
                #  this will be first command 

# RUN npm install (for downloading only)
# docker run -p 9000:3000 nodeserver    (making containers of images)
# docker run -p <port for local machine>:<port on docker>  <name of the image>         this will create a container of the image