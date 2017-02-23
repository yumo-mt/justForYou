import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArticleDetail from '../Component/articleDetail';
import {bindActionCreators} from 'redux';

//以下是错误的方式
// import {IndexList} from '../Component/IndexList';
import * as actions from '../Actions';


/**
 * 文章详情的container
 * 这个写的比较麻烦,给component中传了很多的props,但是可以实现效果,
 * 代码级别可以归到C级了,
 * 不推荐大家这样写
 */


class articleDetailCase extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchData()
  }
  fetchData(articleId,Fn){
    if(articleId){
      Fn(articleId)
    }else{
      this.props.actions.articleDetail(this.props.params.id);
    }
  }
  render() {
    const {articleDetail,isFetching,commentState} = this.props;
    const commentFn = this.props.actions.comment;
    let article_id = this.props.params.id;
    let fetchData= this.fetchData;
    return (
      <ArticleDetail
        data={articleDetail}
        isFetching={isFetching}
        commentFn={commentFn}
        articleId={article_id}
        commentState={commentState}
        fetchData={fetchData}
        callback={this.props.actions.articleDetail}
        commentDone={this.props.actions.commentDone}
      />
    )
  }
}


//绑定数据

function mapStateToProps(state) {
  const {articleDetail,comment} = state;
  return {
    articleDetail:articleDetail.data,
    isFetching:articleDetail.isFetching,
    commentState:comment.data,
  }
}

//绑定事件
function mapDispatchToProsp(dispatch) {
  return {
    actions:bindActionCreators(actions,dispatch)
  }
}


const articleDetailBox = connect(mapStateToProps,mapDispatchToProsp)(articleDetailCase)

//做按需加载必须使用这个方式到处  不能使用 export
module.exports =articleDetailBox;