TrelloClone.Views.BoardIndex = Backbone.View.extend({
  template: JST['boards/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync add remove change:title', this.render)
  },

  events: {
    'click button.add-board': 'renderNewForm',
    'click button.delete': 'deleteBoard'
  },

  render: function () {
    this.$el.html(this.template({ boards: this.collection }));
    return this;
  },

  renderNewForm: function (event) {
    $(event.currentTarget).remove();
    var newView = new TrelloClone.Views.BoardNew({
      collection: this.collection,
      parent: this
    });
    this.$el.append(newView.render().$el);
  },

  deleteBoard: function (event) {
    var board = this.collection.get($(event.currentTarget).data("id"));
    this.collection.remove(board);
    board.destroy();
  }
})
