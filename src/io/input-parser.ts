import { EOL } from 'os'

export default class InputParser {

    public parse (input: string): Map<string, string[]> {
        const result = new Map<string, string[]>()
        input.trim().split(EOL).forEach(line => {
            const parts = line.trim().split('=>').map(data => data.trim())
            parts.forEach(dest => {
                if (!result.has(dest)) {
                    result.set(dest, [])
                }
            })
            if ('' !== parts[1]) {
                result.get(parts[1])?.push(parts[0])
            }
        })
        return result
    }

}
