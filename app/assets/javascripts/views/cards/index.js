TrelloClone.Views.CardIndex = Backbone.CompositeView.extend({
  template: JST['cards/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync add remove change:title', this.render);
    var view = this;
    this.collection.each(function(card) {
      view.addCardSubview(card);
    });
  },

  events: {
    'click button.add-card': 'renderNewForm',
    'click button.delete': 'deleteCard'
  },

  addCardSubview: function (card) {
    var cardShow = new TrelloClone.Views.CardShow({ model: card })
    this.addSubview('ul.cards', cardShow);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    this.$('#sortable-cards').sortable({
      placeholder: "highlight-card",
      forcePlaceholderSize: true
    });
    return this;
  },

  renderNewForm: function (event) {
    $(event.currentTarget).remove();
    var newView = new TrelloClone.Views.CardNew({
      collection: this.collection,
      parent: this
    });
    this.$el.append(newView.render().$el);
  },

  deleteCard: function (event) {
    var card = this.collection.get($(event.currentTarget).data("id"));
    var cardView = _.find(this.subviews('ul.cards'), function (subview) {
      return subview.model === card;
    });
    this.removeSubview('ul.lists', cardView);
    this.collection.remove(card);
    card.destroy();
  }
})
