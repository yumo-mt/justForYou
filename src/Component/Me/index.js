import React from 'react';
import {UserModel} from '../dataModel';
import {Link} from 'react-router';
var ReactDOM = require('react-dom');


let  Styles = {
    info:{

    }
}
class Me extends React.Component {
    constructor(props){
        super(props);
        //判断是否登录
        var token = UserModel.fetchToken()
        if(!token){
            location.hash = "/login";
        }
        this.state = {
            info:[],
        };
    }

    componentDidMount(){
       let token= UserModel.fetchToken();
       let info = {token:token};
       UserModel.getUserInfo(info,(res)=>{
           // console.log(res)
            this.setState({
                info:res,
            })
       },(err)=>{
           console.log(err)
       })
    }
    openUpload(e){
        e.stopPropagation();
        avatar.click()

    }
    uploadAvatar(e){
        let _file = e.target.files[0];
        console.log(_file)
        if(_file.size>204800){
            $.alert('头像大小不能超过200K')
            return;
        }
        var avatarForm = this.refs.avatarForm;
        let data = new FormData(avatarForm);
        // data.append('img',data);
        var token = UserModel.fetchToken();
        data.append('token',token)
        UserModel.uploadAvatar(data,(data)=>{
            console.log(data,'*-*--*')
            $.toast(data.content);
            this.componentDidMount()
        },(err)=>{
            console.log(err)
        })
        // console.log(this.files&&this.files[0])
        // let fire = this.file                   580611650b710b44eb27d612123
        // console.log(e.nativeEvent.target.value)580611650b710b44eb27d612123
    }
    render() {
        return (
            <div>
                <header className="bar bar-nav" style={{position:'relative'}}>
                    <h1 className="title">我</h1>
                </header>
                <div className="content" style={{top:'1.2rem'}}>
                    <div className="list-block">
                        <ul>
                            <li className="item-content item-link">
                                <div className="item-inner">
                                    <form id="avatarForm" ref="avatarForm" style={{display:'none'}}>
                                        <input type="file" id="avatar" ref="avatar" name="avatar" style={{display:'none'}} onChange={this.uploadAvatar.bind(this)}/>
                                    </form>
                                    <div className="item-title">
                                        <img src={this.state.info.avatar} style={{height:'2.5rem'}} onClick={(e)=>{this.openUpload(e)}}/>
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
                                    <Link to={'myArticle'} style={{height:'100%',width:'100%',display:'block'}}>
                                        <div className="item-title">我的文章</div>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default Me;
