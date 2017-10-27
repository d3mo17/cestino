define(
    ['bluebird/js/browser/bluebird.core.min', 'atomicjs/dist/atomic.min'],
    function (Promise, Atomic) {
        describe('Test whether', function () {
            it('lib atomic can be load and used', function (done) {
                Atomic.ajax({url: 'base/test/CartData.json'})
                    .error(fail)
                    .success(function(response) {
                        expect(response).toBe({
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
    });