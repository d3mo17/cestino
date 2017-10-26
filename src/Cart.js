/**
 * Requirements: IE9+
 * 
 * @param   {Object} root
 * @param   {function} factory
 *
 * @returns {Object}
 */
(function (root, factory) {
    var i, helperRef;

    if (typeof define === 'function' && define.amd) {
        define(['cestino/Util', 'cestino/BasicCartService'], function (u) {
            return factory(u, root, 'cestino');
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('./Util'), root, '.');
    } else {
        helperRef = root.Cestino;
        root.Cestino = factory(helperRef.Util, root);
        for (i in helperRef) {
            if (helperRef.hasOwnProperty(i)) {
                root.Cestino[i] = helperRef[i];
            }
        }
    }
}(this, function (Util, root, modulePath) {
    "use strict";

    var INCOMPLETE_MARKER = '__INCOMPLETE__',
        availableEvents = ['load', 'add', 'change', 'remove'];

    /**
     * Class to manage a shopping cart. The cart only supports
     * product-positions separated in shipping-groups. The prices were
     * handled without tax.
     * You have to implement prices for shipping and for payment on your
     * own.
     *
     * @constructor
     * @param   {object} oService
     *
     * @returns {Cart}
     */
    function Cart(oService) {
        oService = oService ||
            'Cestino' in root && root.Cestino.BasicCartService.create() ||
            require(modulePath + '/BasicCartService').create();
        if (typeof oService['setProductDataToCart'] !== 'function') {
            throw new TypeError([
                'The service has to be able to find Products! ', "\n",
                'Implement a function named "setProductDataToCart" that takes one argument of type ',
                'Object. ', "\n", 'The keys of the object has to represent product-ids, the ',
                'values has to be arrays of selected product-feature-ids.'
            ].join(''));
        }

        this.positionId = 1;

        this.oCartService = oService;
        this.positions = {};
        this.listener = {
            add: [],
            remove: [],
            change: [],
            load: []
        };
    }


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


    /**
     * Walks through all positions of the cart, calls passed function and puts position and group to
     * it.
     * 
     * @param   {function} fnCallback
     * @returns {Cart}
     * @private
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
     * @returns {string}
     * @private
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
     * @param   {string} sJSON
     * 
     * @returns {Cart}
     * @private
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
     * Class to describe a product that was add to cart.
     *
     * @param   {string} id
     * @param   {string} title
     * @param   {Number} price
     *
     * @returns {Cart.Product}
     * @private
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
     * Class to represent the quantity structure of a product in a position. No limits or ranges
     * will be checked, you have to implement it by yourself!
     * 
     * @constructor
     * @param   {Number} amount
     * @param   {Number} dimX
     * @param   {Number} dimY
     * @param   {Number} dimZ
     *
     * @returns {Cart.ProductQuantity}
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
         * Calculates the quantity factor for the product.
         * @returns {Number}
         */
        Cart.ProductQuantity.prototype.getFactor = function () {
            return this.amount * this.dimensionX * this.dimensionY * this.dimensionZ;
        };


    /**
     * Class to describe a selected feature of a product.
     *
     * @constructor
     * @param   {String|Number} id
     * @param   {String} label
     * @param   {Number} price
     *
     * @returns {Cart.ProductFeature}
     */
    Cart.ProductFeature = function (id, label, price) {
        if (Util.isEmpty(id) || (typeof id !== 'string' && ! Util.isInt(id))) {
            throw new RangeError('The product feature has to have an id of type string oe integer!');
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
         * @param {string} sKind
         * @param {CartPosition} oPosition
         * @private
         */
        function _notifyListeners(sKind, oPosition) {
            this.listener[sKind].forEach(function (fnListener) {
                fnListener(oPosition);
            });
        }


        /**
         * @param   {Cart.Product} oProduct
         * @param   {Cart.ProductQuantity} oQuantity
         * @param   {string} sShippingGroup [optional] default is ''
         * @param   {array}  aProductFeatures [optional] default is []
         *
         * @returns {string} Id of generated Position
         * @private
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
             * @param   {string}   kind
             * @param   {function} fnListener
             *
             * @returns {Cart}  this-reference for method chaining ...
             * @private
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
             * @param   {string}   kind
             * @param   {function} fnListener
             *
             * @returns {Cart}  this-reference for method chaining ...
             * @private
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
         * @returns {Array}
         * @private
         */
        function _getGroups() {
            return Object.keys(this.positions).map(function (val) {
                return val.substr(1);
            });
        }


        /**
         * Returns all positions of the pssed group.
         *
         * @param   {String} sShippingGroup
         *
         * @returns {Array}
         * @private
         */
        function _getPositionsOfGroup(sShippingGroup) {
            var group = 'g'+(sShippingGroup || '');

            if (! (group in this.positions)) {
                throw new ReferenceError(
                    ["No shipping-group with name '",sShippingGroup,"' found!"].join('')
                );
            }

            return this.positions[group];
        }


        /**
         * Calculates the subtotal of a shipping-group.
         *
         * @param   {string} sShippingGroup
         *
         * @returns {Number}
         * @private
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
         * @returns {Number}
         * @private
         */
        function _calculate() {
            var that = this, total = 0;

            Object.keys(this.positions).forEach(function (sGroup) {
                total += that.calculateGroup( sGroup.substr(1) );
            });

            return total;
        }


        /**
         * @param   {string} sIdCartPosition
         * @returns {CartPosition} sIdCartPosition The position that was removed
         * @private
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
         * @param   {string} sIdCartPosition
         *
         * @returns {CartPosition}
         * @private
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
         * @param   {string} sIdCartPosition
         *
         * @returns {object} {"group": "GROUP_AS_STRING", "index": "INDEX_AS_INT"}
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
         * The cart reference will be injected on instancing separately.
         *
         * @constructor
         * @param   {string} sId
         * @param   {Cart.Product} oProduct
         * @param   {array} aFeatures Has to be an array of Cart.ProductFeature-objects
         * @param   {ProductQuantity} oQuantity
         * 
         * @return  {CartPosition}
         */
        function CartPosition(sId, oProduct, aFeatures, oQuantity) {
            this.id       = sId;
            this.product  = oProduct;
            this.features = aFeatures;
            this.quantity = oQuantity;
            this.cart     = null;
        }


        // CartPosition-API
        CartPosition.prototype = {
            calculate: _calculateCartPosition,
            incrementAmount: _incrementAmount, /* Params: amount */
            decrementAmount: _decrementAmount, /* Params: amount */
            replaceQuantity: _replaceQuantity /* Params: amount */
        };


        /**
         * Replacing the product quantity in cart position.
         *
         * @param   {Cart.ProductQuantity} oQuantity
         *
         * @returns {Cart} this-reference for method chaining ...
         * @private
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
         * @param   {Number} amount
         *
         * @returns {CartPosition}
         * @private
         */
        function _incrementAmount( amount ) {
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
         * @param   {Number} amount
         *
         * @returns {CartPosition}
         * @private
         */
        function _decrementAmount( amount ) {
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
         * @returns {Number}
         * @private
         */
        function _calculateCartPosition() {
            var nFeaturePrice = 0;

            this.features.forEach(function (eFeature) {
                nFeaturePrice += eFeature.price;
            });

            return (this.product.price + nFeaturePrice) * this.quantity.getFactor();
        }

    // Module-API
    return {
        create: function (oService) {
            return new Cart(oService);
        },
        createProduct: function (id, title, price) {
            return new Cart.Product(id, title, price);
        },
        createProductFeature: function (id, label, price) {
            return new Cart.ProductFeature(id, label, price);
        },
        createProductQuantity: function (amount, dimX, dimY, dimZ) {
            return new Cart.ProductQuantity(amount, dimX, dimY, dimZ);
        }
    };
}));
