import uirouter from 'angular-ui-router';
import routes from './routes';
import MyAccountController from './controller';

export default angular.module('app.myAccount', [uirouter])
  .config(routes)
  .controller('MyAccountController', MyAccountController)
  .name;
