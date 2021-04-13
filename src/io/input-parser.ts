import { EOL } from 'os'

class InputData {

    private readonly destinations: Map<string, string[]> = new Map<string, string[]>()

    public get(destination: string): string[] {
        const result = this.destinations.get(destination)
        if (undefined === result) {
            throw new Error('Missing destination')
        }
        return result
    }

    public addDestination(destination: string): void {
        if (this.destinations.has(destination)) {
            return
        }
        this.destinations.set(destination, [])
    }

    public addDestinationWithDependency(destination: string, dependency: string): void {
        this.addDestination(destination)
        this.destinations.get(destination)?.push(dependency)
    }

}

export default class InputParser {

    public parse (input: string): InputData {
        const result = new InputData()
        input.trim().split(EOL).forEach(line => {
            const parts = line.trim().split('=>').map(data => data.trim())
            parts.forEach(dest => {
                result.addDestination(dest)
            })
            if ('' !== parts[1]) {
                result.addDestinationWithDependency(parts[1], parts[0])
            }
        })
        return result
    }

}
