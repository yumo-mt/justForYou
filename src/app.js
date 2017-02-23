import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, Link, IndexRoute, Redirect, browserHistory} from 'react-router';
import {IndexList, Login, ArticleDetail, Create, Me, MyArticle, CreateDetail} from './Config/route-config'
import store from './store';
import { Provider } from 'react-redux'

// import RouteConfig from './Config/route-config';

const rootRoute = {
  component: require('./Component/main').default,
  childRoutes: [{
    path: '/',
    indexRoute: {
      getComponent(nextState, cb){
        require.ensure([], (require)=> {
          cb(null, require('./Containers/indexList'))
        })
      }
    },
    childRoutes: [
      IndexList,
      Login,
      ArticleDetail,
      Create,
      Me,
      MyArticle,
      CreateDetail
    ]
  }]
}

// console.log(rootRoute);

let root = document.getElementById('app');
render(
  <Provider store={store}>
    {/*<RouteConfig/>*/}
    <Router routes={rootRoute} history={hashHistory}/>
  </Provider>
  , root);

