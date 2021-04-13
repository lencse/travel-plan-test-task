import { InputData, Destination } from '../io/input-parser'

class PlanResult {

    private readonly destinations: Destination[] = []

    public addDestination(destination: Destination): void {
        this.destinations.push(destination)
    }

    public asString(): string {
        return this.destinations.map(dest => dest.name).join('')
    }

}

export default class Planner {

    private step(remaining: Destination[], result: PlanResult): void {
        if (0 === remaining.length) {
            return
        }
        const next = remaining.filter(dest => 0 === dest.dependencies.length)[0]
        const nextRemaining = remaining.filter(dest => next.name !== dest.name).map(
            dest => ({
                name: dest.name,
                dependencies: dest.dependencies.filter(
                    dep => next.name !== dep
                )
            })
        )
        // nextRemaining.forEach(dest => {
        //     dest.dependencies = dest.dependencies.filter(dep => next.name !== dep)
        // })
        result.addDestination(next)
        this.step(nextRemaining, result)
    }

    public plan(data: InputData): PlanResult {
        const result = new PlanResult()
        this.step(data.getAllDestinations(), result)
        return result
    }

}
