import { spawn } from 'child_process';
import {createWriteStream } from 'fs';
import ffmpeg from "fluent-ffmpeg";
spawn('node', ['script.js'], {
  env: {
      NODE_ENV: 'production',
      PATH: process.env.PATH
  }
})
import VideoDetails from '../models/VideoDetails.js';
const port = process.env.PORT|| 3000;



const ffmpegPath = 'C:\\FFmpeg\\bin\\ffmpeg.exe';
const width = 256;
const height = 144;

const generateThumbnail = (target, title ) => {
  title = title.replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '');
  let tmpFile = createWriteStream('media/uploads/video_thumbnails/' + title + '.jpg');
  const ffmpeg = spawn(ffmpegPath, [
    '-ss',
    0,
    '-i',
    target,
    '-vf',
    `thumbnail,scale=${width}:${height}`,
    '-qscale:v',
    '2',
    '-frames:v',
    '1',
    '-f',
    'image2',
    '-c:v',
    'mjpeg',
    'pipe:1'
  ]);
  ffmpeg.stdout.pipe(tmpFile);
  const videoDetails = new VideoDetails({
    uploaderName: "",
    uploadTitle: title,
    videoPath: target,
    thumbnailPath: "https://memoriesbook2.herokuapp.com "+ '/videos/video_thumbnails/' + encodeURIComponent(title + '.jpg')
  });
  videoDetails
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

export default generateThumbnail