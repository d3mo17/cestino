/**
 * Requirements: IE9+
 *
 * @param   {Object} root
 * @param   {Function} factory
 *
 * @returns {Object}
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(
            'cestino/BasicCartService',['bluebird/js/browser/bluebird.min', 'atomicjs/dist/atomic.min'],
            factory
        );
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('bluebird'), require('atomicjs'));
    } else {
        root.Cestino = root.Cestino || {};
        root.Cestino.BasicCartService = factory(root.Promise, root.atomic);
    }
}(this, function (Promise, Atomic) {
    "use strict";

    /** @default */
    var defaults = {
        url: ''
    };

    /**
     * Fetch masterdata from an external resource and put it to the cart model.
     * 
     * @module   Cestino/BasicCartService
     * @requires bluebird
     * @requires atomicjs
     */


    /**
     * BasicCartService-API
     */
    BasicCartService.prototype = {
        setProductDataToCart: _setProductDataToCart
    };


    /**
     * Service used to fetch and put master data of products into the model.
     *
     * @constructor
     * @private
     * @global
     * @param   {Object} options
     * @borrows <anonymous>~_setProductDataToCart as setProductDataToCart
     */
    function BasicCartService(options) {
        var attr;
        
        // clone defaults ... (Does only work with plain objects, don't use it e. g. to clone
        // Date-object values)
        /** @member {Object} */
        this.options = JSON.parse(JSON.stringify(defaults));
        for (attr in options) {
            this.options[attr] = options[attr];
        }
    }

        /**
         * Merges object-data in the shopping cart.
         * 
         * @param   {Object} data
         * @param   {Cart} oCart
         * @returns {undefined}
         * @private
         */
        function _mergeDataInCart(data, oCart) {
            oCart.walk(function (oPosition) {
                var product, deletedFeatures = [], del;

                if (! (oPosition.product.id in data)) {
                    oCart.deletePosition(oPosition.id);
                    return;
                }

                product = data[oPosition.product.id];

                oPosition.product.title = product.title;
                oPosition.product.price = product.price;
                oPosition.features.forEach(function (oFeature, idx) {
                    if (! (oFeature.id in product.features)) {
                        deletedFeatures.push(idx);
                        return; // continue
                    }

                    oFeature.label = product.features[oFeature.id].label;
                    oFeature.price = product.features[oFeature.id].price;
                });

                del = deletedFeatures.pop();
                while (del) {
                    oPosition.features.splice(del, 1)[0];
                    del = deletedFeatures.pop();
                }
            });
        }

        /**
         * Updates the cart with actual valid information about products.
         *
         * @method  BasicCartService#setProductDataToCart
         * @param   {Cart} oCart
         * @returns {Promise}
         * @public
         */
        function _setProductDataToCart(oCart) {
            var that = this, data = {};

            oCart.walk(function (oPosition) {
                data[oPosition.product.id] = oPosition.features.map(function (oFeature) {
                    return oFeature.id;
                });
            });

            return new Promise(function (resolve, reject) {
                Atomic.ajax({url: that.options.url, type: 'POST', data: data})
                    .error(reject)
                    .success(function(response) {
                        _mergeDataInCart.call(that, response, oCart);
                        resolve(response);
                    });
            });
        }

    // Module-API
    return {
        /**
         * Creates an object to load masterdata from a server.
         * 
         * @alias   module:Cestino/BasicCartService.create
         * @param   {Object} options
         * @returns {BasicCartService}
         */
        create: function (options) {
            return new BasicCartService(options);
        }
    };
}));

/**
 * @param   {Object} root
 * @param   {Function} factory
 *
 * @returns {Object}
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('cestino/Util',factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Cestino = root.Cestino || {};
        root.Cestino.Util = factory();
    }
}(this, function () {
    "use strict";

    var moduleAPI;

    /**
     * Is passed data of type Integer?
     *
     * @public
     * @param   {*} n
     * @returns {Boolean}
     */
    function _isInt(n) {
        return n === +n && n === (n|0);
    }

    /**
     * Is passed data empty?
     *
     * @public
     * @param   {*} val
     * @returns {Boolean}
     */
    function _isEmpty(val) {
        return ! val || val === '0';
    }

    /**
     * Pad a string on left side to a certain length with another string.
     *
     * @public
     * @param   {String} str
     * @param   {Integer} width
     * @param   {String} padStr
     * @returns {String}
     */
    function _lpad(str, width, padStr) {
        var padding;

        if (! _isInt(width)) {
            throw new TypeError('Parameter width has to be an int!');
        }

        str = str + '';
        if (str.length >= width) {
            return str;
        }

        padStr = padStr || '0';
        padStr = padStr + '';

        padding = new Array(Math.ceil((width - str.length) / padStr.length) + 1).join(padStr);
        return padding.slice(0, width - str.length) + str;
    }

    /**
     * Utilities used to check and modify basic data types.
     * 
     * @module Cestino/Util
     * @borrows <anonymous>~_isInt as isInt
     * @borrows <anonymous>~_isEmpty as isEmpty
     * @borrows <anonymous>~_lpad as lpad
     */
    moduleAPI = {
        isInt: _isInt,
        isEmpty: _isEmpty,
        lpad: _lpad
    };

    return moduleAPI;
}));

