var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Posts routes
router.post('/post/create', post_controller.post_create);
router.get('/posts', post_controller.post_list);
router.get('/post/:id', post_controller.post_details);
router.post('/post/:id/update', post_controller.post_update);
router.post('/post/:id/delete', post_controller.post_delete);

module.exports = router;
