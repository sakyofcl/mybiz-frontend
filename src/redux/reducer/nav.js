import type from '../../constant/type';

let store = {
    active:'1'
};

const nav=(state=store,action)=>{
    const {CHANGE_ACTIVE_NAV}=type;
    
    switch(action.type){
        case CHANGE_ACTIVE_NAV:
           const {active}=action.payload;
           console.log(window.location);
            return Object.assign({},state,{
                active:active
            });
        
        default:
            return state;
    }
}

export {nav};