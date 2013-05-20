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

    it('#click, #change, #input, #keydown, #keyup, #keypress', function () {
      var spy = sinon.spy();

      input.on('$click', spy);
      input.on('$change', spy);
      input.on('$input', spy);
      input.on('$keydown', spy);
      input.on('$keyup', spy);
      input.on('$keypress', spy);

      $('body').append(input.render().el);

      input.$el.trigger('click');
      input.$el.trigger('change');
      input.$el.trigger('input');
      input.$el.trigger('keydown');
      input.$el.trigger('keyup');
      input.$el.trigger('keypress');

      expect(spy.callCount).to.equal(6);
    });
  });
});