(function () {
  'use strict';

  var root = this;

  root.Bobun = root.Bobun || {};
  root.Bobun.UI = root.Bobun.UI || {};

  root.Bobun.UI.Base = root.Backbone.View.extend({

    changed: null,

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

    set: function (key, val, options) {
      var opts, opt, changes, silent, changing, prev, current;

      if (typeof key === 'object') {
        opts = key;
        options = val;
      } else {
        (opts = {})[key] = val;
      }

      options = options || {};

      silent = options.silent;
      changes = [];
      changing = this._changing;
      this._changing = true;

      if (! changing) {
        this._previousOptions = _.clone(this.options);
        this.changed = {};
      }

      current = this.options;
      prev = this._previousOptions;

      for (opt in opts) {
        val = opts[opt];
        if (!_.isEqual(current[opt], val)) {
          changes.push(opt);
        }
        if (!_.isEqual(prev[opt], val)) {
          this.changed[opt] = val;
        } else {
          delete this.changed[opt];
        }
        current[opt] = val;
      }


      if (! silent) {
        if (changes.length) {
          this._pending = true;
        }
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      if (changing) {
        return this;
      }

      if (! silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    get: function (option) {
      return this.options[option];
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

  _.each(['bindTo', 'bind'], function (method) {
    Bobun.UI.Base.prototype[method] = function () {
      return Bobun.Binding[method].apply(this, [this].concat(_.toArray(arguments)));
    };
  });

}).call(this);