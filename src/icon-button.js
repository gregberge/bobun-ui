(function () {
  'use strict';

  Bobun.UI.IconButton = Bobun.UI.Button.extend({

    className: 'btn btn-icon',

    initialize: function () {
      var oldDisabled;

      Bobun.UI.Button.prototype.initialize.apply(this, arguments);

      // options
      this.options = _.extend({
        processing: false,
        defaultIconClassName: null,
        processingIconClassName: 'icon-spin icon-spinner'
      }, Bobun.UI.Button.prototype.options, this.options);

      oldDisabled = this.options.disabled;

      this.bindChange('processing', this, 'disabled');

      if (! this.options.processing) {
        this.options.disabled = oldDisabled;
      }

      // views
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

  Bobun.UI.IconButton.Icon = Bobun.UI.Base.extend({

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

  Bobun.UI.IconButton.Label = Bobun.UI.Base.extend({

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
}());