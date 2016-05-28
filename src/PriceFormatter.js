/**
 * Formatting integers to decimal currency representation.
 * Requirements: IE9+
 *
 * @param   {Object} root
 * @param   {function} factory
 *
 * @returns {Object}
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['cestino/Util'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('cestino/Util'));
    } else {
        root.Cestino = root.Cestino || {};
        root.Cestino.PriceFormatter = factory(root.Cestino.Util);
    }
}(this, function (Util) {
    "use strict";

    /**
     * @param   {String} decimalSeperator
     * @param   {String} thousandsSeperator
     * @param   {Number} decimalCount
     *
     * @returns {PriceFormatter}
     * @constructor
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

        this.decimalCount = decimalCount;
        this.thousandsSeperator = thousandsSeperator;
        this.decimalSeperator = decimalSeperator;
    }

    /**
     * @param   {String} str
     * @param   {Number} size
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
     * @param   {Number} int
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
        create: function (decimalSeperator, thousandsSeperator, decimalCount) {
            return new PriceFormatter(decimalSeperator, thousandsSeperator, decimalCount);
        }
    };
}));


