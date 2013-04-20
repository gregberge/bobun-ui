(function (context) {
  'use strict';

  context.Bobun = context.Bobun || {};
  context.Bobun.UI = context.Bobun.UI || {};

  context.Bobun.UI.Base = context.Backbone.View.extend({

    views: {},

    k: 'to',

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
    },

    _bindOption: function (option, model) {
      var optionValue, optionMatches;

      model = model || this.model;
      optionValue = this.options[option];

      if (! model || ! option) {
        return ;
      }

      optionMatches = optionValue.match(/model\.(.*)/);

      if (! optionMatches) {
        return ;
      }

      this.listenTo(model, 'change:' + optionMatches[1], function (model, value) {
        this.set(option, value);
      });

      this.set(option, model.get(optionMatches[1]), {silent: true});
    },

    stopListening: function () {
      Backbone.View.prototype.stopListening.apply(this, arguments);

      _.invoke(_.toArray(this.views), 'stopListening');
    }
  });
}(window));