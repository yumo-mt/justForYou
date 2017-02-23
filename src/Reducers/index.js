import {combineReducers, createStore, applyMiddleware} from "redux"

import {
  fetchListAction,
  articleDetailAction,
  articlePublishAction,
  fetchEndAction,
  fetchFailedAction,
  fetchStartAction
} from '../Actions'


/**
 *  reducer 是一个传入state和action 返回新的state的纯函数
 */


//主列表的reducer
function indexList(state = {}, action) {
  switch (action.type) {
    case fetchStartAction:
      return {
        isFetching: true,
        list: [],
      }
    case fetchEndAction:
      return {
        list: action.data,
        isFetching: false
      }
    default:
      return state
  }
}

//文章详情的reducer
function articleDetail(state = {}, action) {
  switch (action.type) {
    case 'articleDetail':
      return {
        data: action.data,
        isFetching: action.isFetching
      }
    default:
      return state
  }
}

//发表文章的reducer
function articlePulish(state = {}, action) {
  switch (action.type) {
    case 'articlePulishEnd':
      return {
        data: action.data
      }
    case 'articlePulishFinish':
      return {
        data: 0
      }
    default:
      return state
  }
}

//个人中心的reducer
function me(state = {}, action) {
  if (action.type == 'fetchMeEnd') {
    return {
      data: action.data,
    }
  }

  return state
}

//点赞的reducer
function giveStar(state = {}, action) {
  switch (action.type) {
    case 'starEnd':
      return {
        data: action.data
      }
    default:
      return state;
  }
}

//评论的reducer
function comment(state = {}, action) {
  switch (action.type) {
    case 'commentEnd':
      return {
        data: action.data
      }
    case 'commentFinish':
      return {
        data: 0
      }
    default:
      return state;
  }
}

function registerLogin(state = {}, action) {
  switch (action.type) {
    case 'registerLoginEnd':
      return {
        data: action.data
      }
    default:
      return state;
  }
}

function fetchMyArticleEnd(state = {}, action) {
  switch (action.type) {
    case 'fetchMyArticleEnd':
      return {
        data: action.data
      }
    default:
      return state;
  }
}

function uploadAvatarEnd(state = {}, action) {
  switch (action.type) {
    case 'uploadAvatarEnd':
      return {
        data: action.data
      }
    case 'commentFinish':
      return {
        data: 0
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  indexList,
  articleDetail,
  articlePulish,
  me,
  giveStar,
  comment,
  registerLogin,
  fetchMyArticleEnd,
  uploadAvatarEnd,
})


export default rootReducer