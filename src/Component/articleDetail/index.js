import React from 'react';
import '../../static/style.css'
import {ArticleModel} from '../dataModel'
class ArticleDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            commentList:[],
            article:'',
            author:''
        }
    }
    componentDidMount(){
        let article_id = this.props.params.id;
        ArticleModel.fetchArticle(article_id,(data)=>{
            this.setState({
                article:data.content,
                author:data.content.author
            })
        },(err)=>{
            console.log(err)
        })
    }
    commentList(){
        return(
            <ul>
                <li>这是第一条评论</li>
                <li>这是第一条评论</li>
                <li>这是第一条评论</li>
                <li>这是第一条评论</li>
                <li>这是第一条评论</li>
            </ul>
        )
    }
    //方法之间调用
    dateDiff(hisTime){
        var now =new Date().getTime(),
            diffValue = now - hisTime,
            result='',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,
            _year = diffValue/year,
            _month =diffValue/month,
            _week =diffValue/(7*day),
            _day =diffValue/day,
            _hour =diffValue/hour,
            _min =diffValue/minute;
        if(_year>=1) result=parseInt(_year) + "年前";
        else if(_month>=1) result=parseInt(_month) + "个月前";
        else if(_week>=1) result=parseInt(_week) + "周前";
        else if(_day>=1) result=parseInt(_day) +"天前";
        else if(_hour>=1) result=parseInt(_hour) +"个小时前";
        else if(_min>=1) result=parseInt(_min) +"分钟前";
        else result="刚刚";
        return result;
    }
    render(){
        return(
            <main className="detailContent">
                <h2 className="clearPt">{this.state.article.title}</h2>
                <div>
                    <span className="font12 marR">作者:{this.state.author.username}</span>
                    <span className="font12">发表于:{this.dateDiff(this.state.article.createAt)}</span>
                </div>
                <hr/>
                <div className="article">
                    {this.state.article.content}
                </div>
                <hr/>
                <div>
                    <h4 className="clearPt">评论:</h4>
                    {this.commentList()}
                </div>
            </main>
        )
    }
}
export default ArticleDetail;