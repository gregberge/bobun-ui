/*jshint undef:false, expr:true, strict:false */
var expect = chai.expect;

describe('Bobun.UI.Modal', function () {
  var modalView;

  beforeEach(function () {
    modalView = new Bobun.UI.Modal();
  });

  afterEach(function () {
    modalView.remove();
  });

  describe('#options', function () {
    it('#title', function () {
      modalView = new Bobun.UI.Modal({
        title: 'test'
      });

      modalView.render().modal();

      expect(modalView.$el.find('.modal-header h3')).to.have.text('test');
    });

    it('#buttons', function () {
      modalView = new Bobun.UI.Modal({
        buttons: [new Backbone.View({
          el: $('<div>hello</div>')
        })]
      });

      modalView.render().modal();

      expect(modalView.$el.find('.modal-footer div')).to.have.text('hello');
    });
  });

  describe('#modal', function () {
    it('should show the modal', function () {
      modalView.render().modal();

      expect(modalView.$el).to.exist;
      expect(modalView.$el.find('.modal-header')).to.exist;
      expect(modalView.$el.find('.modal-body')).to.exist;
      expect(modalView.$el.find('.modal-footer')).to.exist;
    });
  });

  it('should remove the view when hide the modal', function () {
    modalView.remove = sinon.spy();
    modalView.render().modal();
    modalView.render().modal('hide');

    expect(modalView.remove.called).to.be.true;
  });
});