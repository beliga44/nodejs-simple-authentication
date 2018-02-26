var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Ini nanti buat profile coi');
});

router.get('/test', function(req, res, next) {
  res.send('Ini nanti buat profile coi-coi');
});

module.exports = router;
