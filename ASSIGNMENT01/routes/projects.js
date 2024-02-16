const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.render('projects', {title: 'Projects'});
});

module.exports = router;