TrelloClone.Views.BoardNew = Backbone.View.extend({
  template: JST['boards/new'],
  tagName: 'form',

  initialize: function (options) {
    this.collection = options.collection;
    this.parent = options.parent;
  },

  events: {
    'click button.submit': 'handleSubmit',
    'click button.cancel': 'cancel'
  },

  render: function () {
    this.$el.html(this.template())
    return this;
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var title = this.$('input[name="title"]').val();
    var board = new TrelloClone.Models.Board({ title: title });
    var view = this;
    board.save({}, {
      success: function () {
        view.collection.add(board);
        view.remove();
      },

      error: function (model, resp) {
        console.log(resp);
        alert("Something went wrong");
      }
    });
  },

  cancel: function (event) {
    event.preventDefault();
    this.parent.render();
    this.remove();
  }
})
