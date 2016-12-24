import React from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory,Link,IndexRoute,Redirect,browserHistory} from 'react-router';






const IndexList  = {
    path:'indexlist',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            return cb(null,require('../Component/IndexList'))
        },'indexList')
    }
}

const Login = {
    path:'/login',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            return cb(null,require('../Component/Login'))
        },'login')
    }
}

const ArticleDetail = {
    path:'/indexList/:id',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            return cb(null,require('../Component/articleDetail'))
        },'articleDetail')
    }
}

const Create = {
    path:'create',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            return cb(null,require('../Component/Create'))
        },'create')
    },
}

const CreateDetail = {
    path:'create/:id',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            return cb(null,require('../Component/Create'))
        },'createDetail')
    },
}



const Me = {
    path:'/me',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            return cb(null,require('../Component/Me'))
        },'me')
    }
}

const MyArticle = {
    path:'myArticle',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            return cb(null,require('../Component/Me/myArticle'))
        },'myArticle')
    }
}


module.exports = {
    IndexList:IndexList,
    Login:Login,
    ArticleDetail:ArticleDetail,
    Create:Create,
    Me:Me,
    MyArticle:MyArticle,
    CreateDetail:CreateDetail
};



// import Create from '../Component/Create';
// import Me from '../Component/Me';
// import IndexList from '../Component/IndexList'
// import App from '../Component/main'
// import Login from '../Component/Login'
// import ArticleDetail from '../Component/articleDetail/'
// import MyArticle from '../Component/Me/myArticle'
//
// //原始路由配置
// class RouteConfig extends React.Component{
//     render(){
//         return(
//             <Router history={hashHistory}>
//                 <Route path="/" component={App}>
//                     <IndexRoute  component={IndexList}/>
//                     <Route name="indexlist" path="/indexlist" component={IndexList}/>
//                     <Route name="articleDetail" path="/indexList/:id" component={ArticleDetail}/>
//                     <Route path="/create" component={Create}/>
//                     <Route path="/create/:id" component={Create}/>
//                     <Route path="/me" component={Me}/>
//                     {/*<Route path="/me/avatar" component={Avatar}/>*/}
//                     <Route path="/login" component={Login} />
//                     <Route path="/myArticle" component={MyArticle} />
//                 </Route>
//             </Router>
//         )
//     }
// }
// export default RouteConfig;

