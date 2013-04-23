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

      this.bindChange('processing', this, {
        targetOption: 'disabled',
        set: false
      });

      // icon
      this.options.iconView = this.get('iconView') || new Bobun.UI.IconButton.Icon({
        model: this.model,
        processing: this.get('processing'),
        defaultClassName: this.get('defaultIconClassName'),
        processingClassName: this.get('processingIconClassName')
      });

      this.bindChange('processing', this.get('iconView'));
      this.bindChange('defaultIconClassName', this.get('iconView'), 'defaultClassName');
      this.bindChange('processingIconClassName', this.get('iconView'), 'processingClassName');

      this.views.add(this.get('iconView'));

      // label
      this.options.labelView = this.get('labelView') || new Bobun.UI.IconButton.Label({
        model: this.model,
        label: this.get('label')
      });

      this.bindChange('label', this.get('labelView'));

      this.views.add(this.get('labelView'));
    },

    update: function () {
      return this.updateDisabled();
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
      this.on('change:processing change:defaultClassName change:processingClassName', this.render);
    },

    update: function () {
      this.$el.toggleClass(this.get('processingClassName'), this.get('processing'));
      this.$el.toggleClass(this.get('defaultClassName'), ! this.get('processing'));
      return this;
    }
  });

  root.Bobun.UI.IconButton.Label = root.Bobun.UI.Base.extend({

    tagName: 'span',

    options: {
      label: null
    },

    initialize: function () {
      this.on('change:label', this.render);
    },

    update: function () {
      this.$el.html(this.get('label'));
      return this;
    }
  });
}).call(this);