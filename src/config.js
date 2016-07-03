routing.$inject = ['$urlRouterProvider', '$locationProvider', 'jwtInterceptorProvider'];

export default function routing($urlRouterProvider, $locationProvider, jwtInterceptorProvider) {

  //console.log(jwt);

  Object.keys(localStorage).forEach((key)=>{
    console.log({
      key: key, value: localStorage[key]
    })
  })


  //console.log(jwtInterceptorProvider);
  //jwtInterceptorProvider.tokenGetter = function(store) {
  //  console.log('store:', store);
  //  return store.get('jwt');
  //}

  $urlRouterProvider.otherwise('/account/login');
}
