FROM node

WORKDIR /Users/malik/Desktop/language-bank/src

COPY PACKAGE*.JSON ./

RUN npm install 

COPY . . 

ENV PORT=8080 

EXPOSE 8080
 
CMD [ "npm", "start" ]
