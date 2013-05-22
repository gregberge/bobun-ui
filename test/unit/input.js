/*jshint undef:false, expr:true, strict:false */
var expect = chai.expect;

describe('Bobun.UI.Input', function () {
  var input;

  beforeEach(function () {
    input = new Bobun.UI.Input();
  });

  afterEach(function () {
    input.remove();
  });

  describe('#options', function () {
    it('#value', function () {
      input = new Bobun.UI.Input({
        value: 'test'
      });

      $('body').append(input.render().el);

      expect(input.$el).to.have.value('test');

      // set
      input.set('value', 'test2');
      expect(input.$el).to.have.value('test2');

      // set on element
      input.$el.val('test3').trigger('input');
      expect(input.get('value')).to.equal('test3');
    });

    it('#disabled', function () {
      input = new Bobun.UI.Button({
        disabled: true
      });

      $('body').append(input.render().el);

      expect($('.btn')).to.have.attr('disabled', 'disabled');

      // set
      input.set('disabled', false);
      expect(input.$el).to.not.have.attr('disabled');
    });
  });

  describe('#events', function () {
    var events = [
      'click', 'change', 'input', 'keydown', 'keyup', 'keypress', 'dragstart',
      'dragenter', 'dragover', 'dragleave', 'dragend', 'drop'
    ];

    it(_.map(events, function (event) { return '#' + event; }).join(', '), function () {
      var spy = sinon.spy();

      _.each(events, function (event) { input.on('$' + event, spy); });

      $('body').append(input.render().el);

      _.each(events, _.bind(input.$el.trigger, input.$el));

      expect(spy.callCount).to.equal(events.length);
    });
  });
});