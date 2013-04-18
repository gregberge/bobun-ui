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
      titleAttr: null,
      buttons: null,
      headerView: null,
      bodyView: null,
      footerView: null
    },

    initialize: function () {
      // init sub-views
      this.headerView = this.headerView || new Bobun.UI.Modal.Header({
        title: this.options.title,
        titleAttr: this.options.titleAttr,
        model: this.model
      });

      this.bodyView = this.bodyView || new Bobun.UI.Modal.Body({
        model: this.model
      });

      this.footerView = this.footerView || new Bobun.UI.Modal.Footer({
        buttons: this.buttons,
        model: this.model
      });
    },

    modal: function () {
      this.delegateEvents();
      this.$el.modal.apply(this.$el, arguments);
    },

    render: function () {
      return this
      .append(this.headerView)
      .append(this.bodyView)
      .append(this.footerView);
    },

    stopListening: function () {
      Bobun.UI.Base.prototype.stopListening.apply(this, arguments);

      console.log('stop');

      _.invoke([
        this.headerView,
        this.bodyView,
        this.footerView
      ], 'stopListening');
    }
  });

  Bobun.UI.Modal.Header = Bobun.UI.Base.extend({

    className: 'modal-header',

    options: {
      title: null,
      titleAttr: null
    },

    initialize: function () {
      // init elements
      this.$closeButton = $('<button>')
      .addClass('close')
      .attr('data-dismiss', 'modal')
      .html('&times;');

      this.$title = $('<h3>');

      // init model
      if (this.model && this.options.titleAttr) {
        this.listenTo(this.model, 'change:' + this.options.titleAttr, function (model, value) {
          this.set('title', value);
        });

        this.set('title', this.model.get(this.options.titleAttr));
      }

      // init events
      this.on('change:title', this.renderTitle);
    },

    render: function () {
      this.$el
      .append(this.$closeButton)
      .append(this.$title);

      return this.renderTitle();
    },

    renderTitle: function () {
      this.$title.html(this.options.title);
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
      _.each(this.options.buttons, function (button) {
        this.append(button);
      }, this);

      return this;
    },

    stopListening: function () {
      Bobun.UI.Base.prototype.stopListening.apply(this, arguments);

      _.invoke(this.options.buttons, 'stopListening');
    }
  });

}());