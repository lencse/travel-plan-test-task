import PlanResult from '../planner/result'

export default class OutputFormatter {

    public format(result: PlanResult): string {
        return result.getDestinations().map(dest => dest.name).join('')
    }

}
