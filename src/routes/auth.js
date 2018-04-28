
const express = require('express');
const router = express.Router();

const auth = require('../managers/auth');

router.post('/register', (req, res) => {
  console.log(req.body);

  auth.register(req.body.username, req.body.password, req.body.email)
    .then(data => {
      res.send(JSON.stringify(data));
    }, (err) => {
      res.send(JSON.stringify(err));
    });
});

module.exports = router;