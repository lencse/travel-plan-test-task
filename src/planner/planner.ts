import Destination from './destination'
import InputData from './input-data'
import PlanResult from './result'

export default class Planner {

    private getRemainingDestinationsWithoutDependency(
        remaining: Destination[],
        dependency: Destination
    ): Destination[] {
        return remaining.filter(
            dest => dependency.name !== dest.name
        ).map(
            dest => ({
                name: dest.name,
                dependencies: dest.dependencies.filter(
                    dep => dependency.name !== dep
                )
            })
        )
    }

    private findADestinationWithoutNotVisitedDependency(remaining: Destination[]): Destination {
        const candidates = remaining.filter(dest => 0 === dest.dependencies.length)
        if (0 === candidates.length) {
            throw new Error('Circular dependency')
        }
        return candidates[0]
    }

    private findNextDestinationAndMoveOn(remaining: Destination[], result: PlanResult): void {
        if (0 === remaining.length) {
            return
        }
        const nextDestination = this.findADestinationWithoutNotVisitedDependency(remaining)
        result.addDestination(nextDestination)
        this.findNextDestinationAndMoveOn(
            this.getRemainingDestinationsWithoutDependency(remaining, nextDestination),
            result
        )
    }

    public plan(data: InputData): PlanResult {
        const result = new PlanResult()
        this.findNextDestinationAndMoveOn(data.getAllDestinations(), result)
        return result
    }

}
