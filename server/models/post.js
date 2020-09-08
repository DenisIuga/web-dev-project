var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 100},
  content: { type: String, required: true, minlength: 25, maxlength: 500},
  time: { type: Date},
});

PostSchema.virtual('url').get( function() {
  return '/post/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);
