import { LevelsMap } from '../utils/prepareNodes';
import Node from './Node'
import './index.css'

interface Props {
    nodes: LevelsMap | undefined
}
const index = ({nodes}: Props) => {
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
        </div>
    );
};

export default index;