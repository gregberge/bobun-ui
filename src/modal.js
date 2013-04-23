(function () {
  'use strict';

  var root = this;

  root.Bobun.UI.Modal = root.Bobun.UI.Base.extend({

    className: 'modal',

    events: {
      'hidden': 'remove'
    },

    attributes: {
      'tabindex' : '-1'
    },

    options: {
      title: null,
      buttons: [],
      headerView: null,
      bodyView: null,
      footerView: null
    },

    initialize: function () {
      // header
      this.options.headerView = this.get('headerView') || new Bobun.UI.Modal.Header({
        model: this.model,
        title: this.get('title')
      });

      this.bindChange('title', this.get('headerView'));

      this.views.add(this.get('headerView'));

      // body
      this.options.bodyView = this.get('bodyView') || new Bobun.UI.Modal.Body({
        model: this.model
      });

      this.views.add(this.get('bodyView'));

      // footer
      this.options.footerView = this.get('footerView') || new Bobun.UI.Modal.Footer({
        model: this.model,
        views: this.get('buttons')
      });

      this.bindChange('buttons', this.get('footerView'), 'views');

      this.views.add(this.get('footerView'));
    },

    modal: function () {
      this.delegateEvents();
      this.$el.modal.apply(this.$el, arguments);
    }
  });

  root.Bobun.UI.Modal.Header = root.Bobun.UI.Base.extend({

    className: 'modal-header',

    options: {
      title: null,
      closeView: null,
      titleView: null
    },

    initialize: function () {
      // close
      this.options.closeView = this.get('closeView') || new Backbone.View({
        model: this.model,
        el: Backbone.$('<button>')
        .addClass('close')
        .attr('data-dismiss', 'modal')
        .html('&times;')
      });

      this.views.add(this.get('closeView'));

      // title
      this.options.titleView = this.get('titleView') || new Bobun.UI.Modal.Header.Title({
        title: this.get('title'),
        model: this.model,
        el: Backbone.$('<h3>')
      });

      this.bindChange('title', this.get('titleView'));

      this.views.add(this.get('titleView'));
    }
  });

  root.Bobun.UI.Modal.Header.Title = root.Bobun.UI.Base.extend({

    options: {
      title: null
    },

    initialize: function () {
      this.on('change:title', this.update);
    },

    update: function () {
      this.$el.html(this.get('title'));
      return this;
    }
  });

  root.Bobun.UI.Modal.Body = root.Bobun.UI.Base.extend({

    className: 'modal-body'
  });

  root.Bobun.UI.Modal.Footer = root.Bobun.UI.Base.extend({

    className: 'modal-footer'
  });

}).call(this);