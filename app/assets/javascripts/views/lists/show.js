TrelloClone.Views.ListShow = Backbone.View.extend({
  template: JST['lists/show'],
  tagName: 'li',
  className: 'list',

  render: function () {
    this.$el.html(this.template({ list: this.model }));
    var cardIndex = new TrelloClone.Views.CardIndex({
      collection: this.model.cards()
    });
    this.$el.append(cardIndex.render().$el);
    return this;
  }
})
