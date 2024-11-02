class Graph {
    constructor(nodes, edges) {
        this.adjacencyList = new Map()
        this.nodes = nodes
        this.edges = edges
        this.buildGraph()
        this.queue = []
    }

    buildGraph() {
        this.nodes.forEach((node) => {
            this.adjacencyList.set(node.id, [])
        })

        this.edges.forEach((edge) => {
            if (this.adjacencyList.get(edge.source) === undefined) {
                throw new Error('No source node found')
            }
            if (this.adjacencyList.get(edge.target) === undefined) {
                throw new Error('No target node found')
            }

            this.adjacencyList.get(edge.source).push(edge.target)
        })
    }

    isCyclical() {
        const visited = new Set()
        const recStack = new Set()

        for (const node of this.nodes) {
            if (this._isCyclicalUtil(node.id, visited, recStack)) {
                return true
            }
        }

        return false
    }

    _isCyclicalUtil(node, visited, recStack) {
        if (!visited.has(node)) {
            visited.add(node)
            recStack.add(node)

            for (const neighbor of this.adjacencyList.get(node)) {
                if (
                    !visited.has(neighbor) &&
                    this._isCyclicalUtil(neighbor, visited, recStack)
                ) {
                    return true
                } else if (recStack.has(neighbor)) {
                    return true
                }
            }
        }

        recStack.delete(node)
        return false
    }

    buildQueue() {
        const queue = this.nodes.map((node) => ({ ...node, dependencies: [], context: [] }))
        queue.forEach((node) => {
            this.adjacencyList.get(node.id).forEach((neighbor) => {
                queue.find((n) => n.id === neighbor).dependencies.push(node.id)
            })
        })

        return queue
    }
}

export default Graph
