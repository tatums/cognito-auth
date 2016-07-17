export default class LoginController {

  constructor(AwsService) {
    this.title = "Login"
    this.submit = function (form, validity) {
      if (validity) {
        AwsService.auth(form.username, form.password)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }

  }
}

LoginController.$inject = ['AwsService']
