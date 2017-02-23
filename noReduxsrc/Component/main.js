import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router'
import RouteConfig from '../Config/route-config'
let styles = {
    pre:{
        listStyle:"none",
        float:'left',
        width:'150px',
        textAlign:"center",
    }
}

function create() {
  $.closePanel();
  setTimeout(()=> {
    window.location.hash = 'create'
  }, 800)
}

let nav =()=>{
    return(

        <nav className="bar bar-tab">
            <Link className="tab-item" activeClassName="active" to="indexList">
                <span className="icon icon-home"></span>
                <span className="tab-label">主页</span>
            </Link>
            <Link className="tab-item" activeClassName="active" onClick={create}>
                <span className="icon icon-edit"></span>
                <span className="tab-label">发表</span>
            </Link>
            <Link className="tab-item open-panel" data-panel="#panel-left-demo" activeClassName="active">
                <span className="icon icon-me"></span>
                <span className="tab-label">我</span>
            </Link>
        </nav>

    )
}
class App extends React.Component{
    render(){
        return(
            <div data-log="one">
                <div data-log="two">
                    {this.props.children}
                </div>
                <div style={{position:"absolute",height:"50px",width:"100%",bottom:"0px",zIndex:'2001'}}>{nav()}</div>
            </div>

        )
    }
}

export default App;
