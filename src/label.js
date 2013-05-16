(function () {
  'use strict';

  var Bobun = this.Bobun;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.Label = Bobun.View.extend({

    tagName: 'label',

    events: {
      'click'   : 'domEventTriggerProxy'
    },

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