/**
 * Requirements: IE9+
 *
 * @param   {Object} root
 * @param   {Function} factory
 *
 * @returns {Object}
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('cestino/PriceFormatter',['cestino/Util'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./Util'));
    } else {
        root.Cestino = root.Cestino || {};
        root.Cestino.PriceFormatter = factory(root.Cestino.Util);
    }
}(this, function (Util) {
    "use strict";

    /**
     * Formatting integers to decimal currency representation.
     * 
     * @module Cestino/PriceFormatter
     * @requires Cestino/Util
     */

    /**
     * Creates an object to convert integer price to decimal price (e. g. cents to dollar/euro).
     * 
     * @constructor
     * @private
     * @global
     * @param   {String} decimalSeperator
     * @param   {String} thousandsSeperator
     * @param   {Integer} decimalCount
     * @borrows <anonymous>~_format as format
     */
    function PriceFormatter(decimalSeperator, thousandsSeperator, decimalCount) {
        decimalCount = decimalCount || 2;
        thousandsSeperator = thousandsSeperator || '';
        if ([2,3].indexOf(decimalCount) === -1) {
            throw new RangeError('The decimal count has to be 2 or 3!');
        }
        if (['.',',','٫'].indexOf(decimalSeperator) === -1) {
            throw new RangeError(
                ['"', decimalSeperator, '" is not a typical decimal seperator'].join('')
            );
        }

        /** @member {Integer} */
        this.decimalCount = decimalCount;
        /** @member {String} */
        this.thousandsSeperator = thousandsSeperator;
        /** @member {String} */
        this.decimalSeperator = decimalSeperator;
    }

    /**
     * @param   {String} str
     * @param   {Integer} size
     *
     * @returns {Array}
     * @private
     */
    function _chunks(str, size) {
        var str = str + '', numChunks, firstSize, chunks;

        if (! Util.isInt(size)) {
            throw new TypeError('Parameter size has to be an Int!');
        }

        numChunks = Math.ceil(str.length / size);
        firstSize = str.length % size || size;
        chunks = new Array(numChunks);

        while(--numChunks > 0) {
            chunks[numChunks] = str.substr((numChunks-1)*size+firstSize, size);
        }
        chunks[0] = str.substr(0, firstSize);

        return chunks;
    }

    /**
     * Converts the passed integer value into configured format.
     *
     * @param   {Integer} int
     *
     * @returns {String}
     * @private
     */
    function _format(int) {
        var currencyValue;

        if (! Util.isInt(int)) {
            throw new TypeError('Parameter int has to be an Int!');
        }

        currencyValue = parseInt((int + '').slice(0, this.decimalCount * -1));

        return [
            _chunks(currencyValue, 3).join(this.thousandsSeperator),
            this.decimalSeperator,
            Util.lpad(int % Math.pow(10, this.decimalCount), this.decimalCount)
        ].join('');
    }

    // PriceFormatter-API
    PriceFormatter.prototype = {
        format: _format
    };

    // Module-API
	return {
        /**
         * Creates an object to convert integer price to decimal price (e. g. cents to dollar/euro).
         * 
         * @alias   module:Cestino/PriceFormatter.create
         * @param   {String} decimalSeperator
         * @param   {String} thousandsSeperator
         * @param   {Number} decimalCount
         * @returns {PriceFormatter}
         */
        create: function (decimalSeperator, thousandsSeperator, decimalCount) {
            return new PriceFormatter(decimalSeperator, thousandsSeperator, decimalCount);
        }
    };
}));

/**
 * Requirements: IE9+
 * 
 * @param   {Object} root
 * @param   {Function} factory
 *
 * @returns {Object}
 */
