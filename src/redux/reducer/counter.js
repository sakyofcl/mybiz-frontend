const counter=(state={v:0},action)=>{
    switch(action.type){
        case "INC":
            return {v:state.v+1}
        case "DEC":
            return {v:state.v-1}
        default:
            return state;
    }
}

export {counter}