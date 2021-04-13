import { EOL } from 'os'
import InputData from '../planner/input-data'

export default class InputParser {

    public parse (input: string): InputData {
        const result = new InputData()
        const trimmed = input.trim()
        if ('' === trimmed) {
            return result
        }
        trimmed.split(EOL).forEach(line => {
            const parts = line.trim().split('=>').map(data => data.trim())
            parts.forEach(dest => {
                if ('' !== dest) {
                    if (!/^[a-zA-Z]$/.test(dest)) {
                        throw new Error(`Invalid destination name: "${dest}"`)
                    }
                    result.addDestination(dest)
                }
            })
            if ('' !== parts[1]) {
                result.addDestinationWithDependency(parts[0], parts[1])
            }
        })
        return result
    }

}
