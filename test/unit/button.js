/*jshint undef:false, expr:true, strict:false */
var expect = chai.expect;

describe('Bobun.UI.Button', function () {
  var buttonView;

  beforeEach(function () {
    buttonView = new Bobun.UI.Button();
  });

  afterEach(function () {
    buttonView.remove();
  });

  describe('#options', function () {
    it('#label', function () {
      buttonView = new Bobun.UI.Button({
        label: 'test'
      });

      $('body').append(buttonView.render().el);

      expect(buttonView.$el).to.have.text('test');

      // set
      buttonView.set('label', 'test2');
      expect(buttonView.$el).to.have.text('test2');
    });

    it('#disabled', function () {
      buttonView = new Bobun.UI.Button({
        disabled: true
      });

      $('body').append(buttonView.render().el);

      expect(buttonView.$el).to.have.attr('disabled', 'disabled');

      // set
      buttonView.set('disabled', false);
      expect(buttonView.$el).to.not.have.attr('disabled');
    });
  });

  describe('#events', function () {

    it('#click', function () {
      var spy = sinon.spy();

      buttonView.on('$click', spy);

      $('body').append(buttonView.render().el);

      buttonView.$el.click();

      expect(spy.called).to.be.true;
    });
  });
});