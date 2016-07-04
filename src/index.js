import angular from 'angular'
import uiRouter from 'angular-ui-router'

import login from './account/login'
import myAccount from './account/me'
import signup from './account/signup'
import confirm from './account/confirm'

import config from './config'
import run from './run'

angular.module('app', [uiRouter, login, myAccount, signup, confirm])
.config(config)
.run(run)

