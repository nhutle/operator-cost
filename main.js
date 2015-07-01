var argv = require('optimist').argv;
var HashMap = require('hashmap');

var dialNum = argv.dialNum || '';
var operatorA = new HashMap();
var operatorB = new HashMap();

var result;

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

dialNum = dialNum.toString().split('');

var main = {};

main.calFee = function(operatorA, operatorB, dialNum) {
  var result = {},
    packages = [operatorA, operatorB];

  for (var i = 0, j = packages.length; i < j; i++) {
    for (var k = 1, l = dialNum.length; k <= l; k++) {
      var prefix = dialNum.join('').substring(0, k);

      if (packages[i].get(prefix) !== undefined) {
        packages[i].set('cost', packages[i].get(prefix));
      }
    }
  }

  if (operatorA.get('cost') === undefined && operatorB.get('cost') === undefined)
    return;

  if (operatorA.get('cost') < operatorB.get('cost')) {
    result.optName = 'operatorA',
    result.cost = operatorA.get('cost');
  } else {
    result.optName = 'operatorB',
    result.cost = operatorB.get('cost');
  }

  return result;
};

result = main.calFee(operatorA, operatorB, dialNum);

console.log('---Cheapest operator for dialed number: ' + dialNum.join('').toString() + '---');
if (result) {
  console.log('---' + result.optName + ' with the cost is: ' + result.cost + '---');
} else {
  console.log('Sorry, there is no operator offering this prefix number');
}

module.exports = main;