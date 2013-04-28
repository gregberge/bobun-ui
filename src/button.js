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