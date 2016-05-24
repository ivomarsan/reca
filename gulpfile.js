var gulp = require('gulp')
  , size = require('gulp-size')
  , clean = require('gulp-clean')
  , rename = require('gulp-rename')
  , jshint = require('gulp-jshint')
  , uglify = require('gulp-uglify')
  , concat = require('gulp-concat')
  , cssmin = require('gulp-cssmin')
  , stylus = require('gulp-stylus')
  , jasmine = require('gulp-jasmine')
  , jasmineBrowser = require('gulp-jasmine-browser')
  , nodemon = require('gulp-nodemon')
  , browserify = require('gulp-browserify')
  , htmlmin = require('gulp-html-minifier')
  , ngAnnotate = require('gulp-ng-annotate')
  , nib = require('nib')
  , inject = require('gulp-inject')
  , templateCache = require('gulp-angular-templatecache')
  , stripCssComments = require('gulp-strip-css-comments')
  , browserSync = require('browser-sync').create()
  , base = './dev/front/'
  , path =
    { base: base
    , js: base+'source/js/**/*.js'
    , css: [base+'source/css/**/*.styl', base+'source/css/**/*.css']
    , html: base+'index.html'
    , views: base+'partials/**/*.html'
    , img: [base+'source/css/**/*.png', base+'source/css/**/*.svg', base+'source/css/**/*.gif']
    , backend:
      [ './dev/back/**/*.js'
      , '.server.js'
      ]
    , adminJs: base+'admin/source/js/**/*.js'
    , adminCss: base+'admin/source/css/**/*.css'
    , adminHtml: base+'admin/index.html'
    , adminViews: base+'admin/partials/**/*.html'
    , adminImg: [base+'admin/source/css/**/*.png', base+'admin/source/css/**/*.svg', base+'admin/source/css/**/*.gif']
    }
  ;






gulp.task('adminJs', ['adminBuild-js'], function() {
  gulp.src(path.adminJs)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jasmineBrowser.specRunner());
});
gulp.task('adminBuild-js', function() {
  gulp.src(base+'admin/source/js/app.js')
      .pipe(browserify())
      .pipe(rename('main.js'))
      .pipe(ngAnnotate())
      //.pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('./public/admin/js/'))
      .pipe(size());
});
gulp.task('adminCss', function () {
  gulp.src(path.adminCss)
      .pipe(stylus(
      { import: ['nib', 'rupture/rupture', 'variables', 'mixins']
      , use: [nib()]
      , 'include css': true
      , compress: true
      }))
      .pipe(concat('all.min.css'))
      .pipe(stripCssComments({all: true}))
      .pipe(cssmin())
      .pipe(gulp.dest('./public/admin/css/'));
  gulp.src(path.adminImg)
      .pipe(gulp.dest('./public/admin/css/'));
});
gulp.task('adminHtml', function() {
  gulp.src(path.adminViews)
      .pipe(templateCache({
         module: 'admin'
      }))
      .pipe(gulp.dest('./public/admin/js/'))
  ;
  gulp.src(path.adminHtml)
      .pipe(inject(gulp.src('./public/admin/js/*.js', {read:false}),
        { name:'scripts',     relative:false, ignorePath: 'public'
      }))
      .pipe(inject(gulp.src('./public/admin/css/*.css', {read:false}),
        { name:'styles',      relative:false, ignorePath: 'public'
      }))
    // Minifica o HTML
      //.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    // Salva o Mutante
      .pipe(gulp.dest('./public/admin'))
  ;
});









// Default Task
gulp.task('default', ['demon']);

// Limpa a Pasta
gulp.task('clear', function () {
  return gulp.src('public/**/*.*', {read: false})
    .pipe(clean({force: true}));
});

