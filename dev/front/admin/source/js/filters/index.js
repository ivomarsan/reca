let app = angular.module('admin');

app.filter('range', require('./src/range'));
app.filter('cpfFormat', require('./src/cpf-format'));
app.filter('dateFormat', require('./src/date-format'));
app.filter('cellFormat', require('./src/cell-format'));
