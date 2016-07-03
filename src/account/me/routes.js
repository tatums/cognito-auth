routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('myAccount', {
      url: '/account/me',
      template: require('./template.html'),
      controller: 'MyAccountController',
      controllerAs: 'myAccount'
    });
}
