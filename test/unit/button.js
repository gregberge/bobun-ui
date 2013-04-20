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

  it('should accept option "label"', function () {
    buttonView = new Bobun.UI.Button({
      label: 'test'
    });

    $('body').append(buttonView.render().el);

    expect($('.btn')).to.have.text('test');
  });

  it('should accept option "disabled"', function () {
    buttonView = new Bobun.UI.Button({
      disabled: true
    });

    $('body').append(buttonView.render().el);

    expect($('.btn')).to.have.attr('disabled', 'disabled');
  });

  describe('on click', function () {

    it('should trigger a "click" event', function () {
      var spy = sinon.spy();

      buttonView.on('click', spy);

      $('body').append(buttonView.render().el);

      $('.btn').click();

      expect(spy.called).to.be.true;
    });
  });
});