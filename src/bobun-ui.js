(function (context) {
  'use strict';

  context.Bobun = context.Bobun || {};
  context.Bobun.UI = context.Bobun.UI || {};

  context.Bobun.UI.Base = context.Backbone.View.extend({
    append: function (view) {
      this.$el.append(view.render().el);
      view.delegateEvents();
      return this;
    },

    set: function (option, value, options) {
      options = options || {};

      this.options[option] = value;

      if (! options.silent) {
        this.trigger('change:' + option, this, value, options);
        this.trigger('change', this, options);
      }
    },

    get: function (option) {
      return this.options[option];
    }
  });
}(window));