import React from 'react';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';



class Me extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  openUpload(e) {
    e.stopPropagation();
    avatar.click()
  }

  uploadAvatar(e) {
    let _file = e.target.files[0];
    if (_file.size > 204800) {
      $.alert('头像大小不能超过200K')
      return;
    }
    var avatarForm = this.refs.avatarForm;
    let data = new FormData(avatarForm);
    // data.append('img',data);
    var token = localStorage.getItem('userToken');
    data.append('token', token)
    this.props.uploadAvatarFn(data);
  }


  //这里有个伪bug,需要用改变action->改变state来huck掉。
  componentWillReceiveProps(nextProps){
    if(nextProps.uploadAvatarEnd.data){
      $.toast(nextProps.uploadAvatarEnd.data.content);
      this.props.uploadAvatarCb();
      this.props.uploadAvatarDone();
    }
  }
  signOut(e) {
    e.preventDefault();
    setTimeout(()=> {
      $.closePanel()
    }, 0)
    $.confirm('您要退出登录么?', ()=> {
      localStorage.removeItem('userToken');
      this.context.router.push('/login')
    })
  }

  toMyArticle() {
    $.closePanel()
    setTimeout(()=> {
      this.context.router.push('/myArticle')
    }, 1000)
  }

  render() {
    let avatar = '';
    let username = '';
    if (this.props.data) {
      avatar = this.props.data.avatar;
      username = this.props.data.username;
    }

    // console.log(this.props.data);
    // if(!this.props.data) return;
    // let avatar = this.props.data.avatar||'';
    // let username = this.props.data.username||'';
    // console.log(3);
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
                    <img src={avatar} style={{height: '2.5rem'}} onClick={(e)=> {
                      this.openUpload(e)
                    }}/>
                  </div>
                  <div className="item-after">{username}</div>
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
                  <div onClick={()=> {
                    this.toMyArticle()
                  }} style={{height: '100%', width: '100%', display: 'block'}} className="item-title">我的文章
                  </div>
                  {/*</Link>*/}
                </div>
              </li>
            </ul>
          </div>
          <div className="content-block">
            <p><a onClick={(e)=> {
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
