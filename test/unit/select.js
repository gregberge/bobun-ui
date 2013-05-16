/*jshint undef:false, expr:true, strict:false */
var expect = chai.expect;

describe('Bobun.UI.Input', function () {
  var select;

  beforeEach(function () {
    select = new Bobun.UI.Select();
  });

  afterEach(function () {
    select.remove();
  });

  describe('#options', function () {
    describe('#choices', function () {

      it('should accept a simple array', function () {
        select = new Bobun.UI.Select({
          choices: [
            'test1',
            'test2'
          ]
        });

        $('body').append(select.render().el);

        expect(select.$el.find('option').length).to.equal(2);
        expect(select.$el.find('option').eq(0)).to.have.text('test1');
        expect(select.$el.find('option').eq(0)).to.have.attr('value', '0');
        expect(select.$el.find('option').eq(1)).to.have.text('test2');
        expect(select.$el.find('option').eq(1)).to.have.attr('value', '1');

        select.set('choices', ['test3']);

        expect(select.$el.find('option').length).to.equal(1);
        expect(select.$el.find('option').eq(0)).to.have.text('test3');
        expect(select.$el.find('option').eq(0)).to.have.attr('value', '0');
      });

      it('should accept a hash', function () {
        select = new Bobun.UI.Select({
          choices: {
            'value1': 'label1'
          }
        });

        $('body').append(select.render().el);

        expect(select.$el.find('option').length).to.equal(1);
        expect(select.$el.find('option').eq(0)).to.have.text('label1');
        expect(select.$el.find('option').eq(0)).to.have.attr('value', 'value1');
      });
    });

    it('#disabled', function () {
      select = new Bobun.UI.Select({
        disabled: true
      });

      $('body').append(select.render().el);

      expect(select.$el).to.have.attr('disabled', 'disabled');

      // set
      select.set('disabled', false);
      expect(select.$el).to.not.have.attr('disabled');
    });

    describe('#value', function () {

      it('should select the choice corresponding to the value', function () {
        select = new Bobun.UI.Select({
          choices: ['test1', 'test2'],
          value: 1
        });

        $('body').append(select.render().el);

        expect(select.$el.val()).to.equal('1');

        // two way binding
        select.$el.val(0).change();

        expect(select.get('value')).to.be.equal('0');
      });

      it('should take the first value of choice if no value given', function () {
        select = new Bobun.UI.Select({
          choices: {'foo': 'bar'}
        });

        $('body').append(select.render().el);

        expect(select.get('value')).to.equal('foo');
      });
    });
  });

  describe('#events', function () {

    it('#change', function () {
      var spy = sinon.spy();

      select.on('$change', spy);

      $('body').append(select.render().el);

      select.$el.trigger('change');

      expect(spy.called).to.be.true;
    });
  });
});