export default class LoginController {
  constructor(AwsService) {
    this.title = "My Account"
    this.currentUser = AwsService.currentUser()
  }
}

LoginController.$inject = ['AwsService']
