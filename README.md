# javaScript 设计模式

## 第一章 面向对象的javaScript

> javaScript 没有提供传统面向对象语言的类式编程，而是通过原型委托的方式来实现对象与对象之间的继承
>
> javaScript 也没有在语言层面提供抽象类和接扣的支持

**正是因为存在这些跟传统面向对象语言不一致的地方，我们在用设计模式编写代码的时候，更要跟传统面向对象语言加以区别**

### 动态类型语言和鸭子类型

> 在JavaScript 中，当我们对一个变量赋值时，显然不需要考虑它的类型，因此，JavaScript 是一门典型的动态类型语言

​	因为无需进行类型检测，我们可以尝试调用任何对象的任意方法，而无需去考虑它原本是否被设计为拥有该方法

+ 静态类型语言

  > 在编译时便以确定变量的类型

  **优点**

  + 在编译时就能发现类型不匹配的错误
  + 如果在程序中明确的规定了数据类型，编译器还可以做优化工作，提高程序执行速度

  **缺点**

  + 迫使程序要依照强契约来编写程序

    > 为每个变量规定数据类型,归根姐弟只是辅助我们编写可靠性高程序的一种手段，而不是编写程序的目的

  + 代码量大，分散了精力

+ 动态类型语言

  > 要到程序运行的时候，待变量被赋予某个值之后，才会有具体某种类型

  **优点**

  + 代码量少，更加简洁
  + 专注于业务逻辑

  **缺点**

  + 无法保证变量的类型，从而在程序运行期有可能发生跟类型相关的错误

#### 鸭子类型（面向接口编程）

> 如果它走起路来像鸭子，叫起来也像鸭子，那么他就是鸭子

```javascript
var duck = {
  duckSinging: function () {
    consoloe.log('嘎嘎嘎')
  }
}

var chicken = {
  duckSinging: funceion () {
  	console.log('也是鸭子的叫声')
	}
}

// 合唱团
var choir = []

var joinChoir = function (animal) {
  if (animal && typeof animal.duckSinging === 'function') {
    choir.push(animal)
    console.log('恭喜加入合唱团')
    console.log('合唱团数量为' + choir.length)
  }
}

joinChoir(duck)
joinChoir(chicken)
```

> 利用鸭子类型的思想，我们不必借助超类型的帮助，就能轻松的在动态类型语言中实现一个原则：“面向接口编程”

​	例如

+ 一个对象若有push和pop方法，并且这些方法提供了正确的实现，那么就可以当做栈使用
+ 一个对象如果有length属性，也可以按照下标来存取属性，这个对象就可以北方做数组来使用

### 多态

> 同意操作作用于不同的对象上面，可以产生不同的解释和不同的执行结果
>
> 给不同的对象发送同一个消息，这些对象会根据这个消息分别给出不同的反馈

#### 一段“多态”的JavaScript

```javascript
var makeSound = function () {
	if (animal instanceof Duck) {
    console.log("gagaga")
  } else {
    console.log("lueluelue")
  }
}
var Duck = function (){}
var Chicken = function (){}

makeSound( new Duck() )       // gagaga
makeSound( new Chicken() )   	// lueluelue
```

> 这段代码确实体现了“多态性”，当我们分别向鸭和鸡发出叫唤的消息时，它们根据此消息作出了各自不同的反应

​	多态背后的思想是将“做什么”，“谁去怎么做”分离开来，也就是将“不变的事物”与“可能改变的事物”分离开来，

把不变的分离开来，把可变的封装起来

#### 对象的多态性 

```javascript
// 首先把不变的分离出来 也就是所有的动物都会叫
var makeSound = function (animal) {
  animal.sound()
}

// 然后把可变的封装起来
var Duck = function () {}
Duck.prototype.sound = function () {
  console.log('gagaga')
}
var Chicken = function () {}
Chicken.prototype.sound = function () {
  console.log('lueluelue')
}
makeSound(new Duck())
makeSound(new Chiken)
```

#### 类型检查和多态

> 以Java 为例，由于在代码编译时要进行严格额类型检查，所以不能给变量赋予不同类型的值

