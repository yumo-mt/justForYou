const API = 'http://localhost:4545/';

// const API = 'http://114.215.80.72:4545/'

//创建将会用到的action 和action Creater

//有些人一看见大写字母就懵逼,所以这里type类型都为小写,但正常的type为常量,所以应该大写
export const fetchStartAction = 'fetchStart';
export const fetchEndAction = 'fetchEndAction';
export const fetchFailedAction = 'fetchFailedAction';
export const fetchListAction = 'fetchList';
export const articleDetailAction = 'articleDetailAction';
export const articlePublishAction = 'articlePublishAction';

// export const postFailedAction = 'postFailedAction'



//开始请求
function fetchStart() {
  return {
    type:fetchStartAction,
  }
}
//请求结束,获得data
function fetchEnd(data={}) {
  return {
    type:fetchEndAction,
    data:data
  }
}
//请求失败
function fetchFailed(data) {
  return {
    type:fetchFailedAction,
    data:data
  }
}

// //post 失败
// function postFailed(data) {
//   return {
//     type:postFailedAction,
//     data:data
//   }
// }

//请求主列表
export function fetchList() {
  return function(dispatch){
    //没有执行到这里
    ArticleModel.fetchList(dispatch)
  }
}



//me
export function me(token) {
  return (dispatch)=>{
    UserModel.getUserInfo(dispatch,token)
  }
}
//获取me完成
function fetchMeEnd(data) {
  return {
    type:'fetchMeEnd',
    isFetching:false,
    data
  }
}

//文章详情
export function articleDetail(id) {
  return (dispatch)=>{
    ArticleModel.fetchArticle(dispatch,fetchArticleDetailEnd,id)
  }
}

//获取文章详情结束
function fetchArticleDetailEnd(data) {
  return {
    type:'articleDetail',
    isFetching:false,
    data
  }
}

//点赞
export function giveStarAction(params){
  return (dispatch)=>{
    ArticleModel.giveStar(dispatch,starEnd,params);
  }
}

function starEnd(data) {
  return {
    type:'starEnd',
    data:data,
  }
}

//发表文章
function articlePulishEnd(data) {
  return {
    type:"articlePulishEnd",
    data:data
  }
}

export function articlePulish(params) {
  return (dispatch)=>{
    ArticleModel.pulish(dispatch,articlePulishEnd,params)
  }
}

function articlePulishFinish() {
  return {
    type:'articlePulishFinish'
  }
}

export function articlePulishDone() {
  return (dispatch)=>{
    dispatch(articlePulishFinish())
  }
}

//评论
export function comment(params) {
  return (dispatch)=>{
    ArticleModel.comment(dispatch,commentEnd,params)
  }
}

function commentEnd(data) {
  return {
    type:'commentEnd',
    data
  }
}

function commentFinish() {
  return {
    type:'commentFinish'
  }
}

export function commentDone() {
  return (dispatch)=>{
    dispatch(commentFinish())
  }
}

export function register(params) {
  return (dispatch)=>{
    UserModel.register(dispatch,registerLoginEnd,params)
  }
}

function registerLoginEnd(data) {
  return {
    type:'registerLoginEnd',
    data
  }
}

export function Login(params) {
  return (dispatch)=>{
    UserModel.login(dispatch,registerLoginEnd,params)
  }
}

export function fetchMyArticle(params) {
  return (dispatch)=>{
    UserModel.fetchArticle(dispatch,fetchMyArticleEnd,params)
  }
}

function fetchMyArticleEnd(data) {
  return {
    type:'fetchMyArticleEnd',
    data
  }
}

export function uploadAvatar(params) {
  return (dispatch)=>{
    UserModel.uploadAvatar(dispatch,uploadAvatarEnd,params)
  }
}

function uploadAvatarEnd(data) {
  return {
    type:'uploadAvatarEnd',
    data
  }
}

export function uploadAvatarDone() {
  return (dispatch)=>{
    dispatch(commentFinish())
  }
}


