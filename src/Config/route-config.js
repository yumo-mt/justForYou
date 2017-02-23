import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, Link, IndexRoute, Redirect, browserHistory} from 'react-router';



const IndexList = {
  path: 'indexlist',
  getComponent(nextState, cb){
    require.ensure([], (require)=> {
      return cb(null, require('../Containers/indexList'))
    }, 'indexList')
  }
}
const Login = {
  path: '/login',
  getComponent(nextState, cb){
    require.ensure([], (require)=> {
      return cb(null, require('../Component/Login'))
    }, 'login')
  }
}

const ArticleDetail = {
  path: '/indexList/:id',
  getComponent(nextState, cb){
    require.ensure([], (require)=> {
      return cb(null, require('../Containers/articleDetail'))
    }, 'articleDetail')
  }
}

const Create = {
  path: 'create',
  getComponent(nextState, cb){
    require.ensure([], (require)=> {
      return cb(null, require('../Component/Create'))
    }, 'create')
  },
}

const CreateDetail = {
  path: 'create/:id',
  getComponent(nextState, cb){
    require.ensure([], (require)=> {
      return cb(null, require('../Component/Create'))
    }, 'createDetail')
  },
}

const Me = {
  path: '/me',
  getComponent(nextState, cb){
    require.ensure([], (require)=> {
      return cb(null, require('../Component/Me'))
    }, 'me')
  }
}

const MyArticle = {
  path: 'myArticle',
  getComponent(nextState, cb){
    require.ensure([], (require)=> {
      return cb(null, require('../Component/Me/myArticle'))
    }, 'myArticle')
  }
}


module.exports = {
  IndexList: IndexList,
  Login: Login,
  ArticleDetail: ArticleDetail,
  Create: Create,
  Me: Me,
  MyArticle: MyArticle,
  CreateDetail: CreateDetail
};


// import {CreateBox} from '../Component/Create';
// import Me from '../Component/Me';
// import {indexList} from '../Containers/indexList'
// import App from '../Component/main'
// import {LoginBox} from '../Component/Login'
// import {articleDetailBox} from '../Containers/articleDetail'
// import {MyArticleBox} from '../Component/Me/myArticle'
//
//
// //原始路由配置
// class RouteConfig extends React.Component{
//     render(){
//         return(
//             <Router history={hashHistory}>
//                 <Route path="/" component={App}>
//                     <IndexRoute  component={indexList}/>
//                     <Route name="indexlist" path="/indexlist" component={indexList}/>
//                     <Route name="articleDetail" path="/indexList/:id" component={articleDetailBox}/>
//                     <Route path="/create" component={CreateBox}/>
//                     <Route path="/create/:id" component={CreateBox}/>
//                     <Route path="/me" component={Me}/>
//                     {/*<Route path="/me/avatar" component={Avatar}/>*/}
//                     <Route path="/login" component={LoginBox} />
//                     <Route path="/myArticle" component={MyArticleBox} />
//                 </Route>
//             </Router>
//         )
//     }
// }
// export default RouteConfig;

