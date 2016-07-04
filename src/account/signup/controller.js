export default class SignupController {
  constructor(AwsService) {

    this.title = "Signup"

    this.submit = function (form, validity) {
      if (validity) {
        AwsService.signup(form)
      }
    }

  }
}

SignupController.$inject = ['AwsService']
