import React from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory,Link,IndexRoute,Redirect,browserHistory} from 'react-router';

import Create from '../Component/Create';
import Me from '../Component/Me';
import Avatar from '../Component/Me/avatar/'
import IndexList from '../Component/IndexList'
import App from '../Component/main'
import Login from '../Component/Login'

class RouteConfig extends React.Component{
    render(){
        return(
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute  component={IndexList}/>
                    <Route path="/indexlist" component={IndexList} />
                    <Route path="/create" component={Create} />
                    <Route path="/me" component={Me}/>
                    {/*<Route path="/me/avatar" component={Avatar}/>*/}
                    <Route path="/login" component={Login} />
                </Route>
            </Router>
        )
    }
}

export default RouteConfig;

