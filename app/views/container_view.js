var ContainerView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(Backbone, 'userError', this.showAlert);
  },

  showView: function (view) {
    // cleanup view
    if (this.subView) {
      this.subView.remove();
    }

    var inner = $('<div class="inner">').appendTo(this.el);
    view.setElement(inner).render();
    this.subView = view;
  },

  showAlert: function (html, type) {
    this.$('.alert').html(html)
        .removeClass('alert-success alert-info alert-warning alert-danger')
        .addClass('alert-' + type)
        .show();
  }
}); // ContainerView

module.exports = ContainerView;

