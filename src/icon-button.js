(function () {
  'use strict';

  var root = this;

  root.Bobun.UI.IconButton = root.Bobun.UI.Button.extend({

    className: 'btn btn-icon',

    initialize: function () {
      root.Bobun.UI.Button.prototype.initialize.apply(this, arguments);

      // options
      this.options = _.extend({
        processing: false,
        defaultIconClassName: null,
        processingIconClassName: 'icon-spin icon-spinner'
      }, Bobun.UI.Button.prototype.options, this.options);

      this.options.disabled = this.options.processing || this.options.disabled;

      this.bindTo(this, {'processing': 'disabled'});

      // icon
      this.options.iconView = this.get('iconView') || new root.Bobun.UI.IconButton.Icon({
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

      this.domView.sync();
    },

    render: function () {
      return this
      .append(this.get('iconView'))
      .append(this.get('labelView'));
    }
  });

  root.Bobun.UI.IconButton.Icon = root.Bobun.UI.Base.extend({

    tagName: 'i',

    options: {
      processing: null,
      defaultClassName: null,
      processingClassName: 'icon-spin icon-spinner'
    },

    initialize: function () {
      root.Bobun.UI.Base.prototype.initialize.apply(this, arguments);

      this.on('change:processing change:defaultClassName change:processingClassName', this.render);
    },

    render: function () {
      this.$el.toggleClass(this.get('processingClassName'), this.get('processing'));
      this.$el.toggleClass(this.get('defaultClassName'), ! this.get('processing'));
      return this;
    }
  });
}).call(this);