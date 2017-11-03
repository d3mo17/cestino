cartTest(require('../../src/Cart'), require('../../src/BasicCartService'));

function cartTest (Cart, Repo) {
    "use strict";
	
    var cart = Cart.create(),
        genProducts = [],
        positionIDs = [],
        actionsMap = {
            lastAddedPositionID: false,
            lastChangedPositionID: false,
            lastRemovedPositionID: false
        },
        testObject4JSON = {
            date: new Date(),
            AutoPosId: 3,
            pos: {
                test: [
                    {id:"p1",
                     product:{id: 3},
                     quantity:{amount:4,dimX:1,dimY:1,dimZ:1},
                     features:[]},
                    {id:"p2",
                     product:{id: 42},
                     quantity:{amount:1,dimX:1,dimY:1,dimZ:1},
                     features:[]}
                ]
            }
        };
	
	describe('A shopping-cart', function () {
        it('trying to create products', function () {
            expect(function () { Cart.createProduct(); }).toThrowError(Error);
            expect(function () { Cart.createProduct(''); }).toThrowError(Error);
            expect(function () { Cart.createProduct(42, '', 3); }).toThrowError(RangeError);
            expect(function () { Cart.createProduct(42, 'Test', -4); }).toThrowError(TypeError);
            expect(function () {
                genProducts.push(Cart.createProduct(42, 'TestProduct', 499));
                genProducts.push(Cart.createProduct(7, 'TestProduct2', 599));
                genProducts.push(Cart.createProduct(3, 'TestProduct3', 60));
                genProducts.push(Cart.createProduct(19, 'TestProduct4', 656));
            }).not.toThrowError(Error);
        });

        it('trying to add listeners', function () {
            expect(function () { cart.on(); }).toThrowError(TypeError);
            expect(function () { cart.on(''); }).toThrowError(TypeError);
            expect(function () { cart.on(12); }).toThrowError(TypeError);
            expect(function () { cart.on('test', function () {}); }).toThrowError(TypeError);
            expect(function () { cart.on('', function () {}); }).toThrowError(TypeError);
            expect(function () { cart.on(12, function () {}); }).toThrowError(TypeError);
            expect(function () { cart.on('add', function () {}); }).not.toThrowError(Error);
        });

		it('adding a first product', function () {
            expect(function () {
                cart.on('add', function (oPosition) {
                    actionsMap.lastAddedPositionID = oPosition.id;
                });
            }).not.toThrowError(Error);
            expect(actionsMap.lastAddedPositionID).toBe(false);

			positionIDs.push(cart.add(
                genProducts[1],
                Cart.createProductQuantity( 2 )
            ));

            // check whether adding-listener has been invoked
            expect(actionsMap.lastAddedPositionID).toBe('p1');
			
			expect(cart.calculate()).toBe(2*599);
            expect(positionIDs[0]).toBe('p1');
		});

        it('adding some more products', function () {
            expect(function () {
                positionIDs.push(cart.add(genProducts[2]));
                positionIDs.push(cart.add(genProducts[3], Cart.createProductQuantity(2, 5)));
            }).not.toThrow();

            // check whether adding-listener has been invoked
            expect(actionsMap.lastAddedPositionID).toBe('p3');

			expect(cart.calculate()
            ).toBe(2*599+60+656*2*5);
            expect(positionIDs.join('')).toBe(['p1','p2','p3'].join(''));
        });

        it('remove a product', function () {
            expect(function() {
                cart.on('remove', function (oPosition) {
                    actionsMap.lastRemovedPositionID = oPosition.id;
                });
            }).not.toThrowError(Error);
            expect(actionsMap.lastRemovedPositionID).toBe(false);
            cart.deletePosition(positionIDs[1]);
            // check whether removing-listener has been invoked
            expect(actionsMap.lastRemovedPositionID).toBe('p2');
            expect(cart.calculate()).toBe(2*599+656*2*5);
        });

        it('increment amount in cart position', function () {
            expect(function() {
                cart.on('change', function (oPosition) {
                    actionsMap.lastChangedPositionID = oPosition.id;
                });
            }).not.toThrowError(Error);
            cart.getPositionById(positionIDs[2]).incrementAmount();
            expect(cart.calculate()).toBe(2*599+656*3*5);
            cart.getPositionById(positionIDs[2]).incrementAmount(3);
            expect(actionsMap.lastChangedPositionID).toBe('p3');
            expect(cart.calculate()).toBe(2*599+656*6*5);
            cart.getPositionById(positionIDs[0]).decrementAmount();
            expect(actionsMap.lastChangedPositionID).toBe('p1');
            expect(cart.calculate()).toBe(1*599+656*6*5);
            cart.getPositionById(positionIDs[2]).decrementAmount(5);
            expect(cart.calculate()).toBe(1*599+656*1*5);
            expect(actionsMap.lastChangedPositionID).toBe('p3');
        });

        it('replace quantity in cart position', function () {
            cart.getPositionById(positionIDs[0]).replaceQuantity(
                Cart.createProductQuantity(3, 2)
            );
            expect(actionsMap.lastChangedPositionID).toBe('p1');
            expect(cart.calculate()).toBe(3*2*599+656*1*5);
        });

        it('trying to get not existing position', function () {
            expect(function () { cart.getPositionById(positionIDs[1]); })
                .toThrowError(ReferenceError, /^No position with id/);
        });

        it('trying to add a product', function () {
            expect(function () { cart.add(); }).toThrowError(Error);
            expect(function () { cart.add(''); }).toThrowError(Error);
        });

        it('Check json-representation of cart', function () {
            var cartJSON,
                cart = Cart.create();

            cart.add(genProducts[2], 4, 'test');
            cart.add(genProducts[0], 1, 'test');
            
            cartJSON = cart.toJSON();
            testObject4JSON.date = JSON.parse(cartJSON).date;

            expect(cartJSON).toBe(JSON.stringify(testObject4JSON));
        });

        it('Load cart from json', function (done) {
            var options = {url: 'base/test/CartData.json'},
                repo = Repo.create(options),
                cart = Cart.create(repo);

            cart.on('load', function () {
                var i = 0, productTitles = ['Test 1', 'Test 2'];
                expect(cart.calculate()).toBe(456*4+1*333);
                cart.walk(function (position) {
                    expect(position.product.title).toBe(productTitles[i++]);
                });

                done();
            });
            cart.fromJSON(JSON.stringify(testObject4JSON));

            // exit after 3 seconds
            window.setTimeout(function () {
                expect('Cart should be updated').toBe('valid');
                done();
            }, 3000);
        });
	});
}
