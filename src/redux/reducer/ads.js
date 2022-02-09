import type from '../../constant/type';

let store = {
    data:[],
    totData:0,
    currentData:0,
    perPage:1,
    currentPage:1,
    lastPage:1,
    fetchData:false
};

const ads=(state=store,action)=>{
    const {STORE_ADS,DELETE_ADS,CHANGE_ADS_STATUS}=type;
    switch(action.type){
        case STORE_ADS:
            const {data,totData,currentData,perPage,currentPage,lastPage,fetchData}=action.payload;
            return Object.assign({},state,{
                data:data,
                totData:totData,
                currentData:currentData,
                perPage:perPage,
                currentPage:currentPage,
                lastPage:lastPage,
                fetchData:fetchData
            });
        case DELETE_ADS:
            const {cid}=action.payload;
            
            const newData= state.data.filter((v)=>{
                return v.cid!==parseInt(cid);
            })
            
            return Object.assign({},state,{
                data:newData
            })
        case  CHANGE_ADS_STATUS:
            let carId=action.payload.cid;
            let carStatus=action.payload.status;
            
            const changedCarStatus= state.data.filter((v)=>{
                if(v.cid===carId){
                    v.status=carStatus;
                }
                return v;
            })
            console.log(changedCarStatus);

            return Object.assign({},state,{
                data:changedCarStatus
            })

        default:
            return state;
    }
        
}

export {ads}