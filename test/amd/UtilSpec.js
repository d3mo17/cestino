define(['cestino/Util'], function (Util) {
    "use strict";

    describe('Utilities for common use', function () {
        it('should check integers', function () {
            expect(Util.isInt(89)).toBe(true);
            expect(Util.isInt('89')).toBe(false);
            expect(Util.isInt(89.5)).toBe(false);
        });

        it('should check emptiness', function () {
            expect(Util.isEmpty('')).toBe(true);
            expect(Util.isEmpty(0)).toBe(true);
            expect(Util.isEmpty('0')).toBe(true);
            expect(Util.isEmpty(0.0)).toBe(true);
            expect(Util.isEmpty(null)).toBe(true);
            expect(Util.isEmpty(false)).toBe(true);
            expect(Util.isEmpty('a')).toBe(false);
            expect(Util.isEmpty(1)).toBe(false);
            expect(Util.isEmpty(0.1)).toBe(false);
        });

        it('left padding', function () {
            expect(Util.lpad('test', 3, '#+')).toBe('test');
            expect(Util.lpad('test', 13, '#+')).toBe('#+#+#+#+#test');
            expect(Util.lpad('test', 5, '#+')).toBe('#test');
            expect(Util.lpad('test', 4, '#+')).toBe('test');
            expect(Util.lpad('test', 2, '#+')).toBe('test');
            expect(Util.lpad('tst', 4, '#+')).toBe('#tst');

            expect(Util.lpad('tst', 5, '+')).toBe('++tst');
            expect(Util.lpad('tst', 6, '+-+')).toBe('+-+tst');
        });
    });
});