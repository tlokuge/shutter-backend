/**
 * Created by thavisha.lokuge on 2018-04-22.
 */

const Config = require('./../utils/config.js');

const Crypto = require('crypto');

class AuthManager {

  constructor() {
    this.provider = new AWS.CognitoIdentityServiceProvider();
  }

  static _genSecretHash(username) {
    let secret = Config.Cognito.UserPool.ClientSecretId;
    let key = username + Config.Cognito.UserPool.ClientId;
    return Crypto.createHmac('sha256', secret).update(key).digest('hex');
  }

  register(username, password, email) {
    let params = {
      ClientId: Config.Cognito.UserPool.ClientId,
      Username: username,
      Password: password,
      SecretHash: AuthManager._genSecretHash(username),
      ValidationData: [
        {
          Name: 'Email',
          Value: email
        }
      ]
    };

    console.log(params);

    return new Promise((resolve, reject) => {
      this.provider.signUp(params, (err, data) => {
          if (err) {
            console.log(err, err.stack);
            reject(err);
            return;
          }

          console.log(data);
          resolve(data);
        });
    });
  }
}

module.exports = new AuthManager();
