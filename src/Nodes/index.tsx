import { ObjectData } from 'gojs';
import { LevelsMap } from '../utils/prepareNodes';
import Node from './Node'
import Go from '../Canvas'
import './index.css'

interface Props {
    nodes: LevelsMap | undefined
    diagramNodes: ObjectData[]
}
const index = ({nodes, diagramNodes}: Props) => {
    if (!nodes) {   return null; }
    return (
        <div className='nodes'>
            {
                Object.keys(nodes).map((key, index) => {
                    const levelNodes = nodes[key]
                    return (
                    // <div className={`level ${key}`} key={key} style={{gap: `${64/(index * index)}vw`}}>
                    <div className={`level ${key}`} key={key} style={{gap: `2vw`}}>
                    {/* // <div className={`level ${key}`} key={key}> */}
                        {
                            levelNodes.map((node, ind) => {
                                return (<Node val={node} key={`${node}${ind}${index}`} />)
                            })
                        }
                    </div>

                    )
    
                })

            }
            <Go diagramNodes={diagramNodes}/>
        </div>
    );
};

export default index;