```java
// 尝试使用java代码编写
public class Duck {
	public void makeSound () {
		System.out.println("gagaga")
	}
}

public class Chicken {
  public void makeSound () {
    System.out.println("lueluelue")
  }
}

public class AnimalSound {
  public void makeSound (Duck duck) {
    duck.makeSound()
  }
}

public class Test {
  public static void main(String args[]) {
    AnimalSound animalSound = new AnimalSound();
    Duck duck = new Duck();
    animalSound.makeSound(duck);   // 输出gagagga
    Chicken chicken = new Chicken();
    animalSound.makeSound(chicken);   // 报错，只能接受Duck类型的参数  
  }
}
```

#### 使用继承得到多态效果（java）

```java
public abstract class Animal {
  abstract void makeSound(); / 抽象方法
}
public class Chicken extends Animal {
  public void makeSound () {
    System.out.println('lueluelue')
  }
}
public class Duck extends Animal {
  punlic void makeSound () {
    System.out.println("gagaga")
  }
}

public class AnimalSound () {
  public void makeSound(Animal animal) {
    animal.makeSound()
  }
}
public class Test {
  public static void main(String args[]) {
    AnimalSound animalSound = new AnimalSound();
    Animal duck = new Duck();
    Animal chicken = new Chicken();
    animalSound.makeSound(duck);  // 输出gagaga
    animalSound.makeSound(chicken); // 输出lueluelue
  }
}
```

#### JavaScript 多态

> 多态的思想实际上是把“做什么”和“谁去做”分离开来

**javaScript具有与生俱来的多态性**

+ 编译时没有类型检查
  + 既没有检查创建的对象类型
  + 也没有检查传递的参数类型

在javaScript 代码中实现多态，只取决于它没有没其方法，而不取决于他是否是某种类型的对象

不存在任何程度的“类型耦合”

### 封装

封装的目的是将信息隐藏

> 一般而言，我们讨论的封装是将封装数据和封装实现，我们还要讨论封装类型和封装变化

#### 封装数据

> 在javaScript中，我么能使用变量的作用域来实现封装特向

出了ES6提供的`let`外，一般我们通过函数来创建作用域

```javascript
var myObject = (function () {
	var _name = 'sven'
	return {
		getName: function () {
			return _name
		}
	}
})()
```

#### 封装实现

从封装的实现来讲，封装是的对象内部的变化对其他对象而言是透明的，也就是不可见的

对象对自己的行为负责，其他对象或者用户都不关心它的内部实现，封装使得对象之间的耦合松散

对象之间只通过暴露的API借口来通信，当我们修改一个对象时，可以随意修改他的内部实现，只要对外的借口没有变化，就不会影响到程序的其他功能

#### 封装类型

javaScript 本身也就是一门类型模糊的语言，在封装类型方面，JavaScript没有能力，也没有必要做的更多

#### 封装变化

### 原型模式和基于原型继承的JavaScript对象系统

#### 使用克隆的原型模式

如果我们需要创建一个对象，在原型模式中

> 我们不再关心对象的具体类型，而是找到一个对象，然后通过克隆来创建一个一模一样的对象

既然原型模式是通过克隆来创建对象的，那么如果需要一个跟某个对象一模一样的对象，可以使用原型模式

**ES6提供了克隆方法 Object.create()**

```javascript
var Plan = function () {
	this.blood = 100
	this.attackLevel = 1
	this.defenseLevel = 1
}
var plan = new Plan()
plane.blood = 500
plane.attackLevel = 10
plane.defenseLevel = 7

// 得到一个克隆的对象
var clonePlane = Object.create( plane )
console.log(clonePlane.blood)  // 500
```

#### 克隆是创建对象的手段

**原型模式的真正目的并非在于需要得到一个一模一样的对象，而是提供了一种便捷的方式去创建某个类型的对象，克隆只是创建这个对象的过程和手段**

#### 原型编程泛型的一些规则

**基于原型链的委托机制就是原型继承的本质**

