(function (context) {
  'use strict';

  context.Bobun = context.Bobun || {};
  context.Bobun.UI = context.Bobun.UI || {};

  context.Bobun.UI.Base = context.Backbone.View.extend({

    _configure: function () {
      context.Backbone.View.prototype._configure.apply(this, arguments);

      this.views = this.options.views || {};

      _.each(this.options, function (value, option) {
        this._bindModelOption(option);
      }, this);
    },

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

    _bindModelOption: function (option, model) {
      var optionValue, optionMatches;

      model = model || this.model;
      optionValue = this.options[option];

      if (! model || ! option || typeof optionValue !== 'string') {
        return ;
      }

      optionMatches = optionValue.match(/model\.(.*)/);

      if (! optionMatches) {
        return ;
      }

      this.bindChange(optionMatches[1], this, model, option);
    },

    bindChange: function (originOption, target, origin, targetOption) {
      origin = origin || this;
      targetOption = targetOption || originOption;

      this.listenTo(origin, 'change:' + originOption, function (origin, value) {
        target.set(targetOption, value);
      });

      target.set(targetOption, origin.get(originOption), {silent: true});
    },

    _$trigger: function (event) {
      this.trigger(event.type, event);
    },

    stopListening: function () {
      context.Backbone.View.prototype.stopListening.apply(this, arguments);

      _.invoke(_.toArray(this.views), 'stopListening');
    }
  });
}(window));