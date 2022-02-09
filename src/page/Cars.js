import React from "react";
import { connect } from "react-redux";
import {DataTable,DataTableHead,DataTableBody} from "../components/DataTable";
import axios from "axios";
import api from "../constant/api";
import Divider from '../components/Divider';
import type from "../constant/type";
class Cars extends React.Component{
    constructor(props){
        super(props)
        this.state={
            brand:'',
            feature:'',
            allBrand:[],
            allType:[],
            model:'',
            modelBrand:'',
            modelData:{
                drive_type:'',
                engine_size:'',
                transmission:'',
                fuel_type:'',
                fuel_capacity:'',
                door:'',
                brand_id:'',
                model_name:'',
                type:''
            }
        }

        this.handleModelData=this.handleModelData.bind(this);
        
    }

    componentDidMount(){
        const {dispatch}=this.props;
        axios.get(api.getBrand).then((res)=>{
            this.setState(
                Object.assign({},this.state,{
                    allBrand:res.data.data,
                    modelData:{
                        ...this.state.modelData,
                        brand_id:res.data.data[0]?res.data.data[0].brand_id:''
                    }
                })
            )
            console.log(this.state.allBrand);
        })

        axios.get(api.getBodyType).then((res)=>{
            this.setState(
                Object.assign({},this.state,{
                    allType:res.data.data
                })
            )
            console.log(this.state.allType);
        })

        axios.get(api.getCarFeature).then((res)=>{
            
            if(res.data.status){
                dispatch({
                    type:type.STORE_FEATURE,
                    payload:{
                        feature:res.data.data
                    }
                })
                
            }
            
        })

    }

    

    
 

    handleModelData(e){
        let current=e.target.dataset.name;
        let val=e.target.value?e.target.value:false;
        const regxNo = /^\d*(\.\d+)?$/;
        switch (current) {
            case 'brand_id':
                const brand_id=val.toLowerCase();
                this.setState(this.storeHandleModelData(brand_id,'brand_id'));
                
                break;
            case 'model_name':
                this.setState(this.storeHandleModelData(val,'model_name'));
                break;
            case 'engine_size':
                if(regxNo.test(val)){
                    this.setState(this.storeHandleModelData(val,'engine_size'))
                }
                break;
            case 'fuel_capacity':
                if(regxNo.test(val)){
                    this.setState(this.storeHandleModelData(val,'fuel_capacity'))
                }
                
                break;
            case 'type':
                const type=val?val.toLowerCase():'';
                this.setState(this.storeHandleModelData(type,'type'));
                break;
            case 'drive_type':
                const drive_type=val?val.toLowerCase():'';
                this.setState(this.storeHandleModelData(drive_type,'drive_type'));
                break;
            case 'transmission':
                const transmission=val?val.toLowerCase():'';
                this.setState(this.storeHandleModelData(transmission,'transmission'));
                break;
            case 'fuel_type':
                const fuel_type=val?val.toLowerCase():'';
                this.setState(this.storeHandleModelData(fuel_type,'fuel_type'));
                break;
            case 'door':
                const door=val?val.toLowerCase():'';
                this.setState(this.storeHandleModelData(door,'door'));
                break;
            
            default:
                break;
        }
        
    }

    createBrand(e){
        if(this.state.brand){
            axios.post(api.createBrand,{brand:this.state.brand}).then((res)=>{
                console.log(res.data);
                if(res.data.status){
                    axios.get(api.getBrand).then((res)=>{
                        this.setState(
                            Object.assign({},this.state,{
                                allBrand:res.data.data,
                                modelData:{
                                    ...this.state.modelData,
                                    brand_id:res.data.data[0]?res.data.data[0].brand_id:''
                                }
                            })
                        )
                        
                    })
                }
            })
        }
    }

    storeHandleModelData(data,key){
        return Object.assign({},this.state,{
            modelData:{
                ...this.state.modelData,
                [key]:data,
            }
        })
    }
    saveCarModel(e){
        const {brand_id,model_name}=this.state.modelData;
        if(brand_id && model_name){
            axios.post(api.createModel,this.state.modelData).then((res)=>{
                if(res.data.status){
                    console.log("ok");
                }
            })
        }
        else{
            console.log('required data not fill');
        }
    }

    saveCarFeatures(e){
        const {dispatch}=this.props;
        if(this.state.feature){
            axios.post(api.createFeature,{feature:this.state.feature}).then((res)=>{
                if(res.data.status){
                    axios.get(api.getCarFeature).then((res)=>{
            
                        if(res.data.status){
                            dispatch({
                                type:type.STORE_FEATURE,
                                payload:{
                                    feature:res.data.data
                                }
                            })
                            
                        }
                        
                    })
                    
                }
            })
        }
    }

