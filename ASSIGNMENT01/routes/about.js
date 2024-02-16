// getting the express module and creating a router object
const express = require('express');
const router = express.Router();

// rending the view and passing the title to it
router.get('/', (req, res, next) =>{
    res.render('about', {title: 'About Me'});
});

// exporting the object so that it can be used for any other use in the application
module.exports = router;