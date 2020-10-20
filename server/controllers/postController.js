var Post = require('../models/post');

//Handle post create
exports.post_create = (req, res, next) => {
  var date = new Date();
  var post = new Post({
    title: req.body.title,
    content: req.body.content,
    time: date,
  });

  post.save(function(err) {
    if(err) {
      return next(err);
    }
    res.redirect(post.url);
  });
};

//Display a list with all the posts
exports.post_list = function(req, res, next) {
  Post
  .find({})
  .select('title content time')
  .exec(function(err, post){
    if(err){
      return next(err);
    }
    res.json(post);
  });
};

//Display details for a specific post
exports.post_details = function(req, res, next) {
  Post
  .findById(req.params.id)
  .select('title content time')
  .exec(function(err, post) {
    if(err) {
      return next(err);
    }
    res.json(post);
  });
};

//Handle post update
exports.post_update = function(req, res, next) {
  var titleUpdate = req.body.title;
  var contentUpdate = req.body.content;

  Post.findByIdAndUpdate(req.params.id, { title: titleUpdate, content: contentUpdate }, function(err, post){
    if(err) {
      return next(err);
    }
    res.redirect(post.url);
  });
};

//Handle post delete
exports.post_delete = function(req, res, next) {
  Post.findByIdAndDelete(req.params.id, function(err){
    if(err) {
      return next(err);
    }
    res.redirect('/posts');
  });
};
