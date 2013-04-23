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

    attributes: {
      'data-disabled': 'view.disabled'
    },

    initialize: function () {
      root.Bobun.UI.Base.prototype.initialize.apply(this, arguments);

      // label
      this.options.labelView = this.get('labelView') || new root.Bobun.UI.Button.Label({
        model: this.model,
        label: this.get('label')
      });

      this.bind(this.get('labelView'), 'label');
      this.views.add(this.get('labelView'));
    },

    render: function () {
      return this
      .append(this.get('labelView'));
    }
  });

  root.Bobun.UI.Button.Label = root.Bobun.UI.Base.extend({

    tagName: 'span',

    options: {
      label: null
    },

    attributes: {
      'data-text': 'view.label'
    }
  });
}).call(this);