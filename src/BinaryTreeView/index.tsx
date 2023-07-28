import './index.css'
import React, {useEffect, useRef} from 'react';
import { Network } from 'vis-network';
import { NodesEdges } from './prepareNodes';

const visOptions = {
    layout: {
      hierarchical: {
        direction: "UD",
        sortMethod: "directed",
      },
    },
    physics: {
      hierarchicalRepulsion: {
        avoidOverlap: 1,
      },
    },
};

const VisNetwork: React.FC<{ nodesAndEdges: NodesEdges}> = ({ nodesAndEdges }) => {
	const visJsRef = useRef<HTMLDivElement>(null);
	const { nodes, edges } = nodesAndEdges

	useEffect(() => {
		const network =
			visJsRef.current &&
			new Network(visJsRef.current, { nodes, edges }, visOptions );
	}, [visJsRef, nodes, edges]);

	return <div id='mynetwork' ref={visJsRef} />;
};

export default VisNetwork;