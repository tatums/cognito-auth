AWSCognito.config.region = 'us-east-1';
AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1_BGU9CKFCM ' // your identity pool id here
});
AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})
var poolData = {
  UserPoolId : 'us-east-1_BGU9CKFCM',
  ClientId : '3q8g2135i3sn30g0cpo4bu4uop'
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function auth (username, password) {
  var authenticationData = {
    Username : username,
    Password : password,
  };
  var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  var userData = {
    Username : username,
    Pool : userPool
  };


  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {

      console.log('result:', result);
      console.log('access token + ' + result.getAccessToken().getJwtToken());

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        UserPoolId : 'us-east-1_BGU9CKFCM',
        Logins : {
          // Change the key below according to the specific region your user pool is in.
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_TcoKGbf7n' : result.getIdToken().getJwtToken()
        }
      });
      // Instantiate aws sdk service objects now that the credentials have been updated.
      // example: var s3 = new AWS.S3();
    },

    onFailure: function(err) {
      alert(err);
    },
  });

}


export default class LoginController {

  constructor() {
    this.title = "Login"
    this.submit = function (form, validity) {
      if (validity) {
        auth(form.username, form.password)
      }
    }
  }
}

LoginController.$inject = []
