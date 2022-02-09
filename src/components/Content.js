import React from "react";


class Content extends React.Component{
    render(){
        return(
            <div className="content-container">
               {this.props.children}
            </div>
        )
    }
}
export default Content;