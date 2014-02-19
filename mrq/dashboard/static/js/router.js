define(["backbone", "underscore", "jquery"],function(Backbone, _, $) {

  return Backbone.Router.extend({

    routes: {

      '': 'queues',
      'workers': 'workers',
      'jobs': 'jobs'
    },

    /**
     * Whenever a route is matched by the Router, a route:[name] event is triggered
     * ([name] is the name of the matched route).
     */
    initialize: function(app) {

      this.app = app;
      this.bind("all", this.change );

      var self = this;
      setTimeout(function() {
        self.change(false);
      }, 2000);

    },

    /**
     * Executed at every route.
     *
     * Scrolls the viewport back to the top of the content.
     */
    change: function(evt) {
      if (evt) this.goToTop();
    },


    getFromQueryString:function(qs,names) {

      var ret = {};
      _.each(names,function(name) {
        var match = (new RegExp('(^|[?&])' + name + '=([^&]*)')).exec(qs);

        ret[name]=match ?
            decodeURIComponent(match[2].replace(/\+/g, ' '))
            : null;
      });

      return ret;

    },

    navigateTo: function(path, query) {

      var filteredQuery = {};
      _.each(query,function(item,key) {
        if (item!==null && item!==undefined && item!=="") {
          filteredQuery[key] = item;
        }
      });

      var queryString = '';
      if (_.size(filteredQuery)) {
        queryString = '?' + $.param(filteredQuery);
      }

      var route = '/' + path + queryString;

      return this.navigate(route, true);
    },

    goToTop: function() {

      var docViewTop = $(window).scrollTop();
      //var elemTop = $('nav').offset().top;
      var elemTop = 0;
      if (elemTop <= docViewTop) {
        $('html, body').animate({ scrollTop: 0 }, 0); // set speed to anything else than 0 if an animation is wanted
      }
    },

    queues: function() {
      this.app.rootView.showChildPage('queues');
    },

    workers: function() {
      this.app.rootView.showChildPage('workers');
    },

    jobs: function(params) {
      this.app.rootView.showChildPage('jobs', {"options": {"params": params || {}}});
    },

    worker: function(id) {
      this.app.rootView.showChildPage('worker', {"options": {"id": id}});
    }

  });

});