(function (root, factory) {
    var i, helperRef;

    if (typeof define === 'function' && define.amd) {
        define(
            'cestino/Cart',['cestino/Util', 'cestino/BasicCartService', 'cestino/PriceFormatter'],
            factory
        );
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(
            require('./Util'), require('./BasicCartService'), require('./PriceFormatter')
        );
    } else {
        root.Cestino = factory(
            root.Cestino.Util, root.Cestino.BasicCartService, root.Cestino.PriceFormatter
        );
    }
}(this, function (Util, BasicCartService, PriceFormatter) {
    "use strict";

    /**
     * A basic shopping cart implementation in javascript.
     * @module Cestino
     * @requires Cestino/BasicCartService
     * @requires Cestino/PriceFormatter
     * @requires Cestino/Util
     */

    /**
     * Callback that will be fired, if registered and the cart has been load from json.
     * @callback module:Cestino~loadCallback
     * @param {Cart} cart
     * @abstract
     */
    /**
     * Callback that will be fired, if registered and a product has been add to cart.
     * @callback module:Cestino~addProductCallback
     * @param {CartPosition} position
     * @abstract
     */
    /**
     * Callback that will be fired, if registered and a product has been removed from cart.
     * @callback module:Cestino~removeProductCallback
     * @param {CartPosition} position
     * @abstract
     */
    /**
     * Callback that will be fired, if registered and a product-position in cart has been
     * changed.
     * @callback module:Cestino~changePositionCallback
     * @param {CartPosition} position
     * @abstract
     */

    var INCOMPLETE_MARKER = '__INCOMPLETE__',
        availableEvents = ['load', 'add', 'change', 'remove'];

    /**
     * Cart-API
     */
    Cart.prototype = {
        add:                 _addProduct, /* Params: oProduct, oQuantity, sShippingGroup, aProductFeatures */
        on:                  _on, /* Params: kind, fnListener */
        off:                 _off, /* Params: kind, fnListener */
        calculateGroup:      _calculateGroup, /* Params: sShippingGroup */
        calculate:           _calculate, /* no params */
        deletePosition:      _deletePosition, /* Params: sIdCartPosition */
        getPositionsOfGroup: _getPositionsOfGroup, /* Params: sShippingGroup */
        getShippingGroups:   _getGroups,
        getPositionById:     _getPositionById, /* Params: sIdCartPosition */
        toJSON:              _toJSON,
        fromJSON:            _fromJSON,
        walk:                _walk /* Params: fnCallback */
    };

        // CartPosition-API
        CartPosition.prototype = {
            calculate: _calculateCartPosition,
            incrementAmount: _incrementAmount, /* Params: amount */
            decrementAmount: _decrementAmount, /* Params: amount */
            replaceQuantity: _replaceQuantity /* Params: amount */
        };


    /**
     * Class to manage a shopping cart. The cart only supports
     * product-positions separated in shipping-groups. The prices were
     * handled without tax.
     * You have to implement prices for shipping and for payment on your
     * own.
     *
     * @constructor
     * @global
     * @private
     * @param {Object} oService
     * @borrows <anonymous>~_addProduct as add
     * @borrows <anonymous>~_on as on
     * @borrows <anonymous>~_off as off
     * @borrows <anonymous>~_calculateGroup as calculateGroup
     * @borrows <anonymous>~_calculate as calculate
     * @borrows <anonymous>~_deletePosition as deletePosition
     * @borrows <anonymous>~_getPositionsOfGroup as getPositionsOfGroup
     * @borrows <anonymous>~_getGroups as getShippingGroups
     * @borrows <anonymous>~_getPositionById as getPositionById
     * @borrows <anonymous>~_toJSON as toJSON
     * @borrows <anonymous>~_fromJSON as fromJSON
     * @borrows <anonymous>~_walk as walk
     */
    function Cart(oService) {
        oService = oService || BasicCartService.create();
        if (typeof oService['setProductDataToCart'] !== 'function') {
            throw new TypeError([
                'The service has to be able to find Products! ', "\n",
                'Implement a function named "setProductDataToCart" that takes one argument of type ',
                'Object. ', "\n", 'The keys of the object has to represent product-ids, the ',
                'values has to be arrays of selected product-feature-ids.'
            ].join(''));
        }

        /** @member {Integer} */
        this.positionId = 1;

        /**
         * @member {Object}
         * @instance
         */
        this.oCartService = oService;
        /** @member {CartPosition[]} */
        this.positions = {};
        /** @member {Object} */
        this.listener = {
            /**
             * Event reporting that a product has been add to cart.
             *
             * @event module:Cestino~add
             * @param {CartPosition} position
             */
            add: [],
            /**
             * Event reporting that a product has been removed from cart.
             *
             * @event module:Cestino~remove
             * @param {CartPosition} position
             */
            remove: [],
            /**
             * Event reporting that a product-position in cart has been changed.
             *
             * @event module:Cestino~change
             * @param {CartPosition} position
             */
            change: [],
            /**
             * Event reporting that the cart has been load from json.
             * @event module:Cestino~load
             * @param {Cart} cart
             */
            load: []
        };
    }

        /**
         * The cart reference will be injected on instancing separately.
         *
         * @constructor
         * @private
         * @global
         * @param   {String} sId
         * @param   {Product} oProduct
         * @param   {ProductFeature[]} aFeatures
         * @param   {ProductQuantity} oQuantity
         */
        function CartPosition(sId, oProduct, aFeatures, oQuantity) {
            this.id       = sId;
            this.product  = oProduct;
            this.features = aFeatures;
            this.quantity = oQuantity;
            this.cart     = null;
        }

    /**
     * Class to describe a product that was add to cart.
     *
     * @constructor
     * @private
     * @global
     * @param   {String} id
     * @param   {String} title
     * @param   {Integer} price
     * @borrows module:Cestino~Cart.Product#getPrice as getPrice
     */
    Cart.Product = function (id, title, price) {
        if (Util.isEmpty(id) || (typeof id !== 'string' && ! Util.isInt(id))) {
            throw new RangeError('The product has to have an id of type string or integer!');
        }
        if (Util.isEmpty(title) || typeof title !== 'string') {
            throw new RangeError('The product has to have a title of type string!');
        }
        if (! Util.isInt(price) || price < 0) {
            throw new TypeError('The price has to be an positive integer!');
        }

        this.id    = id;
        this.title = title;
        // Integers only (cents)!
        this.price = price;
    };

        /**
         * Returns the price of the product. Overwrite this method to modify the cart calculation
         * to your needs (e. g. to add tax)
         * @method  Product#getPrice
         * @returns {Integer}
         */
        Cart.Product.prototype.getPrice = function () {
            return this.price;
        };

    /**
     * Class to represent the quantity structure of a product in a position. No limits or ranges
     * will be checked, you have to implement it by yourself!
     * 
     * @constructor
     * @private
     * @global
     * @param   {Integer} amount
     * @param   {Integer=} dimX
     * @param   {Integer=} dimY
     * @param   {Integer=} dimZ
     * @borrows module:Cestino~Cart.ProductQuantity#getFactor as getFactor
     */
    Cart.ProductQuantity = function (amount, dimX, dimY, dimZ) {
        // Integers only!
        this.amount   = amount;

        // Also don't use float-values with dimensions, change the unit for the dimensions instead.
        // The price of the product relates to the standard value of the dimension unit;
        // For example:
        // - The dimension unit is inch and the product a tissue, the price has to be essential for
        //   a square inch
        // - Or the product is a sponge :) that will be individually cut for the customer in a cubic
        //   shape. The dimension unit is defined to cm - then the standard value is cubic
        //   centimeters and the price has to be defined in relation to cubic centimeters!
        this.dimensionX = dimX || 1;
        this.dimensionY = dimY || 1;
        this.dimensionZ = dimZ || 1;

        if (! (Util.isInt(this.amount)
                && Util.isInt(this.dimensionX)
                && Util.isInt(this.dimensionY)
                && Util.isInt(this.dimensionZ))
        ) {
            throw new TypeError([
                'Invalid try to instanciate quantity. Not all parameters are integers! ',
                "\ndata object: ", JSON.stringify(this), "\n"
            ].join(''));
        }
    };

        /**
         * Calculates the quantity factor for the product. Overwrite this method to modify the cart
         * calculation to your needs (e. g. to convert into another scale unit).
         * @method  ProductQuantity#getPrice
         * @returns {Integer}
         */
        Cart.ProductQuantity.prototype.getFactor = function () {
            return this.amount * this.dimensionX * this.dimensionY * this.dimensionZ;
        };

    /**
     * Class to describe a selected feature of a product.
     *
     * @constructor
     * @private
     * @global
     * @param   {(String|Integer)} id
     * @param   {String} label
     * @param   {Integer=} price
     * @borrows module:Cestino~Cart.ProductFeature#getPrice as getPrice
     */
    Cart.ProductFeature = function (id, label, price) {
        if (Util.isEmpty(id) || (typeof id !== 'string' && ! Util.isInt(id))) {
            throw new RangeError('The product feature has to have an id of type string or integer!');
        }
        if (Util.isEmpty(label) || typeof label !== 'string') {
            throw new RangeError('The product feature has to have a title of type string!');
        }
        if (! Util.isInt(price) || price < 0) {
            throw new TypeError('The price has to be an positive integer!');
        }

        this.id    = id;
        // Integers only (cents)!
        this.price = price;
        this.label = label;
    };

        /**
         * Returns the price of a feature selected to a product. Overwrite this method to modify
         * the cart calculation to your needs
         * @method  ProductFeature#getPrice
         * @returns {Integer}
         */
        Cart.ProductFeature.prototype.getPrice = function () {
            return this.price;
        };


        /**
         * Walks through all positions of the cart, calls passed function and puts position and group to
         * it.
         * 
         * @method  Cart#walk
         * @param   {Function} fnCallback
         * @returns {Cart}
         * @public
         */
        function _walk(fnCallback) {
            var that = this;
    
            this.getShippingGroups().forEach(function (group) {
                that.getPositionsOfGroup(group).forEach(function (oPosition) {
                    fnCallback(oPosition, group);
                });
            });
    
            return this;
        }
    
    
        /**
         * Returns a json-representation of the cart; Only necessary information will be transported to
         * the json-string.
         *
         * @method  Cart#toJSON
         * @returns {String}
         * @public
         */
        function _toJSON() {
            var cart = {date: (new Date()).toISOString(), AutoPosId: this.positionId, pos: {}};
    
            this.walk(function (oPosition, group) {
                cart.pos[group] = cart.pos[group] || [];
                cart.pos[group].push({
                    id: oPosition.id,
                    product: {
                        id: oPosition.product.id
                    },
                    quantity: {
                        amount: oPosition.quantity.amount,
                        dimX: oPosition.quantity.dimensionX,
                        dimY: oPosition.quantity.dimensionY,
                        dimZ: oPosition.quantity.dimensionZ
                    },
                    features: oPosition.features.map(function (oFeature) {
                        return oFeature.id;
                    })
                });
            });
    
            return JSON.stringify(cart);
        }
    
    
        /**
         * Build the cart from JSON
         *
         * @method  Cart#fromJSON
         * @param   {String} sJSON
         * @returns {Cart}
         * @public
         * @fires   module:Cestino~load
         */
        function _fromJSON(sJSON) {
            var that = this, oCart, oPosition, internGrpName;
    
            if (Object.keys(this.positions).length !== 0) {
                throw new RangeError('Cart has to be empty when loading from a JSON!');
            }
            oCart = JSON.parse(sJSON);
            this.positionId = oCart.AutoPosId;
    
            Object.keys(oCart.pos).forEach(function (group) {
                oCart.pos[group].forEach(function (position) {
                    oPosition = new CartPosition(
                        position.id,
                        new Cart.Product(position.product.id, INCOMPLETE_MARKER, 987654321),
                        position.features.map(function (id) {
                            return new Cart.ProductFeature(id, INCOMPLETE_MARKER, 987654321);
                        }),
                        new Cart.ProductQuantity(
                            position.quantity.amount,
                            position.quantity.dimX,
                            position.quantity.dimY,
                            position.quantity.dimZ
                        )
                    );
                    oPosition.cart = that;
                    internGrpName = 'g'+group;
                    that.positions[internGrpName] = that.positions[internGrpName] || [];
                    that.positions[internGrpName].push(oPosition);
                });
            });
    
            // notify load-listeners on promise resolve
            this.oCartService.setProductDataToCart(this)
                .then(function() {
                    that.listener.load.forEach(function (fnListener) {
                        fnListener(that);
                    });
                });
    
            return this;
        }


        /**
         * @param {String} sKind
         * @param {CartPosition} oPosition
         * @private
         */
        function _notifyListeners(sKind, oPosition) {
            this.listener[sKind].forEach(function (fnListener) {
                fnListener(oPosition);
            });
        }


        /**
         * Creates a position in the cart
         * 
         * @method  Cart#add
         * @param   {Product} oProduct
         * @param   {(ProductQuantity|Integer)} oQuantity
         * @param   {String=} sShippingGroup default is ''
         * @param   {ProductFeature[]}  [aProductFeatures=[]] default is []
         * @returns {String} Id of generated Position
         * @public
         * @fires   module:Cestino~add
         */
        function _addProduct(
            oProduct, oQuantity, sShippingGroup, aProductFeatures
        ) {
            var posId, oPosition,
                aProductFeatures = aProductFeatures || [],
                group = 'g'+(sShippingGroup || ''),
                oQuantity = oQuantity || (new Cart.ProductQuantity(1));

            if (! (oProduct instanceof Cart.Product)) {
                throw new TypeError('The product has to be a instance of Cart.Product!');
            }

            if (Util.isInt(oQuantity)) {
                oQuantity = new Cart.ProductQuantity(oQuantity);
            }

            if (! (oQuantity instanceof Cart.ProductQuantity)) {
                throw new TypeError([
                    'The quantity has to be a instance of Cart.ProductQuantity or a positive ',
                    'integer value!'
                ].join(''));
            }

            this.positions[group] = this.positions[group] || [];

            posId = 'p'+(this.positionId++);
            oPosition = new CartPosition(
                posId, oProduct, aProductFeatures, oQuantity
            );
            oPosition.cart = this;
            this.positions[group].push(oPosition);
            _notifyListeners.call(this, 'add', oPosition);

            return posId;
        }


            /**
             * Adds a function that will be invoke when a specific event occurs.
             *
             * @method  Cart#on
             * @param   {String} kind "add" (product), "remove" (product), "change" (position) or "load" (cart)
             * @param   {(module:Cestino~loadCallback|module:Cestino~addProductCallback|module:Cestino~removeProductCallback|module:Cestino~changePositionCallback)} fnListener
             * @returns {Cart}  this-reference for method chaining ...
             * @public
             */
            function _on(kind, fnListener) {
                if (typeof fnListener !== 'function') {
                    throw new TypeError('The passed listener has to be a function!');
                }
                if (availableEvents.indexOf(kind) === -1) {
                    throw new TypeError(kind+' is an unknown event! Try one of these: '+availableEvents.join(', ')+'.');
                }
                this.listener[kind].push(fnListener);
                return this;
            }


            /**
             * Removes a function that will be invoke on specific action.
             *
             * @method  Cart#off
             * @param   {string}   kind
             * @param   {(module:Cestino~loadCallback|module:Cestino~addProductCallback|module:Cestino~removeProductCallback|module:Cestino~changePositionCallback)} fnListener
             * @returns {Cart}  this-reference for method chaining ...
             * @public
             */
            function _off(kind, fnListener) {
                var that = this;

                if (availableEvents.indexOf(kind) === -1) {
                    throw new TypeError(kind+' is an unknown event! Try one of these: '+availableEvents.join(', ')+'.');
                }
                this.listener[kind].some(function (eListener, idx) {
                    if (fnListener === eListener) {
                        that.listener[kind].splice(idx, 1);
                        return true;
                    }
                });

                return this;
            }


        /**
         * Get all defined groups.
         *
         * @method  Cart#getShippingGroups
         * @returns {String[]}
         * @public
         */
        function _getGroups() {
            return Object.keys(this.positions).map(function (val) {
                return val.substr(1);
            });
        }


        /**
         * Returns all positions of the pssed group.
         *
         * @method  Cart#getPositionsOfGroup
         * @param   {String} sShippingGroup
         * @returns {CartPosition[]}
         * @public
         */
        function _getPositionsOfGroup(sShippingGroup) {
            var group = 'g'+(sShippingGroup || '');

            if (! (group in this.positions)) {
                throw new ReferenceError(
                    ["No shipping-group with name '",sShippingGroup,"' found!"].join('')
                )
            }

            return this.positions[group];
        }


        /**
         * Calculates the subtotal of a shipping-group.
         *
         * @method  Cart#calculateGroup
         * @param   {String} sShippingGroup
         * @returns {Integer}
         * @public
         */
        function _calculateGroup(sShippingGroup) {
            var subtotal = 0;

            this.getPositionsOfGroup(sShippingGroup).forEach(function (ePosition) {
                subtotal += ePosition.calculate();
            });

            return subtotal;
        }


        /**
         * Calculates the total of the whole shopping-cart.
         *
         * @method  Cart#calculate
         * @returns {Integer}
         * @public
         */
        function _calculate() {
            var that = this, total = 0;

            Object.keys(this.positions).forEach(function (sGroup) {
                total += that.calculateGroup( sGroup.substr(1) );
            });

            return total;
        }


        /**
         * Delete a cart-position by id.
         * 
         * @method  Cart#deletePosition
         * @param   {String} sIdCartPosition
         * @returns {CartPosition} sIdCartPosition The position that was removed
         * @public
         * @fires   module:Cestino~remove
         */
        function _deletePosition(sIdCartPosition) {
            var oPosition,
                oFound = _findPosition.call(this, sIdCartPosition);

            if (! oFound) {
                throw new RefereneceError(["No position with id '", sIdCartPosition, "' found!"].join(''));
            }

            oPosition = this.positions[oFound.group].splice(oFound.index, 1)[0];
            _notifyListeners.call(this, 'remove', oPosition);

            return oPosition;
        }


        /**
         * Tries to get a position from given id.
         *
         * @method  Cart#getPositionById
         * @param   {String} sIdCartPosition
         * @returns {CartPosition}
         * @public
         */
        function _getPositionById(sIdCartPosition) {
            var oFound = _findPosition.call(this, sIdCartPosition);

            if (! oFound) {
                throw new ReferenceError([
                    "No position with id '", sIdCartPosition, "' found!"
                ].join(''));
            }

            return this.positions[oFound.group][oFound.index];
        }


        /**
         * Search positions by id
         *
         * @param   {String} sIdCartPosition
         * @returns {Object} {"group": "GROUP_AS_STRING", "index": "INDEX_AS_INT"}
         * @private
         */
        function _findPosition(sIdCartPosition) {
            var positions = this.positions,
                eFound = false;

            Object.keys(positions).some(function (group) {
                positions[group].some(function (ePosition, idx) {
                    if (ePosition.id === sIdCartPosition) {
                        eFound = {"group": group, "index": idx};
                    }
                    return !!eFound;
                });
                return !!eFound;
            });

            return eFound;
        }


        /**
         * Replacing the product quantity in cart position.
         *
         * @method  Cart#replaceQuantity
         * @param   {ProductQuantity} oQuantity
         * @returns {CartPosition} this-reference for method chaining ...
         * @public
         * @fires   module:Cestino~change
         */
        function _replaceQuantity(oQuantity) {
            if (! (oQuantity instanceof Cart.ProductQuantity)) {
                throw new TypeError('The quantity has to be a instance of Cart.ProductQuantity!');
            }

            this.quantity = oQuantity;

            _notifyListeners.call(this.cart, 'change', this);
            return this;
        }


        /**
         * Incrementing amount of cart position.
         *
         * @method  Cart#incrementAmount
         * @param   {Integer} amount
         * @returns {CartPosition}
         * @public
         * @fires   module:Cestino~change
         */
        function _incrementAmount(amount) {
            amount = amount || 1;
            if (! Util.isInt(amount)) {
                throw new TypeError('Amount has to be of type integer!');
            }
            this.quantity.amount += amount;
            _notifyListeners.call(this.cart, 'change', this);
            return this;
        }


        /**
         * Decrementing amount of cart position.
         *
         * @method  Cart#decrementAmount
         * @param   {Integer} amount
         * @returns {CartPosition}
         * @public
         * @fires   module:Cestino~change
         */
        function _decrementAmount(amount) {
            amount = amount || 1;
            if (! Util.isInt(amount)) {
                throw new TypeError('Amount has to be of type integer!');
            }
            this.quantity.amount -= amount;
            _notifyListeners.call(this.cart, 'change', this);
            return this;
        }


        /**
         * Returns calculated price in cents.
         *
         * @returns {Integer}
         * @public
         */
        function _calculateCartPosition() {
            var nFeaturePrice = 0;

            this.features.forEach(function (eFeature) {
                nFeaturePrice += eFeature.getPrice();
            });

            return (this.product.getPrice() + nFeaturePrice) * this.quantity.getFactor();
        }


    /**
     * Extends the constructor passed implicit (as this reference).
     * 
     * @param {*} subclassConstructor
     * @private
     */
    function _extendWith(subclassConstructor) {
        var key,
            parentConstructor = this,
            subclassProto = subclassConstructor.prototype;

        subclassConstructor.prototype = Object.create(this.prototype);
        subclassConstructor.prototype.constructor = subclassConstructor;

        for (key in subclassProto) {
            if (Object.prototype.hasOwnProperty.call(subclassProto, key)) {
                subclassConstructor.prototype[key] = subclassProto[key];
            }
        }

        return {
            create: function () {
                var subclassObject = Object.create(subclassConstructor.prototype);
                parentConstructor.apply(subclassObject, arguments);
                subclassConstructor.apply(subclassObject, arguments);
                return subclassObject;
            }
        };
    }

    /**
     * Creates a factory to instanciate a new object of passed type.
     * 
     * @param {String} kind Type of object to create
     * @private
     */
    function _createFactory(kind) {
        return function () {
            return new Cart[kind](
                typeof arguments[0] !== 'undefined' && arguments[0] || undefined,
                typeof arguments[1] !== 'undefined' && arguments[1] || undefined,
                typeof arguments[2] !== 'undefined' && arguments[2] || undefined,
                typeof arguments[3] !== 'undefined' && arguments[3] || undefined
            );
        }
    }

    // Module-API
    return {
        /**
         * Creates an object of type Cart; The main object.
         * @alias   module:Cestino.create
         * @param   {Object} oService
         * @returns {Cart}
         */
        create: function (oService) {
            return new Cart(oService);
        },
        /**
         * @alias module:Cestino.Util
         * @see   {@link module:Cestino/Util}
         */
        Util: Util,
        /**
         * @alias module:Cestino.PriceFormatter
         * @see   {@link module:Cestino/PriceFormatter}
         */
        PriceFormatter: PriceFormatter,
        /**
         * @alias module:Cestino.BasicCartService
         * @see   {@link module:Cestino/BasicCartService}
         */
        BasicCartService: BasicCartService,
        /** @alias module:Cestino.Product */
        Product: {
            /**
             * Creates an object of type Cart.Product
             * @alias   module:Cestino.Product.create
             * @param   {String} id
             * @param   {String} title
             * @param   {Integer} price
             * @returns {Product}
             */
            create: _createFactory('Product'),
            /**
             * Extends class Product by passed constructor
             * @alias module:Cestino.Product.extendWith
             * @param {*} subclassConstructor
             * @returns {Product}
             */
            extendWith: _extendWith.bind(Cart.Product)
        },
        /** @alias module:Cestino.ProductFeature */
        ProductFeature: {
            /**
             * Creates an object of type Cart.ProductFeature
             * @alias   module:Cestino.ProductFeature.create
             * @param   {String|Integer} id
             * @param   {String} label
             * @param   {Integer} price
             * @returns {ProductFeature}
             */
            create: _createFactory('ProductFeature'),
            /**
             * Extends class ProductFeature by passed constructor
             * @alias module:Cestino.ProductFeature.extendWith      
             * @param {*} subclassConstructor
             * @returns {ProductFeature}
             */
            extendWith: _extendWith.bind(Cart.ProductFeature)
        },
        /** @alias module:Cestino.ProductQuantity */
        ProductQuantity: {
            /**
             * Creates an object of type Cart.ProductQuantity
             * @alias   module:Cestino.ProductQuantity.create
             * @param   {Integer} amount
             * @param   {Integer} dimX
             * @param   {Integer} dimY
             * @param   {Integer} dimZ
             * @returns {ProductQuantity}
             */
            create: _createFactory('ProductQuantity'),
            /**
             * Extends class ProductQuantity by passed constructor
             * @alias module:Cestino.ProductQuantity.extendWith      
             * @param {*} subclassConstructor
             * @returns {ProductQuantity}
             */
            extendWith: _extendWith.bind(Cart.ProductQuantity)
        },
        
        /**
         * @deprecated
         * @method
         * @static
         */
        createProduct: _createFactory('Product'),
        /**
         * @deprecated
         * @method
         * @static
         */
        createProductFeature: _createFactory('ProductFeature'),
        /**
         * @deprecated
         * @method
         * @static
         */
        createProductQuantity: _createFactory('ProductQuantity'),
        /**
         * @deprecated
         * @method
         * @static
         */
        extendProduct: _extendWith.bind(Cart.Product),
        /**
         * @deprecated
         * @method
         * @static
         */
        extendProductFeature: _extendWith.bind(Cart.ProductFeature),
        /**
         * @deprecated
         * @method
         * @static
         */
        extendProductQuantity: _extendWith.bind(Cart.ProductQuantity),
    };
}));

if (typeof define === 'function' && define.amd) {
    define(['cestino/Cart'], function (Cart) { return Cart; });
}
