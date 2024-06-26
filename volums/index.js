const express = require('express');
const mongoose = require('mongoose');
const redis=require('redis');
const os=require('os');

// init app
const PORT = process.env.PORT || 5000;
const app = express();

// connect to redis
REDIS_PORT=6379;
REDIS_HOST='redis';


const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  });
  redisClient.on('error', err => console.log('Redis Client Error', err));
  redisClient.on('connect', ()=> console.log('Redis Client is connected'));
  redisClient.connect();




// connect to mongo db
const DB_USER='root';
const DB_PASSWORD ='example';
const DB_PORT =27017;
const DB_HOST='mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
mongoose.connect(URI).then(() => console.log('connect to db ...')).catch((err) => console.log('failed to connect to db :', err));

app.get('/',(req,res) => { 
    redisClient.set('name','TALLAL');
    console.log(`traffic from ${os.hostname}`);
    res.send(`<p style="font-size:100px">&#128540;</p>
              <h1> Hallo Mostafa &#128540;</h1>
	    `)});

    app.get('/data',async (req,res) => { 
        const name = await redisClient.get('name');
        res.send(`<h1>Hallo mostafa </h1> <h2> ${name} </h2>`)});

app.listen(PORT,() => console.log(`app is up and running on port : ${PORT}`));

