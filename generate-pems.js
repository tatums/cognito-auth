var jwt = require('jsonwebtoken');
var request = require('request');
var jwkToPem = require('jwk-to-pem');
var fs = require('fs');


//Download the JWKs and save it as PEM
request({
  url: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_BGU9CKFCM/.well-known/jwks.json',
  //url: iss + '/.well-known/jwks.json',
  json: true
}, function (error, response, body) {
  if (!error && response.statusCode === 200) {

    var keys = body['keys'];

    console.log(keys)

    for(var i = 0; i < keys.length; i++) {
      var key_id = keys[i].kid
      var pem = jwkToPem(keys[i])
      fs.writeFileSync(`key_${i}.pem`, pem, 'utf-8')
    }

  } else {
    console.log('FAIL');
  }
});
