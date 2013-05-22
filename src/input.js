(function () {
  'use strict';

  var Bobun = this.Bobun;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.Input = Bobun.View.extend({

    tagName: 'input',

    attributes: {
      type: 'text'
    },

    events: {
      'click'    : 'domEventTriggerProxy',
      'change'   : 'domEventTriggerProxy',
      'input'    : 'domEventTriggerProxy',
      'keydown'  : 'domEventTriggerProxy',
      'keyup'    : 'domEventTriggerProxy',
      'keypress' : 'domEventTriggerProxy',
      'dragstart': 'domEventTriggerProxy',
      'dragenter': 'domEventTriggerProxy',
      'dragover' : 'domEventTriggerProxy',
      'dragleave': 'domEventTriggerProxy',
      'dragend'  : 'domEventTriggerProxy',
      'drop'     : 'domEventTriggerProxy'
    },

    options: {
      value: null,
      disabled: false
    },

    initialize: function () {
      // events
      this.on('change:disabled', this.updateDisabled);
      this.on('change:value', this.updateValue);
      this.on('$input', this.onInput);
    },

    render: function () {
      return this
      .updateDisabled()
      .updateValue();
    },

    updateDisabled: function () {
      this.$el.prop('disabled', this.get('disabled'));
      return this;
    },

    updateValue: function () {
      this.$el.val(this.get('value'));
      return this;
    },

    onInput: function () {
      this.set('value', this.$el.val());
    }
  });

}).call(this);