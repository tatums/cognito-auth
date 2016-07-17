routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('account.signup', {
      url: '/account/signup',
      template: require('./template.html'),
      controller: 'SignupController',
      controllerAs: 'signup',
      authenticate: false
    });
}
