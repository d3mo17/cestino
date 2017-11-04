
define(['cestinoBundleMin'], formatterInBundleTest);
// define(['cestinoBundle'], formatterInBundleTest);
define(['cestino/PriceFormatter'], priceFormatterTest);

function formatterInBundleTest(Cestino) {
    priceFormatterTest(Cestino.PriceFormatter);
}

function priceFormatterTest(Formatter) {
    "use strict";

    var fm = Formatter.create(',', ' '), fm2, fm3;

    describe('Test formatter for prices!', function () {
        it('should format to german representation correctly', function () {
            expect(fm.format(123)).toBe('1,23');
            expect(fm.format(45123)).toBe('451,23');
            expect(fm.format(6745123)).toBe('67 451,23');
            expect(fm.format(206745123)).toBe('2 067 451,23');
        });

        fm2 = Formatter.create(',', '.');

        it('should format to italian representation correctly', function () {
            expect(fm2.format(123)).toBe('1,23');
            expect(fm2.format(45123)).toBe('451,23');
            expect(fm2.format(6745103)).toBe('67.451,03');
            expect(fm2.format(206745123)).toBe('2.067.451,23');
        });

        fm3 = Formatter.create('.', ',');

        it('should format to english representation correctly', function () {
            expect(fm3.format(123)).toBe('1.23');
            expect(fm3.format(45103)).toBe('451.03');
            expect(fm3.format(6745123)).toBe('67,451.23');
            expect(fm3.format(206745123)).toBe('2,067,451.23');
        });

        it('only accepts integers', function () {
            expect(function () { fm.format('#43'); }).toThrowError(TypeError);
        });
    });
}
