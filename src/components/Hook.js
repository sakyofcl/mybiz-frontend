import {useNavigate} from 'react-router-dom';

const Hook=(props)=>{
    const Ele=props.ele,navigate=useNavigate();
    return <Ele navigate={navigate}/>
}

export default Hook;