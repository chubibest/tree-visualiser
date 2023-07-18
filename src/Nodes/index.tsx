import { LevelsMap } from '../utils/prepareNodes';
import Node from './Node'
import './index.css'

interface Props {
    nodes: LevelsMap | undefined
}
const index = ({nodes}: Props) => {
    return (
        <div className='nodes'>
            <div className='level'>
                <Node val={1}/>            
            </div>
        </div>
    );
};

export default index;