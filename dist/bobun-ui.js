/*! bobun-ui - v0.3.1 - https://github.com/neoziro/bobun-ui */
(function () {
  'use strict';

  var Bobun = this.Bobun;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.Button = Bobun.View.extend({

    tagName: 'button',

    className: 'btn',

    events: {
      'click': 'domEventTriggerProxy'
    },

    options: {
      label: null,
      labelView: null,
      disabled: false
    },

    initialize: function () {
      // label
      this.options.labelView = this.get('labelView') || new Bobun.UI.Button.Label({
        model: this.model,
        label: this.get('label')
      });

      this.bind(this.get('labelView'), 'label');
      this.views.add(this.get('labelView'));

      // events
      this.on('change:disabled', this.updateDisabled);
    },

    render: function () {
      return this
      .append(this.get('labelView'))
      .updateDisabled();
    },

    updateDisabled: function () {
      this.$el.prop('disabled', this.get('disabled'));
      return this;
    }
  });

  Bobun.UI.Button.Label = Bobun.View.extend({

    tagName: 'span',

    options: {
      label: null
    },

    initialize: function () {
      this.on('change:label', this.render);
    },

    render: function () {
      this.$el.html(this.get('label'));
      return this;
    }
  });

}).call(this);
(function () {
  'use strict';

  var Bobun = this.Bobun,
  _ = this._;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.IconButton = Bobun.UI.Button.extend({

    className: 'btn btn-icon',

    initialize: function () {
      Bobun.UI.Button.prototype.initialize.apply(this, arguments);

      // options
      this.options = _.extend({
        processing: false,
        defaultIconClassName: null,
        processingIconClassName: 'icon-spin icon-spinner'
      }, Bobun.UI.Button.prototype.options, this.options);

      this.options.disabled = this.options.processing || this.options.disabled;

      this.bindTo(this, {'processing': 'disabled'});

      // icon
      this.options.iconView = this.get('iconView') || new Bobun.UI.IconButton.Icon({
        model: this.model,
        processing: this.get('processing'),
        defaultClassName: this.get('defaultIconClassName'),
        processingClassName: this.get('processingIconClassName')
      });

      this.bind(this.get('iconView'), {
        'processing': 'processing',
        'defaultIconClassName': 'defaultClassName',
        'processingIconClassName': 'processingClassName'
      });
      this.views.add(this.get('iconView'));
    },

    render: function () {
      return this
      .append(this.get('iconView'))
      .append(this.get('labelView'))
      .updateDisabled();
    }
  });

  Bobun.UI.IconButton.Icon = Bobun.View.extend({

    tagName: 'i',

    options: {
      processing: null,
      defaultClassName: null,
      processingClassName: 'icon-spin icon-spinner'
    },

    initialize: function () {
      this.on('change:processing change:defaultClassName change:processingClassName', this.render);
    },

    render: function () {
      this.$el.toggleClass(this.get('processingClassName'), this.get('processing'));
      this.$el.toggleClass(this.get('defaultClassName'), ! this.get('processing'));
      return this;
    }
  });
}).call(this);
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
      this.views.each(this.append, this);
      return this;
    }
  });

}).call(this);