'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    states = require('./controllers/states'),
    partials = require('./controllers/partials'),
    template = require('./controllers/templates'),
    programCategory = require('./controllers/program-category');
var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All undefined api routes should return a 404
  
  app.post('/service/api/states', states.create);
  app.get('/service/api/states', states.query);

  app.get('/service/api/program-category', programCategory.query);
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  app.get('/service/api/partials', partials.query);
  //app.get('/api/state/:statesId', states.show);
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};