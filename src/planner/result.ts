import Destination from './destination'

export default class PlanResult {

    private readonly destinations: Destination[] = []

    public addDestination(destination: Destination): void {
        this.destinations.push(destination)
    }

    public asString(): string {
        return this.destinations.map(dest => dest.name).join('')
    }

}
