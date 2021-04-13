import { main } from '../src/main'

describe('Main', () => {

    it('Return "x"', () => {
        const result = main('x =>')
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

})
