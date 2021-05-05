import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import path from 'path';
import fs from 'fs';
import thumbsupply from 'thumbsupply';
import morgan from 'morgan';

import postRoutes from './routes/posts.js';
import userRoutes from "./routes/user.js";
import uploadRoutes from "./routes/upload.js";
import videoRoutes from './routes/video.js';


const app= express();
dotenv.config();


app.use(morgan('dev'));

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

//app.use('/uploads', express.static('uploads'));
app.use('/videos', express.static('media/uploads'));

var dir='media'
var subDir='media/uploads'
var subSubDir='media/uploads/video_thumbnails'
if(!fs.existsSync(dir)){
  fs.mkdirSync(dir)

  fs.mkdirSync(subDir)
  fs.mkdirSync(subSubDir)
}


app.use('/posts',postRoutes);
app.use("/user", userRoutes);
app.use("/upload", uploadRoutes);

app.use('/videoList',videoRoutes);


app.get('/',(req,res)=>{
  res.send('Hello to MemoriesBook API');
})


const CONNECTION_URL="mongodb+srv://sansar:sansar1090@cluster0.d3xlj.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT|| 3000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
  mongoose.Promise = global.Promise;


mongoose.set('useFindAndModify', false);




