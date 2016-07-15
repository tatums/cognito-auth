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
        console.log({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken()
        })

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'us-east-1:df8e95ef-5242-4ef7-92e1-c0d86963d2a6',
          UserPoolId : 'us-east-1_BGU9CKFCM',
          Logins : {
            // Change the key below according to the specific region your user pool is in.
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_BGU9CKFCM' : result.getIdToken().getJwtToken()
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

  list () {

    const s3 = new AWS.S3({
      accessKeyId: 'anything',
      secretAccessKey: 'anything'
    });

    s3.getObject({
      Bucket: 'cognito-web-auth',
      Key: 'key_1.pem'
    }, function(err, data) {
      if (err) console.log(err, err.stack);
      else     console.log(data.Body.toString());
    });

  }


  signup (attr) {

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
