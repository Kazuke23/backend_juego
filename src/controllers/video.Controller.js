const { PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const Video = require('../models/Video');
const s3 = require('../config/aws');

exports.uploadVideo = async (req, res) => {
  const fileStream = fs.createReadStream(req.file.path);
  
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.file.filename,
    Body: fileStream,
  };

  try {
    const data = await s3.send(new PutObjectCommand(params));
    const videoURL = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    const video = await Video.create({ url: videoURL });
    res.status(200).send(video);
  } catch (err) {
    res.status(500).send(err);
  }
};
