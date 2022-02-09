import React from "react";

class Badge extends React.Component{
    
    render(){
        const {title,cls}=this.props;
        return(
            <span className={`badge ${cls} custom-badge`}>{title}</span>
        )
    }
}

export default Badge;