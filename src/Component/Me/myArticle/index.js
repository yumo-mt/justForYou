import React from 'react';

import {UserModel} from '../../dataModel';
import {Link} from 'react-router'

class MyArticle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],

        }
    }
    componentDidMount(){
        this.fetchData();

    }
    fetchData(){
        let userId = UserModel.fetchToken();
        let params = {userId:userId}
        UserModel.fetchArticle(params,(data)=>{
            this.setState({
                list:data.content,
            })
        },(err)=>{

        })
    }
    render(){
        let list = this.state.list.map(function (item,index) {
                return(
                    <li className="item-content" key={index} data-key={item.articleId}>
                        <Link to={'/create/'+item.articleId}  style={{display:'block',width:'100%',height:'100%'}}>
                            <div className="item-inner">
                                <div className="item-title">{item.title}</div>
                            </div>
                        </Link>
                    </li>
                )
        })

        return(
            <main>
                <header className="bar bar-nav" style={{position:'relative'}}>
                    <h1 className="title">我的文章</h1>
                </header>
                <div className="contetn">
                    <div className="list-block">
                        <ul>
                            {list}
                        </ul>
                    </div>
                </div>
            </main>
        )
    }

}
export default MyArticle;