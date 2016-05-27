'use strict';

var express = require('express');
var router = express.Router();

let crypto = require('crypto');

let users = require('../models/users');
let jwt = require('jsonwebtoken');
let config = require('../config');

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);

  let _password = crypto.createHash('md5').update(password).digest('hex');

  let db = req.db;

  users.login(db, username, _password)
    .then(user => {
      if (user) {
        var token = jwt.sign(user, config.secretKey, {
          expiresIn: "1d"
        });

        res.send({
          ok: true,
          msg: 'Welcome to my app!',
          token: token
        });

      } else {
        res.send({ ok: false, msg: 'Authentication failed' });
      }

    }, err => {
      res.send({
        ok: false,
        msg: 'Authentication failed'
      });
    });
});

module.exports = router;
