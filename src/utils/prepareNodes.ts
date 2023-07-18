export type LevelsMap = Record<string, string[]>

const prepareNodes = (nodes: string[]): LevelsMap => {
    const levelsMap = {} as LevelsMap

    let level = 0
    let nodesCount = 1
    let levelStart = 0

    while (levelStart < nodes.length) {
        const levelNodes = nodes.slice(levelStart, levelStart + nodesCount)
        levelsMap[`${level}`] = levelNodes

        level++
        levelStart += nodesCount
        nodesCount *= 2
    }
    return levelsMap
}

export default prepareNodes


