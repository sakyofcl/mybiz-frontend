import React from "react";

class DataTable extends React.Component{
    render(){
        return(
            <div className="data-table">
                {this.props.children}
            </div>
        )
    }
}

class DataTableHead extends React.Component{
    render(){
        const {title,sub}=this.props;
        return(
            <div className="data-table-head">
                <div className="rhead">
                    <span className="rMainTitle uncopy">{title}</span>
                    <span className="rSubTitle uncopy">{sub}</span>
                </div>
                <div className="lhead">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class DataTableFooter extends React.Component{
    render(){
        return(
            <div className="data-table-footer">
                {this.props.children}
            </div>
        )
    }
}

class DataTableBody extends React.Component{
    render(){
        return(
            <div className="data-table-body">
                {this.props.children}
            </div>
        )
    }
}

class Table extends React.Component{
    render(){
        return(
            <div className="table-responsive">
                <table className="table">
                    {this.props.children}
                </table>
            </div>
        )
    }
}
class TableHead extends React.Component{
    constructor(props){
        super(props)
        this.state={
            head:this.props.head.split(",")
        }
    }
    
    render(){
        const {head}=this.state;

        return(
            <thead>
                <tr>
                    {
                        head.map((v,i)=>{
                            return(
                                <th key={i}><div className="th">{v}</div></th>
                            )
                        })
                    }
                </tr>
            </thead>
        )
    }
}
class TableBody extends React.Component{
    render(){
        return(
            <tbody>
                {this.props.children}
            </tbody>
        )
    }
}
class TableRaw extends React.Component{
    render(){
        return(
            <tr>
                {this.props.children}
            </tr>
        )
    }
}
class TableData extends React.Component{
    render(){
        return(
            <td >
                <div className="td">
                    {this.props.children}
                </div>
            </td>
        )
    }
}
export {DataTable,DataTableHead,DataTableFooter,DataTableBody,TableHead,Table,TableBody,TableRaw,TableData};