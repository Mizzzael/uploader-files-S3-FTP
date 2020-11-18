'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('/socket', 'FileController.index');
Route.group(() => {

  Route.post('/', 'UserController.store');//.validator('UserStore') //.middleware('guest'); //Guest gera
  Route.put('/', 'UserController.update').middleware('auth');
  Route.post('/login', 'UserController.login').middleware('guest');
  Route.post('/me', 'UserController.show').middleware('auth');

}).prefix('api/user/');

Route.group(() => {
  Route.post('/', 'CdnController.store').middleware('auth');
}).prefix('api/cdn/');