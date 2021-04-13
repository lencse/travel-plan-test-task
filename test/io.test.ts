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
        expect(result.get('y')).toEqual({ name: 'y', dependencies: ['z'] })
        expect(result.get('z')).toEqual({ name: 'z', dependencies: [] })
    })

    it('Get all destinations', () => {
        const parser = new InputParser()
        const result = parser.parse(`
            x =>
            y => z
            z =>
        `).getAllDestinations()
        expect(result.length).toEqual(3)
        expect(result.filter(dest => 'x' === dest.name)[0]).toEqual({ name: 'x', dependencies: [] })
        expect(result.filter(dest => 'y' === dest.name)[0]).toEqual({ name: 'y', dependencies: ['z'] })
        expect(result.filter(dest => 'z' === dest.name)[0]).toEqual({ name: 'z', dependencies: [] })
    })

})
