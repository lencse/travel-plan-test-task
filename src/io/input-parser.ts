import { EOL } from 'os'

export default class InputParser {

    public parse (input: string): Map<string, string[]> {
        const result = new Map<string, string[]>()
        input.trim().split(EOL).forEach(line => {
            const parts = line.trim().split('=>').map(data => data.trim())
            if (!result.has(parts[0])) {
                result.set(parts[0], [])
            }
            if ('' !== parts[1]) {
                result.get(parts[0])?.push(parts[1])
            }
        })
        return result
    }

}
