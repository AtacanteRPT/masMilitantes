var csvjson = require('csvjson');
var fs = require('fs');
var path = require('path')
var tutor = {};

var rest = require('restler');
var async = require('async')

var files = [];
rest.get('http://twaud.io/api/v1/users/danwrong.json').on('complete', function(data) {
  console.log(data[0].message); // auto convert to object
});
 

rest.postJson('http://localhost:1337/militante/crear', personaMilitante).on('complete', function(data2, response2) {
  // handle response
  console.log('PERSONA CREADA')
  console.log("contador", contador++)
  cb(null);

});