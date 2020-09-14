var Post = require('../models/post');

//Display post create form on GET
exports.post_create_get = (req, res, next) => {
  res.json({ title: "", content: "" });
};

//Handle post create on POST
exports.post_create_post = (req, res, next) => {
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

//Display post edit form on GET
exports.post_update_get = function(req, res, next) {
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

//Handle post edit on POST
exports.post_update_post = function(req, res, next) {
  var titleUpdate = req.body.title;
  var contentUpdate = req.body.content;

  Post.findByIdAndUpdate(req.params.id, { title: titleUpdate, content: contentUpdate },function(err, post){
    if(err) {
      return next(err);
    }
    res.redirect(post.url);
  });
};

//Display post delete form on GET
exports.post_delete_get = function(req, res, next) {
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

//Handle post delete on POST
exports.post_delete_post = function(req, res, next) {
  Post.findByIdAndDelete(req.params.id, function(err){
    if(err) {
      return next(err);
    }
    res.redirect('/posts');
  });
};