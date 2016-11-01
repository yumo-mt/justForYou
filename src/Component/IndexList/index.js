import React from 'react';
import {Link} from 'react-router';
import {UserModel,ArticleModel} from '../dataModel';
import '../../static/style.css';
import {dateDiff} from '../../Tools'
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

    giveStar(e){
       var _this = this;
       let userToken = UserModel.fetchToken();
       if(!userToken){
            $.toast('您还没有登录');
           return;
       }
       let thisSpan = e.nativeEvent.target;
       let articleId = thisSpan.getAttribute('data-articleid');
       let params = {
            userId : userToken,
            articleId :articleId,
       }
       ArticleModel.giveStar(params,(data)=>{
           console.log(data);
           if(data.title){
               thisSpan.style.color = 'red';
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
    wordControl(word){
        if(word.length>65){
           word = word.substring(0,65)+' ...';
        }
        return word
    }
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
                                <div style={{fontSize:'12px'}}><span className="icon icon-clock"> </span> {dateDiff(item.createAt)}</div>
                            </div>

                        </div>
                        <div className=""><h4 style={Styles.h4Style}>{item.title}</h4></div>
                        <div className=""><p style={Styles.pStyle}>{_this.wordControl(item.content)}</p></div>
                    </div>
                    </Link>
                    <div style={{display:'block',width:'100%',fontSize:'14px'}}>
                        <span className="icon icon-star" style={_this.starStyle(item.star)} onClick={(e)=>{_this.giveStar(e)}} data-articleId={item._id}> {item.star.length}</span>
                        <span className="icon icon-message"> {item.commentNum}</span>
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
