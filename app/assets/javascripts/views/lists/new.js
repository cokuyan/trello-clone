TrelloClone.Views.ListNew = Backbone.View.extend({
  template: JST['lists/new'],
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
    var list = new TrelloClone.Models.List({
      title: title,
      board_id: this.collection.boardId
    });
    var view = this;
    list.save({}, {
      success: function () {
        view.collection.add(list);
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
