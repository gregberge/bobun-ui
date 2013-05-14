/*jshint undef:false, expr:true, strict:false */
var expect = chai.expect;

describe('Bobun.UI.Input', function () {
  var inputView;

  beforeEach(function () {
    inputView = new Bobun.UI.Input();
  });

  afterEach(function () {
    inputView.remove();
  });

  describe('#options', function () {
    it('#value', function () {
      inputView = new Bobun.UI.Input({
        value: 'test'
      });

      $('body').append(inputView.render().el);

      expect(inputView.$el).to.have.value('test');

      // set
      inputView.set('value', 'test2');
      expect(inputView.$el).to.have.value('test2');

      // set on element
      inputView.$el.val('test3');
      expect(inputView.$el).to.have.value('test3');
    });

    it('#disabled', function () {
      inputView = new Bobun.UI.Button({
        disabled: true
      });

      $('body').append(inputView.render().el);

      expect($('.btn')).to.have.attr('disabled', 'disabled');

      // set
      inputView.set('disabled', false);
      expect(inputView.$el).to.not.have.attr('disabled');
    });
  });

  describe('#events', function () {

    it('#click, #change, #input, #keydown, #keyup, #keypress', function () {
      var spy = sinon.spy();

      inputView.on('click', spy);
      inputView.on('change', spy);
      inputView.on('input', spy);
      inputView.on('keydown', spy);
      inputView.on('keyup', spy);
      inputView.on('keypress', spy);

      $('body').append(inputView.render().el);

      inputView.$el.trigger('click');
      inputView.$el.trigger('change');
      inputView.$el.trigger('input');
      inputView.$el.trigger('keydown');
      inputView.$el.trigger('keyup');
      inputView.$el.trigger('keypress');

      expect(spy.callCount).to.equal(7);
    });
  });
});