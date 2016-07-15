export default class LoginController {

  constructor(AwsService) {
    this.title = "Login"
    this.submit = function (form, validity) {
      if (validity) {
        AwsService.auth(form.username, form.password)
      }
    }

    this.list = () => {
      AwsService.list()
    }

  }
}

LoginController.$inject = ['AwsService']
