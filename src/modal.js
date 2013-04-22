(function () {
  'use strict';

  Bobun.UI.Modal = Bobun.UI.Base.extend({

    className: 'modal',

    events: {
      'hidden': 'remove'
    },

    attributes: {
      'tabindex' : '-1'
    },

    options: {
      title: null,
      buttons: null,
      headerView: null,
      bodyView: null,
      footerView: null
    },

    initialize: function () {
      // views
      this.options.headerView = this.get('headerView') || new Bobun.UI.Modal.Header({
        model: this.model,
        title: this.get('title')
      });

      this.bindChange('title', this.get('headerView'));

      this.views.add(this.get('headerView'));

      this.options.bodyView = this.get('bodyView') || new Bobun.UI.Modal.Body({
        model: this.model
      });

      this.views.add(this.get('bodyView'));

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

  Bobun.UI.Modal.Header = Bobun.UI.Base.extend({

    className: 'modal-header',

    options: {
      title: null,
      closeView: null,
      titleView: null
    },

    initialize: function () {
      // sub-views
      this.options.closeView = this.get('closeView') || new Backbone.View({
        model: this.model,
        el: Backbone.$('<button>')
        .addClass('close')
        .attr('data-dismiss', 'modal')
        .html('&times;')
      });

      this.views.add(this.get('closeView'));

      this.options.titleView = this.get('titleView') || new Bobun.UI.Modal.Header.Title({
        title: this.get('title'),
        model: this.model,
        el: Backbone.$('<h3>')
      });

      this.bindChange('title', this.get('titleView'));

      this.views.add(this.get('titleView'));
    }
  });

  Bobun.UI.Modal.Header.Title = Bobun.UI.Base.extend({

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

  Bobun.UI.Modal.Body = Bobun.UI.Base.extend({

    className: 'modal-body'
  });

  Bobun.UI.Modal.Footer = Bobun.UI.Base.extend({

    className: 'modal-footer'
  });

}());