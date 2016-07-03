import uirouter from 'angular-ui-router';
import routes from './routes';
import LoginController from './controller';
import angularjwt from 'angular-jwt';
export default angular.module('app.login', [uirouter, angularjwt])
  .config(routes)
  .controller('LoginController', LoginController)
  .name;
