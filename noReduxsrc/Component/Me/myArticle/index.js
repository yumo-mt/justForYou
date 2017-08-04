import React from 'react';

import {UserModel} from '../../dataModel';
import {Link} from 'react-router-dom'

class MyArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,

    }
  }

  componentDidMount() {
    this.fetchData();

  }

  fetchData() {
    let userId = UserModel.fetchToken();
    let params = {userId: userId}
    UserModel.fetchArticle(params, (data) => {
      console.log(data)
      this.setState({
        list: data.content,
      })
    }, (err) => {

    })
  }

  render() {
    if (!this.state.list) {
      return (<div/>)
    }
    let list = this.state.list.map(function (item, index) {
      return (
        <li className="item-content" key={item.articleId} data-key={item.articleId}>
          <Link to={'/create/' + item.articleId} style={{display: 'block', width: '100%', height: '100%'}}>
            <div className="item-inner">
              <div className="item-title">{item.title}</div>
            </div>
          </Link>
        </li>
      )
    })

    return (
      <main>
        <header className="bar bar-nav" style={{position: 'relative'}}>
          <h1 className="title">我的文章</h1>
        </header>
        <div className="contetn">
          <div className="list-block">
            <ul>
              {list}
              {/*123*/}
            </ul>
          </div>
        </div>
      </main>
    )
  }

}
// module.exports = MyArticle;
export default MyArticle;