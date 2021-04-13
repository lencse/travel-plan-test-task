import InputParser from '../src/io/input-parser'

describe('Input parser', () => {

    it('Parsing two lines', () => {
        const parser = new InputParser()
        const result = parser.parse(`
            x =>
            y =>
        `)
        expect(result.get('x')).toEqual({ name: 'x', dependencies: [] })
        expect(result.get('y')).toEqual({ name: 'y', dependencies: [] })
    })

    it('Parsing lines with dependency', () => {
        const parser = new InputParser()
        const result = parser.parse(`
            x =>
            y => z
            z =>
        `)
        expect(result.get('x')).toEqual({ name: 'x', dependencies: [] })
        expect(result.get('y')).toEqual({ name: 'y', dependencies: [] })
        expect(result.get('z')).toEqual({ name: 'z', dependencies: ['y'] })
    })

})
