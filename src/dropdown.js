(function () {
  'use strict';

  var Bobun = this.Bobun,
  _ = this._,
  Backbone = this.Backbone;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.Dropdown = Bobun.View.extend({

    className: 'btn-group',

    options: {
      label     : null,
      disabled  : false,
      buttonView: null,
      choices   : [],
      listView  : null
    },

    initialize: function () {
      this.options.buttonView = this.get('buttonView') || new Bobun.UI.Button({
        model: this.model,
        label: this.get('label'),
        disabled: this.get('disabled'),
        className: 'btn dropdown-toggle',
        attributes: {
          'data-toggle': 'dropdown'
        }
      });

      this.bind(this.get('buttonView'), 'label');
      this.bind(this.get('buttonView'), 'disabled');

      this.options.listView = this.get('listView') || new Bobun.UI.Dropdown.List({
        model: this.model,
        choices: this.get('choices')
      });

      this.bind(this.get('listView'), 'choices');

      this.listenTo(this.get('listView'), 'click:choice', function () {
        this.trigger.apply(this, ['click:choice'].concat([].slice.call(arguments)));
      });
    },

    render: function () {
      return this
      .append(this.get('buttonView'))
      .append(this.get('listView'));
    }
  });

  Bobun.UI.Dropdown.List = Bobun.View.extend({

    tagName: 'ul',

    className: 'dropdown-menu',

    options: {
      choices: []
    },

    initialize: function () {
      this.on('change:choices', this.buildChoices);
      this.on('change:choices', this.listenChoices);
      this.on('change:choices', this.render);

      this.buildChoices();
      this.listenChoices();
    },

    buildChoices: function () {
      this.set('choices', _.map(this.get('choices'), function (choice) {
        if (! (choice instanceof Backbone.View))
          choice = new Bobun.UI.Dropdown.Choice(choice);

        return choice;
      }), {silent: true});
    },

    listenChoices: function () {
      _.each(this.get('choices'), function (choice) {
        choice.on('$click', function () {
          this.trigger.apply(this, ['click:choice'].concat([].slice.call(arguments)));
        }, this);
      }, this);
    },

    render: function () {
      this.$el.empty();

      _.each(this.get('choices'), function (choice) {
        this.append(choice);
      }, this);

      return this;
    }
  });

  Bobun.UI.Dropdown.Choice = Bobun.View.extend({

    tagName: 'li',

    options: {
      label      : null,
      link       : '#',
      linkElement: '<a>'
    },

    events: {
      'click': 'domEventTriggerProxy'
    },

    initialize: function () {
      this.options.linkElement = Backbone.$(this.options.linkElement);

      this.on('change:label change:link', this.updateLink);
      this.on('change:linkElement', this.render);

      this.updateLink();
    },

    updateLink: function () {
      var linkElement = this.get('linkElement');

      if (this.get('link'))
        linkElement.attr('href', this.get('link'));
      else
        linkElement.removeAttr('href');

      linkElement.html(this.get('label'));
    },

    render: function () {
      this.$el.append(this.get('linkElement'));
      return this;
    }
  });
}).call(this);