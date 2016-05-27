'use strict';

let Q = require('q');

module.exports = {
  login(db, username, password) {
    let q = Q.defer();

    db('users')
      .select('id', 'username')
      .where({
        username: username,
        password: password
      })
      .then(rows => {
        q.resolve(rows[0])
      })
      .catch(err => {
        q.reject(err)
      });

    return q.promise;

  }
};