FROM node:20
ARG DB_CONNECTION
ARG JWT_SECRET_KEY
ARG ORIGIN
# ENV setting by pass ARG instruction, the above ARG instruction setting passed by --build-arg 
# The ARG instruction defines a variable that users can pass at build-time to the builder with the docker build command using the --build-arg <varname>=<value> flag.
ENV DB_CONNECTION=${DB_CONNECTION}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
ENV ORIGIN=${ORIGIN}
RUN mkdir -p /root/app
WORKDIR /root/app
COPY . /root/app
RUN npm i
CMD ["npx","tsx","src/app.ts"]