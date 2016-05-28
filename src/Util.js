/**
 *
 * @param   {Object} root
 * @param   {function} factory
 *
 * @returns {Object}
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Cestino = root.Cestino || {};
        root.Cestino.Util = factory();
    }
}(this, function () {
    "use strict";

    /**
     * Is Int?
     *
     * @param   {*} n
     * @returns {Boolean}
     */
    function _isInt(n) {
        return n === +n && n === (n|0);
    }

    /**
     * Is empty?
     *
     * @param   {*} val
     * @returns {Boolean}
     */
    function _isEmpty(val) {
        return ! val || val === false;
    }

    /**
     * Pad a string on left side to a certain length with another string
     *
     * @param   {String} str
     * @param   {Number} width
     * @param   {String} padStr
     *
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

    // Module-API
    return {
        isInt: _isInt,
        isEmpty: _isEmpty,
        lpad: _lpad
    };
}));


