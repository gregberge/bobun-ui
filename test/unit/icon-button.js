/*jshint undef:false, expr:true, strict:false */
var expect = chai.expect;

describe('Bobun.UI.IconButton', function () {
  var iconButtonView;

  beforeEach(function () {
    iconButtonView = new Bobun.UI.IconButton();
  });

  afterEach(function () {
    iconButtonView.remove();
  });

  describe('#options', function () {
    it('#label', function () {
      // init
      iconButtonView = new Bobun.UI.IconButton({label: 'test'});
      $('body').append(iconButtonView.render().el);
      expect(iconButtonView.$el).to.have.text('test');

      // set
      iconButtonView.set('label', 'test2');
      expect(iconButtonView.$el).to.have.text('test2');
    });

    it('#disabled', function () {
      // init
      iconButtonView = new Bobun.UI.IconButton({disabled: true});
      $('body').append(iconButtonView.render().el);
      expect(iconButtonView.$el).to.have.attr('disabled', 'disabled');

      // set
      iconButtonView.set('disabled', false);
      expect(iconButtonView.$el).to.not.have.attr('disabled');
    });

    it('#processing', function () {
      // init
      iconButtonView = new Bobun.UI.IconButton({processing: true});
      $('body').append(iconButtonView.render().el);
      expect(iconButtonView.$el).to.have.attr('disabled', 'disabled');
      expect(iconButtonView.$el.find('i')).to.have.class('icon-spin');

      // set
      iconButtonView.set('processing', false);
      expect(iconButtonView.$el).to.not.have.attr('disabled');
      expect(iconButtonView.$el.find('i')).to.not.have.class('icon-spin');
    });

    it('#processing must toggle class correctly', function () {
      // init
      iconButtonView = new Bobun.UI.IconButton({
        processing: true,
        processingIconClassName: 'processing',
        defaultIconClassName: 'std'
      });
      $('body').append(iconButtonView.render().el);
      expect(iconButtonView.$el).to.have.attr('disabled', 'disabled');
      expect(iconButtonView.$el.find('i')).to.have.class('processing');
      expect(iconButtonView.$el.find('i')).to.not.have.class('std');

      // set
      iconButtonView.set('processing', false);
      expect(iconButtonView.$el.find('i')).to.not.have.class('processing');
      expect(iconButtonView.$el.find('i')).to.have.class('std');
    });

    it('#defaultIconClassName', function () {
      // init
      iconButtonView = new Bobun.UI.IconButton({defaultIconClassName: 'test'});
      $('body').append(iconButtonView.render().el);
      expect(iconButtonView.$el.find('i')).to.have.class('test');

      // set
      iconButtonView.set('defaultIconClassName', 'test2');
      expect(iconButtonView.$el.find('i')).to.have.class('test2');
    });

    it('#processingIconClassName', function () {
      // init
      iconButtonView = new Bobun.UI.IconButton({
        processingIconClassName: 'test',
        processing: true
      });
      $('body').append(iconButtonView.render().el);
      expect(iconButtonView.$el.find('i')).to.have.class('test');

      // set
      iconButtonView.set('processingIconClassName', 'test2');
      expect(iconButtonView.$el.find('i')).to.have.class('test2');
    });
  });

  describe('#events', function () {

    it('#click', function () {
      var spy = sinon.spy();

      iconButtonView.on('$click', spy);

      $('body').append(iconButtonView.render().el);

      iconButtonView.$el.click();

      expect(spy.called).to.be.true;
    });
  });
});