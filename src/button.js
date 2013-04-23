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
      disabled: false
    },

    initialize: function () {
      // events
      this.on('change:label', this.updateLabel);
      this.on('change:disabled', this.updateDisabled);
    },

    update: function () {
      return this
      .updateDisabled()
      .updateLabel();
    },

    updateLabel: function () {
      this.$el.html(this.get('label'));
      return this;
    },

    updateDisabled: function () {
      this.$el.prop('disabled', this.get('disabled'));
      return this;
    }
  });
}).call(this);