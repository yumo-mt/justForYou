import React from 'react';
import {render} from 'react-dom';
import {Link, HashRouter, BrowserRouter, withRouter, Route, NavLink, Switch} from 'react-router-dom';

import AsyncLoadModule from './AsyncComponent';
import 'react-hot-loader/patch';
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

class RouteConfig extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  WrapIndexList(props) {
    return (
      <AsyncLoadModule moduleId="route.indexlist" load={() => import('../Component/IndexList')}>
        {(Comp) => <Comp {...props} title="Page Title: indexlist"/>}
      </AsyncLoadModule>
    )
  }

  WrapArticleDetail(props) {
    return (
      <AsyncLoadModule moduleId="route.articleDetail" load={() => import('../Component/articleDetail')}>
        {(Comp) => <Comp {...props} title="Page Title: articleDetail"/>}
      </AsyncLoadModule>
    )
  }

  WrapCreate(props) {
    return (
      <AsyncLoadModule moduleId="route.articleDetail" load={() => import('../Component/Create')}>
        {(Comp) => <Comp {...props} title="Page Title: create"/>}
      </AsyncLoadModule>
    )
  }

  WrapMe(props) {
    return (
      <AsyncLoadModule moduleId="route.me" load={() => import('../Component/Me')}>
        {(Comp) => <Comp {...props} title="Page Title: me"/>}
      </AsyncLoadModule>
    )
  }

  WrapLogin(props) {
    return (
      <AsyncLoadModule moduleId="route.login" load={() => import('../Component/Login')}>
        {(Comp) => <Comp {...props} title="Page Title: login"/>}
      </AsyncLoadModule>
    )
  }

  WrapMyArticle(props) {
    return (
      <AsyncLoadModule moduleId="route.myarticle" load={() => import('../Component/Me/myArticle')}>
        {(Comp) => <Comp {...props} title="Page Title: WrapMyArticle"/>}
      </AsyncLoadModule>
    )
  }


  render() {
    return (
      <HashRouter>
        <div data-log="one">
          <div data-log="two">
            <div>
              <Switch>
                <Route exact path="/" component={this.WrapIndexList}/>
                <Route exact name="indexlist" path="/indexlist" component={this.WrapIndexList}/>
                <Route exact name="articleDetail" path="/indexList/:id" component={this.WrapArticleDetail}/>
                <Route exact path="/create" component={this.WrapCreate}/>
                <Route exact path="/create/:id" component={this.WrapCreate}/>
                <Route exact path="/me" component={this.WrapMe}/>
                <Route exact path="/login" component={this.WrapLogin}/>
                <Route exact path="/myArticle" component={this.WrapMyArticle}/>
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

