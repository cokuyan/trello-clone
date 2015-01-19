TrelloClone.Routers.BoardRouter = Backbone.Router.extend({
  initialize: function (boards, $rootEl) {
    this.boards = boards;
    this.$rootEl = $rootEl;
  },

  routes: {
    '': 'boardsIndex',
    'boards/:id': 'boardShow'
  },

  boardsIndex: function () {
    this.boards.fetch();
    var indexView = new TrelloClone.Views.BoardIndex({
      collection: this.boards
    });
    this._swapView(indexView);
  },

  boardShow: function (id) {
    var board = this.boards.getOrFetch(id);
    var showView = new TrelloClone.Views.BoardShow({ model: board })
    this._swapView(showView);
  },

  _swapView: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(this._currentView.render().$el);
  }
})
