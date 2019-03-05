var express = require('express');
var router = express.Router();

var Client = require('api-delivery-js').Client;
var Query = require('api-delivery-js').Query;
global.fetch = require("node-fetch");

/* GET home page. */
router.get('/', function (req, res, next) {
  var client = Client.create({
    accessToken: 'xxxxx',
    projectId: 'website',
    rootUrl: 'https://cms-example.cloud.contensis.com'
  });

  client.project.get().then(project => {

    res.render('index', {
      title: 'Express Test App',
      project: project
    });
  });
});

module.exports = router;