import Destination from './destination'
import InputData from './input-data'
import PlanResult from './result'

export default class Planner {

    private step(remaining: Destination[], result: PlanResult): void {
        if (0 === remaining.length) {
            return
        }
        const candidates = remaining.filter(dest => 0 === dest.dependencies.length)
        if (0 === candidates.length) {
            throw new Error('Circular dependency')
        }
        const next = candidates[0]
        const nextRemaining = remaining.filter(
            dest => next.name !== dest.name
        ).map(
            dest => ({
                name: dest.name,
                dependencies: dest.dependencies.filter(
                    dep => next.name !== dep
                )
            })
        )
        result.addDestination(next)
        this.step(nextRemaining, result)
    }

    public plan(data: InputData): PlanResult {
        const result = new PlanResult()
        this.step(data.getAllDestinations(), result)
        return result
    }

}
