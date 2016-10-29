import React from 'react';
import {Link} from 'react-router';
import {UserModel,ArticleModel} from '../dataModel';
import '../../static/style.css';
let Styles = {
    indexList:{
        paddingRight:'0.75rem',
        marginBottom:'0.2rem',
        borderTop:'1px solid #dfdfdf',
        borderBottom:'1px solid #dfdfdf',
        background:"#fff",
        paddingLeft:"0.75rem",
        paddingBottom:"0.3rem"
    },
    h4Style:{
        margin:"0.3rem 0"
    },
    pStyle:{
        margin:"0.3rem 0",
        fontSize:"0.75rem"
    },
    listBlock:{
      margin:0,
    },
    userTitle:{
        dispaly:'inline-blcok',
    }
}
class IndexList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
        }
    }

    componentDidMount(){
        ArticleModel.fetchList('',(data)=>{
            this.setState({
                list:data,
            })
        },(err)=>{
            console.log(err)
        })
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
    giveStar(e){
        var _this = this;
        let userToken = UserModel.fetchToken();
       if(!userToken){
            $.toast('您还没有登录');
           return;
       }
       let thisSpan = e.nativeEvent.target;
        // if(thisSpan.getAttribute('data-hasStar')){
        //     $.toast('您已经点赞过了');
        //     return;
        // }
       let articleId = thisSpan.getAttribute('data-articleid');
       let params = {
            userId : userToken,
            articleId :articleId,
       }
       ArticleModel.giveStar(params,(data)=>{
           console.log(data);
           if(data.title){
               thisSpan.style.color = 'red';
               // thisSpan.setAttribute('data-hasStar',1);
               $.toast(data.content)
               this.componentDidMount()
           }
       },(err)=>{
           console.log(err)
       })
        console.log(articleId)
    }
    starStyle(starlist){
        let userToken = UserModel.fetchToken();
        for(let i=0;i<starlist.length;i++){
            let cur = starlist[i];
            if(cur == userToken){
                return {marginRight:'0.5rem',paddingLeft:'0.3rem',color:'red'}
            }
        }
        return {marginRight:'0.5rem',paddingLeft:'0.3rem'}
    }
    // hasStar(starlist){
    //     let userToken = UserModel.fetchToken();
    //     for(var i=0;i<starlist.length;i++){
    //         var cur = starlist[i];
    //         if(cur == userToken){
    //             return 1;
    //         }else {
    //             return 0;
    //         }
    //     }
    // }
    indexList(){
        let _this = this
        let list = this.state.list;
        return  list.map(function (item,index) {
            return(
                <li className="" style={Styles.indexList} key={item._id}>
                    <Link to={'/indexList/'+item._id} style={{display:'block'}}>
                    <div className="list">
                        <div className="" style={{paddingTop:'0.4rem'}}>
                            <div style={{display:'inline-block',verticalAlign:'top',height:'2rem'}}>
                                <img src={item.user.avatar} style={{marginRight:'0.3rem',height:'1.7rem',display:'inline-block'}}  alt=""/>
                            </div>
                            <div style={{display:'inline-block',verticalAlign:'top',height:'2rem'}}>
                                <div style={{fontSize:'14px',fontWeight:600}}>{item.user.username}</div>
                                <div style={{fontSize:'12px'}}><span className="icon icon-clock"> </span> {_this.dateDiff(item.createAt)}</div>
                            </div>

                        </div>
                        <div className=""><h4 style={Styles.h4Style}>{item.title}</h4></div>
                        <div className=""><p style={Styles.pStyle}>{item.content}</p></div>
                    </div>
                    </Link>
                    <div style={{display:'block',width:'100%',fontSize:'14px'}}>
                        <span className="icon icon-star" style={_this.starStyle(item.star)} onClick={(e)=>{_this.giveStar(e)}} data-articleId={item._id}> {item.star.length}</span>
                        <span className="icon icon-message"> 30</span>
                    </div>
                </li>)
        })
    }
    render() {
        return (
            <main>
                <div className="content">
                    <div className="list-block" style={Styles.listBlock}>
                        <ul style={{background:"#eee"}}>
                            {this.indexList()}

                        </ul>
                    </div>
                </div>
            </main>
        );
    }
}
export default IndexList;