// TDD with Jasmine
gulp.task('js', ['build-js'], function() {
  //'./public/js/*.js'
  gulp.src(path.js)
    // Cabueta de Erros :P
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
    // Tdd
      .pipe(jasmineBrowser.specRunner())
  ;
});
gulp.task('tdd-back', function() {
  gulp.src(path.backend)
    // Cabueta de Erros :P
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
    // Tdd
      .pipe(jasmine())
  ;
});

// Build da Aplicação
//gulp.task('build', ['clear', 'js','css','html']);
gulp.task('build', ['js','css','html',    'adminJs','adminCss','adminHtml']);


//////////////////////////////
// Script Tasks //////////////
//////////////////////////////
gulp.task('build-js', function() {
  // Grabs the app.js file
  //gulp.src(path.js)
  gulp.src(base+'source/js/app.js')
    // Junta tudo no arquivo main.js
      .pipe(browserify())
      .pipe(rename('main.js'))
    // Remove os Comentários
      .pipe(ngAnnotate())
    // Minifica o JS
      //.pipe(uglify())
    // Adiciona o sufixo min
      .pipe(rename({ suffix: '.min' }))
    // Salva o Mutante
      .pipe(gulp.dest('./public/js/'))
    // Informa o tamanho
      .pipe(size())
  ;
});


//////////////////////////////
// Stylus Tasks //////////////
//////////////////////////////
gulp.task('css', function () {
  gulp.src(path.css)
    // Stylus Gera o CSS
      .pipe(stylus(
      { import: ['nib', 'rupture/rupture', 'variables', 'mixins']
      , use: [nib()]
      , 'include css': true
      , compress: true
      }))
      .pipe(concat('all.min.css'))
      .pipe(stripCssComments({all: true}))
      .pipe(cssmin())
    // Salva o Mutante
      .pipe(gulp.dest('./public/css/'))
  ;
  gulp.src(path.img)
      .pipe(gulp.dest('./public/css/'))
  ;
});

//////////////////////////////
// HTML Tasks ////////////////
//////////////////////////////
gulp.task('html', function() {
  gulp.src(path.views)
      .pipe(templateCache({
         module: 'myApp'
      }))
      .pipe(gulp.dest('./public/js/'))
  ;
  gulp.src(path.html)
      .pipe(inject(gulp.src('./public/js/*.js', {read:false}),
        { name:'scripts',     relative:false, ignorePath: 'public'
      }))
      .pipe(inject(gulp.src('./public/css/*.css', {read:false}),
        { name:'styles',      relative:false, ignorePath: 'public'
      }))
    // Minifica o HTML
      //.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    // Salva o Mutante
      .pipe(gulp.dest('./public'))
  ;
});


gulp.task('demon', ['build'], function() {
  browserSync.init(null, {
		proxy: 'http://localhost:8080',
    files: ['public/**/*.*'],
    port: 8080,
	});
  nodemon({
    start: 'node server.js',
    script: 'server.js',
    ext: 'js',
    ignore: ['.git/*', 'node_modules/*', 'public/*', 'gulpfile.js']
  }).on('start')
    .on('crash', function() {
      console.log('\n**********************\n* Deu Crash e Fudeu! *\n**********************');
    })
  ;
  gulp.watch(path.js, ['js']).on('change', browserSync.reload);
  gulp.watch(path.css, ['css']).on('change', browserSync.reload);
  //gulp.watch(path.backend, ['tdd-back']).on('change', browserSync.reload);
  gulp.watch([path.html, path.views], ['html']).on('change', browserSync.reload);


  gulp.watch(path.adminJs, ['adminJs']).on('change', browserSync.reload);
  gulp.watch(path.adminCss, ['adminCss']).on('change', browserSync.reload);
  //gulp.watch(path.backend, ['tdd-back']).on('change', browserSync.reload);
  gulp.watch([path.adminHtml, path.adminViews], ['adminHtml']).on('change', browserSync.reload);
});


// Imprimir os Erros na tela ao invés de Encerrar o Node
process.on('uncaughtException', function(e) {
  console.error(e.stack);
});
