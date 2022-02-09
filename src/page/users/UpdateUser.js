import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import axios from "axios";
import api from "../../constant/api";
import type from "../../constant/type";

class UpdateUser extends React.Component{
    constructor(props){
        super(props)
        const {users:{ userUpdateData:{name,email,phone,verified,userStatus,userType,uid} }}=this.props;
        this.state={
            userUpdateData:{
                uid:uid,
                name:name,
                email:email,
                phone:"0"+phone.toString(),
                verified:verified,
                userStatus:userStatus,
                password:'',
                userType:userType,
                validation:{
                    name:name?true:false,
                    email:email?true:false,
                    phone:phone?true:false,
                    password:true,
                    verified:true,
                    userStatus:true,
                    userType:true
                }
            },
            deluid:''
        }

        this.userCreateDataValidation=this.userCreateDataValidation.bind(this);
        this.setDataAndStatus=this.setDataAndStatus.bind(this);
        console.log("work")
    }   

    componentDidMount(){
        console.log(this.state.userCreateData);
    }


    userCreateDataValidation(e){
        let current=e.target.dataset.name;
        let val=e.target.value?e.target.value:false;
    

        
        switch (current) {
            case "name":
                if(val){
                    this.setState(this.setDataAndStatus(val,true,"name"))
                }
                else{
                    this.setState(this.setDataAndStatus(val,false,"name"))
                }
                
                
                break;
            case "email":
                if(val){
                    const regx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                    if(regx.test(val)){
                        this.setState(this.setDataAndStatus(val,true,"email"))
                    }
                    else{
                        this.setState(this.setDataAndStatus(val,false,"email"))
                    }
                    
                }
                else{
                    this.setState(this.setDataAndStatus(val,false,"email"))
                }
                
                break;
            case "phone":
                if(val){
                    const regxNo = /^[0]?[0]\d{9}$/;
                    if(regxNo.test(val)){
                        this.setState(this.setDataAndStatus(val,true,"phone"))
                    }
                    else{
                        this.setState(this.setDataAndStatus(val,false,"phone"))
                    }
                }
                else{
                    this.setState(this.setDataAndStatus(val,false,"phone"))
                }
                
                break;
            case "password":
                this.setState(this.setDataAndStatus(val,true,"password"))
                
                break;
            case "userStatus":
                const userStatus=val.toLowerCase();
                this.setState(this.setDataAndStatus(userStatus.toLowerCase(),true,"userStatus"))
                break;
            case "userType":
                const userType=val.toLowerCase();
                this.setState(this.setDataAndStatus(userType.toLowerCase(),true,"userType"))
                break;
            case "verified":
                if(this.state.userUpdateData.verified==="1"){
                    this.setState(this.setDataAndStatus(val,true,"verified"))
                    break;
                }
                else if(this.state.userUpdateData.verified==="0"){
                    this.setState(this.setDataAndStatus(val,true,"verified"))
                    break;
                }
                else{
                    break;
                }
                
            default:
                break;
        }
        

        
    }

