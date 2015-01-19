TrelloClone.Views.CardNew = Backbone.View.extend({
  template: JST['cards/new'],
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
  // bug: collection's listId is not being set, need to look at when
  // the collection is being set and making sure it is being set
  // correctly
  handleSubmit: function (event) {
    event.preventDefault();
    debugger;
    var title = this.$('input[name="title"]').val();
    var card = new TrelloClone.Models.Card({
      title: title,
      list_id: this.collection.listId
    });
    var view = this;
    card.save({}, {
      success: function () {
        view.collection.add(card);
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
