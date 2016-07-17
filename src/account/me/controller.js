export default class LoginController {
  constructor(AwsService) {
    this.title = "My Account"
    this.currentUser = AwsService.currentUser()
    this.signout = () => {
      AwsService.signout()
    }
  }
}

LoginController.$inject = ['AwsService']
