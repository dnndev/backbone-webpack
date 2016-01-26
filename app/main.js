var ContainerView = require('./views/container_view.js');
var AppView = require('./views/app_view.js');
var Cookies = require('js-cookie');

var App = {
  router: {},
  init: function() {
    // Use the router(s) for any internal (relative) links, unless it has a
    // `data-bypass` attribute or is `target=_blank`
    $('#fiddle-app').on('click', 'a:not([data-bypass],[target])', function (evt) {
      console.log('trappeda  click');
      var href = $(this).attr('href'),
          protocol = this.protocol + '//';

      // For <a href="#"> links, we always want to preventDefault to avoid having to do
      // this within each individual Backbone View event function.
      // (However don't preventDefault on #something URLs in case we need to jump down a page.)
      if (href === '#') {
        evt.preventDefault();
      }

      // Don't break cmd-click (windows: ctrl+click) opening in new tab
      if (evt.metaKey || evt.ctrlKey) {
        return;
      }

      // Ensure the protocol is not part of URL, meaning it's relative.
      // We also don't want to do anything with links that start with "#" since we use push state
      if (href && href.slice(0, protocol.length) !== protocol &&
          href.indexOf('#') !== 0 &&
          href.indexOf('mailto:') !== 0 &&
          href.indexOf('tel:') !== 0
      ) {
        // Stop the default event to ensure the link will not cause a page
        // refresh.
        evt.stopPropagation();
        evt.preventDefault();

        // `Backbone.history.navigate` is sufficient for all Routers and will
        // trigger the correct events. The Router's internal `navigate` method
        // calls this anyways.
        Backbone.history.navigate(href, true);
      }
    });

    var view = new ContainerView({
      el: $('#fiddle-app')
    });

    view.render();

    var AppRouter = Backbone.Router.extend({
      initialize: function(options) {
        this.view = options.view;
        this.on("all", this.storeRoute);
        this.history = [];

        // check for a history cookie
        var history = Cookies.get('history');
        if (history && history === '"[]"') {
          Cookies.remove('history');
          history = null;
        }
        if (history) {
          this.history = JSON.parse(history);
        }
        this.home();
      },

      storeRoute: function () {
        // we don't want the same URL in there back to back - that's not the purpose
        // of us keeping history. We want to know where they "came from" so we can go
        // previous any time we like.
        if (this.history.length > 0 &&
            this.history[this.history.length - 1] === Backbone.history.fragment) {
          return;
        }

        // persist the cookie
        Cookies.set('history', this.history);
        this.history.push(Backbone.history.fragment);
      },

      previous: function () {
        if (this.history.length > 1) {
          return this.navigate(this.history[this.history.length - 2], true);
        }
      },

      routes: {
        '' : 'home'
      },

      home: function() {
        var view = new AppView();
        this.view.showView(view);
      }
    });

    App.router = new AppRouter({ view: view });
    Backbone.history.start({ pushState: true });

    Backbone.emulateHTTP = true;
  }


};

App.init();

