(function () {
  'use strict';

  var root = this;

  root.Bobun = root.Bobun || {};
  root.Bobun.UI = root.Bobun.UI || {};

  root.Bobun.UI.Base = root.Backbone.View.extend({

    _configure: function () {
      root.Backbone.View.prototype._configure.apply(this, arguments);

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

    _bindModelOption: function (option, model) {
      var optionValue, optionMatches, attributes;

      model = model || this.model;
      optionValue = this.options[option];

      if (! model || ! option || typeof optionValue !== 'string') {
        return ;
      }

      optionMatches = optionValue.match(/model\.(.*)/);

      if (! optionMatches) {
        return ;
      }

      attributes = {};
      attributes[option] = optionMatches[1];

      this.bind(model, attributes);
      this.set(option, model.get(optionMatches[1]), {silent: true});
    },

    _$trigger: function (event) {
      this.trigger(event.type, event);
    },

    remove: function () {
      root.Backbone.View.prototype.remove.apply(this, arguments);
      this.views.invoke('remove');
    },

    stopListening: function () {
      root.Backbone.View.prototype.stopListening.apply(this, arguments);
      this.views.invoke('stopListening');
    }
  });

  _.each(['set', 'get', '_validate'], function (method) {
    root.Bobun.UI.Base.prototype[method] = function () {
      var oldAttributes = this.attributes, ret;
      this.attributes = this.options;
      ret = root.Backbone.Model.prototype[method].apply(this, arguments);
      this.attributes = oldAttributes;
      return ret;
    };
  });

  _.each(['bindTo', 'bind'], function (method) {
    Bobun.UI.Base.prototype[method] = function () {
      return Bobun.Binding[method].apply(this, [this].concat(_.toArray(arguments)));
    };
  });

}).call(this);