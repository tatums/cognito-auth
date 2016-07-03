routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/account/login',
      template: require('./template.html'),
      controller: 'LoginController',
      controllerAs: 'login'
    });
}
