import InputParser from '../src/io/input-parser'

describe('Input parser', () => {

    it('Parsing two lines', () => {
        const parser = new InputParser()
        const result = parser.parse(`
            x =>
            y =>
        `)
        expect(result.get('x')).toEqual([])
        expect(result.get('y')).toEqual([])
    })

    it('Parsing lines with dependency', () => {
        const parser = new InputParser()
        const result = parser.parse(`
            x =>
            y => z
            z =>
        `)
        expect(result.get('x')).toEqual([])
        expect(result.get('y')).toEqual([])
        expect(result.get('z')).toEqual(['y'])
    })

})
