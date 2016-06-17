const morgan = require("morgan")
    , express = require('express')
    , load = require('express-load')
    , path = express.static('./public')
    , bodyParser = require('body-parser')
    , compression = require('compression')
    , dir = 'dev/back/app'
  ;

module.exports = () => {
  const app = express();

  app.set('port', process.env.PORT || 3000);
  app.use(path);
  app.set('view engine', 'ejs');
  app.set('views', './'+dir+'/views');

  /*
************************************************************************
  */
  // use to gzip compression files
  app.use(compression());
  // use body parser so we can get info from POST and/or URL parameters
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // use morgan to log requests to the console
  app.use(morgan('dev'));
  app.use(require('method-override')());

  app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });
  /*
************************************************************************
  */

  load('models', {cwd: dir})
      .then('controllers')
      .then('routes')
      .into(app)
  ;

  return app;
};
