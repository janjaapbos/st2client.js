'use strict';

var request = require('../request')
  ;

var Repeatable = {
  repeat: {
    value: function (id, payload) {
      if (!id) {
        throw {
          name: 'ArgumentError',
          message: id + ' is not a valid id'
        };
      }

      if (!payload) {
        throw {
          name: 'ArgumentError',
          message: payload + ' is not a valid payload'
        };
      }

      return request({

        method: 'post',
        protocol: this.protocol && this.protocol + ':',
        host: this.host,
        port: this.port,
        path: [this.path, id, 're_run'].join('/'),
        version: this.api_version,
        withCredentials: false,
        headers: this.token ? {
          'content-type': 'application/json',
          'x-auth-token': this.token.token
        } : {
          'content-type': 'application/json'
        },

      }, payload).then(function (res) {

        if (res.statusCode !== 201) {
          throw {
            name: 'APIError',
            status: res.statusCode,
            message: res.body.faultstring || res.body
          };
        }

        return res.body;

      });
    }
  }
};

module.exports = Repeatable;