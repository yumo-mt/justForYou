import React from 'react';
import {Link} from 'react-router';
import {UserModel,ArticleModel} from '../dataModel';
import '../../static/css/style.css'

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
        margin:"0.3rem 0",
        color:'#259',
        fontSize:'16px'
    },
    pStyle:{
        margin:"0.3rem 0",
        fontSize:"15px"
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
            defaultTop:null,
        }
    }
    componentDidMount() {
        var outerScroller = document.getElementById('outerScroller');
        this.fetchData();
        let defaultTop = this.refs.outerScroller.offsetTop;
        this.setState({
            defaultTop:defaultTop,
        })
        this.pullToRefresh(this.refs.outerScroller,this.refs.pullToRefreshBox,this.refs.scrollList,this.refs.preloader,this.refs.pullToRefreshArrow)
    }
    //获取数据
    fetchData(){
        ArticleModel.fetchList('', (data)=> {
            this.setState({
                list: data,
            })
                this.loadingFinish(this.refs.outerScroller,this.refs.preloader,this.refs.scrollList)
        }, (err)=> {
            console.log(err);
        })
    }
    //点赞
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
           if(data.title){
               thisSpan.style.color = 'red';
               $.toast(data.content)
               this.componentDidMount()
           }else{
               thisSpan.style.color = 'none';
               $.toast(data.content)
               this.componentDidMount()
           }
       },(err)=>{
           console.log(err)
       })
    }
    //设置点赞星样式
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
    //限制字数
    wordControl(word){
        if(word.length>65){
           word = word.substring(0,65)+' ...';
        }
        return word
    }
    //下拉刷新
    pullToRefresh(outerScroller,pullToRefreshBox,scrollList,preloader,pullToRefreshArrow) {
        let _this = this;
    //设置初始touchstart时的Y轴坐标
    var touchStart;
    //初始总盒子的top值
    var defaultTopVal = outerScroller.offsetTop;
    // console.log(defaultTopVal);
    //根据需求设置一下内容list的长度
    scrollList.style.height = document.body.clientHeight+'px'
    //检查是否满足下拉状态
    checkState(outerScroller.offsetTop)
    scrollList.onscroll = function () {
        var scrollListST = scrollList.scrollTop;
        if (parseInt(scrollListST) == 0) {
            checkState(outerScroller.offsetTop)
        }
    }
    //检查是否满足下拉刷新的条件
    function checkState(point) {
        if(point==defaultTopVal) {
            if(scrollList.scrollTop==0) {
                outerScroller.addEventListener('touchstart', startPageY, false);
            }
        }
    }
    //监听touchmove事件
    function startPageY(e) {
        //保存touchstart时的Y轴坐标
        touchStart = e.targetTouches[0].pageY;
        outerScroller.addEventListener('touchmove', checkDirection, false);
    }
    //检查手指滑动的方向
    function checkDirection(e) {
        /**如果显示内容不是scrollList最顶端,则不满足下拉刷新条件
         * 这个也是检查是否满足下拉的条件,但是不能和上面的写在一起,因为我们已经开始监听touchmove事件了,
         * 因为不满足,所以把touchmove事件的监听remove掉
         */
        if(scrollList.scrollTop>0){
            outerScroller.removeEventListener('touchmove', checkDirection, false);
            return;
        }
        //touchmove时,手机划过的Y坐标
        var judegP = e.targetTouches[0].pageY;
        //大于标示是向下滑动,开始下拉刷新,这是要监听touchmove事件来触发下拉刷新方法(pullRefresh)
        //如果是向上滑就remove掉checkDiretion方法
        if(judegP>touchStart){
            outerScroller.addEventListener('touchmove', pullRefresh, false);
            outerScroller.removeEventListener('touchmove', checkDirection, false);
        }else{
            outerScroller.removeEventListener('touchmove', checkDirection, false);
        }
    }
    //此方法为会又touchmove调用多次,所以用来显示下拉加载盒子
    function pullRefresh(e) {
        // console.log(_this,this);
        //滑动期间手指在屏幕上的位置
        var pageY = e.targetTouches[0].pageY;
        var temp = pageY-touchStart;
        //设置top值(多次)
        outerScroller.style.top = defaultTopVal + temp + 'px';
        //下箭头变成上箭头,提醒用户松手
        if(temp>= Math.abs(defaultTopVal) ){
            addClass(pullToRefreshBox,'up');
        }
        //上变下
        else if(temp<Math.abs(defaultTopVal)){
            _this.removeClass(pullToRefreshBox,'up')
        }else{
            outerScroller.style.top = defaultTopVal+'px';
        }
        //如果超出默认的top值,就强制设置为默认值
        if(parseInt(outerScroller.style.top)<defaultTopVal){
            outerScroller.style.top = defaultTopVal+'px';
        }
        //touchmove过程中禁止列表的操作,可以阻止默认事件,我这里就直接hidden就没有了滚动条
        scrollList.style.overflow = 'hidden';
        //同时监听touchend方法
        outerScroller.addEventListener('touchend', touchMoveEnd, false);
    }
    //touchend 方法,
    function touchMoveEnd(e) {
        // 首先remove掉touchmove事件的监听
        outerScroller.removeEventListener('touchmove', pullRefresh, false);
        //如果下拉程度没有到达设定的需要下拉加载的数值,就无视,但是需要将页面还原
        if(parseInt(outerScroller.style.top)<0){
            //未到达指定数值
            var outTime = setInterval(function () {
                outerScroller.style.top= parseInt(outerScroller.style.top)-3+'px';
                if( parseInt(outerScroller.style.top) <= defaultTopVal){
                    clearInterval(outTime);
                    //因为这里设置的是每10毫秒减3px,所以设定界限,如果超出就直接变为默认值
                    if(outerScroller.offsetTop<defaultTopVal){
                        outerScroller.style.top = defaultTopVal+'px';
                        //进行新一轮的监听
                        checkState(outerScroller.offsetTop);
                    }
                }
            },10);
            //将内容列表设置为可操作状态
            scrollList.style.overflow = 'auto';
            return;
        }
        //达到了指定的下拉加载数值
        if(outerScroller.offsetTop>=0){
            //用于切换加载gif
            pullToRefreshArrow.style.display = 'none';
            preloader.style.display = 'block'
            var time = setInterval(function () {
                outerScroller.style.top =  outerScroller.offsetTop -3+'px';
                if(outerScroller.offsetTop<=0){
                    if(outerScroller.offsetTop<defaultTopVal){
                        outerScroller.style.top = defaultTopVal+'px';
                    }
                    outerScroller.style.top = 0;
                    clearInterval(time);
                    outerScroller.removeEventListener('touchmove', pullRefresh, false);
                    outerScroller.removeEventListener('touchend', touchMoveEnd, false);
                }
            },10)
            _this.fetchData();
        }
    }

    //辅助方法
    //增加class
    function addClass(curEle, strClass) {
        //strClass 是一串字符串，可能含有多个class ，所以用正则区分开，然后放到数组中进行循环遍历。
        var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (!_this.hasClass(curEle, curClass)) {
                curEle.className += ' ' + curClass;
            }
        }
    }
    //removeClass:移除掉当前元素上的class名

    //判断是否含有Class
}
//刷新完成
    loadingFinish(outerScroller,preloader,scrollList) {
        let _this = this;
        scrollList.style ?  scrollList.style.overflow = 'auto': null ;
        preloader.style ? preloader.style.display = 'none': null;
        //将页面还原
        // return;
        var LFT = setInterval(function () {
            outerScroller.style.top= parseInt(outerScroller.style.top)-3+'px';
            if(!outerScroller.style.top){
                clearInterval(LFT);
                return;
            }
            if( parseInt(outerScroller.style.top) <= _this.state.defaultTop){
                clearInterval(LFT);
                if(outerScroller.offsetTop<_this.state.defaultTop){
                    outerScroller.style.top = _this.state.defaultTop +'px'
                }
                //进行新的一轮监听
                //
                _this.pullToRefresh(_this.refs.outerScroller,_this.refs.pullToRefreshBox,_this.refs.scrollList,_this.refs.preloader,_this.refs.pullToRefreshArrow)
                // checkState(outerScroller.offsetTop)
                _this.refs.pullToRefreshArrow.style.display = 'block';
                _this.removeClass(_this.refs.pullToRefreshBox,'up')
            }
        },10)
    }
    removeClass(curEle, strClass) {
        var aryClass = strClass.replace(/(^\s+)|(\s+$)/g, '').split(/\s+/g);
        for (var i = 0; i < aryClass.length; i++) {
            var curClass = aryClass[i];
            if (this.hasClass(curEle, curClass)) {
                var reg = new RegExp('(^| +)' + curClass + '( +|$)');
                curEle.className = curEle.className.replace(reg, ' ')
            }
        }
    }
    hasClass(curEle, strClass) {
        var reg = new RegExp('(\\b)' + strClass + '(\\b)');
        return reg.test(curEle.className)
    }
    //列表
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
                <div className=" outerScroller" id="outerScroller" ref="outerScroller">
                    <div className="pullToRefreshBox" id="pullToRefreshBox" ref="pullToRefreshBox">
                        <div className="preloader" id="" ref="preloader"></div>
                        <div className="pullToRefreshArrow" id="" ref="pullToRefreshArrow"></div>
                    </div>
                    <ul style={{background:"#eee"}} className="scroll" ref="scrollList">
                        {this.indexList()}
                    </ul>
                </div>
            </main>
        );
    }
}
export default IndexList;
