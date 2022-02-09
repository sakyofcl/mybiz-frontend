import type from '../../constant/type';

//get data from local storage
let isOk=sessionStorage.getItem('auth')?sessionStorage.getItem('auth'):false;
let token=isOk?sessionStorage.getItem('token'):false;
let name=isOk?sessionStorage.getItem('name'):false;

let store = {
    token:token,
    isOk:isOk,
    name:name,
    role:'admin'
};

const auth=(state=store,action)=>{
    const {LOG_IN,LOG_OUT}=type;
    
    switch(action.type){
        case LOG_IN:
           const {isOk,token,name}=action.payload
            return Object.assign({},state,{
                isOk:isOk,
                token:token,
                name:name
            });
        case LOG_OUT:
            sessionStorage.clear();
            return Object.assign({},state,{
                isOk:false,
                token:false,
                name:false
            });
            
        default:
            return state;
    }
}

export {auth};