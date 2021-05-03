import express from 'express';
const router = express.Router();

import VideoDetails from '../models/VideoDetails.js';

router.get("/getVideos", (req, res) => {

    VideoDetails.find()
        .populate('uploader_name')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

});






router.post("/getVideo", (req, res) => {

    VideoDetails.findOne({ "_id" : req.body.videoId })
    .populate('uploader_name')
    .exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
});

router.get('/', (req, res, next) => {
    VideoDetails
      .find()
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  
 export default router;

 