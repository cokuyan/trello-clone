window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var boards = new TrelloClone.Collections.Boards();
    boards.fetch();

    new TrelloClone.Routers.BoardRouter(boards, $('#main'));

    Backbone.history.start();
  }
};