+ 所有的数据都是对象
+ 要得到一个对象，不是通过实列化类，而是找到一个对象作为原型并克隆它
+ 对象会记住它的原型
+ 如果对象无法响应某个请求，他会把这个请求委托给它自己的原型

#### javaScript 中的原型继承

我们不能说javaScript中所有的数据都是对象，但可以说绝大部分数据都是对象，那么相信在JavaScript中页一定会有一个根对象存在

##### 所有的数据都是对象

javaScript根对象是Object.prototype对象

> 现在我们在JavaScript遇到的每个对象，实际上都是从Object.prototype对象克隆而来的，Object.prototype对象就是他们的原型

##### 要得到一个对象，不是通过实列化类，而是找到一个对象作为原型并克隆它

> 在javaScript中，我们并不关心克隆的细节，因为这是引擎内部实现的，我们所需要做的是只是显示的调用`var object = new Object()`或者`var object2 = {}`，此时引擎内部会自动在Object.prototype中克隆一个对象出来

```javascript
function Person (name) {
	this.name = name
}
Person.prototype.getName = function () {
	return this.name
}
var a = new Person('sven')
console.log(a.name) // sven
```

+ Person

  > Person 并不是类，而是函数构造器，JavaScript 的函数既可以作为普通函数被调用，也可以作为构造器被调用
  >
  > 当时用 new 运算符来创建对象的过程，实际上也就是先克隆Object.prototype对象，再进行一些其他额外操作的过程

##### 对象会记住它的原型

如果要完成JavaScript语言中的原型链条查找机制，每个对象至少应该先记住自己的原型

+ 就JavaScript的真正实现来说，其实并不能说对象有原型，只能说对象的构造器有原型

  > 对于“对象吧请求委托给它自己的原型”这句话，更好的说法是对象吧请求委托给它的构造器原型

+ javaScript 给对象提供了一个名为`_proto_`的隐藏属性，某个对象的`_proto_`会默认指向它的构造器的原型对象

  > 实际上，`_proto_`就是对象跟“对象构造器的原型”联系起来额纽带，正是因为对象要通过`_proto_`属性来记住它的构造器原型

##### 如果对象无法响应某个请求，他会把这个请求委托给它的构造器原型

+ Io语言的克隆

  > Io中每个对象都可以作为原型被克隆，当animal对象克隆自Object对象，Dog对象又克隆自Animal对象时，便天然形成了一条原型链

+ javaScript中

  > 每个对象都是从Object.prototype对象克隆而来的，如果是这样的话，我们只能得到单一的原型链，即每个对象的继承自Objec.prototype对象

**虽然JavaScript的对象最初都是由Object.prototype对象克隆而来的，但对象构造器的原型并不仅限于Object.prototype，而是可以动态的指向其他对象**

```javascript
var obj = {
	name: 'sven'
}
var A= function () {}
A.prototype = obj
var a = new A()
console.log(a.name) // sven
```

1. 首先，尝试遍历对象a中的所有属性，但没有找到name这个属性
2. 查找name属性的这个请求被委托给对象a的构造器的原型，它被`a._proto_`记录着并且指向`A.prototype`，而`A.prototype`被设置为obj
3. 在对象obj中找到了name属性，并返回值

**当我们期望得到一个“类”继承另外一个“类”的效果时**

```javascript
var a = function(){}
A.prototype = {
	name: 'sven'
}

var b = function () {}
B.prototype = new A()

var b = new B()
console.log(b.name)
```

##### 原型继承的未来

> 设计模式在很多时候其实都体现了语言的不足之处，
>
> 设计模式是对语言不足的补充

## 第二章 this、call 和 apply

### this

this总是指向一个对象，而具体指向哪个对象是在运行时基于**函数的执行环境动态绑定的**，**而非函数被声明的环境**

#### this 的指向

this的指向分为以下4种

+ 作为对象的方法调用
+ 作为普通函数调用
+ 构造器调用
+ Function.prototype.call 或 Function.prototype.apply 调用

##### 作为对象调用

> 当函数作为对象的方法调用时，this指向该对象

```javascript
var obj = {
	a: 1,
	getA: function () {
		alert(this === obj)    // true
    alert(this.a)   // 1
	}
}

obj.getA()
```

