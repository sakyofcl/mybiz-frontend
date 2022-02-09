import type from '../../constant/type';


let store = {
    feature:[]
};

const cars=(state=store,action)=>{
    const {STORE_FEATURE}=type;
    
    switch(action.type){
        case STORE_FEATURE:
           const {feature}=action.payload
            return Object.assign({},state,{
                feature:feature
            });
        default:
            return state;
    }
}

export {cars};