import type from '../../constant/type';

let store = {
    data:[],
    totData:0,
    currentData:0,
    perPage:1,
    currentPage:1,
    lastPage:1,
    fetchData:false,
    userUpdateData:{
        uid:'',
        name:'',
        email:'',
        phone:'',
        verified:'1',
        userStatus:'active',
        password:'',
        userType:'member',
    }
};

const users=(state=store,action)=>{
    const {STORE_USER,STORE_UPDATE_USER_DATA,GET_USER_INFO}=type;
    switch(action.type){
        case STORE_USER:
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
        case STORE_UPDATE_USER_DATA:
            const {uid,name,email,phone,verified,userStatus,password,userType}=action.payload;
            return Object.assign({},state,{
                userUpdateData:{
                    ...state.userUpdateData,
                    uid:uid,
                    name:name,
                    email:email,
                    phone:phone,
                    verified:verified,
                    userStatus:userStatus,
                    password:password,
                    userType:userType,
                }
            });

        default:
            return state;
    }
        
}

export {users}