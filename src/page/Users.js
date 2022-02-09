import React from "react";
import { connect } from "react-redux";
import axios from "axios";
//components
import {DataTable,DataTableHead,DataTableFooter,DataTableBody,Table,TableHead,TableBody,TableRaw,TableData} from "../components/DataTable";
import PopUp from '../components/Popup';
import Badge from '../components/Badge';
import UserFilter from "./users/UserFilter";
import UpdateUser from './users/UpdateUser';
//constant
import api from '../constant/api';
import type from "../constant/type";
//logic
import {handlePopup} from '../logic/popup';
class Users extends React.Component{

    constructor(props){
        super(props)
        this.state={
            userCreatePopup:false,
            userCreateData:{
                name:'',
                email:'',
                phone:'',
                verified:'1',
                userStatus:'active',
                password:'',
                confirmPassword:'',
                userType:'member',
                validation:{
                    name:false,
                    email:false,
                    phone:false,
                    verified:true,
                    userStatus:true,
                    password:false,
                    confirmPassword:false,
                    userType:true
                }
            },
            userUpdateData:{
                name:'',
                email:'',
                phone:'',
                verified:'1',
                userStatus:'active',
                password:'',
                userType:'member',
            }
            ,
            userUpdatePopup:false
            
        }
        this.userCreateDataValidation=this.userCreateDataValidation.bind(this);
        this.handleChnageUserCreate=this.handleChnageUserCreate.bind(this);
        this.handlePopup=handlePopup.bind(this);
        this.getUpdateInfo=this.getUpdateInfo.bind(this);
    }

