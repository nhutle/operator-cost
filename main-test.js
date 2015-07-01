var expect = require('chai').expect;
var main = require('./main');
var HashMap = require('hashmap');

describe('--- CALCULATOR COST ---', function() {
  var operatorA = new HashMap(),
    operatorB = new HashMap();

  beforeEach(function(done) {
    operatorA.set('1', 0.9);
    operatorA.set('268', 5.1);
    operatorA.set('46', 0.17);
    operatorA.set('4620', 0.0);
    operatorA.set('468', 0.15);
    operatorA.set('4631', 0.15);
    operatorA.set('4673', 0.9);
    operatorA.set('46732', 1.1);

    operatorB.set('1', 0.92);
    operatorB.set('44', 0.5);
    operatorB.set('46', 0.0);
    operatorB.set('463', 1.0);
    operatorB.set('48', 1.2);

    done();
  });

  afterEach(function(done) {
    operatorA.remove('cost');
    operatorB.remove('cost');

    done();
  });

  it('should return an object pointing out that operatorA is cheaper', function(done) {
    var result,
        dialNum = 4631;

    dialNum = dialNum.toString().split('');
    result = main.calFee(operatorA, operatorB, dialNum);

    expect(result.optName).to.be.equal('operatorA');
    expect(result.cost).to.be.equal(0.15);

    done();
  });

  it('should return null because no operator offers this number', function(done) {
    var result,
        dialNum = 046;

    dialNum = dialNum.toString().split('');
    result = main.calFee(operatorA, operatorB, dialNum);

    expect(result).to.be.equal(undefined);

    done();
  });
});