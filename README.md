# justForYou 
### 喜欢请star
交流QQ:181867715 
### 技术栈 : React + React-Router + Redux + webpack + babel + Node + express + mongodb 等

#### 分为两个版本：使用 redux   和  不使用redux
[在线redux版本](http://demo.manster.me/justForYouRedux/build/#/?_k=iki4)
[在线普通版本](http://demo.manster.me/justForYou/build/#/?_k=r6tst4)
> **问题一 ：为何要写成两个版本？**
> - 这个Demo完全不需要使用redux，因为数据流很简单，最开始一直是普通版本，运行很正常。
> 
> **问题二 ：为何要写成两个版本？？**
> - 为了给新手展示最基本的redux怎么使用，**初学Redux**的朋友看文档理论感觉挺简单，一上手就感觉懵逼，这个两个Demo是为初学**React**和**Redux**的朋友们准备的。

#### 前端UI:sui-mobile  
#### 后端:Node+mongodb
#### 交互: fetch+ajax
#### 打包工具: webpack
#### 转译工具: babel
#### 数据流控制:  redux

<img src="https://github.com/rongchanghai/justForYou/blob/master/screenshots/gif.gif" width="365" height="619"/>
<img src="https://github.com/rongchanghai/justForYou/blob/master/screenshots/2.png" width="365" height="619"/>

<img src="https://github.com/rongchanghai/justForYou/blob/master/screenshots/1.png" width="365" height="619"/>
<img src="https://github.com/rongchanghai/justForYou/blob/master/screenshots/3.png" width="365" height="619"/>

<img src="https://github.com/rongchanghai/justForYou/blob/master/screenshots/4.png" width="365" height="619"/>
<img src="https://github.com/rongchanghai/justForYou/blob/master/screenshots/5.png" width="365" height="619"/>

--------------------------------------------
### 2017.8.4 更新
两个版本的react-router 由 2.+  升级 最新版本 4.1.2，具体文档在末尾更新



## 下载
```
git clone https://github.com/rongchanghai/justForYou.git
cd justForYou
npm install 
```

## 运行
```
npm run dev  (运行普通版本)
npm run devRedux (运行Redux版本)
```
## 项目目录
```
|-- build                           // 打包文件
|-- justForYou						//Node文件跟目录	
|   |--db  							//数据库配置	
|      |--index.js
|   |--routes                       //express路由
|      |--article.js                //管理文章的路由部分 
|      |--user.js 					//管理用户的路由部分
|   |--upload  						//上传的头像
|   |--utils						//工具
|      |--md5.js
|   |--server.js					//node主文件
|   |--settings.js                  // 连接数据库配置文件
|-- noReduxsrc                  //**没有使用redux的版本    
|   |--Component				//组件目录
|      |--articleDetail			//文章详情
|      |--Create				//发表文章
|      |--IndexList				//文章列表
|      |--Login					//登录注册
|      |--Me					//个人页面
|      |--dataModel.js			//数据交互模型
|      |--main.js				//主文件
|   |--Config					//路由配置
|      |--route-config.js		//配置文件  两种（按需加载和非按需加载）
|   |--static					//静态文件目录
|      |--css					//css文件
|         |--style.css
|      |--img					//默认头像
|         |--default.png
|   |--Tools					//时间转换工具
|      |--index.js
|   |--app.js					//react主文件
|   |--index.html				//html模板
|-- screenshots					//截屏
|-- src						//**redux版本
|   |--Actions				//action 目录
|      |--index.js			//actions 文件
|   |--Component			//容器组件 和上面相同
|      |--articleDetail		
|      |--Create
|      |--IndexList
|      |--Login
|      |--Me
|      |--main.js
|   |--Config				//同上
|      |--route-config.js
|   |--Containers			//数据组件
|      |--articleDetail.js  //文章详情的数据组件
|      |--indexList.js      //主列表的数据组件
|   |--Reducers				//reducer目录
|      |--index.js			//reducer 文件
|   |--static				
|   |--store				//store目录
|      |--index.js			//store整合文件
|   |--Tools
|   |--app.js
|   |--index.html
|-- utils					//工具
|   |--md5.js				//md5 加密文件
|-- .babelrc				// babel解析配置
|-- .gitignore				//git上传忽视配置
|-- package.json			
|-- webpack.config.js		//webpack 普通版本配置文件
|-- webpack.config.redux.js //webpack redux版本配置文件
|-- wepack-production.config.js //生产环境打包配置
```



# 总结

## React全家桶都有什么，为何使用？
大体包括 **React**、**React-Router**、**Redux**、**ES6**、**WebPack**、**Babel**等……
>大多数人都认为**React**是一个类似于**Angular**的前端框架，但其实他们之间是不可比较的。Angular是一个完整的框架，而React只是一个View层。React和Vue是一个级别的，只能算作是一个UI框架。

因为**React**只是一个**view层**，只负责展示，所以其他的方面就需要其他工具的辅助。
路由跳转可以使用**React-Router**。
因为React已经全面拥抱**ES6**，所以我们在编码的时候使用**ES6**，会让我们的编码变得很顺畅。
但是大多数浏览器都**ES6**或者**ES7**不怎么友好，这个时候你需要**Babel**来为你转译为**ES5**。 
因为**React的数据流是单向的**，只能自顶向下，同级别组件传递的时候只能通过共同的父组件交流，所以当你的数据流比较复杂的时候你就应该使用**Redux**来替你管理数据流了。
至于说**webpack**嘛，**前端工程化**哪里少的了打包工具啊！

### 使用React的好处，何时需要使用React？

>2004年Gmail的推出，让大家发现，单页面应用的互动也可以如此流畅，2010年前端单页应用框架接踵而至，2013年React横空出世，独树一帜：单向绑定、声明式UI，大大简化了大型应用的构建。Facebook发布的技术产品总是包含伟大的思想，VirtualDOM、服务端渲染、power native apps，这些概念引发了新的思考，同时React和以往的MVC开发模式不同，它没有Controller，因为他不关心户交互怎么处理，数据变化谁来管理，它只负责UI渲染，是MVVM模式。

我们都知道在一系列行为中，操作DOM的代价是非常昂贵的，但是前后端分离之后，前后端交流依赖ajax和json，避免不了会插入或者删除DOM。频繁的操作DOM会造成页面卡顿，这是我们都不想看到的。React的virtualDOM（虚拟DOM）就可以很好的解决这个问题。

谈虚拟DOM之前我们先聊一下组件化
### React组件化

React推崇使用组件化开发的方式来开发项目，允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件，React的组件元素被描述成纯粹的JSON对象，由三部分组成——属性(**props**)，状态(**state**)以及**生命周期方法**。

#### state：
React 的组件使用 状态机 的概念来描述 组件本身的可变数据。要获取组件的状态都需要通过 this.state 来获取，在 constructor（构造函数）中，可以通过 this.state 来设置组件的初始状态。要改变状态就必须并且只能通过 **this.setState** 方法来改变，不能通过直接修改 this.state.xxx = "xxx" 来进行修改，因为 this.state 的值是 immutable（不可变） 的。可以认为 state 有自己的 setter 和 getter 方法，这样能更好的理解。
React 使用状态机来简化了繁琐的 DOM 操作，传统开发模式中繁琐的 DOM 操作都可以转变成状态的改变，底层的 DOM 操作由 React 来接管。如果你在使用 React 开发应用的时候想着应该怎么操作 DOM，这时候需要反思一下是不是使用 React 的方式有问题。
#### props：
props是React中一个重要的概念，他是properties的缩写。props是React用来组件间互相联系的一种机智，通俗的说就像方法的参数一样。React的单向数据流，主要的流通管道就是props，props本身是不可变的，当我们试图改变props的时候，React就会报出类型错误的警告。组件的props一定是来自于默认的属性或者通过父组件传递进来的。
众所周知JS是一个弱类型的语言，在一些类型上面约束不强。所以就有了propTypes。propType用于规范props的类型与必需的状态，如果定义了propTypes，那么在开发过程中会对props的类型做检查，如果不匹配，会报出warning，在生产环境是不检查的。大体写法有
```
static propTypes = {
	prop1:React.propTypes.string,
	prop2:React.propTypes.number,
	prop2:React.propTypes.func,
	prop2:React.propTypes.func.isRequired,
	prop2:React.propTypes.array,
	
}
```
更多的数据类型说明，请参见 [属性校验的官方文档](https://facebook.github.io/react/docs/components-and-props.html) 。

#### lifecycle 生命周期
React 的组件有几大生命周期，在这些生命周期内，组件本身提供了一些事件接口，这些事件和 Virtual DOM 的事件不一样，是组件本身会触发的事件。
生命周期按照阶段来划分的话，按照先后顺序分为 5 个阶段：

1. 初始化（指定默认的 state 和 props 来初始化组件）；
2. 渲染（ render ）；
3. 装载（ mount ，装在前和装载完毕都有相应的事件）；
4. 更新（ state 和 props 的更新，都会触发相应的事件）；
5. 卸载（ unmount 组件销毁）；

![](http://demo.manster.me/img/react-lifecycle.png)

  **1、getDefaultProps()** 
> 设置默认的props，也可以用dufaultProps设置组件的默认属性。如果是使用 ES6 语法，可以直接定义 defaultProps 这个类属性来替代，这样能更直观的知道 default props 是预先定义好的对象值。
```
Counter.defaultProps = { initialCount: 0 };
```


  **2、getInitialState()**  
> 在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props。
```
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: props.initialCount };
  }
  render() {
    // ...
  }
}
```


 **3、componentWillMount()** 
> 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。


 **4、 render()** 
>  react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。


 **5、componentDidMount()** 
> 组件渲染之后调用，可以通过this.getDOMNode()获取和操作dom节点，只调用一次。

**在更新时也会触发5个钩子函数：**

  **1、componentWillReceivePorps(nextProps)**
> 组件初始化时不调用，组件接受新的props时调用。


  **2、shouldComponentUpdate(nextProps, nextState)** 
> react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候。不过调用this.forceUpdate会跳过此步骤。


  **3、componentWillUpdata(nextProps, nextState)**
> 组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state


  **4、render()**
> 同上面所说


  **5、componentDidUpdate()**
> 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点

**还有一个卸载钩子函数**

  **1、componentWillUnmount()** 
> 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

### 虚拟DOM
> React中最神奇的部分莫过于虚拟DOM，以及其高效的Diff算法。这让我们可以无需担心性能问题而”毫无顾忌”的随时“刷新”整个页面，由虚拟DOM来确保只对界面上真正变化的部分进行实际的DOM操作。React在这一部分已经做到足够透明，在实际开发中我们基本无需关心虚拟DOM是如何运作的。
此外，React实现了一套完整的事件合成机制，能够保持事件冒泡的一致性，跨浏览器执行。甚至可以在IE8中使用HTML5的事件。
大部分情况下，我们都是在构建React的组件，也就是操作虚拟DOM。但是有时候我们需要访问底层的API，可能或通过使用第三方的插件来实现我们的功能，如jQuery。React也提供了接口让我们操作底层API

#### 什么是diff算法
> Web界面由DOM树来构成，当其中某一部分发生变化时，其实就是对应的某个DOM节点发生了变化。在React中，构建UI界面的思路是由当前状态决定界面。前后两个状态就对应两套界面，然后由React来比较两个界面的区别，这就需要对DOM树进行Diff算法分析。
即给定任意两棵树，找到最少的转换步骤。但是标准的的Diff算法复杂度需要O(n^3)，这显然无法满足性能要求。要达到每次界面都可以整体刷新界面的目的，势必需要对算法进行优化。这看上去非常有难度，然而Facebook工程师却做到了，他们结合Web界面的特点做出了两个简单的假设，使得Diff算法复杂度直接降低到O(n)

react提出了一种假设，相同的节点具有类似的结构，而不同的节点具有不同的结构。在这种假设之上进行逐层的比较，如果发现对应的节点是不同的，那就直接删除旧的节点以及它所包含的所有子节点然后替换成新的节点。如果是相同的节点，则只进行属性的更改。
- 两个相同组件产生类似的DOM结构，不同的组件产生不同的DOM结构；
- 对于同一层次的一组子节点，它们可以通过唯一的id进行区分。

对于列表的diff算法稍有不同，因为列表通常具有相同的结构，在对列表节点进行删除，插入，排序的时候，单个节点的整体操作远比一个个对比一个个替换要好得多，所以在创建列表的时候需要设置key值，这样react才能分清谁是谁。当然不写key值也可以，但这样通常会报出警告，通知我们加上key值以提高react的性能
![](http://demo.manster.me/img/diff.png)

## React-Router路由
React Router 是一个基于 React 之上的强大路由库，它可以让你向应用中快速地添加视图和数据流，同时保持页面与 URL 间的同步。它可以被看做一个组件，不会被渲染到页面中，它反映出来的只是一种URL和页面组件的映射关系。，根据匹配的路由地址来展示相应的组件。
Route可以向绑定的组件传递7个属性：**children**，**history**，**location**，**params**，**route**，**routeParams**，**routes**，每个属性都包涵路由的相关的信息。([详细的API说明](https://react-guide.github.io/react-router-cn/docs/API.html#router))。比较常用的有children（以路由的包涵关系为区分的组件），location（包括地址，参数，地址切换方式，key值，hash值）。react-router提供Link标签，允许用户浏览应用的主要方式。< Link> 以适当的 href 去渲染一个可访问的锚标签。这只是对a标签的封装，值得注意的是，点击链接进行的跳转并不是默认的方式，react-router阻止了a标签的默认行为并用pushState进行hash值的转变。切换页面的过程是在点击Link标签或者后退前进按钮时，会先发生url地址的转变，Router监听到地址的改变根据Route的path属性匹配到对应的组件，将state值改成对应的组件并调用setState触发render函数重新渲染dom。` <Link>` 可以知道哪个 route 的链接是激活状态的，并可以自动为该链接添加 **activeClassName** 或 **activeStyle**。
> **注意：**React Router 目前还不能管理滚动条的位置，并且不会自动滚动到 hash 对应的元素上。如果需要管理滚动条位置，可以使用 scroll-behavior 这个库。


简单的例子：
#### 不使用React-Router
```
import React from 'react'
import { render } from 'react-dom'

const About = React.createClass({/*...*/})
const Inbox = React.createClass({/*...*/})
const Home = React.createClass({/*...*/})

const App = React.createClass({
  getInitialState() {
    return {
      route: window.location.hash.substr(1)
    }
  },

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  },

  render() {
    let Child
    switch (this.state.route) {
      case '/about': Child = About; break;
      case '/inbox': Child = Inbox; break;
      default:      Child = Home;
    }

    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><a href="#/about">About</a></li>
          <li><a href="#/inbox">Inbox</a></li>
        </ul>
        <Child/>
      </div>
    )
  }
})

React.render(<App />, document.body)
```
当 URL 的 hash 部分（指的是 # 后的部分）变化后，` <App>` 会根据 this.state.route 来渲染不同的 ` <Child>`。看起来很直接，但它很快就会变得复杂起来。
#### 使用 React Router 后
```
import React from 'react'
import { render } from 'react-dom'

// 首先我们需要导入一些组件...
import { Router, Route, Link } from 'react-router'

// 然后我们从应用中删除一堆代码和
// 增加一些 <Link> 元素...
const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        {/* 把 <a> 变成 <Link> */}
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>

        {/*
          接着用 `this.props.children` 替换 `<Child>`
          router 会帮我们找到这个 children
        */}
        {this.props.children}
      </div>
    )
  }
})

// 最后，我们用一些 <Route> 来渲染 <Router>。
// 这些就是路由提供的我们想要的东西。
React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} />
    </Route>
  </Router>
), document.body)
```
React Router 知道如何为我们搭建嵌套的 UI，因此我们不用手动找出需要渲染哪些 ` <Child>` 组件。举个例子，对于一个完整的 /about 路径，React Router 会搭建出 ` <App><About/></App>`。

在内部，router 会将你树级嵌套格式的 ` <Route/>` 转变成路由配置。但如果你不熟悉 JSX，你也可以用普通对象来替代：
```
const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'about', component: About },
    { path: 'inbox', component: Inbox },
  ]
}

React.render(<Router routes={routes} />, document.body)
```
#### 根据路由做按需加载
单页面应用如果规模足够大的话，生成的主文件js体积非常大，这就会产生一个首次加载缓慢的问题，这时候就需要按需加载，只有切换到页面的时候才去加载对应的js文件。react配合webpack进行按需加载的方法很简单，Route的**component**改为**getComponent**，组件用**require.ensure**的方式获取，并在**webpack**中配置**chunkFilename**。
> **注意：** 不是所有的项目都适合做按需加载，如果使用webpack做了**按需加载**，webpack会在主文件中生成一个按需加载的表，会在一定程度上**增加**主文件的体积，如果这个时候你按需加载分出去的模块总体积还没有主文件增加的体积大，那么这就有点得不偿失。
> **建议按需加载的模块单个体积在100k+，这个时候做按需加载会更好。**

` 本项目其实不需要做按需加载，因为模块很小，之所以这么做是为了展示如何去做。 并在项目中保留了普通路由的代码`

> 模块导出的时候请使用 **module.exports = XXX**
##### 实例代码

```
const news = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/news').default)
    },'chooseProducts')
}

const videos = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/videos').default)
    },'helpCenter')
}

const books = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../Component/books').default)
    },'saleRecord')
}

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <IndexRoute component={index} />
            <Route path="index" component={index} />
            <Route path="news" getComponent={news} />
            <Route path="books" getComponent={books} />
            <Redirect from='*' to='/'  />
        </Route>
    </Router>
);
```

##### webpack配置chunkFilename

```
...
output:{
        path:'./build',
        filename:'bundle.js',
        chunkFilename:'js/[name].[chunkhash:5].js'
    },
...
```

## Redux
Redux 是 JavaScript 状态容器，提供可预测化的状态管理。 
> 首先明确一点的就是：Redux并不是React必须的，也没有任何依赖，你可以很自由的将他应用到各种前端框架、jQuery、原生JS中，它只是一个数据流管理工具。

使用Redux来管理React数据流之前我们先来了解一下React的数据流：
- React推崇的是单向数据流，自上而下进行数据传递。
- 父组件可以通过` Props`将数据传给子组件。
- 子组件可以通过回调函数来将数据传递到父组件。
- 多级嵌套组件可以通过` getChildContext`来传递，这样避免的使用` props`来进行多级传递，需要接受数据的子组件通过` this.context`可以获取到

但是同级别的组件之间的传递，需要将数据传到其共同的父组件中，然后在通过` props`进行分发，如果数目多，层级深，数据流将会变得非常难管理。

这个时候我们就需要用到**Redux**。
![](http://demo.manster.me/img/redux.jpg)

详细的文档请[参见官方](http://cn.redux.js.org/index.html),这里按照我的理解整理一下。

> **Redux** 主要分为三个部分 **Action**、**Reducer**、 **Store**

### Redux三大原则
> - 单一数据源：整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
> - State 是只读的：惟一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
> - 使用纯函数来执行修改：为了描述 action 如何改变 state tree ，你需要编写 reducers。


### store
> Redux 应用只有一个**单一**的 **store** (不同于Flux)。它是数据管理中心。

### action
> action 是一个带有type的对象，**dispatch**一个**action**是**改变state的唯一法门**，代表着发生了一些事情。

### reducer
> 是一个**纯函数**。Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 **reducer** 要做的事情。` （preState,action）=> newState`。
> **永远不要在reducer里做这些操作**
> - 修改传入参数；
> - 执行有副作用的操作，如 API 请求和路由跳转；
> - 调用非纯函数，如 Date.now() 或 Math.random()

根据业务逻辑可以分为很多个reducer，然后通过` combineReducers`将它们合并

```
const RootReducer = combineReducers({
     video,
     books,
     news
})
```

` 开发复杂的应用时，不可避免会有一些数据相互引用。建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据。把应用的 state 想像成数据库。这种方法在 normalizr 文档里有详细阐述`

通俗一点来讲就是：
action代表用户行为，我们都会创建一个action creater来帮我们生成action。` 行为的抽象`
reducer代表用户行为真正的实施了，需要给点回应 （state），` 响应的抽象`

所以通常只用Redux的话，开发流程应该是这个样子的：
` component --> dispatch(actionCreater) --> reducer --> subscribe --> getState --> component`

这里dispatch ，subscribe，getState 都需要我们自己来写。

这个时候我们就可以使用React-Redux了
#### React-Redux
react-redux是redux为结合react使用而造出来的一个工具库。类似的还有vue-redux、angular-redux....
简单到只提供了一个APi：connect，一个组件：Provider。

connect将组件与redux关联起来，Provider将store传给组件。组件通过dispatch发出action，store根据action的type属性调用对应的reducer并传入state和这个action，reducer对state进行处理并返回一个新的state放入store，connect监听到store发生变化，调用setState更新组件，此时组件的props也就跟着变化。

将组件和redux关联起来需要` mapStateToProps`,` mapDispatchToProps` 这两个函数作为参数。

通俗来讲：
- ` mapStateToProps` 就是用来绑定数据的，也就是说store返给了你所有的state，你在这个函数中，挑出当前组件所需的返回出来就可以了。
- ` mapDispatchToProps` 就是用来绑定事件的，将你需要在组件中调用的方法，在这里挑选出来。大多是可以触发` dispatch(action)`的方法。

Demo中的代码：
```
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
```
在这里盗用一张图
![](https://github.com/rongchanghai/justForYou/blob/master/screenshots/all_redux.png)

这样我们就会发现使用的React-Redux的开发流程是这样的：
` component --> actionCreator(data) --> reducer --> component`  
中间省去的store的操作都不需要我们手动去写了，React-Redux帮我们去做。

#### redux-thunk
看redux官方Todo例子的小伙伴都会有一个疑问就是，我怎么去进行ajax请求啊！？没有数据交流的前端感觉就是一坨** 。
具体在redux的哪一步进行异步请求，我这里就不说了，[阮一峰博客中很详细](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)，这里我就只简单说一下怎么在action中使用。
这要归功于redux允许我们扩展其中间件，
普通的action是一个带有type的对象，在中间件中扩展了redux-thunk之后，其允许我们在actionsCreater中返回一个带有dispatch的function。
这样我们可以在异步代码中调用dispatch(action)来改变state；
盗用一张阮一峰老师的图
![](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016092003.jpg)  

**具体的代码请参见Demo**

### 项目总结
简单的说一下我是怎么开发这个小Demo的，只说redux前端部分：
1、**设计State**，这是最重要的一步，他决定了你的action和reducer怎么写。
2、先写内容组件component，这一部分只是UI展示，不负责数据交流。
3、根据State来写actionCreater，thunk和普通的action区分开，导出thunk。
4、根据State来写reducer，按照state和模块将reducer分开，最后使用combineReducers合成一个总的Reducer。
5、整合store，根据Reducer和中间件来生成store。
6、现在根据component来写container，这一部分只负责数据、状态。

大体的开发流程就是这个样子的。

-----------------------------------

#### 2017.8.4 更新  react-router4 文档 

### react-router 4 部分 升级文档

reactr-router4 与之前的版本相比有较大的变化，个人认为最棒的就是Router 和 JSX可以混着写，RR4 本次采用单代码仓库模型架构（monorepo），这意味者这个仓库里面有若干相互独立的包，分别是：

` react-router ` React Router 核心

` react-router-dom ` 用于 DOM 绑定的 React Router

` react-router-native `用于 React Native 的 React Router

` react-router-redux ` React Router 和 Redux 的集成

` react-router-config ` 静态路由配置的小助手

#### 在react项目中使用什么

在之前版本中使用router的话一般我们就直接引入` react-router ` ,现在我们 引用` react-router-dom ` 也可以 ，不同之处就是后者比前者多出了 ` <Link> `  ` <BrowserRouter> ` 这样的 DOM 类组件。
当然，如果搭配 redux ，你还需要使用 ` react-router-redux `。

###组件

#### BrowserRouter

1. basename: 设置基准的 URL，使用场景：应用部署在 服务器的二级目录，将其设置为目录名称，不能以 /结尾，设置之后跳转的页面都会加上 basename的前缀

2. forceRefresh: 是否强制刷新页面，用于适配不支持 h5 history 的浏览器

3. getConfirmation: 弹出浏览器的确认框，进行确认

对比：

```
// 4.0 之前写法
  <Router history={history}>
      <App/>
    </Router>
    
    
// 4.0 之后写法
    
    <BrowserRouter> 或者 <HashRouter>

```

#### Route 

 并没有太大的变化，注意，如果path没有赋值，那么此Route就是默认渲染的。 可以代替 ` indexRoute ` 
 当然，Route其实还有几个属性，比如location，strict,chilren 希望你们自己去[了解一下](https://reacttraining.com/react-router/web/api/Router)。

#### Link 

` to:string ` 链接到的路径名或位置

` to: object ` 连接的位置

` replace: bool `  如果为true，单击链接将替换历史堆栈中的当前条目，而不是添加新条目。

#### NavLink

新增的特殊的Link，用于导航
` activeClassName：string ` 当活动时给出元素的类。默认给定的类是active。这将与className道具相结合。

` activeStyle：object ` 当元素处于活动状态时应用于元素的样式。

` exact: bool `  当为true 时，仅当位置匹配完全时才会应用活动类/样式。 就是 /a/b 和 /a  的区别

[详细文档](https://reacttraining.com/react-router/web/api/Link)

#### Switch 

渲染第一个 组件 ` <Route> `或` <Redirect> ` 匹配该位置。

<Switch>是独一无二的，因为它会匹配单个。相比之下，<Route>与位置匹配的每个都包含在内

```
 //如果URL是/about，那么<About>,<User>,<NoMatch>将全部渲染，因为它们都匹配路径
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>


// 如果我们只想匹配一个路由组件，应该写为

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>

```

这个对于动画的执行很有用，可以明确到哪个路由离开哪个路由进入


具体是实例和实现项目中有，[react-router 详细文档](https://reacttraining.com/react-router/web/api/BrowserRouter)  



##### 根据自己的想法并参考一些大神的博客等写了这个Demo和文档，如果对你有一些帮助，就请star一下吧 😊
这个文档还会继续完善……
