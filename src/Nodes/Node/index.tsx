import './index.css'

interface Props {
    val: string
}

const index = ({ val: _val }: Props) => {
    const val = _val.trim()
    const truncatedVal = val.trim().length > 2 ? val.slice(0, 2) + '..' : val;
    return (
        <div className='circle'><p>{truncatedVal}</p></div>
    );
};

export default index;