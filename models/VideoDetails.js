import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
    
    uploaderName: { type: String},
    uploadTitle: { type: String, required: true },
    videoPath: { type: String, required: true },
    thumbnailPath: { type: String, required: true }
    /*
    upload_title: { type: String },
    filePath : {type: String,required: true},
    duration :{type: String,},
  thumbnail: {type: String}
  */
 
    
  });

const VideoDetails= mongoose.model('VideoDetails', videoSchema);

export default VideoDetails;
 