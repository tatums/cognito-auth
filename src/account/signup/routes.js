routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('signup', {
      url: '/account/signup',
      template: require('./template.html'),
      controller: 'SignupController',
      controllerAs: 'signup'
    });
}