    handleUpdateSave(e){
        const {userUpdateData:{uid,name,phone,password,verified,email,userType,userStatus,validation}}=this.state;
        let validationKey=Object.keys(validation);
        let ok=true;

        for (let i = 0; i < validationKey.length; i++) {
            
            if( validation[validationKey[i]]===false ){
                ok=false;
                break;
            }
        }

        if(ok){

            const {dispatch,users,handlePopup}=this.props;

            const finalData={
                uid:uid,
                name:name,
                phone:phone,
                password:password,
                verified:verified,
                email:email,
                userType:userType,
                userStatus:userStatus
            }
            console.log(finalData)
            
            axios.post(api.updateUser,finalData).then((res)=>{
                if(res.data.status){

                    axios.get(api.getUser+"?page="+users.currentPage).then((res)=>{
                        if(res.data.status){
                            const {data,total,to,per_page,current_page,last_page}=res.data.data;
                           
                            dispatch({
                                type:type.STORE_USER,
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

                    handlePopup('close','userUpdatePopup');
                }
            })
            

        }
        
    }

    setDataAndStatus(data,status,key){
        return Object.assign({},this.state,{
            userUpdateData:{
                ...this.state.userUpdateData,
                [key]:data,
                validation:{
                    ...this.state.userUpdateData.validation,
                    [key]:status
                }
            }
        })
    }

    handleDelete(e){
        const uid=this.state.deluid;
        const {dispatch,users,handlePopup}=this.props;

        if(uid){
            
            axios.get(api.deleteUser+"?uid="+uid).then((res)=>{
                if(res.data.status){
                    axios.get(api.getUser+"?page="+users.currentPage).then((res)=>{
                        if(res.data.status){
                            const {data,total,to,per_page,current_page,last_page}=res.data.data;
                        
                            dispatch({
                                type:type.STORE_USER,
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

                    handlePopup('close','userUpdatePopup');
                }
                else{
                    console.log("proplem")
                }
            })
            
        }
    }


    render(){
        const {userUpdateData,userUpdateData:{validation}}=this.state;
        console.log(userUpdateData)

        
        return(
            <div className="w-100 d-flex flex-column" style={{minHeight:200}}>

                <div className="input-group mb-3">
                    <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>User Id</span>
                    <input type="text" className="form-control bg-dark border-0 text-white" value={userUpdateData.uid} readOnly/>
                    <span className="input-group-text bg-transparent  border-0" style={{fontWeight:'bold',width:'10%'}}>
                        <AlertShow ok={true}/>
                    </span>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>Name</span>
                    <input type="text" className="form-control bg-dark border-0 text-white" defaultValue={userUpdateData.name} data-name="name" onKeyUp={(e)=>{this.userCreateDataValidation(e)}}/>

                    <span className="input-group-text bg-transparent  border-0" style={{fontWeight:'bold',width:'10%'}}>
                        <AlertShow ok={validation.name}/>
                    </span>
                </div>

                <div className="input-group mb-3 ">
                    <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>Email Address</span>
                    <input type="text" className="form-control bg-dark text-white border-0" defaultValue={userUpdateData.email} data-name="email" onKeyUp={(e)=>{this.userCreateDataValidation(e)}}/>

                    <span className="input-group-text  bg-transparent  border-0" style={{fontWeight:'bold',width:'10%'}}>
                        <AlertShow ok={validation.email}/>
                    </span>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>Phone Number</span>
                    <input type="text" className="form-control bg-dark text-white  border-0" defaultValue={userUpdateData.phone } data-name="phone" onKeyUp={(e)=>{this.userCreateDataValidation(e)}}/>

                    <span className="input-group-text  bg-transparent  border-0" style={{fontWeight:'bold',width:'10%'}}>
                        <AlertShow ok={validation.phone}/>
                    </span>
                </div>

                <div className="input-group mb-3 ">
                    <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>Verified User</span>
                            
                    <div className="w-50 bg-dark d-flex align-items-center">

                        <div class="p-0 m-0 d-flex p-1">
                            <Form.Check type="radio" name="verified" defaultValue="0" defaultChecked={userUpdateData.verified==="0"?true:false} data-name="verified" onClick={(e)=>{this.userCreateDataValidation(e)}} />
                            <label class="form-check-label text-white" for="inlineRadio2">Not Verified</label>
                        </div> 
                        <div class="p-0 m-0  d-flex p-1">
                            <Form.Check type="radio" name="verified" defaultValue="1" defaultChecked={userUpdateData.verified==="1"?true:false} data-name="verified" onClick={(e)=>{this.userCreateDataValidation(e)}} />
                            <label class="form-check-label text-white" for="inlineRadio2">Verified</label>
                        </div>
                                
                    </div>
                            

                    <span className="input-group-text  bg-transparent  border-0  d-flex justify-content-end" style={{fontWeight:'bold',width:'10%'}}>
                        <AlertShow ok={validation.verified}/>
                    </span>
                </div>

                <div className="input-group mb-3 ">
                    <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>User Status</span>
                    <select class="form-select bg-dark text-white border-0" defaultValue={userUpdateData.userStatus}  name="userStatus" data-name="userStatus" onChange={(e)=>{this.userCreateDataValidation(e)}}>
                        <option defaultValue="active" selected={userUpdateData.userStatus==="active"?true:false}>Active</option>
                        <option defaultValue="suspended" selected={userUpdateData.userStatus==="suspended"?true:false}>Suspended</option>
                        <option defaultValue="blocked" selected={userUpdateData.userStatus==="blocked"?true:false}>Blocked</option>
                    </select>
                    <span className="input-group-text bg-transparent border-0" style={{fontWeight:'bold',width:'10%'}}>
                        <AlertShow ok={validation.userStatus}/>
                    </span>
                </div>


                <div className="input-group mb-3">
                    <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>User Type</span>
                    <select class="form-select bg-dark text-white border-0" name="userType" defaultValue={userUpdateData.userType} data-name="userType" onChange={(e)=>{this.userCreateDataValidation(e)}}>
                        <option defaultValue="member" selected={userUpdateData.userType==="member"?true:false} >Member</option>
                        <option defaultValue="dealer" selected={userUpdateData.userType==="dealer"?true:false}>Dealer</option>
                    </select>
                    <span className="input-group-text bg-transparent border-0" style={{fontWeight:'bold',width:'10%'}}>
                        <AlertShow ok={validation.userType}/>
                    </span>
                </div>

                        

                <div className="input-group mb-3 ">
                    <span className="input-group-text bg-transparent text-white border-0"  style={{width:'40%'}}>Password</span>
                    <input type="text" className="form-control bg-dark text-white border-0"  data-name="password" onKeyUp={(e)=>{this.userCreateDataValidation(e)}}/>

                    <span className="input-group-text  bg-transparent  border-0" style={{fontWeight:'bold',width:'10%'}}>
                        
                    </span>
                </div>
                        
                <div className="w-100 d-flex justify-content-between align-items-center mt-3">

                    <div class="input-group w-50">
                        <button className="btn btn-danger h-100 curve" onClick={(e)=>{this.handleDelete(e)}} style={{fontSize:15,fontWeight:'bold',letterSpacing:1}}>DELETE</button>
                        <input type="text" class="form-control border-0 bg-dark text-white" placeholder="Ender user id" onKeyUp={(e)=>{
                            this.setState(
                                Object.assign({},this.state,{
                                    deluid:e.target.value
                                })
                            )
                        }}/>
                    </div>

                    <button className="btn btn-success h-100 curve" onClick={(e)=>{this.handleUpdateSave(e)}} style={{fontSize:15,fontWeight:'bold',letterSpacing:1}}>UPDATE USER</button>
                </div>
                        
            </div>
        )
    }
}



const AlertShow=(props)=>{
    if(props.ok){
        return <span className="text-success"><ion-icon name="checkmark-outline"></ion-icon></span>
    }
    else{
        return <span className="text-danger"><ion-icon name="alert-outline"></ion-icon></span>
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



export default connect(mapStateToProps,mapDispatchToProps)(UpdateUser);