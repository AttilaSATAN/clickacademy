'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    states = require('./controllers/states'),
    partials = require('./controllers/partials'),
    template = require('./controllers/templates'),
    egitimCategories = require('./controllers/egitim-categories'),
    egitimCategory = require('./controllers/egitim-category'),
    egitim = require('./controllers/egitim'),
    egitimler = require('./controllers/egitimler');
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
  //   function (req,res,next){
  //   //egitimCategory.get
  //   console.log(req)
  //   res.json(req.params)
  // });
  // 
  app.post('/service/api/egitim/visual', egitim.visual);
  // 
  // 
  app.get('/service/api/egitim/by-category/:categoryUrl', egitim.byCategory);
  app.get('/service/api/egitim/by-url/:egitimUrl', egitim.byUrl);
  app.get('/service/api/egitim/:egitimId', egitim.get);
  app.delete('/service/api/egitim/:egitimId', egitim.delete);
  app.post('/service/api/egitim', egitim.save);
  //app.delete('/service/api/egitim-category/:categoryId', egitimCategory.delete);

  app.get('/service/api/egitimler', egitimler.query);  


  app.get('/service/api/egitim-category/:categoryId', egitimCategory.get);
  app.delete('/service/api/egitim-category/:categoryId', egitimCategory.delete);
  app.post('/service/api/egitim-category', egitimCategory.save);
  //app.delete('/service/api/egitim-category/:categoryId', egitimCategory.delete);

  app.get('/service/api/egitim-categories', egitimCategories.query);
  app.get('/service/*', function(req, res) {
    res.send(404);
  });
  app.get('/service/api/partials', partials.query);
  //app.get('/api/state/:statesId', states.show);
  
  // All other routes to use Angular routing in app/scripts/app.js
  //app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie);
};