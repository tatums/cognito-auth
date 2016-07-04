AWSCognito.config.region = 'us-east-1'
AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:df8e95ef-5242-4ef7-92e1-c0d86963d2a6',
})

AWSCognito.config.update({
  accessKeyId: 'anything',
  secretAccessKey: 'anything'
})

const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
  UserPoolId : 'us-east-1_BGU9CKFCM',
  ClientId : '3q8g2135i3sn30g0cpo4bu4uop'
})

console.log(AWS.config.credentials);
//AWS.config.credentials.get(function(err){
////  //console.log(err, resp)
////  if (err) {
////    alert(err)
////  }
////
//})

export default class AwsService {

  constructor() { }

  currentUser () {
    return userPool.getCurrentUser();
  }


  confirm (attr) {
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
      Username : attr.username,
      Pool : userPool
    });

    cognitoUser.confirmRegistration(attr.confirmCode, true, function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      console.log('call result: ' + result);
    })
  }



  auth (username, password) {

    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({
      Username : username,
      Password : password,
    })

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
      Username : username,
      Pool : userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        //console.log('result:', result);
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


  signup (attr) {

    const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
      UserPoolId : 'us-east-1_BGU9CKFCM',
      ClientId : '3q8g2135i3sn30g0cpo4bu4uop'
    });

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

}

AwsService.$inject = [];
