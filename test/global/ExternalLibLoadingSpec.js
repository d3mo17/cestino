describe('Test whether', function () {
    var Atomic = atomic;

    it('lib atomic can be used from global scope', function (done) {
        Atomic.ajax({url: 'base/test/CartData.json'})
            .error(done.fail)
            .success(function(response) {
                expect(response).toEqual({
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
