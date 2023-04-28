var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(_req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/proj1/index.html'));
});

module.exports = router;
