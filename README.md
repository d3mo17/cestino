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
    $ bower install cestino --save
```

### Example

##### Create a new cart and add a product

```html
<script src="js/cestino/dist/cestino.min.js"></script>

<script>
    var oCart = root.Cestino.create();
    oCart.add(
                                // id, title,         price
        root.Cestino.createProduct(42, 'TestProduct', 499),
        root.Cestino.createProductQuantity(2)
    );
</script>
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