/**
 * fetch请求数据Model
 * @param _method
 * @param _api
 * @param _params
 * @param _onSuccess
 * @param _onError
 * @private
 */
function _request (dispatch,endAction,_method,_api,_params) {

  let _options = {
    method:_method,
    mode: "cors",
    headers:{
      // 'Accept':'application/json',
      'Content-Type':'application/json',
    },
    body:(_method == 'GET')? null:JSON.stringify(_params)
  };
  if(_method.toLowerCase() == 'get'){
    _api+=Tools._getSearchFromObject(_params)
  }
  fetch(_api,_options)
    .then(Tools.checkStates)
    .then(Tools.parseJSON)
    .then((data)=>{
      dispatch(endAction(data))
    })
    .catch((err)=>{
      console.log(err);
      if(err.state == 401){
        alert("登录过期,重新登录")
        location.hash = "login";
        return
      }
      if(err.response){
        err.response.json().then((data)=>{
          if(data.message)
            dispatch(fetchFailed(data))
        })
      }
    })
}

// Upload Image
function _upload(dispatch,postEnd,_api, _formdata, _onSuccess, _onError){

  // Manual XHR & FormData
  let oReq = new XMLHttpRequest();
  oReq.open("POST", _api);
  oReq.onload = (e) => {
    let ret = JSON.parse(oReq.responseText)
    if (oReq.status == 200) {
      dispatch(postEnd(ret));
    } else {
      let err = ret;
      if(err.message) alert(err.message)
      //_onError(err);
    }
  };
  // oReq.upload.onprogress = updateProgress;
  oReq.send(_formdata);
}


let Tools = {
  checkStates: function (response) {
    if(response.ok){
      return response
    }else{
      let error = new Error(response.statusText);
      error.state = response.status;
      error.response = response;
      throw error;
    }
  },
  parseJSON:function (response) {
    return response.json();
  },
  _getSearchFromObject:function(param, key) {

    if(param == null) return '';
    let _search = '?';
    for (let key in param) {
      _search += `${key}=${encodeURIComponent(param[key])}&`
    }
    return _search.slice(0, -1);
  },
}


let UserModel = {
  storeToken:(token)=>{
    localStorage.setItem(USER_TOKEN,token);
  },
  fetchToken:()=>{
    return localStorage.getItem(USER_TOKEN);
  },
  register:(dispatch,postEnd,_params)=>{
    _request(dispatch,postEnd,'POST',`${API}user/register`,_params)
  },
  login:(dispatch,postEnd,_params)=>{
    _request(dispatch,postEnd,'POST',`${API}user/login`,_params)
  },

  getUserInfo:(dispatch,_params)=>{
    dispatch(fetchStart())
    _request(dispatch,fetchMeEnd,'GET',`${API}user/getUserInfo`,_params);
  },

  uploadAvatar:(dispatch,postEnd,_params)=>{
    _upload(dispatch,postEnd,`${API}user/uploadAvatar`,_params)
  },
  fetchArticle:(dispatch,getEnd,_params)=>{
    _request(dispatch,getEnd,'GET',`${API}user/fetchArticle`,_params)
  }
}
let ArticleModel={
  pulish:(dispatch,postEnd,_params)=> {
    _request(dispatch,postEnd,'POST', `${API}article/pulish`, _params)
  },
  fetchList:(dispatch,_params)=>{
    dispatch(fetchStart())
    _request(dispatch,fetchEnd,'GET',`${API}article/fetchList`,'');
  },
  fetchArticle:(dispatch,fetchEnd,_id)=>{
    _request(dispatch,fetchEnd,'GET',`${API}article/fetchArticle/${_id}`,null)
  },
  giveStar:(dispatch,fetchEnd,_params)=>{
    _request(dispatch,fetchEnd,'POST',`${API}article/giveStar`,_params)
  },
  comment:(dispatch,postEnd,_params)=>{
    _request(dispatch,postEnd,'POST',`${API}article/comment`,_params)
  }
}

