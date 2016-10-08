import hook from '../src/index'

describe('base', () => {

    it('hooking', () => {

        const throwing =_=> { throw new TypeError(`Opps!`) }

        @hook(throwing)
        class Some {
            method1(){}
        }

        const some = new Some();
        try {
            some.method1();
            expect(true).toBe(false); // Fail...
        }
        catch (ex) {
            expect(ex).toBeInstanceOf(TypeError);
            expect(ex.message).toBe(`Opps!`);
        }
    });

});