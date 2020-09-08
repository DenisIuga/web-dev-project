var express = require('express');
var router = express.Router();

var post_controller = require('../controllers/postController');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Posts routes
router.get('/post/create', post_controller.post_create_get);
router.post('/post/create', post_controller.post_create_post);

router.get('/posts', post_controller.post_list);

router.get('/post/:id', post_controller.post_details);

router.get('/post/:id/update', post_controller.post_update_get);
router.post('/post/:id/update', post_controller.post_update_post);

router.get('/post/:id/delete', post_controller.post_delete_get);
router.post('/post/:id/delete', post_controller.post_delete_post);

module.exports = router;
