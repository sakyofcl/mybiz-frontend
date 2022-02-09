import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import type from "../../constant/type";
import api from "../../constant/api";


class UserFilter extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:{
                name:'',
                email:'',
                phone:'',
                status:'',
                verified:''
            }
        }
        this.handleFilter=this.handleFilter.bind(this);
        this.setData=this.setData.bind(this);
    }

    handleFilter(e){
        let current=e.target.dataset.name;
        let val=e.target.value?e.target.value:'';
        const {STORE_USER}=type;
        const {dispatch}=this.props;

        switch (current) {
            case "name":
                this.setState(this.setData("name",val));
                break;
            case "email":
                this.setState(this.setData("email",val));
                break;
            case "phone":
                this.setState(this.setData("phone",val));
                break;
            case "status":
                this.setState( this.setData("status",val.toLowerCase()) );
                break;
            case "verified":
                this.setState( this.setData("verified",val) );
                break;
            case "reset":
                this.setState(
                    Object.assign({},this.state,{
                        
                        data:{
                            name:'',
                            email:'',
                            phone:'',
                            status:'',
                            verified:''
                        }
                        
                    })
                )
                

                axios.get(api.getUser).then((res)=>{
                    if(res.data.status){
                        const {data,total,to,per_page,current_page,last_page}=res.data.data;
                        dispatch({
                            type:STORE_USER,
                            payload:{
                                data:data,
                                totData:total,
                                currentData:to,
                                perPage:per_page,
                                currentPage:current_page,
                                lastPage:last_page,
                                fetchData:true,                         
                            }
                        })
                        
                    }
                })
                break;
            case "filter":
                let dataKey=Object.keys(this.state.data);
                let finalData={};
                let param="";
                

                for (let i = 0; i < dataKey.length; i++) {
                    if( this.state.data[dataKey[i]]!=="" ){
                        finalData[dataKey[i]]=this.state.data[dataKey[i]]
                    }
                }


                if(Object.keys(finalData).length>0){
                    for(const [key,value] of Object.entries(finalData) ){
                        param+="&"+key+"="+value;
                    }
                    axios.get(api.getUser+"?type=filter"+param).then((res)=>{
                        if(res.data.status){
                            
                            const {data,total,to,per_page,current_page,last_page}=res.data.data;
                            dispatch({
                                type:STORE_USER,
                                payload:{
                                    data:data,
                                    totData:total,
                                    currentData:to,
                                    perPage:per_page,
                                    currentPage:current_page,
                                    lastPage:last_page,
                                    fetchData:true,                         
                                }
                            })
                            
                        }
                    })
                }
                else{
                    /*

                    axios.get(api.getUser+"?page="+users.currentPage).then((res)=>{
                        if(res.data.status){
                            const {data,total,to,per_page,current_page,last_page}=res.data.data;
                           
                            dispatch({
                                type:STORE_USER,
                                payload:{
                                    data:data,
                                    totData:total,
                                    currentData:to,
                                    perPage:per_page,
                                    currentPage:current_page,
                                    lastPage:last_page,
                                    fetchData:true,                         
                                }
                            })
                            
                        }
                            
                    })
                    */

                    console.log("nothing todo")
                }

                break;
            default:
                break;
        }
    }

    componentDidUpdate(){
        console.log(this.state.data);
    }

    setData(key,data){
        return Object.assign({},this.state,{
            data:{
                ...this.state.data,
                [key]:data,
            }
        })
    }

    render(){
        const {data}=this.state;
        return(
            <div className="filter-ui overflow-auto">
                <div className="filter-item">
                    <span>name</span>
                    <input type="text" defaultValue={data.name} data-name="name" class="form-control" onKeyUp={(e)=>{this.handleFilter(e)}}/>
                </div>
                <div className="filter-item">
                    <span>email</span>
                    <input type="text" defaultValue={data.email} data-name="email" class="form-control" onKeyUp={(e)=>{this.handleFilter(e)}}/>
                </div>
                <div className="filter-item">
                    <span>phone</span>
                    <input type="text" defaultValue={data.phone} data-name="phone" class="form-control" onKeyUp={(e)=>{this.handleFilter(e)}}/>
                </div>
                            
                <div className="filter-item">
                    <span>status</span>
                    <select class="form-select" value={data.status} data-name="status" onChange={(e)=>{this.handleFilter(e)}}>
                        <option value="">Nothing</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
                <div className="filter-item">
                    <span>Verified</span>
                    <select class="form-select" data-name="verified" value={data.verified} onChange={(e)=>{this.handleFilter(e)}}>
                        <option value="">Nothing</option>
                        <option value="1">Verified</option>
                        <option value="0">UnVerified</option>
                    </select>
                </div>
                <div className="filter-item flex-row">
                    <button type="button" class="btn btn-primary" data-name="filter" onClick={(e)=>{this.handleFilter(e)}}>
                        <ion-icon name="filter-sharp" data-name="filter"></ion-icon>
                    </button>
                    <button type="button" class="btn btn-danger" data-name="reset" onClick={(e)=>{this.handleFilter(e)}}>
                        <ion-icon name="sync" data-name="reset"></ion-icon>
                    </button>
                </div>
                            
            </div>
        )
    }
}


//connect redux store for reading data from global store.
const mapStateToProps=(state)=>{
    return{
        users:state.users
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        dispatch:dispatch
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserFilter);