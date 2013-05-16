/*jshint undef:false, expr:true, strict:false */
var expect = chai.expect;

describe('Bobun.UI.Label', function () {
  var labelView;

  beforeEach(function () {
    labelView = new Bobun.UI.Label();
  });

  afterEach(function () {
    labelView.remove();
  });

  describe('#options', function () {
    it('#label', function () {
      labelView = new Bobun.UI.Label({
        label: 'test'
      });

      $('body').append(labelView.render().el);

      expect(labelView.$el).to.have.text('test');

      // set
      labelView.set('label', 'test2');
      expect(labelView.$el).to.have.text('test2');
    });
  });

  describe('#events', function () {

    it('#click', function () {
      var spy = sinon.spy();

      labelView.on('$click', spy);

      $('body').append(labelView.render().el);

      labelView.$el.trigger('click');

      expect(spy.called).to.be.true;
    });
  });
});