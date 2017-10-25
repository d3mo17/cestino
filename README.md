# Cestino

A basic shopping cart implementation in javascript.

### Features / Structure / Interface
* Abstract product model
* Flexible service to put master data of products into the cart model
* Positions can be grouped (e. g. by delivery time)
* All price calculations make use of integer values instead of floats
* Possibility to manage quantity and/or dimensions with the positions of products
* Formatting of integer-prices / Integer to custom-format
* Optional to put additional features (with prices) for products in cart-positions
* Test driven with karma
* AMD-, CommonJS and global-support 

### Installation

```shell
    $ npm install cestino
```

### Examples

##### Create a new cart and add a product

```html
<script src="bower_components/cestino/dist/cestino.min.js"></script>

<script>
    var oCart = Cestino.create(),
        // use point as separator for decimal digits
        oFormatter = Cestino.PriceFormatter.create('.');
        
    oCart.add(
                           // id, title,         price
        Cestino.createProduct(42, 'TestProduct', 499),
        Cestino.createProductQuantity(2)
    );
    console.log(oFormatter.format(oCart.calculate()), oCart.toJSON());
</script>
```

##### Use cestino with AMD

```html
<script src="bower_components/requirejs/require.js"></script>

<script>
    require.config({baseUrl:'bower_components'});

    require(['cestino/dist/cestino.min'], function (Cestino) {
        var oCart = Cestino.create(),
            // use comma as separator for decimal digits
            oFormatter = require('cestino/PriceFormatter').create(',');

        oCart.add(
                                // id, title,         price
            Cestino.createProduct(486, 'TestProduct', 499),
            Cestino.createProductQuantity(2)
        );
        oCart.add(Cestino.createProduct(56, 'TestProduct 2', 895));

        console.log(oFormatter.format(oCart.calculate()), oCart.toJSON());
    });
</script>
```

In both examples you see, that the method toJSON() will not include
prices of products. This is because the prices could have been changed
before we use the method fromJSON() to import a structure in an empty
cart. The prices therefore are useless and have to be updated by the
server on import.
Here comes the BasicCartService into play ...

##### Import from JSON and loading masterdata of products into cart

```html
<script src="bower_components/requirejs/require.js"></script>

<script>
    require.config({baseUrl:'bower_components'});

    require(['cestino/dist/cestino.min'], function (Cestino) {
        var oService = require('cestino/BasicCartService')
                            .create({'url':'masterdata.json'}),
            oCart = Cestino.create(oService);

        // import json e. g. fetched from localstorage
        oCart.fromJSON(/* JSON exported by toJSON-method */);
    });
</script>
```

The data that will be send has following format:
```json
{
    "3": [],
   "42": [] 
}
```
It consists of key-value pairs, with product-ids as keys and arrays of
feature-ids as values.

Example how the response data from server has to look like (masterdata.json)
```json
{
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
}
```

### Development

To make changes to the source and redistribute it, make a clone of the
git repository and run bower afterwards.

If you want to distribute your changes in the 'dist'-directory, you have
use gulp:

```shell
    $ gulp distribute
```

### Testing

After installation of required node modules with npm, simply use command:
```shell
    $ npm test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Daniel Moritz

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.