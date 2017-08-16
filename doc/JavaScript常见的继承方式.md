### JavaScript继承常用的几种方法

飙车上高速，快速掌握js继承的多种方式。

首先需要了解原型链机智：
在ECMAscript中描述了原型链的概念，并将原型链作为实现继承的主要方法，其基本思想就是利用原型让一个引用类型继承另一个引用类型的属性和方法。

构造函数和原型还有实例之间的关系：每个构造函数都有一个原型对象（prototype），原型对象都包含一个指向构造函数的指针（constructor），而实例都包含一个指向原型对象的内部指针 ```（__propto__）``` 。

![](http://www.manster.me/wp-content/uploads/2016/07/12233144.jpg)

其实每一个Function都是Object基类的一个实例，所以每一个Function上都有一个__proto__指向了Object.prototype。当查找一个实例的属性时，会先从这个实例的自定义属性上找，如果没有的话通过__proto__去实例所属类的原型上去找，如果还没有的话再通过原型（原型也是对象，只要是对象就有__proto__属性）的__proto__到Object的原型上去找，一级一级的找，如果没有就undefined。

可以说引用类型之间的继承就是通过原型链机制实现的。到这里我们就可以看一下第一种继承方法，原型继承

### 1. 原型继承

原型继承：把父类的私有+公有的属性和方法，都作为子类公有的属性。

核心：不是把父类私有+公有的属性克隆一份一模一样的给子类的公有吧；他是通过__proto__建立和子类之间的原型链，当子类的实例需要使用父类的属性和方法的时候，可以通过__proto__一级级找上去使用；


 ```$xslt

function Parent(){
	this.x = 199;
	this.y = 299;
}
Parent.prototype.say = function(){
	console.log('say')
}
function Child(){
	this.g = 90;
}
Child.prototype = new Parent();
var p = new Parent();
var c = new Child();
console.dir(c)

```

实现的本质是重写了原型对象 ，通过将子类的原型指向了父类的实例，所以子类的实例就可以通过```__proto__```访问到 ```Child.prototype``` 也就是 Parent的实例，这样就可以访问到父类的私有方法，然后再通过```__proto__```指向父类的```prototype```就可以获得到父类原型上的方法。这样就做到了将父类的私有、公有方法和属性都当做子类的公有属性。这样就通过原型链实现了继承。但是别忘了默认的原型，因为所有引用类型都是继承了Object的，所有说子类也可以访问到Object上的方法如toString() 、valueOf() 等。

![](http://www.manster.me:80/wp-content/uploads/2016/07/35944-300x161.jpg)


这个时候我们可以通过instanceof检测一下会发现

```$xslt
alert(c instanceof Object)   //true
alert(c instanceof Parent)   //true
alert(c instanceof Child)    //true
```

但是，需要我们注意一点的是，有的时候我们需要在子类中添加新的方法或者是重写父类的方法时候，切记一定要放到替换原型的语句之后。

```$xslt

function Parent(){
	this.x = 199;
	this.y = 299;
}
Parent.prototype.say = function(){
	console.log('say')
}
function Child(){
	this.g = 90;
}
/*Child.prototype.Bs = function(){
	console.log('Bs')
}*/在这里写子类的原型方法和属性是没用的因为会改变原型的指向，所以应该放到重新指定之后
Child.prototype = new Parent();
Child.prototype.constructor=Child//由于重新修改了Child的原型导致默认原型上的constructor丢失，我们需要自己添加上，其实没啥用，加不加都一样
Child.prototype.Bs = function(){
	console.log('Bs')
}
Child.prototype.say = function(){
	console.log('之后改的')
}
var p = new Parent();
var c = new Child();
console.dir(c)
c.Bs()  //Bs
c.say()   // 之后改的
p.say()  //say 不影响父类实例访问父类的方法

```

原型继承的问题：

1、子类继承父类的属性和方法是将父类的私有属性和公有方法都作为自己的公有属性和方法，我们要清楚一件事情就是我们操作基本数据类型的时候操作的是值，在操作应用数据类型的时候操作的是地址，如果说父类的私有属性中引用类型的属性，那他被子类继承的时候会作为公有属性，这样子类一操作这个属性的时候，会影响到子类二。

2、在创建子类的实例时，不能向父类型的构造函数中传递参数。应该说是没有办法在不影响所有对象实例的情况下，给父类的构造函数传递参数

所以在实际中很少**单独使用原型继承**。

### 2.call继承
第二种继承是call继承，call方法的使用相信大家应该很熟悉，将方法的this指向改变同时执行方法。 在子类构造函数中 父类.call(this)  可以将父类的私有变成子类的私有

```$xslt
function Parent() {
	this.x = 100;
	this.y = 199;
}
Parent.prototype.fn = function() {}
 
function Child() {
	this.d = 100;
	Parent.call(this); //构造函数中的this就是当前实例
}
var p = new Parent();
var c = new Child();
console.log(p)  //Parent {x: 100, y: 199}
console.log(c)  //Child {d: 100, x: 100, y: 199}

```

这个是很好理解的，在子类的构造函数中，改变父类的this指向，改变为子类的实例，同时运行父类方法，这样父类中的this.x就变成了  子类的实例.x ,通过这种方法就可以继承了父类的私有属性，且只能继承父类的私有属性和方法。也许你会问那我```Parent.prototype.call(this)``` 不就可以继承父类的公有属性和方法么，我只能默默的说一句，call是Function的方法。

### 3、冒充对象继承

冒充对象继承的原理是循环遍历父类实例，然后父类实例的私有方法全部拿过来添加给子类实例


```$xslt
function Parent(){
	this.x = 100;
}
Parent.prototype.getX = function(){
	console.log('getX')
}
function Child(){
	var p = new Parent();
	for(var attr in p){//for in 可以遍历到原型上的公有自定义属性
		this[attr] = p[attr]
	}
	//以下代码是只获得到私有方法和属性，如果不加这个的话就可以遍历到所有方法和属性
	/*if(e.hasOwnProperty(attr)){
		this[attr] = e[attr]
	}
	e.propertyIsEnumerable()*///可枚举属性==>  可以拿出来一一列举的属性
}
var p = new Parent();
var c = new Child();
console.dir(c)
```

![](http://www.manster.me:80/wp-content/uploads/2016/07/QQ截图20160714003944-300x133.jpg)


这个就不过多解释重要的只有一点， for in 可以遍历到原型上的公有自定义属性 ，所以他可以拿到私有和公有的属性和方法，这个你可以遍历私有和公有的，需要你加限制条件。但是如果不做```hasOwnProperty```判断那么就是把父类的公有的和私有的都拿过来当私有的。

### 4.混合继承
混合继承，那就肯定是混合的啦，将call继承和原型继承集合在一起===>无论是私有的还是公有的都拿过来了。但是有个问题就是子类的原型上的多了一套父类私有属性,但是不会产生问题。因为子类的私有属性也有一套相同的通过call继承拿过来的。


```$xslt
function Parent(){
	this.x=100;
}
Parent.prototype.getX = function(){}
function Child(){
	Parent.call(this);
}
Child.prototype =  new Parent();
Child.prototype.constructor = Child;
var p = new Parent();
var c = new Child();
console.log(c)//Child {x: 100}

```
混合继承有多重方式，这种是call和原型混合的，你也可以call和冒充对象继承混合，等等，多种方式，有句话怎么说来着？js的一个问题有多种方式可以解决。

这种混合继承的最大问题就是无论在什么情况下，都会调用两次构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数的内部，没错，子类型最终会包含父类型对象的全部实例属性，但我们不得不在调用子类构造函数时重写这些属性。（摘自高程3）

还有一种就是call+拷贝继承

```$xslt
//混合继承：call继承+拷贝继承
    function extend(newEle,oldEle){
        for(var attr in oldEle){
            newEle[attr]=oldEle[attr];
        }
    }
    function F(){
        this.x=100;
        this.showX=function(){}
    }
    F.prototype.getX=function(){};
    F.prototype.getX1=function(){};
    var f1=new F;
    console.dir(f1)
    function S(){
        F.call(this)//call继承
    }
    extend(S.prototype, F.prototype);//拷贝继承
    S.prototype.cc=function(){ }
    var p1=new S;
    console.dir(p1);
```
这种方式使用call继承将父类的私有方法继承过来，使用for in 拷贝 将父类的公有属性和方法继承过来，比较实用。

### 5.中间件继承

中间件继承就是通过原型链的机制，子类的```prototype.__proto__```本来应该是直接指向```Object.prototype```。从父类的原型上的```__proto__```也可以到Object.prototype==> 在父类.prototype上停留了下，父类.prototype就是一个中间件，所以子类可以继承到父类的公有方法当做自己的公有方法。

```$xslt
function Parent(){
	this.x = 100;
}
Parent.prototype.getX = function(){}
function Child(){
	
}
Child.prototype.__proto__ = Parent.prototype;
var p = new Parent();
var c = new Child()
console.log(c)

```

### 6.寄生组合式继承
寄生式组合: call继承+Object.create();

所谓寄生组合式继承就是通过借用构造函数来继承属性，通过原型链的混合形式来继承方法。 基本思路是不必为了指定子类的原型而调用父类的构造函数，我们所需要的无非就是父类型原型的一个副本而已。 本质上，就是使用寄生式继承父类的原型，然后再将结果指定给子类的原型。

所以我们就新建一个方法
```$xslt

function inheritPrototype(subType,superType){
	var prototype = Object(superType.prototype);//创建对象
	prototype.constructor = subType;//增强对象
	subType.prototype = prototype;//指定对象
}
```

解释一下：

1、第一步是创建父类型原型的一个副本。

2、第二步是为创建的副本增加constructor属性，从而弥补了因为重写原型而失去的默认的constructor属性。

3、第三步是将创建的对象赋值给子类型的原型。

```$xslt
function F(){
	this.x=100;
}
F.prototype.showX=function(){};
function S(){
	this.y = 200
	F.call(this)//只继承了私有的；
}
function inheritPrototype(subType,superType){
	var prototype = Object(superType.prototype);//创建对象
	prototype.constructor = subType;//增强对象
	subType.prototype = prototype;//指定对象
}
inheritPrototype(S,F)
var p1=new S;
console.dir(p1)
```


这个例子的高效率体现在他只调用了一次SuperType 构造函数，并且因此避免了在SubType.prototype上面创建不必要的、多余的属性。与此同时原型链还能保持不变，所以可以正常使用```instanceof``` 和 ```isPrototypeOf()``` ，所以寄生组合继承是引用类型最理想的继承方法。


### 7.经典继承（道格拉斯继承）

与上面的大同小异，已知一个对象o，需要创建一个新的对象，这个新的对象继承自对象o。
```$xslt
//功能封装
function create(o) {
    function F(){}
    F.prototype=o;
    return new F(); 
}

var o={name:"张三",age:18}；
var o2=create(o);//这样o2就继承自o了
```

#### 下高速，点star缴费

