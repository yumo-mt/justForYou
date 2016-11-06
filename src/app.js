import React from 'react';
import { render } from 'react-dom';
import {Router,Route,hashHistory,Link,IndexRoute,Redirect,browserHistory} from 'react-router';

import RouteConfig from './Config/route-config';


let root = document.getElementById('app');
render(
    <RouteConfig/>
    ,root);

