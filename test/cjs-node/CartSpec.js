var Cestino = require('../../src/Cart');

describe('Testing CommonJS', function () {
    it('executes', function () {
        var cartJSON,
            oCart = Cestino.create(),
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
            
        oCart.add(
                            // id, title,         price
            Cestino.Product.create(3, 'TestProduct 1', 195),
            Cestino.ProductQuantity.create(4),
            'test'
        );
        oCart.add(
            Cestino.Product.create(42, 'TestProduct 2', 499),
            Cestino.ProductQuantity.create(1),
            'test'
        );

        cartJSON = oCart.toJSON();
        testObject4JSON.date = JSON.parse(cartJSON).date;

        expect(cartJSON).toBe(JSON.stringify(testObject4JSON));
    });
});