##### 作为普通函数调用

> 当函数不作为普通对象调用时，也就是普通方式调用
>
> 此时this指向全局window对象

```javascript
window.name = 'globalName'

var getName = function () {
 	return this.name
}
console.log(getName())   // globalName
```

> 在运行时确定的this指向

```javascript
window.naem = 'globalName'

var myObject = {
  name: 'sven',
  getName: function () {
    return this.name
  }
}

var getName = myObject.getNmae
// 在运行时确定的this的指向
console.log(getName())    // globalName
```

##### 构造器调用

> 除了宿主提供的一些内置函数，大部分JavaScript函数都可以当做构造器使用
>
> 构造器的外表跟普通函数一模一样，他们的区别在于被调用的方式
>
> 当用new运算符调用函数时，该函数总会返回一个对象，通常情况，构造器里的this就指向返回的这个对象

```javascript
var MyClass = function () {
	this.name = 'sven'
}

var obj = new MyClass()
alert(obj.name)   //	 sven
```

> 如果构造器显示的返回了一个Object类型的对象，name此次运算结果最终会返回这个对象，而并不是期待的this

```javascript
var MyClass = function () {
	this.name = 'sven'
  return {
    name: 'anne'
  }
}

var obj = new MyClass()
console.log(obj.name)   // anne
```

> 如果构造器不显式的返回任何数据，或者是返回一个非对象类型的数据，就没有上面的wneti

```javascript
var MyClass = function () {
	this.name = 'sven'
  return 'anne';
}

var obj = new MyClass()
alert(obj.name)   // sven
```

##### call 或 apply 方法调用

> 通过call 或 apply 可以动态的改变传入函数的this

```javascript
var obj1 = {
	name: 'sven',
  getName: function () {
    return this.name
  }
}

var obj2 = {
  name: 'anne'
}

console.log(obj1.getName.call(obj2))   // anne
```

#### 丢失的this

### call 和 apply

> 这是Function原型上定义的两个方法

+ 当使用call 或 apply 时，如果我们传入的第一个参数是null， 函数体内的this会指向默认的宿主对象在浏览器中是window

#### call 和 apply 的区别

> 它们的作用是一模一样的，区别在于传入的参数的形式不同

##### apply

> 接收两个参数
>
> 1. 指定了函数体内this对象的指向
> 2. 为一个带下标的集合，这个集合可以为数组，把这个集合中的元素作为参数传递给被调用的函数

```javascript
var func = function (a, b, c) {
	alert([a, b, c])
}

// 参数 1、2、 3 被放在数组中一起传入func函数，他们分别对应func参数列表中的a、b、c
func.apply(null, [1, 2, 3])
```

##### call

> call 传入的参数数量不固定
>
> 1. 代表函数体内的this指向
> 2. 从第二个参数往后，每个参数背一次传入函数

```javascript
var func = function (a, b, c) {
	alert([a, b, c])
}

func.call(null, 1, 2, 3)
```

#### call 和 apply 的用途

> 能够数量的使用call 和 apply 使我们真正成为一名JavaScript程序员的重要一步

##### 改变this 指向

```javascript
var obj1 = {
  name: 'sven'
}

var obj2 = {
  name: 'anne'
}

window.name = "window"

var getName = function () {
  alert(this.name)
}

getName()   // window
getName.call(obj1)  // sven
getName.call(obj2)   // anne
```

##### Function.prototype.bind

> 通过内置函数bind，用来指定函数内部的this指向

#### 借用其他对象的方法

```javascript
var A = function (name) {
  this.name = name
}

// 重新指定了this为B
var B = function () {
  A.apply(this, arguments)
}

B.prototype.getName = function () {
 	return this.name
}

var b = new B('sven')
console.log(b.getName())
```

##### 借用方法

> 函数的参数列表arguments 是一个类数组对象，虽然他也有下标，但它并非真正的数组
>
> 所以也不能像数组一样，进行排序操作或者往集合里添加一个新元素

