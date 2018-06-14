describe('Test whether', function () {
    var Atomic = require('../../node_modules/atomic/dist/atomic.min'),
        Promise = require('../../node_modules/bluebird/js/browser/bluebird.min');

    it('lib atomic can be load and used', function (done) {
        Atomic('base/test/CartData.json')
            .catch(done.fail)
            .then(function(response) {
                expect(response.data).toEqual({
                    "3": {
                        "title": "Test 1",
                        "price": 456,
                        "features": []
                    },
                    "42": {
                        "title": "Test 2",
                        "price": 333,
                        "features": []
                    }
                });
                done();
            });
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
