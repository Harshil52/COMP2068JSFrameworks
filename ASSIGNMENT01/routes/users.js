// getting the express module and creating a router object
var express = require('express');
var router = express.Router();

// rending the view and passing the title to it
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// exporting the object so that it can be used for any other use in the application
module.exports = router;
