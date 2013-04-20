(function () {
  'use strict';

  Bobun.UI.Button = Bobun.UI.Base.extend({

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

    render: function () {
      // update
      this.updateLabel();
      this.updateDisabled();
      return this;
    },

    updateLabel: function () {
      this.$el.html(this.get('label'));
    },

    updateDisabled: function () {
      if (this.get('disabled')) {
        this.$el.attr('disabled', 'disabled');
      }
      else {
        this.$el.removeAttr('disabled');
      }
    }
  });
}());