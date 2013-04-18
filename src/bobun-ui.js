(function (context) {
  'use strict';

  context.Bobun = context.Bobun || {};
  context.Bobun.UI = context.Bobun.UI || {};

  window.Bobun.UI.Base = window.Backbone.View.extend({
    append: function (view) {
      this.$el.append(view.render().el);
      view.delegateEvents();
      return this;
    },

    set: function (key, value, options) {
      options = options || {};

      this.options[key] = value;

      if (! options.silent) {
        this.trigger('change:' + key, this, value, options);
        this.trigger('change', this, options);
      }
    }
  });
}(window));