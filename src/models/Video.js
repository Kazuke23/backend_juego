const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  url: String,
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
