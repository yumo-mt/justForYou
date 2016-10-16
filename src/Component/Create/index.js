import React from 'react';
class Create extends React.Component {
    componentDidMount(){
        console.log('App componentDidMount');
    }

    componentWillReceiveProps(){
        console.log('App componentWillReceiveProps');
    }

    componentDidUpdate(){
        console.log('App componentDidUpdate');
    }
    render() {
        return (
            <div>
                <h1>this is 发表</h1>
            </div>
        );
    }
}
export default Create;
