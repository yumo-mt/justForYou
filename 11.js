var Router = ReactRouter; // 由于是html直接引用的库，所以 ReactRouter 是以全局变量的形式挂在 window 上
var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;
var StateMixin = ReactRouter.State;
var Redirect = ReactRouter.Redirect;


/**
 * 图书列表组件
 */
var Books = React.createClass({
    render: function() {
        return (
            <div>
                <ul>
                    <li key={1}><Link to="book" params={{id: 1}}>活着</Link></li>
                    <li key={2}><Link to="book" params={{id: 2}}>挪威的森林</Link></li>
                    <li key={3}><Link to="book" params={{id: 3}}>从你的全世界走过</Link></li>
                </ul>
                <RouteHandler />
            </div>
        );
    }
});

/**
 * 单本图书组件
 */
var Book = React.createClass({
    mixins: [StateMixin],

    render: function() {
        return (
            <article>
                <h1>这里是图书 id 为 {this.getParams()['id']} 的详情介绍</h1>
            </article>
        );
    }
});

/**
 * 电影列表组件
 */
var Movies = React.createClass({
    render: function() {
        return (
            <div>
                <ul>
                    <li key={1}><Link to="movie" params={{id: 1}}>煎饼侠</Link></li>
                    <li key={2}><Link to="movie" params={{id: 2}}>捉妖记</Link></li>
                    <li key={3}><Link to="movie" params={{id: 3}}>西游记之大圣归来</Link></li>
                </ul>
                <RouteHandler />
            </div>
        );
    }
});

/**
 * 单部电影组件
 */
var Movie = React.createClass({
    mixins: [StateMixin],

    render: function() {
        return (
            <article>
                <h1>这里是电影 id 为 {this.getParams().id} 的详情介绍</h1>
            </article>
        );
    }
});






// 应用入口
var App = React.createClass({
    render: function() {
        return (
            <div className="app">
                <nav>
                    <a href="#"><Link to="movies">电影</Link></a>
                    <a href="#"><Link to="books">图书</Link></a>
                </nav>
                <section>
                    <RouteHandler />
                </section>
            </div>
        );
    }
});


// 定义页面上的路由
var routes = (
    <Route handler={App}>
        <Route name="movies" handler={Movies}>
            <Route name="movie" path=":id" handler={Movie} />
        </Route>
        <Route name="books" handler={Books}>
            <Route name="book" path=":id" handler={Book} />
        </Route>
    </Route>
);


// 将匹配的路由渲染到 DOM 中
Router.run(routes, Router.HashLocation, function(Root){
    React.render(<Root />, document.body);
});

