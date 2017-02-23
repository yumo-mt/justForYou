import React from 'react';
import '../../static/css/style.css'
import {dateDiff} from '../../Tools';


/**
 * 使用的方法是讲props转为state,来进行本地UI切换,以减少DOM操作
 */

class ArticleDetail extends React.Component {
  constructor(props) {
    super(props);
    $.showIndicator();
    this.state = {
      title: '',
      createAt: '',
      content: '',
      commentList: [],
      username: ''
    }
  }

  componentDidMount() {
    // let article_id = this.props.params.id;
    // ArticleModel.fetchArticle(article_id,(data)=>{
    //     this.setState({
    //         article:data.content,
    //         author:data.content.author,
    //         comment:data.content.comments
    //     })
    // console.log(this.props);
    // $.hideIndicator();
    // },(err)=>{
    //     console.log(err)
    // })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      let title = nextProps.data.content.title;
      let createAt = nextProps.data.content.createAt;
      let username = nextProps.data.content.username;
      let content = nextProps.data.content.content;
      let commentList = nextProps.data.content.comments;
      this.setState({
        title: title,
        createAt: createAt,
        username: username,
        content: content,
        commentList: commentList,
      })
    }
    if (!nextProps.isFetching) {
      $.hideIndicator();
    }
    if (nextProps.commentState) {
      $.toast(nextProps.commentState.content);
      nextProps.fetchData(nextProps.articleId,nextProps.callback)
      this.props.commentDone()
      this.refs.commentText.value='';
    }
  }

  commentList(comments = []) {
    let commentList = comments.map(function (item, index) {
      return (
        <li className="row" key={index}>
          <div className="col-15" style={{padding: '0.3rem 0'}}>
            <img className="commentAvatar" src={item.avatar} alt=""/>
          </div>
          <div className="col-85 commentList">
            <div style={{fontWeight: 'bold', fontSize: '15px'}}>{item.username}</div>
            <p style={{margin: '0.2rem 0', fontSize: '14px'}}>{item.comment}</p>
            <div style={{fontSize: '12px'}}><span className="icon icon-clock"> </span> {dateDiff(item.createAt)}</div>
          </div>
        </li>
      )
    })

    return (
      <ul>
        {commentList}
      </ul>
    )
  }

  checkLogin() {
    var usertoken = localStorage.getItem('userToken')
    if (!usertoken) {
      $.alert('您还没有登录')
    }
    return;
  }

  handleComment() {
    let comment = this.refs.commentText.value;
    if (comment == '') {
      $.toast('评论不能为空');
      return;
    }
    let articleId = this.props.articleId;
    let userId = localStorage.getItem('userToken');
    if (userId) {
      let params = {
        userId: userId,
        articleId: articleId,
        comment: comment
      }
      this.props.commentFn(params)

    } else {
      $.alert('您还没有登录')
    }
  }

  render() {

    return (
      <div>

        <main className="detailContent">
          <h2 className="clearPt">{this.state.title}</h2>
          <div>
            <span className="font12 marR">作者:{this.state.username}</span>
            <span className="font12">发表于:{dateDiff(this.state.createAt)}</span>
          </div>
          <hr/>
          <div className="article">
            {this.state.content}
          </div>
          <hr/>
          <div>
            <h3 className="clearPL">评论:</h3>
            {this.commentList(this.state.commentList)}
          </div>
        </main>
        <div className="comment row no-gutter" style={{margin: 'none', zIndex: '2002'}}>
          <input type="text" style={{border: 'none'}} ref="commentText" className="col-75 commentInput"
                 placeholder="说点什么吧" onChange={this.checkLogin}/>
          <a onClick={()=> {
            this.handleComment()
          }} className="button col-25 button-fill button-big">评论</a>
        </div>
      </div>

    )
  }
}
module.exports = ArticleDetail
// export default ArticleDetail;