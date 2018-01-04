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
            ['bluebird/js/browser/bluebird.min', 'atomicjs/dist/atomic.min'],
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