```javascript
(function () {
	Array.prototype.push.call(arguments, 3)
	console.log(arguments)  // [1, 2, 3]
})(1, 2)
```

> 想把 arguments 转成真正的数组的时候，可以借用Array.prototype.slice 方法，截取arguments列表中的头一个元素，又可以借用Array.prototype.shift方法

## 第三章 闭包和高阶函数

### 闭包

#### 变量的作用域

+ 挡在函数中声明一个变量的时候，如果该变量的前面没有带上定义的关键字（var），这个变量就会成为全局变量
+ 变量的搜索从内至外

#### 变量的生存周期

+ 全局变量的生存周期是永久的，除非我们主动销魂这个全局变量
+ 对于在函数内用var关键字声明的局部变量来说，当退出函数时，这些局部变量即失去了它们的价值，它们都会随着函数调用的结束而被销毁

列如

```javascript
var func = function () {
  var a = 1
  return function () {
    a++
    alert( a )
  }
}

var f= func()
f()  // 2
f()  // 3
f()  // 4
f()  // 5
```

因为当执行var f = func() 时， f 返回了一个匿名函数的引用，他可以访问到func()被调用时产生的环境，而局部变量a一直处于在这个环境里，既然局部变量所在的环境还能被外界访问，这个局部变量就有了不被销毁的理由

#### 闭包的更多作用

#### 封装变量

> 闭包可以棒状把一些不需要暴露在全局的变量封装成”私有变量“

mult 函数接受一些number类型的参数，并返回这些参数的乘积，可以加入缓存机制 通过 闭包 ，来封装变量，缓存数据

```javascript
var mult = ( function() {
  // 缓存对象数据
  var cache = {}
  return  function () {
    // 借用数据原型的join 方法 把 数组中的元素 用“，”分割为一个字符串
    var args = Array.prototype.join.call(arguments, ',')
    // 如果对象有这个属性
    if (args in cache) {
      return cache[args]
    }
    var a = 1
    for(var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i]
    }
    return cache[args] = a
  }
})()
```

#### 用闭包实现命令模式

> 命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的接受者之间的耦合关系
>
> 在闭包版本的命令模式中，命令接受者会被封闭在闭包形成的环境中

```javascript
var Tv = {
  open: function () {
    console.log('打开电视机')
  },
  close: function () {
    console.log('关闭电视机')
  }
}

var createCommand = function (receiver) {
  var execute = function () {
    return receiver.open()
  }
  var undo = function () {
    return receiver.close()
  }

  return {
    execute: execute,
    undo: undo
  }
}

var setCommand = function (command) {
  document.getElementById('exexecute').onclick = function () {
    command.execute()   // 打开电视机
  }
  document.getElementById('undo').onclick = function () {
    command.undo()     // 关闭电视机
  }
}

setCommand( createCommand(Tv) )
```

#### 闭包与内存管理

+ 把这些变量放在闭包中和放在全局作用域，对内存的影响是一致的，并不能说成内存泄露，如果之后需要进行回收，可以手动把此变量设置为null

### 高阶函数

高阶函数是指至少满足下列条件之一的函数

1. 函数可以作为参数被传递
2. 函数可以作为返回值输出

#### 函数作为参数传递

那函数当做参数传递，这代表这我们可以抽离出一部分容易变化的业务逻辑，把这部分业务逻辑放在函数参数中，这样一来可以分离业务代码中变化与不变化的部分

##### 回调函数

+ ajax

+ ```javascript
  var appendDiv = function (callback) {
    for (var i = 0; i> 100; i++) {
      var div = document.createElement('div')
      div.innerHTML = i
      document.body.appendChild(div)
      if (typeof callback === 'function') {
        callback(div)
      }
    }
  }
  
  appendDiv(function (div) {
    div.style.display = "none"
  })
  ```

##### Array.prototype.sort

> sort 接受一个函数当做参数，这个函数里面封装了数组元素的排序规则

###### 从小到大排序

```
[1, 4, 3].sort((a, b) => {
	return a - b
})
```

###### 从大到小排序

```
[1, 4, 3].sort((a, b) => {
	return b - a
})
```

