import uirouter from 'angular-ui-router';
import routes from './routes';
import ConfirmController from './controller';
import AwsService from './../aws_service'

export default angular.module('app.confirm', [uirouter])
  .config(routes)
  .controller('ConfirmController', ConfirmController)
  .service('AwsService', AwsService)
  .name;
