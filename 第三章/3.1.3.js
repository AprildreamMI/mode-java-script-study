var mult = ( function() {
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


Function.prototype.before = function (beforefn) {
  var _self = this
  return function () {
    beforefn.apply(this, arguments)
    // 返回就是执行一次
    return _self.apply(this, arguments)
  }
}

var func = function () {
  console.log(2)
}

func = func.before(function () {
  console.log(1)
})

func()