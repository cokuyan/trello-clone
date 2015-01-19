TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],
  tagName: 'li',
  className: 'card',

  render: function () {
    this.$el.html(this.template({ card: this.model }));
    return this;
  }
})
