import React from 'react';
import {UserModel,PulishModel} from '../dataModel';
import '../../static/style.css';
let Styles = {
    indexList:{
        paddingRight:'0.75rem',
        marginBottom:'0.2rem',
        borderTop:'1px solid #dfdfdf',
        borderBottom:'1px solid #dfdfdf',
        background:"#fff"
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
        PulishModel.fetchList('',(data)=>{
            console.log(data,'-*-*-*-')
            this.setState({
                list:data,
            })
        },(err)=>{
            console.log(err,'err')
            // $.alert(err);
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
    indexList(){
        let _this = this
        let list = this.state.list;
        return  list.map(function (item,index) {
            return(
                <li className="item-content" style={Styles.indexList} key={item._id}>
                    <div className="list">
                        <div className="" style={{paddingTop:'0.4rem'}}>
                            <div style={{display:'inline-block',verticalAlign:'top',height:'2rem'}}>
                                <img src={item.user.avatar} style={{marginRight:'0.3rem',height:'1.7rem',display:'inline-block'}}  alt=""/>
                            </div>
                            <div style={{display:'inline-block',verticalAlign:'top',height:'2rem'}}>
                                <div style={{fontSize:'14px',fontWeight:600}}>{item.user.username}</div>
                                <div style={{fontSize:'12px'}}>{_this.dateDiff(item.createAt)}</div>
                            </div>

                        </div>
                        <div className=""><h4 style={Styles.h4Style}>{item.title}</h4></div>
                        <div className=""><p style={Styles.pStyle}>{item.content}</p></div>
                    </div>
                </li>)
        })
    }


    render() {
        return (
            <mian>
                <div className="content">
                    <div className="list-block" style={Styles.listBlock}>
                        <ul style={{background:"#eee"}}>
                            {this.indexList()}

                        </ul>
                    </div>

                </div>
            </mian>
        );
    }
}
export default IndexList;
