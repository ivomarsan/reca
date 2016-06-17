module.exports = (app) => {
  const controller = app.controllers.user;

  app.route('/authenticate')
     .post(controller.auth)
  ;
  // app.route('/signin')
  //    .post(controller.signin)
  // ;
  app.route('/ivomar')
     .get(controller.welcome)
  ;
  // app.route('/setup')
  //    .get(controller.setup)
  // ;
};
