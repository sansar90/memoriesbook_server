/*
import express from 'express';
import {createWriteStream} from 'fs';
const router = express.Router();
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import VideoDetails from "../models/VideoDetails.js";
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'media/uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.mp4') {
          return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
      }
      cb(null, true)
  }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             User
//=================================


router.post("/uploadfiles", (req, res) => {

  upload(req, res, err => {
      if (err) {
          return res.json({ success: false, err })
      }
      return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
      
  })
  


});


router.post("/thumbnail", (req, res) => {

  let thumbsFilePath ="";
  let fileDuration ="";
  

  ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
      console.dir(metadata);
      console.log(metadata.format.duration);

      fileDuration = metadata.format.duration;
      
  })


  ffmpeg(req.body.filePath)
      .on('filenames', function (filenames) {
          console.log('Will generate ' + filenames.join(', '))
          thumbsFilePath = "media/uploads/thumbnails/" + filenames[0];
          
      })
      .on('end', function () {
          console.log('Screenshots taken');
          return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
      })
      .screenshots({
          // Will take screens at 20%, 40%, 60% and 80% of the video
          count: 3,
          folder: 'media/uploads/thumbnails',
          size:'320x240',
          // %b input basename ( filename w/o extension )
          filename:'thumbnail-%b.png'
      });
      
      

});


router.post("/uploadVideo",upload,(req, res,next) => {
  const videoDetails = new VideoDetails(req.body);
  if(req.file){
    videoDetails.filepath = req.file.path;
    videoDetails.upload_title = req.file.filename;
  }
  videoDetails.save((err, media) => {
    if (err) {
        return res.json({
          success:false,
          message:'Media Failed!',
          err
        });
      }
      else if (media) {
           req.result =  {
            success:true,
            message:'Media Created Successfully!',
            media
          };
          next();
      }
  })
    
 


});





*/
import express from "express";
const router = express.Router();
import multer from "multer";

import generateThumbnail from "../helpers/videoThumbnail.js";
const port = process.env.PORT|| 3000;
const s="https://memoriesbook2.herokuapp.com";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, "_"));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 50 MB
  },
});

router.post("/uploadVideo", upload.single("file"), (req, res) => {
  generateThumbnail(
    // /api/videos is made publically available in App.js
    "http://127.0.0.1:" +
    port +
    "/videos/" +
      req.file.filename.replace(/ /g, "_"),
    req.file.filename.replace(/ /g, "_")
    
  );
  res.status(200).json({
    message: "Video upload successful",
  });
});


export default router;

