import InputParser from './io/input-parser'
import Planner from './planner/planner'

export const main = (input: string): string => {
    const parser = new InputParser()
    const data = parser.parse(input)
    const planner = new Planner()
    const result = planner.plan(data)

    return result.asString()
}