### 函数作为返回值输出

> 让函数继续返回一个可执行的函数，意味着运算过程是可持续的

## 第四章

### 单例模式

**逻辑**

```javascript
var obj
if (obj) {
	obj = xxx
}
```

把如何管理单例的逻辑从原来的的代码中抽离出来，这些逻辑被封装在getSingle函数内部，创建对象的方法fn被当成参数动态的传入getSingle函数

```javascript
var getSingle = function (fn) {
	var result
	return function () {
		return result || (result = fn.apply(this, arguments))
	}
}
```

> result 变量因为身在闭包中，它永远不会被销毁，在将来的请求中，如果result已经被赋值，那么他将返回这个值

```javascript
var createLoginLayer = function () {
	var div = doucment.createElement('div')
	div.innerHTML = '我是登录浮窗'
	div.style.display = 'none'
  document.body.appendChild('div')
  return div
}

var createSingleLoginLayer = getSinle( createLoginLayer)

document.getElementById('loginBtn').onClick = function () {
  var loginLayer = createSingleframe();
  loginLayer.style.display = 'block'
}
```

> 把创建实例对象的职责和管理单例的职责分贝放置两个方法里，这两个方法可以独立变化而互不影响，当他们链接在一起的时候，就完成了创建唯一实例对象的功能

## 第五章

### 策略模式

**定义**

> 定义一系列算法，把他们一个个封装起来，并且使他们可以相互替换

#### 奖金计算

```javascript
var strategies = {
  "S": function (salary) {
    return salary * 4
  },
  "A": function (salary) {
    return salary * 3
  },
  "B": function (salary) {
    return salary * 2
  }
}

var calculateBonus = function (level, salary) {
  return strategies[level](salary)
}

console.log( calculateBonus('S', 200000) )
```

#### 表单验证

```html
<html>
  <body>
    <form action="https://www.xxx.com" id="registerForm" method="post">
      请输入用户名：<input name="userName" />
      请输入密码: <input name="password" />
      请输入手机号: <input name="phoneNumber" />
    </form>
  </body>
</html>
```

```javascript
/****************策略对象********************/
var strategies = {
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function (value, errorMsg) {
    if (!/{9}$/.test(value)) {
      return errorMsg
    }
  }
}

```

```javascript
/******************** Validator 类 ***********************/
var Validator = function () {
  // 装载验证函数的数组
  this.cache = []
}
Vaildator.prototype.add = function (dom, rules)  {
  var self = this
  // 循环验证数组
  for(var i = 0, rule; rule = rules[i++];) {
    (function (rule){
      // 
      var strategrAry = rule.strategy.split(':')
      var errorMsg = rule.errorMsg
      self.cache.push(function () {
        var strategy = strategyAry.shift()
        strategrAry.unshift(dom.value)
        strategyAry.push(errorMsg)
        return strategies[strategy].apply(dom, strategrAry)
      })
    })(rule)
  }
}

Vaildator.prototype.start = function () {
  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    // 循环装载函数的数组 依次执行
    var errorMsg = validatorFunc();
    if (errorMsg) {
      return errorMsg
    }
  }
}
```

```javascript
/********************客户端调用代码*************************/
var registerForm = documnet.getElementById('registerForm')
var validataFunc = function () {
  var validator = new Validator()
  validator.add(registerForm.userName, [
    {
      strategy: 'isNonEmpty',
      errorMsg: '用户名不能为空'
    },
    {
      strategy: 'minLength:10',
      errorMsg: '用户名长度不能小于10位'
    }
  ])
  validator.add(registerForm.userName, [
    {
      strategy: 'minLength:6',
      errorMsg: '密码长度不能小于6位'
    }
  ])
  validator.add(registerForm.userName, [
    {
      strategy: 'isMobile',
      errorMsg: '手机号码格式不正确'
    }
  ])
  
  var errorMsg = validator.start()
  return errorMsg
}

registerForm.onsubmit = function () {
  var errorMsg = validataFunc()
  if (errorMsg) {
    alert(errorMsg)
    return false
  }
}
```

## 第六章

### 迭代器模式

