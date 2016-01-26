var template = require('./../templates/home.hbs');


var AppView = Backbone.View.extend({


  initialize: function (options) {
    this.options = options;

  },

  render: function () {
    this.$el.html(template());
    return this;
  }
});


module.exports = AppView;