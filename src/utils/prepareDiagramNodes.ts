import { ObjectData } from "gojs"
import { LevelsMap } from "./prepareNodes"

export type LevelsObjectData = Record<string, ObjectData[]>


const prepareNodes = (nodes: string[]): ObjectData[] => {
    const objects = nodes.map((node, index) => {
        const parent = index > 0 ? Math.floor((index-1)/2) + 1 : 1
        return {color: 'white', key: node, ...(index > 0 && {parent}) }
    })

    return objects
}

export default prepareNodes

