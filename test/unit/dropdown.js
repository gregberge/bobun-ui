/*jshint undef:false, expr:true, strict:false */
var expect = chai.expect;

describe('Bobun.UI.Dropdown', function () {
  var dropdownView;

  beforeEach(function () {
    dropdownView = new Bobun.UI.Dropdown();
  });

  afterEach(function () {
    dropdownView.remove();
  });

  describe('#options', function () {
    it('#label', function () {
      dropdownView = new Bobun.UI.Dropdown({
        label: 'test'
      });

      $('body').append(dropdownView.render().el);

      expect(dropdownView.get('buttonView').$el).to.have.text('test');

      // set
      dropdownView.set('label', 'test2');
      expect(dropdownView.get('buttonView').$el).to.have.text('test2');
    });

    it('#buttonView', function () {
      var buttonView = new Bobun.UI.Button({
        label: 'myCustomButton'
      });

      dropdownView = new Bobun.UI.Dropdown({
        buttonView: buttonView
      });

      $('body').append(dropdownView.render().el);

      expect(dropdownView.get('buttonView').$el).to.have.text('myCustomButton');
    });

    it('#disabled', function () {
      dropdownView = new Bobun.UI.Dropdown({
        disabled: true
      });

      $('body').append(dropdownView.render().el);

      expect(dropdownView.get('buttonView').$el).to.have.attr('disabled', 'disabled');

      // set
      dropdownView.set('disabled', false);
      expect(dropdownView.get('buttonView').$el).to.not.have.attr('disabled', 'disabled');
    });

    describe('#choices', function () {

      it('should accept choice view', function () {
        dropdownView = new Bobun.UI.Dropdown({
          choices: [
            new Bobun.UI.Dropdown.Choice({
              label: 'choice1',
              link: '/choice1'
            }),
            new Bobun.UI.Dropdown.Choice({
              label: 'choice2',
              link: '/choice2'
            })
          ]
        });

        $('body').append(dropdownView.render().el);

        expect($('.dropdown-menu li').length).to.be.equal(2);
        expect($('.dropdown-menu li').eq(0).text()).to.be.equal('choice1');
        expect($('.dropdown-menu li').eq(0).find('a').attr('href')).to.be.equal('/choice1');
        expect($('.dropdown-menu li').eq(1).text()).to.be.equal('choice2');
        expect($('.dropdown-menu li').eq(1).find('a').attr('href')).to.be.equal('/choice2');
      });

      it('should accept a simple hash', function () {
        dropdownView = new Bobun.UI.Dropdown({
          choices: [
            {
              label: 'choice1',
              link: '/choice1'
            },
            {
              label: 'choice2',
              link: '/choice2'
            }
          ]
        });

        $('body').append(dropdownView.render().el);

        expect($('.dropdown-menu li').length).to.be.equal(2);
        expect($('.dropdown-menu li').eq(0).text()).to.be.equal('choice1');
        expect($('.dropdown-menu li').eq(0).find('a').attr('href')).to.be.equal('/choice1');
        expect($('.dropdown-menu li').eq(1).text()).to.be.equal('choice2');
        expect($('.dropdown-menu li').eq(1).find('a').attr('href')).to.be.equal('/choice2');

        dropdownView.set('choices', [
            {
              label: 'choice3',
              link: '/choice3'
            }
          ]);

        expect($('.dropdown-menu li').length).to.be.equal(1);
      });
    });
  });

  describe('#events', function () {
    it('#click:choice', function () {
      var spy = sinon.spy();

      dropdownView = new Bobun.UI.Dropdown({
          choices: [
            {
              label: 'choice',
              link: '#choice'
            }
          ]
        });

      dropdownView.on('click:choice', spy);

      $('body').append(dropdownView.render().el);

      $('li a').eq(0).click();

      expect(spy.called).to.be.true;
    });
  });
});