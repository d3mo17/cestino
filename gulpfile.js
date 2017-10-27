var gulp = require('gulp'),
    rjs = require('requirejs');

gulp.task('distribute', function () {
    return Promise.all([new Promise(concat), new Promise(minify)]);

    /**
     * Will operate the task given Promise for minification
     *
     * @param	{function} resolve
     * @param	{function} reject
     */
    function minify(resolve, reject) {
        _optimize(resolve, 'uglify', 'cestino.min.js', 'Minify');
    }

    /**
     * Will operate the task given Promise for concatenation
     *
     * @param	{function} resolve
     * @param	{function} reject
     */
    function concat(resolve, reject) {
        _optimize(resolve, 'none', 'cestino.js', 'Concat');
    }

    /**
     * @param {function} resolve
     * @param {string} optimizeType
     * @param {string} targetFile
     * @param {string} whatHappens
     * @private
     */
    function _optimize(resolve, optimizeType, targetFile, whatHappens) {
        rjs.optimize({
            optimize: optimizeType,

            baseUrl: 'src',
            paths: {
                'cestino': '.',
                'bluebird/js/browser/bluebird.core.min': 'empty:',
                'atomicjs/dist/atomic.min': 'empty:'
            },
            include: ['cestino/BasicCartService', 'cestino/Cart', 'cestino/PriceFormatter'],
            out: 'dist/'+targetFile,
            wrap: {
                end: ["(function (root, factory) {\n",
                    "    if (typeof define === 'function' && define.amd) {\n",
                    "        define(['cestino/Cart', 'cestino/BasicCartService', 'cestino/PriceFormatter'], factory);\n",
                    "    } else if (typeof module === 'object' && module.exports) {\n",
                    "        module.exports = factory(require('cestino/Cart'));\n",
                    "    }\n",
                    "}(this, function (cart) {\n    return cart;\n}));\n"
                ].join('')
            },

            preserveLicenseComments:	false,
            skipModuleInsertion:		true,
            findNestedDependencies:		true
        }, function (buildResponse) {
            console.log(whatHappens, buildResponse);
            resolve(buildResponse);
        });
    }
});