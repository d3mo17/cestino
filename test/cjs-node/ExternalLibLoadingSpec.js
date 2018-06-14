var Promise = require('bluebird');

describe('Test whether', function () {
    it('lib bluebird can be load and used', function (done) {
        var p = new Promise(function (resolve, reject) {
            resolve();
        });
        p.then(function () {
            done();
        });
    });
});
