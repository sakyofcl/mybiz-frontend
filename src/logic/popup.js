
function handlePopup(type='close',key){
    if(type ==="close"){
        let newObj= Object.assign({},this.state,{
            [key]:false
        })
        this.setState(newObj);
    }
    else if(type ==="show"){
        let newObj= Object.assign({},this.state,{
            [key]:true
        })
        this.setState(newObj);
    }
}
export {handlePopup}