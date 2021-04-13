import { EOL } from 'os'
import InputData from '../planner/input-data'

export default class InputParser {

    private verifyDestinationName(name: string): void {
        if (!/^[a-zA-Z]$/.test(name)) {
            throw new Error(`Invalid destination name: "${name}"`)
        }
    }

    public parse(input: string): InputData {
        const result = new InputData()
        const trimmed = input.trim()
        if ('' === trimmed) {
            return result
        }
        trimmed.split(EOL).forEach(line => {
            const parts = line.trim().split('=>').map(data => data.trim())
            parts.forEach(dest => {
                if ('' === dest) {
                    return
                }
                this.verifyDestinationName(dest)
                result.addDestination(dest)
            })
            if ('' !== parts[1]) {
                result.addDestinationWithDependency(parts[0], parts[1])
            }
        })
        return result
    }

}
