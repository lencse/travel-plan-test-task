import { EOL } from 'os'

interface Destination {
    name: string
    dependencies: string[]
}

class InputData {

    private readonly destinations: Map<string, Destination> = new Map<string, Destination>()

    public get(destination: string): Destination {
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
        this.destinations.set(destination, { name: destination, dependencies: [] })
    }

    public addDestinationWithDependency(destination: string, dependency: string): void {
        this.addDestination(destination)
        this.destinations.get(destination)?.dependencies.push(dependency)
    }

    public getAllDestinations(): Destination[] {
        const result: Destination[] = []
        this.destinations.forEach(dest => result.push(dest))
        return result
    }

}

export default class InputParser {

    public parse (input: string): InputData {
        const result = new InputData()
        input.trim().split(EOL).forEach(line => {
            const parts = line.trim().split('=>').map(data => data.trim())
            parts.forEach(dest => {
                if ('' !== dest) {
                    result.addDestination(dest)
                }
            })
            if ('' !== parts[1]) {
                result.addDestinationWithDependency(parts[1], parts[0])
            }
        })
        return result
    }

}
