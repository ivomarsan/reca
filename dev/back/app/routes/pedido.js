module.exports = function(app) {
  var controller = app.controllers.pedido;

  app.route('/pedido')
     .get(controller.listPedidos)
     .post(controller.setPedido)
  ;
  app.route('/pedido/:id')
     .get(controller.getPedido)
  ;
};
