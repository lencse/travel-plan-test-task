import InputParser from './io/input-parser'
import OutputFormatter from './io/output-formatter'
import Planner from './planner/planner'

export const main = (input: string): string => {
    const parser = new InputParser()
    const planner = new Planner()
    const formatter = new OutputFormatter()

    const data = parser.parse(input)
    const result = planner.plan(data)
    return formatter.format(result)
}
