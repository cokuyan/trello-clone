TrelloClone.Collections.Cards = Backbone.Collection.extend({
  url: '/api/roots',
  model: TrelloClone.Models.Card,
  comparator: 'ord',

  initialize: function (models, options) {
    this.list = options.list;
  }
})
