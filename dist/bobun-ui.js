/*! bobun-ui - v0.4.4 - https://github.com/neoziro/bobun-ui */
(function () {
  'use strict';

  var Bobun = this.Bobun;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.Button = Bobun.View.extend({

    tagName: 'button',

    className: 'btn',

    events: {
      'click': 'domEventTriggerProxy'
    },

    options: {
      label: null,
      labelView: null,
      disabled: false
    },

    initialize: function () {
      // label
      this.options.labelView = this.get('labelView') || new Bobun.UI.Button.Label({
        model: this.model,
        label: this.get('label')
      });

      this.bind(this.get('labelView'), 'label');
      this.views.add(this.get('labelView'));

      // events
      this.on('change:disabled', this.updateDisabled);
    },

    render: function () {
      return this
      .append(this.get('labelView'))
      .updateDisabled();
    },

    updateDisabled: function () {
      this.$el.prop('disabled', this.get('disabled'));
      return this;
    }
  });

  Bobun.UI.Button.Label = Bobun.View.extend({

    tagName: 'span',

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
(function () {
  'use strict';

  var Bobun = this.Bobun,
  _ = this._;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.IconButton = Bobun.UI.Button.extend({

    className: 'btn btn-icon',

    initialize: function () {
      Bobun.UI.Button.prototype.initialize.apply(this, arguments);

      // options
      this.options = _.extend({
        processing: false,
        defaultIconClassName: null,
        processingIconClassName: 'icon-spin icon-spinner'
      }, Bobun.UI.Button.prototype.options, this.options);

      this.options.disabled = this.options.processing || this.options.disabled;

      this.bindTo(this, {'processing': 'disabled'});

      // icon
      this.options.iconView = this.get('iconView') || new Bobun.UI.IconButton.Icon({
        model: this.model,
        processing: this.get('processing'),
        defaultClassName: this.get('defaultIconClassName'),
        processingClassName: this.get('processingIconClassName')
      });

      this.bind(this.get('iconView'), {
        'processing': 'processing',
        'defaultIconClassName': 'defaultClassName',
        'processingIconClassName': 'processingClassName'
      });
      this.views.add(this.get('iconView'));
    },

    render: function () {
      return this
      .append(this.get('iconView'))
      .append(this.get('labelView'))
      .updateDisabled();
    }
  });

  Bobun.UI.IconButton.Icon = Bobun.View.extend({

    tagName: 'i',

    options: {
      processing: null,
      defaultClassName: null,
      processingClassName: 'icon-spin icon-spinner'
    },

    initialize: function () {
      this.on('change:processing change:defaultClassName change:processingClassName', this.render);
    },

    render: function () {
      this.$el.toggleClass(this.get('processingClassName'), this.get('processing'));
      this.$el.toggleClass(this.get('defaultClassName'), ! this.get('processing'));
      return this;
    }
  });
}).call(this);
(function () {
  'use strict';

  var Bobun = this.Bobun;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.Input = Bobun.View.extend({

    tagName: 'input',

    attributes: {
      type: 'text'
    },

    events: {
      'click'    : 'domEventTriggerProxy',
      'change'   : 'domEventTriggerProxy',
      'input'    : 'domEventTriggerProxy',
      'keydown'  : 'domEventTriggerProxy',
      'keyup'    : 'domEventTriggerProxy',
      'keypress' : 'domEventTriggerProxy',
      'dragstart': 'domEventTriggerProxy',
      'dragenter': 'domEventTriggerProxy',
      'dragover' : 'domEventTriggerProxy',
      'dragleave': 'domEventTriggerProxy',
      'dragend'  : 'domEventTriggerProxy',
      'drop'     : 'domEventTriggerProxy'
    },

    options: {
      value: null,
      disabled: false
    },

    initialize: function () {
      // events
      this.on('change:disabled', this.updateDisabled);
      this.on('change:value', this.updateValue);
      this.on('$input', this.onInput);
    },

    render: function () {
      return this
      .updateDisabled()
      .updateValue();
    },

    updateDisabled: function () {
      this.$el.prop('disabled', this.get('disabled'));
      return this;
    },

    updateValue: function () {
      this.$el.val(this.get('value'));
      return this;
    },

    onInput: function () {
      this.set('value', this.$el.val());
    }
  });

}).call(this);
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
(function () {
  'use strict';

  var Backbone = this.Backbone,
  Bobun = this.Bobun;
  Bobun.UI = Bobun.UI || {};

  Bobun.UI.Modal = Bobun.View.extend({

    className: 'modal',

    events: {
      'hidden': 'remove'
    },

    attributes: {
      'tabindex' : '-1'
    },

    options: {
      title: null,
      buttons: [],
      headerView: null,
      bodyView: null,
      footerView: null
    },

    initialize: function () {
      // header
      this.options.headerView = this.get('headerView') || new Bobun.UI.Modal.Header({
        model: this.model,
        title: this.get('title')
      });

      this.bind(this.get('headerView'), 'title');

      this.views.add(this.get('headerView'));

      // body
      this.options.bodyView = this.get('bodyView') || new Bobun.UI.Modal.Body({
        model: this.model
      });

      this.views.add(this.get('bodyView'));

      // footer
      this.options.footerView = this.get('footerView') || new Bobun.UI.Modal.Footer({
        model: this.model,
        views: this.get('buttons')
      });

      this.bind(this.get('footerView'), {'buttons': 'views'});

      this.views.add(this.get('footerView'));
    },

    modal: function () {
      this.delegateEvents();
      this.$el.modal.apply(this.$el, arguments);
    },

    render: function () {
      return this
      .append(this.get('headerView'))
      .append(this.get('bodyView'))
      .append(this.get('footerView'));
    }
  });

  Bobun.UI.Modal.Header = Bobun.View.extend({

    className: 'modal-header',

    options: {
      title: null,
      closeView: null,
      titleView: null
    },

    initialize: function () {
      // close
      this.options.closeView = this.get('closeView') || new Bobun.View({
        model: this.model,
        el: Backbone.$('<button>')
        .addClass('close')
        .attr('data-dismiss', 'modal')
        .html('&times;')
      });

      this.views.add(this.get('closeView'));

      // title
      this.options.titleView = this.get('titleView') || new Bobun.UI.Modal.Header.Title({
        model: this.model,
        title: this.get('title')
      });

      this.bind(this.get('titleView'), 'title');

      this.views.add(this.get('titleView'));
    },

    render: function () {
      return this
      .append(this.get('closeView'))
      .append(this.get('titleView'));
    }
  });

  Bobun.UI.Modal.Header.Title = Bobun.View.extend({

    tagName: 'h3',

    options: {
      title: null
    },

    initialize: function () {
      this.on('change:title', this.update);
    },

    render: function () {
      this.$el.html(this.get('title'));
      return this;
    }
  });

  Bobun.UI.Modal.Body = Bobun.View.extend({

    className: 'modal-body'
  });

  Bobun.UI.Modal.Footer = Bobun.View.extend({

    className: 'modal-footer',

    render: function () {
      this.views.each(function (view) {
        this.append(view);
      }, this);
      return this;
    }
  });

}).call(this);

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