    componentDidMount(){
        const {getUser}=api;
        const {STORE_USER}=type;
        const {dispatch}=this.props;
        
        
        axios.get(getUser).then((res)=>{
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
                if(val){
                    this.setState(this.setDataAndStatus(val,true,"password"))
                }
                else{
                    this.setState(this.setDataAndStatus(val,false,"password"))
                }
                
                break;
            case "confirmPassword":
                if(val){
                    if(val===this.state.userCreateData.password){
                        this.setState(this.setDataAndStatus(val,true,"confirmPassword"))
                    }
                    else{
                        this.setState(this.setDataAndStatus(val,false,"confirmPassword"))
                    }
                    
                }
                else{
                    this.setState(this.setDataAndStatus(val,false,"confirmPassword"))
                }
                
                break;
            default:
                break;
        }


        
    }

    handleChnageUserCreate(e){
        let current=e.target.dataset.name;
        let val=e.target.value?e.target.value:false;
        this.setState({});

        console.log(current,val);

        switch (current) {
            case "userStatus":
                this.setState({});
                break;
            case "userType":
                this.setState(this.setDataAndStatus(val,true,"userType"))
                break;
            default:
                break;
        }

    }

    handleCreateSave(e){
        const {userCreateData:{name,phone,password,verified,email,userType,userStatus,validation}}=this.state;
        let validationKey=Object.keys(validation);
        let ok=true;

        for (let i = 0; i < validationKey.length; i++) {
            
            if( validation[validationKey[i]]===false ){
                ok=false;
                break;
            }
        }

        if(ok){

            const {STORE_USER}=type;
            const {dispatch,users}=this.props;

            const finalData={
                name:name,
                phone:phone,
                password:password,
                verified:verified,
                email:email,
                userType:userType,
                userStatus:userStatus
            }

            axios.post(api.createUser,finalData).then((res)=>{
                if(res.data.status){

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

                    this.handlePopup('close','userCreatePopup');
                }
            })

        }
    }

    
    getUpdateInfo(e){
        let uid=e.target.dataset.uid;
        const {dispatch,users:{data}}=this.props;

        let find=data.find((v)=>{
            return v.uid===parseInt(uid);
        });
        
        
        if(find){
            const {uid,name,email,verified,userStatus,userType,phone}=find;
            dispatch(
                {
                    type:type.STORE_UPDATE_USER_DATA,
                    payload:{
                        uid:uid,
                        name:name,
                        email:email,
                        phone:phone,
                        verified:verified,
                        userStatus:userStatus,
                        password:"",
                        userType:userType
                    }
                }
            )
        }

        this.handlePopup('show','userUpdatePopup')
        
        
    }

    setDataAndStatus(data,status,key){
        return Object.assign({},this.state,{
            userCreateData:{
                ...this.state.userCreateData,
                [key]:data,
                validation:{
                    ...this.state.userCreateData.validation,
                    [key]:status
                }
            }
        })
    }


    render(){
        const {users}=this.props;
        const {userCreateData:{validation}}=this.state;
        console.log(this.state.userUpdateData);
        return(
            <div>
                <DataTable>
                    <DataTableHead title="All Users" sub="Date 2021">
                        <button className="btn btn-danger h-100 curve" onClick={(e)=>{this.handlePopup('show','userCreatePopup')} } style={{fontSize:15,fontWeight:'bold',letterSpacing:1}}>CREATE NEW USER</button>
                    </DataTableHead>
                    <DataTableBody>

                        {/*----- FILTER USERS -------*/}
                            <UserFilter/>
                        {/*----- END FILTER -----*/}

                        <Table>
                            <TableHead head="ID,Name,Email,Phone,Type,Status,Verified,Tot,Sold,Active,Action"/>  
                            <TableBody>
                                {
                                    users.data.map((v)=>{
                                        const {uid,name,email,phone,verified,tot,active,sold,userStatus,userType}=v;
                                        return(

                                            <TableRaw key={uid}>
                                                <TableData>{uid}</TableData>
                                                <TableData>{name}</TableData>
                                                <TableData> <span className="text-lowercase">{email}</span></TableData>
                                                <TableData>0{phone}</TableData>
                                                <TableData>{userType}</TableData>
                                                <TableData>
                                                    <span className="text-lowercase">{userStatus}</span>
                                                </TableData>
                                                <TableData>
                                                    
                                                    <Badge title={verified==="1"?"verified":"unverified"} cls={verified==="1"?"bg-success":"bg-danger"} />
                                                </TableData>
                                                <TableData>{tot}</TableData>
                                                <TableData>{sold}</TableData>
                                                <TableData>{active}</TableData>
                                                <TableData>
                                                    <div className="action-wrapper">
                                                        <button type="button" data-uid={uid} class="btn" onClick={(e)=>{
                                                            this.getUpdateInfo(e);
                                                            //this.handlePopup('show','userUpdatePopup')
                                                        }}><ion-icon name="create-outline" data-uid={uid}/></button>
                                                        <button type="button" class="btn"><ion-icon name="eye-outline"></ion-icon></button>
                                                    </div>
                                                </TableData>
                                            </TableRaw>

                                        )
                                    })
                                }
                                
                            </TableBody>
                        </Table>
                    </DataTableBody>
                    <DataTableFooter>

                    </DataTableFooter>
                </DataTable>

                {/*---------------- POPUP COMPONENT ---------------------*/}
                <PopUp show={this.state.userCreatePopup} close={(e)=>{this.handlePopup('close','userCreatePopup')}} title="Create User">
                    <div className="w-100 d-flex flex-column" style={{minHeight:200}}>

                        <div className="input-group mb-3">
                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>Name</span>
                            <input type="text" className="form-control bg-dark border-0 text-white" data-name="name" onKeyUp={(e)=>{this.userCreateDataValidation(e)}} />
                            <span className="input-group-text  bg-transparent  border-0" style={{fontWeight:'bold',width:'10%'}}>

                                {   validation.name?<span className="text-success"><ion-icon name="checkmark-outline"></ion-icon></span>:
                                    <span className="text-danger"><ion-icon name="alert-outline"></ion-icon></span>
                                }
                                
                            </span>
                        </div>
                        <div className="input-group mb-3 ">
                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>Email Address</span>
                            <input type="text" className="form-control bg-dark text-white border-0" data-name="email" onKeyUp={(e)=>{this.userCreateDataValidation(e)}} />
                            <span className="input-group-text  bg-transparent  border-0" style={{fontWeight:'bold',width:'10%'}}>
                                
                                {   validation.email?<span className="text-success"><ion-icon name="checkmark-outline"></ion-icon></span>:
                                    <span className="text-danger"><ion-icon name="alert-outline"></ion-icon></span>
                                }
                            </span>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>Phone Number</span>
                            <input type="text" className="form-control bg-dark text-white  border-0" data-name="phone" onKeyUp={(e)=>{this.userCreateDataValidation(e)}}/>
                            <span className="input-group-text  bg-transparent  border-0" style={{fontWeight:'bold',width:'10%'}}>
                                {   
                                    validation.phone?<span className="text-success"><ion-icon name="checkmark-outline"></ion-icon></span>:
                                    <span className="text-danger"><ion-icon name="alert-outline"></ion-icon></span>
                                }
                            </span>
                        </div>

                        <div className="input-group mb-3 ">
                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>Verified User</span>
                            
                            <div className="w-50 bg-dark d-flex align-items-center">
                                <div class="p-0 m-0  d-flex p-1">
                                    <input class="form-check-input"  style={{marginRight:10}} type="radio"   name="inlineRadioOptions" id="inlineRadio2" value="option2" 
                                        onClick={(e)=>{
                                            this.setState(
                                
                                                Object.assign({},this.state,{
                                                    userCreateData:{
                                                        ...this.state.userCreateData,
                                                        verified:"0",
                                                        validation:{
                                                            ...this.state.userCreateData.validation,
                                                            verified:true
                                                        }
                                                    }
                                                })
            
                                            )
                                        }}
                                       
                                    />
                                    <label class="form-check-label text-white" for="inlineRadio2">Not Verified</label>
                                </div>
                                <div class="p-0 m-0  d-flex p-2">
                                    <input class="form-check-input" style={{marginRight:10}} defaultChecked={true} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"
                                        onClick={(e)=>{
                                            this.setState(
                                
                                                Object.assign({},this.state,{
                                                    userCreateData:{
                                                        ...this.state.userCreateData,
                                                        verified:"1",
                                                        validation:{
                                                            ...this.state.userCreateData.validation,
                                                            verified:true
                                                        }
                                                    }
                                                })
            
                                            )
                                        }} 

                                    />
                                    <label class="form-check-label text-white" for="inlineRadio1">Verified</label>
                                </div>
                                
                            </div>
                            

                            <span className="input-group-text  bg-transparent  border-0  d-flex justify-content-end" style={{fontWeight:'bold',width:'10%'}}>
                                
                                {   validation.verified?<span className="text-success"><ion-icon name="checkmark-outline"></ion-icon></span>:
                                    <span className="text-danger"><ion-icon name="alert-outline"></ion-icon></span>
                                }
                            </span>
                        </div>

                        <div className="input-group mb-3 ">
                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>User Status</span>
                            <select class="form-select bg-dark text-white border-0" name="userStatus" data-name="userStatus" onChange={(e)=>{
                                this.setState(
                                
                                    Object.assign({},this.state,{
                                        userCreateData:{
                                            ...this.state.userCreateData,
                                            userStatus:e.target.value.toLowerCase(),
                                            validation:{
                                                ...this.state.userCreateData.validation,
                                                userStatus:true
                                            }
                                        }
                                    })

                                )
                            }}>
                                <option defaultValue="active">Active</option>
                                <option defaultValue="suspended">Suspended</option>
                                <option defaultValue="blocked">Blocked</option>
                                
                            </select>
                            <span className="input-group-text bg-transparent border-0" style={{fontWeight:'bold',width:'10%'}}>
                                
                                {   validation.userStatus?<span className="text-success"><ion-icon name="checkmark-outline"></ion-icon></span>:
                                    <span className="text-danger"><ion-icon name="alert-outline"></ion-icon></span>
                                }
                            </span>
                        </div>


                        <div className="input-group mb-3">
                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>User Type</span>
                            <select class="form-select bg-dark text-white border-0" name="userType" data-name="userType" onChange={(e)=>{
                                this.setState(
                                
                                    Object.assign({},this.state,{
                                        userCreateData:{
                                            ...this.state.userCreateData,
                                            userType:e.target.value.toLowerCase(),
                                            validation:{
                                                ...this.state.userCreateData.validation,
                                                userType:true
                                            }
                                        }
                                    })

                                )
                            }}>
                                <option defaultValue="member">Member</option>
                                <option defaultValue="dealer">Dealer</option>
                            </select>
                            <span className="input-group-text bg-transparent border-0" style={{fontWeight:'bold',width:'10%'}}>
                                
                                {   validation.userType?<span className="text-success"><ion-icon name="checkmark-outline"></ion-icon></span>:
                                    <span className="text-danger"><ion-icon name="alert-outline"></ion-icon></span>
                                }
                            </span>
                        </div>

                        

                        <div className="input-group mb-3 ">
                            <span className="input-group-text bg-transparent text-white border-0"  style={{width:'40%'}}>Password</span>
                            <input type="text" className="form-control bg-dark text-white border-0" data-name="password" onKeyUp={(e)=>{this.userCreateDataValidation(e)}}/>
                            <span className="input-group-text  bg-transparent  border-0" style={{fontWeight:'bold',width:'10%'}}>
                                
                                {   validation.password?<span className="text-success"><ion-icon name="checkmark-outline"></ion-icon></span>:
                                    <span className="text-danger"><ion-icon name="alert-outline"></ion-icon></span>
                                }
                            </span>
                        </div>
                        <div className="input-group mb-3 ">
                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'40%'}}>Confirm Password</span>
                            <input type="text" className="form-control bg-dark text-white border-0" data-name="confirmPassword" onKeyUp={(e)=>{this.userCreateDataValidation(e)}} />
                            <span className="input-group-text  bg-transparent  border-0 text-center" style={{fontWeight:'bold',width:'10%'}}>
                                
                                {   validation.confirmPassword?<span className="text-success"><ion-icon name="checkmark-outline"></ion-icon></span>:
                                    <span className="text-danger"><ion-icon name="alert-outline"></ion-icon></span>
                                }
                            </span>
                        </div>

                        <div className="w-100 d-flex justify-content-end align-items-center">
                            <button className="btn btn-danger h-100 curve" onClick={(e)=>{this.handleCreateSave(e)}} style={{fontSize:15,fontWeight:'bold',letterSpacing:1}}>CREATE USER</button>
                        </div>
                        

        
                    </div>
                </PopUp>

                <PopUp show={this.state.userUpdatePopup} close={(e)=>{this.handlePopup('close','userUpdatePopup')}} title="Update user">
                    <UpdateUser handlePopup={this.handlePopup}/>
                </PopUp>
                {/*---------------- END POPUP COMPONENT ---------------------*/}


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

export default connect(mapStateToProps,mapDispatchToProps)(Users);