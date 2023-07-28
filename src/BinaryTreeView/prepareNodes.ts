import { Node, Edge } from 'vis-network'

export interface NodesEdges {
    nodes: Node[]
    edges: Edge[]
}
const prepareNodes = (_nodes: string[]): NodesEdges  => {

    const nodes = [] as Node[]
    const edges = [] as Edge[]

    _nodes.forEach((node, index) => {
        nodes.push({
            id: index,
            label: node.trim().length > 2 ? node.slice(0, 2) + '..' : node
        })

        if (index > 0) {
            edges.push({
                from: Math.floor((index - 1)/2),
                to: index
            })
        }
    })

    return { nodes, edges }
}

export default prepareNodes


