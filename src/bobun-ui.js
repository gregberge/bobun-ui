(function (context) {
  'use strict';

  context.Bobun = context.Bobun || {};
  context.Bobun.UI = context.Bobun.UI || {};

  context.Bobun.UI.Base = context.Backbone.View.extend({

    _configure: function () {
      context.Backbone.View.prototype._configure.apply(this, arguments);

      this.views = new Backbone.ChildViewContainer(this.options.views || []);

      this.on('change:views', function () {
        this.views = new Backbone.ChildViewContainer(this.options.views || []);
        this.render();
      });

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

      this.bindChange({
        origin: model,
        originOption: optionMatches[1],
        target: this,
        targetOption: option
      });
    },

    bindChange: function (originOption, target, optionsArg) {
      var options, origin, targetOption;

      options = typeof originOption === 'object' ? originOption :
      typeof optionsArg === 'object' ? optionsArg : {};

      options = _.extend({
        silent: true,
        set: true
      }, options);

      originOption = typeof originOption === 'string' ? originOption : options.originOption;
      target = target || options.target;
      origin = options.origin || this;
      targetOption = typeof optionsArg === 'string' ? optionsArg : options.targetOption || originOption;

      this.listenTo(origin, 'change:' + originOption, function (origin, value) {
        target.set(targetOption, value);
      });

      if (options.set) {
        target.set(targetOption, origin.get(originOption), options);
      }
    },

    _$trigger: function (event) {
      this.trigger(event.type, event);
    },

    update: function () {
      return this;
    },

    render: function () {
      this.views.each(this.append, this);
      return this.update();
    },

    remove: function () {
      context.Backbone.View.prototype.remove.apply(this, arguments);
      this.views.invoke('remove');
    },

    stopListening: function () {
      context.Backbone.View.prototype.stopListening.apply(this, arguments);
      this.views.invoke('stopListening');
    }
  });
}(window));