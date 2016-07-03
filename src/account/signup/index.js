import uirouter from 'angular-ui-router';
import routes from './routes';
import SignupController from './controller';

export default angular.module('app.signup', [uirouter])
  .config(routes)
  .controller('SignupController', SignupController)
  .name;
