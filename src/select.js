(function () {
  'use strict';

  var Bobun = this.Bobun,
  _ = this._;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.Select = Bobun.View.extend({

    tagName: 'select',

    events: {
      'change'  : 'domEventTriggerProxy'
    },

    options: {
      value: null,
      choices: [],
      disabled: false
    },

    initialize: function () {
      this.on('change:disabled', this.renderDisabled);
      this.on('change:choices change:value', this.checkValue);
      this.on('change:choices', this.renderChoices);
      this.on('change:value', this.renderValue);

      this.on('$change', this.updateValue);

      this.checkValue();
    },

    checkValue: function () {
      var value = _
      .chain(this.get('choices'))
      .keys().find(function (value) {
        return '' + value === '' + this.get('value');
      }, this)
      .value();

      this.set('value', _.isUndefined(value) ? _.chain(this.get('choices')).keys().first().value() : value);
    },

    updateValue: function () {
      this.set('value', this.$el.val());
    },

    render: function () {
      return this
      .renderDisabled()
      .renderChoices()
      .renderValue();
    },

    renderDisabled: function () {
      this.$el.prop('disabled', this.get('disabled'));
      return this;
    },

    renderChoices: function () {
      this.$el.empty();
      _.each(this.get('choices'), this.renderChoice, this);
      return this;
    },

    renderChoice: function (label, value) {
      var $option = $('<option>')
      .val(value)
      .html(label);

      return this.$el.append($option);
    },

    renderValue: function () {
      this.$el.val(this.get('value'));
      return this;
    }

  });

}).call(this);