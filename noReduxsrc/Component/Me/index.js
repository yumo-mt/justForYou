import React from 'react';
import {UserModel} from '../dataModel';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';

class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
    };
  }

  componentDidMount() {
    //判断是否登录
    var token = UserModel.fetchToken()
    if (!token) {
      this.context.router.push('login')
      return;
    }
    this.fetchData();
  }

  fetchData() {
    let token = UserModel.fetchToken();
    let info = {token: token};
    UserModel.getUserInfo(info, (res) => {
      // console.log(res)
      this.setState({
        info: res,
      })
    }, (err) => {
      console.log(err)
    })
  }

  componentWillUnmount() {
  }

  openUpload(e) {
    e.stopPropagation();
    avatar.click()
  }

  uploadAvatar(e) {
    let _file = e.target.files[0];
    console.log(_file, '2222')
    if (_file.size > 204800) {
      $.alert('头像大小不能超过200K')
      return;
    }
    var avatarForm = this.refs.avatarForm;
    let data = new FormData(avatarForm);
    // data.append('img',data);
    var token = UserModel.fetchToken();
    data.append('token', token)
    UserModel.uploadAvatar(data, (data) => {
      $.toast(data.content);
      this.componentDidMount()
    }, (err) => {
      console.log(err)
    })
  }

  signOut(e) {
    e.preventDefault();
    setTimeout(() => {
      $.closePanel()
    }, 0)
    $.confirm('您要退出登录么?', () => {
      localStorage.removeItem('userToken');
      window.location.href = '#/login'
      // this.context.router.push('/login')
    })
  }

  toMyArticle() {
    $.closePanel()
    setTimeout(() => {
      window.location.href = '#/myArticle';
      // this.context.router.push('/myArticle')
    }, 1000)
  }

  render() {
    return (
      <div>
        <header className="bar bar-nav" style={{position: 'relative'}}>
          <h1 className="title">我</h1>
        </header>
        <div className="content" style={{top: '1.2rem'}}>
          <div className="list-block">
            <ul>
              <li className="item-content item-link">
                <div className="item-inner">
                  <form id="avatarForm" ref="avatarForm" style={{display: 'none'}}>
                    <input type="file" id="avatar" ref="avatar" name="avatar" style={{display: 'none'}}
                           onChange={this.uploadAvatar.bind(this)}/>
                  </form>
                  <div className="item-title">
                    <img src={this.state.info.avatar} style={{height: '2.5rem'}} onClick={(e) => {
                      this.openUpload(e)
                    }}/>
                  </div>
                  <div className="item-after">{this.state.info.username}</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="list-block">
            <ul>
              <li className="item-content">
                <div className="item-media"><i className="icon icon-edit"></i></div>
                <div className="item-inner">
                  {/*<Link to={'myArticle'} style={{height:'100%',width:'100%',display:'block'}}>*/}
                  <div onClick={() => {
                    this.toMyArticle()
                  }} style={{height: '100%', width: '100%', display: 'block'}} className="item-title">我的文章
                  </div>
                  {/*</Link>*/}
                </div>
              </li>
            </ul>
          </div>
          <div className="content-block">
            <p><a onClick={(e) => {
              this.signOut(e)
            }} className="button button-danger button-fill button-big">退出登录</a></p>
          </div>
        </div>
      </div>
    );
  }
}
Me.contextTypes = {
  router: React.PropTypes.object
}
module.exports = Me;
// export default Me;