    render(){
        const {allBrand,modelData,allType}=this.state;
        const {cars}=this.props;
        console.log(modelData);
        return(
            <div>
                
                <DataTable>
                    <DataTableHead title="Manage cars"/>
                    <DataTableBody>
                        <div className="w-100 h-100 d-flex flex-column" style={{minHeight:285}}>
                            <div className="w-100 d-flex flex-column">

                                <div class="card bg-transparent">
                                    <div class="card-header  text-white" style={{fontWeight:'bold',letterSpacing:1}}>
                                        CREATE BRAND 
                                    </div>
                                    <div class="card-body">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Brand Name</span>
                                            <input type="text" className="form-control bg-dark border-0 text-white" placeholder="Enter brand name."
                                                onKeyUp={(e)=>{
                                                    this.setState(
                                                        Object.assign({},this.state,{
                                                            brand:e.target.value
                                                        })
                                                    )
                                                }}
                                            />
                                            <button class="btn btn-danger" type="button" style={{fontWeight:'bold',letterSpacing:1}} onClick={(e)=>{this.createBrand(e)}}>CREATE</button>
                                        </div>
                                    </div>
                                </div>

                                <Divider/>

                                <div class="card bg-transparent">
                                    <div class="card-header  text-white" style={{fontWeight:'bold',letterSpacing:1}}>
                                        CREATE MODEL 
                                    </div>
                                    <div class="card-body">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Brand</span>
                                            <select class="form-select bg-dark text-white border-0" data-name="brand_id" onChange={(e)=>{this.handleModelData(e)}}>
                                                { allBrand.map( v => <option value={v.brand_id}>{v.brand_name}</option> ) }
                                            </select>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Model Name</span>
                                            <input type="text" className="form-control bg-dark border-0 text-white" placeholder="Enter Model name." data-name="model_name" onKeyUp={(e)=>{this.handleModelData(e)}}/>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Engine Size (CC)</span>
                                            <input type="text" className="form-control bg-dark border-0 text-white"  placeholder="Enter Engine size." data-name="engine_size" onKeyUp={(e)=>{this.handleModelData(e)}}/>
                                        </div>
                                        
                                        
                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Fuel Capacity (Litre)</span>
                                            <input type="text" className="form-control bg-dark border-0 text-white" placeholder="Enter Fuel capacity." data-name="fuel_capacity" onKeyUp={(e)=>{this.handleModelData(e)}}/>
                                        </div>


                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Body Type</span>
                                            <select class="form-select bg-dark text-white border-0" data-name="type" onChange={(e)=>{this.handleModelData(e)}}>
                                                <option value="">Select Body Type</option>
                                                { allType.map( v => <option value={v.type_id}>{v.type_name}</option> ) }
                                            </select>
                                        </div>


                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Drive Type</span>

                                            <select class="form-select bg-dark text-white border-0" data-name="drive_type" onChange={(e)=>{this.handleModelData(e)}}>
                                                <option value="">Select Drive Type</option>
                                                <option value="frontwheel">Front Wheel Drive</option>
                                                <option value="rearwheel">Rear Wheel Drive</option>
                                                <option value="awd_4wd">AWD/4WD</option>
                                            </select>
                                                                                                  
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Transmission Type</span>
                                            <select class="form-select bg-dark text-white border-0" data-name="transmission" onChange={(e)=>{this.handleModelData(e)}}>
                                                <option value="">Select Transmission Type</option>
                                                <option value="automatic">Automatic</option>
                                                <option value="manual">Manual</option>
                                                <option value="semi-automatic">Semi-Automatic</option>
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Fuel Type</span>
                                            <select class="form-select bg-dark text-white border-0" data-name="fuel_type" onChange={(e)=>{this.handleModelData(e)}}>
                                                <option value="">Select Fuel Type</option>
                                                <option value="diesel">Diesel</option>
                                                <option value="hybrid">Hybrid</option>
                                                <option value="petrol">Petrol</option>
                                                <option value="electric">Electric</option>
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Doors</span>
                                            <select class="form-select bg-dark text-white border-0" data-name="door" onChange={(e)=>{this.handleModelData(e)}}>
                                                <option value="">Select Doors</option>
                                                <option value="2">2-Doors</option>
                                                <option value="3">3-Doors</option>
                                                <option value="4">4-Doors</option>
                                                <option value="5">5-Doors</option>
                                            </select>                                                                                                               
                                        </div>


                                        
                                        
                                        
                                        

                                        <div className="w-100 d-flex justify-content-end">
                                            <button class="btn btn-danger" type="button" style={{fontWeight:'bold',letterSpacing:1}} onClick={(e)=>{this.saveCarModel(e)}}>CREATE</button>
                                        </div>

                                    </div>
                                </div>

                                <Divider/>

                                <div class="card bg-transparent">
                                    <div class="card-header  text-white" style={{fontWeight:'bold',letterSpacing:1}}>
                                        CREATE FEATURES
                                    </div>
                                    <div class="card-body">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent text-white border-0" style={{width:'20%'}}>Features Name</span>
                                            <input type="text" className="form-control bg-dark border-0 text-white" placeholder="Enter features name."
                                                onKeyUp={(e)=>{
                                                    this.setState(
                                                        Object.assign({},this.state,{
                                                            feature:e.target.value
                                                        })
                                                    )
                                                }}
                                            />
                                            <button class="btn btn-danger" type="button" style={{fontWeight:'bold',letterSpacing:1}} onClick={(e)=>{this.saveCarFeatures(e)}}>CREATE</button>
                                        </div>

                                        <div className="d-flex flex-wrap w-100">
                                               {
                                                   cars.feature.map((v)=>{
                                                       return(
                                                        <div style={{fontWeight:'bold',letterSpacing:1}} className="p-1 curve text-danger m-1 d-flex justify-content-center align-items-center">{v.feature_name}</div>
                                                       )
                                                   })
                                               } 
                                           
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </DataTableBody>
                </DataTable>
            </div>
        )
    }
}


//connect redux store for reading data from global store.
const mapStateToProps=(state)=>{
    return{
        cars:state.cars
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        dispatch:dispatch
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Cars);