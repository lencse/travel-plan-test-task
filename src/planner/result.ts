import Destination from './destination'

export default class PlanResult {

    private readonly destinations: Destination[] = []

    public getDestinations(): Destination[] {
        return this.destinations
    }

    public addDestination(destination: Destination): void {
        this.destinations.push(destination)
    }

}
