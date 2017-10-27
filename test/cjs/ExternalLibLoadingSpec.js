var Atomic = require('atomicjs'),
    Promise = require('bluebird');

describe('Test whether', function () {
    it('lib atomic can be load but not used', function (done) {
        var undef = Atomic.ajax({url: '../CartData.json'});
        if (typeof undef === 'undefined') {
            done();
        }
    });
    it('lib bluebird can be load and used', function (done) {
        var p = new Promise(function (resolve, reject) {
            resolve();
        });
        p.then(function () {
            done();
        });
    });
});
