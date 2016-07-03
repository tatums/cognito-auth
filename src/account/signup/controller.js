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


function signup (attr) {
  var attributeList = [];
  var dataEmail = {
    Name : 'email',
    Value : attr.email
  };

  var dataPhoneNumber = {
    Name : 'phone_number',
    Value : '+15555555555'
  };

  var dataGivenName = {
    Name : 'given_name',
    Value : attr.firstName
  };

  var dataFamilyName = {
    Name : 'family_name',
    Value : attr.lastName
  };
  var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
  var attributeGivenName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataGivenName);
  var attributeFamilyName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataFamilyName);

  attributeList.push(attributeEmail);
  attributeList.push(attributeGivenName);
  attributeList.push(attributeFamilyName);

  userPool.signUp(attr.email, attr.password, attributeList, null, function(err, result){
    if (err) {
      alert(err);
      return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
  });
}



export default class SignupController {
  constructor() {
    this.title = "Signup"
    this.submit = function (form, validity) {
      console.log(form, validity);
      if (validity) {
        signup(form)
      }
    }
  }
}

SignupController.$inject = []
