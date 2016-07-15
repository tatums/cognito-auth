routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('confirm', {
      url: '/account/confirm',
      template: require('./template.html'),
      controller: 'ConfirmController',
      controllerAs: 'confirm',
      authenticate: false
    });
}
