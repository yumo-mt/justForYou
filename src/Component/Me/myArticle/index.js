import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../Actions';
import {bindActionCreators} from 'redux';


class MyArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let userId = localStorage.getItem('userToken');
    let params = {userId: userId}
    this.props.actions.fetchMyArticle(params);
  }

  componentWillReceiveProps(nextPorps) {
    let data = nextPorps.fetchMyArticleEnd.data.content;
    this.setState({
      list: data
    })
  }

  render() {
    let list = this.state.list.map(function (item, index) {
      return (
        <li className="item-content" key={index} data-key={item.articleId}>
          <Link to={'/create/' + item.articleId} style={{display: 'block', width: '100%', height: '100%'}}>
            <div className="item-inner">
              <div className="item-title">{item.title}</div>
            </div>
          </Link>
        </li>
      )
    })

    return (
      <main style={{height: '100%'}}>
        <header className="bar bar-nav" style={{position: 'relative'}}>
          <h1 className="title">我的文章</h1>
        </header>
        <div className="contetn">
          <div className="list-block" style={{height: '400px', overflow: 'auto'}}>
            <ul>
              {list}
            </ul>
          </div>
        </div>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {fetchMyArticleEnd: state.fetchMyArticleEnd}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const MyArticleBox = connect(mapStateToProps, mapDispatchToProps)(MyArticle)

module.exports = MyArticleBox;
// export default MyArticle;