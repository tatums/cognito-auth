export default class ConfirmController {
  constructor(AwsService) {

    this.title = "Confirm"

    this.submit = function (form, validity) {
      if (validity) {
        AwsService.confirm(form)
      }
    }

  }
}

ConfirmController.$inject = ['AwsService']
