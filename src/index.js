import 'angular-material/angular-material.css'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import angularAnimate from 'angular-animate'
import angularMaterial from 'angular-material'


import login from './account/login'
import myAccount from './account/me'
import signup from './account/signup'
import confirm from './account/confirm'

import config from './config'
import run from './run'

export const app = angular.module('app', [
  uiRouter,
  login,
  myAccount,
  signup,
  confirm,
  angularAnimate,
  angularMaterial,
])
.config(config)
.run(run)
