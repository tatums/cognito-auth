import uirouter from 'angular-ui-router';
import routes from './routes';
import ConfirmController from './controller';

export default angular.module('app.confirm', [uirouter])
  .config(routes)
  .controller('ConfirmController', ConfirmController)
  .name;
