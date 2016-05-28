/**
 * Requirements: IE9+
 *
 * @param   {Object} root
 * @param   {function} factory
 *
 * @returns {Object}
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['bluebird/js/browser/bluebird.core.min',
            'atomic/dist/atomic.min'], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(
            require('bluebird/js/browser/bluebird.core.min'),
            require('atomic/dist/atomic.min')
        );
	} else {
        root.Cestino = root.Cestino || {};
		root.Cestino.BasicCartService = factory(root.Promise, root.Atomic);
	}
}(this, function (Promise, Atomic) {
	"use strict";

    var defaults = {
        url: ''
    };


	/**
	 * BasicCartService-API
	 */
    BasicCartService.prototype = {
        getProductBasics:   _getProductBasics
    };


    /**
     * Service used to put correct master data of products into the model
     *
     * @param   {object} options
     *
     * @returns {BasicCartService}
     */
    function BasicCartService(options) {
        var attr;
        
        // clone defaults ... (Does only works with plain objects, don't use it e. g. to clone
        // Date-object values)
        this.options = JSON.parse(JSON.stringify(defaults));
        for (attr in options) {
            this.options[attr] = options[attr];
        }
    }

        /**
         * Merges object-data in the shopping cart.
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
         * @param   {Cart} oCart
         * 
         * @returns {Promise}
         * @private
         */
        function _getProductBasics(oCart) {
            var that = this, data = {};

            oCart.walk(function (oPosition) {
                data[oPosition.product.id] = oPosition.features.map(function (oFeature) {
                    return oFeature.id;
                });
            });

            return new Promise(function (resolve, reject) {
                Atomic.setContentType('application/json');
                Atomic.post(that.options.url, {query: data})
                    .error(reject)
                    .success(function(response) {
                        _mergeDataInCart.call(that, response, oCart);
                        resolve(response);
                    });
            });
        }


    return {
        create: function (options) {
            return new BasicCartService(options);
        }
    };
}));