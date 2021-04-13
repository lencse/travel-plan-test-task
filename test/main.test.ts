import { main } from '../src/main'

describe('Main', () => {

    it('Return "x"', () => {
        const result = main(`
            x =>
        `)
        expect(result).toEqual('x')
    })

    it('3 destinations without dependency', () => {
        const result = main(`
            x =>
            y =>
            z =>
        `)
        expect(result.length).toEqual(3)
        expect(result.indexOf('x')).toBeGreaterThan(-1)
        expect(result.indexOf('y')).toBeGreaterThan(-1)
        expect(result.indexOf('z')).toBeGreaterThan(-1)
    })

    it('3 destinations with dependency', () => {
        const result = main(`
            x =>
            y => z
            z =>
        `)
        expect(result.length).toEqual(3)
        expect(result.indexOf('x')).toBeGreaterThan(-1)
        expect(result.indexOf('y')).toBeGreaterThan(-1)
        expect(result.indexOf('z')).toBeGreaterThan(-1)
        expect(result.indexOf('z')).toBeLessThan(result.indexOf('y'))
    })

    it('6 destinations with dependencies', () => {
        const result = main(`
            u =>
            v => w
            w => z
            x => u
            y => v
            z =>
        `)
        expect(result.length).toEqual(6)
        expect(result.indexOf('z')).toBeLessThan(result.indexOf('w'))
        expect(result.indexOf('w')).toBeLessThan(result.indexOf('v'))
        expect(result.indexOf('v')).toBeLessThan(result.indexOf('y'))
        expect(result.indexOf('u')).toBeLessThan(result.indexOf('x'))
    })

    it('6 destinations with multiple dependencies', () => {
        const result = main(`
            u => x
            v => x
            w => x
            u => y
            v => y
            w => y
            x => z
        `)
        expect(result.length).toEqual(6)
        expect(result.indexOf('x')).toBeLessThan(result.indexOf('u'))
        expect(result.indexOf('x')).toBeLessThan(result.indexOf('v'))
        expect(result.indexOf('x')).toBeLessThan(result.indexOf('w'))
        expect(result.indexOf('y')).toBeLessThan(result.indexOf('u'))
        expect(result.indexOf('y')).toBeLessThan(result.indexOf('v'))
        expect(result.indexOf('y')).toBeLessThan(result.indexOf('w'))
        expect(result.indexOf('z')).toBeLessThan(result.indexOf('x'))
    })

    it('Include every mentioned destinations', () => {
        const result = main(`
            x => y
        `)
        expect(result).toEqual('yx')
    })

    it('Throw error on circular dependency', () => {
        try {
            main(`
                x => y
                y => x
            `)
            fail('Exception not thrown')
        } catch (e) {
            expect(e.message).toEqual('Circular dependency')
        }
    })

    it('Throw error on invalid input', () => {
        try {
            main(`
                xx => y
            `)
            fail('Exception not thrown')
        } catch (e) {
            expect(e.message).toEqual('Invalid destination name: "xx"')
        }
    })

    it('Handle duplications in input', () => {
        const result = main(`
            x =>
            y => z
            y => z
            z =>
        `)
        expect(result.length).toEqual(3)
        expect(result.indexOf('x')).toBeGreaterThan(-1)
        expect(result.indexOf('y')).toBeGreaterThan(-1)
        expect(result.indexOf('z')).toBeGreaterThan(-1)
        expect(result.indexOf('z')).toBeLessThan(result.indexOf('y'))
    })

    it('Handle empty input', () => {
        const result = main(`
        `)
        expect(result).toEqual('')
    })

    it('Case-sensitive destination naming', () => {
        const result = main(`
            a => A
        `)
        expect(result).toEqual('Aa')
    })

})
