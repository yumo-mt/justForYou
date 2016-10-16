import React from 'react';
import {UserModel} from '../dataModel';
class Me extends React.Component {
    constructor(props){
        super(props);
        //判断是否登录
        var token = UserModel.fetchToken()
        if(!token){
            location.hash = "/login";

        }
        this.state = {
            loginFlag: false,
            username:'',
            email:'',
            password:'',
            rpassword:''
        };
    }

    componentDidMount(){

    }
    render() {
        return (
            <div>
                <h1>this is Me</h1>
            </div>
        );
    }
}
export default Me;
