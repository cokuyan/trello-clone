TrelloClone.Views.ListIndex = Backbone.CompositeView.extend({
  template: JST['lists/index'],

  initialize: function () {
    var view = this;
    this.addListSubviews();
    this.listenTo(this.collection, 'sync remove', this.render);
    this.listenTo(this.collection, 'add', function (list) {
      view.addListSubview(list);
      view.render();
    });
  },

  events: {
    'click button.add-list': 'renderNewForm',
    'click button.delete': 'deleteList'
  },

  addListSubviews: function () {
    var view = this;
    this.collection.each(function(list) {
      view.addListSubview(list);
    });
  },

  addListSubview: function (list) {
    var listShow = new TrelloClone.Views.ListShow({ model: list })
    this.addSubview('ul.lists', listShow);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    this.$('#sortable-lists').sortable({
      placeholder: "highlight-list",
      forcePlaceholderSize: true
    });
    return this;
  },

  renderNewForm: function (event) {
    $(event.currentTarget).remove();
    var newView = new TrelloClone.Views.ListNew({
      collection: this.collection,
      parent: this
    });
    this.$el.append(newView.render().$el);
  },

  deleteList: function (event) {
    var list = this.collection.get($(event.currentTarget).data("id"));
    var listView = _.find(this.subviews('ul.lists'), function (subview) {
      return subview.model === list;
    });
    this.removeSubview('ul.lists', listView);
    this.collection.remove(list);
    list.destroy();
  }
})
