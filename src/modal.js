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
      header: null,
      body: null,
      footer: null
    },

    initialize: function () {
      // sub-views
      this.views.header = this.header || new Bobun.UI.Modal.Header({
        title: this.get('title'),
        model: this.model
      });

      this.bindChange('title', this.views.header);

      this.views.body = this.body || new Bobun.UI.Modal.Body({
        model: this.model
      });

      this.views.footer = this.footer || new Bobun.UI.Modal.Footer({
        buttons: this.get('buttons'),
        model: this.model
      });

      this.bindChange('buttons', this.views.footer);
    },

    modal: function () {
      this.delegateEvents();
      this.$el.modal.apply(this.$el, arguments);
    },

    render: function () {
      return this
      .append(this.views.header)
      .append(this.views.body)
      .append(this.views.footer);
    }
  });

  Bobun.UI.Modal.Header = Bobun.UI.Base.extend({

    className: 'modal-header',

    options: {
      title: null
    },

    initialize: function () {
      // sub-views
      this.views.close = new Backbone.View({
        model: this.model,
        el: Backbone.$('<button>')
        .addClass('close')
        .attr('data-dismiss', 'modal')
        .html('&times;')
      });

      this.views.title = new Bobun.UI.Modal.Header.Title({
        title: this.get('title'),
        model: this.model,
        el: Backbone.$('<h3>')
      });

      this.bindChange('title', this.views.title);
    },

    render: function () {
      return this
      .append(this.views.close)
      .append(this.views.title);
    }
  });

  Bobun.UI.Modal.Header.Title = Bobun.UI.Base.extend({

    options: {
      title: null
    },

    initialize: function () {
      // events
      this.on('change:title', this.render);
    },

    render: function () {
      this.$el.html(this.get('title'));
      return this;
    }
  });

  Bobun.UI.Modal.Body = Bobun.UI.Base.extend({

    className: 'modal-body'
  });

  Bobun.UI.Modal.Footer = Bobun.UI.Base.extend({

    className: 'modal-footer',

    options: {
      buttons: []
    },

    render: function () {
      _.each(this.get('buttons'), this.append, this);
      return this;
    },

    stopListening: function () {
      Bobun.UI.Base.prototype.stopListening.apply(this, arguments);

      _.invoke(this.get('buttons'), 'stopListening');
    }
  });

}());