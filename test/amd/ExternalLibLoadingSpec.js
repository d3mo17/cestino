define(
    ['atomicjs/dist/atomic.min'],
    function (Atomic) {
        describe('Test whether', function () {
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
        });
    });