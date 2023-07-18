import './index.css'

interface Props {
    val: number
}

const index = ({ val }: Props) => {
    return (
        <div className='circle'><p>{val}</p></div>
    );
};

export default index;