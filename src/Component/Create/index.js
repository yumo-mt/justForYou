import React from 'react';
import {UserModel,ArticleModel} from '../dataModel';


class Create extends React.Component {
    constructor(props){
        super(props);
        var token = UserModel.fetchToken()
        if(!token){
            location.hash = "/login";
        }
        this.state={
            token:token,
            title:'',
            content:'',
        }
    }
    componentDidMount(){
        console.log('App componentDidMount');
    }

    componentWillReceiveProps(){
        console.log('App componentWillReceiveProps');
    }

    componentDidUpdate(){
        console.log('App componentDidUpdate');
    }
    handlePublish(e){
        let title = this.refs.title.value;
        let content = this.refs.content.value;
        if(title==''){
            $.alert('标题不能为空')
            return;
        }
        if(content==''){
            $.alert('内容不能为空')
            return;
        }
        let info = {title:title,content:content,token:this.state.token}
        ArticleModel.pulish(info,(data)=>{
            $.toast(data.title);
            location.hash = '/indexList'
        },(err)=>{
            $.alert(err)
        })

    }
    handleCancel(e){

    }
    render() {
        return (
            <div>
                <header className="bar bar-nav">
                    <h1 className='title'>发表文章</h1>
                </header>
                <div className="content">
                    <div className="list-block">
                        <ul>
                            <li >
                                <div className="item-content">
                                    <div className="item-inner" style={{borderBottom:"2px solid #eee"}}>
                                        <div className="item-input">
                                            <input type="text" ref="title" placeholder="请输入标题"/>
                                        </div>
                                    </div>
                                </div>
                            </li>


                            <li className="align-top">
                                <div className="item-content">
                                    <div className="item-inner">
                                        <div className="item-input">
                                            <textarea placeholder="请输入内容" ref="content" style={{height:"13rem"}}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="content-block">
                        <div className="row">
                            <div className="col-50"><a className="button button-big button-fill button-danger" onClick={(e)=>{this.handleCancel(e)}}>取消</a></div>
                            <div className="col-50"><a className="button button-big button-fill button-success" onClick={(e)=>{this.handlePublish(e)}}>发表</a></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Create;
