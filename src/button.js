(function () {
  'use strict';

  var root = this;

  root.Bobun.UI.Button = root.Bobun.UI.Base.extend({

    tagName: 'button',

    className: 'btn',

    events: {
      'click': '_$trigger'
    },

    options: {
      label: null,
      labelView: null,
      disabled: false
    },

    initialize: function () {
      // label
      this.options.labelView = this.get('labelView') || new root.Bobun.UI.Button.Label({
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

  root.Bobun.UI.Button.Label = root.Bobun.UI.Base.extend({

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