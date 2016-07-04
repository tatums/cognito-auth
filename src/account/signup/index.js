import uirouter from 'angular-ui-router';
import routes from './routes';
import SignupController from './controller';
import AwsService from './../aws_service'

export default angular.module('app.signup', [uirouter])
  .config(routes)
  .controller('SignupController', SignupController)
  .service('AwsService', AwsService)
  .name;
