routing.$inject = ['$urlRouterProvider', '$locationProvider', 'jwtInterceptorProvider'];

export default function routing($urlRouterProvider, $locationProvider, jwtInterceptorProvider) {
  $urlRouterProvider.otherwise('/account/login');
}
