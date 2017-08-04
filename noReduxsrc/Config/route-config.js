import React from 'react';
import {render} from 'react-dom';
import {Link, HashRouter, BrowserRouter,withRouter, Route, NavLink, Switch} from 'react-router-dom';


// const IndexList  = {
//     path:'indexlist',
//     getComponent(nextState,cb){
//         require.ensure([],(require)=>{
//             return cb(null,require('../Component/IndexList'))
//         },'indexList')
//     }
// }
//
// const Login = {
//     path:'/login',
//     getComponent(nextState,cb){
//         require.ensure([],(require)=>{
//             return cb(null,require('../Component/Login'))
//         },'login')
//     }
// }
//
// const ArticleDetail = {
//     path:'/indexList/:id',
//     getComponent(nextState,cb){
//         require.ensure([],(require)=>{
//             return cb(null,require('../Component/articleDetail'))
//         },'articleDetail')
//     }
// }
//
// const Create = {
//     path:'create',
//     getComponent(nextState,cb){
//         require.ensure([],(require)=>{
//             return cb(null,require('../Component/Create'))
//         },'create')
//     },
// }
//
// const CreateDetail = {
//     path:'create/:id',
//     getComponent(nextState,cb){
//         require.ensure([],(require)=>{
//             return cb(null,require('../Component/Create'))
//         },'createDetail')
//     },
// }
//
//
//
// const Me = {
//     path:'/me',
//     getComponent(nextState,cb){
//         require.ensure([],(require)=>{
//             return cb(null,require('../Component/Me'))
//         },'me')
//     }
// }
//
// const MyArticle = {
//     path:'myArticle',
//     getComponent(nextState,cb){
//         require.ensure([],(require)=>{
//             return cb(null,require('../Component/Me/myArticle'))
//         },'myArticle')
//     }
// }
//
//
// module.exports = {
//     IndexList:IndexList,
//     Login:Login,
//     ArticleDetail:ArticleDetail,
//     Create:Create,
//     Me:Me,
//     MyArticle:MyArticle,
//     CreateDetail:CreateDetail
// };


import Create from '../Component/Create';
import Me from '../Component/Me';
import IndexList from '../Component/IndexList'
// import App from '../Component/main'
import Login from '../Component/Login'
import ArticleDetail from '../Component/articleDetail/'
import MyArticle from '../Component/Me/myArticle'


function create() {
  $.closePanel();
  setTimeout(() => {
    window.location.hash = '/create'
  }, 800)
}

let nav = () => {
  return (
    <nav className="bar bar-tab">
      <NavLink className="tab-item" activeClassName="active" to="/indexList">
        <span className="icon icon-home"></span>
        <span className="tab-label">主页</span>
      </NavLink>
      <i className="tab-item" onClick={create}>
        <span className="icon icon-edit"></span>
        <span className="tab-label">发表</span>
      </i>
      <i className="tab-item open-panel" data-panel="#panel-left-demo">
        <span className="icon icon-me"></span>
        <span className="tab-label">我</span>
      </i>
    </nav>

  )
}


//
// //原始路由配置
class RouteConfig extends React.Component {
  render() {
    return (
      <HashRouter>
        <div data-log="one">
          <div data-log="two">
              <div>
                <Switch>
                  <Route exact path="/" component={IndexList}/>
                  <Route exact name="indexlist" path="/indexlist" component={IndexList}/>
                  <Route exact name="articleDetail" path="/indexList/:id" component={ArticleDetail}/>
                  <Route exact path="/create" component={Create}/>
                  <Route exact path="/create/:id" component={Create}/>
                  <Route exact path="/me" component={Me}/>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/myArticle" component={MyArticle}/>
                </Switch>
              </div>
          </div>
          <div
            style={{position: "absolute", height: "50px", width: "100%", bottom: "0px", zIndex: '2001'}}>{nav()}</div>
        </div>
      </HashRouter>

    )
  }
}
export default RouteConfig;

