/**
 * @param   {Object} root
 * @param   {Function} factory
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
