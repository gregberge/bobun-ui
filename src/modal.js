(function () {
  'use strict';

  var Backbone = this.Backbone,
  Bobun = this.Bobun;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.Modal = Bobun.View.extend({

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

      this.bind(this.get('headerView'), 'title');

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

      this.bind(this.get('footerView'), {'buttons': 'views'});

      this.views.add(this.get('footerView'));
    },

    modal: function () {
      this.delegateEvents();
      this.$el.modal.apply(this.$el, arguments);
    },

    render: function () {
      return this
      .append(this.get('headerView'))
      .append(this.get('bodyView'))
      .append(this.get('footerView'));
    }
  });

  Bobun.UI.Modal.Header = Bobun.View.extend({

    className: 'modal-header',

    options: {
      title: null,
      closeView: null,
      titleView: null
    },

    initialize: function () {
      // close
      this.options.closeView = this.get('closeView') || new Bobun.View({
        model: this.model,
        el: Backbone.$('<button>')
        .addClass('close')
        .attr('data-dismiss', 'modal')
        .html('&times;')
      });

      this.views.add(this.get('closeView'));

      // title
      this.options.titleView = this.get('titleView') || new Bobun.UI.Modal.Header.Title({
        model: this.model,
        title: this.get('title')
      });

      this.bind(this.get('titleView'), 'title');

      this.views.add(this.get('titleView'));
    },

    render: function () {
      return this
      .append(this.get('closeView'))
      .append(this.get('titleView'));
    }
  });

  Bobun.UI.Modal.Header.Title = Bobun.View.extend({

    tagName: 'h3',

    options: {
      title: null
    },

    initialize: function () {
      this.on('change:title', this.update);
    },

    render: function () {
      this.$el.html(this.get('title'));
      return this;
    }
  });

  Bobun.UI.Modal.Body = Bobun.View.extend({

    className: 'modal-body'
  });

  Bobun.UI.Modal.Footer = Bobun.View.extend({

    className: 'modal-footer',

    render: function () {
      this.views.each(function (view) {
        this.append(view);
      }, this);
      return this;
    }
  });

}).call(this);
