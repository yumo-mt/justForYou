import React, {Component} from 'react';
import {connect} from 'react-redux';
import IndexList from '../Component/IndexList';
import {bindActionCreators} from 'redux';
//以下是错误的方式
// import {IndexList} from '../Component/IndexList';
import * as actions from '../Actions/index';


class IndexListCase extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.fetchList();
    var token = localStorage.getItem('userToken')
    this.props.actions.me({token: token});
  }

  render() {
    const list = this.props.indexList;
    const me = this.props.me;
    const giveStar = this.props.actions.giveStarAction;
    const starContent = this.props.giveStar;
    const uploadAvatarFn = this.props.actions.uploadAvatar;
    const uploadAvatarEnd = this.props.uploadAvatarEnd;
    return (
      <IndexList
        data={list}
        me={me}
        giveStar={giveStar}
        starContent={starContent}
        callback={this.props.actions.fetchList}
        uploadAvatarFn={uploadAvatarFn}
        uploadAvatarEnd={uploadAvatarEnd}
        uploadAvatarCb={(token)=>{this.props.actions.me({token: localStorage.getItem('userToken')})}}
        uploadAvatarDone={this.props.actions.uploadAvatarDone}/>
    )
  }
}

function mapStateToProps(state) {
  const {indexList, me, giveStar, uploadAvatarEnd} = state;
  return {
    indexList: indexList.list,
    me: me,
    giveStar: giveStar,
    uploadAvatarEnd: uploadAvatarEnd
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

const indexList = connect(mapStateToProps, mapDispatchToProps)(IndexListCase)

module.exports = indexList