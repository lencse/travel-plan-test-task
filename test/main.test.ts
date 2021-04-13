import { main } from '../src/main'

describe('Main', () => {

    it('Return "x"', () => {
        const result = main('x =>')
        expect(result).toEqual('x')
    })

})
